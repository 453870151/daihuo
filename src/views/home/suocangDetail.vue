<template>
  <div class="mine_bg">
      <!-- <img src="../../assets/images/mine/waiting.png" alt /> -->
    <!-- <div class="top-bar">
      <span>挖礦</span>
    </div> -->

    <div class="scrollConter">
        <div class="top-bar al">
            <img class="back" @click="goBack" src="../../../static/back.png" alt srcset>
            <div class="left">{{partnerTitle}}</div>
        </div>
    </div>

    <div class="topContent_Assets">
        <span class="Assets_Item">
            <span class="Assets_Title">总资产：</span>
            <span class="Assets_Account">{{balanceLokeTotal}} BSS</span>
        </span>

        <span class="Assets_Item1">
            <span class="Assets_Title">累计收益：</span>
            <span class="Assets_Account">{{balanceIncomeTotal}} BSS</span>
        </span>
    </div>    

    <div class="bottom_content_list">
        <div class="topselectcontent">
          <div class="selectContent" @click="openBottomPopup">{{currentShowTypeLabel}}</div>
          <div class="threemonthTip">仅展示3个月收益明细</div>
        </div>
        
        <div class="nodata"  v-show="inviteListInfo.length<=0">
          <img src="../../../static/nullobj.png" alt="">
          <div>暂无数据~</div>
        </div>
        <div class="bottomscroll">
                <Scroll :class="['scroll', heightStatus == 2 ? 'scrollTopsl' : '', iosConter == 2 ? 'iosConter' : '']" ref="scroll" :pull-up-load="true" :probe-type="3" @pullingUp="loadMore">
                
        <div class="SCItem" v-for="(item,index) in inviteListInfo">
            <div class="firest">
                <span class="typeTitle">{{item.serviceRemark}}</span>
                <span class="incomeAccount">{{item.operationType}}{{item.income}} {{item.symbol}}</span>
            </div>

            <div class="sencond">
                <span class="time">{{item.formatDateByCreateTime}}</span>
                <span class="jiesuoTime" v-if="item.formatDateByExpiresTime">到期时间：{{item.formatDateByExpiresTime}}</span>
            </div>
            <div class="musoss">{{item.notifyRemark}}</div>
        </div> 
    
    </Scroll>
        </div>
    </div>

        <van-popup v-model="bottomshow" position="bottom" class="middleshowpopup">
          <div class="popupItemParent">
            <div :class="currentShowType==4000?'popupItemselect':'popupItem'" @click="selectTypeShow(0)">全部</div>
            <div :class="currentShowType==4001?'popupItemselect':'popupItem'" @click="selectTypeShow(4001)">认购</div>
            <div :class="currentShowType==4002?'popupItemselect':'popupItem'" @click="selectTypeShow(4002)">赎回</div>
            <div :class="currentShowType==4003?'popupItemselect':'popupItem'" @click="selectTypeShow(4003)">收益</div>
            <div :class="currentShowType==3000?'popupItemselect':'popupItem'" @click="selectTypeShow(3000)">分红</div>
          </div>
          
        </van-popup> 


   <div class="bottombottom">
      
      <div class="bottombaomingcontent1" @click="openShuHui">
      <div class="btnbaomingparent1">
        <div class="btnbg1"></div>
        <div class="btntitle1">赎回</div>
        
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




  </div>
</template>

<script>
import Scroll from '../../components/Scroll';
import cookie from 'js-cookie'
import axios from 'axios'
export default {
  updated(){
    
  },
  components:{
    Scroll
  },
  name: "",
  data() {
    return {
      bottomshow:false,
      UserID:"",
      inviteListInfo : [],
      tempinviteListInfo:[],
      currentShowType:"4000",
      currentShowTypeLabel:"全部 ▼",
      data: "data",
      jiaoyiType:"购买",
      waitTotalAmount:0,
      contentHeight:'',
      contentStyleObj:{
　　　　　height:''
　　　},
      heightFlag: true,
      heightStatus:1,
      iosConter:1,
      requestType:"2000",
      pageNumber:1,
      pageSize:15,
      partnerTitle:'',
      balanceLokeTotal:'',
      balanceIncomeTotal:'',
      productId:'',
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
    // let Userid_cwv = Cookie.get("Userid_cwv");
    // let smidlocal = Cookie.get("Smid");
    // let inviteidlocal = Cookie.get("inviteid");
    // let mobilelocal = Cookie.get("Mobile");
    // let Nicknamelocal = Cookie.get("Nickname");
    this.UserID = cookie.get("userID")
    window.addEventListener('resize', this.getConterHeight);
    window.addEventListener('resize', this.getHeight);
    this.getConterHeight()
    this.getHeight()

    this.appSource()
    this.changeStatuetrue();
    this.checkUserInfo();

  },
  methods: {
    openShuHui(){
      this.$router.push("/suocangandRedeem/" + this.productId)
    },
    openRenGou(){
      this.$router.push("/suocangandjieList")
    },
    selectTypeShow(index){
      // this.inviteListInfo
      this.bottomshow = false;
      this.inviteListInfo = []
      if(index == 4001)
          this.currentShowTypeLabel = "认购 ▼";
      else if(index == 4002)
          this.currentShowTypeLabel = "赎回 ▼";
      else if(index == 4003)
          this.currentShowTypeLabel = "收益 ▼";
      else if(index == 3000)
          this.currentShowTypeLabel = "分红 ▼";
      else
          this.currentShowTypeLabel = "全部 ▼";
      this.tempinviteListInfo.map((item) => {
        if(index !== 0)
        {
           this.currentShowType = index+"";
            if(item.balanceType == index)
            {
              this.inviteListInfo.push(item)
            }
        }
        else
        {
          this.currentShowType = "4000";
          this.inviteListInfo.push(item);
        }

      })
    },
    openBottomPopup(){
      this.bottomshow = true;
    },
    checkUserInfo(){
      //partner
      //    /account
      this.productId = this.$route.params.id
      let data = {
        uid:this.UserID,
        productId:this.productId
      }
      this.$ajax.post('/partner/product/balance/total', data,{
                        headers: {
                          'Content-Type': 'application/json;charset=UTF-8'
                        },
        }).then( res => {
          if (res.data.success == true) {
            this.balanceLokeTotal = res.data.body.balanceLoke,
            this.balanceIncomeTotal = res.data.body.balanceIncome
            this.partnerTitle = res.data.body.partnerTitle
          }

      }).catch(err=>{

      }).then(() => {

      })
    },
    getUserInviteList(){
      let productId = this.$route.params.id
      //记录请求Type： 1000邀请记录  2000返佣记录 3000分红记录 4000锁仓明细 4001锁仓认购 4002锁仓赎回 4003锁仓收益
      let data = {
        uid:this.UserID,
        //uid:18129786,
        balanceType:this.currentShowType,
        productId:productId,
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
              if(item.balanceType == 4001  || item.balanceType == 4003)
              {
                item.operationType = "+";
              }
              else if(item.balanceType == 4002)
              {
                item.operationType = "-";
              }
              this.inviteListInfo.push(item);
              this.tempinviteListInfo.push(item);
            })
          }
      }).catch(err=>{

      }).then(() => {

      })
    },
    changeStatuetrue(){
      this.isinviteReward = true
      this.requestType = "2000"
      this.getUserInviteList();
    },
    changeStatuefalse(){
      this.isinviteReward = false
      this.requestType = "3000"
      this.getUserInviteList();
    },
    appSource() {
      const u = navigator.userAgent;
      const isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
      if (isiOS) {
        this.iosConter = 2
        return "ios";
      } else {
        this.iosConter = 1
        return "andriod";
      }
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
      this.pageNumber++;
      this.getUserInviteList();
      this.$refs.scroll.finishPullUp()
    }
  }
};
</script>

<style lang='less' scoped>

.mine_bg {
  width: 100vw;
  height: 100vh;
  background-clip: #252638;
  display: flex;
  flex-direction: column;
  background-color: #252638;
  position: relative;
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

    .topContent_Assets{
        margin-top: 5rem;
        margin-left: 2rem;
        display: flex;
        flex-direction: row;
        .Assets_Item{
          flex: 1;
            color: white;
            .Assets_Title{
                color: rgba(255, 255, 255, 0.4);
                font-size: 11sp;
            }
            .Assets_Account{

                font-size: 11sp;
                text-align: center;
                line-height: 1.6rem;
            }
        }
        .Assets_Item1{
            color: white;
            flex: 1;
            .Assets_Title{
                color: rgba(255, 255, 255, 0.4);
                font-size: 11sp;
            }
            .Assets_Account{

                font-size: 11sp;
                text-align: center;
                line-height: 1.6rem;
            }
        }
    }
    .bottom_content_list{
        background: #1A1B30;
                    border-top-left-radius: 6px;
            border-top-right-radius: 6px;
        width: 96%;
        height: auto;
        display: flex;
        margin: 1.33rem auto;
        flex-direction: column;
        
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
    }

    
      .scrollConter{

      }


      .scroll{
        width: 96%;
        overflow-y: scroll;
        position: fixed;
        top: 11rem;
        bottom: 4rem;
        left: calc(2%);
        right: 0;
        align-items: center;
        background: #1A1B30;
      }
      .SCItem{
          background: #17192B;
          border-radius: 8px;
          width: 100vw;
          margin-bottom: 0.1rem;
          height: 6rem;
          padding-top: 1rem;
          .firest{
              padding-bottom: 0.6rem;
              .typeTitle{
                color: white;
                font-size: 7sp;
                margin-left: 1.33rem;
                
              }
              .incomeAccount{
                  position: absolute;
                  right: 2.33rem;
                  color: white;
              }
          }
          .sencond{
              .time{
                  color: rgba(255, 255, 255, 0.4);
                  margin-left: 1.33rem;
                  font-size: 12px;
              }
              .jiesuoTime{
                  color: rgba(255, 255, 255, 0.4);
                  font-size: 12px;
                  position: absolute;
                  right: 2.33rem;
              }
          }
      }
      .iosConter{
        margin-bottom: 0px;
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
}
  .musoss{
    color: red;
    margin-left: 1.33rem;
    margin-top: 5px;
    font-size: 12px;
  }

.topselectcontent{
  display: flex;
  flex-direction: row;
  color: white;
  .selectContent{
    flex: 1;
    padding-top: 1rem;
    padding-bottom: 1rem;
    padding-left: 1.3rem;
    font-size: 0.9rem;
  }

  .threemonthTip{
            flex: 1;
            color: rgba(255, 255, 255, 0.4);
            padding-top: 1rem;
            padding-bottom: 1rem;
            width: 100%;
            height: auto;
            text-align: right;
            padding-right: 1rem;
        }

}

.middleshowpopup{
  width: 100%;
  height: 25.5rem;
  background: #252638;
  border-top-left-radius: 14px;
  border-top-right-radius: 14px;
  z-index: 9999 !important;
}

.popupItemParent{
  display: flex;
  flex-direction: column;
  color: white;
  text-align: center;
  .popupItem{
    flex: 1;
    width: 100%;
    height: 5rem;
    line-height: 5rem;
    border-bottom: 0.1rem solid #50515F;
    color: rgba(255, 255, 255, 0.4);
    font-size: 0.9rem;
  }

  .popupItemselect{
    flex: 1;
    width: 100%;
    height: 5rem;
    line-height: 5rem;
    border-bottom: 0.1rem solid #50515F;
    color: rgba(255, 255, 255, 1);
    font-size: 1.2rem;
  }
  
}

</style>

