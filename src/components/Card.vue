<script setup>
defineProps({
  id: Number,
  image: String,
  title: String,
  price: Number,
  isFavorite: Boolean,
  isAdded: Boolean,
  onClickFavorite: Function,
  onClickAdd: Function,
  onClickDelete: Function,
})

</script>

<template>
  <div
    class="relative bg-white border-slate-100 rounded-3xl p-8 cursor-pointer hover:-translate-y-2 hover:shadow-xl transition"
  >
    <img v-if="onClickFavorite" @click="onClickFavorite" class="absolute top-8 left-8" :src="!isFavorite ? './like-1.svg' : './like-2.svg'" alt="like" />
    <img v-else @click="onClickDelete" class="opacity-40 cursor-pointer transition hover:opacity-100" src="/close.svg" alt="close">
    <img :src="image" alt="sneaker" />
    <p class="mt-2">{{ title }}</p>
    <div class="flex justify-between">
      <div class="flex flex-col">
        <span class="text-slate-400">Цена:</span>
        <b>{{price}}</b>
      </div>
      <img @click="onClickAdd" :src="!isAdded ? './plus.svg' : './checked.svg'" alt="plus" />
    </div>
  </div>
</template>

<style></style>
