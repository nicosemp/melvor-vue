import { createRouter, createWebHistory } from 'vue-router'

import InventoryView from '@/views/InventoryView.vue'
import ShopView from '@/views/ShopView.vue'
import WoodcuttingView from '@/views/WoodcuttingView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  linkActiveClass: 'active',
  routes: [
    {
      path: '/',
      name: 'home',
      // component: HomeView
      redirect: '/woodcutting'
    },
    {
      path: '/shop',
      name: 'shop',
      component: ShopView
    },
    {
      path: '/inventory',
      name: 'inventory',
      component: InventoryView
    },
    {
      path: '/woodcutting',
      name: 'woodcutting',
      component: WoodcuttingView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    }
  ]
})

export default router
