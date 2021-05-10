/* Layout */
// import Layout from '@/views/Layout.vue'
import { RouteRecordRaw } from 'vue-router'

/**
 * 404页面
 */
export const pageError = {
  path: '/404',
  name: '404',
  meta: {
    title: '404-您访问的页面不存在'
  },
  component: () => import('@/views/404.vue')
}

/**
 * 登录注册页面
 */
export const loginRouter = [{
  path: '/login',
  name: 'login',
  meta: {
    title: '登录',
    isLogin: true
  },
  component: () => import('@/views/Login/index.vue')
}]

/**
 * 主路由
 */
export const appRouter = [{
  path: '/',
  name: 'main',
  meta: {
    title: '主页'
  },
  component: () => import('@/views/index.vue'),
  children: [
    // 主页
    {
      path: '/',
      name: 'home',
      meta: {
        title: '主页'
      },
      component: () => import('@/views/Home/index.vue')
    },
    // 排行榜页面
    {
      path: '/rank',
      name: 'rank',
      meta: {
        title: '排行榜'
      },
      component: () => import('@/views/Rank/index.vue')
    },
    // 歌单页面
    {
      path: '/playlist',
      name: 'playlist',
      meta: {
        title: '歌单页面'
      },
      component: () => import('@/views/Playlist/index.vue')
    },
    // 歌单详情页面
    {
      path: '/playlist/detail',
      name: 'playlistDetail',
      meta: {
        title: '歌单详情页面'
      },
      component: () => import('@/views/PlaylistDetail/index.vue')
    },
    // 歌手页面
    {
      path: '/singer',
      name: 'singer',
      meta: {
        title: '歌手页面'
      },
      component: () => import('@/views/Singer/index.vue')
    },
    // 歌手详情页面
    {
      path: '/singer/detail',
      name: 'singerDetail',
      meta: {
        title: '歌手详情页面'
      },
      component: () => import('@/views/SingerDetail/index.vue')
    },
    // 个人主页
    {
      path: '/personal',
      name: 'personal',
      meta: {
        title: '个人主页'
      },
      component: () => import('@/views/Personal/index.vue')
    },
    // 搜索页面
    {
      path: '/search',
      name: 'search',
      meta: {
        title: '搜索结果'
      },
      component: () => import('@/views/Search/index.vue')
    }
  ]
},
{
  path: '/demo',
  name: 'Demo',
  meta: {
    title: 'demo页'
  },
  component: () => import('@/views/Demo.vue')
}]

export const routes: Array<RouteRecordRaw> = [pageError, ...loginRouter, ...appRouter]
