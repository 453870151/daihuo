<template>
  <div class="mine_bg">
    <!-- <div class="scrollConter">
        <div class="top-bar al">
            <img class="back" @click="goBack" src="../../../static/back.png" alt srcset>
            <div class="left">BSS全球合伙人</div>
        </div>
    </div> -->
    <div class="convert-body" v-if="productList.length">
      <van-list
        v-model="loading"
        :finished="finished" 
        finished-text=""
        color="#ccc"
        @load="onload"
      >
        <van-cell v-for="(item, index) in productList" :key="index">
          <div class="clearfix item" @click="clickopensuo(item.productId)">
            <div class="clearfix">
              <!-- 名称数量 -->
              <div class="item-type">{{item.productTitle}}</div>
              <!-- <div class="item-amount-parent">
                {{item.subscribeStatuslabel}}
              </div> -->
              
            </div>
            <div class="hori-parent">

              <div class="item-content1">{{item.minRate}}% ~ {{item.maxRate}}%
                <div class="item-detail-title">
                  年化率
                </div>
              </div>

              <!-- 结果 -->
              <!-- <div class="item-content">{{item.distributePrice}} ≈ {{item.subscribePrice}}
                <div class="item-detail-title">
                  初始价格
                </div>
              </div> -->

              <div class="item-content">{{item.distributeNumber}}
                <div class="item-detail-title">
                  发行总量
                </div>
              </div>

              <div class="item-content">{{item.lockedDate}}{{item.lockedUnit}}
                <div class="item-detail-title">
                  周期
                </div>
              </div>
            </div>
            <!-- 时间 -->
            <div class="item-time">认购时间:{{item.formatDateByStartTime}} ~ {{item.formatDateByEndTime}}</div>

            <img class="timeend" src="../../../static/timeend.png" alt="" v-if="item.subscribeStatus == 3">
          </div>
          
        </van-cell>
      </van-list>
    </div>
    <div v-else>
      <div class="nodata" v-show="productList.length<=0">
              <img src="../../../static/nullobj.png" alt="">
              <div>暂无数据~</div>
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
    // if(this.isshichang)
    // {
    //     let img = document.getElementsByClassName('content')[0].getElementsByTagName('img')
    //     let count = 0
    //     let length = img.length
    //     if (length) {
    //         let timer = setInterval(() => {
    //             if (count == length) {
    //                 // console.log('refresh')
    //                 this.$refs.scroll.refresh()
    //                 clearInterval(timer)
    //             } else if (img[count].complete) {
    //                 count ++
    //             }
    //         }, 50)
    //     }
    // }
    
  },
  components:{
    Scroll
  },
  name: "",
  data() {
    return {
      data: "data",
      isshowmore:false,
      contentHeight:'',
      contentStyleObj:{
　　　　　height:''
　　　},
      productList:[],
      heightFlag: true,
      heightStatus:1,
      iosConter:1,
      pageNumber:1,
      pageSize:15,
      loading:false,
      finished:false
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

    this.getProductList();


  },
  methods: {
      clickopensuo(productId){
        this.$router.push('/suocangandjiedetail/' + productId)
        // this.$router.push({
        //   path: '/suocangandjiedetail',
        //   query: {
        //     productId: productId
        //   }
        // })
      },
    onload() {
      //this.initData()
      console.log("获取数据")
    },
    getProductList(){
      this.loading = true;
      this.finished = false;
      let data = {
        uid:this.UserID,
        pageNumber: this.pageNumber,
        pageSize: this.pageSize
      }
      this.$ajax.post('/partner/product/page', data,{
                        headers: {
                          'Content-Type': 'application/json;charset=UTF-8'
                        },
        }).then( res => {
          
          console.log("数据===>>>",res.data)
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
            if(item.subscribeStatus == 1)
            {
              item.subscribeStatuslabel = "进行中";
            }
            else if(item.subscribeStatus == 2)
            {
              item.subscribeStatuslabel = "未开始";
            }
            else if(item.subscribeStatus == 3)
            {
              item.subscribeStatuslabel = "已结束";
            }
            this.productList.push(item);
            
          })
        }

      }).catch(err=>{

      }).then(() => {

      })
    },
    appSource() {
      // const u = navigator.userAgent;
      // const isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
      // if (isiOS) {
      //   this.iosConter = 2
      //   return "ios";
      // } else {
      //   this.iosConter = 1
      //   return "andriod";
      // }
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
    padding: 1rem calc(2%) 1rem calc(2%);
    
    //设置item背景样式,距离下面的间距
    .van-cell {
      // background: transparent;
      // color: #fff;
      width:98%;
      height:auto;
      background:#17192B;
      border-radius:8px;
      margin-left: calc(1%);
      margin-bottom: 10px;
    }
    .van-cell__value--alone{
      color: #FBF5FF;
      
    }
    .van-cell:not(:last-child):after {
      //底部分割线
      border-bottom: 0px solid #4536A2;
    }
    .item {
        background: #17192B;
        border-radius: 8px;
        margin-bottom: 1rem;
      & > div {
        padding: .2rem 0;
      }
      .item-type {
        float: left;
        width: 70%;
        color: white;
        font-size: 1.5rem;
        padding-left: 1rem;
        padding-top: 0.6rem;
        padding-bottom: 0.5rem;
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
        margin-left: 1rem;
        padding-top: 1rem;
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
      .item-content{
        flex: 1;
        width: 8rem;
        font-size:1rem;
        font-family:PingFangSC-Medium,PingFang SC;
        font-weight:500;
        color:rgba(255,255,255,1);
        line-height:20px;
        font-size: 1.1rem;
      }

      .item-detail-title1{
        width: 9rem;
        font-size:1.2rem;
        font-family:PingFangSC-Medium,PingFang SC;
        font-weight:500;
        color:red;
        line-height:16px;
        padding-right: 5rem;
        font-size: 0.8rem;
      }
      .item-content1{
        flex: 1;
        width: 8rem;
        font-size:1.2rem;
        font-family:PingFangSC-Medium,PingFang SC;
        font-weight:800;
        color:red;
        line-height:20px;
      }
    }
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
</style>

