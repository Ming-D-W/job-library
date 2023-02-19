<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/layout' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="box-card">
        <el-alert
          :closable="false"
          show-icon
          title="注意：只允许为第三级分类设置相关参数"
          type="warning"
        />
        <el-row style="margin-top: 15px">
          <span>选择商品分类：</span>
          <el-cascader
            v-model="cat_id"
            :options="catOptions"
            :props="{
            expandTrigger: 'hover',
            label: 'cat_name',
            value: 'cat_id',
            checkStrictly: true,
          }"
            @change="handleCatChange"
          ></el-cascader>
        </el-row>
        <el-tabs v-model="active">
          <el-tab-pane label="动态参数">
            <el-button
              type="primary"
              size="mini"
              @click="dialogFormVisible_add = true"
              :disabled="cat_id.length === 0"
            >添加动态参数</el-button
            >
            <el-table style="margin-top: 15px" border :data="paramsList">
              <el-table-column prop="attr_name" label="参数名称">
              </el-table-column>
              <el-table-column label="操作">
                <template #default="{ row }">
                  <el-row>
                    <el-button
                      type="primary"
                      icon="el-icon-edit"
                      size="mini"
                      @click="handleEdit(row.attr_id)"
                    >编辑</el-button
                    >
                    <el-button
                      type="danger"
                      icon="el-icon-delete"
                      size="mini"
                      @click="handleDelete(row.attr_id)"
                    >删除</el-button
                    >
                  </el-row>
                </template>
              </el-table-column>
            </el-table>
          </el-tab-pane>
          <el-tab-pane label="静态参数">
            <el-button
              type="primary"
              size="mini"
              @click="dialogFormVisible_add = true"
              :disabled="cat_id.length === 0"
            >添加静态参数</el-button
            >
            <el-table style="margin-top: 15px" border :data="attributesList">
              <el-table-column prop="attr_name" label="参数名称">
              </el-table-column>
              <el-table-column label="操作">
                <template #default="{ row }">
                  <el-row>
                    <el-button
                      type="primary"
                      icon="el-icon-edit"
                      size="mini"
                      @click="handleEdit(row.attr_id)"
                    >编辑</el-button
                    >
                    <el-button
                      type="danger"
                      icon="el-icon-delete"
                      size="mini"
                      @click="handleDelete(row.attr_id)"
                    >删除</el-button
                    >
                  </el-row>
                </template>
              </el-table-column>
            </el-table>
          </el-tab-pane>
        </el-tabs>
      </el-card>
      <!--  修改参数dialog  -->
      <el-dialog
        :title="`修改${asyncTitle}`"
        :visible.sync="dialogFormVisible_edit"
      >
        <el-form
          ref="editForm"
          :model="editForm"
          label-width="80px"
          :rules="editRules"
        >
          <el-form-item :label="asyncTitle" required>
            <el-input v-model="editForm.attr_name"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="handleHide('edit')">取 消</el-button>
          <el-button type="primary" @click="handleSubmit">确 定</el-button>
        </div>
      </el-dialog>
      <!--  添加参数dialog  -->
      <el-dialog
        :title="`添加${asyncTitle}`"
        :visible.sync="dialogFormVisible_add"
      >
        <el-form ref="addForm" :model="addForm" label-width="80px">
          <el-form-item :label="asyncTitle" required>
            <el-input v-model="addForm.attr_name"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="handleHide('add')">取 消</el-button>
          <el-button type="primary" @click="handleSubmitAdd">确 定</el-button>
        </div>
      </el-dialog>
  </div>
</template>

<script>
import {
  addParams,
  delParams,
  editParams,
  getGoodsAttributes,
  getGoodsCategories,
  getParamsDetail
} from '@/api/commodity'

export default {
  name: 'params-page',
  data () {
    return {
      catOptions: [],
      cat_id: [],
      active: 0,
      paramsList: [],
      attributesList: [],
      dialogFormVisible_edit: false,
      editForm: {},
      editRules: {
        params: [
          { required: true, trigger: 'blur', message: '请输入动态参数名称' }
        ]
      },
      dialogFormVisible_add: false,
      addForm: {
        attr_name: ''
      }
    }
  },
  methods: {
    async getCatOpthions () {
      const { data } = await getGoodsCategories()
      this.catOptions = data
    },
    async getGoodsArtibutes () {
      const id = this.cat_id[this.cat_id.length - 1]
      const res = await getGoodsAttributes(id, this.asyncSel)
      if (this.asyncSel === 'many') {
        this.paramsList = res.data
      } else if (this.asyncSel === 'only') {
        this.attributesList = res.data
      }
    },
    handleCatChange () {
      this.getGoodsArtibutes()
    },
    async handleEdit (catid) {
      const id = this.cat_id[this.cat_id.length - 1]
      this.dialogFormVisible_edit = true
      const { data } = await getParamsDetail(id, catid)
      this.editForm = data
    },
    async handleDelete (attrid) {
      await this.$msgbox.confirm('此操作将永久删除该参数, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
      const id = this.cat_id[this.cat_id.length - 1]
      await delParams(id, attrid)
      this.$message.success('删除参数成功')
      this.getGoodsArtibutes()
    },
    handleHide (dialog) {
      this.$refs[`${dialog}Form`].resetFields()
      this[`dialogFormVisible_${dialog}`] = false
    },
    async handleSubmit () {
      const id = this.cat_id[this.cat_id.length - 1]
      await editParams(id, this.editForm.attr_id, {
        attr_name: this.editForm.attr_name,
        attr_sel: this.asyncSel
      })
      this.$message.success('修改参数成功')
      this.getGoodsArtibutes()
      this.handleHide('edit')
    },
    async handleSubmitAdd () {
      await this.$refs.addForm.validate()
      const id = this.cat_id[this.cat_id.length - 1]
      await addParams(id, {
        attr_name: this.addForm.attr_name,
        attr_sel: this.asyncSel
      })
      this.$message.success('添加参数成功')
      this.handleHide('add')
      this.getGoodsArtibutes()
    }
  },
  created () {
    this.getCatOpthions()
  },
  watch: {
    active () {
      this.getGoodsArtibutes()
    }
  },
  computed: {
    asyncTitle () {
      return this.active === '0' ? '动态参数' : '静态参数'
    },
    asyncSel () {
      return this.active === '0' ? 'many' : 'only'
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

  .el-table {
    margin-top: 15px;
  }
}
</style>
