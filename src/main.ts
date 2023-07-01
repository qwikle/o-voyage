import './assets/main.css'
import VueAnimXYZ from '@animxyz/vue3'
import '@animxyz/core'
import { createApp, markRaw } from 'vue'
import { createPinia } from 'pinia'
import axios from 'axios'
import App from './App.vue'
import router from './router'
import type { Router } from 'vue-router'
import { useAlertStore } from './stores/alert.store'
import { createHead } from '@unhead/vue'

const pinia = createPinia()

pinia.use(({ store }) => {
  store.$router = markRaw(router as Router)
  store.$alert = useAlertStore()
  store.$axios = markRaw(axios)
})

const app = createApp(App)
const head = createHead()
app.use(VueAnimXYZ)
app.use(router)
app.use(pinia)
app.use(head)

app.mount('#app')
