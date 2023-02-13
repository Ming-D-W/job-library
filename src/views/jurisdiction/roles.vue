<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/layout' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="box-card">
    <el-button type="primary">添加角色</el-button>
      <el-table
        border
        :data="rolesList"
        stripe
      >
        <el-table-column>></el-table-column>
        <el-table-column type="index"></el-table-column>
        <el-table-column prop="roleName" label="角色名称" min-width="80"/>
        <el-table-column prop="roleDesc" label="角色描述" min-width="80"/>
        <el-table-column prop="level" label="操作" min-width="80">

        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>

import { getRoles } from '@/api/jurisdiction'

export default {
  name: 'sh-roles',
  data () {
    return {
      rolesList: []
    }
  },
  created () {
    this.getRolesList()
  },
  methods: {
    async getRolesList () {
      const { data } = await getRoles()
      console.log(data)
      this.rolesList = data
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
