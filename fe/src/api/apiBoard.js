import { instance } from './instance'

function apiBoard (id) {
  return instance({
    method: 'GET',
    url: `/board/read/${id}`
  })
}

export {
  apiBoard

}
