<template>
  <div class="bgColor">
    <div class="mine_bg">
      <!-- <div class="scrollConter">
          <div class="top-bar al">
              <img class="back" @click="goBack" src="../../../static/back.png" alt srcset>
              <div class="left">赎回</div>
          </div>
      </div> -->

      <div class="top-content">
        <div class="bottomInputContent">
          <div class="inputParent">
              <span class="inputtitle">
                <i>赎回数量(BSS)</i>
                <em>可赎回：{{balanceUnwithdraw}} BSS</em>
              </span>
              <div class="inputpost">
                <input type="number" v-model="inputAccount" :placeholder="inputPlace" ref="inputPlace" class="inputcount">
                <span class="allaccount" @click="productAll()">全部</span>
              </div>
          </div>
          <div class="shengyufene">
              <span>有 {{balanceNo}} BSS不可赎回，锁仓未到期不可赎回</span>
          </div>
        </div>
      </div>
  
      <!-- <div class="onBtnpost" @click="transferAll()" :disabled="isAble">
        <div class="onBtn"></div>
        <div class="onBtnque">确定</div>
      </div> -->
      <div class="onBtnpost">
        <div class="onBtn"></div>
        <button class="onBtnque" @click="transferAll()" :disabled="isDisable">确定</button>
      </div>
      <div class="tishi">注：产品到期后，请在7天内赎回，逾期自动复投。</div>
    </div>
  </div>
</template>

<script>
import Cookie from "js-cookie";
import axios from 'axios'
import cookie from 'js-cookie'
import dialogs from '../../components/dialogs2';
export default {
  name: "",
  data() {
    return {
      data: "data",
      checked: false,
      inputAccount:'',
      inputPlace:'请输入赎回数量',
      maxNumber:'',
      minRate: '',
      maxRate: '',
      contentStyleObj:{
　　　　　height:''
　　　},
      heightFlag: true,
      heightStatus:1,
      isDisable: false,
      UserID:"",
      balanceUnwithdraw: '0.00',
      balanceUnloke: '0.00',
      balanceNo: '0.00',
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
    this.UserID = cookie.get("userID")

    window.addEventListener('resize', this.getConterHeight);
    window.addEventListener('resize', this.getHeight);
    this.getConterHeight()
    this.getHeight()
    this.product()
    this.checkUserInfo()
  },
  methods: {
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
    product(){
      
    },
    productAll(){
      this.inputAccount = this.balanceUnwithdraw
    },
    checkUserInfo(){
      let productId = this.$route.params.id
      let data = {
        uid:this.UserID,
        productId: productId
      }
      this.$ajax.post('/partner/product/balance/total', data,{
                        headers: {
                          'Content-Type': 'application/json;charset=UTF-8'
                        },
        }).then( res => {
          if (res.data.success == true) {
            this.balanceUnwithdraw = parseFloat(Number(res.data.body.balanceUnwithdraw).toFixed(2))
            this.balanceUnloke = parseFloat(Number(res.data.body.balanceUnloke).toFixed(2))
            this.balanceNo = parseFloat(Number(res.data.body.balanceLoke - res.data.body.balanceUnloke).toFixed(2))
          }
      }).catch(err=>{

      }).then(() => {

      })
    },
    transferAll(){
      if(this.inputAccount == ''){
        dialogs.install({
          title: '请输入赎回数量',
        });
        return false
      }

      this.isDisable = true
      let inputAccount = this.inputAccount
      let productId = this.$route.params.id
      let data = {
        uid:this.UserID,
        productId: productId,
        balanceWithdraw: inputAccount
      }
      this.$ajax.post('/partner/product/order/withdraw', data,{
        headers: {
          'Content-Type': 'application/json;charset=UTF-8',
        },
      }).then( res => {
        this.isDisable = false
        if(res.data.success){
          dialogs.install({
            title: '赎回 ' + inputAccount +' BSS成功',
          });
          this.checkUserInfo()
        }else{
          dialogs.install({
            title: res.data.message,
          });
        }
      }).catch(err=>{

      }).then(() => {

      })
    },
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

  .top-content{
    background: #1A1B30;
    border-radius: 5px;
    .coindetail{
      display: flex;
      flex-direction: row;
      padding-top: 1rem;
      img{
        width: 2rem;
        margin-left: 1rem;
        border-radius:8px;
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

  .bottomInputContent{
      display: flex;
      flex-direction: column;
      width: 90%;
      padding: 0 0 4rem;
      margin: 2rem 5% 0;
      .inputParent{
          width: 100%;
          .inputtitle{
            color: white;
            margin-right: 0.4rem;
            letter-spacing: 1px;
            i{
              font-style: inherit;
              opacity: .4;
              font-size: 12px;
            }
            em{
              font-style: inherit;
              float: right;
              font-size: 12px;
              opacity: .7;
            }
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
          .inputcount{
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
            border-bottom:1px solid #22222C;
            color: #fff;
            opacity: 0.8;
            border: 1px solid #999;
            width: 96%;
            line-height: 40px;
            padding: 0 2%;
            border-radius: 3px;
          }

      }
      .shengyufene{
        color: #1EFCF1;
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
    height:100px;
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
      background: #c10c43;
      border: none;
    }

  }
  .tishi{
    color: #fff;
    opacity: .4;
    margin-left: 5%;
  }

}
</style>

