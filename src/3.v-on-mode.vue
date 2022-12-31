<template>
    <div>
        <h1>{{ msg }}</h1>
        <button @click="dx">点击反转字符串，同时转大写</button>
        <button @click="xx">点击反转字符串，同时转小写</button>
    </div>
</template>
<script>
function fz(str){
    return str.split('').reverse().join('')
}
export default {
    data() {
        return {
            msg: 'Hello World'
        }
    },
    methods: {
        dx() {
            this.msg = this.msg.split('')
            this.msg = this.msg.reverse()
            this.msg = this.msg.join('')
            this.msg = this.msg.toUpperCase()
        },
        xx() {
            this.msg = fz(this.msg).toLowerCase()
        }
    }
}
</script>