<template>
  <div>
    <div>
      <router-link to="/login?name=22">登录</router-link>
      <router-link to="/register">注册</router-link>
      <router-link to="/article">文章</router-link>
      <router-link to="/list">列表</router-link>
      <hr>
    </div>
    <div>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  data() {
    return {}
  },
  methods: {},
  computed: {}
}
</script>

<style>

</style>`
