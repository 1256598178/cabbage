<template>
	<div class="shop">
		<header class="shop-header">
			<div class="container">
				<div class="shop-header-title-wrapper">
					<text class="shop-header-title">购物车</text>
					<text class="shop-header-delet">删除</text>
				</div>
				<div class="shop-address-wrapper">
					<text class="iconFont iconfont-address">&#xe7e0;</text>
					<text class="shop-address-text">绿白菜滨湖春融苑店</text>
				</div>
			</div>
		</header><!-- /header -->
		<list class="shop-wrapper">
			<refresh @refresh="onrefresh" :display="refreshing ? 'show' : 'hide'">
				<text class="refresh">下拉刷新...</text>
			</refresh>
			<cell v-for="item in 10">
				<div class="shop-list">
					<wxc-checkbox :config="config" :has-bottom-border="false" class="shop-list-checkout"></wxc-checkbox>
					<image class="shop-list-image" src="../src/components/shop/product-img01.png"></image>
					<div class="shop-list-info">
						<div class="shop-list-info-title">
							<text class="shop-list-info-name">五彩</text>
							<text class="shop-list-info-weight">500gg</text>
						</div>
						<div class="shop-list-money-wrapper">
							<div class="shop-list-money-left">
								<text class="shop-list-money">￥0.5元/斤</text>
							    <text class="shop-list-all-money">￥6.29</text>
							</div>
							<div class="shop-list-money-right">
								<!-- weex ui  设计样式不符 -->
									<!-- <wxc-stepper :config="stepper"></wxc-stepper> -->
								<text class="iconFont shop-list-money-reduce" @click="reduceMoney()">&#xe600;</text>
								<input type="text" class="shop-list-money-number" disabled="true" v-model="moneyValue"/>
								<text class="iconFont shop-list-money-add" @click="addMoney()">&#xe601;</text>
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
				<text class="member-text">升级会员，本单可为您节省</text><text class="member-text-num">0.38</text><text class="member-text">元!</text>
			</div>
			<div class="good-bottom-list-wrapper">
				<div class="good-bottom-select-wrapper">
					<wxc-checkbox :config="config" :has-bottom-border="false" class="shop-list-checkout shop-bottom-checkout"></wxc-checkbox>
				    <text class="good-bottom-checked-all">全选</text>
				</div>
				<div class="good-bottom-total-wrapper">
					<text class="good-bottom-total-text">合计:</text>
					<text class="good-bottom-total-money">￥1.00元</text>
					<div class="good-bottom-total-button">
						<text class="good-bottom-total-button-text">结算(2)</text>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { WxcCheckbox,WxcCheckboxList,WxcStepper } from 'weex-ui'
export default {
	data() {
		return {
			refreshing: false,//下拉刷新
			loadinging: false,//上拉加载
			moneyValue: 1,//购买商品数
			config: {
				//初始单选框
			    unCheckedIcon: '../src/components/shop/unchecked.png',
				checkedIcon:'../src/components/shop/checked.png',
			    disabledIcon:'https://gw.alicdn.com/tfs/TB1PtN3pwMPMeJjy1XdXXasrXXa-72-72.png',
			    checkedDisabledIcon:'https://gw.alicdn.com/tfs/TB1aPabpwMPMeJjy1XcXXXpppXa-72-72.png',
			    unCheckedDisabledIcon:'https://gw.alicdn.com/tfs/TB1lTuzpwoQMeJjy0FoXXcShVXa-72-72.png',
			    checkedColor: '#f40',
			},
        }
	},
	methods: {
		reduceMoney() {
    		this.moneyValue = this.moneyValue - 1;
    	},
    	addMoney() {
    		this.moneyValue = this.moneyValue + 1;
    	},
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
    components: { WxcCheckbox, WxcCheckboxList, WxcStepper },
}
</script>

<style lang="stylus" scoped>
.iconFont{
    font-family: iconfont;
}
.container{
	position: relative;
	padding-left: 20px;
	paddng-right: 20px;
}
.shop{
	position: fixed;
	width: 750px;
	top: 0;
	bottom: 110px;
	background-color: #f5f5f5;
}
.shop-header{
	width: 750px;
	height: 240px;
	background-color: rgb(115,204,70);
}
.shop-header-title-wrapper{
	position: relative;
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	width: 710px;
	height: 92px;  /*26 + 40 + 26*/
}
.shop-header-title{
	font-size: 43px;
	color: #fff;
}
.shop-header-delet{
	position: absolute;
	right: 0;
	top: 0;
	margin-top: 29px;
	font-size: 34px;
	color: #c1e6a3;
}
.shop-address-wrapper{
	display: flex;
	flex-direction: row;
	align-items: center;
	padding-top: 21px;  /*47 - 26*/
}
.iconfont-address{
	margin-right: 15px;
	font-size: 36px;
	color: #fff;
}
.shop-address-text{
	font-size: 30px;
	color: #fff;
	font-weight: 600;
}
.shop-wrapper{
	position: fixed;
	left: 0;
	top: 174px;
	bottom: 265px;
	width: 710px;
	margin-left: 20px;
	margin-right: 20px;
}
.shop-list{
	display: flex;
	flex-direction: row;
	align-items: center;
	width: 710px;
	height: 260px;
	margin-bottom: 10px;
	padding-left: 20px;
	padding-right: 20px;
	background-color: #fff;
	border-radius: 20px;
}
.shop-list-checkout{
	padding-top: 0!important;
	padding-bottom: 0!important;
	padding-left: 0!important;
	padding-right: 0!important;
	margin-right: 30px!important;
}
.shop-list-radio{
	width: 60px;
	height: 60px;
	border-radius: 50%;
	background-color: #f40;
	color: #fff;
	font-size: 60px;
	text-align: center;
	line-height: 60px;
}
.shop-list-image{
	width: 200px;
	height: 200px;
}
.shop-list-info{
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	flex: 1;
	height: 176px;
}
.shop-list-info-title,.shop-list-money-left,.shop-list-money-right{
	display: flex;
	flex-direction: row;
	align-items: center;
}
.shop-list-money-wrapper{
	display: flex;
	flex-direction: row;
	justify-content: space-between;
}
.shop-list-info-name,shop-list-info-weight,.shop-list-money{
	font-size: 30px;
	color: #222222;
}
.shop-list-info-weight{
	margin-left: 23px;
}
.shop-list-money{
	color: #f26100;
	font-weight: 600;
}
.shop-list-all-money{
	margin-left: 15px;
	font-size: 20px;
	color: #777777;
}
.shop-list-money-number{
	width: 40px;
	font-size: 20px;
	color: #777777;
	text-align: center;
	background-color: transparent;
}
.shop-list-money-reduce,.shop-list-money-add{
	font-size: 35px;
}
.shop-list-money-add{
	color: rgb(115,204,70);
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
.shop-bottom-checkout{
	height: 90px;
	margin-right: 10px!important;
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