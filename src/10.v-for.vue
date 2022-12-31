<template>
    <div>
        <ul>
            <li v-for="(item, index) in arr" :key='index'>{{ item.title }}</li>
        </ul>
    </div>
</template>

<script>
export default {
    data() {
        return {
            arr: [
                {
                    id: 0,
                    title: '学习'
                }, {
                    id: 1,
                    title: '上班'
                }, {
                    id: 2,
                    title: '吃烧烤'
                }, {
                    id: 3,
                    title: '踢足球'
                }, {
                    id: 4,
                    title: '上网吧'
                }, {
                    id: 5,
                    title: '睡觉'
                },
            ]
        }
    }
}
</script>

<style>

</style>