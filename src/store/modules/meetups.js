import axios from 'axios'

export default {
  namespaced: true,
  state: {
    items: [],
    item: {}
  },
  actions: {
    fetchMeetups({ state, commit }) {
      axios.get('/api/v1/meetups')
        .then(response => {
          const meetups = response.data
          commit('setData', { resource: 'items', data: meetups })
          return state.meetups
        })
        .catch(error => console.log(error))
    },
    fetchMeetup({ state, commit }, meetupId) {
      axios.get(`/api/v1/meetups/${meetupId}`)
        .then(response => {
          const meetup = response.data
          commit('setData', { resource: 'item', data: meetup })
          return state.meetup
        })
    }
  },
  mutations: {
    setData(state, {resource, data}) {
      state[resource] = data
    }
  }
}
