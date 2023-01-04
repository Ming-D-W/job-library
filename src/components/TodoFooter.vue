<template>
  <div>
    <!-- 底部部分 -->
    <footer class="footer">
      <span class="todo-count" ><strong>{{remainder}}</strong>剩余</span>
      <ul class="filters">
        <li>
          <a class="selected" href="#/">全部</a>
        </li>
        <li>
          <a href="#/active" @click="haveInHand">进行中</a>
        </li>
        <li>
          <a href="#/completed">已完成</a>
        </li>
      </ul>
      <button class="clear-completed">清除已完成</button>
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
    }
  },
  components: {},
  data() {
    return {}
  },
  methods: {
    haveInHand(){
      const a= this.list.filter(item=>item.isDone===true)
      console.log(a)
      console.log(this.list)
      this.list=a
    }
  },
  computed: {
    remainder(){
      return this.list.filter(item=>item.isDone===false).length
    },
    // haveInHand(){
    //   const a= this.list.filter(item=>item.isDone===true)
    //   console.log(a)
    // }
  }
}
</script>

<style>

</style>