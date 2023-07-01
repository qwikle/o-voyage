<script setup lang="ts">
import HeaderComponent from './components/HeaderComponent.vue'
import AlertWidget from './components/alertWidget.vue'
</script>

<template>
  <HeaderComponent />
  <main class="mx-auto">
    <RouterView v-slot="{ Component }">
      <XyzTransition appear mode="out-in" duration="500" xyz="fade">
        <component :is="Component" />
      </XyzTransition>
    </RouterView>
  </main>
  <AlertWidget />
</template>
