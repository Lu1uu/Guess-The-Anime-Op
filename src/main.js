import { createApp } from 'vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap'

import App from './App.vue'
import router from './router'
import store from './store'

const app = createApp(App)

app.use(store)
    .use(router)
    .mount('#app')
