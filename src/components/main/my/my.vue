<template>
	<div class="my">
		<header class="my-header-title-wrapper">
			<text class="my-header-title">{{titleName}}</text>
			<div class="my-header-info-wrapper">
				<image class="my-header-info" src="http://47.92.164.211:8011/PublicImage/info@42x34.png"></image>
				<text class="info-number">2</text>
			</div>
		</header>
		<list>
			<cell>
				<div class="my-header">
					<div class="my-info-wrapper">
						<div class="my-info-wrapper-left">
							<div class="my-info-logo-wrapper">
								<image class="my-info-logo" src="http://47.92.164.211:8011/PublicImage/logo.png"></image>
							</div>
							<!-- 登录过后信息 -->
							<div class="my-info-sign-wrapper" v-if="loginBool">
								<text class="my-info-sign-time">68分59秒</text>
								<div class="my-info-sign-box">
									<image class="my-info-sign-iconfont" src="http://47.92.164.211:8011/PublicImage/sign@20x20.png"></image>
									<text class="my-info-sign-text">签到</text>
								</div>
							</div>
							<!-- 待登录 -->
							<text class="mylogin" v-if="!loginBool" @click="loginBtn()">注册/登录</text>
						</div>
						<div class="my-info-wrapper-right">
							<div class="my-info-colum-wrapper">
								<div class="my-info-colum-list" v-for="(item,index) in 4" :key="index">
									<div class="my-info-colum-list-left">
										<text class="my-info-colum-text">余额</text>
									    <text class="my-info-colum-num">0.00元</text>
									</div>
									<div class="my-info-colum-line" v-if="index != 3"></div>
								</div>
							</div>
						</div>
					</div>
				</div><!-- /header -->
				<div class="my-member-area">
					<div class="my-member-area-title">
						<div class="my-member-area-title-left">
							<image class="member-iconfont" src="http://47.92.164.211:8011/PublicImage/crown@35x39.png"></image>
							<text class="my-member-area-title-left-text">会员权益</text>
						</div>
						<div class="my-member-area-title-right">
							<text class="my-member-area-title-right-text">开通会员</text>
						</div>
					</div>
					<div class="my-member-area-body">
						<div class="my-member-area-body-list" v-for="item in 6">
							<image class="my-member-area-body-list-image" src="http://47.92.164.211:8011/PublicImage/merage_01.png"></image>
							<text class="my-member-area-body-list-text">尊享黑卡</text>
						</div>
					</div>
				</div>
			</cell>
			<cell>
				<div class="cell-box my-order-wrapper">
					<div class="my-order-title">
						<text class="my-order-title-text">我的订单</text>
						<div class="my-all-order-title">
							<text class="my-all-order-title">全部订单</text>
							<image class="my-all-order-title-icon" src="http://47.92.164.211:8011/PublicImage/order@left.png"></image>
						</div>
					</div>
					<div class="my-order-body">
						<div class="my-order-body-list" v-for="item in 5">
							<image class="my-order-body-list-image" src="http://47.92.164.211:8011/PublicImage/order_01.png"></image>
							<text class="info-number my-order-body-list-number">2</text>
							<text class="my-order-body-list-image-text">待付款</text>
						</div>
					</div>
				</div>
			</cell>
			<cell>
				<div class="cell-box my-tell-me-wrapper">
					<image class="my-tell-me-image" src="http://47.92.164.211:8011/PublicImage/link_01.png"></image>
					<image class="my-tell-me-image" src="http://47.92.164.211:8011/PublicImage/link_02.png"></image>
				</div>
			</cell>
			<cell>
				<div class="cell-box my-tool-wrapper">
					<div class="my-order-title">
						<text class="my-order-title-text">便捷工具</text>
					</div>
					<div class="my-tool-body">
						<div class="my-tool-body-list" v-for="item in ConTool">
							<image class="my-tool-body-list-image" :src="item.ImageUrl"></image>
							<text class="my-tool-body-list-image-text">{{item.title}}</text>
						</div>
					</div>
				</div>
				<!-- <text class="my-tool-body-list-image-text">{{TOKEN}}</text> -->
			</cell>
		</list>
	</div>
</template>

<script>
import Util from '../../../common/utils/utils.js'
import api from '../../../common/api/api.js'
const modal = weex.requireModule('modal')
const storage = weex.requireModule('storage')
export default {
	data(){
		return {
			titleName: '我的',
			USERID: 'user_id',
			TOKEN: 'user_token',
			loginBool: false,//判断是否登录 显示登录注册
			myInfo: {}, //我的信息
			ConTool: [
			    {
			      title: '我的收藏',
			      ImageUrl: 'http://47.92.164.211:8011/PublicImage/tool_01.png',
			      navigationUrl: 'components/my/my.js'
			    },
			    {
			      title: '发现',
			      ImageUrl: 'http://47.92.164.211:8011/PublicImage/tool_02.png',
			      navigationUrl: 'components/my/my.js'
			    },
			    {
			      title: '分享APP',
			      ImageUrl: 'http://47.92.164.211:8011/PublicImage/tool_03.png',
			      navigationUrl: 'components/my/my.js'
			    },
			    {
			      title: '用户协议',
			      ImageUrl: 'http://47.92.164.211:8011/PublicImage/tool_04.png',
			      navigationUrl: 'components/my/my.js'
			    },
			    {
			      title: '设置',
			      ImageUrl: 'http://47.92.164.211:8011/PublicImage/tool_05.png',
			      navigationUrl: 'components/setUp/setUp.js'
			    }
			]
		}
	},
	methods: {
		loginBtn(){
			// Util.bindThis(Util.jump('components/login/login.js'),this.$getConfig())
			var self = this;
            // Util.jump({
            //     "phoneJump": function(){
            //         var bundleUrl = self.bundleUrl;
            //         weex.requireModule('navigator').push({
            //             url: Util.urlPort().urlAddPort + 'dist/' + 'components/login/login.js',
            //             animated: "true"
            //         }, event => {})
            //     },
            //     "webJump": function(){
                    self.$router.push({
                        name: "login"
                    })
            //     }
            // })
		}
	},
	created() {
		var self = this;
		var fontModule = weex.requireModule("dom");
        fontModule.addRule('fontFace', {
            'fontFamily': "iconfont",
            'src': "url('" + api.iconUrl + "')"
        })
        storage.getItem(this.USERID,event => {
        	self.USERID = event.data
        	storage.getItem(this.TOKEN,event => {
        		self.TOKEN = event.data
		        Util.WeexAjax({
		            url: api.GETUSERINFO_URL + '?UserId=' + self.USERID,
		            method: 'GET',
		            type: 'JSON',
		            token: self.TOKEN,
		            callback: function(ret) {
		            	if(ret.Status == 1){
		            		self.loginBool = true;
		            		self.myInfo = ret.obj;
		            		console.log(self.myInfo);
		            		self.TOKEN = self.myInfo;
		            	}
		            }
		        })
        	})
        });
	}
}
</script>

<style lang="stylus">
.iconFont{
    font-family: iconfont;
}
.my{
	position: fixed;
	width: 750px;
	top: 0;
	bottom: 110px;
	background-color: #f5f5f5;
}
.cell-box{
	margin-left: 20px;
	margin-right: 20px;
	width: 710px;
	margin-top: 10px;
	margin-bottom: 10px;
}
.my-header-title-wrapper{
	position: relative;
	width: 750px;
	height: 92px;
	padding-left: 20px;
	padding-right: 20px;
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	background-color: rgb(115,204,70);
}
.my-header-info-wrapper{
	position: absolute;
	width: 48px;
	height: 45px;
	display: flex;
	flex-direction: row;
	justify-content: flex-start;
	align-items: flex-end;
	right: 20px;
	top: 0;
	margin-top: 23.5px;
	font-size: 34px;
	line-height: 36px;
	color: #c1e6a3;
}
.my-header{
	width: 750px;
	height: 148px;
	background-color: rgb(115,204,70);
	border-bottom-left-radius: 70px;
	border-bottom-right-radius: 70px;
}
.my-header-title{
	font-size: 43px;
	color: #fff;
	line-height: 45px;
}
.my-header-info{
	width: 42px;
	height: 34px;
}
.info-number{
	position: absolute;
	top: 0px;
	right: -2px;
	width: 22px;
	height: 22px;
	background-color: #fff;
	font-size: 14px;
	color: #73cc00;
	border-radius: 50%;
	text-align: center;
	line-height: 22px;
}
.my-info-wrapper{
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	height: 147px;
	width: 710px;
	margin-left: 20px;
	margin-right: 20px;
}
.my-info-wrapper-left{
	display: flex;
	flex-direction: row;
}
.my-info-logo-wrapper{
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: flex-end;
	margin-right: 10px;
	padding-bottom: 5px;
	padding-top: 5px;
	padding-left: 5px;
	padding-right: 5px;
	width: 100px;
	height: 100px;
	border-radius: 50%;
	background-color: #d9f2aa;
}
.my-info-logo{
	width: 60px;
	height: 85px;
}
.my-info-sign-wrapper{
	display: flex;
	flex-direction: column;
}
.my-info-sign-time{
	font-size: 36px;
	line-height: 40px;
	color: #fff;
}
.my-info-sign-box{
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	margin-top: 15px;
	width: 100px;
	height: 40px;
	border-radius: 40px;
	background-color: #ffa200;
}
.my-info-sign-text{
	font-size: 20px;
	line-height: 22px;
	color: #fff;
}
.mylogin{
	height: 100px;
	line-height: 100px;
	font-size: 36px;
	color: #fff;
}
.my-info-sign-iconfont{
	width: 20px;
	height: 20px;
	margin-right: 10px;
}
.my-info-colum-wrapper{
	display: flex;
	flex-direction: row;
}
.my-info-colum-list{
	display: flex;
	flex-direction: row;
	align-items: center;
}
.my-info-colum-list-left{
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
}
.my-info-colum-text,.my-info-colum-num{
	line-height: 24px;
	font-size: 22px;
	color: #fff;
}
.my-info-colum-num{
	margin-top: 8px;
}
.my-info-colum-line{
	margin-left: 20px;
	margin-right: 20px;
	width: 1px;
	height: 30px;
	background-color: #fff;
}
.my-member-area{
	display: flex;
	flex-direction: column;
	top: -15px;
	width: 710px;
	padding-top: 20px;
	padding-left: 20px;
	padding-right: 20px;
	margin-left: 20px;
	margin-right: 20px;
	border-radius: 15px;
	background-color: #fff;
}
.my-member-area-title{
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	width: 670px;
	height: 40px;
	margin-bottom: 20px;
}
.my-member-area-title-left{
	display: flex;
	flex-direction: row;
	align-items: center;
}
.member-iconfont{
	width: 35px;
	height: 29px;
	margin-right: 15px;
}
.my-member-area-title-left-text{
	font-size: 24px;
	line-height: 26px;
	color: #333333;
}
.my-member-area-title-right{
	width: 110px;
	height: 40px;
	border-radius: 40px;
	background-color: #ff8a6f;
}
.my-member-area-title-right-text{
	text-align: center;
	font-size: 20px;
	line-height: 40px;
	color: #fff;	
}
.my-member-area-body{
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	justify-content: flex-start;
	align-content: space-between;
	margin-left: 20px;
}
.my-member-area-body-list{
	display: flex;
	flex-direction: row;
	align-items: center;
	min-width: 108px;
	margin-right: 40px;
	margin-bottom: 20px;
}
.my-member-area-body-list-image{
	width: 22px;
	height: 22px;
}
.my-member-area-body-list-text{
	font-size: 20px;
	color: #ff9000;
	padding-left: 5px;
}
.my-order-wrapper,.my-tool-wrapper{
	margin-top: 0;
	display: flex;
	flex-direction: column;
	padding-top: 20px;
	padding-left: 20px;
	padding-right: 20px;
	background-color: #fff;
	border-radius: 15px;
}
.my-order-title{
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 25px;
}
.my-order-title-text,.my-all-order-title{
	color: #333333;
}
.my-order-title-text{
	font-size: 30px;
	line-height: 32px;
}
.my-all-order-title{
	font-size: 20px;
	line-height: 22px;
}
.my-all-order-title{
	display: flex;
	flex-direction: row;
	align-items: center;
}
.my-all-order-title-icon{
	margin-left: 10px;
	width: 14px;
	height: 20px;
}
.my-order-body{
	display: flex;
	flex-direction: row;
	justify-content: space-around;
}
.my-order-body-list{
	position: relative;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 20px;
}
.my-order-body-list-image{
	margin-top: 10px;
	margin-bottom: 10px;
	width: 42px;
	height: 42px;
}
.my-order-body-list-number{
	right: 0px;
	border-width: 1px;
	border-style: solid;
	border-color: #73cc00;
}
.my-order-body-list-image-text{
	font-size: 20px;
	line-height: 22px;
	color: #777777;
}
.my-tell-me-wrapper{
	display: flex;
	flex-direction: row;
	justify-content: space-between;
}
.my-tell-me-image{
	width: 350px;
	height: 180px;
	border-radius: 10px;
}
.my-tool-wrapper{
	margin-top: 10px;
}
.my-tool-body{
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	width: 670px;
}
.my-tool-body-list{
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	width: 223px;
	margin-bottom: 20px;
}
.my-tool-body-list-image{
	margin-bottom: 15px;
	width: 52px;
	height: 52px;
}
.my-tool-body-list-image-text{
	font-size: 24px;
	line-height: 26px;
	color: #777777;
}
</style>