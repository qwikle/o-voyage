import { set } from '@vueuse/core'
import { defineStore } from 'pinia'

export const useAlertStore = defineStore('alert', {
  state: () => ({
    message: '',
    type: '',
    show: false
  }),
  actions: {
    showAlert({ message, type }: ShowAlert) {
      setTimeout(() => {
        this.message = message
        this.type = type
        this.show = true
        this.hideAlert()
      }, 850)
    },
    hideAlert() {
      setTimeout(() => {
        this.show = false
        this.message = ''
        this.type = ''
      }, 3000)
    }
  }
})

export interface ShowAlert {
  message: string
  type: 'success' | 'error' | 'warning' | 'info'
}
