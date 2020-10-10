import {
  apiPageAuth,
  apiSiteInfo,
  apiSignUp,
  apiSignIn
} from '@/api/apiAuth'

const state = {
  token: localStorage.getItem('token'),
  siteInfo: {
    copyright: '',
    dark: '',
    title: '',
    listType: ''
  }
}

const getters = {
  getToken: state => {
    return state.token
  },
  getSiteInfo: state => {
    return state.siteInfo
  }
}

const mutations = {
  setToken (state, token) {
    state.token = token
  },
  setSiteInfo (state, siteInfo) {
    state.siteInfo = siteInfo
  }
}

const actions = {
  async PAGE_AUTH (context, payload) {
    const { data } = await apiPageAuth(payload)
    return data
  },
  async SITE_INFO (context) {
    const { data } = await apiSiteInfo()
    context.commit('setSiteInfo', data.body)
    return data.body
  },
  async SIGN_UP (context, payload) {
    const { data } = await apiSignUp(payload)
    return data
  },
  async SIGN_IN (context, payload) {
    const { data } = await apiSignIn(payload)
    localStorage.setItem('token', data.body)
    context.commit('setToken', data.body)
    return data
  },
  async SIGN_OUT (context, payload) {
    localStorage.removeItem('token')
    context.commit('setToken', null)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
