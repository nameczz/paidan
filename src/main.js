import Vue from 'vue'
import './cube-ui'
import 'common/js/components'
import App from './App.vue'
import router from './router/'
import store from './store/'
import 'common/stylus/index.styl'
import fastclick from 'fastclick'
Vue.config.productionTip = false

fastclick.attach(document.body)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
