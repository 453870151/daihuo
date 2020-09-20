<template>
  <div id="app">
    <div class="container">
      <transition :name="transitionName">
        <keep-alive v-if="$route.meta.footer">
          <router-view></router-view>
        </keep-alive>
        <router-view v-else></router-view>
      </transition>
    </div>
  </div>
</template>

<script>
import cookie from 'js-cookie'
export default {
  components: {  },
  name: "App",
  data() {
    return {
      show: true,
      transitionName: "",
      docmHeight: document.documentElement.clientHeight,
      showHeight: document.documentElement.clientHeight
    };
  },
  mounted() {
    // window.onresize监听页面高度的变化
    var elements = document.getElementById("leader");
    elements.parentNode.removeChild(elements);
    window.onresize = () => {
      return (() => {
        this.showHeight = document.body.clientHeight;
      })();
    };
  },
  created() {
    let name = this.$route.name;
    if (this.$route.meta.footer) {
      this.show = true;
    } else {
      this.show = false;
    }
    this.getCode();
    // console.log("3222222")
    cookie.remove("userToken")
  },
  watch: {
    showHeight(n, o) {
      if (this.docmHeight > n) {
        this.show = false;
      } else {
        this.show = true;
      }
    },
    $route(to, from) {
      
    }
  },
  methods: {
    getCode() {
      var url = window.location.href;
      var arr = "code=";
      var index = url.indexOf(arr);
      if (index != -1) {
        // //console.log(index);
        var code = url.slice(index + 5, url.length);

        if (code) {
          this.$router.push("/register/?code=" + code);
          // window.location.href = "http://192.168.3.190:8080/register/?code="+code;
        } else {
        }
      }
    }
  }
};
</script>

<style lang='less'>
@import "./index.less"; //引入全局less文件
#app {
  font-family: "PingFangSC", Helvetica, Arial, sans-serif;
  font-size: 16px;
  .container {
    background: #171723;
  }
}
</style>
