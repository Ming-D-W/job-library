import Vue from "vue";
import VueRouter from "vue-router";
import Find from "@/components/find.vue";
import My from "@/components/my.vue";
import Part from "@/components/part.vue";

Vue.use(VueRouter)
const router = new VueRouter({
    linkActiveClass:'模糊匹配',
    linkExactActiveClass:'精准匹配',
    routes: [
        {
            path: '/find',
            component: Find
        },
        {
            path: '/my',
            component: My
        },
        {
            path: '/part',
            component: Part
        }
    ]
})
export default router
