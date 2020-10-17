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
  }
]

export default {
  path: '/study',
  component: ContainerLayout,
  children: children
}
