import {
  apiPageAuth,
  apiSiteInfo
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
    return state.token
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
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
