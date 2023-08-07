import 'pinia'
import type { Router } from 'vue-router'
import { AxiosInstance } from 'axios'
import type { AlertStore } from './stores/alert.store'
import type { AuthStore } from './stores/auth.store'
import type { RouteLocationNormalizedLoaded } from 'vue-router'
import type { TravelStore } from './stores/travel.store'

declare module 'pinia' {
  export interface PiniaCustomProperties {
    $router: Router
    $route: RouteLocationNormalizedLoaded
    $alert: AlertStore
    $auth: AuthStore
    $axios: AxiosInstance
    $travel: TravelStore
  }
}
