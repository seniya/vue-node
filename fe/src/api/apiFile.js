import { instance } from './instance'

function apiFileUploadDefalut (fdata) {
  return instance({
    method: 'POST',
    url: '/file/upload',
    data: fdata
  })
}

export {
  apiFileUploadDefalut

}
