import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { ValidationProvider, extend } from 'vee-validate'
import vuetify from './plugins/vuetify'

Vue.config.productionTip = false

extend('secret', {
  validate: value => value === 'example',
  message: 'This is not the magic word'
})
Vue.component('ValidationProvider', ValidationProvider)

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
