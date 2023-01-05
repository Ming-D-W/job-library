<template>
  <div>
    <!-- 底部部分 -->
    <footer class="footer" v-if="this.list.length">
      <span class="todo-count"><strong>{{ remainder }}</strong>剩余</span>
      <ul class="filters">
        <li>
          <a :class="{selected:type==='all'}" href="#/" @click="filterType('all')">全部</a>
        </li>
        <li>
          <a :class="{selected:type==='active'}" href="#/active" @click="filterType('active')">进行中</a>
        </li>
        <li>
          <a :class="{selected:type==='computed'}" href="#/completed" @click="filterType('completed')">已完成</a>
        </li>
      </ul>
      <button v-show="purgeCompletShow" @click="purgeComplet" class="clear-completed">清除已完成</button>
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
    },
    type: {
      type: String
    }
  },
  components: {},
  data() {
    return {
      // type:'all'
    }
  },
  methods: {
    // 清除已完成
    purgeComplet() {
      this.$emit('purgeComplet')
    },
    // 切换动态class
    filterType(type) {
      // this.type=type
      this.$emit('filterType', type)
    }
  },
  computed: {
    // 剩余数
    remainder() {
      return this.list.filter(item => item.isDone === false).length
    },
    // 清楚已完成按键显示隐藏
    purgeCompletShow() {
      return this.list.some(item => item.isDone === true)
    },
  },

}
</script>

<style>

</style>