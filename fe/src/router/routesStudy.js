import ContainerLayout from '@/views/container/mainContainerType1.vue'

const children = [
  {
    path: '/study/chat-simple',
    name: 'chatSimple',
    component: () => import('@/views/study/chatSimple.vue')
  },
  {
    path: '/study/chat-normal',
    name: 'chatNormal',
    component: () => import('@/views/study/chatApp/chatNormal.vue')
  }
]

export default {
  path: '/study',
  component: ContainerLayout,
  children: children
}
