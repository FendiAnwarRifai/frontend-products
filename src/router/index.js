import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store/index'
import Inventory from '../views/main/inventory.vue'
import Login from '../views/auth/login.vue'
import Register from '../views/auth/register.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login,
    meta: { requiresVisitor: true }
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
    meta: { requiresVisitor: true }
  },

  {
    path: '/inventory',
    name: 'inventory',
    component: Inventory,
    meta: { requiresAuth: true }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!store.getters.isLogin) {
      Vue.swal.fire({
        title: 'Error!',
        text: 'the page cannot be accessed',
        icon: 'error',
        confirmButtonText: 'Relogin'
      })
      next({
        path: '/'
      })
    } else {
      next()
    }
  } else if (to.matched.some(record => record.meta.requiresVisitor)) {
    if (store.getters.isLogin) {
      Vue.swal.fire({
        title: 'Error!',
        text: 'the page cannot be accessed',
        icon: 'error',
        confirmButtonText: 'Ok'
      })
      next({
        path: '/inventory'
      })
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
