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
    selectMeetups(state) {
      return state.meetups
    },
    selectCategories(state) {
      return state.categories
    },
    selectThreads(state) {
      return state.threads
    },
    selectMeetup(state) {
      return state.meetup
    }
  },
  actions: {
    fetchMeetups({state, commit}) {
      axios.get('/api/v1/meetups')
        .then(response => {
          const meetups = response.data
          commit('setMeetups', meetups)
          return state.meetups
        })
        .catch(error => console.log(error))
    },
    fetchCategories({state, commit}) {
      axios.get('/api/v1/categories')
        .then(response => {
          const categories = response.data
          commit('setCategories', categories)
          return state.categories
        })
        .catch(error => console.log(error))
    },
    fetchMeetup({state, commit}, meetupId) {
      axios.get(`/api/v1/meetups/${meetupId}`)
        .then(response => {
          const meetup = response.data
          commit('setMeetup', meetup)
          return state.meetup
        })
    },
    fetchThreads({state, commit}, meetupId) {
      axios.get(`/api/v1/threads?meetupId=${meetupId}`)
        .then(response => {
          const threads = response.data
          commit('setThreads', threads)
          return state.threads
        })
    }
  },
  mutations: {
    setMeetups(state, meetups) {
      state.meetups = meetups
    },
    setCategories(state, categories) {
      state.categories = categories
    },
    setThreads(state, threads) {
      state.threads = threads
    },
    setMeetup(state, meetup) {
      state.meetup = meetup
    }
  }
})
