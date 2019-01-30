<template>
	<div>
		<image class="login-bg" src="http://47.92.164.211:8011/PublicImage/login-bg.png"></image>
		<!--导航栏-->
		<div class="titleBar">
			<!--状态栏-->
			<text class="statusbar"></text>
			<!--标题栏-->
			<wxc-minibar title="" background-color="transparent" text-color="#000" left-button='http://47.92.164.211:8011/PublicImage/backImages.png' @wxcMinibarLeftButtonClicked="minibarLeftButtonClick"></wxc-minibar>
		</div>
		<div class="login-title">
			<text class="login-title-text">更改密码</text>
		</div>
		<div class="login-box">
			<div class="username">
				<text class="username-img iconFont">&#xe64f;</text>
				<input ref="username" @input="input1" type="text" placeholder="请输入您的手机号码" value="" class="input" />
				<text class="code-btn" :class="[logoTel == true ? 'code-btn-logo' : '',objSetInval.boolSetInval == true ? 'code-btn-active' : '']" @click="codeBtn()">{{objSetInval.phoneCode}}</text>
			</div>
			<div class="username">
				<text class="username-img iconFont">&#xe647;</text>
				<input ref="username" @input="input3" type="text" maxlength="4" placeholder="请输入验证码" value="" class="input" />
			</div>
			<div class="username">
				<text class="password-img iconFont">&#xe614;</text>
				<input ref="passwords" @input="input2" :type="pBtn === true ? 'password' : 'text'" placeholder="请输入新的密码" class="input" />
				<image class="pBtn" @click="typeSelect" :src="pBtn === true ? 'http://47.92.164.211:8011/PublicImage/biyan-icon.png' : 'http://47.92.164.211:8011/PublicImage/zhenyan-icon.png'"></image>
			</div>
			<div class="login-tip-box">
				<text class="login-tip">{{loginTip}}</text>
			</div>
			<div class="login-btn-box">
				<text :class="[login === true ? 'login-btns' : 'login-btn']" @click="register">完成修改</text>
			</div>
			<!-- 测试 -->
			<!--<text class="forgot-text">{{ss}}</text>-->
		</div>
	</div>
</template>

<script>
	import Util from '../../common/utils/utils.js'
	//const dom = weex.requireModule('dom');
	import { WxcMinibar } from 'weex-ui';

	// https://github.com/alibaba/weex-ui/blob/master/example/tab-page/config.js
	//import orderItem from './order-item.vue'
	//import Config from './config'
	import Vue from 'vue'
	//var navigator = weex.requireModule('navigator') 
	const modal = weex.requireModule('modal')
	var stream = weex.requireModule('stream')
	//const storage = weex.requireModule('storage') 
	export default {
		components: {
			WxcMinibar,
		},
		data: () => ({
			objSetInval: {
				phoneCode: '获取验证码',
				boolSetInval: false, //判断验证码按钮是否为可以点击
				time: 1000 //倒计时为一分钟
			},
			callback: '',
			pBtn: true,
			login: false,
			logoTel: false,
			loginTip: "",
			loginValue: {
				name: "", // 手机号码
				word: "", // 手机密码
				code: "", // 短信验证码
				codes: "" // 邀请码
			},
			ss: ""
		}),
		methods: {
			minibarLeftButtonClick() {
				this.$router.push('-1')
			},
			typeSelect() {
				if(this.pBtn) {
					this.pBtn = false;
				} else {
					this.pBtn = true;
				}
			},
			toParams(obj) {
				var param = ""
				for(const name in obj) {
					if(typeof obj[name] != 'function') {
						param += "&" + name + "=" + encodeURI(obj[name])
					}
				}
				return param.substring(1)
			},
			input1(e) {
				this.loginValue.name = e.value;
				if((/^1[34578]\d{9}$/.test(this.loginValue.name))) {
					this.logoTel = true;
					// console.log(this.logoTel)
				} else {
					this.logoTel = false;
				}
				if((/^1[34578]\d{9}$/.test(this.loginValue.name)) && this.loginValue.word.length >= 6 && this.loginValue.code.length == 4) {
					this.login = true;
				} else {
					this.login = false;
				}
			},
			input2(e) {
				this.loginValue.word = e.value;
				if((/^1[34578]\d{9}$/.test(this.loginValue.name)) && this.loginValue.word.length >= 6 && this.loginValue.code.length == 4) {
					this.login = true;
				} else {
					this.login = false;
				}
			},
			input3(e) {
				this.loginValue.code = e.value;
				if((/^1[34578]\d{9}$/.test(this.loginValue.name)) && this.loginValue.word.length >= 6 && this.loginValue.code.length == 4) {
					this.login = true;
				} else {
					this.login = false;
				}
			},
			// 短信验证交互
			codeBtn() {
				var self = this;
				// 判断倒计时是否结束 和 手机号是否正确
				if(!this.objSetInval.boolSetInval && this.logoTel) {
					//判断是否点击执行
					var second = 60;
					var _this = this;
					_this.objSetInval.boolSetInval = true;
					var time = setInterval(function() {
						second--;
						_this.objSetInval.phoneCode = '(' + second + ')秒可重发';
						if(second <= 0) {
							clearInterval(time)
							_this.objSetInval.phoneCode = '获取验证码'
							_this.objSetInval.boolSetInval = false;
						}
					}, _this.objSetInval.time)
					Util.WeexAjax({
						url: 'api/account/getsmscode',
						method: 'POST',
						type: 'JSON',
						body: {
							'MobilePhone': +this.loginValue.name
						},
						callback: function(ret) {
							const rets = JSON.parse(ret)
							if(rets.Status == 0) {
								self.loginTip = rets.Message + '请稍后重试';
							}
						}
					})
				} else {
					this.loginTip = '请输入正确的手机号'
				}
			},
			register() {
				var self = this;
				/** 获取元素的value值，但是是初始设置值 */
				//var name = this.$refs.username.value;
				//var word = this.$refs.passwords.value;
				if(this.login) {
					// console.log(this.loginValue.code)
					if(/^[a-z0-9_]{6,15}$/.test(this.loginValue.word)) {
						Util.WeexAjax({
							url: 'api/account/findpassword',
							method: 'POST',
							type: 'JSON',
							body: {
								// 手机号
								'MobilePhone': this.loginValue.name,
								// 短信验证码
								'ValidateCode': this.loginValue.code,
								// 密码
								'PassWord': this.loginValue.word,
							},
							callback: function(ret) {
								if(Util.device() == 0 || Util.device() == 2) {
									const rets = JSON.parse(ret)
									//console.log(rets)
									//self.ss = rets;
									if(rets.Status == 0) {
										modal.toast({
											message: rets,
											duration: 1
										})
										self.loginTip = rets.Message;
									} else if(rets.Status == 1){
										modal.toast({
											message: rets.Message,
											duration: 1
										})
										Util.bindThis(Util.jump('components/my/my.js'),self.$getConfig())
									}
								} else if(Util.device() == 1) {
									const rets = eval(ret)
									console.log(rets)
									self.ss = rets;
									if(rets.Status == 0) {
										modal.toast({
											message: rets.Message,
											duration: 1
										})
										self.loginTip = rets.Message;
									} else if(rets.Status == 1){
										modal.toast({
											message: rets.Message,
											duration: 1
										})
										Util.bindThis(Util.jump('components/my/my.js'),self.$getConfig())
									}
								}
							}
						})
					} else {
						this.loginTip = '密码应以字母、数字、下划线开头'
					}
				}
			}
		},
		created() {
			var fontModule = weex.requireModule("dom");
			fontModule.addRule('fontFace', {
				'fontFamily': "iconfont",
				'src': "url('//at.alicdn.com/t/font_948634_hrhla0ojg9a.ttf')"
			});
		}
	};
</script>

<style>
	.iconFont {
		font-family: iconfont;
	}
	
	.login-bg {
		position: fixed;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
	}
	
	.left {
		padding-left: 20px !important;
	}
	
	.left-button {
		width: 28px !important;
		height: 41px !important;
	}
	
	.login-title {
		border-bottom-width: 1px;
		border-bottom-color: #a0a0a0;
		border-bottom-style: solid;
		padding-left: 20px;
	}
	
	.login-title-text {
		font-size: 48px;
		line-height: 90px;
		color: #333;
	}
	
	.login-box {
		padding-left: 20px;
		padding-right: 20px;
		position: fixed;
		top: 210px;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: 100;
	}
	
	.username {
		flex-direction: row;
		align-items: center;
		padding-top: 20px;
		padding-bottom: 20px;
		border-bottom-width: 1px;
		border-bottom-color: #dcdcdc;
		border-bottom-style: solid;
	}
	
	.username-img {
		width: 54px;
		font-size: 34px;
		line-height: 70px;
		color: #999;
		text-align: left;
	}
	
	.password-img {
		width: 54px;
		font-size: 32px;
		line-height: 70px;
		color: #999;
		text-align: left;
	}
	
	.pBtn {
		width: 34px;
		height: 22px;
	}
	
	.code-btn {
		width: 170px;
		height: 50px;
		border-width: 1px;
		border-color: #a0a0a0;
		border-style: solid;
		border-radius: 25px;
		font-size: 24px;
		line-height: 48px;
		/*color: #73cc00;*/
		color: #707070;
		text-align: center;
		margin-top: 10px !important;
		margin-left: 20px !important;
	}
	
	.code-btn-logo {
		color: #73cc00;
	}
	
	.code-btn-active {
		color: #707070;
	}
	
	.input {
		flex: 1;
		height: 70px;
		line-height: 70px;
		font-size: 30px;
		line-height: 70px !important;
		background-color: transparent;
		outline: none;
	}
	
	.login-tip-box {
		width: 710px;
		height: 60px;
	}
	
	.login-tip {
		font-size: 24px;
		line-height: 40px;
		color: #ff0000;
		text-align: center;
	}
	
	.login-btn {
		height: 80px;
		font-size: 30px;
		line-height: 80px;
		border-radius: 40px;
		color: #fff;
		text-align: center;
		background-color: #abd475;
	}
	
	.login-btns {
		height: 80px;
		font-size: 30px;
		line-height: 80px;
		border-radius: 40px;
		color: #fff;
		text-align: center;
		background-color: #73cc00;
	}
	
	.reg {
		flex-direction: row;
		margin-top: 15px;
	}
	
	.forgot {
		flex: 1;
	}
	
	.forgot-text {
		width: auto;
		font-size: 24px;
		line-height: 30px;
		color: #73cc00;
	}
	
	.register {
		width: auto;
		flex-direction: row;
	}
	
	.reg-text {
		width: auto;
		font-size: 24px;
		line-height: 30px;
		color: #666;
	}
	
	.other {
		justify-content: center;
		text-align: center;
		margin-top: 230px;
	}
	
	.other-text {
		font-size: 24px;
		line-height: 30px;
		color: #666;
		text-align: center;
	}
	
	.other-line {
		width: 40px;
		height: 1px;
		background-color: #a0a0a0;
		margin-top: 20px;
		margin-bottom: 25px;
		margin-left: 335px;
		margin-right: 335px;
	}
	
	.other-login {
		flex-direction: row;
		justify-content: center;
	}
	
	.login-way {
		width: 86px;
		height: 86px;
		margin-left: 15px;
		margin-right: 15px;
	}
</style>