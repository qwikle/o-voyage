<script setup lang="ts">
import { BanknotesIcon, UserGroupIcon } from '@heroicons/vue/24/outline'
import CountryWidget from '@/components/widgets/CountryWidget.vue'
import StatusWidget from '@/components/widgets/StatusWidget.vue'
import type { ITravel } from '@/models'
import { type PropType, computed, ref } from 'vue'
import { useAuthStore } from '@/stores/auth.store'
import { useTravelStore } from '@/stores/travel.store'
import DialogComponent from '../DialogComponent.vue'
const props = defineProps({
  travel: {
    type: Object as PropType<ITravel>,
    required: true
  }
})
const authStore = useAuthStore()
const travelStore = useTravelStore()
const canDelete = computed(() => {
  return authStore.user?.id === props.travel.organizerId
})
function deleteTravel() {
  travelStore.deleteTravel(props.travel.id)
}
const isOpen = ref(false)

function setIsOpen(value: boolean) {
  isOpen.value = value
}
</script>
<template>
  <article
    class="shadow bg-slate-800 rounded-xl flex flex-col w-96 h-[28rem] transition-all transform hover:scale-105 duration-300 ease-in-out"
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
          <button v-if="canDelete" @click="setIsOpen(true)" class="btn btn-sm btn-error">
            supprimer
          </button>
        </div>
      </div>
    </div>
    <DialogComponent :show="isOpen" title="Supprimer Voyage" @close="setIsOpen">
      <p class="p-2">
        Êtes-vous sûr de vouloir supprimer le voyage
        <span class="font-bold">{{ travel.title }}</span>
        ?
      </p>
      <div class="flex justify-end gap-2 p-4">
        <button class="btn btn-sm btn-error" @click="deleteTravel">Supprimer</button>
        <button class="btn btn-sm btn-base" @click="setIsOpen(false)">Annuler</button>
      </div>
    </DialogComponent>
  </article>
</template>
<style scoped></style>
