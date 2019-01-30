<template>
	<div>
		<!--导航栏-->
		<div class="titleBar">
			<!--状态栏-->
			<text class="statusbar"></text>
			<!--标题栏-->
			<wxc-minibar title="用户协议" background-color="#73cc00" text-color="#FFFFFF" left-button='http://47.92.164.211:8011/PublicImage/backImage.png' right-text="" @wxcMinibarLeftButtonClicked="minibarLeftButtonClick">
				<text class="title" slot="middle">用户协议</text>
			</wxc-minibar>
		</div>
		<web class="cutform" src="https://vuejs.org"></web>
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
	.cutform{
		position: fixed;
		top: 90px;
		bottom: 0;
		left: 0;
		right: 0;
	}
</style>