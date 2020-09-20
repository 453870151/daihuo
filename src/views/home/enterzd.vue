<template>
  <div class="bgColor">
    <div class="mine_bg">
      <!-- <div class="scrollConter">
          <div class="top-bar al">
              <img class="back" @click="goBack" src="../../../static/back.png" alt srcset>
              <div class="left">加入战队</div>
          </div>
      </div> -->

      <div class="top-content">
        
        <div class="itemdetail">
            <img :src="signIconSrc[Picindex]" alt="">
            <div class="sencondco">
                <div class="title1">{{productTitle}}</div>
                <div class="title2">已众筹资金</div>
                <div class="title3">{{distributeNumber}}{{distributeCoin}}</div>
            </div>
            <div class="thirdco">
                <div class="title11">参与人数</div>
                <div class="title22">{{subscribeNumber}}</div>
            </div>
        </div>

        <div class="inputcontent">
            <div class="renchoutitle">认筹数量</div>
            <input type="number" v-model="inputAccount" :placeholder="inputPlace" @input="searchTotal()" ref="inputPlace" class="inputcount">
        </div>
        

        <!-- SWV -->
        <div class="checksbox">
          <van-checkbox shape="square" v-model="checkedSWV" checked-color="#c10c43" icon-size="1rem" @click="radioSWV()">
            <span class="VIPTip">
              <span class="VIPtitle">SWV积分最高额外可以换 ${{symbolSWV}}</span>
            </span>
          </van-checkbox> 
          <div class="VIPlet" @click="YFTSWV()">?</div>
          <div class="musof" v-if="phoneShowSWV">
            <div class="mustitle">请输入已注册的SWV 会员账号 <span class="chaxun" style="color:red;text-decoration: underline" @click="clickcheckswv" v-show="showcanuseSWV">查询资产</span></div>
            <input type="text" v-model="inputPhone" :placeholder="phone" class="inputcount" v-on:input="change">
            <div class="canuseAsset" v-show="showcanuseSWV">
              <span>授权信用：{{frzzedSWV}}</span>
              <span class="sencondcontent">可用：{{canuseSWV}}</span>
            </div>
          </div>
        </div>

        <!-- 滿星雲 -->
        <div class="checksbox">
          <van-checkbox shape="square" v-model="checked" checked-color="#c10c43" icon-size="1rem" @click="radioAll()">
            <span class="VIPTip">
              <span class="VIPtitle">Munics M会员消费基金最高额外可兑换 ${{symbol}}</span>
            </span>
          </van-checkbox> 
          <div class="VIPlet" @click="Munics()">?</div>
          <div class="musof" v-if="phoneShow">
            <div class="mustitle">请输入已注册的Munics 会员账号</div>
            <input type="text" v-model="inputPhone" :placeholder="phone" class="inputcount" v-on:input="change">
          </div>
        </div>

      </div>
      
      <div class="onBtnpost" @click="transferAll()">
        <div class="onBtn"></div>
        <div class="onBtnque">确定</div>
      </div>

    </div>
  </div>
</template>

<script>
import cookie from "js-cookie";
import axios from 'axios'
import dialogs from '../../components/dialogs2';
import dialogs3 from '../../components/dialogs3';
import dialogs4 from '../../components/dialogs4';

export default {
  name: "",
  data() {
    return {
      data: "data",
      checked: false,
      checkedSWV:false,
      extendCoin:"",
      productPrice:[],
      inputAccount:'',
      productId:'',
      inputPlace:'认筹数量10BSS起',
      canuseSWV:0,
      frzzedSWV:0,
      showcanuseSWV:false,
      minProductProceeds:'0.00',
      maxProductProceeds:'',
      productSurplus:'--',
      maxNumber:'',
      distributeNumber:'',
      subscribeNumber:'',
      distributeCoin:"",
      subscribePrice:'',
      minRate: '',
      maxRate: '',
      isExtend: '2',
      phone: '手机号/邮箱',
      phoneShow: false,
      phoneShowSWV:false,
      inputPhone: '',
      productTitle:"",
      distributeNumber:0,
      subscribeNumber:0,
      contentStyleObj:{
　　　　　height:''
　　　},
      heightFlag: true,
      heightStatus:1,
      symbol: '0.00',
      symbolSWV:'0.00',
      minValue:10,
      Picindex:0,
      signIconSrc:{
        0:require('../../../static/team10.png'),
        1:require('../../../static/team2.png'),
        2:require('../../../static/team3.png'),
        3:require('../../../static/team4.png'),
        4:require('../../../static/team5.png'),
        5:require('../../../static/team6.png'),
        6:require('../../../static/team7.png'),
        7:require('../../../static/team8.png'),
        8:require('../../../static/team9.png'),
        9:require('../../../static/team1.png'),
      },
    };
  },
  beforeCreate() {},
  beforeDestroy() {},
  updated(){},
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
  created(){
    window.addEventListener('resize', this.getConterHeight);
    window.addEventListener('resize', this.getHeight);
    this.getConterHeight()
    this.getHeight()
    this.product()
    console.log("token==>>",cookie.get("userToken"))
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    change(){
      var reg=11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/;
      var regEmail = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
      if(reg.test(this.inputPhone) || regEmail.test(this.inputPhone)){
        this.showcanuseSWV = true
      }
      else
      {
          this.showcanuseSWV = false
          this.canuseSWV = 0
          this.frzzedSWV=0
      }
      
    },
    clickcheckswv(){
      if(this.inputPhone == ''){
          dialogs.install({
            title: '请输入已注册的Munics/SWV会员账号',
          });
          return false
        }

        this.showcanuseSWV = true
        this.checkSWVCount();
    },
    checkSWVCount(){
      let data = {
        account:this.inputPhone
      }
      this.$ajax.post('/partner/swv/balance', data,{
        headers: {
          'Content-Type': 'application/json;charset=UTF-8'
        },
      }).then( res => {
        if (res.data.success == true) {
          this.canuseSWV = res.data.body.usableAmount
          this.frzzedSWV = res.data.body.creditAmount
        }
      }).catch(err=>{

      }).then(() => {

      })
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
    product(){
      let productId = this.$route.params.id
      console.log("productid===>>>"+productId)
      this.Picindex = productId % 10
      let data = {
        uid:cookie.get("userID"),
        productId: productId,
        productType:2
      }
      this.$ajax.post('/partner/product/page', data,{
        headers: {
          'Content-Type': 'application/json;charset=UTF-8'
        },
      }).then( res => {
        if (res.data.success == true) {
            console.log("产品详情=====>>>>",res.data)
          this.productPrice = []
          res.data.body.content.map((item) => {
            this.productPrice.push(item);
            this.productTitle = item.productTitle
            this.productId = item.productId // 产品ID
            this.subscribeNumber = item.subscribeNumber
            this.distributeNumber = item.distributeNumber
            this.distributeCoin = item.distributeCoin
            // this.distributeNumber = item.distributeNumber // 发行总量
            // this.subscribeNumber = item.subscribeNumber // 已认购数量
            // this.subscribePrice = item.subscribePrice // 初始价格
            // this.productSurplus = item.distributeNumber - item.subscribeNumber  // 剩余份额
            // this.maxNumber = item.maxNumber // 最大限购
            // this.minRate = item.minRate // 最小利率
            // this.maxRate = item.maxRate // 最大利率
            // if(item.minNumber && !item.maxNumber){
            //   this.inputPlace = '最少' + item.minNumber + '起认购'
            // }else if(item.minNumber && item.maxNumber){
            //   this.inputPlace = '单人限购' + item.minNumber + '~' + item.maxNumber
            // }else if(!item.minNumber && item.maxNumber){
            //   this.inputPlace = '单人限购' + item.maxNumber
            // }
          })
        }
      }).catch(err=>{

      }).then(() => {

      })
    },
    productAll(){
      if(this.maxNumber){
        if(this.productSurplus < this.maxNumber){
          this.inputAccount = this.productSurplus
        }else{
          this.inputAccount = this.maxNumber
        }
      }else{
        this.inputAccount = this.productSurplus
      }
      this.searchTotal()
    },
    searchTotal(){
      let value = this.inputAccount
      value = value.toString()
      if (~value.indexOf('e')) {
        return 0
      }
      let v = 0
      let re = new RegExp('^-?[0-9]{1}[0-9]{0,' + '}')
      v = re.exec(value)
      let n = ''
      if (v) {
        n = v[0]
      }
      this.inputAccount = n

      if(this.inputAccount == ''){
        this.minProductProceeds = '0.00'
        this.maxProductProceeds = ''
      }else{
        this.minProductProceeds = parseFloat(Number(value * this.subscribePrice) * (this.minRate / 100)).toFixed(2)
        this.maxProductProceeds = parseFloat(Number(value * this.subscribePrice) * (this.maxRate / 100)).toFixed(2)
        if(this.checked == true){
          this.tickers()
        }
      } 
    },
    transferAll(){
      let inputAccount = this.inputAccount
      if(inputAccount == ''){
        dialogs.install({
          title: '请输入认购数量'
        });
        return false;
      }
    //   if(inputAccount < 10)
    //   {
    //       dialogs.install({
    //       title: '认筹数量小于'+this.minValue+"BSS"
    //     });
    //     return false;
    //   }
      if(this.checked == true){
        if(this.inputPhone == ''){
          dialogs.install({
            title: '请输入已注册的Munics/SWV会员账号',
          });
          return false
        }
      }
      dialogs3.install({
        title: '认购订单需支付 '+ inputAccount +' BSS，请确认支付！',
        cb: () => {this.orderCreate();}
      });
    },
    orderCreate(){
      this.showcanuseSWV = false;
      this.productId = this.$route.params.id
      let productId = this.productId
    
      console.log("productid===>>>"+productId)
      let inputAccount = this.inputAccount
      let item = {
        uid:cookie.get("userID"),
        productId: productId, // 产品ID
        subscribeNumber: inputAccount, // 锁仓金额
        isExtend: this.isExtend, // 是否选中满星云状态
        extendCode: this.inputPhone, // 记录Munics 会员账号
        extendCoin:this.extendCoin
      }
      this.$ajax.post('/partner/product/order/create', item,{
        headers: {
          'Content-Type': 'application/json;charset=UTF-8',
        },
      }).then( res => {
        if(res.data.success){
          let data = {
            coinSymbol: 'BSS', // 转账币种
            amount: inputAccount,  // 转账金额
            transferType: 'wallet_to_contract' // 类型
          }
          this.$ajax.post('https://m.bi.cc/fe-ex-api/contract/co_transfer', data,{
            headers: {
              'Content-Type': 'application/json;charset=UTF-8',
              'exchange-token': cookie.get("userToken")
            },
          }).then( res => {
            if(res.data.code == 0){
              dialogs.install({
                title: '认购成功',
              });
              this.productSurplus = this.productSurplus - inputAccount  // 剩余份额
            }else if(res.data.code == '10002'){
              dialogs.install({
                title: res.data.msg,
              });
            }else{
              dialogs.install({
                title: '认购失败！请检查余额是否充足！',
                type: "error",
                btnText: "确定",
              });
            }
          }).catch(err=>{

          }).then(() => {

          })
        }else{
          dialogs.install({
            title: res.data.message
          });
        }
      }).catch(err=>{

      }).then(() => {

      })
    },
    radioSWV(){
      if(this.checkedSWV == false){
        this.tickersSWV() //获取汇率
        this.isExtend = 1
        this.phoneShowSWV = true
        this.phoneShow = false
        this.extendCoin = "SWV"
        this.checked = false
        this.symbol = '0.00'
        this.change()
      }else{
        this.symbolSWV = '0.00'
        this.isExtend = 2 
        this.phoneShowSWV = false
        this.extendCoin = ""
      }
    },
    radioAll(){
      if(this.checked == false){
        this.tickers()
        this.isExtend = 1
        this.phoneShow = true
        this.extendCoin = "MSC"
        this.checkedSWV = false
        this.phoneShowSWV = false
        this.symbolSWV = "0.00"
        this.showcanuseSWV = false;
      }else{
        this.symbol = '0.00'
        this.isExtend = 2 
        this.phoneShow = false
        this.extendCoin = ""
      }
    },
    tickersSWV(){
      let data = {
        uid:cookie.get("userID"),
        symbol:"bssusdt",  //交易对（bssusdt）
      }
      this.$ajax.post('/partner/ticker/symbol',data,{
        headers: {
          'Content-Type': 'application/json;charset=UTF-8',
        },
      }).then( res => {
        if(this.inputAccount == ''){
          this.symbolSWV = '0.00'
        }else{
          this.symbolSWV = parseFloat(this.inputAccount * res.data.body.price).toFixed(2)
        }
      }).catch(err=>{

      }).then(() => {

      })
    },
    tickers(){
      let data = {
        uid:cookie.get("userID"),
        symbol:"bssusdt",  //交易对（bssusdt）
      }
      this.$ajax.post('/partner/ticker/symbol',data,{
        headers: {
          'Content-Type': 'application/json;charset=UTF-8',
        },
      }).then( res => {
        if(this.inputAccount == ''){
          this.symbol = '0.00'
        }else{
          this.symbol = parseFloat(this.inputAccount * res.data.body.price).toFixed(2)
        }
      }).catch(err=>{

      }).then(() => {

      })
    },
    Munics(){
      dialogs4.install({
        title: 'M消费基金兑换规则',
        conter: '1.可以使用M消费基金最多兑换同等BSS数量加入合伙人计划。<br> 2.兑换消费基金的数量以当前BSS的成交价格基准计算。<br> 3.示例计算说明：<br>会员存入合伙人计划 500 BSS，选择 使用M消费基金，当前BSS价格 0.5180 ，则需要使用 259 MSC来购买500个BSS，M消费基金购买成功后，会员存入的BSS余额为：500*1.1 + 500（MSC购买）=1050，享受全球合伙人每周收益与分红。',
        type: "success",
        btnText: "确定",
      });
    },
    YFTSWV(){
      dialogs4.install({
        title: 'SWV积分兑换规则',
        conter: '1、可使用会员SWV可用额度兑换同等BSS数量加入合伙人计划。<br> 2、兑换需要SWV的数量以发起交易时BSS的价格基础计算。<br>3、使用SWV兑不享受赠送、邀请奖励分红的权益；<br> 4.示例计算说明：<br>会员存入合伙人计划500BSS，选择使用SWV积分，当前BSS价格0.05180，而人民币汇率7.12时，则需要SWV积分=500*0.0518*7.12=184.408，最终认购存入BSS为：500*1.1+500(积分兑换)=1050，享受全球合伙人每周分红与合伙人分红；<br>5、SWV运营方保留对本次活动的最终解释权！',
        type: "success",
        btnText: "确定",
      });
    }
  }
};
</script>

<style lang='less' scoped>
.bgColor{
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  overflow-y: auto;
  background: #252638;
}
.mine_bg {
  width: 100vw;
  // height: 100vh;
  background-clip: #252638;
  display: flex;
  flex-direction: column;
  // background-color: #252638;
  position: relative;
  padding: 1rem;
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
        margin-right: 1.2rem;
        font-weight: 500;
        color: rgba(255, 255, 255, 1);
        width: 100%;
        height: auto;
        text-align: center;
      }
      .right {
        img {
          width: 1.2rem;
          height: auto;
        }
      }
    }

    .itemdetail{
          width: 96%;
          height: 7rem;
          margin-left: calc(100% * 0.02);
          background: #1A1B30;
          border-radius: 6px;
          display: flex;
          flex-direction: row;
          margin-bottom: 1rem;
          img{
              width: 6rem;
              height: 6rem;
              align-self: center;
              margin-left: 0.6rem;
          }

          .sencondco{
              padding-top: 0.66rem;
              margin-left: 1rem;
              .title1{
                  color: white;
                  font-size: 1.1rem;
              }
              .title2{
                  margin-top: 1rem;
                  color: #FFFFFF;
                  opacity: 0.6;
                  font-size: 0.833rem;
              }
              .title3{
                  margin-top: 0.4rem;
                  color: #FFFFFF;
                  opacity: 0.8;
                  font-size: 1.1rem;
              }
          }

          .thirdco{
              margin-left: 1rem;
              .title11{
                  margin-top: 3.233rem;
                  color: #FFFFFF;
                  font-size: 0.833rem;
                  opacity: 0.6;
              }
              .title22{
                  margin-top: 0.4rem;
                  color: #FFFFFF;
                  font-size: 1.1rem;
                  opacity: 0.8;
              }
          }
      }

  .top-content{
    // background: #1A1B30;
    // margin-top: 4rem;
    // border-radius: 5px;
    .coindetail{
      display: flex;
      flex-direction: row;
      padding-top: 1rem;
      .colossaa{
        width: 2rem;
        margin-left: 1rem;
        img{
          width: 100%;
          border-radius:8px;
        }
      }
      .right-content{
        flex: 5;
        padding-left: 0.8rem;
        color: white;
        opacity: 0.9;
        .title-des{
          width:100%;
          height:auto;
          font-size:1.2rem;
          font-family:PingFangSC-Semibold,PingFang SC;
          font-weight:530;
          color:rgba(255,255,255,1);
          line-height:2rem;
        }
        .content-des{
          width:100%;
          height:auto;
          font-size:1rem;
          font-family:PingFangSC-Regular,PingFang SC;
          font-weight:400;
          color:rgba(241,242,247,0.6);
          line-height:18px;
          margin-top: 0.5rem;
        }
      }

    }

    .hori-parent{
      display: flex;
      flex-direction: row;
      width: 95%;
      margin-top: 1rem;
      height: auto;
      padding-top: 1rem;
      margin-left: 5%;
    }
    .item-detail-title{
      width: 25%;
      font-size:1rem;
      font-family:PingFangSC-Medium,PingFang SC;
      font-weight:500;
      color:#fff;
      line-height:20px;
      opacity: 0.8;
    }
    .item-content{
      width: 100%;
      font-size:0.8rem;
      font-family:PingFangSC-Medium,PingFang SC;
      font-weight:500;
      color:rgba(255,255,255,0.6);
      line-height:20px;
    }
  }
  .inputcontent{
      display: flex;
      flex-direction: row;
      margin-top: 3rem;
      margin-bottom: 3rem;
  }
  .renchoutitle{
      flex: 1;
      color:#FFFFFF;
      margin-top: 0.6rem;
      opacity: 0.7;
      margin-left: calc(100% * 0.03);
      align-self: center;
  }
  .inputcount{
    flex: 5;
    margin-right: calc(100% * 0.03);
    outline-color: invert;
    outline-style: none;
    outline-width: 0px;
    text-shadow: none;
    -webkit-appearance: none;
    -webkit-user-select: text;
    outline-color: transparent;
    box-shadow: none;
    background: transparent;
    width: 60%;
    color: #fff;
    opacity: 0.3;
    border: 1px solid transparent;
    border-bottom:1px solid #ffffff;
    width: 96%;
    line-height: 40px;
    padding: 0 2%;
    border-radius: 3px;
  }
  .bottomInputContent{
      display: flex;
      flex-direction: column;
      width: 90%;
      padding: 2rem 0 1rem;
      margin: 2rem 5% 0;
      border-top: 1px solid #22222C;
      .inputParent{
          width: 100%;
          .inputtitle{
            color: white;
            margin-right: 0.4rem;
            opacity: 0.4;
            letter-spacing: 1px;
          }
          .allaccount{
            color:#C10C43;
            margin-left: 0.4rem;
            position: absolute;
            top: 0px;
            right: 2%;
            line-height: 40px;
          }
          .inputpost{
            position: relative;
            margin: 20px 0;
          }
      }
      .shengyufene{
        color: white;
        opacity: 0.8;
        .shengtoosl{
          float: right;
        }
        em{
          font-style: inherit;
          margin: 0 3px;
        }
      }
  }
  .onBtnpost{
    position: relative;
    .onBtn{
      background: #C10C43;
      width: 90%;
      height: 40px;
      -webkit-transform: skewX(-30deg);
      transform: skewX(-30deg);
      position: absolute;
      z-index: 0;
      left: 0;
      right: 0;
      margin: 40px auto;
    }
    .onBtnque{
      font-size: 16px;
      color: #fff;
      position: absolute;
      z-index: 1;
      line-height: 40px;
      font-weight: 600;
      width: 80%;
      text-align: center;
      left: 0;
      right: 0;
      margin: 40px auto;
    }

  }
  .VIPTip{
    color:#fff;
    padding-top: 3px;
    display: inline-block;
    .VIPtitle{
      opacity: .4;
    }
  }
  .VIPlet{
    position: absolute;
    top: 0.6rem;
    right: 0px;
    display: inline-block;
    border: 1px solid #fff;
    width: 15px;
    height: 15px;
    text-align: center;
    border-radius: 500px;
    opacity: .8;
    color: #fff;
    margin-top: 3px;
  }

  .checksbox{
    position: relative;
    width: 90%;
    margin: auto;
    padding: 0.6rem 0;
  }
  .musof{
    background: #252638;
    margin-top: 1rem;
    border-radius: 5px;
    padding: 20px;
    .mustitle{
      color: #fff;
    }
    .canuseAsset{
      margin-top: 1rem;
      color: red;
      .sencondcontent{
        margin-left: 2rem;
      }
    }
    .chaxun{
      color: red;
      margin-left: 3rem;
    }
    input{
      line-height: 35px;
      margin-top: 20px;
    }
  }
}
</style>

