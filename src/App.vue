<script setup>
import { onMounted, provide, reactive, ref, watch } from 'vue'
import axios from 'axios'
import Header from './components/Header.vue'
import CardList from './components/CardList.vue'
// import Drawer from './components/Drawer.vue'

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
      item.isFavorite=false
      await axios.delete(`https://3afc0b251db73ab9.mokky.dev/favorites/${item.favoriteId}`)
      item.favoriteId=null
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
  await fetchItems()
  await fetchFavorites()
})
watch(filters, fetchItems)

provide('addToFavorite', addToFavorite)
</script>

<template>
  <div>
    <!-- <Drawer /> -->
    <div class="w-4/5 m-auto bg-white rounded-xl shadow-xl mt-14">
      <Header />
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
      <CardList :items="items" @addToFavorite="addToFavorite" />
    </div>
  </div>
</template>

<style scoped></style>
