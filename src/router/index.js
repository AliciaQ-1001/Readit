import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'home',
    component: Home//组件 Home 在项目启动时就会被加载（同步加载）。适用于：核心页面（如 首页），因为它们是应用的基本部分，避免懒加载带来的延迟。
  },
  {
    path: '/imageGallery',
    name: 'imageGallery',
    component: () => import('../views/ImageGallery.vue')//组件 ImageGallery.vue 只有在访问 /imageGallery 时才会被加载（异步懒加载）。适用于：非核心页面（如 图片库），减少首屏加载时间，提高性能。
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router