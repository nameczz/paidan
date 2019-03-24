import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
const Home = () => import('@/views/Home')
const Events = () => import('@/views/Events')
const Info = () => import('@/views/Info')

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      redirect: { name: 'home' }
    },
    {
      path: '/home',
      name: 'home',
      component: Home,
      meta: { title: '事件地图' }
    },
    {
      path: '/events',
      name: 'events',
      component: Events,
      meta: { title: '事件列表' }
    },
    {
      path: '/info',
      name: 'info',
      component: Info,
      meta: { title: '消息列表' }
    }
  ]
})
