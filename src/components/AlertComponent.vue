<script setup lang="ts">
import { useAlertStore } from '@/stores/alert.store'
import { storeToRefs } from 'pinia'

const { message, show, type } = storeToRefs(useAlertStore())
</script>
<template>
  <XyzTransition xyz="fade right-100%">
    <div
      class="alert text-gray-800 absolute w-64 h-16 top-24 right-3"
      :class="{
        'alert-success': type === 'success',
        'alert-error': type === 'error',
        'alert-warning': type === 'warning',
        'alert-info': type === 'info'
      }"
      v-if="show"
    >
      <span class="font-medium">{{ message }}</span>
    </div>
  </XyzTransition>
</template>
<style scoped></style>
