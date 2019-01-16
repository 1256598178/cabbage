<template>
	<!-- 恭贺页面 -->
	<div class="find">
		<div class="find-title-box">
			<v-header :titleName="titleName" :backPage="true" :shareBtn="true"></v-header>
		</div>
		<div class="congra-body-wrapper">
			<list class="congra-list">
				<cell>
					<div class="congra-body-title-box">
						<text class="congra-body-title">绿白菜恭祝广大用户新春愉快！</text>
						<text class="congra-body-subtitle">绿白菜&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2018-01-02</text>
					</div>
					<div class="congra-body-box">
						<text class="congra-body-box-name">新年到，绿白菜恭祝广大用户新春愉快，阖家欢乐！！！</text>
						<image class="congra-body-box-image" src="../src/components/other/news_02.png"></image>
					</div>
				</cell>
			</list>
		</div>
	</div>
</template>

<script>
import header from '../header/orderHeader.vue'
export default {
	data() {
		return {
			titleName: '绿白菜恭祝广大用户新春愉快！',
		}
	},
	components: {
    	"v-header": header 
    },
}
</script>

<style lang="stylus" scoped>
.congra-list{
	position: fixed;
	top: 90px;
	bottom: 0px;
	padding-top: 20px;
	padding-left: 20px;
	padding-right: 20px;
	padding-bottom: 20px;
	background-color: #fff;
}

.congra-body-title-box{
	width: 710px;
	margin-top: 10px;
	margin-bottom: 70px;
}
.congra-body-title{
	font-size: 42px;
	color: #333333;
	line-height: 50px;
	margin-bottom: 10px;
}
.congra-body-subtitle{
	font-size: 24px;
	color: #777777;
	line-height: 28px;
}
.congra-body-box{
	width: 710px;
	margin-bottom: 30px;
}
.congra-body-box-name{
	font-size: 30px;
	color: #555555;
	line-height: 35px;
	margin-bottom: 30px;	
}
.congra-body-box-image{
	width: 710px;
	height: 1006px;
}
</style>