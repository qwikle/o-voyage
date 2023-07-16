import 'pinia'
import type { Router } from 'vue-router'
import { AxiosInstance } from 'axios'
import type { AlertStore } from './stores/alert.store'
import type { AuthStore } from './stores/auth.store'

declare module 'pinia' {
  export interface PiniaCustomProperties {
    $router: Router
    $alert: AlertStore
    $auth: AuthStore
    $axios: AxiosInstance
  }
}
