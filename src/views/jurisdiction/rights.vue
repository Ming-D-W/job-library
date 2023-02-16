<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/layout' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>权限列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="box-card">
      <el-table
        border
        :data="rightList"
        stripe
      >
        <el-table-column type="index"></el-table-column>
        <el-table-column prop="authName" label="权限名称" min-width="80"/>
        <el-table-column prop="path" label="路径" min-width="80"/>
        <el-table-column label="权限等级" min-width="80">
          <template #default="{ row }">
            <el-tag :type="rootLevel[row.level].type">
              {{ rootLevel[row.level].text }}
            </el-tag>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

  </div>
</template>

<script>

import { getRights } from '@/api/jurisdiction'

export default {
  name: 'sh-rights',
  data () {
    return {
      rightList: [],
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
      }
    }
  },
  created () {
    this.getRightList()
  },
  methods: {
    async getRightList () {
      const { data } = await getRights()
      // console.log(data)
      this.rightList = data
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
