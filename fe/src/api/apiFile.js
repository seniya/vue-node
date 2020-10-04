import { instance } from './instance'

function apiFileUploadDefalut (fdata) {
  return instance({
    method: 'POST',
    url: '/file',
    data: fdata
  })
}

export {
  apiFileUploadDefalut

}
