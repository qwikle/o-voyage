<script setup lang="ts">
import inputWidget from '@/components/widgets/InputWidget.vue'
import ContainerFormWidget from '@/components/widgets/ContainerFormWidget.vue'
import { useAuthStore } from '@/stores/auth.store'
import { ref, computed } from 'vue'
import { RouterLink } from 'vue-router'
import { useHead } from '@unhead/vue'
import { useRoute } from 'vue-router'

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

const route = useRoute()
const signUp = computed(() => {
  return route.query.redirect ? `/signup?redirect=${route.query.redirect}` : '/signup'
})
async function submitForm(event: Event) {
  event.preventDefault()
  const email = forms.value[0].value
  const password = forms.value[1].value
  await authStore.signIn({ email, password })
}

const isDisabled = computed(() => {
  return forms.value[0].value === '' || forms.value[1].value === ''
})
</script>

<template>
  <ContainerFormWidget title="Connexion">
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
      <button
        aria-label="submit"
        type="submit"
        class="btn btn-primary w-full"
        :disabled="isDisabled"
      >
        Se connecter
      </button>
    </form>
    <div class="flex">
      <span>Pas encore inscris ?</span>
      <RouterLink :to="signUp" class="text-primary ml-2"> Créer un compte </RouterLink>
    </div>
  </ContainerFormWidget>
</template>
