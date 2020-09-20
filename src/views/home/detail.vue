<template>
  <div class="bg convert-record">
    <div class="convert-inner">
      <div class="top-bar al">
          <img class="left" @click="()=>{$router.go(-1)}" src="../../../static/back.png" alt="" srcset="">
          <div class="mid">{{title}}</div>
          <!-- <img class="recharge-top-img" src="../../../static/newmore.png" alt=""> -->
      </div>
    </div>

    <div class="parent1">
          <div class="nameandlookdetail">
            <div class="shufengexian"></div>
            <div class="title-name">BI-IEO信息</div>
          </div>

          <div class="msgParent" v-for="item in productdetail.projectInfoList">
            <div class="msgname">{{item.typeName}}</div>
            <div class="msgcontent" v-if="item.itemValue">{{item.itemValue}}</div>
            <div class="msgcontent" v-else>--</div>
            <!-- <div class="msgright">
              <div class="msgcontent1">0.01美元</div>
              <div class="msgdesd">BSS实际兑换比例将会在摇号前公布</div>
            </div> -->
          </div>

        </div>
  </div>
</template>

<script>

export default {
  data() {
	return {
    coinid :"",
    title:"BI-IEO信息",
    productdetail:{}
    }
  
},

methods:{
  initData() {
      let data = {
        productId :this.coinid
      }
      var list = []
      // this.$loading.show()
      // this.loading = true
      this.$ajax.post('/ieo/product/item', data,{
                        headers: {
                          'Content-Type': 'application/json;charset=UTF-8'
                        },
        }).then( res => {
        if (res.data.success == true) {
          console.log(res.data)
          this.productdetail = res.data.body

        }

      }).catch(err=>{
        
      }).then(() => {
        // this.$loading.hide()
        // if (list.length == pagesize) {
        //   this.pageno ++
        //   this.finished = false
        // } else {
        //   this.finished = true
        // }
        // this.loading = false
      })
    }
},
mounted(){
  this.initData();
},
created(){
   this.coinid = this.$route.params.coinid;  
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
.top-bar {
    height: 3rem;
    line-height: 3rem;
    padding: 0 1.5rem;
    // background: #151419;
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
.parent1{
        width:94%;
        height:auto;
        background:rgba(26,27,48,1);
        border-radius:8px;
        margin-left: calc(100% * 0.03);
        margin-top: 1rem;
        padding-left: 1rem;
        padding-top: 1rem;
        padding-bottom: 1rem;

}

      .nameandlookdetail{
        display: flex;
        flex-direction: row;
        margin-bottom: 1rem;
        .shufengexian{
          background: #C10B44;
          width: 0.4rem;
          height: 1.3rem;
          margin-top: 0.5666rem;
          margin-right: 0.4rem;
        }
        .title-name{
          font-size:1.3rem;
          font-family:PingFangSC-Semibold,PingFang SC;
          font-weight:600;
          color:rgba(255,254,255,1);
          line-height:25px;

        }
        .lookdetail{
          width:3.8rem;
          height:1rem;
          font-size:0.6rem;
          font-family:PingFangSC-Semibold,PingFang SC;
          font-weight:600;
          color:rgba(193,12,67,1);
          line-height:17px;
          position: absolute;
          right: 2rem;
          line-height: 2rem;
          text-align: center;
        }

      }

        .msgParent{
        width: 96%;
        display: flex;
        flex-direction: row;
        padding-bottom: 1rem;
        padding-top: 1rem;
        border-bottom:1rem .083333rem solid rgba(255, 255, 255, 0.1);
        .msgname{
          width:19rem;
          height:2rem;
          font-size:0.95rem;
          font-family:PingFangSC-Medium,PingFang SC;
          font-weight:500;
          color:rgba(255,255,255,0.6);
          line-height:22px;
        }

        .msgcontent{
          width:100%;
          height:2rem;
          font-size:0.95rem;
          font-family:PingFangSC-Medium,PingFang SC;
          font-weight:500;
          color:rgba(255,255,255,1);
          line-height:22px;
          text-align: right;
        }
        .msgright{
          width: 80%;
          .msgcontent1{
            width: 100%;
            font-size:1.1rem;
          font-family:PingFangSC-Medium,PingFang SC;
          font-weight:500;
          color:rgba(255,255,255,1);
          line-height:22px;
          text-align: right;
          }
          .msgdesd{
            width: 100%;
            text-align: right;
            font-size:0.6rem;
            font-family:PingFangSC-Regular,PingFang SC;
            font-weight:400;
            color:rgba(255,255,255,0.5);
            line-height:17px;
          }

        }


      }

      .msgParent1{
        width: 96%;
        display: flex;
        flex-direction: row;
        padding-top: 1rem;
        .msgname{
          width:8.5rem;
          height:2rem;
          font-size:1.1rem;
          font-family:PingFangSC-Medium,PingFang SC;
          font-weight:500;
          color:rgba(255,255,255,0.6);
          line-height:22px;
        }

        .msgcontent{
          width:100%;
          height:2rem;
          font-size:1.1rem;
          font-family:PingFangSC-Medium,PingFang SC;
          font-weight:500;
          color:rgba(255,255,255,1);
          line-height:22px;
          text-align: right;
        }


      }

            .msgParent2{
        width: 96%;
        display: flex;
        flex-direction: row;
        padding-top: 1rem;
        border-bottom:1rem .083333rem solid rgba(255, 255, 255, 0.3);
        .msgname{
          width:7rem;
          height:2rem;
          font-size:1.1rem;
          font-family:PingFangSC-Medium,PingFang SC;
          font-weight:500;
          color:rgba(255,255,255,0.6);
          line-height:3rem;
          text-align: center;
        }

                .msgright{
          width: 80%;
          .msgcontent1{
            width: 100%;
            font-size:1.1rem;
          font-family:PingFangSC-Medium,PingFang SC;
          font-weight:500;
          color:rgba(255,255,255,1);
          line-height:22px;
          text-align: right;
          }
          .msgdesd{
            width: 100%;
            text-align: right;
            font-size:0.6rem;
            font-family:PingFangSC-Regular,PingFang SC;
            font-weight:400;
            color:rgba(255,255,255,0.5);
            line-height:17px;
          }

        }


      }



</style>