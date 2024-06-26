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
    await axios.delete(`https://3afc0b251db73ab9.mokky.dev/favorites/${item.favoriteId}`)
    favorites.value = favorites.value.filter(favorite => favorite.item_id !== item.id);
  } catch (err) {
    console.log(err)
  }
}

onMounted(async () => {
  try {
      const { data } = await axios.get('https://3afc0b251db73ab9.mokky.dev/favorites')
      favorites.value = data.map((obj) => obj.item)
  } catch (err) {
    console.log(err)
  }
})

</script>

<style></style>
