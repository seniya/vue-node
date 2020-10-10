import Vue from 'vue'
import Vuex from 'vuex'

import auth from '@/store/stroeAuth'
import manage from '@/store/stroeManage'
import board from '@/store/stroeBoard'
import article from '@/store/stroeAticle'
import file from '@/store/stroeFile'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    auth,
    manage,
    board,
    article,
    file
  }
})
