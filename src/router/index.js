import VueRouter from 'vue-router'
import Vue from 'vue'
import Login from '@/views/login/index.vue'
import Layout from '@/views/layout/index.vue'
import store from '@/store'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    { path: '/login', component: Login },
    {
      path: '/',
      component: Layout

    }
  ]
})
router.beforeEach((to, from, next) => {
  const { token } = store.state.user
  if (to.path !== '/login' && !token) return next('/login')
  next()
})

export default router
