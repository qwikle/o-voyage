<script setup lang="ts">
import { ref } from 'vue'

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
    name: 'budget',
    label: 'Budget',
    type: 'number',
    value: '',
    placeholder: 'Entrez votre budget',
    required: true,
    disabled: false,
    autocomplete: 'off',
    isPassword: false
  }
])

function submitForm(event: Event) {
  event.preventDefault()
}
</script>
<template>
  <section class="bg-red-200 p-2 text-gray-600 absolute w-full top-0 right-0">
    <form
      @submit="submitForm"
      class="flex flex-col gap-y-2 px-10 items-center lg:flex-row lg:gap-x-2 lg:justify-center lg:h-24"
    >
      <input
        class="input w-full"
        v-for="form in forms"
        :key="form.name"
        v-model="form.value"
        :name="form.name"
        :type="form.type"
        :placeholder="form.placeholder"
        :required="form.required"
        :disabled="form.disabled"
        :autocomplete="form.autocomplete"
      />
      <button type="submit" class="btn btn-primary w-full lg:w-1/12 btn-md">
        Créer mon voyage
      </button>
    </form>
  </section>
</template>

<style scoped></style>
