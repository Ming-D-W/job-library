<template>
  <div>
    <!-- <button v-on:click="fn">点击</button> -->
    <button @click="fn">点击</button>
    <button @click="huaQian(30000)">彩礼花了30000</button>
    <button @click="huaQian(200000)">买车花了200000</button>
    <button @click="huaQian(800000)">买房首付花了800000</button>
    <!-- <button v-on:事件名="事件函数">按钮</button> -->
    <div @click="divClick" style="width:200px;height:200px;border:1px solid #000">
        <button @click="innerClick($event,100)">内层butten</button>
    </div>
  </div>
</template>
<script>
export default {
  name: "on-component",
  methods: {
    fn() {
      console.log("事件触发了");
    },
    huaQian(money) {
      console.log("花了" + money + "元");
    },
    divClick(){
        console.log('点击了div');
    },
    innerClick(e,num){
        e.stopPropagation()
        console.log('点击了内层butten');
        console.log(num);
    }
  },
};
</script>
