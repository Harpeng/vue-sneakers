<template>
  <div class="flex gap-4 items-center border border-slate-100 p-2 rounded-xl mb-2">
    <img class="w-16 h-16" :src="imageUrl" :alt="title">
    <div class="flex flex-col flex-1">
        <p>{{title}}</p>
        <div class="flex justify-between mt-2">
            <b class="flex-1">{{price}}</b>
            <img @click="emit('onClickRemove')" class="opacity-40 cursor-pointer transition hover:opacity-100" src="/close.svg" alt="close">
        </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
    id: Number,
    title: String,
    imageUrl: String,
    price: Number,
})

const emit = defineEmits(['onClickRemove'])
</script>

<style>

</style>