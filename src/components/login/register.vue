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
			<text class="login-title-text">账户注册</text>
		</div>
		<div class="login-box">
			<div class="username">
				<image class="username-img" src="http://47.92.164.211:8011/PublicImage/phone@22x34.png"></image>
				<input ref="username" @input="input1" type="text" placeholder="请输入您的手机号码" value="" class="input" />
				<text class="code-btn" :class="[logoTel == true ? 'code-btn-logo' : '',objSetInval.boolSetInval == true ? 'code-btn-active' : '']" @click="codeBtn()">{{objSetInval.phoneCode}}</text>
			</div>
			<div class="username">
				<image class="password-img" src="http://47.92.164.211:8011/PublicImage/code@20x38.png"></image>
				<input ref="username" @input="input3" type="text" maxlength ="4" placeholder="请输入验证码" value="" class="input" />
			</div>
			<div class="username">
				<image class="password-img" src="http://47.92.164.211:8011/PublicImage/password@24x32.png"></image>
				<input ref="passwords" @input="input2" :type="pBtn === true ? 'password' : 'text'" placeholder="请输入您的密码" class="input" />
				<image class="pBtn" @click="typeSelect" :src="pBtn === true ? 'http://47.92.164.211:8011/PublicImage/biyan-icon.png' : 'http://47.92.164.211:8011/PublicImage/zhenyan-icon.png'"></image>
			</div>
			<div class="username">
				<image class="password-img" src="http://47.92.164.211:8011/PublicImage/share@20x38.png"></image>
				<input ref="username" @input="input4" type="text" placeholder="请输入邀请码（选填）" value="" class="input" />
			</div>
			<div class="login-tip-box">
				<text class="login-tip">{{loginTip}}</text>
			</div>
			<div class="login-btn-box">
				<text :class="[login === true ? 'login-btns' : 'login-btn']" @click="register">完成注册</text>
			</div>
			<div class="reg">
				<div class="register">
					<text class="reg-text">用户注册代表同意</text>
					<text class="forgot-text">《用户协议》</text>
					<text class="reg-text">和</text>
					<text class="forgot-text">《隐私政策》</text>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import Util from '../../common/utils/utils.js'
	import api from '../../common/api/api.js'
	//const dom = weex.requireModule('dom');
	import { WxcMinibar } from 'weex-ui';
	const modal = weex.requireModule('modal') 
	var stream = weex.requireModule('stream')
	export default {
		data() {
			return {
				objSetInval: {
					phoneCode: '获取验证码',
					boolSetInval: false, //判断验证码按钮是否为可以点击
					time: 1000//倒计时为一分钟
				},
				callback: '',
				pBtn:true,
				login:false,
				logoTel: false,
				loginTip: "",
				loginValue:{
					name:"",// 手机号码
					word:"",// 手机密码
					code:"",// 短信验证码
					codes:""// 邀请码
				}
			}
		},
		methods: {
			minibarLeftButtonClick() {
				var self = this;
	            // Util.pops({
	            //     "webBack": function(){
				self.$router.go(-1)
	            //     },
	            //     "phoneBack": function(){
	            //     	weex.requireModule('navigator').pop({
			          //       animated: "true"
			          //   }, event => {
			          //   })
	            //     }
	            // })
			},
			typeSelect() {
				if (this.pBtn) {
					this.pBtn = false;
				} else{
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
		    	if((/^1[34578]\d{9}$/.test(this.loginValue.name))){
		    		this.logoTel = true;
		        	// console.log(this.logoTel)
		    	}else{
		    		this.logoTel = false;
		    	}
		        if ((/^1[34578]\d{9}$/.test(this.loginValue.name)) && this.loginValue.word.length >= 6 && this.loginValue.code.length == 4) {
		        	this.login = true;
		        } else{
		        	this.login = false;
		        }
		    },
		    input2(e) {
		    	this.loginValue.word = e.value;
		        if ((/^1[34578]\d{9}$/.test(this.loginValue.name)) && this.loginValue.word.length >= 6 && this.loginValue.code.length == 4) {
		        	this.login = true;
		        } else{
		        	this.login = false;
		        }
		    },
		    input3(e) {
		    	this.loginValue.code = e.value;
		        if ((/^1[34578]\d{9}$/.test(this.loginValue.name)) && this.loginValue.word.length >= 6 && this.loginValue.code.length == 4) {
		        	this.login = true;
		        } else{
		        	this.login = false;
		        }
		    },
		    input4(e) {
		    	this.loginValue.codes = e.value;
		    	// this.ss = e.value;
		    	// console.log(this.loginValue.codes)
		    },
		    // 短信验证交互
		    codeBtn() {
		    	var self = this;
		    	// 判断倒计时是否结束 和 手机号是否正确
		    	if(!this.objSetInval.boolSetInval && this.logoTel){
		    	// if(true){
					//判断是否点击执行
		    		var second = 60;
			    	var _this = this;
		    		_this.objSetInval.boolSetInval = true;
		    		var time = setInterval(function(){
			    		second--;
						_this.objSetInval.phoneCode = '('+ second +')秒可重发';
						if(second<=0){
							clearInterval(time)
							_this.objSetInval.phoneCode = '获取验证码'
							_this.objSetInval.boolSetInval = false;
						}
			    	},_this.objSetInval.time)
			    	Util.WeexAjax({
			    		url: api.GETCODE_URL,
			    		method: 'POST',
			    		type: 'JSON',
			    		body: {'MobilePhone': + this.loginValue.name},
			    		// body: '17718157597',
			    		callback: function(ret){
			    			// var rets = Util.JsonFormat(ret);
			    			// const rets = JSON.parse(ret)
				    		console.log(ret)
				    		// self.ss = rets;
				    		modal.toast({
				    			message: ret.Message,
				    			duration: 1
				    		})
			    			if(ret.Status == 0){
			    				self.loginTip = ret.Message + '请稍后重试';
			    			}
			    		}
			    	})
		    	}else{
		    		this.loginTip = '请输入正确的手机号'
		    	}
		    },
			register() {
				/** 获取元素的value值，但是是初始设置值 */
				//var name = this.$refs.username.value;
		        //var word = this.$refs.passwords.value;
		        var self = this;
				if (this.login) {
					if(/^[a-z0-9_]{6,15}$/.test(this.loginValue.word)){
						Util.WeexAjax({
				    		url: api.REGISTER_URL,
				    		method: 'POST',
				    		type: 'JSON',
				    		body: {
				    			// 手机号
				    			'MobilePhone': this.loginValue.name,
				    			// 短信验证码
				    			'ValidateCode': this.loginValue.code,
				    			// 密码
				    			'PassWord': this.loginValue.word,
				    			// 邀请码
				    			'InvitationCode': this.loginValue.codes
				    		},
				    		callback: function(ret){
				    			// 判断当前设备
				    			if(ret.Status == 0){
				    				console.log(self)
				    				self.loginTip = ret.Message
				    			}else if(ret.Status == 1){
									// Util.pops({
	        //                             "webBack": function(){
	                                        self.$router.go(-1)
	                                //     },
	                                //     "phoneBack": function(){}
	                                // })
				    			}else {
				    				modal.toast({
						    			message: '请求错误',
						    			duration: 1
						    		})
				    			}
				    		}
				    	})
					}else{
						this.loginTip = '密码应以字母、数字、下划线开头'
					}
				}
			}
		},
		created() {
			var fontModule = weex.requireModule("dom");
	        fontModule.addRule('fontFace', {
	            'fontFamily': "iconfont",
	            'src': "url('" + api.iconUrl + "')"
	        })
		},
		components: {
			WxcMinibar,
		}
	};
</script>

<style>
	.iconFont{
	    font-family: iconfont;
	}
	.login-bg{
		position: fixed;
		width: 750px;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
	}
	.left{
		padding-left: 20px !important;
	}
	.left-button{
		width: 28px !important;
		height: 41px !important;
	}
	.login-title{
		border-bottom-width: 1px;
		border-bottom-color: #a0a0a0;
		border-bottom-style: solid;
		padding-left: 20px;
	}
	.login-title-text{
		font-size: 48px;
		line-height: 90px;
		color: #333;
	}
	.login-box{
		padding-left: 20px;
		padding-right: 20px;
		position: fixed;
		top: 210px;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: 100;
	}
	.username{
		flex-direction: row;
		align-items:center;
		padding-top: 20px;
		padding-bottom: 20px;
		border-bottom-width: 1px;
		border-bottom-color: #dcdcdc;
		border-bottom-style: solid;
	}
	.username-img {
	    width: 42px;
	    height: 44px;
	    margin-right: 30px;
	}

	.password-img {
	    width: 40px;
	    height: 44px;
	    margin-right: 32px;
	}


	.pBtn{
		width: 34px;
		height: 22px;
	}
	.code-btn{
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
	.code-btn-logo{
		color: #73cc00;
	}
	.code-btn-active{
		color: #707070;
	}
	.input{
		flex: 1;
		height: 70px;
		line-height: 70px;
		font-size: 30px;
		line-height: 70px !important;
		background-color: transparent;
		outline: none;
	}
	.login-tip-box{
		width: 710px;
		height: 60px;
	}
	.login-tip{
		font-size: 24px;
		line-height: 40px;
		color: #ff0000;
		text-align: center;
	}
	.login-btn{
		height: 80px;
		font-size: 30px;
		line-height: 80px;
		border-radius: 40px;
		color: #fff;
		text-align: center;
		background-color: #abd475;
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
	.other{
		justify-content: center;
		text-align: center;
		margin-top: 230px;
	}
	.other-text{
		font-size: 24px;
		line-height: 30px;
		color: #666;
		text-align: center;
	}
	.other-line{
		width: 40px;
		height: 1px;
		background-color: #a0a0a0;
		margin-top: 20px;
		margin-bottom: 25px;
		margin-left: 335px;
		margin-right: 335px;
	}
	.other-login{
		flex-direction: row;
		justify-content: center;
	}
	.login-way{
		width: 86px;
		height: 86px;
		margin-left: 15px;
		margin-right: 15px;
	}
</style>