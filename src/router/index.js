import Vue from 'vue'
import Router from 'vue-router'

import NewHome from '@/views/home/new_index'

import inviteList from '@/views/home/inviteUserList'
import rewardRecordList from '@/views/home/rewardRecordList'

Vue.use(Router)

export default new Router({
  routes: [{
      path: '/',
      name: 'home',
      component: NewHome,
      meta: {
        index: 0,
        footer: false,
        title: '全球合伙人',
        keepAlive: true, // 需要被缓存
      }
    },
    {
      path:'/inviteList',
      name:'inviteList',
      component:inviteList,
      meta:{
        index:4,
        footer:false,
        title: '邀请人',
        keepAlive: true, // 需要被缓存
      }
    },
    {
      path:'/rewardRecordList',
      name:'rewardRecordList',
      component:rewardRecordList,
      meta:{
        index:4,
        footer:false,
        title: '邀请返佣',
        keepAlive: true, // 需要被缓存
      }
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      savedPosition;
      return savedPosition;
    } else {
      return {
        x: 0,
        y: 0
      };
    }
  }
})
