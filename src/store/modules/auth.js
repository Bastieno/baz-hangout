import axios from 'axios'
export default {
  namespaced: true,
  state: {
    user: null,
    isAuthResolved: false
  },
  getters: {
    selectAuthUser(state) {
      return state.user || null
    },
    isAuthenticated(state) {
      return !!state.user
    }
  },
  actions: {
    loginWithEmailAndPassword(context, userData) {
      return axios.post('/api/v1/users/login', userData)
        .then(res => {
          const user = res.data
          context.commit('setAuthUser', user)
        })
    },
    registerUser(context, userData) {
      return axios.post('/api/v1/users/register', userData)
    },
    getAuthUser(context) {
      return axios.get('/api/v1/users/me')
        .then(res => {
          const user = res.data
          context.commit('setAuthUser', user)
          context.commit('setAuthState', true)
          return user
        })
        .catch(err => {
          console.log(err)
          context.commit('setAuthUser', null)
          context.commit('setAuthState', true)
        })
    },
    logout(context) {
      return axios.post('/api/v1/users/logout')
        .then(() => context.commit('setAuthUser', null))
        .catch(err => console.log(err))
    }
  },
  mutations: {
    setAuthUser(state, user) {
      state.user = user
    },
    setAuthState(state, authState) {
      state.isAuthResolved = authState
    }
  }
}
