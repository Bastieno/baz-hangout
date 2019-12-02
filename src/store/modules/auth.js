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
    getAuthUser({commit, getters}) {
      const authUser = getters['selectAuthUser']

      if (authUser) return new Promise.resolve(authUser)

      const config = {
        headers: {
          'Cache-Control': 'no-cache'
        }
      }

      return axios.get('/api/v1/users/me', config)
        .then(res => {
          const user = res.data
          commit('setAuthUser', user)
          commit('setAuthState', true)
          return user
        })
        .catch(err => {
          console.log(err)
          commit('setAuthUser', null)
          commit('setAuthState', true)
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
