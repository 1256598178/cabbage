<template>
	<div>
		<header class="shop-header">
			<div class="back-box">
				<image class="back-btn" src="http://47.92.164.211:8011/PublicImage/backImages.png" @click="minibarLeftButtonClick()"></image>
			</div>
			<div class="shop-header-title-wrapper">
				<text class="shop-header-title" @click="link({'web':'goodIn','ProductId': abc})">商品</text>
				<text class="shop-header-title crt">详情</text>
			</div>
		</header>
		<list class="list-box">
			<cell>
				<image class="goods-info-img" :src="ImageUrl" ref="img" @load="onImageLoad"></image>
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
	const animation = weex.requireModule('animation');
	import { WxcMinibar, WxcTabPage, WxcPanItem, Utils, BindEnv } from 'weex-ui';

	// https://github.com/alibaba/weex-ui/blob/master/example/tab-page/config.js
	//import orderItem from './order-item.vue'
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
				cIndex: 1,
				len: 0,
				USERID: 'user_id',
				TOKEN: 'user_token',
				PRODUCTID: '',
				ImageUrl:'',
				CarNum:'',
				NumType:false,
				abc: ''
			}
		},
		methods: {
			onImageLoad(event) {
				console.log(event.size.naturalWidth + ',' + event.size.naturalHeight)
				var that = this;
				var scales = 750/event.size.naturalWidth;
				console.log('eventTarget = ' + event.target)
				const view = that.$refs['img']
				console.log(view);
				if(event.success) {
					if(WXEnvironment.platform === 'Web') {
						view.style.width = event.size.naturalWidth*scales + 'px';
						view.style.height = event.size.naturalHeight*scales + 'px';
					} else {
						animation.transition(view, {
							styles: {
								//width: event.size.naturalWidth*scales + 'px',
								height: event.size.naturalHeight*scales + 'px'
							},
							duration: 0, //需要设置为0，否则无效
							timingFunction: 'ease',
							delay: 0,
							needLayout: true, //变化后刷新界面
						})
					}
				}
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
										self.ImageUrl = ret.obj.ImageUrl
										console.log(ret);
										//self.onImageLoad();
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
	
	.list-box {
		position: fixed;
		top: 90px;
		bottom: 100px;
		left: 0;
		right: 0;
	}
	
	.goods-info-img{
		width: 750px;
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