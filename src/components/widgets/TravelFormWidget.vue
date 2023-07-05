<script setup lang="ts">
import { ref } from 'vue'
import inputWidget from '@/components/widgets/InputWidget.vue'
import SelectInputWidget from './SelectInputWidget.vue'
import axios from 'axios'

const timeout = ref(0)
const options = ref([] as { id: number; name: string }[])
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
    name: 'numbersOfTravelers',
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
  console.log(destination.value.value)
  if (destination.value.value.length < 3) {
    options.value = []
    return
  }
  timeout.value = setTimeout(async () => {
    const { data } = await axios.get(
      `https://api-adresse.data.gouv.fr/search/?q=${destination.value.value}&type=municipality`
    )
    options.value = data.features.map((feature: any) => ({
      id: feature.properties.id,
      name: feature.properties.label
    }))
  }, 500)
}

function submitForm(event: Event) {
  event.preventDefault()
}
</script>
<template>
  <section class="bg-white text-gray-600 py-4">
    <h1 class="text-center mb-4 font-extrabold text-2xl">Préparez votre voyage dès maintenant !</h1>
    <form
      @submit="submitForm"
      class="flex flex-col gap-y-6 px-10 items-center lg:flex-row lg:justify-center lg:gap-x-4 lg:h-24"
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
      <button
        id="submit"
        type="submit"
        class="btn btn-primary w-full lg:w-1/6 btn-md"
        aria-label="Créer mon voyage"
      >
        Créer mon voyage
      </button>
    </form>
  </section>
</template>
