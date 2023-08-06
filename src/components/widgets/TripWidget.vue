<script setup lang="ts">
import { BanknotesIcon, UserGroupIcon } from '@heroicons/vue/24/outline'
import CountryWidget from '@/components/widgets/CountryWidget.vue'
import StatusWidget from '@/components/widgets/StatusWidget.vue'
import type { ITravel } from '@/models'
import { type PropType, computed, ref } from 'vue'
import { useAuthStore } from '@/stores/auth.store'
import { useTravelStore } from '@/stores/travel.store'
import DialogComponent from '@/components/DialogComponent.vue'
const props = defineProps({
  travel: {
    type: Object as PropType<ITravel>,
    required: true
  }
})
const title = computed(() => {
  return props.travel.title
})
const authStore = useAuthStore()
const travelStore = useTravelStore()
const canDelete = computed(() => {
  return authStore.user?.id === props.travel.organizerId
})

const fromTo = computed(() => {
  return [props.travel.from, props.travel.to]
})

const departureArrivalDate = computed(() => {
  return [
    { prepend: 'Du', text: props.travel.departureDateFormatted },
    { prepend: 'Au', text: props.travel.arrivalDateFormatted }
  ]
})

const to = computed(() => {
  return { name: 'TripOverview', params: { slug: props.travel.slug } }
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
  <article class="shadow rounded-xl flex flex-col w-96 h-64 relative">
    <CountryWidget :name="travel.to" class="w-full h-full object-cover absolute z-0 rounded-xl" />
    <div class="p-4 text-slate-200 bg-slate-800/60 font-bold h-full backdrop-blur-sm rounded-xl">
      <h2 class="font-extrabold text-xl">{{ travel.title }}</h2>
      <div class="flex items-start flex-col gap-2">
        <StatusWidget :status="travel.status" class="self-end" />
        <div class="w-full self-center flex justify-between">
          <p v-for="(element, index) in departureArrivalDate" :key="index">
            <span class="font-bold">{{ element.prepend }}</span> :
            <span class="text-lg">{{ element.text }}</span>
          </p>
        </div>
        <div class="w-full flex justify-between">
          <p v-for="(element, index) in fromTo" :key="index">
            <span class="text-lg">{{ element }}</span>
          </p>
        </div>
        <div class="w-full flex items-center justify-between">
          <div class="flex items-center gap-2">
            <BanknotesIcon class="w-8 h-8" />
            <p>{{ travel.budget }} €</p>
          </div>
          <div class="flex items-center gap-2">
            <UserGroupIcon class="w-8 h-8" />
            <p>{{ travel.numberOfTravelers }}</p>
          </div>
        </div>
        <div class="w-full flex items-center justify-between py-6">
          <RouterLink :to="to" class="btn btn-sm btn-base" aria-label="consulter le voyage"
            >consulter</RouterLink
          >
          <button
            v-if="canDelete"
            @click="setIsOpen(true)"
            class="btn btn-sm btn-base"
            aria-label="suprimer le voyage"
          >
            supprimer
          </button>
        </div>
      </div>
    </div>
    <DialogComponent :show="isOpen" :title="title" @close="setIsOpen">
      <p class="p-2">
        Êtes-vous sûr de vouloir supprimer le voyage
        <span class="font-bold">{{ travel.title }}</span>
        ?
      </p>
      <div class="flex justify-end gap-2 p-4">
        <button
          class="btn btn-sm btn-error"
          @click="deleteTravel"
          aria-label="supperimer le voyage"
        >
          Supprimer
        </button>
        <button class="btn btn-sm btn-base" @click="setIsOpen(false)" aria-label="annuler">
          Annuler
        </button>
      </div>
    </DialogComponent>
  </article>
</template>
<style scoped></style>
