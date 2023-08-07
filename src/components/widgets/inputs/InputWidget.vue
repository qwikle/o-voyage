<script setup lang="ts">
import { Field, ErrorMessage } from 'vee-validate'
import { ref } from 'vue'
import { EyeIcon, EyeSlashIcon } from '@heroicons/vue/24/outline'
const props = defineProps<InputWidgetProps>()
const reactiveType = ref(props.type)

function togglePassword() {
  reactiveType.value = reactiveType.value === 'password' ? 'text' : props.type
}

defineEmits(['update:modelValue'])

export interface InputWidgetProps {
  name: string
  label?: string
  type?: string
  value?: string
  placeholder?: string
  required?: boolean
  disabled?: boolean
  autocomplete?: string
  isPassword?: boolean
  min?: number | string
  max?: number | string
  rules?: any
}
</script>
<template>
  <div class="flex flex-col items-center w-full gap-1 relative">
    <label v-if="label" :for="name" class="self-start text-sm font-semibold absolute -top-5">{{
      label
    }}</label>
    <div class="relative w-full">
      <Field
        as="input"
        :id="name"
        :name="name"
        :type="reactiveType"
        :modelValue="value"
        :placeholder="placeholder"
        :required="required"
        :disabled="disabled"
        :min="min"
        :max="max"
        :rules="rules"
        :autocomplete="autocomplete"
        @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
        class="h-12 px-2 placeholder:text-sm outline-none bg-slate-100 rounded-lg w-full focus:ring-2 focus:ring-primary text-sm"
      />
      <div class="absolute inset-y-0 right-0 flex items-center pr-2">
        <button
          v-if="isPassword"
          type="button"
          class="hover:bg-gray-300 rounded-full h-8 w-8 flex items-center justify-center"
          @click="togglePassword"
        >
          <EyeIcon v-if="reactiveType === 'password'" class="h-5 w-5 text-primary" />
          <EyeSlashIcon v-else class="h-5 w-5 text-primary" />
        </button>
      </div>
    </div>
    <XyzTransition appear mode="out-in" xyz="fade duration-3">
      <ErrorMessage :name="name" class="text-red-500 text-xs lg:text-sm self-start" />
    </XyzTransition>
  </div>
</template>

<style scoped></style>
