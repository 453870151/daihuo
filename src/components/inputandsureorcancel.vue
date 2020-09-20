<template>
  <transition name="mybox">
    <div class="my-modal" @click="onClose"  @touchmove='prevent'>
      <div class="inner-box" @click.stop="prevent">
        <!-- <img class="close" src="../assets/close.png" @click="onClose"> -->
        <!-- <img class="success" v-if="type=='success'" src="../assets/smil.png">
        <img class="error" v-else src="../assets/error.png"> -->
        <div class="title">{{title}}</div>
        <div class="desc">{{desc}}</div>
        <!-- <div class="btn">
          <button @click="onOk">{{btnText}}</button>
        </div> -->
        <!-- <input type="number" :maxlength="8" style="color: #fff;font-size:14px;" v-model="inputcontent" class="input_content" placeholder="请输入银行卡开户者姓名"> -->
        <div class="btnparent">
          
          <div class="btncancel" @click="onClose">取消</div>
          <div class="surebtnParent">
              <div class="surebtnbg"></div>
              <div class="btncontent"  @click="onOk">{{btnText}}</div>
          </div>
          
        </div>
        
      </div>
    </div>
  </transition>
</template>

<script>
export default {
    // props: {
    //   type: {
    //     type: String,
    //     default: "success"
    //   },
    //   title: {
    //     type: String,
    //     default: "成功"
    //   },
    //   desc: {
    //     type: String,
    //     default: ""
    //   },
    //   btnText: {
    //     type: String,
    //     default: "確定"
    //   }
    // },
  data() {
    return {
        inputcontent:"",
      type: {
        type: String,
        default: "success"
      },
      title: {
        type: String,
        default: "成功"
      },
      desc: {
        type: String,
        default: ""
      },
      btnText: {
        type: String,
        default: "確定"
      }
    };
  },
  created() {},
  methods: {
    onOk() {
    console.log("确定===>>>>"+this.inputcontent)

      this.$emit("done");
    },
    onClose(){
      this.$emit('close');
    },
    prevent() {}
  }
};
</script>

<style scoped lang="less">
.my-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  .inner-box {
    padding: 2.2rem 2rem 1.666667rem 2rem;
    width: 25rem;
    background: #252638;
    box-shadow: 0rem 0.166667rem 3.333333rem 0rem rgba(148, 143, 255, 0.15);
    border-radius: 0.333333rem;
    position: relative;
    text-align: center;
    box-sizing: border-box;
    word-wrap: break-word;
    word-break: normal;
    .close {
      position: absolute;
      right: 2.083333rem;
      top: 2.083333rem;
      width: 1.6rem;
      height: auto;
      cursor: pointer;
    }
    .success,
    .error {
      width: 45px;
      height: auto;
    }
    .title {
      font-size: 16px;
      font-family: PingFangSC;
      font-weight: 600;
      color:rgba(255,255,255,1);
      margin-top: 12px;
      width: 100%;
    }
    .desc {
      padding: 0.833333rem 4.166667rem;
      font-size: 1.166667rem;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      color: rgba(255,255,255,1);
    }
    button {
      outline: none;
      border: none;
      margin-top: 1.666667rem;
      width: 21.666667rem;
      height: 4.166667rem;
      // background: linear-gradient(
      //   177deg,
      //   rgba(254, 233, 176, 1) 0%,
      //   rgba(254, 190, 84, 1) 100%
      // );
      border-radius: 0.333333rem;
      font-size: 1.333333rem;
      font-family: PingFangSC-Semibold;
      font-weight: 600;
      color: #303138;
    }

    .btnparent{
      display: flex;
      flex-direction: row;
      width: 15.05rem;
      height: 3.7333rem;
      
      margin-left: 3rem;
    }
    .btncancel{
        flex: 1;
      color: white;
      line-height: 3.7333rem;
      scale: 0.3;
      font-size: 1.2rem;
      text-align: left;
    }
    .surebtnParent{
        position: relative;
        .surebtnbg{
        flex: 1;
        position: absolute;
        background: #C00C44;
        z-index: 0;
        width: 8rem;
        height: 2.5rem;
        transform: skewX(-20deg);
        right: -3rem;
        top: 0.5rem;
    }
    }
    

    .btncontent{
        flex: 1;
      color: white;
      line-height: 3.7333rem;
      scale: 0.3;
      font-size: 1.2rem;
      position: absolute;
      z-index: 1;
      width: 8rem;
      right: -2.8rem;
    }


    // .input_content{
    //   background: rgba(255,255,255,0.16);
    //   border: 1px solid rgba(255,255,255,0.30);
    //   box-shadow: 0 0.1rem 0.11rem 0 rgba(0,0,0,0.10);
    //   border-radius: 4px;
    //   width: 18.5rem;
    //   height: 3rem;
    //   margin-top: 1rem;
    //   padding-left: 1rem;       
    // }
    // .input_content::-webkit-input-placeholder{
    //   font-family: PingFangSC-Regular;
    //   font-size: 0.9rem;
    //   color: rgba(255,255,255,0.50);
    //   letter-spacing: 0.01rem;
    // }

    // .btnbg{
    //   height: 2.7rem;
    //   width: 12rem;
    //   transform: skewX(-20deg);
    //   background: #C30A44;
    //   margin-left: 4.5rem;
    // }
    // .btncontent{
      
    // }
  }
}
</style>