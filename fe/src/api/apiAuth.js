import { instance } from './instance'

function apiPageAuth (fdata) {
  return instance({
    method: 'POST',
    url: '/pageAuth',
    data: fdata
  })
}

function apiSiteInfo () {
  return instance({
    method: 'GET',
    url: '/siteInfo'
  })
}

function apiSignUp (fdata) {
  return instance({
    method: 'POST',
    url: '/sign/up',
    data: fdata
  })
}

function apiSignIn (fdata) {
  return instance({
    method: 'POST',
    url: '/sign/in',
    data: fdata
  })
}

export {
  apiPageAuth,
  apiSiteInfo,
  apiSignUp,
  apiSignIn
}
