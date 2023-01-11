import Vue from 'vue'
import VueRouter from "vue-router";
import Topbar from "@/components/Topbar.vue";
import MyMusic from "@/components/my-music.vue";
import Find from "@/components/find.vue";
import Friend from "@/components/friend.vue";
import Shopping from "@/components/friend.vue";
import Musician from "@/components/friend.vue";
import Client from "@/components/friend.vue";
import Recommend from "@/components/recommend.vue";
import RankingList from "@/components/Ranking List.vue";
import songSheet from "@/components/songSheet.vue";
import anchorStation from "@/components/anchor-station.vue";
import singer from "@/components/singer.vue";
import New from "@/components/new.vue";

Vue.use(VueRouter)

const router = new VueRouter({
    mode: 'history',
    routes: [
        {
            path: '/', component: Topbar,
            children: [
                {
                    path: '/find',
                    component: Find,
                    children: [
                        {path: '/recommend', component: Recommend},
                        {path: '/Ranking List', component: RankingList},
                        {path: '/songSheet', component: songSheet},
                        {path: '/anchor-station', component: anchorStation},
                        {path: '/singer', component: singer},
                        {path: '/new', component: New},
                    ]
                },
                {path: '/my-music', component: MyMusic},
                {path: '/friend', component: Friend},
                {path: '/shopping', component: Shopping},
                {path: '/musician', component: Musician},
                {path: '/client', component: Client},
            ]
        },
    ]
})

export default router
