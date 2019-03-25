import Vue from 'vue'
import './cube-ui'
import 'common/js/components'
import App from './App.vue'
import router from './router/'
import store from './store/'
import 'common/stylus/index.styl'
import fastclick from 'fastclick'
import Storage from 'good-storage'
import { Loading } from 'common/js/mixins'

Vue.config.productionTip = false

fastclick.attach(document.body)

router.beforeEach((to, from, next) => {
  const token = Storage.get('token')

  if (to.name === 'login' && token) {
    next(false)
    return
  }

  if (!token && to.name !== 'login') {
    next({ name: 'login' })
    return
  }
  next()
})

Vue.mixin(Loading)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
