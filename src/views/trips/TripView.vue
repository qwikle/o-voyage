<script setup lang="ts">
import { useTravelStore } from '@/stores/travel.store'
import { useHead } from '@unhead/vue'
import DashboardWidget from '@/components/widgets/DashboardWidget.vue'
import { ref, watch } from 'vue'
import SelectTravelDayWidget from '@/components/widgets/SelectTravelDayWidget.vue'
import { useRouter, useRoute } from 'vue-router'
import { DateTime } from 'luxon'
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

const actualDate =
  travel.dateList.find((date) => date.value === route.params.date) ??
  travel.dateList.find((date) => date.value === DateTime.now().toFormat('yyyy-MM-dd')) ??
  travel.dateList[0]

const selectedDate = ref<{ day: number; date: string; value: string }>(actualDate)
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
