<template>
  <header class="header">
    <image class="_logo" :src="logo" @click="jump()"></image>
	<div class="address-wrapper">
		<image class="_address" :src="address"></image>
		<text class="address-name">{{this.position}}</text>
		<image class="_arrow" :src="arrow"></image>
	</div>
	<div class="search-wrapper">
		<div class="magnifier"><image class="_magnifier" :src="magnifier" @click="jump()"></image></div>
		<div class="scan"><image class="_scan" :src="scan"></image></div>
	</div>
  </header>
</template>

<script>
import Util from '../../common/utils/utils.js'
export default {
  data() {
  	return {
  		logo: "http://47.92.164.211:8011/PublicImage/logo.png", //logo图
  		address: "http://47.92.164.211:8011/PublicImage/address.png", // 定位图标
  		arrow: "http://47.92.164.211:8011/PublicImage/arrow.png",
  		magnifier: "http://47.92.164.211:8011/PublicImage/search.png",  // 放大镜图标
  		scan: "http://47.92.164.211:8011/PublicImage/scan.png", // 扫一扫图标
  		position: '合肥市滨湖春融苑店',
  	}
  },
  methods: {
  	jump(){
  		Util.bindThis(Util.jump('components/search/search.js'),this.$getConfig())
  	}
  }
}
</script>

<style lang="stylus" scoped="">
.header{
	height: 90px;
	padding-left: 20px;
	padding-right: 20px;
	background-color: rgb(115,204,70);
	display: flex;
	flex-direction: row;
}
.address-wrapper{
	margin-top: 27.5px;
	flex: 1;
	flex-direction: row;
}

.address-name{
	font-size: 26px;
	line-height: 35px;
	color: #fff;
}
.search-wrapper{
	margin-top: 23.5px;
	width: 117px;
	flex-direction: row;
}
._logo{
	margin-top: 13.5px;
	width: 70px;
	height: 63px;
	margin-right: 30px;
}
._address{
	margin-right: 12px;
	width: 25px;
	height: 35px;
}
._address{
	width: 25px;
	height: 35px;
}
._arrow{
	margin-top: 13px;
	margin-left: 11px;
	width: 14px;
	height: 9px;
}
._magnifier{
	width: 43px;
	height: 43px;
	margin-right: 32px;
}
._scan{
	width: 42px;
	height: 42px;
}
</style>
