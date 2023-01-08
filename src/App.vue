<template>
  <div class="box">
    <Card :list="list_1">
      <template #left="{item}">
        <img :src="item.url" alt="">
        {{ item.name }}
      </template>
      <template #right="{item}">
        {{ item.count }}
      </template>
    </Card>
    <Card :list="list_2">
      <template #title>
        <h4 class="title">本周热搜 TOP5</h4>
      </template>
      <template #left="{item}">
        #{{ item.name }}
      </template>
      <template #right="{item}">
        <img src="./assets/icon/huo.png" style="width: 20px;margin-bottom: 8px;" alt="">
        {{ item.count }}
      </template>
    </Card>
    <Card :list="list_3">
      <template #title>
        <h4 class="title">可能感兴趣的人</h4>
      </template>
      <template #left="{item}">
        <div style="height: 400px;">
          {{ item.name }}
          {{ item.age }}
          <span>研究领域：{{ item.field }}</span>
          {{ item.university }}
          {{ item.position }}
        </div>
      </template>
      <template #right>
        <button style="width:60px;
        height: 26px;
        color: #FFF;
        background-color:#3780FA;
        border-radius: 13px">
          +关注
        </button>
      </template>
    </Card>

  </div>
</template>

<script>
import Card from "@/components/card.vue";

export default {
  name: "",
  components: {Card},
  data() {
    return {
      list_1: [
        {
          id: 1,
          url:'./assets/icon/zan.png',
          name: '我的赞',
          count: 1299
        },
        {
          id: 2,
          url:'./assets/icon/star.png',
          name: '我收藏',
          count: 399
        }
      ],
      list_2: [
        {
          id: 1,
          name: '区块链',
          count: 99
        },
        {
          id: 2,
          name: '数据挖掘',
          count: 99
        },
        {
          id: 3,
          name: '无人机',
          count: 99
        },
        {
          id: 4,
          name: '生命科学',
          count: 99
        },
        {
          id: 5,
          name: '传感器',
          count: 99
        }
      ],
      list_3: [
        {
          id: 1,
          name: '李国盛',
          age: '52岁',
          field: '机电一体化技术',
          university: '哈尔滨工业大学',
          position: '教授'
        },
        {
          id: 2,
          name: '陈颖',
          age: '36岁',
          field: '人工智能',
          university: '清华大学',
          position: '副教授'
        },
      ]
    }
  },
  methods: {},
  computed: {}
}
</script>

<style scoped lang="less">
.box {
  border: 2px red solid;
  height: 1000px;
  width: 400px;
  background-color: #F4F6FA;
}
</style>