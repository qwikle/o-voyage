<script setup lang="ts">
import { computed } from 'vue'
const props = defineProps({
  status: {
    type: String,
    required: true
  }
})

const statusColor = computed(() => {
  switch (props.status) {
    case 'pending':
      return 'bg-warning'
    case 'finished':
      return 'bg-info'
    case 'ongoing':
      return 'bg-success'
    default:
      return 'bg-gray-500'
  }
})

const message = computed(() => {
  switch (props.status) {
    case 'pending':
      return 'En cours'
    case 'finished':
      return 'Terminé'
    case 'ongoing':
      return 'À venir'
    default:
      return 'Inconnu'
  }
})
</script>
<template>
  <div class="flex justify-center items-center gap-2">
    <span class="w-3 h-3 rounded-full flex justify-center items-center" :class="statusColor">
      <span class="w-3 h-3 rounded-full animate-ping" :class="statusColor"></span>
    </span>
    <span class="text-sm font-light italic">{{ message }}</span>
  </div>
</template>
<style scoped></style>
