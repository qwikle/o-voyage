<script setup lang="ts">
import { useAlertStore } from '@/stores/alert.store'
import { storeToRefs } from 'pinia'

const { message, show, type } = storeToRefs(useAlertStore())
</script>
<template>
  <XyzTransition xyz="fade right-100%">
    <div
      class="absolute w-64 h-16 shadow rounded top-16 right-3 flex flex-col p-4 text-sm"
      :class="{
        'bg-green-100 text-green-800': type === 'success',
        'bg-red-100 text-red-800': type === 'error',
        'bg-yellow-100 text-yellow-800': type === 'warning',
        'bg-blue-100 text-blue-800': type === 'info'
      }"
      v-if="show"
    >
      <p class="font-medium">{{ message }}</p>
    </div>
  </XyzTransition>
</template>
<style scoped></style>
