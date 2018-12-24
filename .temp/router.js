import Vue from 'vue'
/*global Vue*/
import Router from 'vue-router'
import home from '../src/components/home/home.vue'
import classes from '../src/components/class/class.vue'
import shop from '../src/components/shop/shop.vue'
import goods from '../src/components/goods/goods.vue'
import my from '../src/components/my/my.vue'

Vue.use(Router)
module.exports = new Router({
  linkActiveClass: 'active',
  routes: [
    {
        path: '/',
        redirect: '/home'
      },{
        path: '/home',
        component: home
      },{
        path: '/classes',
        component: classes
      },{
        path: '/shop',
        component: shop
      },{
        path: '/goods',
        component: goods
      },{
        path: '/my',
        component: my
      }
  ]
});

