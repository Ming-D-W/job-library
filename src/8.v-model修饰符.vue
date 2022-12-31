<template>
    <div>
        <input type="text" v-model.number="count">
        <button @click="getCount">点击</button>
    </div>
</template>

<script>
export default {
    data() {
        return {
            count: 0,
        }
    },
    methods: {
        getCount() {
            console.log(this.count);
            console.log(this.count.split('').length);
        }
    }
}
</script>

<style>

</style>