import { createRouter, createWebHashHistory } from 'vue-router'
import HomePage from '@/views/HomePage.vue'
import SearchPage from '@/views/SearchPage.vue'
import ComparePage from '@/views/ComparePage.vue'
import DetailsPage from '@/views/DetailsPage.vue'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage
    },
    {
      path: '/search',
      name: 'search',
      component: SearchPage
      //component: () => import('@/views/Search.vue')
    },
    {
      path: '/pokemon/:query',
      name: 'details',
      component: DetailsPage,
      props: true
    },
    {
      path: '/compare',
      name: 'compare',
      component: ComparePage
      //component: () => import('@/views/Compare.vue')
    }
  ],
})

export default router
