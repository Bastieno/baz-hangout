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
    registerUser(context, formData) {
      console.log(formData)
    }
  }
}
