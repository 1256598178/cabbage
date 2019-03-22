<template>
	<div class="wrap">
		<!--导航栏-->
		<div class="titleBar">
			<!--状态栏-->
			<text class="statusbar"></text>
			<!--标题栏-->
			<v-header :titleName="titleName" :backPage="true"></v-header>
			<text class="border-cell"></text>
		</div>
		<scroller class="scroller">
			<div class="bind-floor">
				<text class="fl">应付金额</text>
				<text class="fm red">¥{{money}}元</text>
			</div>
			<text class="border-cells"></text>
			<div class="bind-floor border-b">
				<text class="fl">支付方式</text>
			</div>
			<div class="bind-floor border-b" @click="">
				<image class="fl fl1 i1" src="http://47.92.164.211:8011/PublicImage/tt1.png"></image>
				<text class="fm">余额（0.00元）</text>
				<image class="lemet-title-address-right" src="http://47.92.164.211:8011/PublicImage/moreImage@16x25.png"></image>
			</div>
			<div class="bind-floor border-b" @click="">
				<image class="fl fl2 i2" src="http://47.92.164.211:8011/PublicImage/tt2.png"></image>
				<text class="fm">支付宝</text>
				<image class="lemet-title-address-right" src="http://47.92.164.211:8011/PublicImage/moreImage@16x25.png"></image>
			</div>
			<div class="bind-floor" @click="">
				<image class="fl fl3 i3" src="http://47.92.164.211:8011/PublicImage/tt3.png"></image>
				<text class="fm">微信支付</text>
				<image class="lemet-title-address-right" src="http://47.92.164.211:8011/PublicImage/moreImage@16x25.png"></image>
			</div>
			<!--<div class="exit-box">
				<text class="exit-btn" @click="">确认支付</text>
			</div>-->
		</scroller>
		<wxc-dialog :title="title"
                :content="content"
                :confirm-text="confirmText"
                :cancel-text="cancelText"
                :show="show"
                :single="single"
                :is-checked="isChecked"
                :no-prompt-text="noPromptText"
                :show-no-prompt="showNoPrompt"
                main-btn-color="#ff0000"
                second-btn-color="#0000ff"
                @wxcDialogCancelBtnClicked="wxcDialogCancelBtnClicked"
                @wxcDialogConfirmBtnClicked="wxcDialogConfirmBtnClicked"
                @wxcDialogNoPromptClicked="wxcDialogNoPromptClicked">
    	</wxc-dialog>
	</div>
</template>

<script>
	import header from '../header/orderHeader.vue'
	import { WxcMinibar, WxcDialog, WxcRadio } from 'weex-ui';
	import Util from '../../../common/utils/utils.js'
	import api from '../../../common/api/api.js'
	const navigator = weex.requireModule('navigator') 
	
	export default {
		components: {
			WxcMinibar,
			WxcDialog,
			WxcRadio,
			"v-header": header 
		},
		data: () => ({
			titleName: '收银台',
			title: '标题',
	        content: '内容',
	        confirmText: '确定',
	        cancelText: '取消',
	        noPromptText: '不再提示',
	        show: false,
	        single: false,
	        showNoPrompt: false,
	        isChecked: false,
	        money:"0.00",
	        pBtn:0,
		}),
		methods: {
			selects (indexs) {
	        	this.pBtn = indexs;
				var flag = 0
				switch(indexs) {
					case 0: // 余额支付 
						flag = 0
						break
					case 1: // 支付宝支付
						flag = 1
						break
					case 2: // 微信支付
						flag = 2
						break
				} 
				if (flag==0) {
					
				} else if(flag==1){
					
				} else if(flag==2){
					
				}
	      	},
	      	wxcDialogCancelBtnClicked () {
	      		// must setting,control by yourself
	        	this.show = false;
	      	},
	      	wxcDialogConfirmBtnClicked () {
	      		// must setting,control by yourself
	        	this.show = false;
	      	},
	      	wxcDialogNoPromptClicked (e) {
	      		// must setting,control by yourself
	        	this.isChecked = e.isChecked;
	      	},
	      	wxcRadioListChecked(e) {
	      		this.checkedInfo = e;
	      	}
		},
		created() {
			var _this = this;
			var fontModule = weex.requireModule("dom");
	        fontModule.addRule('fontFace', {
	            'fontFamily': "iconfont",
	            'src': "url(" + api.iconUrl + ")"
        	});
        	// this.money = Util.analAjax().TotalPrice
        	this.money = Util.analAjax({"routerName":function(){return _this.$route.query}}).TotalPrice
		}
	}
</script>

<style>
	.i1{
		width: 27px;
		height: 29px;
	}
	.i2{
		width: 28px;
		height: 27px;
	}
	.i3{
		width: 27px;
		height: 27px;
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
		padding-left: 20px!important;
	}
	.right{
		padding-right: 20px!important;
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
		align-items: center;
		padding-left: 20px;
		padding-right: 20px;
		background-color: #fff;
	}
	.border-b{
		flex-direction: row;
		align-items: center;
		border-bottom-width: 1px;
		border-bottom-color: #dcdcdc;
		border-bottom-style: solid;
	}
	.lemet-title-address-right{
		width: 16px;
		height: 25px;
	}
	.fl{
		width: auto;
		font-size: 26px;
		line-height: 70px;
	}
	.fl1{
		font-size: 34px;
		color: #999;
	}
	.fl2{
		font-size: 34px;
		color: #009fe8;
	}
	.fl3{
		font-size: 34px;
		color: #41b035;
	}
	.fm{
		flex: 1;
		font-size: 26px;
		line-height: 70px;
		color: #777;
		padding-left: 10px!important;
	}
	.red{
		font-size: 34px;
		color: #f26100;
		text-align: right;
	}
	.online-cs{
		color: #83b8ff;
	}
	.phone-cs{
		color: #f7a1a1;
	}
	.work-time{
		position: fixed;
		top: 260px;
		bottom: 0;
		left: 0;
		right: 0;
		background-color: #f5f5f5;
	}
	.work-time1{
		font-size: 22px;
		line-height: 32px;
		text-align: center;
		color: #999;
		margin-top: 15px!important;
	}
	.work-time2{
		font-size: 22px;
		line-height: 32px;
		text-align: center;
		color: #555;
	}
	.exit-btn{
		width: 710px;
		height: 70px;
		background-color: #73cc00;
		font-size: 30px;
		line-height: 70px;
		text-align: center;
		color: #fff;
		border-radius: 35px;
		margin-top: 80px!important;
		margin-left: 20px!important;
	}
</style>