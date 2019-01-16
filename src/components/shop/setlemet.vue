<template>
	<div class="shop">
		<header class="shop-header">
			<v-header :titleName="titleName" :backPage="true"></v-header>
			<!-- <div class="shop-header-title-wrapper">
				<image class="backBtn" src="../src/common/images/backImage.png"></image>
				<text class="shop-header-title">订单结算</text>
			</div> -->
		</header><!-- /header -->
		<list class="shop-wrapper">
			<refresh @refresh="onrefresh" :display="refreshing ? 'show' : 'hide'">
				<text class="refresh">下拉刷新...</text>
			</refresh>
			<cell>
				<div class="lemet-body lemet-address-wrapper">
					<div class="lemet-title-address">
						<div class="lemet-title-address-left">
							<text class="iconFont lemet-body-title-iconfont">&#xe7e0;</text>
					        <text class="lemet-body-title-name">绿白菜滨湖春融苑店</text>
						</div>
						<image class="lemet-title-address-right" src="../src/common/images/moreImage@16x25.png"></image>
					</div>
					<div class="lemet-address-box">
						<text class="lemet-address-box-text">合肥市滨湖区南京路与天柱山路交口春融苑</text>
						<text class="lemet-address-box-text">联系电话：400 1234 4567</text>
					</div>
				</div>
				<div class="lemet-body lemet-food-time">
					<div class="lemet-food-time-list">
						<text class="lemet-food-time-name">预约取货日期</text>
						<div class="lemet-food-time-info">
							<text class="lemet-food-time-num lemet-food-time-name-active">2018-12-01(明天)</text>
							<image class="moreImage-14x9" src="../src/common/images/moreImage@14x9.png"></image>
						</div>
					</div>
					<div class="lemet-food-time-list">
						<text class="lemet-food-time-name">预约取货时间</text>
						<div class="lemet-food-time-info">
						    <text class="lemet-food-time-num">2018-12-01(明天)</text>
							<image class="moreImage-14x9" src="../src/common/images/moreImage@14x9.png"></image>
						</div>
					</div>
					<div class="lemet-food-time-list">
						<text class="lemet-food-time-name">是否使用优惠券</text>
						<div class="lemet-food-time-info">
						    <text class="lemet-food-time-num">请选择优惠券</text>
							<image class="moreImage-14x9" src="../src/common/images/moreImage@14x9.png"></image>
						</div>
					</div>
					<div class="lemet-food-time-list">
						<text class="lemet-food-time-name">是否需要购物袋</text>
						<div class="lemet-food-time-info">
						    <text class="lemet-food-time-num">2018-12-01(明天)</text>
							<image class="moreImage-14x9" src="../src/common/images/moreImage@14x9.png"></image>
						</div>
					</div>
				</div>
			</cell>
			<cell>
				<div class="lemet-body lemet-trade-wrapper">
					<div class="lemet-trade-title-wrapper">
						<div class="lemet-trade-title-line"></div>
						<text class="lemet-trade-title-name">商品品名</text>
					</div>
					<div class="lemet-trade-foods-wrapper">
						<div class="cellps">
							<image class="product-img" src="../src/components/shop/product-img01.png"></image>
			        		<div class="pro-news">
			        			<div class="pro-r">
			        				<text class="product-title">乌菜</text>
			        			    <text class="product-title-weight">500g</text>
			        			</div>
			        			<div class="pro-m">
			        				<text class="product-price">¥0.50元/斤</text>
			        				<text class="product-price-number">×2</text>
			        			</div>
			        		</div>
						</div>
						<div class="cellps">
							<image class="product-img" src="../src/components/shop/product-img01.png"></image>
			        		<div class="pro-news">
			        			<div class="pro-r">
			        				<text class="product-title">乌菜</text>
			        			    <text class="product-title-weight">500g</text>
			        			</div>
			        			<div class="pro-m">
			        				<text class="product-price">¥0.50元/斤</text>
			        				<text class="product-price-number">×2</text>
			        			</div>
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
		<div class="good-bottom-wrapper">
			<div class="good-bottom-member-wrapper">
				<text class="iconFont member-image">&#xe641;</text>
				<text class="member-text">升级会员，本单可为您节省</text><text class="member-text-num">{{123}}</text><text class="member-text">元!</text>
			</div>
			<div class="good-bottom-list-wrapper">
				<div class="good-bottom-select-wrapper">
					<text class="good-bottom-total-text">预付款:</text>
					<text class="good-bottom-total-money">￥{{123}}元</text>
				</div>
				<div class="good-bottom-total-button">
					<text class="good-bottom-total-button-text">结算({{123}})</text>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import header from '../header/orderHeader.vue'
export default {
	data() {
		return {
			titleName: '订单结算',
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
		},
	},
	created() {
        var fontModule = weex.requireModule("dom");
        fontModule.addRule('fontFace', {
            'fontFamily': "iconfont",
            'src': "url('//at.alicdn.com/t/font_948634_q51n034oj8.ttf')"
        })
    },
    components: {
    	"v-header": header 
    },
}
</script>

<style lang="stylus" scoped>
// 头部
.iconFont{
    font-family: iconfont;
}
/*.container{
	position: relative;
	padding-left: 20px;
	paddng-right: 20px;
}*/
.shop{
	position: fixed;
	width: 750px;
	top: 0;
	bottom: 110px;
	background-color: #f5f5f5;
}
/*.shop-header{
	width: 750px;
	padding-left: 20px;
	padding-right: 20px;
	background-color: rgb(115,204,70);
}*/
.shop-header-title-wrapper{
	position: relative;
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	width: 710px;
	height: 92px;  /*26 + 40 + 26*/
	margin-left: 20px;
	margin-right: 20px;
}
.shop-header-title{
	font-size: 43px;
	color: #fff;
}
/*.backBtn{
	position: absolute;
	left: 0px;
	top: 25.5px;
	width: 28px;
	height: 41px;
}*/

////////////////////// 绿白菜滨湖春融苑店
.lemet-body{
	margin-bottom: 10px;
} 
.lemet-address-wrapper{
	padding-top: 25px;
	padding-left: 20px;
	padding-right: 20px;
	padding-bottom: 30px;
}
.lemet-food-time,.lemet-address-wrapper,.lemet-trade-wrapper{
	background-color: #fff;
}

//////横向左右两端上下居中布局
.lemet-title-address,.lemet-food-time-list{  
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
}
.lemet-title-address{
	margin-bottom: 20px;
}
//////横向上下居中布局
.lemet-title-address-left,.lemet-food-time-info,.lemet-trade-title-wrapper,.pro-r{
	display: flex;
	flex-direction: row;
	align-items: center;
}
.lemet-title-address-right{
	width: 16px;
	height: 25px;
}
.lemet-body-title-iconfont,.lemet-body-title-name{
	font-size: 30px;
	color: #333333;
	line-height: 34px;
}
.lemet-body-title-iconfont{
	font-size: 40px;
	margin-right: 10px;
	line-height: 48px;
}
.lemet-address-box-text{
	font-size: 24px;
	color: #777777;
	line-height: 40px;	
}



//////////////////////////////预约时间
.lemet-food-time-list,.lemet-trade-title-wrapper{
	padding-top: 20px;
	padding-bottom: 20px;
	padding-left: 20px;
	padding-right: 20px;
	border-bottom-width: 1px;
	border-bottom-style: solid;
	border-bottom-color: #f4f4f4;
}
.lemet-food-time-name{
	font-size: 24px;
	color: #333333;
	line-height: 26px;
}
.lemet-food-time-num{
	font-size: 24px;
	color: #777777;
	line-height: 26px;
}
.lemet-food-time-name-active{
	font-size: 24px;
	color: #ffa800;
	line-height: 26px;
}
.moreImage-14x9{
	width: 14px;
	height: 9px;
	margin-left: 12px;
}
// ///////////////////////////商品品名
.lemet-trade-title-line{
	margin-right: 15px;
	width: 10px;
	height: 50px;
	background-color: #73cc00;
	border-radius: 10px;
}
.lemet-trade-title-name{
	font-size: 30px;
	color: #333333;
	line-height: 34px;
}
.cellps{
	display: flex;
	flex-direction: row;
	border-bottom-width: 1px;
	border-bottom-color: #d2d2d2;
	border-bottom-style: solid;
	padding-top: 20px;
	padding-bottom: 20px;
	padding-right: 20px;
	padding-left: 20px;
}
.product-img{
	width: 200px;
	height: 200px;
	margin-right: 30px;
}
.pro-news{
	margin-top: 20px;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	flex: 1;
	height: 140px;
}
.product-title,.product-title-weight{
	margin-right: 20px;
	font-size: 30px;
	color: #333;
	text-overflow: ellipsis;
	lines:1; 
}
.pro-m{
	height: 42px;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
}



.product-type-box{
	height: 36px;
	margin-top: 10px;
}
.product-type{
	width: 80px;
	font-size: 20px;
	line-height: 36px;
	color: #fff;
	text-align: center;
	border-radius: 5px;
	background-color: #ccc;
}
.product-types{
	opacity: 0;
}
.product-price{
	font-size: 30px;
	font-weight: bold;
	color: #f26100;
	margin-right: 10px;
}
.product-prices{
	font-size: 20px;
	color: #777;
}
.shop-car-icon{
	width: 42px;
	height: 42px;
	position: absolute;
	bottom: 0;
	right: 0;
}
// ///////////////////////////////////////////////////

// 中间部分
.shop-wrapper{
	position: fixed;
	left: 0;
	top: 92px;
	bottom: 265px;
	width: 750px;
}
.good-bottom-wrapper{
	position: fixed;
	display: flex;
	flex-direction: column;
	bottom: 109px;
	height: 155px;
	width: 750px;
}
.good-bottom-member-wrapper,.good-bottom-list-wrapper{
	display: flex;
	flex-direction: row;
	align-items: center;
	padding-left: 20px;
	padding-right: 20px;
}
.good-bottom-member-wrapper{
	justify-content: start-left;
	height: 60px;
	background-color: #ade564;
}
.member-image{
	margin-right: 10px;
	font-size: 27px;
	color: #fff;
}
.member-text,.member-text-num{
	font-size: 18px;
	color: #fff;
}
.member-text-num{
	color: #73cc00;
}
.good-bottom-list-wrapper{
	justify-content: space-between;
	height: 95px;
	background-color: #fff;
}
.good-bottom-select-wrapper,.good-bottom-total-wrapper{
	display: flex;
	flex-direction: row;
	align-items: center;
}
.good-bottom-total-text{
	font-size: 24px;
	color: #777777;
}
.good-bottom-total-money{
	font-size: 24px;
	color: #f26100;
}
.good-bottom-total-button{
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	margin-left: 20px;
	width: 220px;
	height: 70px;
	border-radius: 220px;
	background-color: #73cc00;
}
.good-bottom-total-button-text{
	font-size: 30px;
	color: #fff;
}
</style>