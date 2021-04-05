import Vue from 'vue'
import VueRouter from 'vue-router'
import Inventory from '../views/main/inventory.vue'
import Login from '../views/auth/login.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login
  },

  {
    path: '/',
    name: 'inventory',
    component: Inventory
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
