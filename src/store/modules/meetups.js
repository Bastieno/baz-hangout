import Vue from 'vue'
import axios from 'axios'
import axiosInstance  from '../../services/axios'
import { applyFilters } from '../../helpers'

export default {
  namespaced: true,
  state: {
    items: [],
    item: {}
  },
  actions: {
    fetchMeetups({ state, commit }, options = {}) {
      const url = applyFilters('/api/v1/meetups', options.filter)
      return axios.get(url)
        .then(response => {
          const meetups = response.data
          commit('setData', { resource: 'items', data: meetups })
          return state.items
        })
        .catch(error => error)
    },
    fetchMeetup({ state, commit }, meetupId) {
      return axios.get(`/api/v1/meetups/${meetupId}`)
        .then(response => {
          const meetup = response.data
          commit('setData', { resource: 'item', data: meetup })
          return state.item
        })
    },
    createMeetup({rootState}, meetupData) {
      // Make a request to api
      const { user } = rootState.auth
      meetupData.meetupCreator = user
      meetupData.processedLocation = meetupData.location.toLowerCase().replace(/[\s,]+/g, '').trim()

      return axiosInstance.post('/api/v1/meetups', meetupData)
        .then((res) => res.data)
    },
    joinMeetup({state, rootState, commit, dispatch}, meetupId) {
      const { user } = rootState.auth

      return axiosInstance.post(`/api/v1/meetups/${meetupId}/join`)
        .then(() => {
          dispatch('auth/addMeetupToAuthUser', meetupId, {root: true})

          const { joinedPeople } = state.item
          commit('addUserToMeetup', [...joinedPeople, user])
          return true
        })
    },
    leaveMeetup({state, rootState, commit, dispatch}, meetupId) {
      const { user } = rootState.auth

      return axiosInstance.post(`/api/v1/meetups/${meetupId}/leave`)
        .then(() => {
          dispatch('auth/removeMeetupFromAuthUser', meetupId, {root: true})

          const { joinedPeople } = state.item
          commit('removeUserFromMeetup', joinedPeople.filter((joinedUser) => joinedUser._id !== user._id))
          return true
        })
    },
    updateMeetup({commit}, meetup) {
      meetup.processedLocation = meetup.location.toLowerCase().replace(/[\s,]+/g, '').trim()
      return axiosInstance.patch(`/api/v1/meetups/${meetup._id}`, meetup)
        .then(res => {
          const updatedMeetup = res.data
          commit('setData', {resource: 'item', data: updatedMeetup})
          return updatedMeetup
        })
    }
  },
  mutations: {
    setData(state, {resource, data}) {
      state[resource] = data
    },
    addUserToMeetup(state, joinedPeople) {
      Vue.set(state.item, 'joinedPeople', joinedPeople)
    },
    removeUserFromMeetup(state, joinedPeople) {
      Vue.set(state.item, 'joinedPeople', joinedPeople)
    }
  }
}
