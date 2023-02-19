<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/layout' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="box-card">
      <el-row>
        <el-col style="padding-right: 10px" :span="8">
          <el-input
            placeholder="请输入内容"
            v-model="searchText"
            class="input-with-select">
            <template #append>
              <el-button
                @click="getList('search')"
                icon="el-icon-search"></el-button>
            </template>
          </el-input>
        </el-col>
        <el-col style="padding-left: 10px; padding-right: 10px" :span="4">
          <el-button
            @click="$router.push('/goods/add-goods')"
            class="addBtn"
            type="primary">添加商品</el-button>
        </el-col>
      </el-row>
      <el-table
        v-loading="loading"
        border
        :data="tableData"
        stripe
        style="width: 100%; margin: 15px 0">
        <el-table-column type="index"> </el-table-column>
        <el-table-column prop="goods_name" label="商品名称" min-width="80">
        </el-table-column>
        <el-table-column prop="goods_price" label="商品价格(元)" width="100">
        </el-table-column>
        <el-table-column prop="goods_weight" label="商品重量" width="100">
        </el-table-column>
        <el-table-column prop="add_time" label="创建时间" width="100">
        </el-table-column>
        <el-table-column label="操作" width="180">
          <template #default="{ row }">
<!--            {{row}}-->
            <el-row>
              <el-button
                type="primary"
                icon="el-icon-edit"
                size="mini"
                @click="handleEdit(row.goods_id)">编辑</el-button>
              <el-button
                type="danger"
                icon="el-icon-delete"
                size="mini"
                @click="handleDelete(row.goods_id)">删除</el-button>
            </el-row>
          </template>
        </el-table-column>
      </el-table>
      <!--   底部页码   -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="current"
        :page-sizes="[1, 2, 5, 10]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
import { delGoods, getGoodsList } from '@/api/commodity'

export default {
  name: 'goods-page',
  data () {
    return {
      searchText: '',
      tableData: [],
      current: 1,
      pageSize: 10,
      total: 0,
      loading: false
    }
  },
  methods: {
    async getList (msg) {
      this.loading = true
      try {
        const params = {
          pagenum: this.current,
          pagesize: this.pageSize
        }
        params.query = msg === 'search' ? this.searchText : ''
        const { data } = await getGoodsList(params)
        this.tableData = data.goods
        this.total = data.total
        this.loading = false
      } catch (e) {
        this.loading = false
      }
    },
    handleSizeChange (pageSize) {
      this.pageSize = pageSize
      this.getList()
    },
    handleCurrentChange (currentPage) {
      this.current = currentPage
      this.getList()
    },
    async handleDelete (id) {
      await this.$msgbox.confirm('此操作将永久删除该商品, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
      await delGoods(id)
      this.$message.success('成功删除商品')
      await this.getList()
    }
  },
  created () {
    this.getList()
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
