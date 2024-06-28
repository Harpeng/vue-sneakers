<template>
  <header class="flex justify-between border-b border-slate-200 px-10 py-8">
    <router-link to='/vue-sneakers/'>
      <div class="flex items-center gap-4">
        <img src="/logo.png" alt="logo" class="w-10" />
        <div>
          <h1 class="text-xl font-bold uppercase">Vue Sneakers</h1>
          <p class="text-slate-500">Магазин лучших кроссовок</p>
        </div>
      </div>
    </router-link>
    <ul class="flex items-center gap-10">
      <li
        @click="() => emit('openDrawer')"
        class="flex items-center gap-3 text-slate-500 hover:text-black cursor-pointer"
      >
        <img src="/cart.svg" alt="cart" />
        <span>{{ totalPrice }} руб</span>
      </li>
      <router-link to="/vue-sneakers/favorites">
        <li class="flex items-center gap-3 text-slate-500 hover:text-black cursor-pointer">
        <img src="/heart.svg" alt="bookmark" />
        <span>Избранное</span>
      </li>
      </router-link>
      <li class="flex items-center gap-3 text-slate-500 hover:text-black cursor-pointer">
        <img src="/profile.svg" alt="profile" />
        <span>Профиль</span>
      </li>
    </ul>
  </header>
</template>

<script setup>
import { RouterLink } from 'vue-router'
defineProps({
  totalPrice: Number
})
const emit = defineEmits(['openDrawer'])
</script>

<style></style>
