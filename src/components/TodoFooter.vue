<template>
  <div>
    <!-- 底部部分 -->
    <footer class="footer" v-if="this.list.length">
      <span class="todo-count"><strong>{{ remainder }}</strong>剩余</span>
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
      <button v-show="purgeComplet" class="clear-completed">清除已完成</button>
    </footer>

  </div>
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
  components: {},
  data() {
    return {}
  },
  methods: {},
  computed: {
    // 剩余数
    remainder() {
      return this.list.filter(item => item.isDone === false).length
    },
    // 清楚已完成显示隐藏
    purgeComplet() {
      return this.list.some(item => item.isDone===true)
    }
  }
}
</script>

<style>

</style>