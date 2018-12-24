/*global Vue*/
// import router from './router'
/* weex initialized here, please do not move this line */
const router = require('./router');
const App = require('@/index.vue');
// const App = require('@/components/goods/goods.vue');
/* eslint-disable no-new */
new Vue(Vue.util.extend({el: '#root', router}, App));
router.push('/');

