// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/style/default.less'
import VueI18n from 'vue-i18n'
import VueParticles from 'vue-particles'//粒子背景
Vue.use(VueI18n)
const i18n = new VueI18n({
  locale: 'cn', // 语言标识
  messages: {
    'cn': require('./i18n/lang/cn'),
    'en': require('./i18n/lang/en')
  }
  })

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
