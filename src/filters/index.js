import Vue from 'vue'
import moment from 'moment'

const filters = () => {
  Vue.filter('capitalize', (word = '') => `${word.charAt(0).toUpperCase()}${word.slice(1)}`)

  Vue.filter('formatDate', (value = '', formatType = 'LL') => moment(value).format(formatType))

  Vue.filter('fromNow', (value = '') => moment(value).fromNow())
}

export default filters
