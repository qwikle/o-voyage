<script setup lang="ts">
import { useHead } from '@unhead/vue'
import { PlusIcon } from '@heroicons/vue/24/outline'
import { ref } from 'vue'
import DialogComponent from '@/components/DialogComponent.vue'
import TravelFormWidget from '@/components/widgets/forms/TravelFormWidget.vue'
import NoTravelWidget from '@/components/widgets/NoTravelWidget.vue'
import { useTravelStore } from '@/stores/travel.store'
import { TravelInput, type ITravelInput } from '@/models'
import TripWidget from '@/components/widgets/TripWidget.vue'
useHead({
  title: 'Mes voyages',
  meta: [
    {
      name: 'description',
      content: 'Retrouvez votre historique de voyages et gérez vos prochains voyages'
    },
    {
      name: 'keywords',
      content: 'voyage, gestion, budget, amis, famille, photos, souvenirs'
    }
  ]
})
const travelStore = useTravelStore()
const isOpen = ref(false)
function setIsOpen(value: boolean) {
  isOpen.value = value
}
const travels = travelStore.travels

async function createTravel(travel: ITravelInput) {
  await travelStore.createTravel(TravelInput.toJSON(travel))
  setIsOpen(false)
}
</script>
<template>
  <div class="w-full pt-10 flex flex-col gap-4 px-4 overflow-x-auto">
    <h1 class="text-center text-2xl font-bold text-slate-700">Mes Voyages</h1>
    <button
      class="self-end btn btn-circle btn-base lg:hidden shadow-md"
      aria-label="créer un voyage"
      @click="setIsOpen(true)"
    >
      <PlusIcon class="w-8 h-8" />
    </button>
    <button
      class="self-end btn btn-md btn-base hidden lg:block shadow-md"
      @click="setIsOpen(true)"
      aria-label="créer un voyage"
    >
      Créer un voyage
    </button>
    <DialogComponent :show="isOpen" title="Créer un voyage" @close="setIsOpen">
      <TravelFormWidget isDialog @submit="createTravel" @close="setIsOpen(false)" />
    </DialogComponent>
    <NoTravelWidget v-if="!travels.length" />
    <XyzTransitionGroup
      class="flex flex-wrap gap-4 p-4 w-full h-full"
      appear
      xyz="fade flip-left origin-left duration-3 appear-stagger"
    >
      <TripWidget v-for="travel in travels" :key="travel.id" :travel="travel" />
    </XyzTransitionGroup>
  </div>
</template>
<style scoped></style>
