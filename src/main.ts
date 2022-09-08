import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createHead } from "@vueuse/head"
import App from './App.vue'
import router from '../src/router'

/* 
   Global util css style sheet
*/
import '../src/assets/styles/util.css'
import '../src/assets/styles/base.scss'
import 'plyr/dist/plyr.css'

/* 
   Init App
*/
const app = createApp(App)
  .use(createPinia())
  .use(createHead())
  .use(router)

router.isReady().then(() => {
  app.mount('#app')
})

/* 
   Config global
*/
app.config.globalProperties.$theme = 0
app.config.globalProperties.window = window