<script setup lang="ts">
import HeaderComponent from './components/HeaderComponent.vue'
import AlertWidget from './components/alertWidget.vue'
</script>

<template>
  <HeaderComponent />
  <div class="relative">
    <main class="container mx-auto px-5 py-4">
      <RouterView v-slot="{ Component }">
        <XyzTransition appear mode="out-in" duration="500" xyz="fade">
          <component class="" :is="Component" />
        </XyzTransition>
      </RouterView>
    </main>
    <AlertWidget />
  </div>
</template>
