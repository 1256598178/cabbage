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
			<text class="login-title-text">身份验证</text>
		</div>
		<div class="login-box">
			<div class="username">
				<text class="username-img iconFont">&#xe64f;</text>
				<input ref="username" @input="input1" type="text" placeholder="请输入您的手机号码" value="" class="input" />
			</div>
			<div class="username">
				<text class="password-img iconFont">&#xe614;</text>
				<input ref="passwords" @input="input2" :type="pBtn === true ? 'password' : 'text'" placeholder="请输入您的密码" class="input" />
				<image class="pBtn" @click="typeSelect" :src="pBtn === true ? 'http://47.92.164.211:8011/PublicImage/biyan-icon.png' : 'http://47.92.164.211:8011/PublicImage/zhenyan-icon.png'"></image>
			</div>
			<div class="login-tip-box">
				<text class="login-tip">{{loginTip}}</text>
			</div>
			<div class="login-btn-box">
				<text :class="[login === true ? 'login-btns' : 'login-btn']" @click="logins">下一步</text>
			</div>
			<div class="reg">
				<div class="forgot">
					<text class="forgot-text">忘记密码</text>
				</div>
				<div class="register">
					<text class="forgot-text">使用验证码验证</text>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
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
			pBtn:true,
			login:false,
			loginTip:"",
			loginValue:{
				name:"",
				word:""
			}
		}),
		methods: {
			minibarLeftButtonClick() {
				this.$router.push('-1')
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
		        if ((/^1[34578]\d{9}$/.test(this.loginValue.name)) && this.loginValue.word.length >= 6) {
		        	this.login = true;
		        } else{
		        	this.login = false;
		        }
		    },
		    input2(e) {
		    	this.loginValue.word = e.value;
		        if ((/^1[34578]\d{9}$/.test(this.loginValue.name)) && this.loginValue.word.length >= 6) {
		        	this.login = true;
		        } else{
		        	this.login = false;
		        }
		    },
			logins() {
				/** 获取元素的value值，但是是初始设置值 */
				//var name = this.$refs.username.value;
		        //var word = this.$refs.passwords.value;
				if (this.login) {
					var self=this;
					stream.fetch({
	                    method:"GET",
	                    type:'json',
	                    url:'../src/components/login/login.js',
	                    //headers:{'Content-Type':'application/x-www-form-urlencoded'},
	                    //body:'',
	                }, function(ret) {
	                	console.log(ret);
	                    if(!ret.ok){
	                        modal.toast({
	                            'message': "登录失败",
	                        })
	                    }else{
	                        //console.log('get---------:'+JSON.stringify(ret.data));
	                        //self.getResult = JSON.stringify(ret);
	
	                        modal.toast({
	                            message: "登录成功",
	                        })
	                    }
	                },function(progress) {
						//JSON.stringify(progress.length);
	                })
				}
			}
		},
		created() {
			var fontModule = weex.requireModule("dom");
	        fontModule.addRule('fontFace', {
	            'fontFamily': "iconfont",
	            'src': "url(" + this.$store.state.iconUrl + ")"
        	});
		}
	};
</script>

<style>
	.iconFont{
	    font-family: iconfont;
	}
	.login-bg{
		position: fixed;
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
	.username-img{
		width: 54px;
		font-size: 34px;
		line-height: 70px;
		color: #999;
		text-align: left;
	}
	.password-img{
		width: 54px;
		font-size: 32px;
		line-height: 70px;
		color: #999;
		text-align: left;
	}
	.pBtn{
		width: 34px;
		height: 22px;
		
	}
	.input{
		flex: 1;
		height: 70px;
		line-height: 70px;
		font-size: 30px;
		line-height: 70px !important;
		background-color: transparent;
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