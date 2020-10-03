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
    title: ''
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
    console.log('SIGN_IN 1', state.token)
    const { data } = await apiSignIn(payload)
    localStorage.setItem('token', data.body)
    context.commit('setToken', data.body)
    console.log('SIGN_IN 2', state.token)
    return data
  },
  async SIGN_OUT (context, payload) {
    console.log('SIGN_OUT 1', state.token)
    localStorage.removeItem('token')
    context.commit('setToken', null)
    console.log('SIGN_OUT 2', state.token)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
