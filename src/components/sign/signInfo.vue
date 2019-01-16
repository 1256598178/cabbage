<template>
	<div class="find">
		<div class="find-title-box">
			<v-header :titleName="titleName" :backPage="true"></v-header>
		</div>
		<list class="congra-body-wrapper">
			<cell v-for="(item,index) in 20" :key="index">
				<div class="signInfo">
					<div class="signInfo-wrapper">
						<image class="logo" src="../src/common/images/logo@45x45.png"></image>
						<text class="signInfo-name">签到成功</text>
						<text class="signInfo-subname">2018-09-11</text>
					</div>
					<text class="signInfo-num">{{index}}</text>
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
			titleName: '签到记录',
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
	margin-top: 20px;
	padding-left: 20px;
	padding-right: 20px;
	margin-bottom: 20px;
	background-color: #fff;
}
.signInfo{
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	padding-top: 15px;
	padding-bottom: 15px;
	padding-left: 20px;
	padding-right: 20px;
	background-color: #fff;
	border-bottom-width: 2px;
	border-bottom-color: #f4f4f4;
	border-bottom-style: solid;
}
.signInfo-wrapper{
	display: flex;
	flex-direction: row;
	align-items: center;
}
.logo{
	width: 45px;
	height: 45px;
}
.signInfo-name{
	margin-left: 20px;
	font-size: 22px;
	color: #33333;
	font-weight: bold;
}
.signInfo-subname{
	margin-left: 20px;
	font-size: 20px;
	color: #777777;
}
.signInfo-num{
	margin-right: 40px;
	margin-left: 20px;
	font-size: 20px;
	color: #f26100;
	font-weight: bold;
}
</style>