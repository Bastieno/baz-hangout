import axios from 'axios'

export default {
  namespaced: true,
  state: {
    items: [],
    item: {}
  },
  actions: {
    fetchMeetups({ state, commit }) {
      return axios.get('/api/v1/meetups')
        .then(response => {
          const meetups = response.data
          commit('setData', { resource: 'items', data: meetups })
          return state.items
        })
        .catch(error => console.log(error))
    },
    fetchMeetup({ state, commit }, meetupId) {
      return axios.get(`/api/v1/meetups/${meetupId}`)
        .then(response => {
          const meetup = response.data
          commit('setData', { resource: 'item', data: meetup })
          return state.item
        })
    },
    createMeetup(context, meetupData) {
      // Make a request to api
      console.log(meetupData)
    }
  },
  mutations: {
    setData(state, {resource, data}) {
      state[resource] = data
    }
  }
}
