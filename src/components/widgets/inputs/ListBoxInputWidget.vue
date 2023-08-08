<script setup lang="ts">
import {
  Listbox,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
  ListboxLabel
} from '@headlessui/vue'
import { ChevronUpDownIcon, CheckIcon } from '@heroicons/vue/24/outline'
import { useField } from 'vee-validate'
import { watch } from 'vue'
const props = defineProps<ListBoxInputWidgetProps>()

export interface ListBoxInputWidgetProps {
  name: string
  label: string
  modelValue: IOption
  placeholder: string
  ariaLabel: string
  required: boolean
  disabled: boolean
  options: IOption[]
  by?: any
}

interface IOption {
  name: string
  id: number
}

const emit = defineEmits(['update:modelValue'])

const { value, errorMessage } = useField(
  props.name,
  {},
  {
    initialValue: props.modelValue
  }
)

watch(value, (newValue) => {
  if (newValue !== props.modelValue) {
    emit('update:modelValue', newValue)
  }
})

watch(
  () => props.modelValue,
  (newValue) => {
    if (newValue !== value.value) {
      value.value = newValue
    }
  }
)
</script>
<template>
  <Listbox
    :modelValue="value"
    @update:modelValue="$emit('update:modelValue', $event)"
    as="div"
    class="relative w-full flex flex-col select-none"
    :ariaLabel="ariaLabel"
    by="id"
  >
    <ListboxLabel class="self-start text-sm font-semibold absolute -top-5">
      {{ label }}
    </ListboxLabel>
    <ListboxButton
      class="h-12 px-2 placeholder:text-sm outline-none bg-slate-100 rounded-lg w-full focus:ring-2 focus:ring-primary text-sm relative"
    >
      <p>{{ value.name ? value.name : `Séléctionnez un(e) ${label}` }}</p>
      <ChevronUpDownIcon class="absolute right-2 top-3 h-6 w-6 text-gray-600" />
    </ListboxButton>
    <XyzTransition xyz="fade in-out duration-2" appear>
      <ListboxOptions
        class="absolute w-full z-10 bg-gray-50 shadow-lg rounded-md overflow-hidden text-start p-3 top-14 flex flex-col gap-y-2 outline-none"
      >
        <ListboxOption
          v-for="(option, index) in options"
          :key="index"
          :value="option"
          :disabled="option ? false : true"
          v-slot="{ active, selected }"
          class="cursor-pointer relative hover:bg-primary hover:text-white rounded-md"
        >
          <li
            class="cursor-pointer py-2 pl-3 pr-9 hover:bg-primary rounded-md hover:text-white flex justify-between"
            :class="{ 'bg-primary text-white': selected || active }"
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
    <XyzTransition appear mode="out-in" xyz="fade duration-3">
      <small v-if="errorMessage" class="text-red-500 text-xs lg:text-sm self-start">
        {{ errorMessage }}
      </small>
    </XyzTransition>
  </Listbox>
</template>
<style scoped></style>
