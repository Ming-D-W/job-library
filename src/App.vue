<template>
  <section class="todoapp">
    <TodoHeader @submit="submit"></TodoHeader>
    <TodoMain :list="list" :type="type" @selectAll="selectAll" @deleteItem="deleteItem" @selectedItems="selectedItems"></TodoMain>
    <TodoFooter :list="list" :type="type" @filterType="filterType" @purgeComplet="purgeComplet"></TodoFooter>


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
      type: 'all',
      list: JSON.parse(localStorage.getItem('todo')) || []
    }
  },
  watch: {
    list: {
      handler(newList) {
        localStorage.setItem('todo', JSON.stringify(newList))
      },
      deep: true
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
      if (!newTask) {
        alert('请输入内容')
        return
      }
      this.list.unshift({
        id: Date.now(),
        name: newTask,
        isDone: false
      })
      // console.log(this.list)
    },
    // 清除已完成
    purgeComplet() {
      this.list = this.list.filter(item => item.isDone === false)
    },
    // 切换动态class
    filterType(type) {
      this.type = type
    },
    selectAll(val){
      this.list.forEach(item => item.isDone = val)
    }
  }
}
</script>

<style></style>
