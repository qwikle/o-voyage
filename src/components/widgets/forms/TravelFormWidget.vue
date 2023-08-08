<script setup lang="ts">
import { ref } from 'vue'
import inputWidget, { type InputWidgetProps } from '@/components/widgets/inputs/InputWidget.vue'
import SelectInputWidget, {
  type SelectInputWidgetProps
} from '@/components/widgets/inputs/SelectInputWidget.vue'
import countryData from '@/datas/countries.json'
import { Form } from 'vee-validate'
import * as yup from 'yup'
import { DateTime } from 'luxon'

defineProps({
  isDialog: {
    type: Boolean,
    required: false,
    default: false
  }
})

const options = ref<string[]>([])
const destination = ref<SelectInputWidgetProps>({
  name: 'to',
  label: 'Destination',
  modelValue: '',
  placeholder: 'Entrez votre destination',
  required: true,
  disabled: false,
  options: []
})

const forms = ref<InputWidgetProps[]>([
  {
    name: 'departureDate',
    label: 'Date de départ',
    type: 'date',
    value: '',
    required: true,
    disabled: false,
    autocomplete: 'off',
    isPassword: false
  },
  {
    name: 'arrivalDate',
    label: "Date d'arrivée",
    type: 'date',
    value: '',
    required: true,
    disabled: false,
    autocomplete: 'off',
    isPassword: false
  },
  {
    name: 'numberOfTravelers',
    label: 'Nombre de voyageurs',
    type: 'number',
    value: '',
    placeholder: 'Entrez le nombre de voyageurs',
    required: true,
    disabled: false,
    autocomplete: 'off',
    isPassword: false
  },
  {
    name: 'budget',
    label: 'Budget',
    type: 'number',
    value: '',
    placeholder: 'Entrez votre budget',
    required: true,
    disabled: false,
    autocomplete: 'off'
  },
  {
    name: 'title',
    label: 'Titre du voyage',
    type: 'text',
    value: '',
    placeholder: 'Entrez le titre du voyage',
    required: true,
    disabled: false,
    autocomplete: 'off'
  }
])

const schema = yup.object().shape({
  to: yup.string().required('Destination requise'),
  departureDate: yup
    .date()
    .required('Date de départ requise')
    .min(
      DateTime.now().minus({ days: 1 }),
      'La date de départ doit être égale ou supérieure à la date du jour'
    )
    .max(
      yup.ref('arrivalDate'),
      "La date de départ doit être égale ou inférieure à la date d'arrivée"
    ),
  arrivalDate: yup
    .date()
    .required("Date d'arrivée requise")
    .min(
      yup.ref('departureDate'),
      "La date d'arrivée doit être égale ou supérieure à la date de départ"
    ),
  numberOfTravelers: yup
    .number()
    .required('Nombre de voyageurs requis')
    .min(1, 'Nombre de voyageurs minimum 1')
    .max(20, 'Nombre de voyageurs maximum 20'),
  budget: yup
    .number()
    .required('Budget requis')
    .min(500, 'Budget minimum 500')
    .max(10000, 'Budget maximum 10000'),
  title: yup
    .string()
    .required('Titre du voyage requis')
    .matches(/^[a-zA-Z0-9 ]*$/, 'Titre du voyage invalide')
})

async function getOptions(event: InputEvent) {
  destination.value.modelValue = (event.target as HTMLInputElement).value
  if (destination.value.modelValue.length < 3) {
    options.value = []
    return
  }
  options.value = countryData
    .filter((country) =>
      country.name.toLowerCase().includes(destination.value.modelValue.toLowerCase())
    )
    .map((country) => country.name)
}

defineEmits(['submit', 'close'])
</script>
<template>
  <section class="text-gray-600 py-4">
    <h1
      class="text-center mb-4 font-extrabold text-2xl pb-4"
      :class="isDialog ? 'hidden' : 'block'"
    >
      Préparez votre voyage dès maintenant !
    </h1>
    <Form
      @submit="$emit('submit', $event)"
      :validation-schema="schema"
      class="flex flex-col gap-y-6 px-10 items-center lg:flex-row lg:justify-center lg:gap-x-4 lg:h-24"
      :class="
        isDialog
          ? 'lg:flex-col lg:gap-y-8 lg:h-auto'
          : 'lg:flex-row lg:justify-center lg:gap-x-4 lg:h-24'
      "
    >
      <SelectInputWidget
        :label="destination.label"
        :name="destination.name"
        :placeholder="destination.placeholder"
        :required="destination.required"
        :disabled="destination.disabled"
        :options="options"
        @change="getOptions"
        v-model="destination.modelValue"
      />
      <inputWidget
        v-for="form in forms"
        :key="form.name"
        :label="form.label"
        v-model="form.value"
        :name="form.name"
        :type="form.type"
        :placeholder="form.placeholder"
        :required="form.required"
        :disabled="form.disabled"
        :autocomplete="form.autocomplete"
      />
      <div class="flex gap-4 flex-col lg:flex-row-reverse lg:justify-between w-full">
        <button
          id="submit"
          type="submit"
          class="btn btn-primary btn-md"
          :class="isDialog ? 'lg:w-1/2' : 'lg:w-full'"
          aria-label="Créer mon voyage"
        >
          Créer mon voyage
        </button>
        <button
          type="button"
          v-if="isDialog"
          @click="$emit('close', $event)"
          class="btn btn-base w-full lg:w-1/2"
        >
          annuler
        </button>
      </div>
    </Form>
  </section>
</template>
