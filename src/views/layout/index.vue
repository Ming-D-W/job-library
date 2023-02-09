<template>
  <el-container class="home-container">
    <!--    头部-->
    <el-header>
      <div class="layout-logo">
        <img :src=url>
      </div>
      <el-button type="info" @click="handleConfirm">退出</el-button>
    </el-header>
    <el-container>
      <!--      侧边栏-->
      <el-aside :width="isCollapse? '64px':'200px'">
        <div class="collapse-menu" @click="collapseMenu">
          <span>|||</span>
        </div>
        <el-menu
          background-color="#323843"
          text-color="#fff"
          active-text-color="#5D9FF6"
          unique-opened
          :collapse="isCollapse"
          :collapse-transition="false"
          router>
          <el-menu-item index="1">
            <i class="el-icon-s-custom"></i>
            <span slot="title">首页</span>
          </el-menu-item>
          <el-submenu v-for="item in menuList" :key="item.id" :index="item.path">
            <template slot="title">
              <i class="el-icon-user-solid"></i>
              <span>{{ item.authName }}</span>
            </template>
            <el-menu-item v-for="item2 in item.children" :key="item2.id" :index="'/'+item2.path">
              <i class="el-icon-menu"></i>
              <span>{{ item2.authName }}</span>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <!--      右侧主体-->
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>

import { getMenu } from '@/api/user'

export default {
  name: 'layout-page',
  data () {
    return {
      url: 'http://weldon.net.cn/back/img/logo.5b13fac4.png',
      menuList: [],
      isCollapse: false
    }
  },
  created () {
    this.getMenuList()
  },
  methods: {
    handleConfirm () {
      this.$store.commit('user/delToken')
      this.$router.push('/login')
    },
    async getMenuList () {
      const data = await getMenu()
      console.log(data)
      this.menuList = data.data
    },
    collapseMenu () {
      this.isCollapse = !this.isCollapse
    }
  }
}
</script>

<style lang="scss" scoped>
.home-container {
  min-height: 100vh;

  .el-header {
    background-color: #383D40;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .layout-logo {
      height: 50px;

      img {
        height: 100%;
      }
    }
  }

  .el-aside {
    background-color: #323843;

    .collapse-menu {
      background-color: #4C5062;
      color: #FFFFFF;
      font-size: 14px;
      text-align: center;
      line-height: 30px;
      letter-spacing: 0.2em;
      cursor: pointer;
    }

    .el-menu {
      border-right: none;
    }
  }

  .el-main {
    background-color: #E9ECF1;
  }
}
</style>
