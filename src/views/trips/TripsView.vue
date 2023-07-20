<script setup lang="ts">
import { onMounted, computed } from 'vue'
import { useHead } from '@unhead/vue'
import { PlusIcon, BanknotesIcon, UserGroupIcon } from '@heroicons/vue/24/outline'
import { ref } from 'vue'
import DialogComponent from '@/components/DialogComponent.vue'
import TravelFormWidget from '@/components/widgets/TravelFormWidget.vue'
import NoTravelWidget from '@/components/widgets/NoTravelWidget.vue'
import { useTravelStore } from '@/stores/travel.store'
import type { Travel } from '@/models'
import CountryWidget from '@/components/widgets/CountryWidget.vue'
import { TravelInput, type ITravelInput } from '@/models'
import StatusWidget from '@/components/widgets/StatusWidget.vue'
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

async function createTravel(travel: ITravelInput) {
  await travelStore.createTravel(TravelInput.toJSON(travel))
  setIsOpen(false)
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
    <button class="self-end btn btn-md btn-primary hidden lg:block" @click="setIsOpen(true)">
      Créer un voyage
    </button>
    <DialogComponent :show="isOpen" title="Créer un voyage" @close="setIsOpen">
      <TravelFormWidget isDialog @submit="createTravel" />
    </DialogComponent>
    <NoTravelWidget v-if="!travels.length" />
    <div class="flex flex-wrap gap-4 p-4 w-full h-full">
      <article
        v-for="travel in travels"
        :key="travel.id"
        class="shadow bg-slate-800 rounded-xl flex flex-col w-96 h-[28rem]"
      >
        <CountryWidget :name="travel.to" class="rounded-t-lg w-full h-48 object-cover" />
        <div class="p-4 text-white font-bold h-full">
          <h2 class="text-center font-extrabold text-xl">{{ travel.title }}</h2>
          <div class="flex flex-col gap-2">
            <StatusWidget :status="travel.status" />
            <div class="flex justify-around">
              <p>
                <span class="font-bold">Du</span> :
                <span class="italic">{{ travel.departureDateFormatted }}</span>
              </p>
              <p>
                <span class="font-bold">Au</span> :
                <span class="italic"> {{ travel.arrivalDateFormatted }}</span>
              </p>
            </div>
            <div class="flex justify-around">
              <p>
                <span class="italic">{{ travel.from }}</span>
              </p>
              <p>
                <span class="italic"> {{ travel.to }}</span>
              </p>
            </div>
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-2">
                <BanknotesIcon class="w-8 h-8" />
                <p>{{ travel.budget }} €</p>
              </div>
              <div class="flex items-center gap-2">
                <UserGroupIcon class="w-8 h-8" />
                <p>{{ travel.numberOfTravelers }}</p>
              </div>
            </div>
            <div class="flex items-center justify-between py-6">
              <button class="btn btn-sm btn-info">consulter</button>
              <button class="btn btn-sm btn-error">supprimer</button>
            </div>
          </div>
        </div>
      </article>
    </div>
  </div>
</template>
<style scoped></style>
