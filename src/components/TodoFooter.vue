<template>
  <!-- 底部部分 -->
  <footer class="footer">
    <span class="todo-count"><strong>0</strong>剩余</span>
    <ul class="filters">
      <li>
        <a class="selected" href="#/">全部</a>
      </li>
      <li>
        <a href="#/active">进行中</a>
      </li>
      <li>
        <a href="#/completed">已完成</a>
      </li>
    </ul>
    <button class="clear-completed">清除已完成</button>
  </footer>
</template>

<script>
export default {
  name: "",
  props: {
    list: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      type: 'all'
    }
  },
  methods: {},
  computed: {
    remainder: {
      return this.list.find(item => item.isDone === false).length

    }
  }
}
</script>

<style>

</style>