<template>
  <div>
    <div :class="classes">洛杉矶人民广场</div>
    <button @click="show = !show">点击切换红色</button>
    <button @click="show = !show">点击切换红色</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      show: false,
      classes: ['red', 'green', 'blue', 'yellow'],
    }
  }
}
</script>
<style scoped>
.red {
  color: red;
}

.green {
  color: green;
}
</style>