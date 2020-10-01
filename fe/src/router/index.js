import Vue from 'vue'
import VueRouter from 'vue-router'
import axios from 'axios'

Vue.use(VueRouter)

Vue.prototype.$axios = axios

const apiRootPath = process.env.NODE_ENV !== 'production' ? 'http://localhost:3000/api' : '/api'
Vue.prototype.$apiRootPath = apiRootPath
axios.defaults.baseURL = apiRootPath
axios.defaults.headers.common.Authorization = localStorage.getItem('token')

axios.interceptors.request.use(function (config) {
  config.headers.Authorization = localStorage.getItem('token')
  return config
}, function (error) {
  return Promise.reject(error)
})

axios.interceptors.response.use(function (response) {
  return response
}, function (error) {
  return Promise.reject(error)
})

const pageCheck = (to, from, next) => {
  // return next()
  axios.post(`${apiRootPath}/page`, { name: to.path.replace('/', '') }, { headers: { Authorization: localStorage.getItem('token') } })
    .then((r) => {
      if (!r.data.success) throw new Error(r.data.msg)
      next()
    })
    .catch((e) => {
      // console.error(e.message)
      next(`/block/${e.message}`)
    })
}

const routes = [
  {
    path: '/',
    name: 'lv0',
    component: () => import('../views/lv0.vue'),
    beforeEnter: pageCheck
  },
  {
    path: '/lv1',
    name: 'lv1',
    component: () => import('../views/lv1.vue'),
    beforeEnter: pageCheck
  },
  {
    path: '/lv2',
    name: 'lv2',
    component: () => import('../views/lv2.vue'),
    beforeEnter: pageCheck
  },
  {
    path: '/lv3',
    name: 'lv3',
    component: () => import('../views/lv3.vue'),
    beforeEnter: pageCheck
  },
  {
    path: '/user',
    name: 'user',
    component: () => import('../views/user.vue'),
    beforeEnter: pageCheck
  },
  {
    path: '/page',
    name: 'page',
    component: () => import('../views/page.vue'),
    beforeEnter: pageCheck
  },
  {
    path: '/block/:msg',
    name: 'block',
    component: () => import('../views/block.vue')
  },
  {
    path: '/test',
    name: 'test',
    component: () => import('../views/test.vue')
  },
  {
    path: '/sign',
    name: 'login',
    component: () => import('../views/sign.vue')
  },
  {
    path: '/site',
    name: 'site',
    component: () => import('../views/site.vue'),
    beforeEnter: pageCheck
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('../views/register.vue')
  },
  {
    path: '*',
    name: 'e404',
    component: () => import('../views/e404.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
