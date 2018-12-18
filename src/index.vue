<template>
  <div class="wrapper">
    <div class="scroll-wrapper">
      <div>
        <router-view/>
      </div>
    </div>
    <ul class="tab">
      <li class="tab-lis">
        <div class="_img"></div>
        <text @click="jump('home')">首页</text>
      </li>
      <li class="tab-lis">
        <div class="_img"></div>
        <text @click="jump('classes')">分类</text>
      </li>
      <li class="tab-lis">
        <div class="_img"></div>
        <text @click="jump('shop')">购物车</text>
      </li>
      <li class="tab-lis">
        <div class="_img"></div>
        <text @click="jump('goods')">取货</text>
      </li>
      <li class="tab-lis">
        <div class="_img"></div>
        <text @click="jump('my')">我的</text>
      </li>
    </ul>
    <!-- <ul class="tab">
      <li class="tab-lis">
        <router-link to="/home">
          <div class="_img"></div>
          <text>首页</text>
        </router-link>
      </li>
      <li class="tab-lis">
        <router-link to="/classes">
          <div class="_img"></div>
          <text>分类</text>
        </router-link>
      </li>
      <li class="tab-lis">
        <router-link to="/shop">
          <div class="_img"></div>
          <text>购物车</text>
        </router-link>
      </li>
      <li class="tab-lis">
        <router-link to="/goods">
          <div class="_img"></div>
          <text>取货</text>
        </router-link>
      </li>
      <li class="tab-lis">
        <router-link to="/my">
          <div class="_img"></div>
          <text>我的</text>
        </router-link>
      </li>
    </ul> -->
  </div>
</template>

<script>
import router from './router.js'
export default {
  methods: {
    jump (msg) {
      router.push(msg)
    }
  }
}
</script>

<style lang="stylus" scoped>
.tab{
  position: absolute;
  left: 0;
  bottom: 0;
  height: 50px;
  width: 750px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  &>li{
    flex: 1;
    text-align: center;
    &>._img{
      display: block;
      margin: 0 auto;
      width: 25px;
      height: 24px;
    }
  }
}
.scroll-wrapper{
  position: absolute;
  bottom: 50px;
  top: 45px;
  left: 0;
  right: 0;
  overflow: hidden;
}
</style>
