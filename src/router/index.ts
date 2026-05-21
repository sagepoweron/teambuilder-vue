import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import Search from '@/views/Search.vue'
import Compare from '@/views/Compare.vue'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/search',
      name: 'search',
      component: Search
      //component: () => import('@/views/Search.vue')
    },
    {
      path: '/compare',
      name: 'compare',
      component: Compare
      //component: () => import('@/views/Compare.vue')
    }
  ],
})

export default router
