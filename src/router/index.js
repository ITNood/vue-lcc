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
    }
  ]
})
