import authService, { type SignInInput, type SignUpInput } from '@/services/auth/auth.service'
import { defineStore } from 'pinia'
import type { User } from '@/models'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    isAuthenticated: false,
    user: null as User | null
  }),
  actions: {
    async signIn({ email, password }: SignInInput) {
      try {
        const user = await authService.signIn({ email, password })
        this.user = user
        this.$alert.showAlert({
          message: 'Vous êtes connecté',
          type: 'success'
        })
        this.isAuthenticated = true
        this.$router.push({ name: 'Home' })
      } catch (error) {
        this.$alert.showAlert({
          // @ts-ignore
          message: error.message,
          type: 'error'
        })
      }
    },

    async signUp(form: SignUpInput) {
      try {
        const user = await authService.signUp(form)
        this.user = user
        this.$alert.showAlert({
          message: 'Vous êtes connecté',
          type: 'success'
        })
        this.isAuthenticated = true
        this.$router.push({ name: 'Home' })
      } catch (error) {
        this.$alert.showAlert({
          // @ts-ignore
          message: error.message,
          type: 'error'
        })
      }
    }
  }
})
