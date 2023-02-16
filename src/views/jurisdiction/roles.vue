<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/layout' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="box-card">
      <el-button  @click="showDialog('add')" type="primary">添加角色</el-button>
      <el-table border :data="rolesList" stripe>
        <!--        展开列-->
        <el-table-column type="expand">
          <template #default="{ row }">
            <el-row :class="['bb',index===0?'bt':'']" v-for="(item,index) in row.children" :key="item.id">
              <!--              渲染一级权限-->
              <el-col :span="6">
                <el-tag @close="removeId(row.id,item.id)" closable>{{ item.authName }}</el-tag>
                <i class="el-icon-caret-right"></i>
              </el-col>
              <!--              渲染二级权限-->
              <el-col :span="18">
                <el-row :class="[index===0?'bb':'']" v-for="(item2,index) in item.children" :key="item2.id">
                  <el-col :span="6">
                    <el-tag @close="removeId(row.id,item.id)" closable type="success">{{ item2.authName }}</el-tag>
                    <i class="el-icon-caret-right"></i>
                  </el-col>
                  <el-col :span="18">
                        <el-tag @close="removeId(row.id,item.id)" closable v-for="item3 in item2.children" :key="item3.id" type="warning">{{ item3.authName }}</el-tag>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </template>
        </el-table-column>
        <!--        序号-->
        <el-table-column type="index"></el-table-column>
        <el-table-column prop="roleName" label="角色名称" min-width="80"/>
        <el-table-column prop="roleDesc" label="角色描述" min-width="80"/>
        <el-table-column prop="level" label="操作" min-width="180">
          <template #default="{ row }">
            <el-button @click="showDialog('edit', row)" type="primary" icon="el-icon-edit" size="mini">编辑</el-button>
            <el-button @click="del(row.id)" type="danger" icon="el-icon-delete" size="mini">删除</el-button>
            <el-tooltip content="分配权限" placement="top" :enterable="false">
              <el-button @click="showDialog('allot', row)" type="warning" icon="el-icon-menu" size="mini">分配权限
              </el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <!-- 弹出层 -->
    <el-dialog
      :title="typeTitle"
      :visible.sync="dialogFormVisible"
      @close="handleClose"
    >
      <!-- 分配权限属性控件 -->
      <div v-if="type === 'allot'">
        <el-tree :data="rolesList" :props="treeProps" node-key="id"  :default-checked-keys="defKeys" default-expand-all show-checkbox></el-tree>
      </div>
      <!-- 添加表单 -->
      <el-form v-else ref="form" :model="form" :rules="rules">
        <el-form-item label="角色名称" label-width="80px" prop="roleName">
          <el-input v-model="form.roleName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="角色描述" label-width="80px" prop="roleDesc">
          <el-input v-model="form.roleDesc" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addRolesMsg">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>

import {
  addRole,
  delRole,
  delRoleRight,
  editRole,
  getRightsTree,
  getRoleItem,
  getRoles,
  setRoleRights
} from '@/api/jurisdiction'
import { Message } from 'element-ui'
const mapTitle = {
  add: '添加角色',
  edit: '编辑角色',
  allot: '分配权限'
}
export default {
  name: 'sh-roles',
  data () {
    return {
      rolesList: [],
      dialogFormVisible: false,
      type: 'add',
      treeProps: {
        children: 'children',
        label: 'authName'
      },
      defKeys: [], // 默认树
      form: {
        roleName: '',
        roleDesc: ''
      },
      rules: {
        roleName: [
          { required: true, message: '请输入角色名称', trigger: 'blur' },
          { min: 2, max: 20, message: '长度需要在2到20之间', trigger: 'blur' }
        ],
        roleDesc: [
          { required: true, message: '请输入角色描述', trigger: 'blur' },
          { min: 3, max: 20, message: '长度需要在3到20之间', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    typeTitle () {
      return mapTitle[this.type]
    }
  },
  created () {
    this.getRolesList()
  },
  methods: {

    async getRolesList () {
      const { data } = await getRoles()
      // console.log(data)
      this.rolesList = data
    },
    // 根据id删除权限
    async removeId (roleId, perId) {
      const confirmInfo = await this.$confirm('此操作将永久删除该权限, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => err)
      if (confirmInfo !== 'confirm') {
        return this.$message.info('取消了删除')
      }
      try {
        await delRoleRight(roleId, perId)
        this.$message.success('删除权限成功')
      } catch (e) {
        this.$message.error(e)
        console.log(e)
      }
      this.getRolesList()
    },
    // 添加用户,编辑用户和修改角色
    async addRolesMsg () {
      if (this.type === 'add') {
        await this.$refs.form.validate()
        await addRole(this.form)
        Message('添加成功')
      }
      if (this.type === 'edit') {
        await this.$refs.form.validate()
        console.log(this.form)
        const { roleName, roleDesc, roleId } = this.form
        await editRole(roleId, {
          roleName,
          roleDesc
        })
        Message('修改成功')
      }
      if (this.type === 'allot') {
        console.log(this.rolesValue)
        await setRoleRights(this.form.id, {
          rid: this.rolesValue
        })
      }
      this.dialogFormVisible = false
      this.getRolesList()
    },
    // 操作弹层
    async showDialog (type, row) {
      this.type = type
      if (type === 'edit') {
        const res = await getRoleItem(row.id)
        // console.log(res)
        this.form = { ...res.data }
      }
      if (type === 'allot') {
        const res = await getRightsTree(row.id)
        this.rolesList = res.data
        // console.log(res.data)
      }
      // console.log(row)
      // console.log(row.children)
      this.getLeafKeys(row, this.defKeys)
      this.dialogFormVisible = true
    },
    // 递归获取所有三级权限的id
    getLeafKeys (node, arr) {
      if (!node.children) {
        return arr.push(node.id)
      }
      node.children.forEach(item => {
        this.getLeafKeys(item, arr)
      })
    },
    handleClose () {
      this.form = {
        username: '',
        password: ''
      }
      if (this.type !== 'allot') {
        this.$refs.form.resetFields()
      }
    },
    // 删除权限
    del (id) {
      this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          await delRole(id)
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          this.getRolesList()
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
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

    ::v-deep .el-table__expanded-cell {
      padding: 20px 50px !important;

      .bt {
        border-top: 1px solid #eee;
      }
      .bb {
        border-bottom: 1px solid #eee;
      }

      .el-row {
        display: flex;
        align-items: center;

        .el-tag {
          margin: 10px;
        }
      }
    }
  }
}
</style>
