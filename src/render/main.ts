// import '@src/common/patch'
import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/lib/theme-chalk/index.css'
import './index.styl'

const app = createApp(App)
app.use(ElementPlus)
app.mount('#app')