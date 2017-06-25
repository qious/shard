import Vue from 'vue'
import VueRouter from 'vue-router'
import Router from './router'
import App from './App'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
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
