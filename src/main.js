// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App'
import router from './router'
import './styles/index.less'
Vue.use(ElementUI);
Vue.config.productionTip = false
import VCharts from 'v-charts'
import ajax from "./utils/ajax";
import ajax2 from "./utils/ajax2";
Vue.use(ajax).use(ajax2).use(VCharts);
import './components/vant'

import * as custom from './utils/filter'

import './utils/fontSize'

import "./utils/crypto";



Object.keys(custom).forEach(key => {
  Vue.filter(key, custom[key])
})

import './premission'

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {
    App
  },
  template: '<App/>'
})


//设置title
import VueWechatTitle from 'vue-wechat-title'
Vue.use(VueWechatTitle)

// 根据路由设置标题
router.beforeEach((to, from, next) => {
  /*路由发生改变修改页面的title */
  // if(to.meta.title) {
  //   document.title = to.meta.title
  // }
  window.document.title = to.meta.title == undefined ? '全球合伙人' : to.meta.title
  next();
})