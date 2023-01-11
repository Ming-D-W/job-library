<template>
  <div>
    <!-- 第二排 推荐 -->
    <div class="recommend " id="id-top">
      <!-- 版心 -->
      <div class="container">
        <div class="recommend-box">
          <ul>
            <li><router-link to="/recommend">推荐</router-link></li>
            <li><router-link to="/Ranking List">排行榜</router-link></li>
            <li><router-link to="/songSheet">歌单<img src="../images/white-r-icon@3x.png" alt="" class="R"></router-link></li>
            <li><router-link to="/anchor-station">主播电台</router-link></li>
            <li><router-link to="/singer">歌手</router-link></li>
            <li><router-link to="/new">新碟上架</router-link></li>
          </ul>
        </div>
      </div>
    </div>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: "find"
}
</script>

<style scoped>

</style>
