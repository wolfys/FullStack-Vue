import { createStore } from 'vuex'
import createPersistedState from "vuex-persistedstate";

export default createStore({
  strict: true,
  plugins: [createPersistedState()],
  state: {
    bearer: localStorage.getItem('bearer'),
    status: '',
    me: [],
    role: '',
    isAuthenticated: false,
    tokenTime: null,
    cart: 0,
    imageUrl: 'http://127.0.0.1:8000/storage',
    apiUrl: "http://127.0.0.1:8000/api"
  },
  mutations: {
    bearer(state, payload) {
      state.bearer = payload
    },
    me(state, payload) {
      state.me = payload
    },
    role(state,payload) {
      state.role = payload
    },
    isAuthenticated(state,payload) {
      state.isAuthenticated = payload
    },
    tokenTime(state,payload) {
      state.tokenTime = payload
    },
    apiUrl(state,payload) {
      state.apiUrl = payload
    },
    imageUrl(state,payload) {
      state.imageUrl = payload
    },
    cart(state,payload) {
      state.cart = payload
    }
  },
  actions: {
  },
  modules: {
  },
  getters: {
    BEARER : state => {
      return state.bearer
    },
    ME : state => {
      return state.me
    },
    ROLE: state => state.role,
    isAuthenticated: state => !!state.bearer,
    tokenTime: state => state.tokenTime,
    authStatus: state => state.status,
    roleUsers: state => state.me['role_id'],
    apiUrl: state => state.apiUrl,
    imageUrl: state => state.imageUrl,
    cart: state => state.cart
  }
})
