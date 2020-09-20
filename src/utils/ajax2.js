import Vue from 'vue';
import axios from 'axios'
import token from './token'
import Router from '../router/index'
let newVue = new Vue({})

import dialogs from '../components/dialogs2';
// Vue.use(dialogs)

import {
  Toast
} from 'vant';

Vue.use(Toast);
export default {
  install: function () {
    let url = 'api/',
      version = 'v1/';
    var instance = axios.create({
    // baseURL: 'https://appapi.bi.cc/',
       // baseURL: 'http://rongzun.ifbplus.com/',
      timeout: 10000,
      //格式化参数
      transformRequest(data) {
        let header = {
          to_user_name: 'apiserver',
          from_user_name: 'football',
          create_time: Date.parse(new Date()) / 1000,
        };
        let req = {
          header: header,
          auth: token.generateSign(),
          params: data.params,
          // fields : data.fields
        };
        // console.log( JSON.stringify(req) );
        return JSON.stringify(req);
      },
      //格式化输出
      transformResponse(data) {
        let rs = JSON.parse(data);
        // console.log(rs.code);
        if (rs.code !== 200) {
          dialogs.install({
            title: rs.msg,
            type: "error",
            btnText: "确定",
            cb: () => {}
          });
        }

        return rs;
      },
      validateStatus: function (status) {
        // console.log(status);
        if (status == 500 || status == 404) {
          dialogs.install({
            title: '獲取數據失敗',
            type: "error",
            btnText: "确定",
            cb: () => {}
          });
          Toast.clear()
          return
        }
        // console.log(status)
        return status // 默认的
      },
      paramsSerializer(params) {
        return Qs.stringify(params)
      },
    });

    Vue.prototype.$ajax2 = instance;
  }
};
