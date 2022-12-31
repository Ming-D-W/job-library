<template>
    <div>
        <button @click="kk">按钮</button>
    </div>
</template>
<script>
export default{
    methods: {
        kk(e){
            console.log(e);
            console.log('点击了按钮');
        }
    }
}
</script>