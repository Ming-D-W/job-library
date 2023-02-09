import VueRouter from 'vue-router'
import Vue from 'vue'
import Login from '@/views/login/index.vue'
import Layout from '@/views/layout/index.vue'
import store from '@/store'
import Welcome from '@/views/welcome.vue'
import Users from '@/views/user/users.vue'
import Roles from '@/views/jurisdiction/roles.vue'
import Rights from '@/views/jurisdiction/rights.vue'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    // { path: '/', redirect: '/login' },
    { path: '/login', component: Login },
    {
      path: '/',
      component: Layout,
      redirect: '/Welcome',
      children: [
        { path: '/welcome', component: Welcome },
        { path: '/users', component: Users },
        { path: '/roles', component: Roles },
        { path: '/rights', component: Rights }
      ]
    }
  ]
})
// 挂载路由守卫
router.beforeEach((to, from, next) => {
  const { token } = store.state.user
  if (to.path !== '/login' && !token) return next('/login')
  next()
})

export default router
