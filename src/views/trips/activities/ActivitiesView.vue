<script setup lang="ts">
import { ref, watch } from 'vue'
import SelectTravelDayWidget from '@/components/widgets/SelectTravelDayWidget.vue'
import { useRouter, useRoute } from 'vue-router'
import { useTravelStore } from '@/stores/travel.store'

const travel = useTravelStore().travel!

const route = useRoute()
const router = useRouter()
const defaultValue = {
  day: 0,
  date: '',
  value: '',
  message: 'Sélectionnez une date'
}
const actualDate = travel.dateList.find((date) => date.value === route.params.date) ?? defaultValue

const selectedDate = ref<{ day: number; date: string; value: string; message?: string }>(actualDate)
watch(selectedDate, (value) => {
  router.push({ name: 'TripDate', params: { date: value.value } })
})
</script>
<template>
  <div class="flex flex-col">
    <SelectTravelDayWidget
      :dates="travel.dateList"
      :startedDate="travel.departureDate"
      :arrivalDate="travel.arrivalDate"
      v-model="selectedDate"
    />

    <RouterView v-slot="{ Component }">
      <XyzTransition appear mode="out-in" xyz="fade duration-3">
        <component :is="Component" />
      </XyzTransition>
    </RouterView>
  </div>
</template>
<style scoped></style>
