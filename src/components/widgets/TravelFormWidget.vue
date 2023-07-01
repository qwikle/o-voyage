<script setup lang="ts">
import { ref, watch } from 'vue'
import inputWidget from '@/components/widgets/InputWidget.vue'
import axios from 'axios'
const forms = ref([
  {
    name: 'to',
    label: 'Destination',
    type: 'text',
    value: '',
    placeholder: 'Entrez votre destination',
    required: true,
    disabled: false,
    autocomplete: 'off',
    isPassword: false
  },
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
const timeout = ref(0)
watch(forms.value[0], async (newValue, oldValue) => {
  const q = newValue.value.replace(/\s/g, '+')
  if (timeout.value) clearTimeout(timeout.value)
  if (newValue.value.length > 2) {
    timeout.value = setTimeout(async () => {
      const { data } = await axios.get(
        `https://api-adresse.data.gouv.fr/search/?q=${q}&type=municipality&autocomplete=1`
      )
      console.log(data.features)
    }, 1500)
  }
})

function submitForm(event: Event) {
  event.preventDefault()
  console.log(forms.value)
}
</script>
<template>
  <section class="bg-red-200 p-6 text-gray-600 lg:shadow-sm">
    <h1 class="text-center mb-4 font-extrabold text-2xl">Préparez votre voyage dès maintenant !</h1>
    <form
      @submit="submitForm"
      class="flex flex-col gap-y-6 px-10 items-center lg:flex-row lg:justify-center lg:gap-x-4 lg:h-24"
    >
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
