<template>
  <div>
    <ul>
        <li v-for="item in arr" :key="item">
            {{ item }}
        </li>
    </ul>
    <button @click="kk">点击按钮</button>
    <button @click="dz">点击按钮</button>
  </div>
</template>

<script>
export default {
    data(){
        return {
            arr:[3,4,5,2,7,1]
        }
    },
    methods:{
        kk(){
            this.arr.unshift(this.arr[5])
            // this.arr.pop()
            this.arr.splice(6,1)
        },
        dz(){
            this.$set(this.arr,1,1000)
        }
    }
}
</script>

<style>

</style>