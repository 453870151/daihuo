<template>
  <div>
    <div class="count">
      <div class="time">{{content}}</div>
    </div>
    <div class="date" v-if="!end">
      <span v-if="start">開始倒計時</span>
      <span v-else>結束倒計時</span>
      {{endDate}}
    </div>
  </div>
</template>
<script>
function add0(m) {
  return m < 10 ? "0" + m : m;
}
function format(shijianchuo) {
  //shijianchuo是整数，否则要parseInt转换
  var time = new Date(shijianchuo);
  var y = time.getFullYear();
  var m = time.getMonth() + 1;
  var d = time.getDate();
  var h = time.getHours();
  var mm = time.getMinutes();
  var s = time.getSeconds();
  return (
    y +
    "-" +
    add0(m) +
    "-" +
    add0(d) +
    " " +
    add0(h) +
    ":" +
    add0(mm) +
    ":" +
    add0(s)
  );
}
export default {
  data() {
    return {
      content: "00:00:00",
      start: true,
      end: false,
      timer: null,
      endDate: "00:00:00"
    };
  },
  props: {
    startTime: {
      type: [String, Number],
      default: ""
    },
    endTime: {
      type: [String, Number],
      default: ""
    },
    currentTime: {
      type: [String, Number],
      default: ""
    },
    endText: {
      type: String,
      default: "已结束"
    },
    callback: {
      type: Function,
      default: ""
    },
    statuscfg: {
      type: [String, Number],
      default: 0
    }
  },
  watch: {
    statuscfg(n, o) {
      this.init();
     // console.log(this.second);
    }
  },
  mounted() {
    this.init();
  },
  //   computed: {
  //     endDate() {
  //       return format(parseInt(this.endTime));
  //     }
  //   },
  destroyed() {
    clearInterval(this.timer);
  },
  methods: {
    init() {
      // console.log(this.statuscfg)
      if (this.statuscfg == 0) {
        this.start = true;
        this.countdowm(this.currentTime, this.startTime);
        this.endDate = format(parseInt(this.startTime));
      } else if (this.statuscfg == 1) {
        this.start = false;
        this.countdowm(this.currentTime, this.endTime);
        this.endDate = format(parseInt(this.endTime));
      } else {
        clearInterval(this.timer);
        this.start = false;
        this.content = "已結束";
        this.end = true;
      }
    },
    countdowm(currentTime, timestamp) {
      let self = this;
      let t = Math.abs(timestamp - currentTime) + 2000;
      self.timer = setInterval(function() {
        t -= 1000;
        if (t >= 0) {
          let day = Math.floor(t / 86400000);
          let hour = Math.floor((t / 3600000) % 24);
          let min = Math.floor((t / 60000) % 60);
          let sec = Math.floor((t / 1000) % 60);
          hour = hour < 10 ? "0" + hour : hour;
          min = min < 10 ? "0" + min : min;
          sec = sec < 10 ? "0" + sec : sec;
          let format = "";
          if (day > 0) {
            format = `${day}天 ${hour}:${min}:${sec}`;
          }
          if (day <= 0) {
            format = `${hour}:${min}:${sec}`;
          }
          self.content = format;
        } else {
          clearInterval(self.timer);
          self._callback();
        }
      }, 1000);
    },

    _callback() {
      if (this.callback && this.callback instanceof Function) {
        this.callback(...this);
      }
    }
  }
};
</script>
<style lang="less" scoped>
.time {
  color: #FC8030;
  font-size: 2.833333rem;
  font-family: RobotoCondensed-Bold;
  font-weight: bold;
}
.date {
  margin-top: 0.333333rem;
  font-size: 1.166667rem;
  font-family: PingFangSC-Semibold;
  font-weight: 600;
  color: rgba(148, 153, 171, 1);
  span {
    display: inline-block;
    padding: 0.166667rem 0.4rem;
    background: #febe54;
    border-radius: 0.25rem;
    font-size: 1.166667rem;
    font-family: PingFangSC-Semibold;
    font-weight: 600;
    color: rgba(255, 255, 255, 1);
  }
}
</style>
