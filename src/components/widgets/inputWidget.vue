<script setup lang="ts">
import { ref } from 'vue'
import { EyeIcon, EyeSlashIcon } from '@heroicons/vue/24/outline'
const props = defineProps({
  name: String,
  label: String,
  type: String,
  value: String,
  placeholder: String,
  required: Boolean,
  disabled: Boolean,
  autocomplete: String,
  isPassword: Boolean
})
const reactiveType = ref(props.type)

function togglePassword() {
  reactiveType.value = reactiveType.value === 'password' ? 'text' : props.type
}

defineEmits(['update:modelValue'])
</script>
<template>
  <div class="flex flex-col items-center w-full">
    <label :for="name" class="self-start">{{ label }}</label>
    <div class="relative w-full">
      <input
        :id="name"
        :name="name"
        :type="reactiveType"
        :modelValue="value"
        :placeholder="placeholder"
        :required="required"
        :disabled="disabled"
        :autocomplete="autocomplete"
        @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
        class="input border-none input-primary w-full shadow"
      />
      <div class="absolute inset-y-0 right-0 flex items-center pr-2">
        <button
          v-if="isPassword"
          type="button"
          class="hover:bg-slate-100 rounded-full h-8 w-8 flex items-center justify-center"
          @click="togglePassword"
        >
          <EyeIcon v-if="reactiveType === 'password'" class="h-5 w-5 text-primary" />
          <EyeSlashIcon v-else class="h-5 w-5 text-primary" />
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
