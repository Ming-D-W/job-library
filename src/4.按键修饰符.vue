<template>
    <div>
        <input type="text" @keyup.enter="kk" @keyup.esc="dz" @keyup.delete="del">
    </div>
</template>
<script>
export default {
    methods:{
        kk(){
            console.log('按下了回车');
        },
        dz(){
            console.log('按下了返回键');
        },
        del(){
            console.log('按下了删除');
        }
    }
}
</script>
