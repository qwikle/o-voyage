<script setup lang="ts">
import {
  Combobox,
  ComboboxInput,
  ComboboxOptions,
  ComboboxOption,
  ComboboxLabel
} from '@headlessui/vue'
import { watch } from 'vue'
import { CheckIcon } from '@heroicons/vue/24/outline'
import { useField } from 'vee-validate'

const props = defineProps<SelectInputWidgetProps>()
const emit = defineEmits(['update:modelValue', 'change'])

export interface SelectInputWidgetProps {
  name: string
  label: string
  modelValue: string
  placeholder: string
  required: boolean
  disabled: boolean
  options: string[]
  by?: string
}

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
  <div class="relative w-full flex flex-col">
    <Combobox
      :modelValue="modelValue"
      @update:modelValue="(value) => $emit('update:modelValue', value)"
      :by="by"
    >
      <ComboboxLabel :for="name" class="self-start text-sm font-semibold absolute -top-5">
        {{ label }}</ComboboxLabel
      >
      <ComboboxInput
        @change="$emit('change', $event)"
        class="h-12 px-2 placeholder:text-sm outline-none text-sm bg-slate-100 rounded-lg w-full focus:ring-2 focus:ring-primary"
        :id="name"
        :placeholder="placeholder"
      />
      <XyzTransition xyz="fade duration-2">
        <ComboboxOptions
          v-if="options.length > 0"
          class="bg-white absolute top-10 p-2 rounded-md flex flex-col gap-y-2 text-xs justify center font-medium w-full mt-3 shadow z-40"
        >
          <ComboboxOption
            class="cursor-pointer w-full flex items-center"
            v-for="(option, index) in options"
            :key="index"
            :value="option"
            v-slot="{ active, selected }"
          >
            <li
              class="rounded px-2 flex items-center gap-x-2 h-10 w-full"
              :class="{
                'bg-primary text-white': selected || active,
                'text-gray-600': !active
              }"
            >
              <CheckIcon class="h-5 w-5 text-green-500" v-if="selected" />
              {{ option }}
            </li>
          </ComboboxOption>
        </ComboboxOptions>
      </XyzTransition>
    </Combobox>
    <XyzTransition appear mode="out-in" xyz="fade duration-3">
      <small v-if="errorMessage" class="text-red-500 text-xs lg:text-sm self-start">
        {{ errorMessage }}
      </small>
    </XyzTransition>
  </div>
</template>
<style scoped></style>
