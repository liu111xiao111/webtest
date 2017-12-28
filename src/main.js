import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App.vue'

import router from './router'
import Axios from 'axios'
import DateFns from 'date-fns'

Vue.use(ElementUI)
Vue.prototype.$ajax = Axios
Vue.prototype.$dateFns = DateFns

import '@/assets/css/common.css'
import '@/assets/fonts/iconfont.css'

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})