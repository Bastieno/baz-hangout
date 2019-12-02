import axios from 'axios'
export default {
  namespaced: true,
  state: {
    loginData: {},
    registerData: {}
  },
  actions: {
    loginWithEmailAndPassword(context, formData) {
      console.log(formData)
    },
    registerUser(context, userData) {
      return axios.post('/api/v1/users/register', userData)
    }
  }
}
