<script setup lang="ts">
import { ref, computed } from 'vue'
import activities from '@/assets/undraw/activities.svg'
import DialogComponent from '@/components/DialogComponent.vue'
import ActivityFormWidget from '@/components/widgets/forms/ActivityFormWidget.vue'
import { useRoute } from 'vue-router'
import { useTravelStore } from '@/stores/travel.store'
import { DateTime } from 'luxon'
const route = useRoute()
const travel = useTravelStore().travel!
const isOpen = ref(false)
function setIsOpen(value: boolean) {
  isOpen.value = value
}
const isDisabled = computed(() => {
  const date = DateTime.now()
  return date > DateTime.fromISO(travel.arrivalDate)
})
</script>
<template>
  <div class="my-4">
    <div class="flex gap-y-2 flex-col items-center w-full">
      <button
        @click="setIsOpen(true)"
        class="btn btn-primary btn-sm self-end"
        :disabled="isDisabled"
      >
        Créer une activité
      </button>
      <img :src="activities" alt="activities svg" class="w-full md:w-1/2" />
      <h4 class="text-sm font-semibold italic md:text-lg">
        Vous n'avez aucune activités de prévue pour cette date
      </h4>
    </div>
    <DialogComponent :show="isOpen" title="Créer une Activité" @close="setIsOpen">
      <ActivityFormWidget
        :initialDate="(route.params.date as string)"
        :travel="travel"
        @close="setIsOpen"
      />
    </DialogComponent>
  </div>
</template>
<style scoped></style>
