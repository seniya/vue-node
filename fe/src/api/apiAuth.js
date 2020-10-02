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

export {
  apiPageAuth,
  apiSiteInfo
}
