<template>
	<div class="wrap">
		<!--导航栏-->
		<div class="titleBar">
			<!--状态栏-->
			<text class="statusbar"></text>
			<!--标题栏-->
			<wxc-minibar title="余额" background-color="#73cc00" text-color="#FFFFFF" left-button='http://47.92.164.211:8011/PublicImage/backImage.png' right-text="明细" @wxcMinibarLeftButtonClicked="minibarLeftButtonClick" @wxcMinibarRightButtonClicked="">
				<text class="title" slot="middle">余额</text>
			</wxc-minibar>
		</div>
		<div class="my-currency">
			<image class="my-image" src="../src/components/balance/balance-bg.png"></image>
			<text class="my-title">我的余额（元）</text>
			<text class="my-number">0.00</text>
		</div>
		<div class="points">
			<text class="points-title">余额充值</text>
			<div class="points-list">
				<div :class="[crt===indexs? 'points-cell-crt' : 'points-cell']" v-for="(nums,indexs) in mList" @click="selects(indexs)" :key="indexs">
					<text :class="[crt===indexs? 'points-text01-crt' : 'points-text01']">{{nums.money}}元</text>
					<text :class="[crt===indexs? 'points-text02-crt' : 'points-text02']">送{{nums.points}}白菜币</text>
				</div>
			</div>
		</div>
		<div class="login-btn-box">
			<text class="login-btns">确认充值</text>
		</div>
		<div class="reg">
			<div class="register">
				<text class="reg-text">确认充值代表已阅读并同意</text>
				<text class="forgot-text">《绿白菜充值条款》</text>
			</div>
		</div>
	</div>
</template>

<script>
	import { WxcMinibar } from 'weex-ui';
	
	const navigator = weex.requireModule('navigator') 
	
	export default {
		components: {
			WxcMinibar,
		},
		data: () => ({
			crt:0,
			mList:[
				{
					money:"100",
					points:"100",
					
				},{
					money:"200",
					points:"200",
					
				},{
					money:"300",
					points:"300",
					
				},{
					money:"500",
					points:"500",
					
				},{
					money:"1000",
					points:"1000",
					
				},{
					money:"3000",
					points:"3000",
					
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
					case 4: // 退款服务
						flag = 1000
						break
					case 5: // 售后服务
						flag = 3000
						break
				}
			}
		},
		created() {
			//this.selects(0);
		}
	}
</script>

<style lang="stylus" scoped>
	.wrap{
		background-color: #f5f5f5;
	}
	.title{
		font-size: 42px;
		color: #fff;
	}
	.left{
		padding-left: 20px !important;
	}
	.right{
		padding-right: 20px !important;
	}
	.left-button{
		width: 28px !important;
		height: 41px !important;
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
		color: #fff;
		margin-top: 40px;
		margin-left: 40px;
	}
	.my-number{
		font-size: 48px;
		line-height: 50px;
		color: #fff;
		margin-top: 20px;
		margin-left: 40px;
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
		margin-top: 30px;
	}
	.points-list{
		flex-direction: row;
		flex-wrap: wrap;
	}
	.points-cell{
		width: 330px;
		height: 150px;
		border-width: 1px;
		border-color: #777;
		border-style: solid;
		border-radius: 10px;
		margin-top: 30px;
		margin-left: 30px;
	}
	.points-text01{
		font-size: 36px;
		line-height: 40px;
		color: #777;
		margin-top: 25px;
		text-align: center;
	}
	.points-text02{
		font-size: 24px;
		line-height: 30px;
		color: #777;
		margin-top: 20px;
		text-align: center;
	}
	.points-cell-crt{
		width: 330px;
		height: 150px;
		border-width: 1px;
		border-color: #73cc00;
		border-style: solid;
		border-radius: 10px;
		margin-top: 30px;
		margin-left: 30px;
	}
	.points-text01-crt{
		font-size: 36px;
		line-height: 40px;
		color: #73cc00;
		margin-top: 25px;
		text-align: center;
	}
	.points-text02-crt{
		font-size: 24px;
		line-height: 30px;
		color: #73cc00;
		margin-top: 20px;
		text-align: center;
	}
	.points-record{
		font-size: 24px;
		line-height: 30px;
		color: #777;
		text-align: center;
		margin-top: 30px;
		text-decoration: underline;
	}
	.login-btn-box{
		padding-left: 20px;
		padding-right: 20px;
		margin-top: 70px;
	}
	.login-btns{
		height: 80px;
		font-size: 30px;
		line-height: 80px;
		border-radius: 40px;
		color: #fff;
		text-align: center;
		background-color: #73cc00;
	}
	.reg{
		flex-direction: row;
		margin-top: 15px;
		padding-left: 20px;
		padding-right: 20px;
	}
	.forgot{
		flex: 1;
	}
	.forgot-text{
		width: auto;
		font-size: 24px;
		line-height: 30px;
		color: #73cc00;
	}
	.register{
		width: auto;
		flex-direction: row;
	}
	.reg-text{
		width: auto;
		font-size: 24px;
		line-height: 30px;
		color: #666;
	}
</style>