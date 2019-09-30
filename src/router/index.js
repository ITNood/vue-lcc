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
    },
    {
      path: '/personality',
      name: 'personality',
      component: () => {
        return import('../ivews/personality')
      }
    },
    {
      path: '/reply',
      name: 'reply',
      component: () => {
        return import('../ivews/reply')
      }
    },
    {
      path: '/service',
      name: 'service',
      component: () => {
        return import('../ivews/service')
      }
    },
    {
      path: '/shopCenter',
      name: 'shopCenter',
      component: () => {
        return import('../ivews/shopCenter')
      }
    },
    {
      path: '/takeMoney',
      name: 'takeMoney',
      component: () => {
        return import('../ivews/takeMoney')
      }
    },
    {
      path: '/cash',
      name: 'cash',
      component: () => {
        return import('../ivews/cash')
      }
    },
    {
      path: '/cashBill',
      name: 'cashBill',
      component: () => {
        return import('../ivews/cashBill')
      }
    },
    {
      path: '/mobile',
      name: 'mobile',
      component: () => {
        return import('../ivews/mobile')
      }
    },
    {
      path: '/password',
      name: 'password',
      component: () => {
        return import('../ivews/password')
      }
    },
    {
      path: '/language',
      name: 'language',
      component: () => {
        return import('../ivews/language')
      }
    },
    {
      path: '/paySuccess',
      name: 'paySuccess',
      component: () => {
        return import('../ivews/paySuccess')
      }
    },
    {
      path: '/payError',
      name: 'payError',
      component: () => {
        return import('../ivews/payError')
      }
    },
    {
      path: '/success',
      name: 'success',
      component: () => {
        return import('../ivews/success')
      }
    },
    {
      path: '/error',
      name: 'error',
      component: () => {
        return import('../ivews/error')
      }
    },
    {
      path: '/takeWay',
      name: 'takeWay',
      component: () => {
        return import('../ivews/takeWay')
      }
    },
    {
      path: '/addUsdt',
      name: 'addUsdt',
      component: () => {
        return import('../ivews/addUsdt')
      }
    },
    {
      path: '/bank',
      name: 'bank',
      component: () => {
        return import('../ivews/bank')
      }
    },
    {
      path: '/serviceCash',
      name: 'serviceCash',
      component:()=>{
        return import('../ivews/serviceCash')
      }
    },
    {
      path: '/serviceRecharge',
      name: 'serviceRecharge',
      component: () => {
        return import('../ivews/serviceRecharge')
      }
    },
    {
      path: '/bagDetails',
      name: 'bagDetails',
      component: () => {
        return import('../ivews/bagDetails')
      }
    },
    {
      path: '/cashOrder',
      name: 'cashOrder',
      component: () => {
        return import('../ivews/cashOrder')
      }
    },
    {
      path: '/myOrder',
      name: 'myOrder',
      component: () => {
        return import('../ivews/myOrder')
      }
    },
    {
      path: '/orderDetails',
      name: 'orderDetails',
      component: () => {
        return import('../ivews/orderDetails')
      }
    },
    {
      path: '/notice',
      name: 'notice',
      component: () => {
        return import('../ivews/notice')
      }
    },
    {
      path: '/noticeDetails',
      name: 'noticeDetails',
      component: () => {
        return import('../ivews/noticeDetails')
      }
    },
    {
      path: '/wallet',
      name: 'wallet',
      component: () => {
        return import('../ivews/wallet')
      }
    },
    {
      path: '/node',
      name: 'node',
      component: () => {
        return import('../ivews/node')
      }
    },
    {
      path: '/payCode',
      name: 'payCode',
      component: () => {
        return import('../ivews/payCode')
      }
    },
    {
      path: '/paymentSucc',
      name: 'paymentSucc',
      component: ()=>{
        return import('../ivews/paymentSucc')
      }
    },
    {
      path: '/paymentErr',
      name: 'paymentErr',
      component: () => {
        return import('../ivews/paymentErr')
      }
    }
  ]
})
