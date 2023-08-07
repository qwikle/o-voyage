<script setup lang="ts">
import { type PropType } from 'vue'
import {
  Listbox,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
  ListboxLabel
} from '@headlessui/vue'
import {
  ChevronUpDownIcon,
  CheckIcon,
  ChevronLeftIcon,
  ChevronRightIcon
} from '@heroicons/vue/24/outline'

const props = defineProps({
  startedDate: {
    type: String,
    required: true
  },
  arrivalDate: {
    type: String,
    required: true
  },
  modelValue: {
    type: Object as PropType<{ day: number; date: string; value: string; message?: string }>,
    required: true
  },
  dates: {
    type: Array as PropType<{ day: number; date: string; value: string; message?: string }[]>,
    required: true
  }
})

const emit = defineEmits(['update:modelValue'])

function siblingDate(value: 'next' | 'last') {
  const index = props.dates.findIndex((date) => date.value === props.modelValue.value)
  if (value === 'next') {
    emit('update:modelValue', props.dates[index + 1])
  } else {
    emit('update:modelValue', props.dates[index - 1])
  }
}

function isSiblingDate(value: 'next' | 'last') {
  const index = props.dates.findIndex((date) => date.value === props.modelValue.value)
  if (value === 'next') {
    return index < props.dates.length - 1
  }
  return index > 0
}
</script>
<template>
  <Listbox
    :modelValue="modelValue"
    @update:model-value="$emit('update:modelValue', $event)"
    as="div"
    class="relative w-full flex items-center gap-2 justify-center select-none"
  >
    <button
      @click="siblingDate('last')"
      :disabled="!isSiblingDate('last')"
      class="w-1/5 h-10 btn btn-sm"
      aria-label="Date précédante"
    >
      <span class="hidden md:inline">précédent</span>
      <ChevronLeftIcon class="h-5 w-5 md:hidden" />
    </button>

    <ListboxButton
      class="bg-gray-100 w-3/5 h-10 text-gray-600 relative shadow-sm rounded-lg outline-none"
    >
      <ListboxLabel class="text-gray-600 text-sm">
        <template v-if="modelValue.message">
          {{ modelValue.message }}
        </template>
        <template v-else> Jour {{ modelValue.day }} Le {{ modelValue.date }} </template>
      </ListboxLabel>
      <ChevronUpDownIcon class="absolute right-2 top-2 h-6 w-6 text-gray-600" />
    </ListboxButton>
    <XyzTransition xyz="fade in-out duration-2" appear>
      <ListboxOptions
        class="absolute outline-none text-slate-600 text-sm gap-y-3 flex w-3/5 max-h-52 overflow-y-auto top-14 rounded-lg flex-col p-4 bg-gray-50 shadow-lg z-10"
      >
        <ListboxOption
          v-for="(date, index) in dates"
          :key="index"
          :value="date"
          :disabled="date.message === 'Sélectionnez une date'"
          v-slot="{ active, selected }"
        >
          <li
            class="cursor-pointer hover:bg-primary rounded-lg hover:text-white p-2 flex justify-between"
            :class="{
              'bg-primary text-white': active || selected
            }"
          >
            <template v-if="date.message">
              {{ date.message }}
            </template>
            <template v-else> Jour {{ date.day }} - Le {{ date.date }} </template>
            <CheckIcon v-show="selected" class="h-5 w-5 text-emerald-500 hidden md:block" />
          </li>
        </ListboxOption>
      </ListboxOptions>
    </XyzTransition>
    <button
      :disabled="!isSiblingDate('next')"
      @click="siblingDate('next')"
      class="w-1/5 h-10 btn btn-sm"
      aria-label="Date suivante"
    >
      <span class="hidden md:inline">suivant</span>
      <ChevronRightIcon class="h-5 w-5 md:hidden" />
    </button>
  </Listbox>
</template>
