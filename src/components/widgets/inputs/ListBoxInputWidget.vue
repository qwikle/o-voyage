<script setup lang="ts">
import {
  Listbox,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
  ListboxLabel
} from '@headlessui/vue'
import { ChevronUpDownIcon, CheckIcon } from '@heroicons/vue/24/outline'

defineProps<ListBoxInputWidgetProps>()

export interface ListBoxInputWidgetProps {
  name: string
  label: string
  modelValue: IOption
  placeholder: string
  ariaLabel: string
  required: boolean
  disabled: boolean
  options: IOption[]
}

interface IOption {
  name: string
  id: number
  message?: string
}

defineEmits(['update:modelValue'])
</script>
<template>
  <Listbox
    :modelValue="modelValue"
    @input="$emit('update:modelValue', $event)"
    as="div"
    class="relative w-full flex select-none"
    :ariaLabel="ariaLabel"
  >
    <ListboxButton
      class="h-12 px-2 placeholder:text-sm outline-none bg-slate-100 rounded-lg w-full focus:ring-2 focus:ring-primary text-sm relative"
    >
      <ListboxLabel class="text-gray-600 text-sm font-bold absolute -top-5 left-0">
        {{ label }}
      </ListboxLabel>
      <p>{{ modelValue.message ?? modelValue.name }}</p>
      <ChevronUpDownIcon class="absolute right-2 top-3 h-6 w-6 text-gray-600" />
    </ListboxButton>
    <XyzTransition xyz="fade in-out duration-2" appear>
      <ListboxOptions
        class="absolute w-full z-10 bg-gray-50 shadow-lg rounded-md overflow-hidden text-start p-3 top-14 flex flex-col gap-y-2"
      >
        <ListboxOption
          v-for="(option, index) in options"
          :key="index"
          :value="option"
          :disabled="option.message ? true : false"
          @click="$emit('update:modelValue', option)"
          v-slot="{ selected }"
          class="cursor-pointer relative hover:bg-primary hover:text-white rounded-md"
        >
          <li
            class="cursor-pointer py-2 pl-3 pr-9 hover:bg-primary rounded-md hover:text-white flex justify-between"
            :class="{ 'bg-primary text-white': selected }"
          >
            {{ option.name }}
            <CheckIcon
              v-show="selected"
              class="h-5 w-5 text-emerald-600 absolute right-2 top-2 hidden md:inline"
              aria-hidden="true"
            />
          </li>
        </ListboxOption>
      </ListboxOptions>
    </XyzTransition>
  </Listbox>
</template>
<style scoped></style>
