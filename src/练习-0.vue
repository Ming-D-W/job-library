<template>
  <div>
    <h2>我总共有{{ moneyCount }}</h2>
    <button @click="eat">吃饭花了100</button>
    <button @click="moneyCount -= 50">洗脚花了50</button>
  </div>
</template>
<script>
export default {
  name: "demo-01",
  data() {
    return {
      moneyCount: 20000,
    };
  },
  methods: {
    eat() {
      this.moneyCount -= 100;
    },
  },
};
</script>
