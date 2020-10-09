import { instance } from './instance'

function apiArticles (boardId, gdata) {
  return instance({
    method: 'GET',
    url: `/article/list/${boardId}`,
    params: gdata
  })
}
function apiArticleAdd (boardId, fdata) {
  return instance({
    method: 'POST',
    url: `/article/${boardId}`,
    data: fdata
  })
}
function apiArticleRead (id) {
  return instance({
    method: 'GET',
    url: `/article/read/${id}`
  })
}
function apiArticleUpdate (id, fdata) {
  return instance({
    method: 'PUT',
    url: `/article/${id}`,
    data: fdata
  })
}
function apiArticleRemove (id) {
  return instance({
    method: 'DELETE',
    url: `/article/${id}`
  })
}
export {
  apiArticles,
  apiArticleAdd,
  apiArticleRead,
  apiArticleUpdate,
  apiArticleRemove
}
