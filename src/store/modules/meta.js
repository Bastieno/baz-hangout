import axios from 'axios'

export default {
  namespaced: true,
  state: {
    isLocationResolved: false,
    item: {
      city: '',
      country: ''
    }
  },
  getters: {
    location(state) {
      const { city, country } = state.item
      console.log('city', city)
      console.log('country', country)
      return null
    }
  },
  actions: {
    fetchMetaData({commit}) {
      return axios.get('/api/v1')
        .then(res => {
          const meta = res.data
          commit('setItem', meta)
          commit('resolveLocation', true)
        })
        .catch(err => {
          commit('resolveLocation', true)
          return err
        })
    }
  },
  mutations: {
    setItem(state, meta) {
      state.item = meta
    },
    resolveLocation(state, status) {
      state.isLocationResolved = status
    }
  }
}
