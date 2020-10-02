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

const pageCheck = (to, from, next) => {
  // return next()
  axios.post(`${apiRootPath}/page`, { name: to.path.replace('/', '') }, { headers: { Authorization: localStorage.getItem('token') } })
    .then((r) => {
      if (!r.data.success) throw new Error(r.data.msg)
      next()
    })
    .catch((e) => {
      // next(`/block/${e.message.replace(/\//gi, ' ')}`)
      if (!e.response) this.$store.commit('pop', { msg: e.message, color: 'warning' })
      next(false)
    })
}

const routes = [
  {
    path: '/',
    name: 'dashboard',
    component: () => import('../views/dashboard.vue'),
    beforeEnter: pageCheck
  },
  {
    path: '/board/:name',
    name: 'board',
    component: () => import('../views/board/index.vue'),
    beforeEnter: pageCheck
  },
  {
    path: '/test/lv3',
    name: 'testLv3',
    component: () => import('../views/test/lv3.vue'),
    beforeEnter: pageCheck
  },
  {
    path: '/test/lv2',
    name: 'testLv2',
    component: () => import('../views/test/lv2.vue'),
    beforeEnter: pageCheck
  },
  {
    path: '/test/lv1',
    name: 'testLv1',
    component: () => import('../views/test/lv1.vue'),
    beforeEnter: pageCheck
  },
  {
    path: '/test/lv0',
    name: 'testLv0',
    component: () => import('../views/test/lv0.vue'),
    beforeEnter: pageCheck
  },
  {
    path: '/manage/users',
    name: 'manageUsers',
    component: () => import('../views/manage/users.vue'),
    beforeEnter: pageCheck
  },
  {
    path: '/manage/pages',
    name: 'managePages',
    component: () => import('../views/manage/pages.vue'),
    beforeEnter: pageCheck
  },
  {
    path: '/manage/sites',
    name: 'manageSites',
    component: () => import('../views/manage/sites.vue'),
    beforeEnter: pageCheck
  },
  {
    path: '/manage/boards',
    name: 'manageBoards',
    component: () => import('../views/manage/boards.vue'),
    beforeEnter: pageCheck
  },
  {
    path: '/block/:msg',
    name: '차단',
    component: () => import('../views/block.vue')
  },
  // {
  //   path: '/test',
  //   name: 'test',
  //   component: () => import('./views/test')
  // },
  {
    path: '/sign',
    name: '로그인',
    component: () => import('../views/sign.vue')
  },
  {
    path: '/register',
    name: '회원가입',
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
