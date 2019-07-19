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
    },
    {
      path: '/home',
      name: 'home',
      component: () => {
        return import('../ivews/home')
      }
    },
    {
      path: '/buy',
      name: 'buy',
      component: () => {
        return import('../ivews/buy')
      }
    },
    {
      path: '/update',
      name: 'update',
      component: () => {
        return import('../ivews/update')
      }
    },
    {
      path: '/lcc',
      name: 'lcc',
      component: () => {
        return import('../ivews/lcc')
      }
    },
    {
      path: '/code',
      name: 'code',
      component: () => {
        return import('../ivews/code')
      }
    },
    {
      path: '/usdt',
      name: 'usdt',
      component: () => {
        return import('../ivews/usdt')
      }
    },
    {
      path: '/recharge',
      name: 'recharge',
      component: () => {
        return import('../ivews/recharge')
      }
    },
    {
      path: '/outRecharge',
      name: 'outRecharge',
      component: () => {
        return import('../ivews/outRecharge')
      }
    },
    {
      path: '/rechargeOrder',
      name: 'rechargeOrder',
      component: () => {
        return import('../ivews/rechargeOrder')
      }
    },
    {
      path: '/chat',
      name: 'chat',
      component: () => {
        return import('../ivews/chat')
      }
    },
    {
      path: '/transfer',
      name: 'transfer',
      component: () => {
        return import('../ivews/transfer')
      }
    },
    {
      path: '/assets',
      name: 'assets',
      component: () => {
        return import('../ivews/assets')
      }
    },
    {
      path: '/points',
      name: 'points',
      component: () => {
        return import('../ivews/points')
      }
    },
    {
      path: '/exchange',
      name: 'exchange',
      component: () => {
        return import('../ivews/exchange')
      }
    },
    {
      path: '/salary',
      name: 'salary',
      component: () => {
        return import('../ivews/salary')
      }
    },
    {
      path: '/finance',
      name: 'finance',
      component: () => {
        return import('../ivews/finance')
      }
    },
    {
      path: '/news',
      name: 'news',
      component: () => {
        return import('../ivews/news')
      }
    },
    {
      path: '/details',
      name: 'details',
      component: () => {
        return import('../ivews/details')
      }
    },
    {
      path: '/market',
      name: 'market',
      component: () => {
        return import('../ivews/market')
      }
    },
    {
      path: '/my',
      name: 'my',
      component: () => {
        return import('../ivews/my')
      }
    },
    {
      path: '/sign',
      name: 'sign',
      component: () => {
        return import('../ivews/sign')
      }
    },
    {
      path: '/partner',
      name: 'partner',
      component: () => {
        return import('../ivews/partner')
      }
    },
    {
      path: '/report',
      name: 'report',
      component: () => {
        return import('../ivews/report')
      }
    },
    {
      path: '/reportDetails',
      name: 'reportDetails',
      component: () => {
        return import('../ivews/reportDetails')
      }
    },
    {
      path: '/about',
      name: 'about',
      component: () => {
        return import('../ivews/about')
      }
    }
  ]
})
