<template>
    <div>
        身份识别：
        <input type="radio" v-model="card" value="1">身份证
        <input type="radio" v-model="card" value="2">护照
        <input type="radio" v-model="card" value="3">学生证
        <input type="radio" v-model="card" value="4">驾驶证
        <input type="radio" v-model="card" value="0">其他
        <button @click="submit">点击提交</button>
    </div>
</template>
<script>
export default{
    data(){
        return {
            card: '0'
        }
    },
    methods:{
        submit(){
            console.log({card:this.card});
        }
    }
}
</script>