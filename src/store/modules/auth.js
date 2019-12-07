import Vue from 'vue'
import axios from 'axios'
import jwt from 'jsonwebtoken'
import axiosInstance from '../../services/axios'
import { rejectError } from '../../helpers'

const checkTokenValidity = (token) => {
  if (token) {
    const decodedToken = jwt.decode(token)

    return decodedToken && (decodedToken.exp * 1000) > new Date().getTime()
  }
  return false
}

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
    },
    isMeetupOwner: (state) => (meetupCreatorId) => {
      if (!state.user) return false
      return state.user._id === meetupCreatorId
    },
    isMember: (state) => (meetupId) => {
      return state.user &&
             state.user['joinedMeetups'] &&
             state.user['joinedMeetups'].includes(meetupId)
    }
  },
  actions: {
    loginWithEmailAndPassword(context, userData) {
      return axios.post('/api/v1/users/login', userData)
        .then(res => {
          const user = res.data
          localStorage.setItem('user-token', user.token)
          context.commit('setAuthUser', user)
        })
        .catch(error => rejectError(error))
    },

    registerUser(context, userData) {
      return axios.post('/api/v1/users/register', userData)
      .catch(error => rejectError(error))
    },

    getAuthUser({commit, getters}) {
      const authUser = getters['selectAuthUser']
      const token = localStorage.getItem('user-token')
      const isTokenValid = checkTokenValidity(token)

      if (authUser && isTokenValid) return Promise.resolve(authUser)

      return axiosInstance.get('/api/v1/users/me')
        .then(res => {
          const user = res.data
          localStorage.setItem('user-token', user.token)
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

    addMeetupToAuthUser({commit, state}, meetupId) {
      const userMeetups = [ ...state.user['joinedMeetups'], meetupId ]
      commit('setMeetupsToAuthUser', userMeetups)
    },

    removeMeetupFromAuthUser({commit, state}, meetupId) {
      const userMeetupsIds = state.user['joinedMeetups']
      const newUserMeetupsIds = userMeetupsIds.filter(id => id !== meetupId)
      commit('setMeetupsToAuthUser', newUserMeetupsIds)
    },

    logout({commit}) {
      return new Promise(resolve => {
        localStorage.removeItem('user-token')
        commit('setAuthUser', null)
        resolve(true)
      })
    }
  },
  mutations: {
    setAuthUser(state, user) {
      state.user = user
    },
    setAuthState(state, authState) {
      state.isAuthResolved = authState
    },
    setMeetupsToAuthUser(state, meetups) {
      Vue.set(state.user, 'joinedMeetups', meetups)
    }
  }
}
