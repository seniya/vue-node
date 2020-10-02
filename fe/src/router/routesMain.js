import ContainerLayout from '@/views/container/mainContainerType1.vue'

import store from '@/store'

const pageCheck = async (to, from, next) => {
  try {
    const data = await store.dispatch('auth/PAGE_AUTH', { name: to.path.replace('/', '') })
    // console.log('pageCheck data.success : ', data.success)
    if (!data.success) throw new Error(data.msg)
    next()
  } catch (error) {
    if (!error.response) store.commit('pop', { msg: error.message, color: 'warning' })
    next(false)
  }
}

const children = [
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

export default {
  path: '/',
  component: ContainerLayout,
  children: children
}
