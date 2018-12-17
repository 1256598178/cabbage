<template>
  <div class="wrapper">
    <ul class="tab">
      <li class="tab-lis"><router-link to="/home">首页</router-link></li>
      <li class="tab-lis"><router-link to="/class">分类</router-link></li>
      <li class="tab-lis"><router-link to="/shop">购物车</router-link></li>
      <li class="tab-lis"><router-link to="/goods">取货</router-link></li>
      <li class="tab-lis"><router-link to="/my">我的</router-link></li>
    </ul>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  // data () {
  // }
}
</script>

<style lang="stylus" scoped>
.tab{
  display: flex;
  &>li{
    flex: 1;
    float: left;
    &>a{
      text-align: center;
    }
  }
}
</style>
