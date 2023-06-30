import './assets/main.css'
import VueAnimXYZ from '@animxyz/vue3'
import '@animxyz/core'
import { createApp, markRaw } from 'vue'
import { createPinia } from 'pinia'
import apiService from './services/api/api.service'
import App from './App.vue'
import router from './router'
import { ApiKey } from './services/symbols'
import type { Router } from 'vue-router'
import { useAlertStore } from './stores/alert.store'

const pinia = createPinia()

pinia.use(({ store }) => {
  store.$router = markRaw(router as Router)
  store.$alert = useAlertStore()
})

const app = createApp(App)
app.provide(ApiKey, apiService)
app.use(VueAnimXYZ)
app.use(pinia)
app.use(router)

app.mount('#app')
