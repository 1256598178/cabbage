/*global Vue*/
// import router from './router'
/* weex initialized here, please do not move this line */
const router = require('./router');
// const App = require('@/index.vue');
// const App = require('@/components/class/class.	vue');//分类
// const App = require('@/components/shop/shop.vue');//购物
// const App = require('@/components/shop/setlemet.vue');//
// const App = require('@/components/my/my.vue');//我的
// const App = require('@/components/other/find.vue');//发现
// const App = require('@/components/other/congratulate.vue');//新年贺岁
// const App = require('@/components/seafood/seafood.vue');//海鲜水产
// const App = require('@/components/sign/signInfo.vue');//签到记录
// const App = require('@/components/sign/sign.vue');//签到
// const App = require('@/components/search/search.vue');//搜索页面
// const App = require('@/components/collection/collection.vue');//我的收藏
// const App = require('@/components/coupon/coupon.vue');//优惠券
// const App = require('@/components/coupon/myCoupon.vue');//我的优惠券
// const App = require('@/components/information/information.vue');//信息通知
// const App = require('@/components/reward/reward.vue');//我的奖励
// const App = require('@/components/register/register.vue');//注册
// const App = require('@/components/login/login.vue');//登录
// const App = require('@/components/map/map.vue');//测试
// const App = require('@/components/aabbcc/actdet.vue');//测试
// const App = require('@/components/aabbcc/my.vue');//测试
// const App = require('@/components/aabbcc/personlInfo.vue');//测试
// const App = require('@/components/aabbcc/InviteFriends.vue');//测试
// const App = require('@/components/aabbcc/withdrawal.vue');//测试
const App = require('@/components/aabbcc/ResultsWithdrawals.vue');//测试
/* eslint-disable no-new */
new Vue(Vue.util.extend({el: '#root', router}, App));
router.push('/');


// ///////////////////////////////////////////////////
// 
// weex compile src dist编辑文件生成对应的js入口文件 实现页面的跳转