<template>
  <section class="todoapp">
    <TodoHeader @addItem="addItemFn"></TodoHeader>
    <TodoMain :list="list" @deleteItem="deleteItem" @selectAll="selectAllFn"></TodoMain>
    <TodoFooter  :list="list"></TodoFooter>


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
  methods:{
    deleteItem(id){
      const index = this.list.findIndex(item => item.id === id)
      this.list.splice(index, 1);
    },
    selectAllFn(val){
      this.list.forEach(item => (item.isDone = val))
    },
    addItemFn(newTask){
      this.list.push({
        id: !this.list.length ? 1 : this.list.at(-1).id + 1,
        name:newTask,
        isDone: false
      })
      console.log(this.list)
    }
  }
}
</script>

<style></style>
