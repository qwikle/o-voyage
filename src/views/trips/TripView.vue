<script setup lang="ts">
import CountryWidget from '@/components/widgets/CountryWidget.vue'
import {
  CalendarDaysIcon,
  ArrowSmallRightIcon,
  UserIcon,
  BanknotesIcon,
  UsersIcon
} from '@heroicons/vue/24/outline'
import { useTravelStore } from '@/stores/travel.store'
import StatusWidget from '@/components/widgets/StatusWidget.vue'
const travel = useTravelStore().travel!
</script>
<template>
  <aside
    class="flex flex-col justify-center items-center gap-y-4 lg:flex-row lg:justify-between p-4"
  >
    <div class="h-32 w-52 lg:w-1/6 shadow bg-gray-200 rounded-lg flex">
      <CountryWidget :name="travel.to" class="w-full h-full object-cover rounded-lg" />
    </div>
    <div class="h-32 w-52 lg:w-1/6 shadow bg-gray-50 rounded-lg px-2 flex flex-col gap-y-4">
      <div class="flex justify-between items-center">
        <div class="w-10 h-10 flex justify-center items-center bg-sky-100 rounded-lg mt-3">
          <CalendarDaysIcon class="w-8 h-8 text-sky-400" />
        </div>
        <StatusWidget :status="travel.status" />
      </div>

      <div class="flex justify-between items-center">
        <span class="text-gray-500 text-sm">{{ travel.departureDateFormatted }}</span>
        <ArrowSmallRightIcon class="w-4 h-4 text-emerald-500" />
        <span class="text-gray-500 text-sm">{{ travel.arrivalDateFormatted }}</span>
      </div>
    </div>
    <div class="h-32 w-52 lg:w-1/6 shadow bg-gray-50 rounded-lg px-2 flex flex-col gap-y-4">
      <div class="flex justify-between items-center">
        <div class="w-10 h-10 flex justify-center items-center bg-orange-100 rounded-lg mt-3">
          <UserIcon class="w-8 h-8 text-orange-400" />
        </div>
        <h3 class="text-sm font-light text-gray-600 bg-orange-100 rounded-2xl px-2">
          Organisateur
        </h3>
      </div>
      <div class="flex flex-col items-end">
        <p class="text-sm text-gray-500">{{ travel.organizer.fullname }}</p>
      </div>
    </div>

    <div class="h-32 w-52 lg:w-1/6 shadow bg-gray-50 rounded-lg px-2 flex flex-col gap-y-4">
      <div class="flex justify-between items-center">
        <div class="w-10 h-10 flex justify-center items-center bg-green-100 rounded-lg mt-3">
          <BanknotesIcon class="w-8 h-8 text-green-400" />
        </div>
        <h3 class="text-sm font-light text-gray-600 bg-green-100 rounded-2xl px-2">Budget</h3>
      </div>
      <div class="flex flex-col items-end">
        <p class="text-sm text-gray-500">Budget total : {{ travel.budget }} €</p>
        <p class="text-sm text-gray-500">Budget restant : 25 €</p>
      </div>
    </div>
    <div class="h-32 w-52 lg:w-1/6 shadow bg-gray-50 rounded-lg px-2 flex flex-col gap-y-4">
      <div class="flex justify-between items-center">
        <div class="w-10 h-10 flex justify-center items-center bg-violet-100 rounded-lg mt-3">
          <UsersIcon class="w-8 h-8 text-violet-400" />
        </div>
        <h3 class="text-sm font-light text-gray-600 bg-violet-100 rounded-2xl px-2">Voyageurs</h3>
      </div>
      <div class="flex justify-between items-center">
        <span class="text-sm">{{ travel.travelers.length }}</span>
        <progress
          class="progress progress-primary w-4/5"
          :value="travel.travelers.length"
          :max="travel.numberOfTravelers"
        />
        <span class="text-sm">{{ travel.numberOfTravelers }}</span>
      </div>
    </div>
  </aside>
</template>
<style scoped></style>
