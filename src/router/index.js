import { createRouter, createWebHistory } from 'vue-router'
import MainLayout from '../layout/MainLayout.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: MainLayout,
    children: [
      {
        path: '',
        name: 'MainPage',
        component: () => import('../views/Home')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
