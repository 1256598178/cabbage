<template>
	<div class="wrap">
		<!--导航栏-->
		<div class="titleBar">
			<!--状态栏-->
			<text class="statusbar"></text>
			<!--标题栏-->
			<wxc-minibar title="绑定微信" background-color="#73cc00" text-color="#FFFFFF" left-button='http://47.92.164.211:8011/PublicImage/backImage.png' right-text="解除绑定" @wxcMinibarLeftButtonClicked="minibarLeftButtonClick">
				<text class="title" slot="middle">绑定微信</text>
			</wxc-minibar>
			<text class="border-cell"></text>
		</div>
		
		<div class="bind-floor">
			<text class="fl">当前账号</text>
			<text class="fr">18469113870</text>
		</div>
		<div class="bind-floor">
			<text class="fl">微信名</text>
			<text class="fr">68分29秒</text>
		</div>
		<div class="bind-floor bind-floor-last">
			<text class="fl">绑定状态</text>
			<text class="fr">已绑定</text>
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
	.bind-floor{
		flex-direction: row;
		padding-left: 20px;
		padding-right: 20px;
		border-bottom-width: 1px;
		border-bottom-color: #dcdcdc;
		border-bottom-style: solid;
		background-color: #fff;
	}
	.bind-floor-last{
		border-bottom-color: transparent;
	}
	.fl{
		width: auto;
		font-size: 24px;
		line-height: 70px;
		color: #333;
	}
	.fr{
		flex: 1;
		font-size: 24px;
		line-height: 70px;
		color: #777;
		text-align: right;
	}
</style>