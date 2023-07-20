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
import { useAuthStore } from './stores/auth.store'
import { useRoute } from 'vue-router'

const pinia = createPinia()

pinia.use(({ store }) => {
  store.$router = markRaw(router as Router)
  store.$route = useRoute()
  store.$alert = useAlertStore()
  store.$auth = useAuthStore()
  store.$axios = markRaw(axios)
})

const app = createApp(App)
const head = createHead()
app.use(VueAnimXYZ)
app.use(router)
app.use(pinia)
app.use(head)

app.mount('#app')
