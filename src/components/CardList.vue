<script setup>
import Card from './Card.vue'

 defineProps({
  items: Array
})

const emit = defineEmits(['addToFavorite'])

</script>

<template>
  <div class="grid grid-cols-4 gap-5 ">
    <Card
      v-for="item in items"
      :id="item.id "
      :key="item.id"
      :title="item.title"
      :image="item.imageUrl"
      :price="item.price"
      :onClickFavorite = "() => emit('addToFavorite', item)"
      :isFavorite="item.isFavorite"
    />
  </div>
</template>

<style></style>
