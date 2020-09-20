<template>
  <div class="footer-box">
    <div class="home" @click="chooseTab('home')">
      <div v-if="active=='home'">
        <img src="../assets/images/footer/home.png" />
        <div class="active">首頁</div>
      </div>
      <div v-else>
        <img src="../assets/images/footer/home0.png" />
        <div class="no">首頁</div>
      </div>
    </div>
    <div class="main" @click="chooseTab('game')">
      <div v-if="active=='game'">
        <img src="../assets/images/footer/game.png" />
        <div class="active">遊戲</div>
      </div>
      <div v-else>
        <img src="../assets/images/footer/game0.png" />
        <div class="no">遊戲</div>
      </div>
    </div>
    <div class="main" @click="chooseTab('loan')">
      <div v-if="active=='loan'">
        <img src="../assets/images/footer/loan.png" />
        <div class="active">閃貸</div>
      </div>
      <div v-else>
        <img src="../assets/images/footer/loan0.png" />
        <div class="no">閃貸</div>
      </div>
    </div>
    <div class="main" @click="chooseTab('mine')">
      <div v-if="active=='mine'">
        <img src="../assets/images/footer/mine.png" />
        <div class="active">挖礦</div>
      </div>
      <div v-else>
        <img src="../assets/images/footer/mine0.png" />
        <div class="no">挖礦</div>
      </div>
    </div>
    <div class="main" @click="chooseTab('user')">
      <div v-if="active=='user'">
        <img src="../assets/images/footer/main.png" />
        <div class="active">我的</div>
      </div>
      <div v-else>
        <img src="../assets/images/footer/main0.png" />
        <div class="no">我的</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: ""
    };
  },
  watch: {
    $route(newValue, oldValue) {
      let name = newValue.name;
      this.active = name;
    }
  },
  created() {
    let name = this.$route.name;
    this.active = name;
  },
  methods: {
    chooseTab(name) {
      this.active = name;
      this.$router.push({ name: name });
    }
  }
};
</script>

<style scoped lang='less'>
.footer-box {
  height: 4.166667rem;
  width: 100%;
  position: fixed;
  left: 0;
  bottom: 0;
  display: flex;
  background: #fff;
  justify-content: space-around;
  align-items: center;
  box-shadow: 0rem -0.833333rem 1.666667rem 0rem rgba(46, 70, 120, 0.05);
  z-index: 500;
  overflow: hidden;
  & > div {
    flex: 1;
    text-align: center;
    img {
      height: 1.666667rem;
    }
    div {
      font-size: 0.916667rem;
      color: #727289;
    }
    div.active {
      color: #cdab7f;
    }
  }
}
</style>