<template>
  <div class="scroll-bar">
    <div class="box">
      <div class="carousel-messagebox" :style="mystyle">
        <transition-group tag="ul" name="list" enter-active-class="animated fadeInUp"
          leave-active-class="animated fadeOutUp">
          <li @click="todetail(item.id)" :style="mystyle" v-show="idx == isCurrent" v-for="(item, idx) in messageList"
            v-bind:key="'i'+idx" :class="['carousel-message']">
            <div class="title">{{item.title}}</div>
          </li>
        </transition-group>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isCurrent: 0
      //   messageList: [
      //     {
      //       id: 2,
      //       title: "111BICC火热上线1111",
      //       description: "1111BICC上线了！！！上线测试！！！",
      //       create_time: "2019-08-21 13:57:09"
      //     },
      //     {
      //       id: 2,
      //       title: "222BICC火热上线22222",
      //       description: "2222BICC上线了！！！上线测试！！！",
      //       create_time: "2019-08-21 13:57:09"
      //     },
      //     {
      //       id: 2,
      //       title: "333BICC火热上线3333",
      //       description: "3333BICC上线了！！！上线测试！！！",
      //       create_time: "2019-08-21 13:57:09"
      //     }
      //   ]
    };
  },
  props: {
    mystyle: {
      type: String,
      default: ""
    },
    showTitle: {
      type: Boolean,
      default: false
    },
    ishome: {
      type: Boolean,
      default: false
    },
    messageList: {
      type: [Array,null],
      default: []
    }
  },
  methods: {
    todetail(id) {
      if (this.ishome) {
        this.$router.push("/homeNotice/" + id);
      } else {
        this.$router.push("/news");
      }
    },
    autoPlay() {
      let length = this.messageList.length;
      if (length != 0) {
        if (this.isCurrent >= length) {
          this.isCurrent = 0;
          this.autoPlay();
        } else {
          setTimeout(() => {
            this.isCurrent++;
            this.autoPlay();
          }, 4000);
        }
      }
    }
  },
  mounted() {
   // console.log(this.messageList);
    this.autoPlay();
  }
};
</script>

<style lang="less" scoped>
// @import "../animate.css";

.carousel-messagebox {
  height: 2.5rem;
}
.carousel-message {
  width: 82%;
  height: 2.5rem;
  line-height: 2.5rem;
  position: absolute;
  color: #fff;
  //   display: -webkit-box;
  //   -webkit-box-pack: left;
  //   -webkit-box-align: center;
  font-size: 1.166667rem;
  font-family: PingFangSC;
  font-weight: 500;
  color: rgba(153, 153, 153, 1);
  display: flex;
  flex-direction: column;
  justify-content: center;
  .title {
    font-size: 1.333333rem;
    line-height: 1;
  }
  .desc {
    line-height: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-top: 10px;
    width: 100%;
  }
}
.animated {
  -webkit-animation-duration: 1s;
  animation-duration: 1s;
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both;
}

@-webkit-keyframes fadeInUp {
  from {
    opacity: 0;
    -webkit-transform: translate3d(0, 100%, 0);
    transform: translate3d(0, 100%, 0);
  }

  to {
    opacity: 1;
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
  }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    -webkit-transform: translate3d(0, 100%, 0);
    transform: translate3d(0, 100%, 0);
  }

  to {
    opacity: 1;
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
  }
}

.fadeInUp {
  -webkit-animation-name: fadeInUp;
  animation-name: fadeInUp;
}
@-webkit-keyframes fadeOutUp {
  from {
    opacity: 1;
  }

  to {
    opacity: 0;
    -webkit-transform: translate3d(0, -100%, 0);
    transform: translate3d(0, -100%, 0);
  }
}

@keyframes fadeOutUp {
  from {
    opacity: 1;
  }

  to {
    opacity: 0;
    -webkit-transform: translate3d(0, -100%, 0);
    transform: translate3d(0, -100%, 0);
  }
}

.fadeOutUp {
  -webkit-animation-name: fadeOutUp;
  animation-name: fadeOutUp;
}
</style>