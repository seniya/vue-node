import { instance } from './instance'

function apiBoardAdd (fdata) {
  return instance({
    method: 'POST',
    url: '/manage/board',
    data: fdata
  })
}

function apiBoardInfo () {
  return instance({
    method: 'GET',
    url: '/manage/board'
  })
}

function apiBoardUpdate (id, fdata) {
  return instance({
    method: 'PUT',
    url: `/manage/board/${id}`,
    data: fdata
  })
}

function apiBoardRemove (id) {
  return instance({
    method: 'DELETE',
    url: `/manage/board/${id}`
  })
}

export {
  apiBoardAdd,
  apiBoardInfo,
  apiBoardUpdate,
  apiBoardRemove
}
