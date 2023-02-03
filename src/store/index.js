import Vue from "vue";
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        list: [
            {id: 1, name: '吃饭', isDone: true},
            {id: 2, name: '睡觉', isDone: false},
            {id: 3, name: '打豆豆', isDone: true}
        ],
        type: 'all'
    },
    mutations: {
        deleteItem(state, id) {
            state.list = state.list.filter((item) => item.id !== id)
        },
        check(state, id) {
            const result = state.list.find(item => item.id === id)
            result.isDone = !result.isDone
            console.log(result)
        },
        addTask(state, name) {
            state.list.unshift({
                id: Date.now(),
                name,
                isDone: false
            })
        },
        purgeComplet(state) {
            state.list = state.list.filter((item) => item.isDone === false)
        },
        switchState(state, type) {
            state.type = type
        },
    },
    actions: {},
    getters: {
        fillterList(state) {
            return state.list.filter(item => item.isDone === false).length
        },
        isShowClear(state) {
            return state.list.some((item) => item.isDone)
        },
        //筛选功能
        showList(state) {
            if (state.type === 'completed') { // 显示已完成
                return state.list.filter(item => item.isDone === true)
            } else if (state.type === 'active') { // 显示未完成
                return state.list.filter(item => item.isDone === false)
            } else {
                return state.list // 全部显示
            }
        },
    }
})
