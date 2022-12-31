<template>
    <div>
        <a :href="url">点击跳转百度</a>
        <input type="text" v-bind:value="tvalue">
        <input type="checkbox" :checked="flag">
        <br>
        <img :src="imgUrl" alt="">
    </div>
</template>
<script>
export default{
    name: 'directive-component',
    data(){
        return {
            flag:true,
            url: 'http://www.baidu.com',
            tvalue:'123',
            imgUrl:'http://mms2.baidu.com/it/u=2628487730,355434237&fm=253&app=138&f=JPEG&fmt=auto&q=75?w=348&h=500'
        }
    }
}
</script>