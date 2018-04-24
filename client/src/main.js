import 'weui/dist/style/weui.css'
import 'font-awesome/css/font-awesome.min.css'

import Vue from 'vue'
import VueRouter from 'vue-router'
import VueClipboards from 'vue-clipboards'

import Router from '@/router'
import App from '@/App'

Vue.use(VueRouter)
Vue.use(VueClipboards)

const router = new VueRouter({
  routes: Router.routes
})

router.beforeEach((to, from, next) => {
  document.title = to.meta.title || ''
  next()
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
