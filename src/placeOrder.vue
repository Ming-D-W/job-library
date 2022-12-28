<template>
  <div class="totalDiv">
    <div>
      视频标题：<input class="kk" type="text" placeholder="输入视频标题" v-model="title" />
    </div>
    <div>
      关联老师：
      <select v-model="teacher">
        <option value="">请选择关联老师</option>
        <option value="0">老王</option>
        <option value="1">张梦龙</option>
        <option value="2">武晓慧</option>
      </select>
    </div>
    <div>
      选择类型分类：
      <select v-model="cate">
        <option value="">选择线上线下</option>
        <option value="0">线下</option>
        <option value="1">线上</option>
        <option value="2">其他</option>
      </select>
    </div>
    <div>
      选择收费模式：
      <input type="radio" v-model="moneyMode" value="0" />付费
      <p v-show="moneyMode == 1 ? false : true">
        输入购买费用：
        <input class="dz" type="text" v-model.number="moneyCount" />
      </p>
      <input type="radio" v-model="moneyMode" value="1" />免费 <br />
    </div>
    <div>
      视频简介：<input class="kk" type="text" placeholder="输入分享描述" v-model="des" />
    </div>
    <div>
      视频详情：
      <br />
      <textarea cols="60" rows="10" v-model="videoDetail"></textarea>
    </div>
    <div>
      开售时间：<br />
      <input type="radio" v-model="timeModel" value="0" />立即开售<br />
      <input type="radio" v-model="timeModel" value="1" />定时开售
      <p v-show="timeModel == 1 ? true : false">
        <input class="kk" type="text" placeholder="开售时间：2019-09-01 00:00:00" v-model="timeCount" />
      </p>
      <br />
      <input type="radio" v-model="timeModel" value="2" />暂不开售
    </div>
    <button @click="submit">保存</button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      title: "", // 视频标题
      teacher: "", // 关联老师 0老王，1张梦龙 2武晓慧
      cate: "", // 0 线下 1线上 2其他
      moneyMode: "1", // 0 付费模式 1 免费模式
      moneyCount: "", //如果是付费模式，需要提交付费金额，如果是免费模式，不需要有这个字段
      des: "", //视频简介
      videoDetail: "", // 视频详情
      timeModel: "", // 0 立即开售 1 定时开售 2暂不开售
      timeCount: "", //如果是定时开售，提交开售时间，如果是其他模式不需要有这个字段 }
    };
  },
  methods: {
    submit() {
      const params = {
        title: this.title,
        teacher: this.teacher,
        cate: this.cate,
        moneyMode: this.moneyMode,
        des: this.des,
        videoDetail: this.videoDetail,
        timeModel: this.timeModel,
      };
      if (this.moneyMode === "0") params.moneyCount = this.moneyCount;
      if (this.timeModel === "1") params.timeCount = this.timeCount;
      console.log(params);
    },
  },
};
</script>

<style scoped>
@import "../css/base.css";
@import "../css/index.css";
</style>
