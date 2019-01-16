<template>
	<div>
		<header class="shop-header">
			<div class="back-box"><image class="back-btn" src="../src/common/images/backImages.png"></image></div>
			<div class="shop-header-title-wrapper">
				<text class="shop-header-title crt">商品</text>
				<text class="shop-header-title">详情</text>
			</div>
		</header>	
		<list class="list-box">
			<cell>
				<slider class="slider" interval="3000" auto-play="false" @change="">
					<div class="frame" v-for="num in imgList" ref="">
						<image class="goods-image" :src="num.src" resize="contain"></image>
					</div>
					<indicator class="indicator"></indicator>
				</slider>
				<div class="goods-price-box">
					<text class="goods-price">¥46.80元/份</text>
					<div class="goods-share">
						<text class="share-img iconFont">&#xe713;</text>
						<text class="share-text">分享</text>
					</div>
				</div>
				<div class="goods-name-box">
					<text class="goods-name">固城湖大闸蟹母蟹2两/只（6只）</text>
					<text class="goods-tip">烹饪前请先剪掉蟹扣和吊牌</text>
				</div>
				<text class="border-cell"></text>
				<div class="payment-box">
					<div class="payment-method">
						<div class="payment-l">
							<text class="payment-icon iconFont">&#xe66e;</text>
							<text class="payment-title">结算方式</text>
						</div>
						<text class="payment-content">折合46.80元/份</text>
					</div>
					<div class="payment-method border-t">
						<div class="payment-l">
							<text class="payment-icon iconFont">&#xe631;</text>
							<text class="payment-title">每份数量</text>
						</div>
						<text class="payment-content">1份</text>
					</div>
				</div>
				<text class="border-cell"></text>
				<div class="goods-info">
					<div class="payment-method">
						<div class="payment-l">
							<text class="payment-icon iconFont">&#xe604;</text>
							<text class="payment-title">商品详情</text>
						</div>
						<text class="payment-content">千呼万唤中，我们静候螃蟹肥美、蟹膏丰足、口感和营养也是最顶峰时。终于在这最佳时节，诚意满满的带来固城湖大闸蟹，蟹儿个头大，蟹钳粗，白花花的蟹肉里有天然的咸鲜味，加上黄澄澄、红亮亮、厚笃笃的膏，啥料都不要用放，上锅一蒸，那香味十里飘香！国庆节后开始进入螃蟹最美味的时期哦！</text>
					</div>
				</div>
			</cell>
		</list>
		<div class="bottom-box">
			<div class="shop-car">
				<text class="shop-car-icon iconFont">&#xe668;</text>
				<text class="shop-car-num">2</text>
			</div>
			<div class="collection">
				<text class="collection-icon iconFont">&#xe626;</text>
			</div>
			<div class="add-box">
				<text class="add-btn">加入购物车</text>
			</div>
		</div>
	</div>
</template>

<style scoped>
	.iconFont{
	    font-family: iconfont;
	}
	.shop-header {
		width: 750px;
		height: 90px;
		flex-direction: row;
		border-bottom-width: 1px;
		border-bottom-style: solid;
		border-bottom-color: #dcdcdc;
	}
	
	.back-box{
		width: 70px;
		height: 90px;
		justify-content: center;
		align-items: center;
	}
	
	.back-btn{
		width: 28px;
		height: 41px;
	}
	
	.shop-header-title-wrapper {
		position: relative;
		flex: 1;
		flex-direction: row;
		justify-content: center;
		padding-top: 32px;
		height: 90px;
		margin-right: 70px;
		/*26 + 40 + 26*/
	}
	
	.shop-header-title {
		width: 70px;
		font-size: 30px;
		line-height: 32px;
		color: #333;
		text-align: center;
		margin-left: 10px;
		margin-right: 10px;
		border-bottom-width: 5px;
		border-bottom-style: solid;
		border-bottom-color: transparent;
		padding-bottom: 20px;
	}
	
	.crt{
		border-bottom-color: #73cc00;
		color: #73cc00;
	}
	
	.shop-header-delet {
		position: absolute;
		right: 0;
		top: 0;
		margin-top: 29px;
		font-size: 34px;
		color: #c1e6a3;
	}
	
	.shop-address-wrapper {
		display: flex;
		flex-direction: row;
		align-items: center;
		padding-top: 21px;
		/*47 - 26*/
	}
	
	.border-cell {
		background-color: #f5f5f5;
		width: 750px;
		height: 10px;
		align-items: center;
		justify-content: center;
	}
	
	.list-box{
		position: fixed;
		top: 90px;
		bottom: 100px;
		left: 0;
		right: 0;
	}
	.slider{
		width: 750px;
		height: 650px;
	}
	.goods-image{
		width: 750px;
		height: 600px;
	}
	.indicator {
		width: 750px;
		height: 20px;
	    item-color: #a0a0a0;
	    item-selected-color: #73cc00;
	    item-size: 14px;
	    position: absolute;
	    top: 630px;
	    left: 0;
	}
	.goods-price-box{
		flex-direction: row;
		padding-left: 20px;
		padding-right: 20px;
		align-items: center;
		margin-top: 30px;
	}
	.goods-price{
		flex: 1;
		font-size: 36px;
		line-height: 56px;
		color: #f26100;
	}
	.goods-share{
		width: auto;
		flex-direction: row;
	}
	.share-img{
		width: 34px;
		height: 34px;
		line-height: 34px;
		border-width: 1px;
		border-style: solid;
		border-color: #999;
		border-radius: 17px;
		font-size: 30px;
		color: #999;
		margin-right: 5px;
		text-align: center;
	}
	.share-text{
		font-size: 22px;
		line-height: 34px;
		color: #999;
	}
	.goods-name-box{
		padding-left: 20px;
		padding-right: 20px;
	}
	.goods-name{
		font-size: 30px;
		line-height: 50px;
		color: #333;
	}
	.goods-tip{
		font-size: 22px;
		line-height: 38px;
		color: #999;
		padding-bottom: 10px;
	}
	.payment-method{
		flex-direction: row;
		padding: 15px 0;
		margin: 0 20px;
	}
	.border-t{
		border-top-width: 1px;
		border-top-style: solid;
		border-top-color: #dcdcdc;
	}
	.payment-l{
		width: 180px;
		flex-direction: row;
	}
	.payment-icon{
		font-size: 30px;
		line-height: 40px;
		color: #999;
		margin-right: 10px;
	}
	.payment-title{
		font-size: 24px;
		line-height: 40px;
		color: #999;
	}
	.payment-content{
		flex: 1;
		font-size: 24px;
		line-height: 40px;
		color: #333;
	}
	.bottom-box{
		height: 100px;
		flex-direction: row;
		align-items: center;
		position: fixed;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: #fff;
		padding-left: 20px;
		padding-right: 20px;
		box-shadow: 0 -1px 6px rgba(0,0,0,0.1);
	}
	.shop-car{
		width: 60px;
		height: 60px;
		border-radius: 30px;
		background-color: #73cc00;
		margin-right: 20px;
	}
	.shop-car-icon{
		font-size: 32px;
		line-height: 60px;
		text-align: center;
		color: #fff;
	}
	.shop-car-num{
		min-width: 10px;
		height: 20px;
		padding: 0 5px;
		border-radius: 10px;
		background-color: #ff0000;
		font-size: 14px;
		line-height: 20px;
		color: #fff;
		text-align: center;
		position: absolute;
		top: 0;
		left: 45px;
	}
	.collection{
		width: 60px;
		height: 60px;
		border-radius: 30px;
		background-color: #ff5d61;
		margin-right: 60px;
	}
	.collection-icon{
		font-size: 32px;
		line-height: 60px;
		text-align: center;
		color: #fff;
	}
	.add-box{
		flex: 1;
	}
	.add-btn{
		height: 70px;
		border-radius: 35px;
		font-size: 30px;
		line-height: 70px;
		text-align: center;
		color: #fff;
		background-color: #73cc00;
	}
</style>
<script>
	const dom = weex.requireModule('dom');
	import { WxcMinibar, WxcTabPage, WxcPanItem, Utils, BindEnv } from 'weex-ui';

	// https://github.com/alibaba/weex-ui/blob/master/example/tab-page/config.js
	//import orderItem from './order-item.vue'
	import Config from './config'
	import Vue from 'vue'
	const navigator = weex.requireModule('navigator') 
	const modal = weex.requireModule('modal') 
	const stream = weex.requireModule('stream') 
	const storage = weex.requireModule('storage') 

	export default {
		components: {
			WxcMinibar,
			WxcTabPage,
			WxcPanItem,
			Config,
			//orderItem
		},
		data() {
			return {
				imgList: [{
					src: '../src/components/GoodsInfo/goods-img01.png',
				}, {
					src: '../src/components/GoodsInfo/goods-img01.png',
				}, {
					src: '../src/components/GoodsInfo/goods-img01.png',
				}],
				cIndex:1,
				len:0
			}
		},
		methods: {
			getOrderData(curpage) {
				const self = this
				var flag = 0
				switch(curpage) {
					case 0: // 全部订单 
						flag = 0
						break
					case 1: // 待付款
						flag = 1
						break
					case 2: // 待取货
						flag = 2
						break
					case 3: // 待评价
						flag = 3
						break
					case 4: // 退款服务
						flag = 4
						break
					case 5: // 售后服务
						flag = 5
						break
				} //这里url自己写就好
				var url = '../src/components/myorder/order'+flag+'.json'
				console.log('geturl----' + url)

				stream.fetch({
					method: 'GET',
					url: url,
					type: 'json'
				}, function(response) {
					console.log(response)
					self.orderList = response.data.orderList // 刷新当前页面的数据 // tablist是对于tab的集合 需要v-for //orderlist是对应tab下的list数据的集合 需要v-for
					//console.log(response.data.orderList);
					Vue.set(self.tabList, curpage, self.orderList)
					console.log(self.orderList.length)
				}, function(response) {
					console.log('http in progress')
				})
			},
			minibarLeftButtonClick() {
				this.$router.push('-1')
			}
		},
		created() {
			var fontModule = weex.requireModule("dom");
	        fontModule.addRule('fontFace', {
	            'fontFamily': "iconfont",
	            'src': "url('//at.alicdn.com/t/font_948634_j56el7oqed.ttf')"
        	});
		}
	};
</script>