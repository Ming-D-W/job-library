<template>
  <div @click="divClick">
    <a href="http://www.baidu.com" @click.prevent.stop="fn">点击跳转百度</a>
  </div>
</template>
<script>
export default {
  methods: {
    fn(e) {},
    divClick() {
      console.log("div--click");
    },
  },
};
</script>
