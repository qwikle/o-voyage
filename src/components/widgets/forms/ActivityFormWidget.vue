<script setup lang="ts">
import { ref, type PropType } from 'vue'
import InputWidget, { type InputWidgetProps } from '@/components/widgets/inputs/InputWidget.vue'
import ListBoxInputWidget, { type ListBoxInputWidgetProps } from '../inputs/ListBoxInputWidget.vue'
import type { ITravel } from '@/models'
const props = defineProps({
  initialDate: {
    type: String,
    required: true
  },
  travel: {
    type: Object as PropType<ITravel>,
    required: true
  }
})
const forms = ref<InputWidgetProps[]>([
  {
    name: 'name',
    label: "Nom de l'activité",
    type: 'text',
    value: '',
    placeholder: "Nom de l'activité",
    required: true,
    disabled: false,
    autocomplete: 'off',
    isPassword: false
  },
  {
    name: 'price',
    label: 'Prix',
    type: 'number',
    value: '',
    placeholder: 'Prix',
    required: true,
    disabled: false,
    autocomplete: 'off',
    isPassword: false,
    min: 0,
    max: props.travel.budget
  },
  {
    name: 'location',
    label: 'Lieu',
    type: 'text',
    value: '',
    placeholder: 'Lieu',
    required: true,
    disabled: false,
    autocomplete: 'off',
    isPassword: false
  },
  {
    name: 'members',
    label: 'Nombre de participants',
    type: 'number',
    value: '',
    placeholder: 'Nombre de participants',
    required: true,
    disabled: false,
    autocomplete: 'off',
    isPassword: false,
    min: 1,
    max: props.travel.numberOfTravelers
  },
  {
    name: 'time',
    label: 'Heure',
    type: 'time',
    value: '',
    placeholder: 'Heure',
    required: true,
    disabled: false,
    autocomplete: 'off',
    isPassword: false
  }
])

const category = ref<ListBoxInputWidgetProps>({
  name: 'category',
  label: 'Catégorie',
  modelValue: { name: '', id: 0, message: 'Sélectionnez une catégorie' },
  placeholder: 'Catégorie',
  ariaLabel: 'Catégorie',
  required: true,
  disabled: false,
  options: [
    { name: 'Activité', id: 1 },
    { name: 'Restaurant', id: 2 },
    { name: 'Hébergement', id: 3 },
    { name: 'Transport', id: 4 },
    { name: 'Autre', id: 5 }
  ]
})

defineEmits(['close'])
</script>
<template>
  <form @submit.prevent="" class="flex flex-col p-4 gap-y-8">
    <ListBoxInputWidget
      v-model="category.modelValue"
      :options="category.options"
      :name="category.name"
      :label="category.label"
      :placeholder="category.placeholder"
      :ariaLabel="category.ariaLabel"
      :required="category.required"
      :disabled="category.disabled"
    />
    <InputWidget
      v-for="(input, index) in forms"
      :key="index"
      v-model="input.value"
      :name="input.name"
      :label="input.label"
      :type="input.type"
      :placeholder="input.placeholder"
      :required="input.required"
      :disabled="input.disabled"
      :autocomplete="input.autocomplete"
      :isPassword="input.isPassword"
      :min="input.min"
      :max="input.max"
    />
    <div class="flex flex-col lg:flex-row-reverse gap-2">
      <button class="btn btn-primary w-1/2">créer</button>
      <button class="btn btn-base w-1/2" @click="$emit('close', false)">annuler</button>
    </div>
  </form>
</template>
<style scoped></style>
