import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import TheButton from '@/components/UI/TheButton'

const app = createApp(App)
app.component('TheButton', TheButton)

app.use(store)
    .use(router)
    .mount('#app')
