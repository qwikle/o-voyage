<script setup lang="ts">
import HeaderView from './components/HeaderView.vue'
</script>

<template>
  <HeaderView />
  <main class="container mx-auto px-5 py-4">
    <RouterView />
  </main>
</template>
