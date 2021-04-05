import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
// import router from '../router/index'
// import VueSweetalert2 from 'vue-sweetalert2'
// import 'sweetalert2/dist/sweetalert2.min.css'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    allProducts: []
  },
  mutations: {
    GET_ALL_PRODUCTS (state, payload) {
      state.allProducts = payload
    }
  },
  actions: {
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
    }
  },
  modules: {
  },
  getters: {
    allProducts (state) {
      return state.allProducts
    }
  }
})
