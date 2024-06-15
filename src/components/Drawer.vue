<template>
  <section>
    <div
      @click="closeDrawer"
      class="fixed top-0 left-0 h-full w-full bg-black z-10 opacity-70"
    ></div>
    <div @click.stop.prevent class="bg-white w-96 h-full fixed right-0 top-0 z-20 p-8">
      <DrawerHead />
      <div v-if="!totalPrice" class="flex items-center h-full">
        <InfoBlock
          title="Корзина пустая"
          description="Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ"
          imageUrl="/package-icon.png"
        />
      </div>
      <div v-else>
        <CartList />
        <div class="flex flex-col gap-4 mt-7">
          <div class="flex gap-2">
            <span>Итого:</span>
            <div class="flex-1 border-b border-dashed"></div>
            <b>{{ totalPrice }} р</b>
          </div>
          <div class="flex gap-2">
            <span>Налог 5%:</span>
            <div class="flex-1 border-b border-dashed"></div>
            <b>{{ vatPrice }} р</b>
          </div>
          <button
            @click="() => emit('createOrder')"
            :disabled="totalPrice ? false : true"
            class="mt-4 cursor-pointer transition bg-lime-500 w-full rounded-xl py-3 text-white disabled:bg-slate-300 hover:bg-lime-600 active:bg-lime-700"
          >
            Оформить заказ
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import DrawerHead from './DrawerHead.vue'
import CartList from './CartList.vue'
import InfoBlock from './InfoBlock.vue'

import { inject } from 'vue'

const { closeDrawer } = inject('cartActions')

defineProps({
  totalPrice: Number,
  vatPrice: Number,
  buttondDisabled: Boolean
})

const emit = defineEmits(['createOrder'])
</script>

<style></style>
