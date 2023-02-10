<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/layout' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card class="box-card">
      <el-row :gutter="20">
        <el-col :span="8">
          <el-input placeholder="请输入内容">
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button class="add" type="primary">添加用户</el-button>
        </el-col>
      </el-row>
      <el-table :data="userList" border Boolean>
        <el-table-column type="index"></el-table-column>
        <el-table-column prop="username" label="姓名"></el-table-column>
        <el-table-column prop="email" label="邮箱"></el-table-column>
        <el-table-column prop="mobile" label="电话"></el-table-column>
        <el-table-column prop="role_name" label="角色"></el-table-column>
        <el-table-column prop="mg_state" label="状态">
          <template slot-scope="scope">
<!--            {{scope.row}}-->
            <el-switch
              v-model="scope.row.mg_state"
              active-color="#5EA2FB"
              inactive-color="#DDDFE6"
            @change="userStateChanged(scope.row)">
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column prop="mg_state" label="操作" width="180px">
          <template>
<!--            {{scope.row}}-->
            <el-button @click="showDialog('edit', userInfo)" type="primary" icon="el-icon-edit" size="mini"></el-button>
            <el-button @click="del(userInfo.id)" type="danger" icon="el-icon-delete" size="mini"></el-button>
            <el-tooltip @click="showDialog('allot', userInfo)" content="分配角色" placement="top" :enterable="false">
            <el-button type="warning" icon="el-icon-star-off" size="mini"></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
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
      <!-- 分配角色 -->
      <div v-if="type === 'allot'">
        <p>当前用户:{{ form.username }}</p>
        <p class="allot-roles">当前用户:{{ form.role_name }}</p>
        <p>
          分配新角色：
          <el-select v-model="rolesValue" placeholder="请选择">
            <el-option
              v-for="item in rolesList"
              :key="item.id"
              :label="item.roleName"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </p>
      </div>
      <!-- 添加表单 -->
      <el-form v-else ref="form" :model="form" :rules="rules">
        <el-form-item label="用户名" label-width="80px" prop="username">
          <el-input
            v-model="form.username"
            autocomplete="off"
            :disabled="type === 'edit'"
          ></el-input>
        </el-form-item>
        <el-form-item
          v-if="type === 'add'"
          label="密码"
          label-width="80px"
          prop="password"
        >
          <el-input v-model="form.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" label-width="80px" prop="email">
          <el-input v-model="form.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="手机" label-width="80px" prop="mobile">
          <el-input v-model="form.mobile" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addUserMsg">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  addUser,
  changeRoles,
  changeUserState,
  delUser,
  distributeUser,
  editUserDetail,
  getUser,
  getUserDetail
} from '@/api/user'
import { Message } from 'element-ui'
const mapTitle = {
  add: '添加用户',
  edit: '编辑用户',
  allot: '分配角色'
}
export default {
  name: 'sh-user',
  data () {
    return {
      queryInfo: {
        query: '',
        // 当前页数
        pagenum: 1,
        // 当前每页显示
        pagesize: 2
      },
      userList: [],
      rolesList: [],
      total: 0,
      dialogFormVisible: false,
      type: 'add',
      rolesValue: '',
      form: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 15, message: '长度需要在6到15之间', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          {
            pattern:
              /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/,
            message: '请输入合法的邮箱',
            trigger: 'blur'
          }
        ],
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          {
            pattern:
              /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/,
            message: '请输入合法的手机号',
            trigger: 'blur'
          }
        ],
        rolesValue: [{ required: true, message: '请至少选择一项' }]
      }
    }
  },
  created () {
    this.getUserList()
  },
  methods: {
    // 修改用户状态
    async userStateChanged (userInfo) {
      // const data = this.$http.put(`users/${userInfo.id}/state/${userInfo.mg_state}`)
      // console.log(data)
      const res = await changeUserState(userInfo.id, userInfo.mg_state)
      // console.log(res)
      userInfo.mg_state = !!res.data.mg_state
      this.getUserList()
    },
    // 监听pagesize改变
    handleSizeChange (newSize) {
      // console.log(newSize)
      this.queryInfo.pagesize = newSize
      this.getUserList()
    },
    // 监听页码改变
    handleCurrentChange (newPage) {
      // console.log(newPage)
      this.queryInfo.pagenum = newPage
      this.getUserList()
    },
    // 获取用户列表
    async getUserList () {
      const data = await getUser(this.queryInfo)
      // console.log(data)
      if (data.meta.status !== 200) {
        return this.$message.err('获取数据失败')
      }
      this.userList = data.data.users
      this.total = data.data.total
      console.log(this.userList)
    },
    // 添加用户,编辑用户和修改角色
    async addUserMsg () {
      if (this.type === 'add') {
        await this.$refs.form.validate()
        await addUser(this.form)
        Message('添加成功')
      }
      if (this.type === 'edit') {
        await this.$refs.form.validate()
        const { username, mobile, email, id } = this.form
        await editUserDetail(id, {
          username,
          mobile,
          email
        })
        Message('修改成功')
      }
      if (this.type === 'allot') {
        // console.log(this.rolesValue)
        await changeRoles(this.form.id, {
          rid: this.rolesValue
        })
      }
      this.dialogFormVisible = false
      this.getUserList()
    },
    // 操作弹层
    async showDialog (type, row) {
      this.type = type
      if (type === 'edit') {
        const res = await getUserDetail(row.id)
        // console.log(res)
        this.form = { ...res.data }
      }
      if (type === 'allot') {
        this.form.username = row.username
        this.form.role_name = row.role_name
        this.form.id = row.id
        const res = await distributeUser(row.id)
        // console.log(res)
        this.rolesList = res.data
      }
      this.dialogFormVisible = true
    },
    // 搜索用户
    searchTable () {
      this.getUserList()
    },
    // 删除用户
    del (id) {
      this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          await delUser(id)
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          this.getUserList()
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    handleClose () {
      this.form = {
        username: '',
        password: '',
        email: '',
        mobile: ''
      }
      if (this.type !== 'allot') {
        this.$refs.form.resetFields()
      }
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
.el-breadcrumb{
  margin-bottom: 15px;
}
.el-card{
  box-shadow: 0 1px 1px rgba(0,0,0,0.15) !important;
  .add{
    background-color: #4D9EFC;
  }
  .el-table{
    margin-top: 15px;
  }
  .el-pagination{
    margin-top: 15px;
  }
}
</style>
