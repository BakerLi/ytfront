import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
// 後來增加
import { createPinia } from 'pinia'
import router from './router'
// UI framework
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'


const app = createApp(App)  // 使用 createApp 初始化應用
app.use(createPinia())      // 使用 app.use() 來掛載 Pinia
app.use(router)             // 使用 app.use() 來掛載 Router
app.use(ElementPlus)
app.mount('#app')           // 最後掛載到 #app

