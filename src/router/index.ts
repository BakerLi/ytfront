import { createRouter, createWebHistory } from 'vue-router'

// 匯入頁面元件
// import Home from '../../src/views/Home.vue'
import Login from '../../src/views/Login.vue'

const routes = [
  { 
    path: '/', 
    component: () => import('../../src/views/Home.vue'),  // 非同步匯入不會出錯
    name: 'Home' 
},
  { path: '/login', component: Login, name: 'Login' },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
