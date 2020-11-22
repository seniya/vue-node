import ContainerLayout from '@/views/container/mainContainerType1.vue'

const children = [
  {
    path: '/study/chat-simple',
    name: 'chatSimple',
    component: () => import('@/views/study/chatApp/chatSimple.vue')
  },
  {
    path: '/study/chat-normal',
    name: 'chatNormal',
    component: () => import('@/views/study/chatApp/chatNormal.vue')
  },
  {
    path: '/study/chat-normal-test',
    name: 'chatNormalTest',
    component: () => import('@/views/study/chatApp/chatNormalTest.vue')
  },
  {
    path: '/study/paint-simple',
    name: 'paint',
    component: () => import('@/views/study/paintApp/paintSimple.vue')
  },
  {
    path: '/study/paint-game-ready',
    name: 'paintGameReady',
    component: () => import('@/views/study/paintGameApp/loungePage.vue')
  },
  {
    path: '/study/paint-game-in',
    name: 'paintGameIn',
    component: () => import('@/views/study/paintGameApp/inGame.vue')
  },
  {
    path: '/study/sheep-main',
    name: 'sheepMain',
    component: () => import('@/views/study/sheep/sheepMain.vue')
  },
  {
    path: '/study/break-out',
    name: 'breakOut',
    component: () => import('@/views/study/breakOut/breakOutMain.vue')
  }
]

export default {
  path: '/study',
  component: ContainerLayout,
  children: children
}
