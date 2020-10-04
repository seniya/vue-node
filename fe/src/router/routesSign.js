import ContainerLayout from '@/views/container/signContainer.vue'

const children = [
  {
    path: '/signUp',
    name: 'signUp',
    component: () => import('@/views/sign/upPage.vue')
  },
  {
    path: '/signIn',
    name: 'signIn',
    component: () => import('@/views/sign/inPage.vue')
  },
  {
    path: '/signOut',
    name: 'signOut',
    component: () => import('@/views/sign/outPage.vue')
  }
]

export default {
  path: '/',
  component: ContainerLayout,
  children: children
}
