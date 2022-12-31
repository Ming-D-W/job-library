<template>
    <div>
        <!-- <input type="text" v-model.number="count" @input="input" @change="change">
        <button @click="submit">点击提交</button> -->
        <input type="checkbox"  v-model="flag">
        <h1>{{ flag ? '选中': '没有选中'}}</h1>
        <input type="radio" v-model="flag" value="1">男性
        <input type="radio" v-model="flag" value="2">女性
    </div>
</template>
<script>
export default {
    data(){
        return {
            count:'',
            flag:true
        }
    },
    methods:{
        input(){
            console.log('input事件触发');
        },
        change(){
            console.log('change事件触发');
        },
        submit(){
            console.log(this.count);
        }
    }
}
</script>