import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store/index'
import ElementPlus from 'element-plus'
import 'element-plus/lib/theme-chalk/index.css'
import './style/reset.css'
import './style/common.css'
// import './permission'

const app = createApp(App)

app.use(router).use(store).use(ElementPlus)
app.mount('#app')
