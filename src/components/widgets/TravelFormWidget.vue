<script setup lang="ts">
import { ref } from 'vue'
import inputWidget from '@/components/widgets/InputWidget.vue'
import SelectInputWidget from './SelectInputWidget.vue'
import countryData from '@/datas/countries.json'
defineProps({
  isDialog: {
    type: Boolean,
    required: false,
    default: false
  }
})

const timeout = ref(0)
const options = ref([] as { name: string }[])
const destination = ref({
  name: 'to',
  value: '',
  label: 'Destination',
  type: 'text',
  placeholder: 'Entrez votre destination',
  required: true,
  disabled: false,
  autocomplete: 'off',
  isPassword: false
})

const forms = ref([
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

async function getOptions(event: InputEvent) {
  clearTimeout(timeout.value)
  destination.value.value = (event.target as HTMLInputElement).value
  if (destination.value.value.length < 3) {
    options.value = []
    return
  }
  timeout.value = setTimeout(async () => {
    options.value = countryData
      .filter((country) =>
        country.name.toLowerCase().includes(destination.value.value.toLowerCase())
      )
      .map((country) => ({
        name: country.name
      }))
  }, 500)
}

function mapForm() {
  return forms.value.map((form) => ({
    [form.name]: form.value
  }))
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
    <form
      @submit.prevent="
        $emit('submit', {
          to: destination.value,
          ...Object.assign({}, ...mapForm())
        })
      "
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
        :autocomplete="destination.autocomplete"
        :options="options"
        @change="getOptions"
        v-model="destination.value"
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
    </form>
  </section>
</template>
