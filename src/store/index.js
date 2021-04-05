import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import router from '../router/index'
import VueSweetalert2 from 'vue-sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css'
Vue.use(VueSweetalert2)
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    idUser: null || localStorage.getItem('id'),
    token: null || localStorage.getItem('token'),
    allProducts: [],
    historyProducts: {}
  },
  mutations: {
    SET_USER (state, payload) {
      state.user = payload
      state.token = payload.token
      state.idUser = payload.id
    },
    REMOVE_TOKEN (state) {
      state.token = null
    },
    GET_ALL_PRODUCTS (state, payload) {
      state.allProducts = payload
    },
    HISTORY_PRODUCTS (state, payload) {
      state.historyProducts = payload
    }
  },
  actions: {
    interceptorRequest (context) {
      axios.interceptors.request.use(function (config) {
        config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
        return config
      }, function (error) {
        return Promise.reject(error)
      })
    },
    interceptorResponse (context) {
      axios.interceptors.response.use(function (response) {
        return response
      }, function (error) {
        if (error.response.status === 401) {
          if (error.response.data.message === 'Invalid Token') {
            localStorage.removeItem('token')
            localStorage.removeItem('id')
            context.commit('REMOVE_TOKEN')
            Vue.swal.fire({
              title: 'Error!',
              text: `${error.response.data.message}`,
              icon: 'error',
              confirmButtonText: 'Relogin'
            })
            router.push('/')
          } else if (error.response.data.message === 'Token Expired') {
            localStorage.removeItem('token')
            localStorage.removeItem('id')
            context.commit('REMOVE_TOKEN')
            Vue.swal.fire({
              title: 'Error!',
              text: `${error.response.data.message}`,
              icon: 'error',
              confirmButtonText: 'Relogin'
            })
            router.push('/')
          }
        }
        return Promise.reject(error)
      })
    },
    login (context, payload) {
      return new Promise((resolve, reject) => {
        axios.post(`${process.env.VUE_APP_BASE_URL}/auth/login`, payload)
          .then(res => {
            const result = res.data.result
            localStorage.setItem('token', result.token)
            localStorage.setItem('id', result.id)
            context.commit('SET_USER', result)
            context.dispatch('interceptorRequest')
            context.dispatch('expiredTokenProses', result.expiredToken)
            resolve(result)
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    register (context, payload) {
      return new Promise((resolve, reject) => {
        axios.post(`${process.env.VUE_APP_BASE_URL}/auth/register`, payload)
          .then(res => {
            const result = res.data
            resolve(result)
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    getProducts (context, payload) {
      return new Promise((resolve, reject) => {
        axios.get(`${process.env.VUE_APP_BASE_URL}/products`)
          .then((result) => {
            context.commit('GET_ALL_PRODUCTS', result.data.result)
            resolve(result.data.result)
          })
          .catch((error) => {
            reject(error.response)
          })
      })
    },
    createProducts (context, payload) {
      return new Promise((resolve, reject) => {
        axios.post(`${process.env.VUE_APP_BASE_URL}/products/create`, payload)
          .then((result) => {
            resolve(result.data.result)
          })
          .catch((error) => {
            reject(error.response)
          })
      })
    },
    deleteProducts (context, payload) {
      return new Promise((resolve, reject) => {
        axios.delete(`${process.env.VUE_APP_BASE_URL}/products/delete/${payload.id}`)
          .then((result) => {
            resolve(result.data.result)
          })
          .catch((error) => {
            reject(error.response)
          })
      })
    },
    updateProducts (context, payload) {
      return new Promise((resolve, reject) => {
        axios.patch(`${process.env.VUE_APP_BASE_URL}/products/update`, payload)
          .then((result) => {
            resolve(result.data.result)
          })
          .catch((error) => {
            reject(error.response)
          })
      })
    },
    historyProducts (context, payload) {
      return new Promise((resolve, reject) => {
        axios.get(`${process.env.VUE_APP_BASE_URL}/history?item_id=${payload.id}`)
          .then((result) => {
            context.commit('HISTORY_PRODUCTS', result.data)
            resolve(result.data)
          })
          .catch((error) => {
            reject(error.response)
          })
      })
    },
    createHistories (context, payload) {
      return new Promise((resolve, reject) => {
        axios.post(`${process.env.VUE_APP_BASE_URL}/history/create?item_id=${payload.item_id}`, payload)
          .then((result) => {
            resolve(result.data.result)
          })
          .catch((error) => {
            reject(error.response)
          })
      })
    }
  },
  modules: {
  },
  getters: {
    isLogin (state) {
      return state.token !== null
    },
    allProducts (state) {
      return state.allProducts
    },
    detailProducts (state) {
      return state.historyProducts
    }
  }
})
