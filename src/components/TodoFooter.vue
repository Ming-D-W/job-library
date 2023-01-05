<template>
  <!-- 底部部分 -->
  <footer class="footer">
    <span class="todo-count"><strong>{{ remainder }}</strong>剩余</span>
    <ul class="filters">
      <li>
        <a :class="{selected:type==='all'}" href="#/" @click="switchState('all')">全部</a>
      </li>
      <li>
        <a :class="{active:type==='active'}" href="#/active" @click="switchState('active')">进行中</a>
      </li>
      <li>
        <a :class="{completed:type==='completed'}" href="#/completed" @click="switchState('completed')">已完成</a>
      </li>
    </ul>
    <button class="clear-completed" @click="purgeComplet">清除已完成</button>
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
  methods: {
    purgeComplet() {
      this.$emit('purgeComplet')
    },
    switchState(type) {
      this.type = type
      console.log(type)
    }
  },
  computed: {
    // 剩余数
    remainder() {
      return this.list.filter(item => item.isDone === false).length
    }
  }
}
</script>

<style>

</style>