import authService, { type SignInInput, type SignUpInput } from '@/services/auth/auth.service'
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    isLogged: false,
    user: null
  }),
  actions: {
    async signIn({ email, password }: SignInInput) {
      const data = await authService.signIn({ email, password })
      this.isLogged = true
      return 'ok'
    },

    async signUp(form: SignUpInput) {
      const data = await authService.signUp(form)
      this.isLogged = true
      return 'ok'
    }
  }
})
