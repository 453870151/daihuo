<template>
  <div>
    <button class="count" v-if="show">{{content}} 后開始</button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      content: "00:00:00",
      show: true
    };
  },
  props: {
    starttime: {
      type: [String, Number],
      default: ""
    },
    currentTime: {
      type: [String, Number],
      default: ""
    },
    statuscfg: {
      type: Number,
      default: 0
    },
    callback: {
      type: Function,
      default: ""
    }
  },
  watch: {
    starttime(newValue, oldValue) {
      this.countdowm(this.currentTime, newValue);
    }
  },
  mounted() {
    this.countdowm(this.currentTime, this.starttime);
  },
  methods: {
    countdowm(currentTime, timestamp) {
      let self = this;
      let t = Math.abs(timestamp - currentTime)+2000;
      self.timer = setInterval(function() {
        t -= 1000;
        // console.log(t);
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
button {
  line-height: 2.5rem;
  font-size: 1.166667rem;
  font-weight: 600;
  margin: 0 auto;
  width: 9.583333rem;
  height: 2.5rem;
  background: linear-gradient(
    182deg,
    rgba(80, 226, 175, 1) 0%,
    rgba(20, 172, 127, 1) 100%
  );
  box-shadow: 0rem 0.166667rem 0.333333rem 0rem rgba(0, 0, 0, 0.1);
  border-radius: 0.166667rem;
  border: none;
}
.count {
  width: 10.833333rem;
  background: linear-gradient(
    180deg,
    rgba(213, 239, 231, 0.5) 0%,
    rgba(109, 122, 180, 1) 100%
  );
  box-shadow: 0rem 0.166667rem 0.333333rem 0rem rgba(0, 0, 0, 0.1);
  border-radius: 0.166667rem;
  font-size: 1rem;
  font-family: RobotoCondensed-Bold;
  font-weight: bold;
}
</style>
