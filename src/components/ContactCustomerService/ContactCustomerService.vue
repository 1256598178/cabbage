<template>
	<div class="wrap">
		<!--导航栏-->
		<div class="titleBar">
			<!--状态栏-->
			<text class="statusbar"></text>
			<!--标题栏-->
			<wxc-minibar title="联系客服" background-color="#73cc00" text-color="#FFFFFF" left-button='../src/common/images/backImage.png' right-text="" @wxcMinibarLeftButtonClicked="minibarLeftButtonClick">
				<text class="title" slot="middle">联系客服</text>
			</wxc-minibar>
			<text class="border-cell"></text>
		</div>
		<div class="bind-floor">
			<text class="fl iconFont online-cs">&#xe672;</text>
			<text class="fm">在线客服</text>
			<text class="fr iconFont">&#xe7ad;</text>
		</div>
		<text class="border-cells"></text>
		<div class="bind-floor">
			<text class="fl iconFont phone-cs">&#xe6af;</text>
			<text class="fm">电话客服</text>
			<text class="fr iconFont">&#xe7ad;</text>
		</div>
		<div class="work-time">
			<text class="work-time1">客服工作时间</text>
			<text class="work-time2">周一~周五： 8:30~20:00</text>
			<text class="work-time2">节假日： 8:30~20:00</text>
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
			
		}),
		methods: {
			minibarLeftButtonClick() {
				this.$router.push('-1')
			}
		},
		created() {
			var fontModule = weex.requireModule("dom");
	        fontModule.addRule('fontFace', {
	            'fontFamily': "iconfont",
	            'src': "url('//at.alicdn.com/t/font_948634_2y8ia9nzm4b.ttf')"
        	});
		}
	}
</script>

<style>
	.iconFont{
	    font-family: iconfont;
	}
	.wrap{
		position: fixed;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
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
	.border-cell {
		background-color: #f5f5f5;
		width: 750px;
		height: 20px;
		align-items: center;
		justify-content: center;
	}
	.border-cells {
		background-color: #f5f5f5;
		width: 750px;
		height: 10px;
		align-items: center;
		justify-content: center;
	}
	.bind-floor{
		flex-direction: row;
		padding-left: 20px;
		padding-right: 20px;
		background-color: #fff;
	}
	.fl{
		width: 46px;
		font-size: 34px;
		line-height: 70px;
	}
	.fm{
		flex: 1;
		font-size: 26px;
		line-height: 70px;
		color: #333;
	}
	.fr{
		width: auto;
		font-size: 30px;
		line-height: 70px;
		color: #dcdcdc;
	}
	.online-cs{
		color: #83b8ff;
	}
	.phone-cs{
		color: #f7a1a1;
	}
	.work-time1{
		font-size: 22px;
		line-height: 32px;
		text-align: center;
		color: #999;
		margin-top: 15px;
	}
	.work-time2{
		font-size: 22px;
		line-height: 32px;
		text-align: center;
		color: #555;
	}
</style>