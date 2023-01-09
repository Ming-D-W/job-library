<template>
  <div>
    <p v-for="(nums, index) in pairs" :key="index">
      {{ nums[0] }} + {{ nums[1] }} =
      <input v-model="answers[index]" type="number">
      <button @click="checkAnswer(index)">提交</button>
      <span>{{ results[index] }}</span>
    </p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      nums: [],
      pairs: [],
      answers: [],
      results: [],
    }
  },
  created() {
    this.nums = Array.from({ length: 10 }, () => Math.floor(Math.random() * 10))
    this.pairs = this.nums.reduce((acc, cur, index) => {
      if (index % 2 === 0) {
        acc.push([cur])
      } else {
        acc[acc.length - 1].push(cur)
      }
      return acc
    }, [])
  },
  methods: {
    checkAnswer(index) {
      const correct = this.pairs[index][0] + this.pairs[index][1] === this.answers[index]
      this.results[index] = correct ? '正确' : '错误'
      this.answers[index] = ''
    },
  },
}
</script>
