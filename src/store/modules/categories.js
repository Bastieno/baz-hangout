import axios from 'axios'

export default {
  namespaced: true,
  state: {
    items: []
  },
  actions: {
    fetchCategories({ state, commit }) {
      return axios.get('/api/v1/categories')
        .then(response => {
          const categories = response.data
          commit('setData', { resource: 'items', data: categories })
          return state.items
        })
        .catch(error => console.log(error))
    },
  },
  mutations: {
    setData(state, { resource, data }) {
      state[resource] = data
    }
  }
}

