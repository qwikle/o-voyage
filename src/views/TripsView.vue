<script setup lang="ts">
import { useHead } from '@unhead/vue'
import { PlusIcon } from '@heroicons/vue/24/outline'
import { ref } from 'vue'
import DialogComponent from '@/components/DialogComponent.vue'
import TravelFormWidget from '@/components/widgets/TravelFormWidget.vue'
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
      <TravelFormWidget />
    </DialogComponent>
  </div>
</template>
<style scoped></style>
