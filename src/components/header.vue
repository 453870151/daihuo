<template>
  <div class="title-conter">
    <div class="title-left">网红直播带货DEO</div>
    <div class="title-box">
      <router-link :to="{name:'home'}"> 全部商品 </router-link><span></span>
      <router-link :to="{name:'inviteList'}"> 淘宝主播 </router-link><span></span>
      <router-link :to="{name:'rewardRecordList'}"> 抖音主播 </router-link>
    </div>
    <div>
        <el-date-picker
          v-model="date"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期">
        </el-date-picker>
    </div>

  </div>
</template>

<script>
export default {
  data() {
    return {
      date: ''
    };
  },
  methods: {
    
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='less'>
  .title-box span{
    display: inline-block;
    height: 10px;
    border-right: 1px solid #6b6e81;
    margin: 0 10px;
  }
  a{
    color:#fff;
    font-weight: bold;
  }
  a:hover{
    color:#409eff;
  }
  .router-link-exact-active{
    color:#409eff;
  }
  .title-conter{
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 30px;
    border-bottom: 1px solid #6b6e81;
  }
  .title-left{
    color: #0c87ff;
    font-weight: bold;
    font-size: 18px;
  }
</style>
