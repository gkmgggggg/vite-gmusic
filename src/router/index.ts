import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    meta: {
      title: '主页'
    },
    component: () => import('@/views/index.vue'),
    children: [
      {
        path: '/',
        name: 'home',
        meta: {
          title: '主页'
        },
        component: () => import('@/views/Home/index.vue')
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    meta: {
      title: '登录'
    },
    component: () => import('@/views/Login.vue')
  },
  {
    path: '/demo',
    name: 'Demo',
    meta: {
      title: 'demo页'
    },
    component: () => import('@/views/Demo.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
