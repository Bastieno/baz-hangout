import Vue from 'vue'
import moment from 'moment'
import App from './App.vue'
import AppDropdown from './components/shared/AppDropdown'
import AppHero from './components/shared/AppHero'
import AppSpinner from './components/shared/AppSpinner'

import router from './router'
import store from './store'

Vue.config.productionTip = false

Vue.component('AppHero', AppHero)
Vue.component('AppDropdown', AppDropdown)
Vue.component('AppSpinner', AppSpinner)

Vue.filter('capitalize', (word = '') => `${word.charAt(0).toUpperCase()}${word.slice(1)}`)

Vue.filter('formatDate', (value = '', formatType = 'LL') => moment(value).format(formatType))

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
