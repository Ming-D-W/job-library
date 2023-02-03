<template>
  <!-- 头部部分 -->
  <header class="header">
    <h1>todos</h1>
    <input class="new-todo" placeholder="请输入任务名称"
           v-model.trim="newTest"
           @keyup.enter="addTask"
           autofocus/>
  </header>
</template>

<script>
export default {
  name: "",
  data() {
    return {
      newTest: ''
    }
  },
  methods: {
    addTask() {
      this.$store.commit('addTask', this.newTest)
      this.newTest = ''
    }
  },
}
</script>

<style>

</style>
