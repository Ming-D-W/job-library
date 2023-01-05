<template>
  <section class="todoapp">
    <TodoHeader @submit="submit"></TodoHeader>
    <TodoMain :list="list" @deleteItem="deleteItem" @selectedItems="selectedItems"></TodoMain>
    <TodoFooter :list="list"></TodoFooter>


  </section>
</template>

<script>
import TodoHeader from "@/components/TodoHeader.vue";
import TodoMain from "@/components/TodoMain.vue";
import TodoFooter from "@/components/TodoFooter.vue";

export default {
  components: {TodoFooter, TodoMain, TodoHeader},
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
    // 删除逻辑
    deleteItem(id) {
      const index = this.list.findIndex(item => item.id === id)
      this.list.splice(index, 1);
    },
    // 勾选任务项
    selectedItems(id) {
      this.list.forEach(item => {
        if (item.id === id) {
          item.isDone = !item.isDone
        }
      })
    },
    // 添加任务项
    submit(newTask) {
      this.list.push({
        id: this.list.length + 1,
        name: newTask,
        isDone: false
      })
    }
  }
}
</script>

<style></style>
