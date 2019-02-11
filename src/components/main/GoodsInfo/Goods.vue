<template>
	<div>
		<header class="shop-header">
			<div class="back-box">
				<image class="back-btn" src="http://47.92.164.211:8011/PublicImage/backImages.png" @click="minibarLeftButtonClick()"></image>
			</div>
			<div class="shop-header-title-wrapper">
				<text class="shop-header-title crt">商品</text>
				<text class="shop-header-title" @click="link({'web':'goodInfo','ProductId': abc})">详情</text>
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
				<text class="add-btn" @click="addShopCar()">加入购物车</text>
			</div>
		</div>
	</div>
</template>

<script>
	const dom = weex.requireModule('dom');
	import {
		WxcMinibar,
		WxcTabPage,
		WxcPanItem,
		Utils,
		BindEnv
	} from 'weex-ui';
	import Util from '../../../common/utils/utils.js'
	import api from '../../../common/api/api.js'
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
            USERID: 'user_id',
            TOKEN: 'user_token',
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
				NumType:false,
				abc: ''
			}
		},
		methods: {
			getOrderData(curpage) {
				const self = this
			},
			minibarLeftButtonClick() {
				var self = this
	            // Util.pops({
	            //     "webBack": function(){
	                    self.$router.go(-1)
	            //     },
	            //     "phoneBack": function(){
	            //         weex.requireModule('navigator').pop({
	            //             animated: "true"
	            //         }, event => {
	            //         })
	            //     }
	            // })
			},
			link(urls){
				var self = this;
				self.abc = Util.analAjax({'routerName':function(){return self.$route.query}}).ProductId
	            // Util.jump({
	            //     "phoneJump": function(){
	            //         var bundleUrl = self.bundleUrl;
	            //         weex.requireModule('navigator').push({
	            //             url: Util.urlPort().urlAddPort + 'dist/' + urls.phone + '?' + urls.name + '=' + urls.ProductId,
	            //             animated: "true"
	            //         }, event => {})
	            //     },
	            //     "webJump": function(){
	                    self.$router.push({
	                        name: urls.web,
	                        query: {
	                            "CategoryId": urls.CategoryId,
	                            "ProductId": self.abc
	                        }
	                    })
	            //     }
	            // })
			},
			addShopCar() {
	            var self = this;
                Util.WeexAjax({
                    url: api.SHOPCAR_URL,
                    method: 'POST',
                    type: 'JSON',
                    token: self.TOKEN,
                    body: {
                        "UserId": self.USERID,
                        "ProductId": Util.analAjax({"routerName":function(){return self.$route.query}}).ProductId,
                        "CartNum": 1
                    },
                    callback: function(ret) {
                        if (ret.Status == 1) {
                            modal.toast({
                                message: ret.Message,
                                duration: 1
                            })
                        }else{
                            modal.toast({
                                message: '请求错误',
                                duration: 1
                            })
                        }
                    }
                })
	        }
		},
		created() {
			var fontModule = weex.requireModule("dom");
	        fontModule.addRule('fontFace', {
	            'fontFamily': "iconfont",
	            'src': "url('" + api.iconUrl + "')"
	        })
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
					console.log(self.USERID + '---' + self.TOKEN)
					Util.goLogin({
		                "USERID": self.USERID,
		                "TOKEN": self.TOKEN,
		                "success": function(){
							Util.WeexAjax({
								url: api.GETPRODCUTDETAIL_URL + '?prodcutId=' + Util.analAjax({"routerName":function(){return self.$route.query}}).ProductId + '&UserId=' + self.USERID,
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
		                },
		                "fail": function(){
		                    // Util.jump({
		                    //     "phoneJump": function(){
		                    //         var bundleUrl = this.bundleUrl;
		                    //         weex.requireModule('navigator').push({
		                    //             url: Util.urlPort().urlAddPort + 'dist/' + "components/login/login.js",
		                    //             animated: "true"
		                    //         }, event => {})
		                    //     },
		                    //     "webJump": function(){
		                            self.$router.push({name: "login"})
		                    //     }
		                    // })
		                }
		            })
				})
			});

		}
	};
</script>

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