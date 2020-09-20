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
        <div class="btnparent" @click="onOk">
          <div class="btnbaomingparent">
              <div class="btnbg"></div>
              <div class="btntitle">确定</div>
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

  .btnbaomingparent{
          position: relative;
          .btnbg{
            background: #C10B44;
            width: 80%;
            height: 3rem;
            transform: skewX(-30deg);
            position: absolute;
            z-index: 0;
            left: 0;
            right: 0;
            margin: 1rem auto;
          }
          .btntitle{
            font-size: 1.2rem;
            color: white;
            position: absolute;
            z-index: 1;
            line-height: 3rem;
            font-weight:600;
            width: 80%;
            text-align: center;
            left: 0;
            right: 0;
            margin: 1rem auto;
          }
        }
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
      width: 15.05rem;
      height: 3.7333rem;
      // background: url("../../static/btnbgxt.png");
      margin-left: 3rem;
    }
    .btncontent{
      color: white;
      line-height: 3.7333rem;
      font-size: 1.2rem;
    }
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