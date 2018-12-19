<template>
    <div class="wrapper">
        <router-view />
        <ul class="tab">
            <li class="tab-list" @click="jump('home')">
              <image style="width: 50px; height: 48px; margin-bottom: 17px;" class="_img home" src="../src/common/images/home.png"></image>
              <text class="content">首页</text>
            </li>
            <li class="tab-list" @click="jump('classes')">
              <image style="width: 51px;height: 51px; margin-bottom: 14px;" class="_img class" src="../src/common/images/class.png"></image>
              <text class="content">分类</text>
            </li>
            <li class="tab-list" @click="jump('shop')">
              <image style="width: 52px;height: 48px; margin-bottom: 17px;" class="_img shop" src="../src/common/images/shop.png"></image>
              <text class="content">购物车</text>
            </li>
            <li class="tab-list" @click="jump('goods')">
              <image style="width: 49px;height: 49px; margin-bottom: 16px;" class="_img goods" src="../src/common/images/goods.png"></image>
              <text class="content">取货</text>
            </li>
            <li class="tab-list" @click="jump('my')">
              <image style="width: 48px;height: 50px; margin-bottom: 15px;" class="_img my" src="../src/common/images/my.png"></image>
              <text class="content">我的</text>
            </li>
        </ul>
    </div>
</template>
<script>
export default {
    methods: {
        jump(msg) {
            this.$router.push(msg);
        }
    }
}
</script>
<style lang="stylus" scoped>
.tab{
  position: fixed;
  bottom: 0;
  height: 100px;
  width: 750px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-top-width: 1px;
  border-top-color: #eee;
  border-top-style: solid;
  &>.tab-list{
    height: 100px;
  }
}
</style>