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
    // baseURL: 'http://ieoapi.bi.cc/h5/ieo',
       // baseURL: 'http://rongzun.ifbplus.com/',
      // axios.defaults.baseURL = 'http://ieoapi.bi.cc/h5/ieo';
      
      timeout: 10000,
      //格式化参数
      transformRequest(data) {
        let header = {
          to_user_name: 'apiserver',
          from_user_name: 'football',
          create_time: Date.parse(new Date()) / 1000,
        };
        let req = {
          // auth: token.generateSign(),
          params: data.params,
          // fields : data.fields
        };
        // console.log( JSON.stringify(req) );
        
        return JSON.stringify(data);
      },
      //格式化输出
      transformResponse(data) {
        let rs = JSON.parse(data);
        if (rs.success !== true) {
          dialogs.install({
            title: rs.message,
            type: "error",
            btnText: "确定",
            cb: () => {}
          });
        }
        if(rs.body === null)
        {
          console.log("空的")
          rs.body = {temp:""}
        }
        return rs;
      },
      validateStatus: function (status) {
        if (status == 500 || status == 404) {
          dialogs.install({
            title:'获取数据失败',
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

    Vue.prototype.$ajax = instance;
  }
};
