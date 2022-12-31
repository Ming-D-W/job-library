<template>
<div @click="divClick">
    <a href="http://www.com" @click.prevent.stop="kk">点击跳转</a>
</div>
</template>

<script>
export default {
    methods:{
        kk(){
            console.log('点击了事件');
        },
        divClick(){
            console.log('click盒子');
        }
    }
}
</script>

<style scoped>

</style>