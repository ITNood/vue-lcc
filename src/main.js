// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import axios from 'axios'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/style/default.less'
import i18n from './i18n/i18n';
import './assets/fonts/iconfont.css'
import echarts from 'echarts'

import store from './store';

Vue.prototype.$echarts = echarts

axios.defaults.withCredentials = true
Vue.prototype.$axios = axios

Vue.config.productionTip = false
Vue.use(ElementUI)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  i18n,
  router,
  store:store,
  components: { App },
  template: '<App/>'
})
