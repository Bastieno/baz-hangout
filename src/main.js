import Vue from 'vue'
import vuelidate from 'vuelidate'
import Toasted from 'vue-toasted';
import moment from 'moment'
import App from './App.vue'
import AppDropdown from './components/shared/AppDropdown'
import AppHero from './components/shared/AppHero'
import AppSpinner from './components/shared/AppSpinner'

import router from './router'
import store from './store'
import AppSocket from './plugins/socket'

Vue.config.productionTip = false

Vue.component('AppHero', AppHero)
Vue.component('AppDropdown', AppDropdown)
Vue.component('AppSpinner', AppSpinner)

Vue.use(vuelidate)
Vue.use(Toasted)
Vue.use(AppSocket, {connection: 'http://localhost:3001'})

Vue.filter('capitalize', (word = '') => `${word.charAt(0).toUpperCase()}${word.slice(1)}`)

Vue.filter('formatDate', (value = '', formatType = 'LL') => moment(value).format(formatType))

Vue.filter('fromNow', (value = '') => moment(value).fromNow())

new Vue({
  router,
  store,
  vuelidate,
  render: h => h(App),
}).$mount('#app')
