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
    isPassword: false
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
    isPassword: false
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
  modelValue: { name: '', id: 0 },
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

const schema = Yup.object({
  name: Yup.string().required("Le nom de l'activité est requis"),
  price: Yup.number()
    .required('Le prix est requis')
    .min(0, 'Le prix doit être positif')
    .max(props.travel.budget, 'Le prix ne doit pas dépasser le budget'),
  location: Yup.string().required('Le lieu est requis'),
  members: Yup.number()
    .required('Le nombre de participants est requis')
    .min(1, 'Le nombre de participants doit être positif')
    .max(
      props.travel.numberOfTravelers,
      'Le nombre de participants ne doit pas dépasser le nombre de voyageurs'
    ),
  time: Yup.string()
    .required("L'heure est requise")
    .matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'L\'heure doit être au format "HH:MM"'),
  category: Yup.object().shape({
    name: Yup.string().required('La catégorie est requise'),
    id: Yup.number().required('La catégorie est requise')
  })
})

defineEmits(['close'])
</script>
<template>
  <Form class="flex flex-col p-4 gap-y-8" :validation-schema="schema">
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
    />
    <div class="flex flex-col lg:flex-row-reverse gap-2">
      <button class="btn btn-primary w-full lg:w-1/2">ajouter</button>
      <button class="btn btn-base w-full lg:w-1/2" @click="$emit('close', false)">annuler</button>
    </div>
  </Form>
</template>
<style scoped></style>
