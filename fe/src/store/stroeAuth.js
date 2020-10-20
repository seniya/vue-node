import {
  apiPageAuth,
  apiSiteInfo,
  apiSignUp,
  apiSignIn
} from '@/api/apiAuth'

const state = {
  token: localStorage.getItem('token'),
  user: {
    id: '',
    lv: 3,
    name: ''
  },
  siteInfo: {
    copyright: '',
    dark: '',
    title: ''
  },
  listType: localStorage.getItem('LIST_TYPE') || 'list'
}

const getters = {
  getToken: state => {
    return state.token
  },
  getSiteInfo: state => {
    return state.siteInfo
  },
  getListType: state => {
    return state.listType
  },
  getUser: state => {
    return state.user
  }
}

const mutations = {
  setToken (state, token) {
    state.token = token
  },
  setSiteInfo (state, siteInfo) {
    state.siteInfo = siteInfo
  },
  setListType (state, listType) {
    state.listType = listType
  },
  setUser (state, user) {
    state.user = user
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
    context.commit('setUser', data.user)
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
  },
  CHANGE_LIST_TYPE (context, payload) {
    localStorage.setItem('LIST_TYPE', payload)
    context.commit('setListType', payload)
    return payload
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
