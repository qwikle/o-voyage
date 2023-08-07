<script setup lang="ts">
import { ref, type PropType } from 'vue'
import InputWidget, { type InputWidgetProps } from '@/components/widgets/inputs/InputWidget.vue'
import ListBoxInputWidget, { type ListBoxInputWidgetProps } from '../inputs/ListBoxInputWidget.vue'
import type { ITravel } from '@/models'
import { Form } from 'vee-validate'
import * as Yup from 'yup'
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
    isPassword: false,
    rules: Yup.string()
      .required("Le nom de l'activité est requis")
      .matches(
        /^[a-zA-Z0-9 ]*$/,
        "Le nom de l'activité ne peut contenir que des lettres et des chiffres"
      )
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
    rules: Yup.number()
      .required('Le prix est requis')
      .min(0, 'Le prix ne peut pas être négatif')
      .max(props.travel.budget, 'Le prix ne peut pas être supérieur au budget')
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
    isPassword: false,
    rules: Yup.string()
      .required('Le lieu est requis')
      .matches(/^[a-zA-Z0-9 ]*$/, 'Le lieu ne peut contenir que des lettres et des chiffres')
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
    rules: Yup.number()
      .required('Le nombre de participants est requis')
      .min(1, 'Le nombre de participants ne peut pas être négatif')
      .max(
        props.travel.numberOfTravelers,
        'Le nombre de participants ne peut pas être supérieur au nombre de voyageurs'
      )
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
    isPassword: false,
    rules: Yup.string()
      .required("L'heure est requise")
      .matches(/^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/)
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
  rules: Yup.object({
    name: Yup.string().required('La catégorie est requise'),
    id: Yup.number().required('La catégorie est requise').notOneOf([0], 'La catégorie est requise')
  }),
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
  <Form class="flex flex-col p-4 gap-y-8">
    <ListBoxInputWidget
      v-model="category.modelValue"
      :options="category.options"
      :name="category.name"
      :label="category.label"
      :placeholder="category.placeholder"
      :ariaLabel="category.ariaLabel"
      :required="category.required"
      :disabled="category.disabled"
      :rules="category.rules"
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
      :rules="input.rules"
    />
    <div class="flex flex-col lg:flex-row-reverse gap-2">
      <button class="btn btn-primary w-full lg:w-1/2">ajouter</button>
      <button class="btn btn-base w-full lg:w-1/2" @click="$emit('close', false)">annuler</button>
    </div>
  </Form>
</template>
<style scoped></style>
