<script setup lang="ts">
import HeaderComponent from './components/HeaderComponent.vue'
import AlertWidget from './components/alertWidget.vue'
</script>

<template>
  <HeaderComponent />
  <main class="container mx-auto px-5 py-4 relative">
    <RouterView />
    <AlertWidget />
  </main>
</template>
