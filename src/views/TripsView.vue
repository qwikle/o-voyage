<script setup lang="ts">
import { useHead } from '@unhead/vue'
import { PlusIcon } from '@heroicons/vue/24/outline'
import {
  Dialog,
  DialogTitle,
  DialogPanel,
  DialogDescription,
  TransitionRoot,
  TransitionChild
} from '@headlessui/vue'
import { ref } from 'vue'
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
    <button class="self-end btn btn-sm btn-primary" @click="setIsOpen(true)">
      Créer un voyage
    </button>
    <TransitionRoot :show="isOpen" as="template">
      <Dialog @close="setIsOpen">
        <TransitionChild
          enter="duration-300 ease-out"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="duration-200 ease-in"
          leave-from="opacity-100"
          leave-to="opacity-0"
        >
          <div
            class="fixed inset-0 flex items-center justify-center p-4 bg-black/30"
            aria-hidden="true"
          >
            <DialogPanel class="shadow mx-auto lg:w-1/2 rounded-xl bg-white">
              <div class="flex flex-col gap-4">
                <DialogTitle class="text-center text-2xl font-bold text-slate-700">
                  Créer un voyage
                </DialogTitle>
                <DialogDescription class="text-center text-slate-700">
                  Créez un voyage et invitez vos amis et votre famille à vous rejoindre dans votre
                  périple !
                </DialogDescription>
              </div>
            </DialogPanel>
          </div>
        </TransitionChild>
      </Dialog>
    </TransitionRoot>
  </div>
</template>
<style scoped></style>
