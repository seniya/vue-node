import Vue from 'vue'
import VueRouter from 'vue-router'

import routesMain from '@/router/routesMain'
import routesSign from '@/router/routesSign'
import routesStudy from '@/router/routesStudy'

Vue.use(VueRouter)

const routes = [
  routesMain,
  routesSign,
  routesStudy,
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
