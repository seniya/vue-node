import axios from 'axios'
import { setInterceptors } from './common/interceptors'

const apiRootPath = process.env.NODE_ENV !== 'production' ? 'http://localhost:3000/api' : '/api'

function createInstance () {
  const instance = axios.create({
    baseURL: apiRootPath
  })
  return setInterceptors(instance)
}

export const instance = createInstance()
