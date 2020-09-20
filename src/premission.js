import router from '../src/router/index'
import cookies from 'js-cookie';
var logined = !!cookies.get('logined');

let list = [
  'home','inviteList','rewardRecordList','zcpartner','enterzd','suocangDetail','suocangandjiedetail','suocangandRedeem','zhuanchuRedeem','suocangList','suocangandjieList'
];
router.beforeEach((to, from, next) => {
  // console.log(to)
  var routeTo = to.name;
  var flag = false;
  list.forEach(item => {
    if (item.match(routeTo)) {
      flag = true;
    }
  })
  if (flag || logined) {
    next()
  } else {
    router.push({
      path: '/login'
    })
  }
})