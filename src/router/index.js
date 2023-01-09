import Vue from "vue";
import VueRouter from "vue-router";
import Find from "@/components/find.vue";
import My from "@/components/my.vue";
import Part from "@/components/part.vue";

Vue.use(VueRouter)
const router = new VueRouter({
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