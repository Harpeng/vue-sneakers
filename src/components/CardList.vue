<script setup>
import Card from './Card.vue'

 defineProps({
  items: Array,
  isFavorites: Boolean
})

const emit = defineEmits(['addToFavorite', 'addToCart', 'deleteFavorite'])



</script>

<template>
  <div v-auto-animate class="grid grid-cols-4 gap-5 ">
    <Card
      v-for="item in items"
      :id="item.id "
      :key="item.id"
      :title="item.title"
      :image="item.imageUrl"
      :price="item.price"
      :onClickFavorite="isFavorites ? null : () => emit('addToFavorite', item)"
      :onClickAdd="isFavorites ? null : () => emit('addToCart', item)"
      :onClickDelete="() => emit('deleteFavorite', item)"
      :isFavorite="item.isFavorite"
      :isAdded ="item.isAdded"
    />
  </div>
</template>

<style></style>
