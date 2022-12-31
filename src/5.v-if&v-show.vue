<template>
  <div>
    <button @click="kk">点击切换盒子显示或隐藏</button>
    <br>
    <button @click="dz">点击增加年龄</button>
    <button @click="dz1">点击减少年龄</button>
    <!-- <div class="box" v-show="show">待操作盒子</div> --> 
    <!-- <div class="box" v-if="show">待操作盒子</div> -->
    <div class="box">
        <h2>年龄：{{ age }}</h2>
        <h2 v-if="age >60">60岁以上, 广场舞</h2>
        <h2 v-else-if="age >30">30岁以上, 搓麻将</h2>
        <h2 v-else-if="age >20">20岁以上, 蹦迪</h2>
        <h2 v-else>20岁以下, 唱跳rap篮球</h2>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      show: true,
      age:18
    };
  },
  methods: {
    kk() {
      this.show = !this.show;
    },
    dz(){
        this.age += 10
    },
    dz1(){
        this.age -= 10
    }
  },
};
</script>
<style>
.box {
  width: 300px;
  height: 100px;
  border: 1px solid #000;
}
</style>
