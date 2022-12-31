<template>
  <div id="app">
    <h3>
      {{ msg }}<br />
      {{ age }}<br />
      {{ obj.name }}
    </h3>
    <h4>{{ obj.info.toUpperCase() }}</h4>
    <h4>
      {{ age >= 18 ? "大于等于18" : "未成年" }}
    </h4>
    <a :href="url">点击跳转百度</a>
  </div>
</template>

<script>
// MVVM框架  M==>model数据模型  V==>view视图层   VM(viewModel)==>视图模型层
// 提供一个数据
export default {
  data() {
    return {
      age: 18,
      msg: "黑马",
      obj: {
        name: "wwm",
        info: "Hello Heima",
      },
      url:"https://www.baidu.com"
    };
  },
};
</script>

<style lang="less"></style>
