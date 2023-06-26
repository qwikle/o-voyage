<script setup lang="ts">
import HeaderView from './components/HeaderView.vue'
import AlertWidget from './components/alertWidget.vue'
</script>

<template>
  <HeaderView />
  <main class="container mx-auto px-5 py-4 relative">
    <RouterView />
    <AlertWidget />
  </main>
</template>
