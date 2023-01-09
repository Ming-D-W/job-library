<template>
  <div>
    登录页_{{$route.query.name}}
  </div>
</template>

<script>
export default {
  name: "login",
  mounted() {
    console.log(this.$route.query)
  }
}
</script>

<style scoped>

</style>
