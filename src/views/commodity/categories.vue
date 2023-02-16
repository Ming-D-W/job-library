<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/layout' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="box-card">
      <el-button  @click="showDialog('add')" type="primary">添加分类</el-button>
      <tree-table style="margin: 15px 0" :data="shopList" :columns="columns" :show-row-hover="false" border index-text="#" show-index
                  :expand-type="false" :selection-type="false">
        <template #isOk="{row}">
          <i :class="row.cat_deleted ? 'el-icon-error':'el-icon-success'"></i>
        </template>
        <template #paixu="{row}">
          <el-tag :type="rootLevel[row.cat_level].type">
            {{ rootLevel[row.cat_level].text }}
          </el-tag>
        </template>
        <template #caozuo="{ row }">
          <el-button @click="showDialog('edit', row)" type="primary" icon="el-icon-edit" size="mini">编辑</el-button>
          <el-button @click="del(row.cat_id)" type="danger" icon="el-icon-delete" size="mini">删除</el-button>
        </template>
      </tree-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pagenum"
        :page-sizes="[1, 2, 5,10 ]"
        :page-size="queryInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </el-card>
    <!-- 弹出层 -->
    <el-dialog
      :title="typeTitle"
      :visible.sync="dialogFormVisible"
      @close="handleClose"
    >
      <!-- 添加表单 -->
      <el-form ref="form" :model="form" :rules="rules">
        <el-form-item label="分类名称" label-width="80px" prop="shopName">
          <el-input v-model="form.shopName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item v-if="type === 'add'" label="父级名称" label-width="80px" prop="faName">
          <el-cascader
            style="width: 100%"
            v-model="form.faName"
            :options="addCatOptions"
            :props="{
              expandTrigger: 'hover',
              label: 'cat_name',
              value: 'cat_id',
              checkStrictly: true,
            }"
          ></el-cascader>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addShopMsg">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { createCategories, delCategories, editCategories, getShop } from '@/api/commodity'
import { Message } from 'element-ui'
const mapTitle = {
  add: '提示',
  edit: '编辑'
}
export default {
  name: 'categories-page',
  data () {
    return {
      dialogFormVisible: false,
      type: 'add',
      queryInfo: {
        type: 3,
        // 当前页数
        pagenum: 1,
        // 当前每页显示
        pagesize: 5
      },
      rootLevel: {
        0: {
          type: '',
          text: '一级'
        },
        1: {
          type: 'success',
          text: '二级'
        },
        2: {
          type: 'warning',
          text: '三级'
        }
      },
      total: 0,
      shopList: [],
      columns: [
        {
          label: '分类名称',
          prop: 'cat_name'
        },
        {
          label: '是否有效',
          type: 'template',
          template: 'isOk',
          prop: 'isOk'
        },
        {
          label: '排序',
          type: 'template',
          template: 'paixu',
          prop: 'paixu'
        },
        {
          label: '操作',
          type: 'template',
          template: 'caozuo',
          prop: 'caozuo'
        }
      ],
      form: {
        shopName: '',
        faName: 0,
        cat_pid: []
      },
      addCatOptions: [],
      rules: {
        shopName: [
          { required: true, trigger: 'blur', message: '请输入分类名称' }
        ]
      }
    }
  },
  created () {
    this.getShopList()
  },
  methods: {
    // 删除分类
    del (id) {
      this.$confirm('此操作将永久删除该分类, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          await delCategories(id)
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          this.getShopList()
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    async getShopList () {
      const { data } = await getShop(this.queryInfo)
      console.log(data)
      this.shopList = data.result
      this.total = data.total
    },
    // 监听pagesize改变
    handleSizeChange (newSize) {
      console.log(newSize)
      this.queryInfo.pagesize = newSize
      this.getShopList()
    },
    // 监听页码改变
    handleCurrentChange (newPage) {
      // console.log(newPage)
      this.queryInfo.pagenum = newPage
      this.getShopList()
    },
    handleClose () {
      this.form = {
        shopName: '',
        faName: ''
      }
      if (this.type !== 'allot') {
        this.$refs.form.resetFields()
      }
    },
    // 操作弹层
    async showDialog (type, row) {
      this.type = type
      const { data } = await getShop({
        type: 2
      })
      this.addCatOptions = data
      // console.log(row)
      if (type === 'edit') {
        this.form.shopName = row.cat_name
        // console.log(this.form)
      }
      this.dialogFormVisible = true
    },
    // 添加分类,编辑分类
    async addShopMsg () {
      if (this.type === 'add') {
        await this.$refs.form.validate()

        await createCategories(this.form)
        Message('添加成功')
      }
      if (this.type === 'edit') {
        await this.$refs.form.validate()
        console.log(this.form)
        const { shopName, faName, roleId } = this.form
        await editCategories(roleId, {
          shopName,
          faName
        })
        Message('修改成功')
      }
      this.dialogFormVisible = false
      this.getShopList()
    }
  },
  computed: {
    typeTitle () {
      return mapTitle[this.type]
    }
  }
}
</script>

<style lang="scss" scoped>
.el-breadcrumb {
  margin-bottom: 15px;
}

.el-card {
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.15) !important;
    padding: 15px;

}
</style>
