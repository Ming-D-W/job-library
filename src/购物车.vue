<template>
  <div class="wrap clearfix">
    <div class="location">当前位置：首页<span>&gt;</span><b class="red">购物车</b></div>
    <table width="100%" class="cartTable" cellspacing="0" cellpadding="10px">
      <!-- 首行 -->
      <tr class="title">
        <td width="50"><input type="checkbox" name="" class="choose_all" v-model="selectAll"></td>
        <td width="100" class=""><span style="margin-left: -10px;">全选</span></td>
        <td width="400">商品信息</td>
        <td width="150">单价（元）</td>
        <td width="150">数量</td>
        <td width="150">金额（元）</td>
        <td width="80">操作</td>
      </tr>

      <!-- 商品具体信息 -->
      <tr class="row" v-for="item in list" :key="item.id">
        <td><input v-model="item.isSelected" type="checkbox" name="" class="choose"></td>
        <td class="tal"><a href="#" class="pic"><img :src="item.img" alt=""></a>
        </td>
        <td class="tal"><a href="#">{{ item.name }}</a></td>
        <td>
          <del class="tdl">{{ item.oldPrice }}</del>
          <br>
          <b class="unit">{{ item.price }}</b>
        </td>
        <td>
          <div class="amount">
            <a href="#" class="Increase" @click="Increase(item.id)">+</a>
            <input type="text" v-model.number="item.count" class="unum">
            <a href="#" class="Reduce" @click="Reduce(item.id)">-</a>
          </div>
        </td>
        <td><b class="u-price">{{ item.price * item.count }}</b></td>
        <td><a href="#" class="btn-del" @click="deleteItem(item.id)">删除</a></td>
      </tr>
      <tr class="count">
        <td colspan="7">
          <div class="jiesuan clearfix">
            <div class="left fl">
              <p><input type="checkbox" name="" class="choose_all" v-model="selectAll"> 全选&nbsp;&nbsp;&nbsp;<a
                  href="#" class="del_check">删除选中商品</a>
              </p>
            </div>
            <div class="right fr clearfix">
              <p>商品总计：￥465.00</p>
              <p>活动优惠：-￥0.00</p>
              <p>已选商品<span class="red t-number"> {{ total }} </span>件 总价(不含运费、税费)：<span
                  class="red t-price">￥{{ totalPrice }}</span></p>
              <!-- <div><a href="#" class="btn pay">结算</a></div> -->
              <a href="#" class="btn pay fr">结算</a>
            </div>
          </div>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: [
        {
          name: '凌美Lamy Safari钢笔/签字笔T52黑色墨水<',
          id: 0,
          oldPrice: 158.00,
          price: 129.00,
          count: 0,
          img: 'https://img-blog.csdnimg.cn/20200520143727974.jpg',
          isSelected: true
        },
        {
          name: '凌美Lamy Safari钢笔/签字笔T52黑色墨水<',
          id: 1,
          oldPrice: 158.00,
          price: 145.00,
          count: 0,
          img: 'https://img-blog.csdnimg.cn/20200520143752215.jpg',
          isSelected: false
        },
        {
          name: '德国进口 凌美(LAMY)签字笔钢笔墨水水笔专用一次性墨水胆笔芯5支一盒T10德国进口',
          id: 2,
          oldPrice: 158.00,
          price: 130.00,
          count: 0,
          img: 'https://img-blog.csdnimg.cn/20200520143746317.jpg',
          isSelected: true
        }
      ]
    }
  },
  methods: {
    Increase(id) {
      // 找到id对应的项
      const correspondingID = this.list.find(item => item.id === id)
      correspondingID.count += 1
    },
    Reduce(id) {
      const correspondingID = this.list.find(item => item.id === id)
      correspondingID.count === 0 ? alert('别按啦') : correspondingID.count -= 1
    },
    deleteItem(id) {
      const index = this.list.findIndex(item => item.id === id)
      // 删除列表中的该项
      this.list.splice(index, 1);
    }
  },
  computed: {
    selectAll: {
      get() {
        return this.list.every(item => item.isSelected === true)
      },
      set(newStatus) {
        this.list.forEach(item => item.isSelected = newStatus)
      }
    },
    totalPrice() {
      return this.list.filter((item) => item.isSelected).reduce((prev, item) => {
        return prev + item.price * item.count
      }, 0)
    },
    total() {
      return this.list.filter((item) => item.isSelected).reduce((prev, item) => {
        return prev + item.count
      }, 0)
    }
  }
}
</script>

<style>
/* 公共样式 */
.clearfix {
  content: '';
  display: block;
  clear: both;
}

.red {
  color: #f30213;
}

.fl {
  float: left;
}

.fr {
  float: right;
}

/* 清除默认样式 */
* {
  margin: 0px;
  padding: 0px;
  font-size: 14px;
}

a {
  text-decoration: none;
  color: #333;
}

input {
  outline: none;
}

.wrap {
  width: 1180px;
  margin: 0 auto;
}

.wrap .location {
  padding: 10px 0;
  border-bottom: 1px solid #ccc;
  margin-bottom: 20px;
}

.cartTable {
  border: 1px solid #ccc;

}

.cartTable tr.title {
  background-color: rgb(241, 243, 244);
  font-weight: bold;
}

.cartTable tbody tr td {
  /* border: 1px solid rgb(245, 245, 245); */
  padding: 10px;
}

/* 原价 */
.cartTable tbody tr td .tdl {
  text-decoration: line-through;
  color: #999;
}

/* 商品数量 */
.cartTable tr .amount .unum {
  width: 70px;
  height: 30px;
  box-sizing: border-box;
  text-align: center;
  font-size: 16px;
  float: left;
}

/* 数量加减按钮 */
.cartTable tr .amount a {
  display: block;
  width: 30px;
  height: 30px;
  line-height: 30px;
  text-align: center;
  font-size: 18px;
  border: 1px solid #ccc;
  box-sizing: border-box;
}

.cartTable tr .amount a.Increase {
  border-right: none;
  float: left;
}

.cartTable tr .amount a.Reduce {
  border-left: none;
  float: left;
}

.cartTable tr.count .jiesuan .right {
  text-align: right;

}

.cartTable tr.count .jiesuan .right p {
  margin: 5px 0;
}

.cartTable tr.count .jiesuan .right .pay {
  display: block;
  width: 160px;
  height: 50px;
  line-height: 50px;
  background-color: #f30213;
  color: #fff;
  font-weight: bold;
  text-align: center;
  font-size: 20px;
}
</style>
