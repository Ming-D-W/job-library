<template>
  <!-- 底部部分 -->
  <footer class="footer" v-if="$store.state.list.length">
    <span class="todo-count"><strong>{{ $store.getters.fillterList }}</strong>剩余</span>
    <ul class="filters">
      <li>
        <a :class="{selected:$store.state.type==='all'}" href="#/" @click="switchState('all')">全部</a>
      </li>
      <li>
        <a :class="{active:$store.state.type==='active'}" href="#/active" @click="switchState('active')">进行中</a>
      </li>
      <li>
        <a :class="{completed:$store.state.type==='completed'}" href="#/completed" @click="switchState('completed')">已完成</a>
      </li>
    </ul>
    <button v-show="$store.getters.isShowClear" class="clear-completed" @click="purgeComplet">清除已完成</button>
  </footer>
</template>

<script>
export default {
  name: "",
  methods: {
    purgeComplet() {
      this.$store.commit('purgeComplet')
    },
    switchState(type) {
      this.$store.commit('switchState', type)
      console.log(this.$store.getters.showList)
      console.log(this.$store.state.type)
    },
  }
}
</script>

<style>

</style>
