<script setup lang="ts">
import { useAlertStore } from '@/stores/alert.store'

const alertStore = useAlertStore()
</script>
<template>
  <XyzTransition xyz="fade right-100%">
    <div
      class="absolute w-64 h-20 bg-stone-100 shadow rounded top-3 right-3 flex flex-col p-4"
      :class="{
        'bg-red-100': alertStore.$state.type === 'error',
        'bg-green-100': alertStore.$state.type === 'success',
        'bg-yellow-100': alertStore.$state.type === 'warning',
        'bg-blue-100': alertStore.$state.type === 'info'
      }"
      v-if="alertStore.$state.show"
    >
      <p class="font-medium">{{ alertStore.$state.message }}</p>
    </div>
  </XyzTransition>
</template>
<style scoped></style>
