import axios from 'axios'

export default {
  namespaced: true,
  state: {
    items: []
  },
  actions: {
    fetchThreads({ state, commit }, meetupId) {
      return axios.get(`/api/v1/threads?meetupId=${meetupId}`)
        .then(response => {
          const threads = response.data
          commit('setData', { resource: 'items', data: threads })
          return state.items
        })
    }
  },
  mutations: {
    setData(state, { resource, data }) {
      state[resource] = data
    }
  }
}
