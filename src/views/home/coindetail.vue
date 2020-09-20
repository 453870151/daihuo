<template>
  <div class="bg convert-record">
    
    
    <scroll class="scroll">
      <div class="convert-inner">
      <div class="top-bar al">
          <img class="left" @click="()=>{$router.go(-1)}" src="../../../static/back.png" alt="" srcset="">
          <div class="mid">{{productdetail.projectName}}</div>
          <!-- <img class="recharge-top-img" src="../../../static/newmore.png" alt=""> -->
      </div>
    </div>

      <div class="top-content">
      <div class="coindetail"> 
        <img :src="productdetail.productPic" alt="">
        
        <div class="right-content">
          <div class="title-des">{{productdetail.projectName}}</div>
          <div class="content-des">{{productdetail.projectDesc}}</div>
        </div>
      </div>
                  <div class="hori-parent">
              <!-- 结果 -->
              <div class="item-detail-title">发行价
                <div class="item-content">
                  {{productdetail.distributePrice}} {{productdetail.assetType}}
                </div>
              </div>

              <div class="item-detail-title">发行数量
                <div class="item-content">
                  {{productdetail.distributeNumber}}
                </div>
              </div>

              <div class="item-detail-title">申购方式
                <div class="item-content">
                  {{productdetail.typelabel}}
                </div>
              </div>
            </div>
    </div>

    <div class="bottom-content">
      <div class="shengouguize">
        <div class="parent">
          <div class="nameandlookdetail">
            <div class="shufengexian"></div>
            <div class="title-name" @click="changeactive">申购规则</div>
            <a :href="productdetail.ruleUrl">
              <div class="lookdetail">查看详情</div>
            </a>
          </div>
          <div class="steps-parent">
            <div class="steps" :class="active>=2?'steps-guo':'steps-buguo'">1
              <div :class="active>=2?'steps-name-guo':'steps-name-buguo'">预热</div>
              <div :class="active>=2?'steps-time-guo':'steps-time-buguo'">{{productdetail.positionStart}}</div>
            </div>
            <div :class="active>=2?'fengexian-guo':'fengexian-buguo'"></div>

            <div class="steps" :class="active>=3?'steps-guo':'steps-buguo'">2
              <div :class="active>=3?'steps-name-guo':'steps-name-buguo'">申购</div>
              <div :class="active>=3?'steps-time-guo':'steps-time-buguo'">{{productdetail.purchaseStart}}</div>
            </div>
            <div :class="active>=3?'fengexian-guo':'fengexian-buguo'"></div>

            <div class="steps" :class="active>=4?'steps-guo':'steps-buguo'">3
              <div :class="active>=4?'steps-name-guo':'steps-name-buguo'">摇号</div>
              <div :class="active>=4?'steps-time-guo':'steps-time-buguo'">{{productdetail.lotterStart}}</div>
            </div>
            <div :class="active>=4?'fengexian-guo':'fengexian-buguo'"></div>

            <div class="steps" :class="active>=5?'steps-guo':'steps-buguo'">4
              <div :class="active>=5?'steps-name-guo':'steps-name-buguo'">结果</div>
              <div :class="active>=5?'steps-time-guo':'steps-time-buguo'">{{productdetail.published}}</div>
            </div>

          </div>
        </div>

        <div class="parent1">
          <div class="nameandlookdetail">
            <div class="shufengexian"></div>
            <div class="title-name">BI-IEO信息</div>
          </div>

          <div class="msgParent" v-for="(item,index) in productdetail.projectInfoList" v-if='index<4'>
            <div class="msgname">{{item.typeName}}</div>
            <div class="msgcontent" v-if="item.itemValue">{{item.itemValue}}</div>
            <div class="msgcontent" v-else>--</div>
          </div>

          <div class="more" @click="clickdetail">查看更多</div>
        </div>

        <div class="parent1">
          <div class="nameandlookdetail">
            <div class="shufengexian"></div>
            <div class="title-name">项目介绍</div>
            <div class="lookdetail" @click="tocontent">查看详情</div>
          </div>
          <div class="destailmsg" ref="projectcontent">{{productdetail.content}}</div>

          <a :href="productdetail.siteUrl" v-if="productdetail.siteUrl">
            <div class="select-content">
              <div class="select-title">官网</div>
              <img src="../../../static/jiantou.png" alt="">
            </div>
          </a>
          
          <a :href="productdetail.whiteUrl" v-if="productdetail.whiteUrl">
            <div class="select-content1">
              <div class="select-title">白皮书</div>
              <img src="../../../static/jiantou.png" alt="">
            </div>
          </a>
          
        </div>

        <div class="parent2">
          <div class="nameandlookdetail">
            <div class="shufengexian"></div>
            <div class="title-name">代币分配方案</div>
          </div>

          <ve-ring
            height="250px"
            :data="chartSettings.chartData"
            :extend="chartExtend"
            :settings="chartSettings"
          ></ve-ring>

          <div class="tiaomuparent1" v-for="item in productdetail.projectAllotList">
            <div class="dat" :style="{background:item.itemColour}"></div>
            <div class="tiaomutitle" :style="{color:item.itemColour}">{{item.typeName}}</div>
            <div class="tiaomucontent" :style="{color:item.itemColour}">{{item.itemValue}}%</div>
            
          </div>

        </div>
        <div class="kongxi"></div>
      </div>
    </div>
    </scroll>

    <div class="bottombottom"  v-if="btnactive">
      <div class="bottomendtime">{{tipMsg}}</div>
    <div class="bottombaomingcontent" >
      <div class="btnbaomingparent" @click="clickbaomingfirest">
        <div class="btnbg"></div>
        <div class="btntitle">{{btntextLabel}}</div>
      </div>
    </div>
    </div>

    <div class="bottombottom" v-else>
      <div class="bottomendtime">{{tipMsg}}</div>
    <div class="bottombaomingcontent" >
      <div class="btnbaomingparent" @click="clickbtnhui">
        <div class="btnbghui"></div>
        <div class="btntitle">{{btntextLabel}}</div>
      </div>
    </div>
    </div>
    

        <van-popup v-model="show" position="bottom">
      <div class="popcontent">
        <div class="gongneng">确定报名</div>
        <div class="inputparent">
          <div class="useridtitle">用户ID</div>
          <input
              type="number"
              :maxlength="8"
              style="color: #fff;font-size:10px;"
              class="input_content"
              v-model="currentuserid"
              placeholder="请输入正确的用户ID"
            />
            
        </div>
        <div class="bottombaomingcontent1" @click="enlist">
          <div class="btnbaomingparent1">
            <div class="btnbg1"></div>
            <div class="btntitle1">确定</div>
          </div>
        </div>
      </div>
    </van-popup>  

    <!-- 中签详情 -->
    <van-popup v-model="contentshow" position="center">
      <div class="zhongqiangongshi">
        <div class="gongshititle">中签公示</div>
        <div class="gongsitiaomu">
          <div class="totalnumber">中签号总数</div>
          <div class="number">{{productdetail.successNumber}}</div>
        </div>

        <div class="gongsitiaomu">
          <div class="totalnumber">中签率</div>
          <div class="number">{{productdetail.successRate}}%</div>
        </div>

        <div class="zhongcode">中签号码</div>
        <div class="zhongcontent">

          <div class="testparent" v-for="item in productdetail.endList">
            <div class="testone">尾号{{item.length}}位:</div>
            <div class="testtwo">{{item.listlabel}}</div>
          </div>

        </div>

        <div class="tempkong"></div>
        
      </div>
    </van-popup> 


    
    
  </div>
</template>

<script>
import dialogs from '../../components/dialogs2';
import dialogs3 from '../../components/dialogs3';
import Scroll from '../../components/Scroll';
import cookie from 'js-cookie'
export default {

  components:{
    Scroll
  },
  data() {
      this.chartExtend = {
        legend: { show: false ,},  //隐藏legend
        
	      series: {
          center: ['45%', '45%']
	      }
    };
	return {
    coinid:"",
        title:"",
        active: 0,
        btntextLabel:"",
        tipMsg:"",
        btnactive:true,
        show:false,
        currentuserid:"",
        currentauth:"",
        contentshow:false,
        projectcontentHeight:0,
        itemdetail:{
            productId : ""
        },
        jianluelist:{

        },
        productdetail:{
          projectName:"",
          lotterEnd:"",
          siteUrl:"",
          productId:"",
          purchaseEnd:"",
          productPic:"",
          distributeNumber:"",
          productStatus:0,
          published:"",
          distributePrice:0,
          content:"",
          purchaseStart:"",
          lotterStart:"",
          purchaseNumber:"0",
          whiteUrl:"",
          projectDesc:"",
          logo:"",
          positionStart:"",
          
          positionEnd:"",
          projectName:"",
          projectId:"",
          productType:"",
          typelabel:""
        },
	    chartSettings: {
        labelLine:{ length:10,length2:10},
        label:{ position:'outside',fontSize:1},
        radius: ['30px', '50px'],
        //设置破折线的文字及颜色
        label: {
          formatter: params => {
            return `{a| ${params.name}${params.percent}%}`
          },
          rich: {
          }
        },
        itemStyle: {
          color: seriesIndex => {
            // if (seriesIndex.dataIndex === 0) {
            //   return '#C30A44'
            // }else if(seriesIndex.dataIndex === 1){
            //   return '#1FFBF0'
            // } else if(seriesIndex.dataIndex === 2) {
            //   return '#dbdbe3'; 
            // } else if(seriesIndex.dataIndex === 3) {
            //   return '#F08080';
            // } else if(seriesIndex.dataIndex === 4) {
            //   return '#EE4000';
            // } else if(seriesIndex.dataIndex === 5) {
            //   return '#8E8E38';
            // }

            return this.productdetail.projectAllotList[seriesIndex.dataIndex].itemColour
          }
        },
         //数据
        chartData: {
          
          columns: ["typeName", "itemValue"],
          
          rows: [
            
          ]
        }

      }
	}
},
created(){
    let query = this.$route.query

    let productId = query.productId


    this.itemdetail.productId = productId

    this.currentuserid = cookie.get("userToken") ||"";
    this.currentauth = cookie.get("userAuth") ||"";
    // console.log("id>>>",this.currentuserid)

  },
mounted(){
  this.initData();
},
methods:{
  changegeshi(arrayitem){
    console.log("数组===="+arrayitem)
    let str = arrayitem.join('-')
    console.log("str===="+str)
    return str;
  },
  changeactive(){
    // this.active = this.active +1
    // this.getBaoMingBtnStatus();
    this.contentshow = true
  },
  clickbaomingfirest(){
      
      //未开始
      if(this.active == 1)
      {

      }
      //预热阶段, 开始报名
      else if(this.active == 2)
      {
        this.enlist();
      }
      //申购阶段, 开始申购确认
      else if(this.active == 3)
      {
         dialogs3.install({
            title: "申购确认",
            desc:"当前您已获得参与申购的资格,可申购"+this.productdetail.purchaseNumber+"个签号,请于"+this.productdetail.purchaseEnd+"前尽快确定参与申购,申购成功不可撤销！",
            type: "error",
            btnText: "确定",
            cb: () => {this.shengou();}
          });
        
      }
      else if(this.active == 5 || this.active == 6)
      {
          this.contentshow = true;
      }
      
    },

    clickbtnhui(){
      console.log("灰色");
      if(this.active == 1)
      {
        //this.$toast.success("发送成功!");
        this.$toast.fail("活动暂未开始");
      }
      else if(this.active == 2)
      {

      }
      else if(this.active == 6)
      {
        this.contentshow = true;
      }
    },
  initData() {
      let data = {
        uid: this.currentuserid,
        productId :this.itemdetail.productId
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

          // let testarray = [1,2,3,4,5,6]
          // let str = testarray.join('-')
          // console.log("array==="+str)
          
          
          // for(i = 0 ; i<this.productdetail.endList.length;i++)
          // {
          //   this.productdetail.endList[i].list = this.productdetail.endList[i].list.join('、')
          // }
          if(this.productdetail.endList)
          {
            this.productdetail.endList.forEach(item =>{
              item.listlabel = item.list.join('、')
            })
          }


          if(this.productdetail.productType == 'LOTTERY')
          {
            this.productdetail.typelabel = "摇号"
          }
          this.active = this.productdetail.productStatus
          this.getBaoMingBtnStatus();

          this.chartSettings.chartData.rows = res.data.body.projectAllotList.map((itemdetail) => {
            itemdetail.typeName = itemdetail.typeName;
            itemdetail.itemValue = itemdetail.itemValue;
            this.chartSettings.chartData.rows.push(itemdetail);
            return itemdetail;
          })

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
    },
    //申购报名
    enlist(){
      if(this.currentauth !== '1')
      {
        dialogs.install({
            title: "实名认证未通过",
            desc:"请前往至BICC进行实名认证",
            type: "error",
            btnText: "确定",
            cb: () => {}
          });
          return;
      }
      let data = {
        uid: this.currentuserid,
        productId :this.itemdetail.productId
      }
      var list = []
      // this.$loading.show()
      // this.loading = true
      this.$ajax.post('/ieo/product/order/apply', data,{
                        headers: {
                          'Content-Type': 'application/json;charset=UTF-8'
                        },
        }).then( res => {
        if (res.data.success == true) {
          this.$toast.success("报名成功!");
          this.initData();
          
          //  dialogs.install({
          //   title: rs.message,
          //   type: "error",
          //   btnText: "确定",
          //   cb: () => {}
          // });
        }

      }).catch(err=>{

      }).then(() => {
        this.show = false;
        // this.$loading.hide()
        // if (list.length == pagesize) {
        //   this.pageno ++
        //   this.finished = false
        // } else {
        //   this.finished = true
        // }
        // this.loading = false
      })
    },
    //申购确认
    shengou(){
      if(this.currentauth !== '1')
      {
        dialogs.install({
            title: "实名认证未通过",
            desc:"请前往至BICC进行实名认证",
            type: "error",
            btnText: "确定",
            cb: () => {}
          });
          return;
      }
      console.log("userid===>>"+this.currentuserid)
      //申购资格大于0
      if(this.productdetail.purchaseNumber > 0)
      {
        let data = {
          uid: this.currentuserid,
          productId :this.itemdetail.productId
        }
        var list = []
        // this.$loading.show()
        // this.loading = true
        this.$ajax.post('/ieo/product/order/confirm', data,{
                          headers: {
                            'Content-Type': 'application/json;charset=UTF-8'
                          },
          }).then( res => {
          if (res.data.success == true) {
            this.$toast.success("申购成功!");
            this.initData();
            //  dialogs.install({
            //   title: rs.message,
            //   type: "error",
            //   btnText: "确定",
            //   cb: () => {}
            // });
          }

        }).catch(err=>{

        }).then(() => {
          this.show = false;
        })
      }
      else
      {
        this.$toast.fail("申购数量须大于0");
      }
    },
    //检查是否具备申购资格
    checkZiGe(){
      let data = {
        uid: this.currentuserid,
        productId :this.itemdetail.productId
      }
      var list = []
      // this.$loading.show()
      // this.loading = true
      this.$ajax.post('/ieo/product/order/qualification', data,{
                        headers: {
                          'Content-Type': 'application/json;charset=UTF-8'
                        },
        }).then( res => {
        if (res.data.success == true) {
          

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
    },
  clickdetail(){
    this.$router.push("/detail/"+this.itemdetail.productId)
  },
  clickprojectjs(){
    this.$router.push("/projectjs")
  },
  tocontent(){
    let content = this.productdetail.content

      this.$router.push({
        name: 'projectjs',
        query: {
          content
        }
      })
  },
  getBaoMingBtnStatus(){
    //  this.active 1未开始  2预热  3申购  4摇号   5公布结果    6已结束

    //btntextLabel   tipMsg    btnactive
    var reg = new RegExp("-","g");//g,表示全部替换
    let baomintkaishitime = this.productdetail.positionStart.replace(reg,"/");
    let baomingjieshutime = this.productdetail.positionEnd.replace(reg,"/");
    let shengoukaishitime = this.productdetail.purchaseStart.replace(reg,"/");
    let shengoujieshutime = this.productdetail.purchaseEnd.replace(reg,"/");
    let yaohaokaishitime = this.productdetail.lotterStart.replace(reg,"/");
    let yaohaojieshutime = this.productdetail.lotterEnd.replace(reg,"/");
    let gongbushijian = this.productdetail.published.replace(reg,"/");
    
    //报名开始时间
    let baomingkaishi = new Date(baomintkaishitime);
    //报名结束时间
    let baomingend = new Date(baomingjieshutime);
    //申购开始时间
    let shengoukaishi = new Date(shengoukaishitime);
    //申购结束时间
    let shengouend = new Date(shengoujieshutime);
    //摇号开始时间
    let yaohaokaishi = new Date(yaohaokaishitime);
    //摇号结束时间
    let yaohaoend = new Date(yaohaojieshutime);
    //公布结果时间
    let gongbujieguo = new Date(gongbushijian);

    //当前时间
    let currenttime= new Date();

    // console.log("报名结束时间=="+this.productdetail.positionEnd);
    // console.log("申购开始时间=="+this.productdetail.purchaseStart)
    // console.log("当前的时间=="+currenttime)

    //1 未开始,变灰不可点击   tipMsg报名将于xxxx-xx-xx  xx:xx 开始
    if(currenttime<baomingkaishi)
    {
      console.log("未开始")
      this.btntextLabel = "未开始";
      this.btnactive = false;
      this.tipMsg = "报名将于"+this.productdetail.positionStart+"开始";
    }
    //2 预热 我要报名,按钮可点击  tipMsg报名将于xxxx-xx-xx  xx:xx 开始     我已报名变灰不可点击
    else if(currenttime>=baomingkaishi && currenttime <= baomingend)
    {
      console.log("可以报名")
      if(this.productdetail.isPosition == 1)
      {
        //如果我已经报过名,就不能点击,文字我已报名,不可点击
        this.btntextLabel = "我已报名";
        this.btnactive = false;
        this.tipMsg = "报名将于"+this.productdetail.positionEnd+"结束";
      }
      else
      {
        //如果我还没有报名就可以报名,按钮可以点击
        this.btntextLabel = "我要报名";
        this.btnactive = true;
        this.tipMsg = "报名将于"+this.productdetail.positionEnd+"结束";
      }
    }
    //2-1 报名截止,但是还未开始申购
    else if(currenttime>=baomingkaishi && currenttime > baomingend && currenttime < shengoukaishi)
    {
        console.log("报名截止,申购未开始")
        this.btntextLabel = "报名已结束";
        this.btnactive = false;
        this.tipMsg = "申购将于"+this.productdetail.purchaseStart+"开始";
    }
    //开始申购
    else if(currenttime>=shengoukaishi && currenttime <= shengouend)
    {
      console.log("开始申购")
      if(this.productdetail.isPurchase == 3)
        {
          //如果已经报名 还没有申购
          this.btntextLabel = "立即申购";
          this.btnactive = true;
          this.tipMsg = "申购将于"+this.productdetail.purchaseEnd+"结束";
        }
        else if(this.productdetail.isPurchase == 1) //申购过
        {
          //如果已经报名 申购过
          this.btntextLabel = "已申购";
          this.btnactive = false;
          this.tipMsg = "申购将于"+this.productdetail.purchaseEnd+"结束";
        }
        else if(this.productdetail.isPurchase == 2) //没有申购资格
        {
          //如果已经报名 没有申购资格
          this.btntextLabel = "无权参与";
          this.btnactive = false;
          this.tipMsg = "申购将于"+this.productdetail.purchaseEnd+"结束";
        }
       //已经报名
      // if(this.productdetail.isPosition == 1)
      // {
      //   //没申购
      //   if(this.productdetail.isPurchase == 3)
      //   {
      //     //如果已经报名 还没有申购
      //     this.btntextLabel = "立即申购";
      //     this.btnactive = true;
      //     this.tipMsg = "申购将于"+this.productdetail.purchaseEnd+"结束";
      //   }
      //   else if(this.productdetail.isPurchase == 1) //申购过
      //   {
      //     //如果已经报名 还没有申购
      //     this.btntextLabel = "已申购";
      //     this.btnactive = false;
      //     this.tipMsg = "申购将于"+this.productdetail.purchaseEnd+"结束";
      //   }
      //   else if(this.productdetail.isPurchase == 2) //申购过
      //   {
      //     //如果已经报名 还没有申购
      //     this.btntextLabel = "无权参与";
      //     this.btnactive = false;
      //     this.tipMsg = "申购将于"+this.productdetail.purchaseEnd+"结束";
      //   }
        
      // }
      // else
      // {
      //   //如果未报名
      //   this.btntextLabel = "无权参与";
      //   this.btnactive = false;
      //   this.tipMsg = "未报名或未达到分配签号条件";
      // }
    }
    //申购已截止,摇号还未开始
    else if(currenttime>=shengoukaishi && currenttime > shengouend && currenttime <= yaohaokaishi)
    {
      console.log("申购已截止,摇号还未开始")
        this.btntextLabel = "申购已结束";
        this.btnactive = false;
        this.tipMsg = "将于"+this.productdetail.lotterStart+"进行摇号";
    }
    //摇号开始
    else if(currenttime>=yaohaokaishi && currenttime <= yaohaoend)
    {
      console.log("摇号开始")
      this.btntextLabel = "申购结束";
      this.btnactive = false;
      this.tipMsg = "中签结果将于"+this.productdetail.published+"公示";
    }
    //摇号结束 未公布结果
    else if(currenttime >= yaohaokaishi && currenttime > yaohaoend && currenttime < gongbujieguo)
    {
      console.log("摇号结束 未公布结果")
      this.btntextLabel = "待公布";
      this.btnactive = false;
      this.tipMsg = "中签结果将于"+this.productdetail.published+"公示";
    }
    //公布结果
    else if(currenttime >= gongbujieguo)
    {
      console.log("公布结果")
      this.btntextLabel = "查看中签结果";
      this.btnactive = true;
      this.tipMsg = "本IEO项目活动已结束";
    }






    //1 未开始,变灰不可点击   tipMsg报名将于xxxx-xx-xx  xx:xx 开始
    // if(this.active == 1)
    // {
    //   this.btntextLabel = "未开始";
    //   this.btnactive = false;
    //   this.tipMsg = "报名将于"+this.productdetail.positionStart+"开始";
    // }
    // //2 预热 我要报名,按钮可点击  tipMsg报名将于xxxx-xx-xx  xx:xx 开始     我已报名变灰不可点击
    // else if(this.active == 2)
    // {
    //   if(this.productdetail.isPosition == 1)
    //   {
    //     //如果我已经报过名,就不能点击,文字我已报名,不可点击
    //     this.btntextLabel = "我已报名";
    //     this.btnactive = false;
    //     this.tipMsg = "报名将于"+this.productdetail.positionEnd+"结束";
    //   }
    //   else
    //   {
    //     //如果我还没有报名就可以报名,按钮可以点击
    //     this.btntextLabel = "我要报名";
    //     this.btnactive = true;
    //     this.tipMsg = "报名将于"+this.productdetail.positionEnd+"结束";
    //   }
    // }


    // //3 申购 如果可以参加:立即申购 tipMsg申购将于xxxx-xx-xx  xx:xx 结束； 需要二级弹窗  已申购变灰不可点击
    // else if(this.active == 3)
    // {
    //   // this.btntextLabel = "立即申购";
    //   //     this.btnactive = true;
    //   //     this.tipMsg = "申购将于"+this.productdetail.purchaseEnd+"结束";


    //   //已经报名
    //   if(this.productdetail.isPosition == 1)
    //   {
    //     //没申购
    //     if(this.productdetail.isPurchase == 3)
    //     {
    //       //如果已经报名 还没有申购
    //       this.btntextLabel = "立即申购";
    //       this.btnactive = true;
    //       this.tipMsg = "申购将于"+this.productdetail.purchaseEnd+"结束";
    //     }
    //     else if(this.productdetail.isPurchase == 1) //申购过
    //     {
    //       //如果已经报名 还没有申购
    //       this.btntextLabel = "已申购";
    //       this.btnactive = false;
    //       this.tipMsg = "申购将于"+this.productdetail.purchaseEnd+"结束";
    //     }
    //     else if(this.productdetail.isPurchase == 2) //申购过
    //     {
    //       //如果已经报名 还没有申购
    //       this.btntextLabel = "无权参与";
    //       this.btnactive = false;
    //       this.tipMsg = "申购将于"+this.productdetail.purchaseEnd+"结束";
    //     }
        
    //   }
    //   else
    //   {
    //     //如果未报名
    //     this.btntextLabel = "无权参与";
    //     this.btnactive = false;
    //     this.tipMsg = "未报名或未达到分配签号条件";
    //   }
    // }


    // //摇号
    // else if(this.active == 4)
    // {
    //   this.btntextLabel = "申购结束";
    //   this.btnactive = false;
    //   this.tipMsg = "中签结果将于"+this.productdetail.published+"公示";
    // }

    // //5 公布结果  查看中签结果 
    // else if(this.active == 5)
    // {
    //   this.btntextLabel = "查看中签结果";
    //   this.btnactive = true;
    //   this.tipMsg = "本IEO项目活动已结束";
    // }
    // //6 已结束 申购结束
    // else if(this.active == 6)
    // {
    //   this.btntextLabel = "查看中签结果";
    //   this.btnactive = true;
    //   this.tipMsg = "本IEO项目活动已结束";
    // }
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

.parent{
        width:94%;
        height:15rem;
        background:rgba(26,27,48,1);
        border-radius:8px;
        margin-left: calc(100% * 0.03);
        margin-top: 1rem;
        padding-left: 1rem;
        padding-top: 1rem;
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
        .more{
          width: 100%;
          height: 4rem;
          line-height: 4rem;
          text-align: center;
          font-size:13px;
          font-family:PingFangSC-Regular,PingFang SC;
          font-weight:400;
          color:rgba(30,252,241,1);
        }

        .select-content{
        width: 96%;
        display: flex;
        flex-direction: row;
        margin-top: 1rem;
        padding-top: 1rem;
        border-top: 0.08rem solid rgba(255, 255, 255, 0.1);
        .select-title{
          width:5rem;
          height:22px;
          font-size:1.2rem;
          font-family:PingFangSC-Medium,PingFang SC;
          font-weight:500;
          color:rgba(255,255,255,1);
          line-height:22px;
        }
        img{
          position: absolute;
          right: 2rem;
          margin-top: 0.5rem;
        }
        }

        .select-content1{
        width: 96%;
        display: flex;
        flex-direction: row;
        margin-top: 1rem;
        padding-top: 1rem;
        border-top: 0.08rem solid rgba(255, 255, 255, 0.1);
        .select-title{
          width:5rem;
          height:22px;
          font-size:1.2rem;
          font-family:PingFangSC-Medium,PingFang SC;
          font-weight:500;
          color:rgba(255,255,255,1);
          line-height:22px;
        }
        img{
          position: absolute;
          right: 2rem;
          margin-top: 0.5rem;
        }
        }
}

.parent2{
        width:94%;
        height:auto;
        background:rgba(26,27,48,1);
        border-radius:8px;
        margin-left: calc(100% * 0.03);
        margin-top: 1rem;
        padding-left: 1rem;
        padding-top: 1rem;
        padding-bottom: 1rem;
        .more{
          width: 100%;
          height: 4rem;
          line-height: 4rem;
          text-align: center;
          font-size:13px;
          font-family:PingFangSC-Regular,PingFang SC;
          font-weight:400;
          color:rgba(30,252,241,1);
        }

        .select-content{
        width: 96%;
        display: flex;
        flex-direction: row;
        margin-top: 1rem;
        padding-top: 1rem;
        border-top: 0.08rem solid rgba(255, 255, 255, 0.3);
        .select-title{
          width:5rem;
          height:22px;
          font-size:1.2rem;
          font-family:PingFangSC-Medium,PingFang SC;
          font-weight:500;
          color:rgba(255,255,255,1);
          line-height:22px;
        }
        img{
          position: absolute;
          right: 2rem;
        }
        }

        .select-content1{
        width: 96%;
        display: flex;
        flex-direction: row;
        margin-top: 1rem;
        padding-top: 1rem;
        border-top: 0.08rem solid rgba(255, 255, 255, 0.1);
        .select-title{
          width:5rem;
          height:22px;
          font-size:1.2rem;
          font-family:PingFangSC-Medium,PingFang SC;
          font-weight:500;
          color:rgba(255,255,255,1);
          line-height:22px;
        }
        img{
          position: absolute;
          right: 2rem;
        }
        }
}

.kongxi{
  height: 5rem;
  width: 100%;
}



.top-content{
  background: #0F0F12;
  .coindetail{
    display: flex;
    flex-direction: row;

    img{
      width: 11rem;
      height: 7rem;
      margin-left: 1rem;
      margin-top: 2rem;
      border-radius:8px;
// background-clip:padding-box;
// border-top-left-radius: 1rem;
// border-top-right-radius:1rem;
// border-bottom-right-radius: 1rem;
// border-bottom-left-radius: 1rem;
    }

    .right-content{
      flex: 5;
      padding-top: 2.5rem;
      padding-left: 0.8rem;
      color: white;
      .title-des{
        width:100%;
        height:auto;
        font-size:1.6rem;
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
}

.bottom-content{
  background: #26253A;
}

      .hori-parent{
        display: flex;
        flex-direction: row;
        width: 100%;
        margin-top: 1rem;
        height: auto;
        padding-left: 2rem;
        padding-top: 1rem;
        padding-bottom: 1rem;
      }
      .item-detail-title{
        width: 10rem;
        font-size:1rem;
        font-family:PingFangSC-Medium,PingFang SC;
        font-weight:500;
        color:rgba(255,255,255,0.6);
        line-height:16px;
        padding-right: 5rem;
      }
      .item-content{
        width: 10rem;
        font-size:1rem;
        font-family:PingFangSC-Medium,PingFang SC;
        font-weight:500;
        color:rgba(255,255,255,1);
        line-height:20px;
      }

      .steps-parent{
        display: flex;
        flex-direction: row;
        padding-left: 0.7rem;
        padding-top: 1rem;
      }

      .steps{
        color: red;
        width: 3rem;
        height: 3rem;
        line-height: 3rem;
        text-align: center;
        font-size: 1.5rem;
      }
      .steps-name-guo{
        width:36px;
        height:16px;
        font-size:11px;
        font-family:PingFangSC-Semibold,PingFang SC;
        font-weight:600;
        color:#B2124C;
        line-height:16px;
        padding-top: 1rem;
        text-align: center;
      }
      .steps-name-buguo{
        width:36px;
        height:16px;
        font-size:11px;
        font-family:PingFangSC-Semibold,PingFang SC;
        font-weight:600;
        color:#9294A5;
        line-height:16px;
        padding-top: 1rem;
        text-align: center;
      }
      .steps-time-guo{
        width:6rem;
        height:2rem;
        font-size:10px;
        font-family:PingFangSC-Medium,PingFang SC;
        font-weight:500;
        color:#B2124C;
        line-height:14px;
        padding-top: 1.4rem;
        margin-left: -1.3rem;
        text-align: center;
      }
      .steps-time-buguo{
        width:6rem;
        height:2rem;
        font-size:10px;
        font-family:PingFangSC-Medium,PingFang SC;
        font-weight:500;
        color:#A2A3B7;
        line-height:14px;
        padding-top: 1.4rem;
        margin-left: -1.3rem;
        text-align: center;
      }


      .steps-guo{
          width: 3rem;
          height: 3rem;
          background: #5D1537;
          border-radius:10rem;
          color: #C10C43;
          
        }

        .fengexian-guo{
          width: calc(100%/7);
          height: 0.09rem;
          line-height: 3rem;
          align-self: center;
          background: #5D1537;
          margin-left: 0.3rem;
          margin-right: 0.3rem;
        }
        .fengexian-buguo{
          width: calc(100%/7);
          height: 0.09rem;
          line-height: 3rem;
          align-self: center;
          background: #47495D;
          margin-left: 0.3rem;
          margin-right: 0.3rem;
        }

        .steps-buguo{
          width: 3rem;
          height: 3rem;
          background: #47495D;
          border-radius:10rem;
          color: #ffffff;
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
          width:8rem;
          height:1rem;
          font-size:1.1rem;
          font-family:PingFangSC-Semibold,PingFang SC;
          font-weight:600;
          color:rgba(193,12,67,1);
          line-height:17px;
          position: absolute;
          right: 2rem;
          line-height: 2rem;
          text-align: right;
        }

      }

      .destailmsg{
        width:100%;
        height:auto;
        font-size:1rem;
        font-family:PingFangSC-Regular,PingFang SC;
        font-weight:400;
        color:rgba(255,255,255,0.6);
        line-height:1.8rem;
        text-align: justify;
        text-justify: distribute;
        padding-right: 1rem;

        overflow: hidden;
    -webkit-line-clamp: 5;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
      }


      .msgParent{
        width: 96%;
        display: flex;
        flex-direction: row;
        padding-bottom: 1rem;
        padding-top: 1rem;
        border-bottom:1rem .083333rem solid rgba(255, 255, 255, 0.1);
        .msgname{
          width:20rem;
          height:2rem;
          font-size:1.1rem;
          font-family:PingFangSC-Medium,PingFang SC;
          font-weight:500;
          color:rgba(255,255,255,0.6);
          line-height:22px;
        }

        .msgcontent{
          width:70%;
          height:auto;
          font-size:1.1rem;
          font-family:PingFangSC-Medium,PingFang SC;
          font-weight:500;
          color:rgba(255,255,255,1);
          line-height:22px;
          text-align: right;
        }


      }
      .ve-ring{
        width:90%;
          
      }

      .tiaomuparent1{
        display: flex;
        flex-direction: row;
        align-items: center;
        .dat{
          width:0.5rem;
          height:0.5rem;
          background: #C30A44;
          border-radius:3rem;
          margin-right: 0.5rem;
        }
        .tiaomutitle{
          width:auto;
          height:2rem;
          font-size:1.1rem;
          font-family:PingFangSC-Semibold,PingFang SC;
          font-weight:500;
          color:rgba(255,255,255,0.6);
          line-height:20px;
        }
        .tiaomucontent{
          width:6rem;
          height:2rem;
          font-size:1.2rem;
          font-family:PingFangSC-Semibold,PingFang SC;
          font-weight:500;
          color:rgba(255,255,255,1);
          line-height:20px;
        }

      }

      .tiaomuparent2{
        display: flex;
        flex-direction: row;
        align-items: center;
        .dat{
          width:0.5rem;
          height:0.5rem;
          background: #1FFBF0;
          border-radius:3rem;
          margin-right: 0.5rem;
        }
        .tiaomutitle{
          width:6rem;
          height:2rem;
          font-size:1.1rem;
          font-family:PingFangSC-Semibold,PingFang SC;
          font-weight:500;
          color:rgba(255,255,255,0.6);
          line-height:20px;
        }
        .tiaomucontent{
          width:6rem;
          height:2rem;
          font-size:1.2rem;
          font-family:PingFangSC-Semibold,PingFang SC;
          font-weight:500;
          color:rgba(255,255,255,1);
          line-height:20px;
        }

      }
      .tiaomuparent3{
        display: flex;
        flex-direction: row;
        align-items: center;
        .dat{
          width:0.5rem;
          height:0.5rem;
          background: #dbdbe3;
          border-radius:3rem;
          margin-right: 0.5rem;
        }
        .tiaomutitle{
          width:6rem;
          height:2rem;
          font-size:1.1rem;
          font-family:PingFangSC-Semibold,PingFang SC;
          font-weight:500;
          color:rgba(255,255,255,0.6);
          line-height:20px;
        }
        .tiaomucontent{
          width:6rem;
          height:2rem;
          font-size:1.2rem;
          font-family:PingFangSC-Semibold,PingFang SC;
          font-weight:500;
          color:rgba(255,255,255,1);
          line-height:20px;
        }

      }

      .tiaomuparent4{
        display: flex;
        flex-direction: row;
        align-items: center;
        .dat{
          width:0.5rem;
          height:0.5rem;
          background: #F08080;
          border-radius:3rem;
          margin-right: 0.5rem;
        }
        .tiaomutitle{
          width:6rem;
          height:2rem;
          font-size:1.1rem;
          font-family:PingFangSC-Semibold,PingFang SC;
          font-weight:500;
          color:rgba(255,255,255,0.6);
          line-height:20px;
        }
        .tiaomucontent{
          width:6rem;
          height:2rem;
          font-size:1.2rem;
          font-family:PingFangSC-Semibold,PingFang SC;
          font-weight:500;
          color:rgba(255,255,255,1);
          line-height:20px;
        }

      }

      .tiaomuparent5{
        display: flex;
        flex-direction: row;
        align-items: center;
        .dat{
          width:0.5rem;
          height:0.5rem;
          background: #EE4000;
          border-radius:3rem;
          margin-right: 0.5rem;
        }
        .tiaomutitle{
          width:6rem;
          height:2rem;
          font-size:1.1rem;
          font-family:PingFangSC-Semibold,PingFang SC;
          font-weight:500;
          color:rgba(255,255,255,0.6);
          line-height:20px;
        }
        .tiaomucontent{
          width:6rem;
          height:2rem;
          font-size:1.2rem;
          font-family:PingFangSC-Semibold,PingFang SC;
          font-weight:500;
          color:rgba(255,255,255,1);
          line-height:20px;
        }

      }

      .bottomendtime{
        background: #44203A;
        width: 100%;
        height: 2.4rem;
        margin-top: 8rem;
        color: #961643;
        line-height: 2.4rem;
        text-align: center;
      }

      .bottombaomingcontent{
        background: #171417;
        width: 100%;
        height: 5.9rem;
        .btnbaomingparent{
          position: relative;
          .btnbg{
            background: #C10B44;
            width: 80%;
            height: 3.5rem;
            transform: skewX(-30deg);
            position: absolute;
            z-index: 0;
            left: 0;
            right: 0;
            margin: 1rem auto;
          }
          .btnbghui{
            background: rgba(255, 255, 255, 0.6);
            width: 80%;
            height: 3.5rem;
            transform: skewX(-30deg);
            position: absolute;
            z-index: 0;
            left: 0;
            right: 0;
            margin: 1rem auto;
          }
          .btntitle{
            color: white;
            position: absolute;
            z-index: 1;
            line-height: 3.5rem;
            font-weight:600;
            width: 80%;
            text-align: center;
            left: 0;
            right: 0;
            margin: 1rem auto;
          }
          .btntitlehui{
            color: rgba(255, 255, 255, 0.6);
            position: absolute;
            z-index: 1;
            line-height: 3.5rem;
            font-weight:600;
            width: 80%;
            text-align: center;
            left: 0;
            right: 0;
            margin: 1rem auto;
          }
        }

      }

      .van-popup{
    background:transparent;
  }
  .popcontent{
    width: 100%;
    height: 16rem;
    background:rgba(26,27,48,1);
    border-radius:9px;
    padding-top: 1rem;
    padding-left: 1.5rem;
    .gongneng{
      font-family:PingFangSC-Medium,PingFang SC;
        font-weight:500;
      color: white;
      font-size: 1.2rem;
    }
    
  }

  .inputparent{
    display: flex;
    flex-direction:row;
    text-align: center;
    padding-left: 2rem;
    padding-top: 2rem;
  }

  .useridtitle{
    line-height: 2.6rem;
    text-align: center;
    font-family:PingFangSC-Medium,PingFang SC;
        font-weight:500;
      color: white;
      font-size: 1rem;
    
  }

  .input_content {
        background: rgba(26,27,48,1);
        border: 0.1rem solid rgba(255, 255, 255, 0.3);
        box-shadow: 0 0.1rem 0.11rem 0 rgba(0, 0, 0, 0);
        border-radius: 0.1rem;
        border-radius: 0.1rem;
        width: 60%;
        height: 2rem;
        margin-left: 1rem;
        padding-left: 1rem;
      }

      .bottombaomingcontent1{
        width: 100%;
        height: 6rem;
        margin-top: 1rem;
        .btnbaomingparent1{
          position: relative;
          .btnbg1{
            background: #C10B44;
            width: 80%;
            height: 3.5rem;
            transform: skewX(-30deg);
            position: absolute;
            z-index: 0;
            left: 0;
            right: 0;
            margin: 1rem auto;
          }
          .btntitle1{
            color: white;
            position: absolute;
            z-index: 1;
            line-height: 3.5rem;
            font-weight:600;
            width: 80%;
            text-align: center;
            left: 0;
            right: 0;
            margin: 1rem auto;
          }
        }

      }

      .scroll{
        overflow: hidden;

        position: absolute;
        top: 0rem;
        bottom: 8rem;
        left: 0;
        right: 0;
      }
      .bottombottom{
        position: absolute;
        bottom: 0;
        left: 0;
        right:0;
      }

      .zhongqiangongshi{
        background: rgba(26,27,48,1);
        width: 28rem;
        height: auto;
        color: white;
        border-radius:8px;

        .gongshititle{
          width: 100%;
          height: 3rem;
          line-height: 3rem;
          text-align: center;
          font-size: 1.2rem;
          padding-bottom: 0.4rem;
          width: 100%;
          border-bottom: 1rem 0.08rem solid rgba(255, 255, 255, 0.1);
          margin-bottom: 0.7rem;
        }

        .gongsitiaomu{
          display: flex;
          flex-direction: row;
          padding-left: 1rem;
          padding-right: 1rem;
          margin-bottom: 0.7rem;
          .totalnumber{
            color: rgba(255, 255, 255, 0.3);
          }
          .number{
            position: absolute;
            right: 1rem;
          }
        }

        .zhongcode{
          padding-left: 1rem;
          margin-bottom: 0.4rem;
          color: rgba(255, 255, 255, 1);
        }
        .zhongcontent{
          color: white;
word-break: break-all;
  word-wrap: break-word;

          margin-left: 1rem;
          margin-right: 1rem;

          .contentparent{
            display: flex;
            flex-direction: row;
            padding-left: 1rem;
            height: 2rem;
            line-height: 2rem;
            text-align: center;
            .contenttitle{

            }
            .contentnumber{
              position: absolute;
              left: 6rem;
              right: 1rem;
              text-align: right;
              height: 2rem;
              
            }
          }

        }
        .tempkong{
          width: 100%;
          height: 1rem;
          line-height: 1rem;
        }

        .testparent{
          display: flex;
          flex-direction: row;
          padding-top: 0.6rem;
          
          
          .testone{
            width:7rem;
            color: rgba(255, 255, 255, 0.3);
          }
          .testtwo{
            
              width: 80%;
              text-align: right;
          }
        }
      }
</style>