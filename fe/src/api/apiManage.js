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

function apiPageInfo () {
  return instance({
    method: 'GET',
    url: '/manage/page'
  })
}

function apiPageUpdate (id, fdata) {
  return instance({
    method: 'PUT',
    url: `/manage/page/${id}`,
    data: fdata
  })
}

function apiPageRemove (id) {
  return instance({
    method: 'DELETE',
    url: `/manage/page/${id}`
  })
}

function apiUserInfo () {
  return instance({
    method: 'GET',
    url: '/manage/user'
  })
}

function apiUserUpdate (id, fdata) {
  return instance({
    method: 'PUT',
    url: `/manage/user/${id}`,
    data: fdata
  })
}

function apiUserRemove (id) {
  return instance({
    method: 'DELETE',
    url: `/manage/user/${id}`
  })
}

function apiSiteInfo () {
  return instance({
    method: 'GET',
    url: '/manage/site'
  })
}

function apiSiteUpdate (id, fdata) {
  return instance({
    method: 'PUT',
    url: `/manage/site/${id}`,
    data: fdata
  })
}

function apiSiteRemove (id) {
  return instance({
    method: 'DELETE',
    url: `/manage/site/${id}`
  })
}

export {
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
}
