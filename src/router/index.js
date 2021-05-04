import { createRouter, createWebHistory } from 'vue-router'
import Home from '../pages/Home'
import Auth from '../pages/Auth'

export default createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: Home,
      meta: {
        layout: 'main'
      }
    },
    {
      path: '/auth',
      component: Auth,
      meta: {
        layout: 'auth'
      }
    },
  ]
})

