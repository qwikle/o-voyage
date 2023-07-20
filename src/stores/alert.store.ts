import { defineStore } from 'pinia'

export const useAlertStore = defineStore('alert', {
  state: () => ({
    message: '',
    type: 'info' as AlertType,
    show: false
  }),
  actions: {
    showAlert({ message, type }: ShowAlert) {
      setTimeout(() => {
        this.message = message
        this.type = type
        this.show = true
        this.hideAlert()
      }, 10)
    },
    hideAlert() {
      setTimeout(() => {
        this.show = false
        this.message = ''
        this.type = 'info'
      }, 3000)
    }
  }
})

export interface ShowAlert {
  message: string
  type: AlertType
}

type AlertType = 'success' | 'error' | 'warning' | 'info'

export interface AlertStore {
  message: string
  type: AlertType
  show: boolean
  showAlert: (alert: ShowAlert) => void
  hideAlert: () => void
}
