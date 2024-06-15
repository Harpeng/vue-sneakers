<template>
  <div class="flex flex-col gap-4">
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

const {cart} = inject(['cartActions'])
const {removeFromCart} = inject(['cartActions'])
</script>

<style></style>
