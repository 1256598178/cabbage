<template>
	<div class="claim-goods-box">
		<header class="shop-header">
			<div class="container">
				<div class="shop-header-title-wrapper">
					<text class="shop-header-title">取货</text>
				</div>
				<!--<div class="shop-address-wrapper">
					<text class="iconFont iconfont-address">&#xe7e0;</text>
					<text class="shop-address-text">绿白菜滨湖春融苑店</text>
				</div>-->
			</div>
		</header>
		<!-- /header -->
		<slider class="slider" interval="3000" auto-play="false" @change="change">
			<div class="frame" v-for="num in goodsList" ref="claim">
				<div class="frame-box">
					<text class="text01">{{num.orderNumber}}</text>
					<text class="text02">{{num.phone}}</text>
					<div class="text-box01"><text class="text06">请您前往</text><text class="text03">{{num.store}}</text><text class="text06">进行取货</text></div>
					<div class="qr-code-box">
						<image class="qr-code-image" :src="num.src"></image>
					</div>
					<text class="text07">订单编号：{{num.orderNumber}}</text>
					<div class="claim-box">
						<div class="claim-time">
							<text class="text05">取货时间：</text>
							<div class="text-box02">
								<text class="text04">{{num.dates}}</text>
								<text class="text04">{{num.time}}</text>
							</div>
						</div>
						<div class="share">
							<text class="share-btn iconFont">&#xe713;</text>
						</div>
					</div>
				</div>
				<div class="cabbage-img-box">
					<image class="cabbage-image" src="http://47.92.164.211:8011/PublicImage/cabbage-icon.png"></image>
				</div>
			</div>
		</slider>
		<div class="claim-index-box">
			<text class="claim-index">{{this.cIndex}}/{{this.len}}</text>
		</div>
	</div>
</template>

<style scoped>
	.claim-goods-box{
		position: fixed;
		top: 0;
		bottom: 110px;
		left: 0;
		right: 0;
		background-color: #f5f5f5;
	}
	.shop-header {
		width: 750px;
		height: 92px;
		background-color: rgb(115, 204, 70);
	}
	
	.shop-header-title-wrapper {
		position: relative;
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		width: 750px;
		height: 92px;
		/*26 + 40 + 26*/
	}
	
	.shop-header-title {
		font-size: 43px;
		color: #fff;
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
	
	.iconFont{
	    font-family: iconfont;
	}
	
	.iconfont-address {
		margin-right: 15px;
		font-size: 36px;
		color: #fff;
	}
	
	.shop-address-text {
		font-size: 30px;
		color: #fff;
		font-weight: 600;
	}
	
	.slider {
		margin-top: 60px;
		width: 750px;
		height: 815px;
	}
	
	.cabbage-img-box{
		width: 90px;
		height: 90px;
		border-radius: 90px;
		background-color: #e0f8b1;
		flex-direction: row;
		justify-content: center;
		position: absolute;
		top: 0;
		left: 330px;
	}
	
	.cabbage-image{
		width: 58px;
		height: 77px;
		margin-top: 10px;
	}
	
	.frame {
		width: 750px;
		flex-direction: row;
		justify-content: center;
		position: relative;
	}
	
	.frame-box{
		width: 710px;
		height: 770px;
		padding-top: 75px;
		margin-top: 45px;
		background-color: #fff;
		border-radius: 10px;
	}
	.claim-box{
		margin-left: 60px;
		margin-right: 60px;
		flex-direction: row;
		margin-top: 20px;
	}
	.claim-time{
		flex-direction: row;
		flex: 1;
	}
	.share{
		width: 54px;
		height: 54px;
		flex-direction: row;
		justify-content: center;
		border-radius: 54px;
		border-width: 4px;
		border-color: #73cc00;
		border-style: solid;
	}
	.share-btn{
		font-size: 42px;
		line-height: 50px;
		color: #73cc00;
		text-align: center;
	}
	.text-box01{
		flex-direction: row;
		justify-content: center;
		margin-top: 20px;
	}
	.qr-code-box{
		margin-top: 30px;
		margin-bottom: 20px;
		padding-top: 30px;
		padding-bottom: 30px;
		border-top-width: 1px;
		border-top-color: #f4f4f4;
		border-top-style: solid;
		border-bottom-width: 1px;
		border-bottom-color: #f4f4f4;
		border-bottom-style: solid;
		flex-direction: row;
		justify-content: center;
	}
	.qr-code-image{
		width: 300px;
		height: 300px;
	}
	.text01{
		font-size: 30px;
		line-height: 36px;		
		color: #333;
		text-align: center;
	}
	.text02{
		width: auto;
		font-size: 24px;
		line-height: 30px;
		color: #777;
		text-align: center;
		margin-top: 20px;
	}
	.text03{
		font-size: 24px;
		line-height: 30px;
		color: #73cc00;
		text-align: center;
	}
	.text04{
		font-size: 24px;
		line-height: 30px;
		color: #333;
		text-align: center;
	}
	.text05{
		font-size: 24px;
		line-height: 30px;
		color: #333;
	}
	.text06{
		width: auto;
		font-size: 24px;
		line-height: 30px;
		color: #777;
	}
	.text07{
		font-size: 24px;
		line-height: 30px;
		color: #73cc00;
		margin-left: 60px;
	}
	.claim-index-box{
		position: fixed;
		bottom: 150px;
		left: 0;
	}
	.claim-index{
		width: 750px;
		font-size: 24px;
		line-height: 30px;
		color: #333;
		text-align: center;
	}
</style>

<script>
	import api from '../../../common/api/api.js'
	export default {
		data() {
			return {
				goodsList: [{
					store: '（滨湖春融苑店1）',
					src: 'http://47.92.164.211:8011/PublicImage/qr-code.png',
					phone: '18469113870',
					orderNumber: '6565645646465456465',
					dates: '2018-12-03',
					time: '10:00-10:30'
				}, {
					store: '（滨湖春融苑店2）',
					src: 'http://47.92.164.211:8011/PublicImage/qr-code.png',
					phone: '18469113870',
					orderNumber: '6565645646465456466',
					dates: '2018-12-03',
					time: '10:00-10:30'
				}, {
					store: '（滨湖春融苑店3）',
					src: 'http://47.92.164.211:8011/PublicImage/qr-code.png',
					phone: '18469113870',
					orderNumber: '6565645646465456467',
					dates: '2018-12-03',
					time: '10:00-10:30'
				}],
				cIndex:1,
				len:0
			}
		},
		methods:{
			change(e){
				this.cIndex = e.index+1;
			}
		},
		created() {
	        var fontModule = weex.requireModule("dom");
	        fontModule.addRule('fontFace', {
	            'fontFamily': "iconfont",
	            'src': "url('" + api.iconUrl + "')"
	        })
    	},
    	mounted(){
    		this.len = this.$refs.claim.length;
    	}
	}
</script>