<template>
  <div v-auto-animate class="flex flex-col max-h-[500px] overflow-y-scroll mt-4">
    <CartItem
      v-for="item in cart"
      :key="item.id"
      :title="item.title"
      :imageUrl="item.imageUrl"
      :price="item.price"
      @onClickRemove="() => removeFromCart(item)"
    />
  </div>
</template>

<script setup>
import { inject } from 'vue'
import CartItem from './CartItem.vue'

const {cart} = inject(['cart'])
const {removeFromCart} = inject(['cart'])
</script>

<style></style>
