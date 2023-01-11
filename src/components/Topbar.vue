<template>
  <div>
    <!-- 第一排  -->
    <div class="topnav">

      <!-- 版心 -->
      <div class="container">
        <!-- 搜索栏 -->
        <div class="topnav-searchbox">
          <!-- 左 -->
          <img src="../images/logo.png" alt="" class="topnav-logo">
          <span class="topnav-wyy "><a href="#">网易云音乐</a></span>
          <div class="topnav-nav">
            <div>
              <router-link to="/find">发现音乐</router-link>
            </div>
            <div>
              <router-link to="/my-music">我的音乐</router-link>
            </div>
            <div>
              <router-link to="/friend">朋友</router-link>
            </div>
            <div>
              <router-link to="/shopping">商城</router-link>
            </div>
            <div>
              <router-link to="/musician">音乐人</router-link>
            </div>
            <div class="topnav-nav-last">
              <router-link to="/client">下载客户端</router-link>
              <div class="topnav-nav-hot">HOT</div>
            </div>
          </div>

          <!-- 右 -->
          <p><a href="#">登录</a></p>
          <a href="#">
            <div class="topnav-nav-right">创作者中心</div>
          </a>
          <div class="topnav-nav-input">
            <i class="iconfont">&#xe6e7</i>
            <input type="text" placeholder="音乐/视频/电台/用户">
          </div>
        </div>
      </div>
    </div>
    <div>
      <router-view/>
    </div>
  </div>
</template>

<script>
export default {
  name: "Topbar"
}
</script>

<style scoped>

</style>
