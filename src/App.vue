<template>
  <section class="todoapp">
    <TodoHeader @addTask="addTask"/>
    <TodoMain :list="list"
              @check="check"
              @deleteItem="deleteItem"
              @selectAll="selectAll"/>
    <TodoFooter :list="list"
                @purgeComplet="purgeComplet"/>
  </section>
</template>

<script>
import TodoMain from "@/components/TodoMain.vue";
import TodoFooter from "@/components/TodoFooter.vue";
import TodoHeader from "@/components/TodoHeader.vue";

export default {
  components: {TodoHeader, TodoMain, TodoFooter},
  data() {
    return {
      list: [
        {id: 1, name: '吃饭', isDone: true},
        {id: 2, name: '睡觉', isDone: false},
        {id: 3, name: '打豆豆', isDone: true}
      ]
    }
  },
  methods: {
    // 选中任务
    check(id) {
      const tick = this.list.find(item => item.id === id)
      tick.isDone = !tick.isDone
    },
    // 删除任务
    deleteItem(id) {
      this.list = this.list.filter(item => item.id !== id)
    },
    // 添加任务
    addTask(newTest) {
      this.list.push({
        id: Date.now(),
        name: newTest,
        isDone: false
      })
    },
    // 全选
    selectAll(val) {
      this.list.forEach(item => item.isDone = val)
    },
    // 清除已完成
    purgeComplet(){
      this.list = this.list.filter(item => !item.isDone)
    }
  }
}
</script>

<style></style>
