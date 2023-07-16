<script setup lang="ts">
import HeaderComponent from './components/HeaderComponent.vue'
import AlertWidget from './components/AlertComponent.vue'
</script>

<template>
  <HeaderComponent />
  <main>
    <RouterView v-slot="{ Component }">
      <XyzTransition appear mode="out-in" xyz="fade duration-3">
        <component :is="Component" />
      </XyzTransition>
    </RouterView>
  </main>
  <AlertWidget />
</template>
