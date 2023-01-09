import Vue from "vue";
import VueRouter from "vue-router";
import login from "@/components/login.vue";
import register from "@/components/register.vue";
import article from "@/components/article.vue";
import list from "@/components/list.vue";
Vue.use(VueRouter)
const router=new VueRouter({
    routes:[
        {path:'/login',component:login},
        {path:'/register',component:register},
        {path:'/article',component:article},
        {path:'/list',component:list},
    ]
})
export default router
