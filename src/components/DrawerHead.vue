<template>
      <div class="flex items-center gap-5 border-b pb-4">
    <svg
      @click="closeDrawer"
      class="cursor-pointer rotate-180 opacity-30 hover:opacity-100 transition hover:translate-x-1"
      width="16"
      height="14"
      viewBox="0 0 16 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1 7H14.7143"
        stroke="black"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M8.71436 1L14.7144 7L8.71436 13"
        stroke="black"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>

    <h3 class="text-2xl font-bold">Корзина</h3>
  </div>
</template>

<script setup>
import { inject } from "vue";

const {closeDrawer} = inject('cart')
</script>

<style></style>
