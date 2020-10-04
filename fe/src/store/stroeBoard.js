import {
  apiBoard
} from '@/api/apiBoard'

const state = {

}

const getters = {

}

const mutations = {

}

const actions = {
  async BOARD_INFO (context, payload) {
    const { data } = await apiBoard(payload.id)
    return data
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
