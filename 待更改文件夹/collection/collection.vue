<template>
	<!-- 我的收藏 -->
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
					<div class="seafood-wrapper-active" v-for="items in 10"><!-- seafood-wrapper-active -->
						<image class="seafood-image" src="http://47.92.164.211:8011/PublicImage/seafood_01.png"></image>
						<div class="seafood-bottom-wrapper-active"><!-- seafood-bottom-wrapper-active -->
							<div class="seafood-bottom-name-box">
								<text class="seafood-bottom-name">越南进口巴沙鱼  100...</text>
								<text class="seafood-bottom-subname">新鲜冷冻，无骨无刺，肉质鲜嫩</text>
							</div>
							<div class="seafood-bottom-shop">
								<div class="seafood-bottom-shop-doller-wrapper">
									<div class="seafood-bottom-shop-doller-box">
										<text class="doller-font">¥</text><text class="seafood-bottom-shop-doller">21.40元/斤</text>
									</div>
								    <text class="seafood-bottom-shop-all-doller">¥21.40</text>
								</div>
								<image class="seafood-bottom-shop-car" src="http://47.92.164.211:8011/PublicImage/shop-car.png"></image>
							</div>
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
			titleName: '我的收藏',
			refreshing: false,//下拉刷新
			loadinging: false,//上拉加载
			layoutAct: false,
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
.seafood-wrapper{
	margin-bottom: 10px;
	padding-left: 20px;
	padding-right: 20px;
	padding-top: 20px;
	padding-bottom: 20px;
	width: 350px;
	background-color: #fff;
	border-width: 2px;
	border-style: solid;
	border-color: #eee;
	border-radius: 10px;
	box-shadow: 0 0 10px 3px #eee;
}
////////////////////////////////////////////////
.seafood-wrapper-active{
	display: flex;
	flex-direction: row;
	width: 710px;
	margin-bottom: 10px;
	padding-left: 20px;
	padding-right: 20px;
	padding-top: 20px;
	padding-bottom: 20px;
	background-color: #fff;
	border-width: 2px;
	border-style: solid;
	border-color: #eee;
	border-radius: 15px;
	box-shadow: 0 0 10px 3px #eee;
}
.seafood-image{
	width: 310px;
	height: 310px;
}
.seafood-bottom-wrapper{
	margin-top: 20px;
}
///////////////////////////////////
.seafood-bottom-wrapper-active{
	flex: 1;
	display: flex;
	flex-direction: clumn;
	justify-content: space-between;
	height: 310px;
	padding-top: 50px;
	padding-left: 30px;
	padding-bottom: 30px;
}
.seafood-bottom-name-box{
	margin-bottom: 50px;
}
.seafood-bottom-name{
	width: 310px;
	font-size: 30px;
	color: #222222;
	line-height: 34px;
	font-weight: bold;
	text-overflow: ellipsis;
	lines:1;
}
.seafood-bottom-subname{
	margin-top: 10px;
	font-size: 22px;
	color: #777777;
}
.seafood-bottom-shop{
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
}
.seafood-bottom-shop-doller-wrapper{
	display: flex;
	flex-direction: row;
	align-items: center;
}
.seafood-bottom-shop-doller-box{
	display: flex;
	flex-direction: row;
	align-items: flex-end;
}
.doller-font{
	margin-right: 3px;
	font-size: 22px;
	color: #333333;
	line-height: 30px;
}
.seafood-bottom-shop-doller{
	font-size: 30px;
	color: #f26100;
	line-height: 34px;
	font-weight: bold;
}
.seafood-bottom-shop-all-doller{
	margin-left: 10px;
	font-size: 20px;
	color: #777777;
	line-height: 24px;
}
.seafood-bottom-shop-car{
	width: 44px;
	height: 44px;
}
</style>