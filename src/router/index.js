import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: () => {
        return import('../ivews/index')
      }
    },
    {
      path: '/lang',
      name: 'lang',
      component: () => {
        return import('../ivews/lang')
      }
    },
    {
      path: '/login',
      name: 'login',
      component: () => {
        return import('../ivews/login')
      }
    },
    {
      path: '/forget',
      name: 'forget',
      component: () => {
        return import('../ivews/forget')
      }
    }
  ]
})
