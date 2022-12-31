<template>
  <div>
    <h3>我的总资产：{{ money }}</h3>
    <p>是不是有钱人：<input type="checkbox" :checked="money<10000? false:true" /></p>
    <p>目前的状态：{{ money >= 10000 ? "有钱人" : "穷光蛋" }}</p>
    消费项目：
    <button @click="wash">洗脚60</button>
    <button @click="eat">吃饭100</button>
    <button @click="date">约会1000</button>
    <button @click="makeMoney">送外卖+100</button>
  </div>
</template>
<script>
export default {
  name: "exercise",
  data() {
    return {
      money: 10000
    };
  },
  methods: {
    wash() {
      this.money -= 60;
    },
    eat() {
      this.money -= 100;
    },
    date(){
        this.money -= 1000;
    },
    makeMoney() {
      this.money += 100;
    },
  },
};
</script>
