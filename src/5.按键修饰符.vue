<template>
  <div>
    <h1>展示内容：{{ msg }}</h1>
    <input type="text" @keydown.enter="kk" v-model="msg1">
    <br>
    <input type="text" @keydown.enter="dz" >
  </div>
</template>

<script>

export default {
    data(){
        return{
            msg1:'',
            msg:'',
        }
    },
    methods:{
        kk(){
            this.msg = this.msg1
            this.msg1 = ''

        },
        dz(e){
            this.msg = e.target.value;
            console.log(e,this.msg);
            e.target.value=''
        }
    }

}
</script>

<style>

</style>