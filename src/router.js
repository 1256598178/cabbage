/*global Vue*/
import Router from 'vue-router'
import HelloWorld from '@/components/login/HelloWorld'
import login from '@/components/login/login'
import register from '@/components/login/register'
import FindPassword from '@/components/login/FindPassword'
import seafood from '@/components/main/seafood/seafood'
import goodIn from '@/components/main/GoodsInfo/Goods'
import goodInfo from '@/components/main/GoodsInfo/GoodsInfo'
import main from '@/components/main/main'
import home from '@/components/main/home/home'
import classes from '@/components/main/class/class'
import shop from '@/components/main/shop/shop'
import setlemet from '@/components/main/shop/setlemet'
import goods from '@/components/main/goods/goods' 
import my from '@/components/main/my/my'



import checkstand from '@/components/main/checkstand/checkstand'


Vue.use(Router)
module.exports = new Router({
  linkActiveClass: 'active',
  routes: [
      {
        path: '/',
        name: 'HelloWorld',
        component: HelloWorld,
        redirect: '/HelloWorld'
      },{
        path: '/HelloWorld',
        name: 'HelloWorld',
        component: HelloWorld
      },{
        path: '/login',
        name: 'login',
        component: login
      },{
        path: '/register',
        name: 'register',
        component: register
      },{
        path: '/FindPassword',
        name: 'FindPassword',
        component: FindPassword
      },{
        path: '/seafood',
        name: 'seafood',
        component: seafood
      },{
        path: '/goodIn',
        name: 'goodIn',
        component: goodIn
      },{
        path: '/goodInfo',
        name: 'goodInfo',
        component: goodInfo
      },{
        path: '/main',
        name: 'main',
        component: main,
        redirect:'/main/home',
        children: [
          {
            path: 'home',
            name: 'home',
            component: home
          },{
            path: 'classes',
            name: 'classes',
            component: classes
          },{
            path: 'shop',
            name: 'shop',
            component: shop
          },{
            path: 'goods',
            name: 'goods',
            component: goods
          },{
            path: 'my',
            name: 'my',
            component: my
          }
        ]
      },{
        path: 'setlemet',
        name: 'setlemet',
        component: setlemet,
      },{
        path: 'checkstand',
        name: 'checkstand',
        component: checkstand,
      }
  ]
});

