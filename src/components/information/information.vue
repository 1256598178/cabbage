<template>
	<div class="find">
		<div class="find-title-box">
			<v-header :titleName="titleName" :backPage="true"></v-header>
		</div>
		<list class="congra-body-wrapper">
			<refresh @refresh="onrefresh" :display="refreshing ? 'show' : 'hide'">
				<text class="refresh">下拉刷新...</text>
			</refresh>
			<cell>
				<div class="seafood-wrapper-layout">
					<div class="seafood-wrapper-active" v-for="items in 10">
						<div class="info-title-box">
							<text class="info-title">订单失效</text>
							<text class="info-title-time">2018-12-03  09:54:53</text>
						</div>
						<div class="info-body-wrapper">
							<div class="info-body-left">
								<div class="info-body-bell"><image class="info-body-image" src="http://47.92.164.211:8011/PublicImage/bell@42x52.png"></image></div>
								<text class="info-body-text">您有订单逾期未付款，已自动取消</text>
							</div>
							<image class="info-body-more" src="http://47.92.164.211:8011/PublicImage/moreImage@16x25.png"></image>
						</div>
					</div>
				</div>
			</cell>
			<loading class="loading" @loading="onloading" :display="loadinging ? 'show' : 'hide'">
				<text class="loading">加载更多...</text>
				<loading-indicator class="indicators"></loading-indicator>
			</loading>
		</list>
	</div>
</template>

<script>
import header from '../header/orderHeader.vue'
export default {
	data() {
		return {
			titleName: '消息通知',
			refreshing: false,//下拉刷新
			loadinging: false,//上拉加载
		}
	},
	methods: {
    	onrefresh (){
			this.refreshing = true;
			setTimeout(()=>{
				this.refreshing = false;
			},2000)
		},
		onloading (){
			this.loadinging = true;
			setTimeout(()=>{
				this.loadinging = false;
			},2000)
		}
	},
	components: {
    	"v-header": header 
    },
}
</script>

<style lang="stylus" scoped>
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
.seafood-wrapper-layout{
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	justify-content: space-between;
	
}
.seafood-wrapper-active{
	display: flex;
	flex-direction: column;
	width: 710px;
	margin-bottom: 10px;
	background-color: #fff;
	border-width: 2px;
	border-style: solid;
	border-color: #eee;
	border-radius: 15px;
	box-shadow: 0 0 10px 3px #eee;
}
// <div class="info-title-box">
// 	<text class="info-title">订单失效</text>
// 	<text class="info-title-time">2018-12-03  09:54:53</text>
// </div>
// <div class="info-body-wrapper">
// 	<div class="info-body-left">
// 		<div class="info-body-bell"><image class="info-body-image" src="../src/components/information/bell@42x52.png"></image></div>
// 		<text class="info-body-text">您有订单逾期未付款，已自动取消</text>
// 	</div>
// 	<image class="info-body-more" src=""></image>
// </div>
.info-title-box{
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	padding-left: 20px;
	padding-right: 20px;  
	padding-top: 20px;  
	padding-bottom: 21px;  
	border-bottom-width: 1px;
	border-bottom-color: #f4f4f4;
	border-bottom-style: solid;
}
.info-title{
	font-size: 22px;
	color: #333333;
}
.info-title-time{
	font-size: 20px;
	color: #333;
}
.info-body-wrapper{
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	padding-top: 20px;
	padding-left: 20px;
	padding-bottom: 20px;
	padding-right: 20px;
}
.info-body-left{
	display: flex;
	flex-direction: row;
	align-items: center;
}
.info-body-bell{
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	width: 80px;
	height: 80px;
	margin-right: 21px;
	border-width: 1px;
	border-color: #bfbfbf;
	border-style: solid;
	border-radius: 15px;
}
.info-body-image{
	width: 42px;
	height: 52px;
}
.info-body-text{
	font-size: 20px;
	color: #777777;
}
.info-body-more{
	width: 16px;
	height: 25px;
}
</style>