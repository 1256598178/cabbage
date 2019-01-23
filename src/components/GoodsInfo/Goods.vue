<template>
	<div>
		<header class="shop-header">
			<div class="back-box">
				<image class="back-btn" src="../src/common/images/backImages.png"></image>
			</div>
			<div class="shop-header-title-wrapper">
				<text class="shop-header-title crt">商品</text>
				<text class="shop-header-title" @click="link('components/GoodsInfo/GoodsInfo.js')">详情</text>
			</div>
		</header>
		<list class="list-box">
			<cell>
				<slider class="slider" interval="3000" auto-play="false">
					<div class="frame" v-for="num in imgList">
						<image class="goods-image" :src="num.src" resize="contain"></image>
					</div>
					<indicator class="indicator"></indicator>
				</slider>
				<div class="goods-price-box">
					<text class="goods-price">¥{{SalesPrice}}元/份</text>
					<div class="goods-share">
						<text class="share-img iconFont">&#xe713;</text>
						<text class="share-text">分享</text>
					</div>
				</div>
				<div class="goods-name-box">
					<text class="goods-name">{{ProductName}}</text>
					<text class="goods-tip">{{SubTitle}}</text>
				</div>
				<text class="border-cell"></text>
				<div class="payment-box">
					<div class="payment-method">
						<div class="payment-l">
							<text class="payment-icon iconFont">&#xe66e;</text>
							<text class="payment-title">结算方式</text>
						</div>
						<text class="payment-content">折合{{SalesPrice}}元/份</text>
					</div>
					<div class="payment-method border-t">
						<div class="payment-l">
							<text class="payment-icon iconFont">&#xe631;</text>
							<text class="payment-title">每份数量</text>
						</div>
						<text class="payment-content">份</text>
					</div>
				</div>
				<text class="border-cell"></text>
				<div class="goods-info">
					<div class="payment-method">
						<div class="payment-l">
							<text class="payment-icon iconFont">&#xe604;</text>
							<text class="payment-title">商品详情</text>
						</div>
						<text class="payment-content">{{Introduce}}</text>
					</div>
				</div>
			</cell>
		</list>
		<div class="bottom-box">
			<div class="shop-car">
				<text class="shop-car-icon iconFont">&#xe668;</text>
				<text class="shop-car-num" v-if="NumType">{{CarNum}}</text>
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
	.iconFont {
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

	.back-box {
		width: 70px;
		height: 90px;
		justify-content: center;
		align-items: center;
	}

	.back-btn {
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

	.crt {
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

	.list-box {
		position: fixed;
		top: 90px;
		bottom: 100px;
		left: 0;
		right: 0;
	}

	.slider {
		width: 750px;
		height: 650px;
	}

	.goods-image {
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

	.goods-price-box {
		flex-direction: row;
		padding-left: 20px;
		padding-right: 20px;
		align-items: center;
		margin-top: 30px;
	}

	.goods-price {
		flex: 1;
		font-size: 36px;
		line-height: 56px;
		color: #f26100;
	}

	.goods-share {
		width: auto;
		flex-direction: row;
	}

	.share-img {
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

	.share-text {
		font-size: 22px;
		line-height: 34px;
		color: #999;
	}

	.goods-name-box {
		padding-left: 20px;
		padding-right: 20px;
	}

	.goods-name {
		font-size: 30px;
		line-height: 50px;
		color: #333;
	}

	.goods-tip {
		font-size: 22px;
		line-height: 38px;
		color: #999;
		padding-bottom: 10px;
	}

	.payment-method {
		flex-direction: row;
		padding: 15px 0;
		margin: 0 20px;
	}

	.border-t {
		border-top-width: 1px;
		border-top-style: solid;
		border-top-color: #dcdcdc;
	}

	.payment-l {
		width: 180px;
		flex-direction: row;
	}

	.payment-icon {
		font-size: 30px;
		line-height: 40px;
		color: #999;
		margin-right: 10px;
	}

	.payment-title {
		font-size: 24px;
		line-height: 40px;
		color: #999;
	}

	.payment-content {
		flex: 1;
		font-size: 24px;
		line-height: 40px;
		color: #333;
	}

	.bottom-box {
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
		box-shadow: 0 -1px 6px rgba(0, 0, 0, 0.1);
	}

	.shop-car {
		width: 60px;
		height: 60px;
		border-radius: 30px;
		background-color: #73cc00;
		margin-right: 20px;
	}

	.shop-car-icon {
		font-size: 32px;
		line-height: 60px;
		text-align: center;
		color: #fff;
	}

	.shop-car-num {
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

	.collection {
		width: 60px;
		height: 60px;
		border-radius: 30px;
		background-color: #ff5d61;
		margin-right: 60px;
	}

	.collection-icon {
		font-size: 32px;
		line-height: 60px;
		text-align: center;
		color: #fff;
	}

	.add-box {
		flex: 1;
	}

	.add-btn {
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
	import {
		WxcMinibar,
		WxcTabPage,
		WxcPanItem,
		Utils,
		BindEnv
	} from 'weex-ui';

	// https://github.com/alibaba/weex-ui/blob/master/example/tab-page/config.js
	//import orderItem from './order-item.vue'
	import Util from '../../common/utils/utils.js'
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
				imgList: [/* {
					src: '../src/components/GoodsInfo/goods-img01.png',
				}, {
					src: '../src/components/GoodsInfo/goods-img01.png',
				}, {
					src: '../src/components/GoodsInfo/goods-img01.png',
				} */],
				cIndex: 1,
				len: 0,
				LOGIN_URL: 'api/product/getprodcutdetail',
				USERID: 'user_id',
				TOKEN: 'user_token',
				PRODUCTID: '',
				ProductName:'',
				SubTitle:'',
				Introduce:'',
				ImageUrl:'',
				Price:'',
				SalesPrice:'',
				Unit:'',
				CarNum:'',
				NumType:false
				
			}
		},
		methods: {
			getOrderData(curpage) {
				const self = this
			},
			minibarLeftButtonClick() {
				this.$router.push('-1')
			},
			link(urls){
				Util.jump(urls);
			}
		},
		created() {
			var fontModule = weex.requireModule("dom");
			fontModule.addRule('fontFace', {
				'fontFamily': "iconfont",
				'src': "url('//at.alicdn.com/t/font_948634_j56el7oqed.ttf')"
			});
			var self = this;
			if(self.CarNum == 0 || self.CarNum == ''){
				self.NumType = false;
			}else{
				self.NumType = true;
			}
			const GoodsInfo = new BroadcastChannel('Avengers')
			GoodsInfo.onmessage = function(event) {
				console.log(event.data) // Assemble!
			}
			storage.getItem(this.USERID, event => {
				self.USERID = event.data
				storage.getItem(this.TOKEN, event => {
					self.TOKEN = event.data
					Util.WeexAjax({
						url: self.LOGIN_URL + '?prodcutId=' + Util.analAjax().ProductId + '&UserId=' + self.USERID,
						//url: self.LOGIN_URL + '?categoryId=1',	
						method: 'GET',
						type: 'JSON',
						token: self.TOKEN,
						callback: function(ret) {
							if (ret.Status == 1) {
								//self.loginBool = true;
								self.imgList = ret.obj.ImageList;
								self.ProductName = ret.obj.ProductName
								self.SubTitle = ret.obj.SubTitle
								self.Price = ret.obj.Price
								self.SalesPrice = ret.obj.SalesPrice
								self.Unit = ret.obj.Unit
								self.Introduce = ret.obj.Introduce
								self.ImageUrl = ret.obj.ImageUrl
								console.log(ret);
							}
						}
					})
				})
			});
		}
	};
</script>
