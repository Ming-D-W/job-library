<template>
  <div class="box">
    <Card :list="list_1">
      <template #left="{item}">
        <i :class="item.class" :style="{color:item.color}"></i>
        {{ item.name }}
      </template>
      <template #right="{item}">
        {{ item.count }}
      </template>
    </Card>
    <Card :list="list_2">
      <template #title>
        <h4>本周热搜 TOP5</h4>
      </template>
      <template #left="{item}">
        <div style="background-color:#F5F6FA;
                    height: 22px;
                    padding: 0 10px;
                    border-radius: 5px;">
          #{{ item.name }}
        </div>
      </template>
      <template #right="{item}">
        <i class="icon iconfont icon-huo" style="color: #ff9427;"></i>
        {{ item.count }}
      </template>
    </Card>
    <Card :list="list_3">
      <template #title>
        <div> <h4>可能感兴趣的人</h4></div>
       <div> <i class="icon iconfont icon-gengxin"></i>换一批</div>

      </template>
      <template #left="{item}">
        <div>
          {{ item.name }}
          <i :class="item.sex" :style="{color:item.color}"></i>
          {{ item.age }}
          <span>研究领域：{{ item.field }}</span>
          {{ item.university }}·{{ item.position }}
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
        {id: 1, class: 'icon iconfont icon-zan', color: '#71ADFB', name: '我的赞', count: 1299},
        {id: 2, class: 'icon iconfont icon-star', color: '#EBAE2F', name: '我收藏', count: 399}
      ],
      list_2: [
        {id: 1, name: '区块链', count: 99},
        {id: 2, name: '数据挖掘', count: 99},
        {id: 3, name: '无人机', count: 99},
        {id: 4, name: '生命科学', count: 99},
        {id: 5, name: '传感器', count: 99}
      ],
      list_3: [
        {id: 1, name: '李国盛',sex:'icon iconfont icon-nan',color:'#359FFF', age: '52岁', field: '机电一体化技术', university: '哈尔滨工业大学', position: '教授'},
        {id: 2, name: '陈颖',sex:'icon iconfont icon-nv', color:'#F15350', age: '36岁', field: '人工智能', university: '清华大学', position: '副教授'},
      ]
    }
  }
}
</script>

<style scoped lang="less">
.box {
  border: 2px #F4F6FA solid;
  height: 900px;
  width: 400px;
  background-color: #F4F6FA;
}
</style>