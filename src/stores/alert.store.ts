import { defineStore } from 'pinia'

export const useAlertStore = defineStore('alert', {
  state: () => ({
    message: '',
    type: '',
    show: false
  }),
  actions: {
    showAlert({ message, type }: ShowAlert) {
      this.message = message
      this.type = type
      this.show = true
      this.hideAlert()
    },
    hideAlert() {
      setTimeout(() => {
        this.show = false
      }, 3000)
    }
  }
})

export interface ShowAlert {
  message: string
  type: 'success' | 'error' | 'warning' | 'info'
}
