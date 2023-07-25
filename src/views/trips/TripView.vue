<script setup lang="ts">
import { useTravelStore } from '@/stores/travel.store'
import { useHead } from '@unhead/vue'
import DashboardWidget from '@/components/widgets/DashboardWidget.vue'
const travel = useTravelStore().travel!
useHead({
  title: `${travel.title}`,
  meta: [
    {
      name: 'description',
      content: `Voyage de ${travel.from} à ${travel.to} du ${travel.departureDateFormatted} au ${travel.arrivalDateFormatted}`
    }
  ]
})
</script>
<template>
  <div class="flex flex-col gap-y-4">
    <DashboardWidget :travel="travel" />
  </div>
</template>
<style scoped></style>
