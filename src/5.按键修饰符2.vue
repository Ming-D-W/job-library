<template>
    <div>
        <img :src="imgUrl" alt="">
        <input type="file" @change="kk">
    </div>
</template>
<script>
export default {
    data() {
        return {
            imgUrl:''
        }
    },
    methods:{
        kk(e){
            console.log(e.target.files[0]);
            // this.imgUrl = URL.createObjectURL(file)
            this.imgUrl=URL.createObjectURL(e.target.files[0])
        }
    }
}
</script>