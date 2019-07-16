// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/style/default.less'
import i18n from './i18n/i18n';
import VueParticles from 'vue-particles'//粒子背景
import './assets/fonts/iconfont.css'

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(VueParticles)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  i18n,
  router,
  components: { App },
  template: '<App/>'
})
