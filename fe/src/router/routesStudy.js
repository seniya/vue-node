import ContainerLayout from '@/views/container/mainContainerType1.vue'

const children = [
  {
    path: '/study/chat-simple',
    name: 'chatSimple',
    component: () => import('@/views/study/chatSimple.vue')
  }
]

export default {
  path: '/study',
  component: ContainerLayout,
  children: children
}
