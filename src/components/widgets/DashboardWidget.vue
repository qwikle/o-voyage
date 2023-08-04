<script setup lang="ts">
import type { ITravel } from '@/models'
import { type PropType, computed } from 'vue'
import CountryWidget from '@/components/widgets/CountryWidget.vue'
import { CalendarDaysIcon, ArrowSmallRightIcon } from '@heroicons/vue/24/outline'
import CardDashboardWidget from './CardDashboardWidget.vue'
import StatusWidget from './StatusWidget.vue'

const props = defineProps({
  travel: {
    type: Object as PropType<ITravel>,
    required: true
  }
})

const budgetLeft = computed(() => {
  const totalPriceActivities = props.travel.activities.reduce(
    (acc, activity) => acc + activity.price,
    0
  )
  return props.travel.budget - totalPriceActivities
})

const percentageBudgetLeft = computed(() => {
  return Math.round((budgetLeft.value / props.travel.budget) * 100)
})
</script>
<template>
  <aside
    class="flex flex-col justify-center items-center gap-y-4 lg:flex-row lg:justify-between select-none"
  >
    <div class="h-32 w-48 shadow rounded-lg flex">
      <CountryWidget :name="travel.to" class="object-cover w-full rounded-lg" />
    </div>

    <div class="h-32 w-full lg:w-1/5 shadow bg-gray-50 rounded-lg px-2 flex flex-col gap-y-4">
      <div class="flex justify-between items-center">
        <div class="w-10 h-10 flex justify-center items-center bg-sky-100 rounded-lg mt-3">
          <CalendarDaysIcon class="w-8 h-8 text-sky-400" />
        </div>
        <StatusWidget :status="travel.status" />
      </div>

      <div class="flex justify-between items-cente text-gray-500 text-md">
        <span>{{ travel.departureDateFormatted }}</span>
        <ArrowSmallRightIcon class="w-6 h-6 text-emerald-500" />
        <span>{{ travel.arrivalDateFormatted }}</span>
      </div>
    </div>

    <CardDashboardWidget title="Organisateur" icon="UserIcon" color="orange">
      <div class="flex flex-col items-center">
        <p class="text-md text-orange-500 capitalize">{{ travel.organizer.fullname }}</p>
      </div>
    </CardDashboardWidget>

    <CardDashboardWidget title="Budget" icon="BanknotesIcon" color="emerald">
      <div class="flex justify-between text-sm lg:text-md font-light">
        <div class="flex flex-col">
          <p>Budget total</p>
          <span class="text-emerald-600 text-center">{{ travel.budget }}€</span>
        </div>
        <div class="flex flex-col">
          <p>Budget restant</p>
          <span
            class="text-center"
            :class="{
              'text-emerald-600': percentageBudgetLeft > 75,
              'text-yellow-600': percentageBudgetLeft > 50 && percentageBudgetLeft < 75,
              'text-red-600': percentageBudgetLeft < 25
            }"
            >{{ budgetLeft }}€</span
          >
        </div>
      </div>
    </CardDashboardWidget>

    <CardDashboardWidget title="Voyageurs" icon="UsersIcon" color="violet">
      <div class="flex gap-2 flex-col text-gray-500">
        <div class="flex justify-between text-xs lg:text-sm">
          <span
            :class="{
              'text-violet-600': travel.travelers.length === travel.numberOfTravelers
            }"
            >Actuellement</span
          >
          <span
            :class="{
              'text-violet-600': travel.travelers.length === travel.numberOfTravelers
            }"
          >
            {{ travel.travelers.length }} / {{ travel.numberOfTravelers }}</span
          >
        </div>
        <div class="w-full bg-gray-200 rounded-full">
          <div
            class="text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full"
            :style="{
              width: Math.round((100 * travel.travelers.length) / travel.numberOfTravelers) + '%'
            }"
            :class="{
              'bg-violet-600': travel.travelers.length === travel.numberOfTravelers,
              'bg-violet-300': travel.travelers.length !== travel.numberOfTravelers
            }"
          ></div>
        </div>
      </div>
    </CardDashboardWidget>
  </aside>
</template>
