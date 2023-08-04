<script setup lang="ts">
import { useTravelStore } from '@/stores/travel.store'
import { useHead } from '@unhead/vue'
import DashboardWidget from '@/components/widgets/DashboardWidget.vue'
import { type RouteLocationRaw } from 'vue-router'

import { Cog8ToothIcon, HomeIcon, SquaresPlusIcon } from '@heroicons/vue/24/outline'
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

const paths: Path[] = [
  {
    route: { name: 'TripOverview', params: { slug: travel.slug } },
    name: 'Général',
    icon: HomeIcon
  },
  {
    route: { name: 'TripActivities', params: { slug: travel.slug } },
    name: 'Activités',
    icon: SquaresPlusIcon
  },
  {
    route: { name: 'TripSettings', params: { slug: travel.slug } },
    name: 'Paramètres',
    icon: Cog8ToothIcon
  }
]

interface Path {
  route: RouteLocationRaw
  name: string
  icon: any
}
</script>
<template>
  <div class="flex flex-col gap-y-4 p-4">
    <DashboardWidget :travel="travel" />
    <div class="h-12 w-full flex items-center gap-x-4">
      <RouterLink
        v-for="(path, index) in paths"
        :key="index"
        :to="path.route"
        class="w-32 flex justify-center gap-x-2 items-center h-10 rounded-lg text-slate-700 hover:bg-gray-200"
        activeClass="bg-gray-200"
      >
        <component :is="path.icon" class="h-5 w-5" />
        {{ path.name }}</RouterLink
      >
    </div>
    <RouterView v-slot="{ Component }">
      <XyzTransition appear mode="out-in" xyz="fade duration-3">
        <component :is="Component" />
      </XyzTransition>
    </RouterView>
  </div>
</template>
<style scoped></style>
