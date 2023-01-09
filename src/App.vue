<template>
  <div>
    <div v-for="(item, index) in items" :key="index">
      {{ item.num1 }} + {{ item.num2 }} =
      <input v-model.number="item.answer">
      <button  @click="checkAnswer(index)">提交</button>
    </div>
    <hr>
    <span v-for="(item, index) in items" :key="item.id">
      {{ index + 1 }}:
      <span v-if="item.correct === null" style="color: #D2E0E6">未完成</span>
      <span v-else-if="item.correct" style="color: #46DD71">正确</span>
      <span v-else style="color: #F62838">错误</span>
    </span>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: [],
    }
  },
  created() {
    for (let i = 0; i < 6; i++) {
      this.items.push({
        num1: Math.floor(Math.random() * 10),
        num2: Math.floor(Math.random() * 10),
        answer: '',
        correct: null,
        id:Math.random().toString(16).slice(2)
      })
    }
  },
  methods: {
    checkAnswer(index) {
      let item = this.items[index]
      item.correct = item.answer === item.num1 + item.num2
    }
  }
}
</script>
