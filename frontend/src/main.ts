import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:8000/'
axios.defaults.withCredentials = true
axios.defaults.withXSRFToken = true

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
