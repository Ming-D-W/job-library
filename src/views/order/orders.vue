<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/layout' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="box-card">
      <el-col style="padding: 10px" :span="8">
        <el-input
          placeholder="请输入内容"
          v-model="searchText"
          class="input-with-select"
        >
          <template #append>
            <el-button @click="initOrders" icon="el-icon-search"></el-button>
          </template>
        </el-input>
      </el-col>
      <!--  -->
      <el-table :data="ordersList" border style="width: 100%" :stripe="true">
        <el-table-column type="index" width="48"> </el-table-column>
        <el-table-column prop="order_number" label="订单编号">
        </el-table-column>
        <el-table-column
          prop="order_price"
          label="订单价格"
          width="80"
          align="center">
        </el-table-column>
        <el-table-column
          prop="pay_status"
          label="是否付款"
          width="80"
          align="center">
          <template #default="{ row }">
            <span
              class="ispay"
              :class="row.pay_status === '1' ? 'sucessPay' : 'notPay'">{{ row.pay_status === '1' ? '已付款' : '未付款' }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="is_send"
          label="是否发货"
          width="80"
          align="center">
        </el-table-column>
        <el-table-column prop="update_time" label="下单时间">
          <template #default="{ row }">
            <span>
              {{ parseTime(row.update_time ) }}
            </span>
          </template>
        </el-table-column>

        <el-table-column label="操作" width="260px" fixed="right">
          <template #default="{ row }">
            <el-button
              type="primary"
              icon="el-icon-edit"
              size="mini"
              @click="editOrder(row.order_id)"></el-button>
            <el-button
              type="success"
              icon="el-icon-location-outline"
              size="mini"
              @click="showExpressInfo()"></el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pagenum"
        :page-sizes="[5, 10, 15, 20]"
        :page-size="pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </el-card>
    <!-- 编辑订单 -->
    <el-dialog
      title="提示"
      :visible.sync="isShowOrder"
      width="30%"
      @close="handleClose">
      <el-form ref="orderForm">
        <el-form-item label="订单价格">
          <el-input v-model="orderForm.order_price" type="number"></el-input>
        </el-form-item>
        <el-form-item label="是否付款">
          <el-radio v-model="orderForm.pay_status" label="1">已付款</el-radio>
          <el-radio v-model="orderForm.pay_status" label="0">未付款</el-radio>
        </el-form-item>
        <el-form-item label="是否发货">
          <el-radio v-model="orderForm.is_send" label="1">是</el-radio>
          <el-radio v-model="orderForm.is_send" label="0">否</el-radio>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="subOrder">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 物流信息 -->
    <el-dialog title="物流进度" :visible.sync="showExpress" width="30%">
      <el-timeline>
        <el-timeline-item
          v-for="(item, index) in expressList"
          :key="index"
          :timestamp="item.time">
          {{ item.context }}
        </el-timeline-item>
      </el-timeline>
    </el-dialog>
  </div>
</template>

<script>
import { editOrder, getExpressInfo, getOlderDetail, getOlderList } from '@/api/order'
import { Message } from 'element-ui'
import { parseTime } from '@/utils/date'

export default {
  name: 'orders-page',
  data () {
    return {
      pagenum: 1,
      pagesize: 10,
      searchText: '',
      ordersList: [],
      total: 0,
      isShowOrder: false,
      showExpress: false,
      orderForm: {
        order_price: 0,
        pay_status: '1',
        is_send: '1'
      },
      order_id: '',
      expressList: []
    }
  },
  methods: {
    parseTime,
    async initOrders () {
      const res = await getOlderList({
        query: this.searchText,
        pagenum: this.pagenum,
        pagesize: this.pagesize
      })
      console.log(res)
      this.ordersList = res.data.goods
      this.total = res.data.total
    },
    // 每页显示条数变化
    handleSizeChange (val) {
      this.pagesize = val
      this.initOrders()
    },
    // 当前页数发生变化
    handleCurrentChange (val) {
      this.pagenum = val
      this.initOrders()
    },
    // 修改订单数据
    async editOrder (id) {
      this.order_id = id
      const res = await getOlderDetail(id)
      console.log(res)
      this.orderForm.order_price = res.data.order_price
      this.orderForm.pay_status = res.data.pay_status
      this.orderForm.is_send = res.data.is_send === '否' ? '0' : '1'
      this.isShowOrder = true
    },
    // 提交订单数据
    async subOrder () {
      await editOrder(this.order_id, this.orderForm)
      this.initOrders()
      Message.success('修改成功')
      this.isShowOrder = false
    },
    // 查看物流信息
    async showExpressInfo () {
      const res = await getExpressInfo(1106975712662)
      console.log(res)
      this.expressList = res.data
      this.showExpress = true
    },
    handleClose () {
      this.$refs.orderForm.resetFields()
    }
  },
  created () {
    this.initOrders()
  }
}
</script>

<style lang="scss" scoped>
.el-breadcrumb {
  margin-bottom: 15px;
}

.el-card {
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.15) !important;

  .el-table {
    margin-top: 15px;
  }
}
</style>
