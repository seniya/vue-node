
import Vue from 'vue'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'

Vue.use(Loading, {
  // props
  // container: this.$refs.loadingContainer,
  // canCancel: true, // default false
  // onCancel: this.yourCallbackMethod,
  color: '#000000',
  loader: 'spinner',
  width: 64,
  height: 64,
  backgroundColor: '#ffffff',
  opacity: 0.5,
  zIndex: 999
}, {
  // slots
})
