<script setup lang="ts">
import CountryWidget from '@/components/widgets/CountryWidget.vue'
import { CalendarDaysIcon, ArrowSmallRightIcon } from '@heroicons/vue/24/outline'
import { useTravelStore } from '@/stores/travel.store'
import StatusWidget from '@/components/widgets/StatusWidget.vue'
import CardDashboardWidget from '@/components/widgets/CardDashboardWidget.vue'
import { useHead } from '@unhead/vue'

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
  <aside
    class="flex flex-col justify-center items-center gap-y-4 lg:flex-row lg:justify-between p-4 select-none"
  >
    <div class="h-32 w-52 shadow bg-gray-200 rounded-lg flex">
      <CountryWidget :name="travel.to" class="object-cover w-full rounded-lg" />
    </div>

    <div class="h-32 w-full lg:w-1/5 shadow bg-gray-50 rounded-lg px-2 flex flex-col gap-y-4">
      <div class="flex justify-between items-center">
        <div class="w-10 h-10 flex justify-center items-center bg-sky-100 rounded-lg mt-3">
          <CalendarDaysIcon class="w-8 h-8 text-sky-400" />
        </div>
        <StatusWidget :status="travel.status" />
      </div>

      <div class="flex justify-between items-cente text-gray-500 text-sm">
        <span>{{ travel.departureDateFormatted }}</span>
        <ArrowSmallRightIcon class="w-5 h-5 text-emerald-500" />
        <span>{{ travel.arrivalDateFormatted }}</span>
      </div>
    </div>

    <CardDashboardWidget title="Organisateur" icon="UserIcon" color="orange">
      <div class="flex flex-col items-center">
        <p class="text-lg text-gray-500">{{ travel.organizer.fullname }}</p>
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
          <span class="text-red-600 text-center">{{ travel.budget }}€</span>
        </div>
      </div>
    </CardDashboardWidget>

    <CardDashboardWidget title="Voyageurs" icon="UsersIcon" color="violet">
      <div class="flex gap-2 flex-col text-gray-500">
        <span class="text-xs lg:text-sm">Actuellement</span>
        <div class="w-full bg-gray-200 rounded-full">
          <div
            class="bg-violet-600 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full"
            :style="{
              width: Math.round((100 * travel.travelers.length) / travel.numberOfTravelers) + '%'
            }"
          >
            {{ travel.travelers.length }} / {{ travel.numberOfTravelers }}
          </div>
        </div>
      </div>
    </CardDashboardWidget>
  </aside>
</template>
<style scoped></style>
