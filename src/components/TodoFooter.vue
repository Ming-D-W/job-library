<template>
  <!-- 底部部分 -->
  <footer class="footer" v-if="this.list.length">
    <span class="todo-count"><strong>{{ remainder }}</strong>剩余</span>
    <ul class="filters">
      <li>
        <a :class="{selected:value==='all'}" href="#/" @click="switchState('all')">全部</a>
      </li>
      <li>
        <a :class="{active:value==='active'}" href="#/active" @click="switchState('active')">进行中</a>
      </li>
      <li>
        <a :class="{completed:value==='completed'}" href="#/completed" @click="switchState('completed')">已完成</a>
      </li>
    </ul>
    <button v-show="clearShowHide" class="clear-completed" @click="purgeComplet">清除已完成</button>
  </footer>
</template>

<script>
export default {
  name: "",
  props: {
    value:{
      type:String
    },
    // type: {
    //   type: String
    // },
    list: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      // type: 'all'
    }
  },
  methods: {
    purgeComplet() {
      this.$emit('purgeComplet')
    },
    switchState(type) {
      this.$emit('input', type)
      // this.type = type
      // console.log(type)
    }
  },
  computed: {
    // 剩余数
    remainder() {
      return this.list.filter(item => item.isDone === false).length
    },
    // 清除已完成显示隐藏
    clearShowHide() {
      return this.list.some(item => item.isDone === true)
    }
  }
}
</script>

<style>

</style>