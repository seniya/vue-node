import ContainerLayout from '@/views/container/signContainer.vue'

const children = [
  {
    path: '/sign/up',
    name: 'signUp',
    component: () => import('@/views/sign/signPage.vue')
  },
  {
    path: '/sign/in',
    name: 'signIn',
    component: () => import('@/views/sign/signPage.vue')
  },
  {
    path: '/sign/out',
    name: 'signOut',
    component: () => import('@/views/sign/outPage.vue')
  }
]

export default {
  path: '/sign',
  component: ContainerLayout,
  children: children
}
