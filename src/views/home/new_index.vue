 <template>
  <div>
    <headerTop />

    <div class="tabCon">
      <div class="btnCon"> 
         <el-radio-group v-model="tabPosition" style="margin-bottom: 30px;">
          <el-radio-button label="btn1">按客单价</el-radio-button>
          <el-radio-button label="btn2">按总销售额</el-radio-button>
          <el-radio-button label="btn3">按总销量</el-radio-button>
          <el-radio-button label="btn4">按转化率</el-radio-button>
          <el-radio-button label="btn5">按GPM</el-radio-button>
        </el-radio-group>
      </div>
      <el-tabs
        v-model="activeName"
        @tab-click="handleClick"
      >
        <el-tab-pane
          label="全部"
          name="all"
        >
          <tableCon></tableCon>
        </el-tab-pane>
        <el-tab-pane
          label="淘宝"
          name="taobao"
        >
          <tableCon></tableCon>
        </el-tab-pane>
        <el-tab-pane
          label="抖音"
          name="douyin"
        >
          <tableCon></tableCon>
        </el-tab-pane>
      </el-tabs>
    </div>

  </div>
</template>

<script>
import headerTop from "../../components/header";
import tableCon from "../../components/table";
import cookie from "js-cookie";
import axios from "axios";
export default {
  components: {
    headerTop,
    tableCon
  },
  data() {
    return {
      activeName: "all",
      tabPosition: "btn1"
    };
  },
  watch: {},
  mounted() {},
  computed: {},
  created() {},
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    }
  }
};
</script>

<style lang="less">
.tabCon{
  position:relative;
  margin: 30px;
  padding: 20px;
  background: #262837;
  border-radius: 10px;
  .btnCon{
    position:absolute;
    right:0;
    z-index:99;
    .el-radio-group{
      margin-bottom:0 !important;
    }
  }
}
.el-tabs__item {
  color: #fff;
}
</style>