import {
  apiBoardAdd,
  apiBoardInfo,
  apiBoardUpdate,
  apiBoardRemove,
  apiPageInfo,
  apiPageUpdate,
  apiPageRemove,
  apiUserInfo,
  apiUserUpdate,
  apiUserRemove,
  apiSiteInfo,
  apiSiteUpdate,
  apiSiteRemove
} from '@/api/apiManage'

const state = {}
const getters = {}
const mutations = {}

const actions = {
  async BOARD_ADD (context, payload) {
    const { data } = await apiBoardAdd(payload)
    return data
  },
  async BOARD_INFO (context) {
    const { data } = await apiBoardInfo()
    return data.body
  },
  async BOARD_UPDATE (context, payload) {
    const { data } = await apiBoardUpdate(payload.id, payload.data)
    return data
  },
  async BOARD_REMOVE (context, payload) {
    const { data } = await apiBoardRemove(payload.id)
    return data.body
  },
  async PAGE_INFO (context) {
    const { data } = await apiPageInfo()
    return data.body
  },
  async PAGE_UPDATE (context, payload) {
    const { data } = await apiPageUpdate(payload.id, payload.data)
    return data
  },
  async PAGE_REMOVE (context, payload) {
    const { data } = await apiPageRemove(payload.id)
    return data.body
  },
  async USER_INFO (context) {
    const { data } = await apiUserInfo()
    return data.body
  },
  async USER_UPDATE (context, payload) {
    const { data } = await apiUserUpdate(payload.id, payload.data)
    return data
  },
  async USER_REMOVE (context, payload) {
    const { data } = await apiUserRemove(payload.id)
    return data.body
  },
  async SITE_INFO (context) {
    const { data } = await apiSiteInfo()
    return data.body
  },
  async SITE_UPDATE (context, payload) {
    const { data } = await apiSiteUpdate(payload.id, payload.data)
    return data
  },
  async SITE_REMOVE (context, payload) {
    const { data } = await apiSiteRemove(payload.id)
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
