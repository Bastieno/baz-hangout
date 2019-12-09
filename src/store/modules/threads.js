import Vue from 'vue'
import axios from 'axios'
import axiosInstance from '../../services/axios'

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
    },
    postThread({state, commit}, {title, meetupId}) {
      const thread = {
        title,
        meetup: meetupId
      }
      return axiosInstance.post('/api/v1/threads', thread)
        .then((res) => {
          const createdThread = res.data
          const index = state.items.length
          commit('addThreadToArray', { resource: 'items', index, createdThread })
          return createdThread
        })
    },
    sendPost({state, commit}, {text, threadId}) {
      const post = {
        text,
        thread: threadId
      }

      console.log('post', post)

      console.log('state', state)
      console.log('commit', commit)

      return axiosInstance.post('/api/v1/posts', post)
        .then(() => console.log('Post sent'))
        .catch((err) => console.log(err.message))
    }
  },
  mutations: {
    setData(state, { resource, data }) {
      state[resource] = data
    },
    addThreadToArray(state, { resource, index, createdThread }) {
      Vue.set(state[resource], index, createdThread )
    }
  }
}
