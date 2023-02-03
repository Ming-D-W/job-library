<template>
  <section class="todoapp">
    <TodoHeader />
    <TodoMain />
    <TodoFooter />
  </section>
</template>

<script>
import TodoMain from "@/components/TodoMain.vue";
import TodoFooter from "@/components/TodoFooter.vue";
import TodoHeader from "@/components/TodoHeader.vue";

export default {
  components: {TodoHeader, TodoMain, TodoFooter},

}
</script>

<style></style>
