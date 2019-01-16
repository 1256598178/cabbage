<template>
	<div class="find">
		<div class="find-title-box">
			<v-header :titleName="titleName" :backPage="true"></v-header>
		</div>
		<list class="congra-body-wrapper">
			<cell>
				<image class="sign-bg" src="../src/components/sign/sign@bg.png"></image>
				<text class="sign-body sign-people-num">今日签到人数：23565人</text>
				<!-- 签到 -->
				<div class="sign-body sign-gift">
					<text class="sign-gift-title">连续签到赢好礼</text>
					<div class="sign-gift-body-wrapper">
						<div class="sign-gift-body-sub-wrapper">
							<div class="sign-gift-body-sub-list" v-for="(item,index) in 5" :key="index">
								<image class="sign-gift-body-sub-list-bg" src="../src/components/sign/card@165x237.png"></image>
								<div class="sign-gift-body-sub-list-title">
									<text class="sign-gift-body-sub-list-title-name">9月11日</text>
									<image class="sign-gift-body-sub-list-money" src="../src/components/sign/mondy@84x61.png"></image>
									<text class="sign-gift-body-sub-list-btn" :class="[index == 0 ? 'sign-gift-body-sub-list-btn-active' : '']">已签到</text><!-- sign-gift-body-sub-list-btn-active -->
								</div>
							</div>
						</div>
						<text class="sign-gift-btn">已连续签到2天</text>
					</div>
				</div>
				<!-- 签到记录 -->
				<div class="record">
					<image class="record-bg" src="../src/components/sign/record@129x129.png"></image>
					<text class="record-text">签到</text>
					<text class="record-text">记录</text>
				</div>
				<!-- 签到说明 -->
				<div class="sign-bottom-wrapper">
					<image class="sign-bottom-bg" src="../src/components/sign/signbottom@704x450.png"></image>
					<div class="sign-bottom-text-box">
						<text class="sign-bottom-text-title">活动规则</text>
						<div class="sign-bottom-list-box">
							<div class="sign-bottom-list-box-list">
								<image class="sign-num-bg" src="../src/components/sign/sign1@27x28.png"></image><text class="sign-num-text">活动时间:2018年9月11日-10月15日</text>
							</div>
							<div class="sign-bottom-list-box-list">
								<image class="sign-num-bg" src="../src/components/sign/sign2@27x28.png"></image><text class="sign-num-text">活动期间，签到所得抵用券奖励实时发放；</text>
							</div>
							<div class="sign-bottom-list-box-list">
								<image class="sign-num-bg" src="../src/components/sign/sign3@27x28.png"></image><text class="sign-num-text">返现奖励发放规则：连续签到5天，活动结束时，在本平台的待收本金>1000元的用户可得10元返现，活动结束的下一个工作日发放奖励。</text>
							</div>
						</div>
					</div>
				</div>
			</cell>
		</list>
	</div>
</template>

<script>
import header from '../header/orderHeader.vue'
export default {
	data() {
		return {
			titleName: '签到',
		}
	},
	methods: {
	},
	components: {
    	"v-header": header 
    },
}
</script>

<style lang="stylus" scoped>
.find{
	background-color: #f5f5f5;
}
.congra-body-wrapper{
	position: fixed;
	width: 750px;
	top: 90px;
	bottom: 0;
	margin-bottom: 20px;
	background-color: #fff;
}
.sign-bg{
	width: 750px;
	height: 1814px;
}
.sign-body{
	position: absolute;
}
.sign-people-num{
	top: 227px;
	width: 750px;
	font-size: 30px;
	color: #fff;
	text-align: center;
}
.sign-gift{
	display: flex;
	flex-direction: column;
	align-items: center;
	top: 350px;
	width: 710px;
	margin-left: 20px;
	margin-right: 20px;
}
.sign-gift-title{
	width: 422px;
	height: 79px;
	line-height: 79px;
	color: #289e09;
	font-size: 34px;
	text-align: center;
	border-top-left-radius: 20px;
	border-top-right-radius: 20px;
	background-color: #fff;
	box-shadow: -2px -2px 5px #066559 inset;
}
.sign-gift-body-wrapper{
	display: flex;
	flex-direction: column;
	align-items: center;
	padding-top: 20px;
	padding-left: 20px;
	padding-right: 20px;
	padding-bottom: 50px;
	width: 710px;
	height: 797px;
	border-radius: 50px;
	background-color: #fff;
	box-shadow: -2px -2px 5px #066559 inset;
}
.sign-gift-body-sub-wrapper{
	padding-left: 25px;
	padding-right: 25px;
	padding-top: 37px; 
	padding-bottom: 43px;
	// margin-left: 20px;
	// margin-right: 20px;
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	justify-content: space-around;
	align-content: space-around;
	height: 593px;
	width: 670px;
	border-radius: 30px;
	background-color: #61aa4e;
	box-shadow: -5px -5px 15px #56a244 inset;
}
.sign-gift-body-sub-list{
	position: relative;
	margin-bottom: 40px;
	width: 175px;
	height: 237px;
	border-radius: 18px;
}
.sign-gift-body-sub-list-bg{
	position: absolute;
	top: 0;
	left: 0;
	width: 175px;
	height: 237px;
}
.sign-gift-body-sub-list-title{
	display: flex;
	flex-direction: column;
	align-items: center;
	padding-top: 26px;
	padding-bottom: 26px;
	padding-left: 22px;
	padding-right: 22px;
}
.sign-gift-body-sub-list-title-name{
	font-size: 28px;
	color: #fff;
	text-align: center;
	padding-bottom: 8px;
	border-bottom-width: 1px;
	broder-bottom-color: #289e09;
	border-bottom-style: dashed;
}
.sign-gift-body-sub-list-money{
	margin-top: 24px;
	margin-bottom: 19px;
	width: 84px;
	height: 61px;
}
.sign-gift-body-sub-list-btn{
	width: 120px;
	height: 40px;
	line-height: 40px;
	text-align: center;
	font-size: 28px;
	color: #fff;
	border-radius: 40px;
	background-color: #2c7818;
	font-weight: 600;
}
.sign-gift-body-sub-list-btn-active{
	color: #a8a8a8;
	background-color: #dcdcdc;
}
.sign-gift-btn{
	margin-top: 29px;
	width: 539px;
	height: 100px;
	line-height: 100px;
	font-size: 36px;
	color: #fff;
	text-align: center;
	background-color: #84dc6d;
	border-radius: 100px;
	box-shadow: 0px 5px 3px 1px #2d7a18;
}
.record{
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	position: absolute;
	top: 896px;
	right: 0;
	width: 129px;
	height: 129px;
}
.record-bg{
	position: absolute;
	left: 0;
	top: 0;
	width: 129px;
	height: 129px;
}
.record-text{
	font-size: 30px;
	color: #289e09;
	line-height: 35px;
	text-align: center;
	font-weight: 600;
}
.sign-bottom-wrapper{
	position: absolute;
	width: 704px;
	bottom: 60px;
	margin-left: 23px;
	margin-right: 23px;
}
.sign-bottom-bg{
	position: absolute;
	left: 0;
	top: 0;
	width: 704px;
	height: 450px;
}
.sign-bottom-text-box{
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	margin-top: 60px;
	margin-bottom: 44px;
	margin-left: 57px;
	margin-right: 57px;
}
.sign-bottom-text-title{
	margin-bottom: 50px;
	font-size: 36px;
	color: #289b09;
	font-weight: bold;
	width: 596px;
	text-align: center;
}
.sign-num-bg{
	margin-right: 22px;
	width: 27px;
	height: 28px;
}
.sign-bottom-list-box{
	width: 596px;
}
.sign-bottom-list-box-list{
	width: 596px;
	margin-bottom: 20px;
	display: flex;
	flex-direction: row;
	align-items: flex-start;
}
.sign-num-text{
	width: 550px;
	font-size: 28px;
	color: #666;
	font-weight: 600;
}
</style>