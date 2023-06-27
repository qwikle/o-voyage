<script setup lang="ts">
import ContainerFormWidget from '@/components/widgets/ContainerFormWidget.vue'
import inputWidget from '@/components/widgets/inputWidget.vue'
import { useAuthStore } from '@/stores/auth.store'
import { useAlertStore } from '@/stores/alert.store'
import { useRouter } from 'vue-router'
import { ref } from 'vue'

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
    name: 'firstName',
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
    name: 'lastName',
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
const alertStore = useAlertStore()
const router = useRouter()

async function submitForm(event: Event) {
  event.preventDefault()
  const email = forms.value[0].value
  const firstName = forms.value[1].value
  const lastName = forms.value[2].value
  const password = forms.value[3].value
  const confirmPassword = forms.value[4].value
  const res = await authStore.signUp({
    email,
    firstName,
    lastName,
    password,
    confirmPassword
  })
  if (res) {
    alertStore.showAlert({
      message: 'Vous êtes inscrit',
      type: 'info'
    })
    router.push({ name: 'Home' })
  }
}
</script>
<template>
  <ContainerFormWidget title="Inscription">
    <form @submit="submitForm" class="flex flex-col gap-4">
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
      <button class="btn btn-primary">S'inscrire</button>
    </form>
  </ContainerFormWidget>
</template>
<style scoped></style>
