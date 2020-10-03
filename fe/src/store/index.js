import Vue from 'vue'
import Vuex from 'vuex'

import auth from '@/store/stroeAuth'
import manage from '@/store/stroeManage'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    sb: {
      act: false,
      msg: '',
      color: 'error'
    }
  },
  mutations: {
    pop (state, d) {
      state.sb.msg = d.msg
      state.sb.color = d.color
      state.sb.act = false
      if (d.act === undefined) state.sb.act = true
    }
  },
  actions: {
  },
  modules: {
    auth,
    manage
  }
})
