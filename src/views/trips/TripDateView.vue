<script setup lang="ts">
import { ref } from 'vue'
import activities from '@/assets/undraw/activities.svg'
import DialogComponent from '@/components/DialogComponent.vue'

const isOpen = ref(false)
function setIsOpen(value: boolean) {
  isOpen.value = value
}
</script>
<template>
  <div class="my-4">
    <div class="flex gap-y-2 flex-col items-center w-full">
      <button @click="setIsOpen(true)" class="btn btn-primary btn-sm self-end">
        Créer une activité
      </button>
      <img :src="activities" alt="activities svg" class="w-full md:w-1/2" />
      <h4 class="text-sm font-semibold italic md:text-lg">
        Vous n'avez aucune activités de prévue pour cette date
      </h4>
    </div>
    <DialogComponent :show="isOpen" title="Créer une Activité" @close="setIsOpen"></DialogComponent>
  </div>
</template>
<style scoped></style>
