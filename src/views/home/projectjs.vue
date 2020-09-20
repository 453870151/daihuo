<template>
  <div class="bg convert-record">
    <div class="convert-inner">
      <div class="top-bar al">
          <img class="left" @click="()=>{$router.go(-1)}" src="../../../static/back.png" alt="" srcset="">
          <div class="mid">{{title}}</div>
          <!-- <img class="recharge-top-img" src="../../../static/newmore.png" alt=""> -->
      </div>
    </div>
    

    <div class="projectjs">{{content}}</div>
    
  </div>
</template>

<script>

export default {
  data() {
	return {
    coinid :"",
    title:"项目介绍",
    content:""
    }
  
},
created(){
//    this.coinid = this.$route.params.coinid;  
    let query = this.$route.query

    let content = query.content

    this.content = content
  }
}
</script>

<style lang="less" scoped>
  .bg {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    overflow-y: auto;
    background: #24263A;
    // background-size: 100% 100%;
  }
  .projectjs{
    padding: 2rem;

    margin-top: 3rem;
    color:rgba(255,255,255,0.6);
    line-height: 2rem;
            text-align: justify;
        text-justify: distribute;
        padding-right: 2rem;
        
  }
.top-bar {
    height: 3rem;
    line-height: 3rem;
    padding: 0 1.5rem;
    background: #151419;
    line-height: 3rem;
    img.left {
      width: 1rem;
      height: auto;
    }

    .mid {
        font-family:PingFangSC-Semibold,PingFang SC;
        font-weight:600;
        font-size: 1.3rem;
        color: #FFFFFF;
        letter-spacing: 0.06rem;
        text-align: center;
        line-height: 1.3rem;
        width: 100%;
    }
    .recharge-top-img{
        width: 1rem;
        position: absolute;
        right: 1.5rem;
        
    }
    .right{
      color: rgba(216,216,216,0.8);
    }
}

</style>