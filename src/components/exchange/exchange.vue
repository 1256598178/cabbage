<template>
	<div class="wrap">
		<!--导航栏-->
		<div class="titleBar">
			<!--状态栏-->
			<text class="statusbar"></text>
			<!--标题栏-->
			<wxc-minibar title="白菜币兑换" background-color="#73cc00" text-color="#FFFFFF" left-button='http://47.92.164.211:8011/PublicImage/backImage.png' right-text="兑换说明" @wxcMinibarLeftButtonClicked="minibarLeftButtonClick" @wxcMinibarRightButtonClicked="openMask">
				<text class="title" slot="middle">白菜币兑换</text>
			</wxc-minibar>
		</div>
		<div class="my-currency">
			<image class="my-image" src="http://47.92.164.211:8011/PublicImage/exchange-bg.png"></image>
			<text class="my-title">我的白菜币</text>
			<text class="my-number">10</text>
		</div>
		<div class="game-list-box">
			<scroller class="game-list" show-scrollbar="false" scroll-direction="horizontal">
			    <div class="game-cell" v-for="(nums,indexs) in gList" @click="">
			      	<image class="game" :src="nums.imageUrl"></image>
			    </div>
			</scroller>
		</div>
		<div class="points">
			<text class="points-title">积分兑换</text>
			<div class="points-list">
				<div class="points-cell" v-for="(nums,indexs) in mList" @click="selects(indexs)" :key="indexs">
					<text class="points-text01">{{nums.money}}元</text>
					<text class="points-text02">兑换{{nums.money}}元余额</text>
					<text class="points-text03">消耗{{nums.points}}白菜币</text>
				</div>
			</div>
		</div>
		<text class="points-record">兑换记录</text>
		<wxc-mask height="800"
              width="710"
              border-radius="0"
              duration="200"
              mask-bg-color="#FFFFFF"
              :has-animation="hasAnimation"
              :has-overlay="true"
              :show-close="true"
              :show="show"
              @wxcMaskSetHidden="wxcMaskSetHidden">
            <list class="content">
            	<cell>
			        <div class="demo-title">
			            <text class="titles">兑换说明</text>
			        </div>
			        <text class="content-text"> 与 Web App、HTML5 App 或 hybrid App 不同，您可以使用 Weex 构建一个真正的原生应用。更贴心的是你的代码只需使用HTML、CSS、JavaScript 可以构建原生应用，上手非常简单。但实际上，应用的底层是 Objective-C 或 Java， 同时，Weex 提供很多 native组件或模块供开发人员使用。 </text>
		    	</cell>
            </list>
        </wxc-mask>
	</div>
</template>

<script>
	import { WxcMinibar, WxcMask  } from 'weex-ui';
	
	const navigator = weex.requireModule('navigator') 
	
	export default {
		components: {
			WxcMinibar,
			WxcMask 
		},
		data: () => ({
			show: false,
      		overlayCanClose: true,
      		isFalse: false,
      		hasAnimation: true,
      		crt: '',
			gList:[
				{
					imageUrl:"http://47.92.164.211:8011/PublicImage/game-img01.png",
					linkUrl:""
				},{
					imageUrl:"http://47.92.164.211:8011/PublicImage/game-img02.png",
					linkUrl:""
				}
			],
			mList:[
				{
					money:"1",
					points:"100",
					
				},{
					money:"5",
					points:"500",
					
				},{
					money:"10",
					points:"1000",
					
				},{
					money:"20",
					points:"2000",
					
				}
			]
		}),
		methods: {
			minibarLeftButtonClick() {
				this.$router.push('-1')
			},
			selects(indexs) {
				var flag = 0
				this.crt = indexs
				switch(indexs) {
					case 0: // 全部订单 
						flag = 100
						break
					case 1: // 待付款
						flag = 200
						break
					case 2: // 待取货
						flag = 300
						break
					case 3: // 待评价
						flag = 500
						break
				}
			},
			openMask (e) {
		        this.show = true;
		        this.hasAnimation = true;
		    },
		    wxcMaskSetHidden () {
		        this.show = false;
		    },
		    openNoAnimationMask (e) {
		        this.show = true;
		        this.hasAnimation = false;
		    }
		}
	}
</script>

<style>
	.wrap{
		background-color: #f5f5f5;
	}
	.title{
		font-size: 42px;
		color: #fff;
	}
	.left{
		padding-left: 20px!important;
	}
	.right{
		padding-right: 20px!important;
	}
	.left-button{
		width: 28px!important;
		height: 41px!important;
	}
	.content {
    	padding: 30px;
  	}
  	.demo-title {
    	align-items: center;
    	margin-bottom: 20px;
    	margin-top: 40px;
  	}
  	.titles {
    	color: #333333;
    	font-size: 40px;
  	}
  	.content-text {
   		color: #333333;
    	font-size: 30px;
    	margin-top: 20px;
  	}
	.my-currency{
		width: 750px;
		height: 255px;
	}
	.my-image{
		width: 750px;
		height: 255px;
		position: absolute;
		top: 0;
		left: 0;
	}
	.my-title{
		font-size: 36px;
		line-height: 40px;
		color: #333;
		text-align: center;
		margin-top: 65px!important;
	}
	.my-number{
		font-size: 36px;
		line-height: 40px;
		color: #ff6000;
		text-align: center;
		margin-top: 40px!important;
	}
	.game-list{
		flex-direction: row;
		padding-right: 20px;
		padding-top: 26px;
		padding-bottom: 26px;
	}
	.game-cell{
		margin-left: 20px;
	}
	.game{
		width: 380px;
		height: 200px;
	}
	.points-title{
		font-size: 30px;
		line-height: 34px;
		color: #333;
		text-align: center;
		margin-top: 30px!important;
	}
	.points-list{
		flex-direction: row;
		flex-wrap: wrap;
	}
	.points-cell{
		width: 330px;
		height: 180px;
		border-width: 1px;
		border-color: #73cc00;
		border-style: solid;
		border-radius: 10px;
		margin-top: 30px!important;
		margin-left: 30px!important;
	}
	.points-text01{
		font-size: 36px;
		line-height: 40px;
		color: #73cc00;
		margin-top: 20px!important;
		text-align: center;
	}
	.points-text02{
		font-size: 24px;
		line-height: 30px;
		color: #777;
		margin-top: 20px!important;
		text-align: center;
	}
	.points-text03{
		font-size: 24px;
		line-height: 30px;
		color: #777;
		margin-top: 10px!important;
		text-align: center;
	}
	.points-record{
		font-size: 24px;
		line-height: 30px;
		color: #777;
		text-align: center;
		margin-top: 30px!important;
		text-decoration: underline;
	}
</style>