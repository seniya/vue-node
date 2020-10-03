import Vue from 'vue'
import VueRouter from 'vue-router'
import axios from 'axios'
import routesMain from '@/router/routesMain'
import routesSign from '@/router/routesSign'

Vue.use(VueRouter)

Vue.prototype.$axios = axios

const apiRootPath = process.env.NODE_ENV !== 'production' ? 'http://localhost:3000/api' : '/api'
Vue.prototype.$apiRootPath = apiRootPath

axios.interceptors.request.use(function (config) {
  config.headers.Authorization = localStorage.getItem('token')
  return config
}, function (error) {
  return Promise.reject(error)
})

axios.interceptors.response.use(function (response) {
  const token = response.data.token
  if (token) localStorage.setItem('token', token)
  return response
}, function (error) {
  console.log(error.response)
  switch (error.response.status) {
    case 400:
      this.$store.commit('pop', { msg: `잘못된 요청입니다(${error.response.status}:${error.message})`, color: 'error' })
      break
    case 401:
      this.$store.commit('delToken')
      this.$store.commit('pop', { msg: `인증 오류입니다(${error.response.status}:${error.message})`, color: 'error' })
      break
    case 403:
      this.$store.commit('pop', { msg: `이용 권한이 없습니다(${error.response.status}:${error.message})`, color: 'warning' })
      break
    default:
      this.$store.commit('pop', { msg: `알수 없는 오류입니다(${error.response.status}:${error.message})`, color: 'error' })
      break
  }
  return Promise.reject(error)
})

const routes = [
  routesMain,
  routesSign,
  {
    path: '/test',
    name: 'test',
    component: () => import('@/views/test.vue')
  },
  {
    path: '*',
    name: 'e404',
    component: () => import('@/views/e404.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
