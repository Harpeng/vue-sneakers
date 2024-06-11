<script setup>
defineProps({
  image: String,
  title: String,
  price: Number,
  isFavorite: Boolean,
  isAdd: Boolean,
  onClickAdd: Function,
  onClickFavorite: Function,
})

</script>

<template>
  <div
    class="relative bg-white border-slate-100 rounded-3xl p-8 cursor-pointer hover:-translate-y-2 hover:shadow-xl transition"
  >
    <img @click="onClickFavorite" class="absolute top-8 left-8" :src="!isFavorite ? '/like-1.svg' : '/like-2.svg'" alt="like" />
    <img :src="image" alt="sneaker" />
    <p class="mt-2">{{ title }}</p>
    <div class="flex justify-between">
      <div class="flex flex-col">
        <span class="text-slate-400">Цена:</span>
        <b>{{price}}</b>
      </div>
      <img @click="onClickAdd" :src="!isAdd ? '/plus.svg' : '/checked.svg'" alt="plus" />
    </div>
  </div>
</template>

<style></style>
