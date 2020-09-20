<template>
  <div class="tableCon">
      <el-table
        :data="tableData"
        style="width: 100%"
      >
        <el-table-column
          prop="name"
          label="商品名称">
        </el-table-column>
        <el-table-column
          prop="zhubo"
          label="带货主播">
        </el-table-column>
        <el-table-column
          prop="ptai"
          label="带货平台">
        </el-table-column>
        <el-table-column
          prop="date"
          label="直播日期">
        </el-table-column>
        <el-table-column
          prop="price"
          label="单品销售额（元）">
        </el-table-column>
        <el-table-column
          prop="xiaoliang"
          label="单品销量（件）">
        </el-table-column>
        <el-table-column
          prop="danjia"
          label="单品价格（元/件）">
        </el-table-column>
        <el-table-column
          prop="zhuanhua"
          label="转化率">
        </el-table-column>
        <el-table-column
          prop="GPM"
          label="GMP">
        </el-table-column>
    </el-table>
    <el-pagination
      background
      layout="prev, pager, next"
      :total="1000">
    </el-pagination>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [{
        name: '网红方便面网红方便面网红方便面',
        zhubo: '王小虎',
        ptai: '淘宝',
        date: '2016-05-02',
        price: '2093',
        xiaoliang: '10000',
        danjia: '18.69',
        zhuanhua: '1.9872%',
        GPM: '19.56'
      }, {
        name: '网红方便面网红方便面网红方便面',
        zhubo: '王小虎',
        ptai: '淘宝',
        date: '2016-05-02',
        price: '2093',
        xiaoliang: '10000',
        danjia: '18.69',
        zhuanhua: '1.9872%',
        GPM: '19.56'
      }, {
        name: '网红方便面网红方便面网红方便面',
        zhubo: '王小虎',
        ptai: '淘宝',
        date: '2016-05-02',
        price: '2093',
        xiaoliang: '10000',
        danjia: '18.69',
        zhuanhua: '1.9872%',
        GPM: '19.56'
      }, {
        name: '网红方便面网红方便面网红方便面',
        zhubo: '王小虎',
        ptai: '淘宝',
        date: '2016-05-02',
        price: '2093',
        xiaoliang: '10000',
        danjia: '18.69',
        zhuanhua: '1.9872%',
        GPM: '19.56'
      }]
    };
  },
  methods: {
    
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  lang='less'>
.el-table th, .el-table tr {
  background-color: #262837;
  color:#fff;
}
.el-table--enable-row-hover .el-table__body tr:hover>td{
  background-color: #262837;
  color:#fff;
}
.el-table td, .el-table th.is-leaf {
  border-bottom: 1px solid #7a7b7d;
}
.el-tabs__nav-wrap:after {
  background-color: transparent;
}
.el-pagination{
  text-align: right;
  margin-top:20px
}
.el-table thead{
  font-size: 13px;
}
.tableCon .el-table th{
  color: #98999d;
}
</style>
