import Vue from 'vue'
import App from './App.vue'
import './styles/base.css'
import './styles/index.css'
Vue.config.productionTip = false
import store from "@/store";

new Vue({
  store,
  render: (h) => h(App),
}).$mount('#app')
