<template>
  <div class="bg convert-record">
    <div class="convert-inner">
      <div class="top-bar al">
          <img class="left" @click="()=>{$router.go(-1)}" src="../../../static/back.png" alt="" srcset="">
          <div class="mid">申购订单</div>
          <!-- <img class="recharge-top-img" src="../../../static/newmore.png" alt=""> -->
          <!-- <div class="right jz" @click="clickshengou">申购订单</div> -->
      </div>
    </div>

    <div class="convert-body" v-if="list.length">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text=""
        color="#ccc"
        offset="20"
        @load="onload"
      >
        <van-cell v-for="(item, index) in list" :key="index">
          <div class="clearfix item" @click="detail(item)">
            <div class="clearfix">
              <!-- 名称数量 -->
              <!-- <div class="item-type">{{item.type}}</div> -->
              <div class="qianhao">签号:{{item.lotteryCode}}</div>
              <div class="item-right">{{item.lotterystatuslabel}}</div>
            </div>

            <div class="parentitem">
              <div class="biaoti">{{item.projectName}}</div>
              <div class="ordertime">订单时间:{{item.formatDateByCreateTime}}</div>
            </div>

            <div class="parentitem">
              <div class="itemitemparent">
                <div class="biaotifu">申购数量: </div>
                <div class="result">{{item.lotteryNumber}}</div>
              </div>
              
              <div class="itemitemparentright">
                <div class="biaotifu">申购价格: </div>
                <div class="result">{{item.lotteryPrice}}</div>
              </div>
            </div>

            <div class="parentitem">
              <div class="itemitemparent">
                <div class="biaotifu">成交金额: </div>
                <div class="result">{{item.payNumber}}</div>
              </div>
              
              <div class="itemitemparentright">
                <div class="biaotifu">扣款状态: </div>
                <div class="result-status">{{item.paystatusLabel}}</div>
              </div>
            </div>

          </div>
        </van-cell>
      </van-list>
    </div>
    <div v-else>
      <div class="no-data">
        <!-- <img src="../../assets/no-bill.png" alt=""> -->
        <p>暂无更多记录~</p>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { List, Cell } from 'vant'
import cookie from 'js-cookie'
// 只有一个确定是dialogs,有确定有取消是dialogs3
import dialogs from '../../components/dialogs3';
Vue.use(List).use(Cell)
export default {
  data() {
    return {
      title: '申购记录',
      loading: false,
      finished: true,
      currentuserid:0,
      bgclass:[
        "item-bg1","item-bg1","item-bg2","item-bg3","item-bg4","item-bg5","item-bg6"
      ],
      titleclass:[
        "item-amount1","item-amount1","item-amount2","item-amount3","item-amount4","item-amount5","item-amount5"
      ],
      list: [],
      pageno: 1,
      pagesize: 10
    }
  },
  mounted() {
    this.init()
  },
  computed: {
    
  },
  created(){
      this.UserID = cookie.get("userID")
      this.currentuserid = cookie.get("userToken") ||"";
      console.log("id>>>",this.currentuserid)
    },
  methods: {
    selectclassbg(index){
      return this.bgclass[index]
    },
    selectclasstitle(index){
      return this.titleclass[index]
    },
    
    init() {
      this.initData()
    },
    initData() {
      // console.log("initdata")
      let pageno = this.pageno
      let pagesize = this.pagesize
      let data = {
        uid : this.UserID,
        pageNumber :pageno,
          pageSize :pagesize
      }
      var list = []
      // this.$loading.show()
      // this.loading = true
      this.$ajax.post('/ieo/product/order/page', data,{
                        headers: {
                          'Content-Type': 'application/json;charset=UTF-8'
                        },
        }).then( res => {
        if (res.data.success == true) {
          if (res.data.body.content && res.data.body.content.length) {
            list = res.data.body.content.map((item) => {
              item.projectName = item.projectName
              item.productStatus = item.productStatus
              item.distributePrice = item.distributePrice
              item.distributeNumber = item.distributeNumber
              item.purchaseStart = item.purchaseStart
             
              if(item.payStatus == '1')
              {
                item.paystatusLabel = "扣款成功"
              }
              else if(item.payStatus == '2')
              {
                item.paystatusLabel = "未扣款"
              }
              else if(item.payStatus == '3')
              {
                item.paystatusLabel = "扣款失败"
              }
              else
              {
                item.paystatusLabel = item.payStatus;
              }

              if(item.lotteryStatus == "1")
              {
                item.lotterystatuslabel = "已中签"
              }
              else if(item.lotteryStatus == "2")
              {
                item.lotterystatuslabel = "待公布"
              }
              else if(item.lotteryStatus == "3")
              {
                item.lotterystatuslabel = "未中签"
              }

              // item.amount = item.exchangecoincount > 0 ? ('+' + item.exchangecoincount) : item.exchangecoincount
              // // string status = 9;//状态,1:待审核 2:已审核 3:用户取消兑换
              var statuslabel = '未知'
              var status = item.productStatus
              if (status == '1') {
                statuslabel = '未开始'
              }
              if (status == '2') {
                statuslabel = '预热'
              }
              if (status == '3') {
                statuslabel = '申购'
              }
              if (status == '4') {
                statuslabel = '摇号'
              }
              if (status == '5') {
                statuslabel = '公布结果'
              }
              if (status == '6') {
                statuslabel = '已结束'
              }
              item.statuslabel = statuslabel

              var typeLabel ='未知'
              if(item.productType == 'LOTTERY')
              {
                typeLabel = '摇号'
              }
              item.typeLabel = typeLabel
              this.list.push(item)
              return item
            })
          }
        }
      }).catch(err=>{
        this.list = []
      }).then(() => {
        // this.$loading.hide()
        if (list.length == pagesize) {
          this.pageno ++
          this.finished = false
        } else {
          this.finished = true
        }
        this.loading = false
      })
    },
    onload() {
      this.initData()
      console.log("获取数据")
    },
    detail(item) {
      // let exchangeid = item.exchangeid
      // let amount = item.amount
      // let statuslabel = item.statuslabel
      // let status = item.status
      // let createdtime = item.createdtime
      // let coinid = item.exchangecoinid
      // this.$router.push({
      //   name: 'convertdetail',
      //   query: {
      //     exchangeid, amount, statuslabel, createdtime, status, coinid
      //   }
      // })
      console.log("coin===>>>"+item.coin)
      this.$router.push('/coindetail/'+item.coin)
    }
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
    background: #151419;
    line-height: 3rem;
    img.left {
      width: 1rem;
      height: auto;
    }

    .mid {
        width: 100%;
        font-family:PingFangSC-Semibold,PingFang SC;
        font-weight:600;
        font-size: 1.3rem;
        color: #FFFFFF;
        letter-spacing: 0.06rem;
        text-align: center;
        line-height: 1.3rem;
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

.top-logo{
  padding: 2rem 1rem 0rem 1rem;
  .title-name{
    padding-left: 1rem;
    line-height: 1.5rem;
    font-size:1.3rem;
    font-family:PingFangSC-Semibold,PingFang SC;
    font-weight:580;
    color:rgba(255,255,255,1);
    line-height: 2rem;
  }
  .title-des{
    padding-left: 1rem;
    padding-bottom: 1rem;
    font-family:PingFangSC-Regular,PingFang SC;
    font-weight:400;
    color:rgba(255,255,255,0.95);
  }

  img{
    width: 100%;
  }
}
  .convert-body {
    padding: 1rem .2rem 1rem calc(100% * 0.026);
    
    //设置item背景样式,距离下面的间距
    .van-cell {
      // background: transparent;
      // color: #fff;
      width:98%;
      height:12rem;
      background:rgba(26,27,48,1);
      border-radius:8px;
      margin-bottom: 0.8rem;
      
    }
    .van-cell__value--alone{
      color: #FBF5FF;
      
    }
    .van-cell:not(:last-child):after {
      //底部分割线
      border-bottom: 0px solid #4536A2;
    }
    .item {
      & > div {
        padding: .2rem 0;
      }
      .item-type {
        float: left;
        width: 40%;
      }
      .clearfix{
        padding-bottom: 0.5rem;
        margin-bottom: 0.6rem;
        border-bottom: 0.04rem solid rgba(255,255,255,0.2);
      }
      .parentitem{
        display: flex;
        flex-direction: row;
        .itemitemparent{
          display: flex;
          flex-direction: row;
        }
        .itemitemparentright{
          width: 8.5rem;
          position: absolute;
          right: 3.9rem;
          display: flex;
          flex-direction: row;
          margin-right: 1rem;
        }
        .biaoti{
          flex: 1;
          width:auto;
          height:2rem;
          font-size:1.3rem;
          font-family:PingFangSC-Semibold,PingFang SC;
          font-weight:500;
          color:rgba(241,242,247,1);
          line-height:22px;
        }
        .biaotifu{
          flex: 1;
          width:auto;
          height:1rem;
          font-size:1rem;
          font-family:PingFangSC-Semibold,PingFang SC;
          font-weight:500;
          color:rgba(241,242,247,0.6);
          line-height:22px;
        }
        .result{
          flex: 1;
          width:8rem;
          height:1.4rem;
          font-size:1rem;
          font-family:PingFangSC-Medium,PingFang SC;
          font-weight:500;
          color:rgba(255,255,255,1);
          line-height:2rem;
          text-align: left;
          position: absolute;
          left: 5rem;
        }
        .result-status{
          width:7rem;
          height:1.4rem;
          font-size:1rem;
          font-family:PingFangSC-Medium,PingFang SC;
          font-weight:500;
          color:rgba(255,255,255,1);
          line-height:2rem;
          text-align: left;
          position: absolute;
          left: 5rem;
        }
        .ordertime{
          flex: 1;
          width:3rem;
          height:1.3rem;
          font-size:11px;
          font-family:PingFangSC-Regular,PingFang SC;
          font-weight:400;
          color:rgba(255,255,255,0.6);
          line-height:2.2rem;
          text-align: left;
        }

      }

      .qianhao{
        width:70%;
        height:2rem;
        font-size:11px;
        font-family:PingFangSC-Regular,PingFang SC;
        font-weight:400;
        color:rgba(255,255,255,1);
        line-height:2rem;
        text-align: left;
        margin-left: 0.5rem;
      }
      .item-right{
        position: absolute;
        top: 0rem;
        right: 1rem;
        height: 2rem;
        line-height: 2.5rem;
        text-align: center;
        font-size: 11px;
      }
      .item-time{
        width:100%;
        height:3rem;
        font-size:0.6rem;
        font-family:PingFangSC-Regular,PingFang SC;
        font-weight:400;
        color:#717082;
        line-height:16px;
        margin-top: 0.6rem;
      }
      .item-amount-parent{
        position: relative;
        width: 100%;
        height:2rem;
      }
      .item-bg1{
        background: #302F44;
        transform: skewX(-10deg);
        width: 18%;
        height: 2rem;
        position: absolute;
        right: 0.3rem;
        z-index: 0;
      }
      .item-bg2{
        background: #193242;
        transform: skewX(-10deg);
        width: 18%;
        height: 2rem;
        position: absolute;
        right: 0.3rem;
        z-index: 0;
      }
      .item-bg3{
        background: #2A1833;
        transform: skewX(-10deg);
        width: 18%;
        height: 2rem;
        position: absolute;
        right: 0.3rem;
        z-index: 0;
      }
      .item-bg4{
        background: #192B3A;
        transform: skewX(-10deg);
        width: 18%;
        height: 2rem;
        position: absolute;
        right: 0.3rem;
        z-index: 0;
      }
      .item-bg5{
        background: #302F44;
        transform: skewX(-10deg);
        width: 18%;
        height: 2rem;
        position: absolute;
        right: 0.3rem;
        z-index: 0;
      }
      .item-bg6{
        background: #302F44;
        transform: skewX(-10deg);
        width: 18%;
        height: 2rem;
        position: absolute;
        right: 0.3rem;
        z-index: 0;
      }
      .item-amount1{
        float: left;
        width: 18%;
        font-size: 0.7rem;
        line-height: 2rem;
        text-align: center;
        position: absolute;
        right: 0.33rem;
        z-index: 1;
        font-family:PingFangSC-Semibold,PingFang SC;
      }
      .item-amount2{
        float: left;
        width: 18%;
        font-size: 0.7rem;
        line-height: 2rem;
        text-align: center;
        position: absolute;
        right: 0.33rem;
        z-index: 1;
        color:#14FFF1;
        font-family:PingFangSC-Semibold,PingFang SC;
      }
      .item-amount3{
        float: left;
        width: 18%;
        font-size: 0.7rem;
        line-height: 2rem;
        text-align: center;
        position: absolute;
        right: 0.33rem;
        z-index: 1;
        color:#A71743;
        font-family:PingFangSC-Semibold,PingFang SC;
      }
      .item-amount4{
        float: left;
        width: 18%;
        font-size: 0.7rem;
        line-height: 2rem;
        text-align: center;
        position: absolute;
        right: 0.33rem;
        z-index: 1;
        color:#32B680;
        font-family:PingFangSC-Semibold,PingFang SC;
      }
      .item-amount5{
        float: left;
        width: 18%;
        font-size: 0.7rem;
        line-height: 2rem;
        text-align: center;
        position: absolute;
        right: 0.33rem;
        z-index: 1;
        color:#7B7C8E;
        font-family:PingFangSC-Semibold,PingFang SC;
      }
      .item-amount6{
        float: left;
        width: 18%;
        font-size: 0.7rem;
        line-height: 2rem;
        text-align: center;
        position: absolute;
        right: 0.33rem;
        z-index: 1;
        color:#7B7C8E;
        font-family:PingFangSC-Semibold,PingFang SC;
      }
      .item-amount, .item-status {
        float: left;
        width: 60%;
        text-align: right;
      }
      
      & > div:nth-child(2) {
        color:rgba(255,255,255,0.6);
      }

      .hori-parent{
        display: flex;
        flex-direction: row;
        width: 100%;
        margin-top: 1rem;
        height: auto;
      }
      .item-detail-title{
        width: 10rem;
        font-size:0.4rem;
        font-family:PingFangSC-Medium,PingFang SC;
        font-weight:500;
        color:rgba(255,255,255,0.6);
        line-height:16px;
        padding-right: 5rem;
      }
      .item-content{
        width: 5rem;
        font-size:0.8rem;
        font-family:PingFangSC-Medium,PingFang SC;
        font-weight:500;
        color:rgba(255,255,255,1);
        line-height:20px;
      }
    }
  }
  .no-data {
    margin-top: calc(0.3 * 100vh);
    img {
      display: block;
      width: 30%;
      margin: 12rem auto 2rem auto;
    }
    p {
      text-align: center;
      font-size: 1.1rem;
      color: #ccc;
    }
  }
</style>