<script setup lang="ts">
import {
  Dialog,
  DialogTitle,
  DialogPanel,
  DialogDescription,
  TransitionRoot,
  TransitionChild
} from '@headlessui/vue'
defineProps({
  title: {
    type: String,
    required: true
  },
  show: {
    type: Boolean,
    required: true
  }
})
defineEmits(['close'])
</script>
<template>
  <TransitionRoot :show="show" as="template">
    <Dialog @close="$emit('close', false)">
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
          <DialogPanel class="shadow mx-auto lg:w-1/2 rounded-xl bg-white py-4">
            <div class="flex flex-col gap-4">
              <DialogTitle class="text-center text-2xl font-bold text-slate-700">
                {{ title }}
              </DialogTitle>
              <DialogDescription class="text-center text-slate-700">
                <slot></slot>
              </DialogDescription>
            </div>
          </DialogPanel>
        </div>
      </TransitionChild>
    </Dialog>
  </TransitionRoot>
</template>
<style scoped></style>
