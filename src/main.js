import Vue from 'vue'
import moment from 'moment'
import App from './App.vue'
import AppDropdown from './components/shared/AppDropdown'
import AppHero from './components/shared/AppHero'

import router from './router'

Vue.config.productionTip = false

Vue.component('AppHero', AppHero)
Vue.component('AppDropdown', AppDropdown)

Vue.filter('capitalize', (word = '') => `${word.charAt(0).toUpperCase()}${word.slice(1)}`)

Vue.filter('formatDate', (value = '', formatType = 'LL') => moment(value).format(formatType))

new Vue({
  router, 
  render: h => h(App),
}).$mount('#app')
