<template>
  <div>
    <!-- 头部部分 -->
    <header class="header">
      <h1>todos</h1>
      <input class="new-todo" v-model="newTask" @keyup.enter="submit" placeholder="请输入任务名称" autofocus/>
    </header>

  </div>
</template>

<script>
export default {
  name: "",
  components: {},
  data() {
    return {
      newTask: ''
    }
  },
  methods: {
    submit() {
  this.$emit('submit',this.newTask)
    }
  },
  computed: {}
}
</script>

<style>

</style>