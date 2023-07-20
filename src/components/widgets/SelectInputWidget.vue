<script setup lang="ts">
import {
  Combobox,
  ComboboxInput,
  ComboboxOptions,
  ComboboxOption,
  ComboboxLabel
} from '@headlessui/vue'
import { type PropType } from 'vue'
import { CheckIcon } from '@heroicons/vue/24/outline'

defineProps({
  name: String,
  label: String,
  value: String,
  placeholder: String,
  required: Boolean,
  disabled: Boolean,
  autocomplete: String,
  options: {
    type: Array as PropType<{ name: string }[]>,
    default: () => []
  },
  by: {
    type: String,
    default: 'name'
  }
})
defineEmits(['update:modelValue', 'change'])
interface IOption {
  name: string
}
</script>
<template>
  <div class="relative w-full">
    <Combobox
      :modelValue="value"
      @update:modelValue="(value) => $emit('update:modelValue', value.name)"
      :by="by"
    >
      <ComboboxLabel :for="name" class="self-start text-sm font-semibold absolute -top-5">
        {{ label }}</ComboboxLabel
      >
      <ComboboxInput
        @change="$emit('change', $event)"
        class="h-12 px-2 placeholder:text-sm outline-none text-sm bg-slate-100 rounded-lg w-full focus:ring-2 focus:ring-primary"
        :id="name"
        :displayValue="(value) => (value as IOption).name  "
        :placeholder="placeholder"
        :autocomplete="autocomplete"
        :required="required"
      />
      <XyzTransition xyz="fade duration-2">
        <ComboboxOptions
          v-if="options.length > 0"
          class="bg-white absolute flex flex-col gap-y-2 text-xs justify center font-medium w-full mt-3 shadow z-40"
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
                'bg-primary text-white': active,
                'text-gray-600': !active
              }"
            >
              <CheckIcon class="h-5 w-5 text-green-500" v-if="selected" />
              {{ option.name }}
            </li>
          </ComboboxOption>
        </ComboboxOptions>
      </XyzTransition>
    </Combobox>
  </div>
</template>
<style scoped></style>
