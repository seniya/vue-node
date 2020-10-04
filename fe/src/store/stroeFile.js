import {
  apiFileUploadDefalut
} from '@/api/apiFile'

const state = {

}

const getters = {

}

const mutations = {

}

const actions = {
  async FILE_UPLOAD_DEFAULT (context, payload) {
    const { data } = await apiFileUploadDefalut(payload.fdata)
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
