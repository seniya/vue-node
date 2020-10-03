import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// import LoadScript from 'vue-plugin-load-script'
// import VueRecaptcha from 'vue-recaptcha'
import vuetify from './plugins/vuetify'
import cfg from '../config'

Vue.config.productionTip = false
Vue.prototype.$cfg = cfg

// Vue.use(LoadScript)

// Vue.loadScript('https://www.google.com/recaptcha/api.js?onload=vueRecaptchaApiLoaded&render=explicit')
//   .then(() => {
//     console.log('load VueRecaptcha 1')
//     Vue.component('vue-recaptcha', VueRecaptcha)
//     console.log('load VueRecaptcha 2')
//   })
//   .catch((e) => {
//     console.error(`google api load failed: ${e.message}`)
//   })

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
