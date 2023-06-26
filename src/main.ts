import './assets/main.css'
import '@animxyz/vue3'
import VueAnimXYZ from '@animxyz/vue3'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import apiService from './services/api/api.service'
import App from './App.vue'
import router from './router'
import { ApiKey } from './services/symbols'

const app = createApp(App)
app.provide(ApiKey, apiService)
app.use(VueAnimXYZ)
app.use(createPinia())
app.use(router)

app.mount('#app')
