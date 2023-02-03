<template>
  <!-- 主体部分 -->
  <section class="main">
    <input id="toggle-all" class="toggle-all" type="checkbox" />
    <label for="toggle-all">Mark all as complete</label>
    <ul class="todo-list" v-for="item in showList" :key="item.id">
      <!-- 当任务已完成，可以给 li 加上 completed 类，会让元素加上删除线 -->
      <!--      <li class="completed">-->
      <!--        <div class="view">-->
      <!--          <input class="toggle" type="checkbox" checked/>-->
      <!--          <label>读万卷书</label>-->
      <!--          <button class="destroy"></button>-->
      <!--        </div>-->
      <!--      </li>-->
      <li :class="{completed:item.isDone}">
        <div class="view">
          <input class="toggle" type="checkbox"
                 :checked="item.isDone"
                 @click="check(item.id)"/>
          <label>{{ item.name }}</label>
          <button class="destroy" @click="deleteItem(item.id)"></button>
        </div>
      </li>
    </ul>
  </section>

</template>

<script>
export default {
  name: "",
  computed: {
    showList() {
      return this.$store.getters.showList
    }
  },
  methods: {
    deleteItem(id) {
      this.$store.commit('destroy', id)
    },
    check(id) {
      this.$store.commit('change', id)
    }
  },
}
</script>

<style>

</style>
