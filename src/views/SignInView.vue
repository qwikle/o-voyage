<script setup lang="ts">
import inputWidget from '@/components/widgets/inputWidget.vue'
import { useAuthStore } from '@/stores/auth.store'
import { useRouter } from 'vue-router'
import { ref } from 'vue'

const authStore = useAuthStore()
const router = useRouter()
const forms = ref([
  {
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

async function submitForm(event: Event) {
  event.preventDefault()
  const email = forms.value[0].value
  const password = forms.value[1].value
  const res = await authStore.signIn({ email, password })
  if (res) {
    router.push({ name: 'Home' })
  }
}
</script>

<template>
  <section class="flex flex-col items-center max-h-64 mt-10 rounded gap-y-4">
    <h1 class="font-semibold text-2xl">Connexion</h1>
    <form @submit="submitForm" class="flex flex-col gap-4">
      <inputWidget
        v-for="form in forms"
        :key="form.label"
        v-model="form.value"
        :label="form.label"
        :type="form.type"
        :placeholder="form.placeholder"
        :required="form.required"
        :disabled="form.disabled"
        :autocomplete="form.autocomplete"
        :isPassword="form.isPassword"
      />
      <div class="flex flex-col items-center">
        <button
          type="submit"
          class="btn btn-primary"
          :disabled="forms[0].value === '' || forms[1].value === ''"
        >
          Se connecter
        </button>
      </div>
    </form>
  </section>
</template>
