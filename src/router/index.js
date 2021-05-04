import { createRouter, createWebHistory } from 'vue-router'
import Home from '../pages/Home'
import Help from '../pages/Help'
import Auth from '../pages/Auth'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: Home,
      meta: {
        layout: 'main',
      }
    },
    {
      path: '/help',
      component: Help,
      meta: {
        layout: 'main',
      }
    },
    {
      path: '/auth',
      component: Auth,
      meta: {
        layout: 'auth',
      }
    },
  ],

  linkActiveClass: 'active',
  linkExactActiveClass: 'active'
})

export default router