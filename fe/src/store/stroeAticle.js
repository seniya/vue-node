import {
  apiArticles,
  apiArticleAdd,
  apiArticleRead,
  apiArticleUpdate,
  apiArticleRemove
} from '@/api/apiAticle'

const state = {

}

const getters = {

}

const mutations = {

}

const actions = {
  async ARTICLE_ITEMS (context, payload) {
    const { data } = await apiArticles(payload.id)
    return data
  },
  async ARTICLE_ADD (context, payload) {
    const { data } = await apiArticleAdd(payload.id, payload.fdata)
    return data
  },
  async ARTICLE_READ (context, payload) {
    const { data } = await apiArticleRead(payload.id)
    return data
  },
  async ARTICLE_UPDATE (context, payload) {
    const { data } = await apiArticleUpdate(payload.id, payload.fdata)
    return data
  },
  async ARTICLE_REMOVE (context, payload) {
    const { data } = await apiArticleRemove(payload.id)
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
