import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    meetups: [],
    categories: [],
    threads: [],
    meetup: {}
  },
  getters: {
  },
  actions: {
    fetchMeetups({state, commit}) {
      axios.get('/api/v1/meetups')
        .then(response => {
          const meetups = response.data
          commit('setData', {resource: 'meetups', data: meetups})
          return state.meetups
        })
        .catch(error => console.log(error))
    },
    fetchCategories({state, commit}) {
      axios.get('/api/v1/categories')
        .then(response => {
          const categories = response.data
          commit('setData', { resource: 'categories', data: categories })
          return state.categories
        })
        .catch(error => console.log(error))
    },
    fetchMeetup({state, commit}, meetupId) {
      axios.get(`/api/v1/meetups/${meetupId}`)
        .then(response => {
          const meetup = response.data
          commit('setData', { resource: 'meetup', data: meetup })
          return state.meetup
        })
    },
    fetchThreads({state, commit}, meetupId) {
      axios.get(`/api/v1/threads?meetupId=${meetupId}`)
        .then(response => {
          const threads = response.data
          commit('setData', { resource: 'threads', data: threads })
          return state.threads
        })
    }
  },
  mutations: {
    setData(state, {resource, data}) {
      state[resource] = data
    }
  }
})
