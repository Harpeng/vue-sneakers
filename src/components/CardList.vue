<script setup>
import Card from './Card.vue'
</script>

<template>
  <div class="p-10">
    <h2 class="text-3xl font-bold mb-8">Все кроссовки</h2>
    <div class="grid grid-cols-4 gap-5">
      <Card title="Мужские кроссовки Nike blazer Mid suede" image="/sneakers/sneakers-1.jpg" :price="5000" />
    </div>
  </div>
</template>

<style></style>
 