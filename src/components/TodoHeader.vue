<template>
  <!-- 头部部分 -->
  <header class="header">
    <h1>todos</h1>
    <input class="new-todo" placeholder="请输入任务名称"
           v-model="newTest"
           @keyup.enter="addTask(newTest)"
           autofocus/>
  </header>
</template>

<script>
export default {
  name: "",
  data() {
    return {
      newTest:''
    }
  },
  methods: {
    addTask(newTest){
      // console.log(newTest)
      this.$emit('addTask',newTest)
      this.newTest=''
    }
  },
  computed: {}
}
</script>

<style>

</style>