<template>
  <div class="mine_bg">

    <div class="contfix">
      <!-- <div class="scrollConter">
          <div class="top-bar al">
              <img class="back" @click="goBack" src="../../../static/back.png" alt srcset>
              <div class="left">资产</div>
          </div>
      </div> -->
      <div class="topContent_Assets">
          <div class="Assets_Item">
              <span class="Assets_Title">总资产</span>
              <span class="Assets_Account">{{balanceByAll}} <span class="ass_wei">BSS</span></span>
          </div>

          <div class="Assets_Item">
              <span class="Assets_Title">合伙人锁仓资产</span>
              <span class="Assets_Account">{{balanceByLock}} <span class="ass_wei">BSS</span></span>
          </div>

          <div class="Assets_Item">
              <span class="Assets_Title">创世众筹锁仓资产</span>
              <span class="Assets_Account">{{chuangshiLock}} <span class="ass_wei">BSS</span></span>
          </div>

          <div class="Assets_Item1">
              <span class="Assets_Title">累计收益</span>
              <span class="Assets_Account">{{incomeByAll}} <span class="ass_wei">BSS</span></span>
          </div>
      </div>  
    </div>

    <div class="selectcontent">
      <div @click="changeBalanceStatue(1,3000)" :class="[isinviteReward == 1 ? 'select':'noselect']">收益
        <!-- <div class="xianshichang" v-if="isinviteReward"></div> -->
      </div>
      <div @click="changeStatue(2)" :class="[isinviteReward == 2 ? 'select':'noselect']">持有
        <!-- <div class="xianshichang" v-if="isinviteReward==false"></div> -->
      </div>
      <div @click="changeBalanceStatue(3,4000)" :class="isinviteReward == '3' ? 'select':'noselect'">交易明细
        <!-- <div class="xianshichang" v-if="isinviteReward==false"></div> -->
      </div>
    </div>

    <div class="contapls">
       <!--收益-->
      <div v-if="isinviteReward == 1" class="convert-shouyi">
        <div v-if="inviteListInfo.length">
          <div class="SCItem" v-for="(item,index) in inviteListInfo">
            <div class="firest">
              <span class="typeTitle">{{item.serviceRemark}}</span>
              <span class="time">{{item.formatDateByCreateTime}}</span>
            </div>
            <div class="sencond">
              <span class="incomeAccount" v-if="item.income > 0">+ {{item.income}} {{item.symbol}}</span>
              <span class="incomeAccount" v-else>- {{item.disburse}} {{item.symbol}}</span>
            </div>
          </div>     
        </div>
        <div v-else>
          <div class="nodata">
            <img src="../../../static/nullobj.png" alt="">
            <div>暂无数据~</div>
          </div>
        </div>
      </div>


      <!--持有-->
      <div v-if="isinviteReward == 2" class="convert-shouyi">
        <div v-if="productList.length">
          <div class="SCItem" v-for="(item,index) in productList">
            <div class="firest">
              <span class="typeTitle">{{item.productTitle}}</span>
            </div>
            <div class="hori-parent">
              <div class="item-content1" style="width:50%">锁仓数量 {{item.balanceLoke}} {{item.subscribeCoin}}</div>
              <div class="item-content">周期 {{item.lockedDate}} {{item.lockedUnit}}</div>
              <div class="item-content" v-if="item.balanceUnwithdraw > 0" @click="openShuHui(item.productId)">
                <span>赎回</span>
              </div>
            </div>
          </div>  
        </div>
        <div v-else>
          <div class="nodata">
            <img src="../../../static/nullobj.png" alt="">
            <div>暂无数据~</div>
          </div>
        </div>
      </div>
      

      <!--交易明细-->
      <div v-if="isinviteReward == 3" class="convert-shouyi">
        <div v-if="inviteListInfo.length">
          <div class="SCItem" v-for="(item,index) in inviteListInfo">
            <div class="firest">
              <span class="typeTitle">{{item.serviceRemark}}</span>
              <span class="time">{{item.formatDateByCreateTime}}</span>
            </div>
            <div class="sencond">
              <span class="incomeAccount" v-if="item.income > 0">+ {{item.income}} {{item.symbol}}</span>
              <span class="incomeAccount" v-else>{{item.disburse}} {{item.symbol}}</span>
            </div>
            <div style="clear:both"></div>
            <div class="sendRemark">{{item.notifyRemark}}</div>
          </div>    
        </div> 
        <div v-else>
          <div class="nodata">
            <img src="../../../static/nullobj.png" alt="">
            <div>暂无数据~</div>
          </div>
        </div>
      </div>
    </div>
   
     <div class="bottombottom">
        <div class="bottombaomingcontent1" @click="openZhuanchu">
          <div class="btnbaomingparent1">
            <div class="btnbg1"></div>
            <div class="btntitle1">转出</div>
          </div>
        </div>

        <div class="bottombaomingcontent1" @click="openRenGou">
        <div class="btnbaomingparent1">
          <div class="btnbghui1"></div>
          <div class="btntitle1">认购</div>
        </div>
        </div>
      </div>

  </div>
</template>

<script>
import Scroll from '../../components/Scroll';
import cookie from 'js-cookie'
import axios from 'axios'
export default {
  components:{
    Scroll
  },
  name: "",
  data() {
    return {
      data: "data",
      UserID:"",
      isshowmore:false,
      contentHeight:'',
      contentStyleObj:{
　　　　　height:''
　　　},
      productList:[],
      balanceByAll:'',
      balanceByLock:'',
      chuangshiLock:'',
      incomeByAll:'',
      heightFlag: true,
      heightStatus:1,
      iosConter:1,
      pageNumber:1,
      pageSize:15,
      loading:false,
      finished:false,
      isinviteReward:1,
      requestType:"3000",
      inviteListInfo:[],
    };
  },
  beforeCreate() {},
  beforeDestroy() {},
  mounted() {
     window.onresize = () => {
        this.clientHeight = document.documentElement.clientHeight;
    }
  },
  destroyed(){
    window.removeEventListener('resize', this.getConterHeight)
    window.removeEventListener('resize', this.getHeight)
  },
  activated(){},
  watch: {
 
  },
  created(){
    this.UserID = cookie.get("userID")
    window.addEventListener('resize', this.getConterHeight);
    window.addEventListener('resize', this.getHeight);
    this.getConterHeight()
    this.getHeight()

    this.getTotal();  //资产数据
    this.getProductList();  //持有数据
    this.getBalance();
  },
  methods: {
    changeBalanceStatue(index,type){
      this.isinviteReward = index
      this.inviteListInfo = []
      this.requestType = type
      this.pageNumber = 1
      this.getBalance()
    },
    changeStatue(index){
      this.isinviteReward = index
    },
    openShuHui(productId){
      this.$router.push("/suocangandRedeem/" + productId)
    },
    openRenGou(){
      this.$router.push("/suocangandjieList")
    },
    openZhuanchu(){
      this.$router.push("/zhuanchuRedeem")
    },

    onload() {
      //this.initData()
    },
    getBalance(){
      //记录请求Type： 3000收益   4000交易明细
      let data = {
        uid:this.UserID,
        balanceType:this.requestType,
        pageNumber: this.pageNumber,
        pageSize: this.pageSize
      }
      this.$ajax.post('/partner/account/balance/page', data,{
        headers: {
          'Content-Type': 'application/json;charset=UTF-8'
        },
      }).then( res => {
        if (res.data.success == true && res.data.body.number <= res.data.body.totalPages) {
          res.data.body.content.map((item) => {
            this.inviteListInfo.push(item);
          })
        }
      }).catch(err=>{

      }).then(() => {

      })
    },
    getProductList(){
      this.loading = true;
      this.finished = false;
      let data = {
        uid:this.UserID,
        pageNumber: this.pageNumber,
        pageSize: this.pageSize
      }
      this.$ajax.post('/partner/product/order/page', data,{
        headers: {
          'Content-Type': 'application/json;charset=UTF-8'
        },
      }).then( res => {
        if(res.data.body.number >= res.data.body.totalPages)
        {
            this.loading = false;
            this.finished = true;
        }
        else
        {
          this.finished = false;
        }
      if (res.data.success == true && res.data.body.number <= res.data.body.totalPages) {
        res.data.body.content.map((item) => {
          this.productList.push(item);
          
        })
      }

      }).catch(err=>{

      }).then(() => {

      })
    },
    getTotal(){
      let data = {
        uid:this.UserID,
      }
      this.$ajax.post('/partner/account/balance', data,{
        headers: {
          'Content-Type': 'application/json;charset=UTF-8'
        },
      }).then( res => {
        this.balanceByAll = res.data.body.balanceByAll
        this.balanceByLock = res.data.body.balanceByLock
        this.chuangshiLock = res.data.body.balanceTeamByLock
        this.incomeByAll = res.data.body.incomeByAll
      }).catch(err=>{

      }).then(() => {

      })
    },
    goBack() {
      this.$router.go(-1);
    },
    getConterHeight(){
      if(this.heightFlag){
        this.height = document.documentElement.clientHeight;
        this.heightFlag = false
      }
    },
    getHeight(){
        this.contentStyleObj.height = window.innerHeight;
        if(this.height >= this.contentStyleObj.height){
            this.heightStatus = 1
        }else{
            this.heightStatus = 2
        }
    },
    changeshowtip(isshow){
      this.isshowtip = isshow
    },

    loadMore(){
      this.getProductList();
      this.$refs.scroll.finishPullUp()
    }
  }
};
</script>

<style lang='less' scoped>
.contfix{
    position: fixed;
    top: 0px;
    width: 100%;
    z-index: 9999;
    background: #252638;
    padding-bottom: 10px;
}
.mine_bg {
  position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    overflow-y: auto;
    background: #24263A;
  .top-bar {
      height: 4.166667rem;
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      z-index: 100;
      padding-left: 1.75rem;
      padding-right: 1.25rem;
      box-sizing: border-box;
      .back {
        width: 1.2rem;
        height: auto;
      }
      .left {
        font-size: 18px;
        font-family: PingFangSC-Semibold;
        font-weight: 500;
        color: rgba(255, 255, 255, 1);
        width: 100%;
        height: auto;
        text-align: center;
        margin-right: 1.2rem;
      }
      .right {
        img {
          width: 1.2rem;
          height: auto;
        }
      }
    }
} 

.convert-body {
    //设置item背景样式,距离下面的间距
    .van-cell {
      // background: transparent;
      // color: #fff;
      width:90%;
      height:auto;
      background:#1a1b30;
      margin-left: calc(1%);
      margin-bottom: 10px;
      border-bottom: 1px solid #252638;
      margin: 0 1.33rem;
    }
    .van-cell__value--alone{
      color: #FBF5FF;
      
    }
    .van-cell:not(:last-child):after {
      //底部分割线
      border-bottom: 0px solid #4536A2;
    }
    .item {
        background: #1a1b30;
        border-radius: 8px;
      .item-type {
        float: left;
        width: 70%;
        color: white;
        font-size: 14px;
        opacity: .8;
      }
      .item-time{
        width:100%;
        height:1.5rem;
        font-size:0.8rem;
        font-family:PingFangSC-Regular,PingFang SC;
        font-weight:700;
        color:#717082;
        margin-top: 0.8rem;
        line-height: 2rem;
        padding-left: 1rem;
        border-top: 0.12rem solid #22222C;
      }
      .timeend{
        width: 5rme;
        height: 5rem;
        position: absolute;
        right: 2rem;
        bottom: 1rem;
      }
        
      .item-amount-parent{
        position: relative;
        width: 100%;
        height:1rem;
        text-align: right;
        padding-top: 0.6rem;
        font-size: 1.1rem;
      }
      .item-bg{
        background: #302F44;
        transform: skewX(-10deg);
        width: 18%;
        height: 2rem;
        position: absolute;
        right: 0.3rem;
        z-index: 0;
      }

      .item-amount{
        float: left;
        width: 18%;
        font-size:1rem;
        line-height: 2.1rem;
        text-align: center;
        position: absolute;
        right: 0.33rem;
        z-index: 1;
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
        height: auto;
        padding-top: 10px;
      }
      .item-detail-title{
        width: 9rem;
        font-size:1.2rem;
        font-family:PingFangSC-Medium,PingFang SC;
        font-weight:500;
        color:rgba(255,255,255,0.6);
        line-height:16px;
        padding-right: 5rem;
        font-size: 0.8rem;
        padding-top: 0.2rem;
      }
      .item-detail-title1{
        width: 9rem;
        font-size:1.2rem;
        font-family:PingFangSC-Medium,PingFang SC;
        font-weight:500;
        color:#fff;
        line-height:16px;
        padding-right: 5rem;
      }
      .item-content{
        width: 25%;
        font-size:12px;
        font-family:PingFangSC-Medium,PingFang SC;
        font-weight:500;
        color:rgba(255,255,255,1);
        opacity: .8;
        line-height:20px;
        text-align: right;
        span{
          color: #c10c43;
        }
      }
      .item-content1{
        width: 75%;
        font-size:12px;
        font-family:PingFangSC-Medium,PingFang SC;
        font-weight:500;
        color:#fff;
        opacity: .6;
      }
    }
  }

  .hori-parent{
    display: flex;
    flex-direction: row;
    width: 100%;
    height: auto;
  }
  .item-content{
    width: 25%;
    font-size:12px;
    font-family:PingFangSC-Medium,PingFang SC;
    color:hsla(0,0%,100%,.4);
    text-align: right;
    span{
      color: #c10c43;
    }
  }
  .item-content1{
    width: 75%;
    font-size:12px;
    font-family:PingFangSC-Medium,PingFang SC;
    font-weight:500;
    color:hsla(0,0%,100%,.4);
  }

        .nodata{
      width: 100%;
      align-items: center;
      z-index: 9999;
      img{
        display: block !important;
        margin:auto;
        margin-top: 10rem;
      }
      div{
        color: white;
        width: 100%;
        text-align: center;
        margin-top: 1rem;
      }
      
    }
    .topContent_Assets{
        margin-top: 1rem;
        margin-left: 2rem;
        flex-direction: row;
        line-height: 1.7rem;
        .Assets_Item{
            color: white;
            display: block;
            width: 95%;
            overflow: auto;
            .Assets_Title{
                color: rgba(255, 255, 255, 0.4);
                font-size: 11px;
            }
            .Assets_Account{
                font-size: 11px;
                float: right;
                opacity: .8;
                .ass_wei{
                  font-size: 12px;
                }
            }
        }
        .Assets_Item1{
            color: white;
            display: block;
            width: 95%;
            overflow: auto;
            .Assets_Title{
                color: rgba(255, 255, 255, 0.4);
                font-size: 11px;
            }
            .Assets_Account{
                font-size: 11px;
                float: right;
                opacity: .8;
                .ass_wei{
                  font-size: 12px;
                }
            }
        }
    }
    .selectcontent{
      position: fixed;
      top:8rem;
      width: 94%;
      height: 3rem;
      line-height: 3rem;
      display: flex;
      margin: 0 auto;
      margin-top: 1rem;
      flex-direction: row;
      margin-left: calc(3%);
      background-color: #1a1b30;
      border-top-left-radius: 6px;
      border-top-right-radius: 6px;
      border-bottom: 1px solid #252638;
      .noselect{
        flex: 1;
        line-height: 3rem;
        text-align: center;
        color: white;
        font-size: 1.2rem;
        font-weight: 100;
      }
      .select{
        flex: 1;
        line-height: 3rem;
        text-align: center;
        color: #C00B43;
        font-size: 1.2rem;
        font-weight: bold;
        .xianshichang{
          width: 2rem;
          height: 0.2rem;
          background: #C00B43;
          margin-left: calc(50%*0.85);
        }
      }
    }
    .bottombottom{
      position: fixed;
      bottom: 0rem;
      display: flex;
      flex-direction: row;
      background: #171417;
      width: 100%;
      height: 4rem;
    }
    .bottombaomingcontent1{
      width: 90%;
      height: 4rem;
      padding-top: 0.3rem;
      .btnbaomingparent1{
        position: relative;
        width: 100%;
        height: 2.66rem;
        
        .btnbg1{
          background: #371220;
          width: 80%;
          height: 2.66rem;
          transform: skewX(-30deg);
          position: absolute;
          z-index: 0;
          left: 0;
          right: 0;
          margin: 0.4rem auto;
        }
        .btnbghui1{
          background: #C10C43;
          width: 80%;
          height: 2.66rem;
          transform: skewX(-30deg);
          position: absolute;
          z-index: 0;
          left: 0;
          right: 0;
          margin: 0.4rem auto;
        }
        .btntitle1{
          color: white;
          position: absolute;
          z-index: 1;
          line-height: 2.8rem;
          font-weight:600;
          width: 80%;
          text-align: center;
          left: 0;
          right: 0;
          margin: 0.4rem auto;
        }
        .btntitlehui1{
          color: rgba(255, 255, 255, 0.6);
          position: absolute;
          z-index: 1;
          line-height: 2.8rem;
          font-weight:600;
          width: 80%;
          text-align: center;
          left: 0;
          right: 0;
          margin: 0.4rem auto;
        }
      }

    }
    .contapls{
      margin-top: 12rem;
      padding: 0px calc(2%) 0px calc(2%);
    }
    .convert-shouyi{
      width: 94%;
      overflow-y: scroll;
      position: fixed;
      top: 11.6rem;
      bottom: 4rem;
      left: 3%;
      right: 0;
      -webkit-box-align: center;
      -ms-flex-align: center;
      align-items: center;
      background: #1a1b30;
      .SCItem{
        margin-bottom: 0.1rem;
        min-height: 5rem;
        padding-top: 1rem;
        position: relative;
        border-bottom: 1px solid #252638;
        margin: 0 1.33rem;
        .firest{
            float: left;
            .typeTitle{
              color: white;
              display: block;
              padding-bottom: .6rem;
              opacity: .8;
            }
            .time{
                color: rgba(255, 255, 255, 0.4);
                font-size: 12px;
            }
        }
        .sencond{
            .incomeAccount{
                position: absolute;
                right: 0px;
                top:2rem;
                color: white;
            }
            .jiesuoTime{
                color: rgba(255, 255, 255, 0.4);
                font-size: 12px;
                position: absolute;
                right: 2.33rem;
            }
        }
        .sendRemark{
          color: #c10c43;
          margin-top: .6rem;
        }
      }
    }
</style>

