import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/utils/element.js'
import '@/style/index.scss'

import TreeTable from 'vue-table-with-tree-grid'
import dayjs from 'dayjs'
Vue.prototype.$dayjs = dayjs
Vue.config.productionTip = false
Vue.component('tree-table', TreeTable)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
