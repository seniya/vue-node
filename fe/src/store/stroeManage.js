import {
  apiBoardAdd,
  apiBoardInfo,
  apiBoardUpdate,
  apiBoardRemove
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
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
