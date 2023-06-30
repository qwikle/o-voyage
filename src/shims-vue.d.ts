import 'pinia'
import type { Router } from 'vue-router'
import { useAlertStore } from './alert.store'

declare module 'pinia' {
  export interface PiniaCustomProperties {
    $router: Router
    $alert: ReturnType<typeof useAlertStore>
  }
}
