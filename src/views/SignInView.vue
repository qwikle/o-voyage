<script setup lang="ts">
import inputWidget, { type InputWidgetProps } from '@/components/widgets/inputs/InputWidget.vue'
import ContainerFormWidget from '@/components/widgets/ContainerFormWidget.vue'
import { useAuthStore } from '@/stores/auth.store'
import { ref, computed } from 'vue'
import { RouterLink } from 'vue-router'
import { useHead } from '@unhead/vue'
import { useRoute } from 'vue-router'
import * as Yup from 'yup'
import { Form } from 'vee-validate'
import type { SignInInput } from '@/services/auth/auth.service'

useHead({
  title: 'Connexion',
  meta: [
    {
      name: 'description',
      content: 'Connectez-vous à votre compte Ovoyage'
    },
    {
      name: 'keywords',
      content: 'voyage, gestion, budget, amis, famille, photos'
    }
  ]
})

const authStore = useAuthStore()
const forms = ref<InputWidgetProps[]>([
  {
    name: 'email',
    label: 'Email',
    type: 'email',
    value: '',
    placeholder: 'Entrez votre email',
    disabled: false,
    autocomplete: 'email',
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
  }
])

const schema = Yup.object().shape({
  email: Yup.string().email('Email invalide').required('Email requis'),
  password: Yup.string().required('Mot de passe requis')
})

const route = useRoute()
const signUp = computed(() => {
  return route.query.redirect ? `/signup?redirect=${route.query.redirect}` : '/signup'
})
async function submitForm(form: unknown) {
  await authStore.signIn(form as SignInInput)
}
</script>

<template>
  <ContainerFormWidget title="Connexion">
    <Form @submit="submitForm" class="flex flex-col gap-8" :validation-schema="schema">
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
      <button aria-label="se connecter" type="submit" class="btn btn-primary w-full">
        Se connecter
      </button>
    </Form>
    <div class="flex">
      <span>Pas encore inscris ?</span>
      <RouterLink :to="signUp" class="text-primary ml-2"> Créer un compte </RouterLink>
    </div>
  </ContainerFormWidget>
</template>
