<script setup lang="ts">
import ContainerFormWidget from '@/components/widgets/ContainerFormWidget.vue'
import inputWidget from '@/components/widgets/InputWidget.vue'
import { useAuthStore } from '@/stores/auth.store'
import { ref, computed } from 'vue'
import { useHead } from '@unhead/vue'

useHead({
  title: 'Inscription',
  meta: [
    {
      name: 'description',
      content: 'Inscription'
    }
  ]
})

const forms = ref([
  {
    name: 'email',
    label: 'Email',
    type: 'email',
    value: '',
    placeholder: 'Entrez votre email',
    required: true,
    disabled: false,
    autocomplete: 'email',
    isPassword: false
  },
  {
    name: 'firstname',
    label: 'Prénom',
    type: 'text',
    value: '',
    placeholder: 'Entrez votre prénom',
    required: true,
    disabled: false,
    autocomplete: 'given-name',
    isPassword: false
  },
  {
    name: 'lastname',
    label: 'Nom',
    type: 'text',
    value: '',
    placeholder: 'Entrez votre nom',
    required: true,
    disabled: false,
    autocomplete: 'family-name',
    isPassword: false
  },
  {
    name: 'password',
    label: 'Mot de passe',
    type: 'password',
    value: '',
    placeholder: 'Entrez votre mot de passe',
    required: true,
    disabled: false,
    autocomplete: 'current-password',
    isPassword: true
  },
  {
    name: 'confirmPassword',
    label: 'Confirmer le mot de passe',
    type: 'password',
    value: '',
    placeholder: 'Confirmez votre mot de passe',
    required: true,
    disabled: false,
    autocomplete: 'current-password',
    isPassword: true
  }
])
const authStore = useAuthStore()

const isDisabled = computed(() => {
  return (
    forms.value[0].value === '' ||
    forms.value[1].value === '' ||
    forms.value[2].value === '' ||
    forms.value[3].value === '' ||
    forms.value[4].value === ''
  )
})

async function submitForm(event: Event) {
  event.preventDefault()
  const email = forms.value[0].value
  const firstname = forms.value[1].value
  const lastname = forms.value[2].value
  const password = forms.value[3].value
  const confirmPassword = forms.value[4].value
  await authStore.signUp({
    email,
    firstname,
    lastname,
    password,
    confirmPassword
  })
}
</script>
<template>
  <ContainerFormWidget title="Inscription">
    <form @submit="submitForm" class="flex flex-col gap-8">
      <inputWidget
        v-for="form in forms"
        :key="form.label"
        v-model="form.value"
        :name="form.name"
        :label="form.label"
        :type="form.type"
        :placeholder="form.placeholder"
        :required="form.required"
        :disabled="form.disabled"
        :autocomplete="form.autocomplete"
        :isPassword="form.isPassword"
      />
      <button class="btn btn-primary w-full" :disabled="isDisabled" aria-label="submit">
        S'inscrire
      </button>
    </form>
  </ContainerFormWidget>
</template>
<style scoped></style>
