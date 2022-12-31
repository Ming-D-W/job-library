<template>
  <div class="box">
    <label for="videoTitle">视频标题</label>
    <input type="text" class="title" v-model="title" name="videoTitle" placeholder="输入音频标题名称（建议填写字数4-15）">
    <br>
    <label for="teacher">关联老师</label>
    <select name="teacher" v-model.number="teacher">
      <option value="-1" hidden>选择关联老师</option>
      <option value="0">老王</option>
      <option value="1">张梦龙</option>
      <option value="2">武晓慧</option>
    </select>
    <br>
    <label for="cate">选择类型分类</label>
    <select name="cate" v-model.number="cate">
      <option value="-1" hidden>选择类型</option>
      <option value="0">线上</option>
      <option value="1">线下</option>
      <option value="2">其他</option>
    </select>
    <br>
    <label for="teacher">关联校区</label>
    <select name="teacher" v-model.number="school">
      <option value="-1" hidden>选择校区（非必选）</option>
      <option value="0">黑马程序员</option>
      <option value="1">传智教育</option>
      <option value="2">博学谷</option>
    </select>
    <br>
    <label>选择收费模式</label>
    <input type="radio" name="charge" v-model.number="moneyMode" value="0">
    <label for="charge">收费</label>
    <span class="charge" v-show="moneyMode===0">请输入购买费用 <input type="text" v-model="moneyCount"></span>
    <input type="radio" name="free" v-model="moneyMode" value="1">
    <label for="free">免费</label>
    <br>
    <label for="introduce">视频简介</label>
    <input type="text" class="title" v-model="des" name="introduce" placeholder="输入分享描述">
    <div class="detail">
      <label>视频详情</label>
      <textarea v-model="videoDetail" cols="30" rows="10"></textarea>
    </div>
    <div class="saleTime">
      <label>开售时间</label>
      <div class="choiseBox">
        <div class="choise">
          <input type="radio" v-model.number="timeModel" value="0">
          <label>立即开售</label>
        </div>
        <div class="choise">
          <input type="radio" v-model.number="timeModel" value="1">
          <label>定时开售</label>
          <input v-show="timeModel===1" v-model="timeCount" class="timeIpt" type="text" placeholder="请输入开售时间">
        </div>
        <div class="choise">
          <input type="radio" v-model.number="timeModel" value="2">
          <label>暂不开售</label>
          <div class="remarks">注：知识付费为虚拟内容服务，买家购买不支持退款，请知晓。</div>
        </div>
      
      </div>
    </div>
    <div class="btn">
      <button @click="handleSubmit">保存</button>
    </div>
  </div>
</template>


<script>
export default {
  name: 'classWork1228',
  components: {},
  data() {
    return {
      title: '',
      teacher: '-1',
      school: '-1',
      moneyMode: '',
      moneyCount: '',
      des: '',
      videoDetail: '',
      timeModel: '',
      cate: '-1',
      timeCount: ''
    };
  },
  methods: {
    handleSubmit() {
      const params = {
        title: this.title, // 视频标题
        teacher: this.teacher, // 关联老师 0老王，1张梦龙  2武晓慧
        cate: this.cate, // 0 线下  1线上  2其他
        school: this.school, // 0 黑马程序员  1 传智教育  2博学谷
        moneyMode: this.moneyMode, // 0 付费模式  1 免费模式
        des: this.des, // 视频简介
        videoDetail: this.videoDetail, // 视频详情
        timeModel: this.timeModel, // 0 立即开售  1 定时开售  3暂不开售
      }
      if (this.moneyMode === 0)
        params.moneyCount = this.moneyCount
      if (this.timeModel === 1)
        params.timeCount = this.timeCount
      console.log(params)
    }
  },
}

</script>

<style scoped lang='scss'>
.box {
  width: 600px;
  margin: 100px auto;
  font-size: 16px;
  @mixin formBox {
    margin-left: 10px;
    margin-bottom: 20px;
    padding-left: 20px;
    height: 40px;
    font-size: 16px;
    border: 1px solid #ebebeb;
  }
  
  .title {
    @include formBox;
    width: 500px;
  }
  
  [type="radio"] {
    margin-bottom: 20px;
  }
  
  select {
    @include formBox;
    width: 500px;
  }
  
  [name="cate"] {
    width: 467px;
  }
  
  .charge {
    display: inline-block;
    margin: 0 20px;
    
    input {
      @include formBox;
      width: 100px;
    }
  }
  
  .detail {
    display: flex;
    
    textarea {
      @include formBox;
      width: 500px;
      height: 60px;
      padding-top: 10px;
    }
  }
  
  .saleTime {
    display: flex;
    
    .choiseBox {
      margin-left: 10px;
      
      .timeIpt {
        @include formBox;
        width: 200px;
      }
      
      .remarks {
        font-size: 12px;
        margin-left: 10px;
        margin-bottom: 5px;
        color: #dddddd;
      }
    }
  }
  
  .btn {
    width: 100%;
    display: flex;
    justify-content: flex-end;
    
    button {
      background-color: #fff;
      width: 100px;
      height: 30px;
      border: 1px solid #cfcfcf;
      border-radius: 5px;
    }
  }
}
</style>