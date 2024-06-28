<template>
  <div>
    <h2 class="text-3xl font-bold mb-8">Избранное</h2>
    <CardList :items="favorites" is-favorites @delete-favorite="deleteFavorite"></CardList>
  </div>
</template>

<script setup>
import axios from 'axios'
import { onMounted, ref } from 'vue'
import CardList from '../components/CardList.vue'

const favorites = ref([])

const deleteFavorite = async (item) => {
  try {
    if (!item.favoriteId) {
      throw new Error('favoriteId is null')
    }
    await axios.delete(`https://3afc0b251db73ab9.mokky.dev/favorites/${item.favoriteId}`)
    favorites.value = favorites.value.filter(favorite => favorite.favoriteId !== item.favoriteId)
    item.isFavorite = false
    item.favoriteId = null
  } catch (err) {
    console.log(err)
  }
}

const fetchFavorites = async () => {
  try {
    const { data } = await axios.get('https://3afc0b251db73ab9.mokky.dev/favorites')
    favorites.value = data.map((obj) => {
      const item = obj.item
      item.favoriteId = obj.id 
      return item
    })
    console.log(favorites.value) // Для проверки корректности данных
  } catch (err) {
    console.log(err)
  }
}


onMounted(() => {
  fetchFavorites()
})

</script>

<style></style>
