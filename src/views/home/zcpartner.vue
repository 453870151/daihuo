<template>
  <div class="bg convert-record">
        <div class="isFixedInput" :class="positionScrollTop == false ? 'isNone' :''">
            <input type="text" placeholder="搜索" v-model="currentValue">      
        </div>
        <Scroll :class="['scroll', heightStatus == 2 ? 'scrollTopsl' : '', iosConter == 2 ? 'iosConter' : '']" ref="scroll" :pull-up-load="true" :probe-type="3" @scroll="positionScroll" @pullingUp="loadMore">
            <div class="toptitle">
                <!-- <img class="back" @click="goBack" src="../../../static/back.png" alt srcset> -->
                <img src="../../../static/zcparentbg.png" alt="" class="home_top_logo">
                <div class="title1">BICC全球社区合伙人</div>
                <div class="title2">创世众筹 · 扬帆启航</div>
            </div>          

            <div class="home_top_quanyi">
                <div class="waikuang" @click="createzd">申请创建战队</div>
                
                <a class="waikuang2" href="https://bi-cc.zendesk.com/hc/zh-cn/articles/900001229266-BICC%E5%85%A8%E7%90%83%E5%90%88%E4%BC%99%E4%BA%BA%E5%88%9B%E4%B8%96%E4%BC%97%E7%AD%B9%E8%AE%A1%E5%88%92"><div>规则详情</div></a>
            </div>


            <!-- 这里需要给组件添加一个class，用于控制固定的位置，看css注释部分 -->
            <!-- <sticky-slot class="stickyTop">
              <div ref="pronbit" class="zhanduititle" :class="searchBarFixed == true ? 'isFixed' :''">
                <input type="text" placeholder="搜索" v-model="currentValue">       
              </div>
            </sticky-slot> -->
            
            <div :class="positionScrollTop == true ? 'isNone' :''">
              <div ref="pronbit" class="zhanduititle">
                <input type="text" placeholder="搜索" v-model="currentValue">       
              </div>
            </div>
            
            <div v-if="productList.length">
                <div class="itemdetail" v-for="item in productList">
                  <img :src="signIconSrc[getIndex(item)]" alt="">
                  <div class="detail_content">
                      <div class="title1">{{item.productTitle}}</div>
                      <div class="detail_content2">
                          <div class="sencondco">
                              <div class="title2">已众筹资金</div>
                              <div class="title3">{{item.distributeNumber}}{{item.distributeCoin}}</div>
                          </div>
                          <div class="thirdco">
                              <div class="title11">参与人数</div>
                              <div class="title22">{{item.subscribeNumber}}</div>
                          </div>
                      </div>
                  </div>
                  <div v-if="item.subscribeStatus == 1" class="btnenter" @click="enterzd(item.productId)">加入战队</div>
                  <div v-else class="jieshu"><img src="../../../static/jieshu.png" alt=""></div>
                </div>
            </div>
            <div v-else class="nodata">
              <img src="../../../static/nullobj.png" alt="">
              <div>无结果~</div>
            </div>
            
        </Scroll>


        <van-popup v-model="middleshow" position="bottom" class="middleshowpopup">
            <div class="top_content">
                <div class="pop_title">申请战队</div>
                <img src="../../../static/closepopup.png" alt="" @click="closepopup">
            </div>

            <div class="inputcontent">
                <div class="inputtitle">战队名称</div>
                <input type="text" v-model="inputname" :placeholder="inputhintname" class="inputcount">   
            </div>

            <div class="popupdes">BICC全球合伙人申请创世众筹战队，合伙人锁仓资产不得低于2000BSS</div>

            <div class="onBtnpost" @click="creatProductZD()">
              <div class="onBtn"></div>
              <div class="onBtnque">确定</div>
            </div>
        </van-popup> 
  </div>
</template>

<script>

import Scroll from '../../components/Scroll';
// import stickySlot from '../../components/stickySlot';
// import { qrcanvas } from "qrcanvas";
// import html2canvas from "html2canvas";

// import partnerCardbg from "../../../static/partnerbg.png"
// import zhongchoupartnerCardbg from "../../../static/zhongchoupartner.png"

// import Vue from 'vue'
// import { List, Cell } from 'vant'

// // 只有一个确定是dialogs,有确定有取消是dialogs3
// import dialogs from '../../components/inputdialog';
import cookie from 'js-cookie'
// Vue.use(List).use(Cell)

export default {
  data() {
    return {
      heightFlag: true,
      heightStatus:1,
      iosConter:1,
      pageNumber:1,
      pageSize:15,
      middleshow:false,
      inputname:"",
      inputhintname:"请输入战队名称",
      inputhintcount:"最低2000BSS",
      UserID:"",
      productList:[],
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
      productPicIndex:0,
      currentValue: "",
      searchBarFixed: false,
      positionScrollTop: false,
    }
  },
  components:{
    Scroll,
    //stickySlot
  },
  watch: {
    imgUrl(val, oldval) {
      //监听到imgUrl有变化以后 说明新图片已经生成 隐藏DOM
      //   this.$refs.box.style.display = "none";
      //   console.log(val);

    },
    currentValue(curVal, oldVal) {
      // 实现input连续输入，只发一次请求
      clearTimeout(this.timeout)
      this.timeout = setTimeout(() => {
        this.handleChangeName(curVal)
      }, 500)
    }
  },
  // updated(){
  //       let img = document.getElementsByClassName('content')[0].getElementsByTagName('img')
  //       let count = 0
  //       let length = img.length
  //       if (length) {
  //           let timer = setInterval(() => {
  //               if (count == length) {
  //                   // console.log('refresh')
  //                   this.$refs.scroll.refresh()
  //                   clearInterval(timer)
  //               } else if (img[count].complete) {
  //                   count ++
  //               }
  //           }, 50)
  //       }
  
  // },
  mounted() {
    window.addEventListener("scroll", this.handleScroll, true);
  },
  destroyed() {
    window.removeEventListener("scroll", this.handleScroll, true);
  },
  computed: {
      
  },
  created(){
    this.UserID = cookie.get("userID")
    this.getProductList();
  },
  methods: {
    positionScroll(msg){
      if(msg.y < -270){
        this.positionScrollTop = true
      }else{
        this.positionScrollTop = false
      }
    },
    handleScroll(){
      if(this.$refs.pronbit.getBoundingClientRect().top <= 0){
        this.searchBarFixed = true
      }else{
        this.searchBarFixed = false
      }
      console.log('距离顶部高度', this.$refs.pronbit.getBoundingClientRect().top)
    },
    getIndex(item){
        return item.productId % 10
    },
    goBack() {
      this.$router.go(-1);
    },
    enterzd(productId){
        this.$router.push("/enterzd/"+productId)
    },
    loadMore(){
        this.pageNumber++;
        this.getProductList();
        this.$refs.scroll.finishPullUp()
        // this.$refs.scroll.refresh()
    },
    handleChangeName (value) {
      // if (value === '') {
      //   return false;
      // }
      this.pageNumber = 1
      this.productList = []
      this.getProductList()
    },
    createzd(){
        this.middleshow = true
    },
    closepopup(){
        this.middleshow = false
    },
    getProductList(){
      let data = {
        uid:this.UserID,
        productType:2,
        pageNumber:this.pageNumber,
        pageSize:this.pageSize,
        productTitle: this.currentValue
      }
      this.$ajax.post('/partner/product/page', data,{
                        headers: {
                          'Content-Type': 'application/json;charset=UTF-8'
                        },
        }).then( res => {
        if (res.data.success == true) {
          res.data.body.content.map((item) => {
            this.productList.push(item);
          })
          setTimeout(() => {
            this.$refs.scroll.refresh()
          }, 10);
        }

      }).catch(err=>{

      }).then(() => {

      })
    },
    creatProductZD(){
      let data = {
        uid:this.UserID,
        productTitle:this.inputname
      }
      this.$ajax.post('/partner/product/create', data,{
                        headers: {
                          'Content-Type': 'application/json;charset=UTF-8'
                        },
        }).then( res => {
        if (res.data.success == true) {
          this.productList = res.data.body.content
          this.productList = [];
          this.getProductList();
          this.middleshow = false;
        }

      }).catch(err=>{

      }).then(() => {

      })
    }
  }
}
</script>

<style lang="less" scoped>
  /* 
    通过设置top的值，控制需要固定在什么位置，0是顶部，值为number(px)
  */
  .stickyTop {
    top: 0;
    z-index: 10;
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

  .isNone{
    display: none;;
  }

  .isFixed{
    position: fixed;
    input{
      width: 100% !important;
    }
  }

  .isFixedInput{
    position: fixed;
    top: 0;
    z-index: 9999;
    width: 100%;
    line-height: 2rem;
    background: #1a1b30;
    border-bottom: 1px solid #363747;
    input{
      width: 85%;
      border: 1px solid #363747;
      color: #999;
      background: #252638;
      padding: 0 2%;
      border-radius: 20px;
      margin-left: 5%;
      margin-top: 1rem;
      margin-bottom: 1rem;
    }
  }

  .bg {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    overflow-y: auto;
    background: #252638;
  }

  .home_top_logo{
    width: 100vw;
    height: auto;
    margin-top: -5rem;
  }

  .toptitle{
      position: relative;
      .back{
          position: absolute;
          z-index: 10000;
          margin-left: 1.1rem;
          margin-top: 1rem;
          width: 1rem;
          height: 1rem;
      }
      .title1{
          position: absolute;
          color: #FFFFFF;
          opacity: 0.6;
          margin-top: -10rem;
          margin-left: 3rem;
          font-size: 1.6rem;
          font-weight: 400;
      }
      .title2{
          position: absolute;
          color: white;
          margin-top: -7rem;
          margin-left: 3rem;
          font-size: 1.9rem;
          font-weight: 700;
      }
  }

  .home_top_quanyi{
    width: 100%;
    height: 3rem;
    background: #252638;
    position: absolute;
    left: 0;
    right: 0;
    margin: -2rem auto;
    border-radius:20px;
    display: flex;
    flex-direction: row;

  }
      .waikuang{
        width: 60%;
        height: 2.5rem;
        line-height: 2.5rem;
        text-align: center;
        margin-left: calc(100% * 0.03);
        margin-top: 2rem;
        border: 1px solid #FFFFFF;
        opacity: 0.2;
        color: #FFFFFF;

    }
          .waikuang2{
        width: 30%;
        height: 2.38rem;
        line-height: 2.5rem;
        text-align: center;
        margin-left: calc(100% *0.04);
        margin-top: 2rem;
        border: 1px solid #FFFFFF;
        opacity: 0.2;
        color: #FFFFFF;
    }

    .zhanduititle{
        width: 96%;
        height: 2rem;
        line-height: 2rem;
        margin-top: 5rem;
        margin-bottom: 1rem;
        padding: 0 calc(100% *0.05);
        input{
          width: 50%;
          border: 1px solid #363747;
          color: #999;
          background: #252638;
          padding: 0 2%;
          border-radius: 20px;
        }
    }

      .scroll{
        // overflow-y: scroll;
        position: absolute;
        top: 0rem;
        bottom: 0px;
        margin-bottom: 0rem;
        left: 0;
        right: 0;
        align-items: center;
        
      }
      .iosConter{
        margin-bottom: 0px;
      }
      .temptemp{
        height: 1000rem;
      }

      .itemdetail{
          width: 90%;
          height: 7rem;
          margin-left: calc(100% * 0.05);
          background: #1A1B30;
          border-radius: 6px;
          display: flex;
          flex-direction: row;
          margin-bottom: 1rem;
          img{
              width: 6rem;
              height: 6rem;
              align-self: center;
              margin-left: 1rem;
          }

          .sencondco{
              padding-top: 0.66rem;
              margin-left: 1rem;
              .title1{
                  color: white;
                  font-size: 1.1rem;
              }
              .title2{
                  margin-top: 0.2rem;
                  color: #FFFFFF;
                  opacity: 0.6;
                  font-size: 0.833rem;
              }
              .title3{
                  margin-top: 0.4rem;
                  color: #FFFFFF;
                  opacity: 0.8;
                  font-size: 1.2rem;
              }
          }

            .detail_content{
                .title1{
                  color: white;
                  font-size: 1.1rem;
                  padding-top: 0.66rem;
                    margin-left: 1rem;
                }
                .detail_content2{
                    display: flex;
                    flex-direction: row;
                }
            }
          .thirdco{
              margin-left: 1rem;
              .title11{
                  margin-top: 0.8rem;
                  color: #FFFFFF;
                  opacity: 0.6;
                  font-size: 0.833rem;
              }
              .title22{
                  margin-top: 0.4rem;
                  color: #FFFFFF;
                  opacity: 0.8;
                  font-size: 1.2rem;
              }
          }

          .btnenter{
              color: #FFFFFF;
              font-size: 1rem;
              height: 2.5rem;
              width: 6rem;
              line-height: 2.7rem;
              background: #AF0D43;
              opacity: 0.6;
              border-radius: 20px;
              text-align: center;
              position: absolute;
              right: 2.6rem;
              margin: 2rem auto;
          }
          .jieshu img{
              width: 4rem;
              height: 4rem;
              margin-top: 1.5rem;
              position: absolute;
              right: 2.5rem;
              transform:rotate(17deg);
              -ms-transform:rotate(17deg); 	/* IE 9 */
              -moz-transform:rotate(17deg); 	/* Firefox */
              -webkit-transform:rotate(17deg); /* Safari 和 Chrome */
              -o-transform:rotate(17deg); 	/* Opera */
          }
      }


      .middleshowpopup{
          height: 20rem;
          width: 100%;
          border-top-right-radius: 20px;
          border-top-left-radius: 20px;
          background: #1A1B30;
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
    border-bottom:1px solid #50515F;
    color: #fff;
    opacity: 0.8;
    border: 1px solid #999;
    width: 96%;
    line-height: 40px;
    padding: 0 2%;
    border-radius: 3px;
  }


  .onBtnpost{
    position: relative;
    .onBtn{
      background: #C10C43;
      width: 90%;
      height: 2.6rem;
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
      line-height: 2.6rem;
      font-weight: 600;
      width: 80%;
      text-align: center;
      left: 0;
      right: 0;
      margin: 40px auto;
    }

  }
      

    .top_content{
        display: flex;
        flex-direction: row;
        .pop_title{
            color: #FFFFFF;
            font-size: 1.1rem;
            margin-top: 1.2rem;
            margin-left: 1.2rem;
        }
        img{
            position: absolute;
            right: 1rem;
            width: 1.3rem;
            height: 1.3rem;
            margin-top: 1.2rem;
            margin-right: 1.2rem;
        }
    }

    .inputcontent{
        display: flex;
        flex-direction: row;
        margin-bottom: 1.3rem;
        text-align: center;
        margin-left: calc((100% - 28rem)/2);
        margin-top: 2rem;
        .inputtitle{
            width: 6rem;
            height: 2.5rem;
            line-height: 2.7rem;
            color: #FFFFFF;
            opacity: 0.8;
        }
        .inputcount{
            width: 16rem;
            height: 2.5rem;
        }
    }
    .popupdes{
        color: #FFFFFF;
        opacity: 0.3;
        font-size: 0.8rem;
        width: 16rem;
        margin-left: calc((100% - 16rem)/2);
    }
</style>