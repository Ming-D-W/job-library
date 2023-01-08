<template>
  <div class="currency">
    <div class="title" v-if="$slots.title">
      <slot name="title"></slot>
    </div>
    <div class="box">
      <div class="box_0" v-for="item in list" :key="item.id">
        <div class="left">
          <slot name="left" :item="item"></slot>
        </div>
        <div class="right">
          <slot name="right" :item="item"></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  props: {
    list: Array
  },
}
</script>

<style scoped lang="less">
.currency {
  width: 330px;
  background-color: #fff;
  margin: 16px auto;
  border-radius: 10px;
  // 想半天才想起来
  overflow: hidden;

  .title {
    height: 50px;
    line-height: 50px;
    padding: 0 20px;
    color: #fff;
    display: flex;
    justify-content: space-between;
    font-size: 20px;
    font-weight: bold;
    background-image: linear-gradient(to right, #1B79FB, #5DD1FD);
  }

  .box {
    .box_0 {
      display: flex;
      justify-content: space-between;
      align-content: center;
      border-bottom: 1px solid silver;
      padding: 20px 0;
      width: 270px;
      margin: 0 auto;
      overflow: hidden;
      color: #000;
      .right {
        font-weight: bold;
      }
    }

    .box_0:last-child {
      border-bottom: none;
    }
  }
}
</style>