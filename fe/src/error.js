import Vue from 'vue'

Vue.config.errorHandler = e => {
  alert('dddd')
  console.error('errorHandler : ', e.message)
  Vue.prototype.$toast.error(e.message)
}
