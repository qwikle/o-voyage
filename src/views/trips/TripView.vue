<script setup lang="ts">
import { useTravelStore } from '@/stores/travel.store'
import { useHead } from '@unhead/vue'
import DashboardWidget from '@/components/widgets/DashboardWidget.vue'
import { ref, watch } from 'vue'
import SelectTravelDayWidget from '@/components/widgets/SelectTravelDayWidget.vue'
import { useRouter, useRoute } from 'vue-router'
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

const route = useRoute()
const router = useRouter()

const selectedDate = ref<{ day: number; date: string; value: string }>({
  day: 1,
  date: new Date((route.params.date as string) ?? travel.departureDate).toLocaleDateString('fr-FR'),
  value: (route.params.date as string) ?? travel.departureDate
})

watch(selectedDate, (value) => {
  router.push({ name: 'TripDate', params: { date: value.value } })
})
</script>
<template>
  <div class="flex flex-col gap-y-4 p-4">
    <DashboardWidget :travel="travel" />
    <SelectTravelDayWidget
      :dates="travel.dateList"
      :startedDate="travel.departureDate"
      :arrivalDate="travel.arrivalDate"
      v-model="selectedDate"
    />
    <RouterView></RouterView>
  </div>
</template>
<style scoped></style>
