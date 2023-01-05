<template>
  <TodoHeader/>
  <TodoMain/>
  <TodoFooter/>
</template>

<script>
import TodoFooter from "@/components/TodoFooter.vue";
import TodoHeader from "@/components/TodoHeader.vue";
import TodoMain from "@/components/TodoMain.vue";

export default {
  name: "",
  components: {TodoMain, TodoHeader, TodoFooter},
  data() {
    return {}
  },
  methods: {},
  computed: {}
}
</script>

<style>

</style>