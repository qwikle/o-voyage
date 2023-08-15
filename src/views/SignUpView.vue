<script setup lang="ts">
import ContainerFormWidget from '@/components/widgets/ContainerFormWidget.vue'
import inputWidget, { type InputWidgetProps } from '@/components/widgets/inputs/InputWidget.vue'
import { useAuthStore } from '@/stores/auth.store'
import { ref, computed } from 'vue'
import { useHead } from '@unhead/vue'
import { useRoute } from 'vue-router'
import { Form } from 'vee-validate'
import * as Yup from 'yup'
import type { SignUpInput } from '@/services/auth/auth.service'
useHead({
  title: 'Inscription',
  meta: [
    {
      name: 'description',
      content: 'Inscrivez-vous à votre compte Ovoyage'
    },
    {
      name: 'keywords',
      content: 'voyage, gestion, budget, amis, famille, photos'
    }
  ]
})

const forms = ref<InputWidgetProps[]>([
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

const schema = Yup.object().shape({
  email: Yup.string().email('Email invalide').required('Email requis'),
  firstname: Yup.string()
    .required('Prénom requis')
    .min(2, 'Prénom trop court')
    // can match letters and - only
    .matches(/^[a-zA-Z-]+$/, 'Prénom invalide'),
  lastname: Yup.string()
    .required('Nom requis')
    .min(2, 'Nom trop court')
    .matches(/^[a-zA-Z-]+$/, 'Nom invalide'),
  password: Yup.string()
    .required('Mot de passe requis')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/, {
      message: 'Le mot de passe doit contenir au moins 8 caractères, une majuscule et un chiffre',
      excludeEmptyString: true
    }),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Les mots de passe ne correspondent pas')
    .required('Confirmation du mot de passe requis')
})

const authStore = useAuthStore()

async function submitForm(form: unknown) {
  await authStore.signUp(form as SignUpInput)
}

const route = useRoute()
const signIn = computed(() => {
  return route.query.redirect ? `/signin${route.fullPath.replace('/signup', '')}` : '/signin'
})
</script>
<template>
  <ContainerFormWidget title="Inscription">
    <Form
      @submit="submitForm"
      class="flex flex-col gap-8 w-3/4 md:w-96"
      :validation-schema="schema"
    >
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
      <button class="btn btn-primary w-full" aria-label="submit">S'inscrire</button>
    </Form>
    <div class="flex">
      <span>Déjà inscris ?</span>
      <RouterLink :to="signIn" class="text-primary ml-2"> Connectez-vous </RouterLink>
    </div>
  </ContainerFormWidget>
</template>
<style scoped></style>
