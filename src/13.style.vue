<template>
    <div>
        <div :style="[size, color]">洛杉矶人民广场</div>
        <div :style="size">洛杉矶人民广场</div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            size: {
                fontSize: '20px',
                fontWeight: 'bold'
            },
            color: {
                color: 'pink'
            }
        }
    }
}
</script>

<style>

</style>