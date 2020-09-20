<template>
    <div class="progress-box">
        <div class="bg-bar">
            <div class="bg-index" :style="{width:percent+'%'}"></div>
        </div>
        <div class="rate">{{percent}}%</div>
    </div>
</template>

<script>
    export default {
        props: {
            percent: {
                type: Number,
                default: 10
            },
        },
    }
</script>

<style scoped lang='less'>
.progress-box{
    position: relative;
    border-radius: .833333rem;
    padding: .333333rem 0;
    .bg-bar{
        position: absolute;
        width: 83%;
        height: .333333rem;
        background: #303138;
        border-radius: .416667rem;
        .bg-index{
            border-radius: .416667rem;
            position: absolute;
            height: 100%;
            display: inline-block;
            background:linear-gradient(90deg,rgba(164,146,124,1) 0%,rgba(226,194,152,1) 100%);
        }
    }
     .rate{
            position: absolute;
            right: 0;
            top: -0.166667rem;
        }
}
</style>