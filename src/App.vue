<script setup>
import { computed, onMounted, onUnmounted, provide, reactive, ref, watch } from 'vue'
import axios from 'axios'
import Header from './components/Header.vue'
import CardList from './components/CardList.vue'
import Drawer from './components/Drawer.vue'

const drawerOpen = ref(false)
const cart = ref([])
const isCreatingOrder = ref(false)

const totalPrice = computed(() => cart.value.reduce((acc, item) => acc + item.price, 0))
const vatPrice = computed(() => Math.round((totalPrice.value * 5) / 100))
const cartIsEmty= computed(() => cart.value.length === 0)
const cartDisabledButton = computed(() => cartIsEmty.value || isCreatingOrder.value)

const addToCart = (item) => {
  cart.value.push(item)
  item.isAdded = true
}

const removeFromCart = (item) => {
  cart.value.splice(cart.value.indexOf(item), 1)
  item.isAdded = false
}

const cartHandler = (item) => {
  if (!item.isAdded) {
    addToCart(item)
  } else {
    removeFromCart(item)
  }
}

const createOrder = async () => {
  try {
    isCreatingOrder.value = true
    const { data } = await axios.post('https://3afc0b251db73ab9.mokky.dev/orders', {
      items: cart.value,
      totalPrice: totalPrice.value
    })
    cart.value = []
    return data
  } catch(err) {
    console.log(err)
  } finally {
    isCreatingOrder.value = false
  }
}

const closeDrawer = () => {
  drawerOpen.value = false
}

const keyCloseDrawer = (e) => {
  if (e.key === 'Escape') {
    closeDrawer()
    console.log('dfd')
  }
}

const openDrawer = () => {
  drawerOpen.value = true
}

const items = ref([])
const filters = reactive({
  sortBy: 'title',
  searchQuery: ''
})

const onChangeSelect = (event) => {
  filters.sortBy = event.target.value
}

const onSearchInput = (event) => {
  filters.searchQuery = event.target.value
}

const addToFavorite = async (item) => {
  try {
    if (!item.isFavorite) {
      const obj = {
        parentId: item.id
      }

      item.isFavorite = true
      const { data } = await axios.post('https://3afc0b251db73ab9.mokky.dev/favorites', obj)

      item.favoriteId = data.id
    } else {
      item.isFavorite = false
      await axios.delete(`https://3afc0b251db73ab9.mokky.dev/favorites/${item.favoriteId}`)
      item.favoriteId = null
    }
  } catch (err) {
    console.log(err)
  }
}

const fetchFavorites = async () => {
  try {
    const { data: favorites } = await axios.get('https://3afc0b251db73ab9.mokky.dev/favorites')
    items.value = items.value.map((item) => {
      const favorite = favorites.find((favorite) => favorite.parentId === item.id)

      if (!favorite) {
        return item
      }

      return {
        ...item,
        isFavorite: true,
        favoriteId: favorite.id
      }
    })
  } catch (err) {
    console.log(err)
  }
}

const fetchItems = async () => {
  try {
    const params = {
      sortBy: filters.sortBy
    }

    if (filters.searchQuery) {
      params.title = `*${filters.searchQuery}*`
    }

    const { data } = await axios.get('https://3afc0b251db73ab9.mokky.dev/items', {
      params
    })

    items.value = data.map((obj) => ({
      ...obj,
      isFavorite: false,
      favoriteId: null,
      isAdded: false
    }))
  } catch (err) {
    console.log(err)
  }
}

onMounted(async () => {
  const localCart = localStorage.getItem('cart');
  cart.value = localCart ? JSON.parse(localCart) : [];
  await fetchItems()
  await fetchFavorites()
  items.value = items.value.map((item) => ({
    ...item,
    isAdded: cart.value.some((cartItem) => cartItem.id === item.id)
  }))
  window.addEventListener('keydown', keyCloseDrawer)
})

onUnmounted(() => {
  window.removeEventListener('keydown', keyCloseDrawer)
})

watch(filters, fetchItems)

watch(cart, () => {
  items.value=items.value.map((item) => ({
    ...item,
    isAdded: false
  }
  ))
})

watch(cart, () => {
  localStorage.setItem('cart', JSON.stringify(cart.value))
}, {deep: true})

provide('cartActions', {
  cart,
  closeDrawer,
  openDrawer,
  cartHandler,
  addToCart,
  removeFromCart
})
</script>

<template>
  <div>
    <Drawer v-if="drawerOpen" :totalPrice="totalPrice" :vatPrice="vatPrice" @createOrder="createOrder" :buttondDisabled="cartDisabledButton" />
    <div class="w-4/5 m-auto bg-white rounded-xl shadow-xl mt-14">
      <Header :totalPrice="totalPrice" @openDrawer="openDrawer" />
      <div class="p-10">
        <div class="flex justify-between items-center">
          <h2 class="text-3xl font-bold">Все кроссовки</h2>
          <div class="flex gap-4 items-center">
            <select @change="onChangeSelect" class="border py-2 px-3 rounded-md outline-none">
              <option value="name">По названию</option>
              <option value="price">По цене (дешевые)</option>
              <option value="-price">По цене (дорогие)</option>
            </select>
            <div class="relative">
              <img class="absolute top-3 left-4" src="/search.svg" alt="search" />
              <input
                @input="onSearchInput"
                class="outline-none border rounded-md py-2 pl-11 pr-4 focus:border-gray-400"
                type="text"
                placeholder="Поиск..."
              />
            </div>
          </div>
        </div>
      </div>
      <CardList :items="items" @addToFavorite="addToFavorite" @addToCart="cartHandler" />
    </div>
  </div>
</template>

<style scoped></style>
