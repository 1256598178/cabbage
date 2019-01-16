<template>
	<div>
		<header class="shop-header">
			<div class="back-box">
				<image class="back-btn" src="../src/common/images/backImages.png"></image>
			</div>
			<div class="shop-header-title-wrapper">
				<text class="shop-header-title">商品</text>
				<text class="shop-header-title crt">详情</text>
			</div>
		</header>
		<list class="list-box">
			<cell>
				<image class="goods-info-img" :src="imgUrl" ref="img" @load="onImageLoad"></image>
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
<script>
	const dom = weex.requireModule('dom');
	const animation = weex.requireModule('animation');
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
				imgUrl: '../src/components/GoodsInfo/goods-info-img.png',
				cIndex: 1,
				len: 0
			}
		},
		methods: {
			onImageLoad(event) {
				console.log(event.size.naturalWidth + ',' + event.size.naturalHeight)
				var that = this;
				console.log('eventTarget = ' + event.target)
				const view = that.$refs['img']
				console.log(view);
				if(event.success) {
					if(WXEnvironment.platform === 'Web') {
						//view.style.width = event.size.naturalWidth + 'px';
						view.style.height = event.size.naturalHeight + 'px';
					} else {
						animation.transition(view, {
							styles: {
								//width: event.size.naturalWidth + 'px',
								height: event.size.naturalHeight + 'px'
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
				this.$router.push('-1')
			}
		},
		created() {
			var fontModule = weex.requireModule("dom");
			fontModule.addRule('fontFace', {
				'fontFamily': "iconfont",
				'src': "url('//at.alicdn.com/t/font_948634_j56el7oqed.ttf')"
			});
			onImageLoad();
		}
	};
</script>