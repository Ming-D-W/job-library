<template>
  <div>
    <!-- 头部部分 -->
    <header class="header">
      <h1>todos</h1>
      <input class="new-todo" placeholder="请输入任务名称" v-model="newTask" @keyup.enter="addItem" autofocus/>
    </header>

  </div>
</template>

<script>
export default {
  name: "",
  components: {},
  data() {
    return {
      newTask:''
    }
  },
  methods: {
    addItem(){
      this.$emit('addItem',this.newTask)
      this.newTask=''
    }
  },
  computed: {}
}
</script>

<style>

</style>