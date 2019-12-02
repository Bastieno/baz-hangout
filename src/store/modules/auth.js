import axios from 'axios'
export default {
  namespaced: true,
  state: {
    user: null
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
          console.log('user', user)
          context.commit('setAuthUser', user)
        })
    },
    registerUser(context, userData) {
      return axios.post('/api/v1/users/register', userData)
    }
  },
  mutations: {
    setAuthUser(state, user) {
      state.user = user
    }
  }
}
