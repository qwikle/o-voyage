<script setup lang="ts">
import { onMounted, computed } from 'vue'
import { useHead } from '@unhead/vue'
import { PlusIcon } from '@heroicons/vue/24/outline'
import { ref } from 'vue'
import DialogComponent from '@/components/DialogComponent.vue'
import TravelFormWidget from '@/components/widgets/TravelFormWidget.vue'
import NoTravelWidget from '@/components/widgets/NoTravelWidget.vue'
import { useTravelStore } from '@/stores/travel.store'
import type { Travel } from '@/models'
import WavesSvgWidget from '@/components/widgets/svg/WavesSvgWidget.vue'
import type { TravelInput } from '@/services/travel/travel.service'
useHead({
  title: 'Mes voyages',
  meta: [
    {
      name: 'description',
      content: 'Retrouvez votre historique de voyages et gérez vos prochains voyages'
    },
    {
      name: 'keywords',
      content: 'voyage, gestion, budget, amis, famille, photos'
    }
  ]
})
const isOpen = ref(false)
function setIsOpen(value: boolean) {
  isOpen.value = value
}
const travels = computed<Travel[]>(() => {
  return travelStore.travels
})
const travelStore = useTravelStore()
onMounted(async () => {
  await travelStore.getTravels()
})

async function createTravel(travel: TravelInput) {
  travel.from = 'France'
  console.log(travel)
}
</script>
<template>
  <div class="w-full pt-10 flex flex-col gap-4 px-4 overflow-x-auto">
    <h1 class="text-center text-2xl font-bold text-slate-700">Mes Voyages</h1>
    <button
      class="self-end btn btn-circle btn-primary lg:hidden"
      aria-label="add"
      @click="setIsOpen(true)"
    >
      <PlusIcon class="w-8 h-8" />
    </button>
    <button class="self-end btn btn-sm btn-primary hidden lg:block" @click="setIsOpen(true)">
      Créer un voyage
    </button>
    <DialogComponent :show="isOpen" title="Créer un voyage" @close="setIsOpen">
      <TravelFormWidget isDialog @submit="createTravel" />
    </DialogComponent>
    <NoTravelWidget v-if="!travels.length" />
    <div class="grid grid-flow-row grid-cols-1 lg:grid-cols-4 gap-4 p-4">
      <div
        class="rounded-xl bg-slate-700 text-white shadow flex flex-col"
        v-for="(travel, index) in travels"
        :key="index"
      >
        <WavesSvgWidget class="h-50 w-50 fill-blue-500" />
      </div>
    </div>
  </div>
</template>
<style scoped></style>
