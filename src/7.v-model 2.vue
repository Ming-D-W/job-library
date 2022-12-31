<template>
  <div>
    <h1>{{ msg }}</h1>
    <input type="text" v-model="msg">
    <input type="checkbox" :value="flag">
  </div>
</template>

<script>
export default {
    data(){
        return {
            msg: 'Hello World',
            flag: true
        }
    }
}
</script>

<style>

</style>