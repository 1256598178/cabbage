<template>
	<div class="shop">
		<header class="shop-header">
			<!-- <div class="container"> -->
				<v-header :titleName="titleName" :deleted="true"></v-header>
				<!-- 待开发 -->
				<div class="shop-address-wrapper">
					<text class="iconFont iconfont-address">&#xe7e0;</text>
					<text class="shop-address-text">绿白菜滨湖春融苑店</text>
				</div>
			<!-- </div> -->
		</header><!-- /header -->
		<list class="shop-wrapper">
			<cell  v-for="(foods,index) in shopCarArr.CartList" :key="index" v-if="foods.CartNum > 0">
				<div class="shop-list">
					<wxc-checkbox :value="index" :config="config" :has-bottom-border="false" :checked="checkArr[index].checked" class="shop-list-checkout" @wxcCheckBoxItemChecked="wxcCheckBoxItemChecked"></wxc-checkbox>
					<image class="shop-list-image" :src="foods.ImageUrl"></image>
					<div class="shop-list-info">
						<div class="shop-list-info-title">
							<text class="shop-list-info-name">{{foods.ProductName}}</text>
							<text class="shop-list-info-weight">{{foods.Weight}}g</text>
						</div>
						<div class="shop-list-money-wrapper">
							<div class="shop-list-money-left">
								<text class="shop-list-money">￥{{foods.SalesPrice}}元/{{foods.Unit}}</text>
							    <text class="shop-list-all-money">￥{{foods.Price}}</text>
							</div>
							<div class="shop-list-money-right">
								<text class="iconFont shop-list-money-reduce" @click="reduceMoney(foods.CartNum,index)">&#xe600;</text>
								<input type="text" class="shop-list-money-number" disabled="true" v-model="foods.CartNum"/>
								<text class="iconFont shop-list-money-add" @click="addMoney(foods.CartNum,index)">&#xe601;</text>
							</div>
						</div>
					</div>
				</div>
			</cell>
		</list>
		<div class="good-bottom-wrapper">
			<div class="good-bottom-member-wrapper">
				<text class="iconFont member-image">&#xe641;</text>
				<text class="member-text">升级会员，本单可为您节省</text><text class="member-text-num">{{discount}}</text><text class="member-text">元!</text>
			</div>
			<div class="good-bottom-list-wrapper">
				<div class="good-bottom-select-wrapper">
					<wxc-checkbox :config="config" :has-bottom-border="false" class="shop-list-checkout shop-bottom-checkout" @wxcCheckBoxItemChecked="wxcCheck"></wxc-checkbox>
				    <text class="good-bottom-checked-all">全选</text>
				</div>
				<div class="good-bottom-total-wrapper">
					<text class="good-bottom-total-text">合计:</text>
					<text class="good-bottom-total-money">￥{{total}}元</text>
					<div class="good-bottom-total-button">
						<text class="good-bottom-total-button-text">结算({{shopNumber}})</text>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import Util from '../../common/utils/utils.js'
import { WxcCheckbox,WxcCheckboxList,WxcStepper } from 'weex-ui'
import header from '../header/orderHeader.vue'
const modal = weex.requireModule('modal')
let stream = weex.requireModule("stream")
const storage = weex.requireModule('storage')
// 获取购物车列表
const SHOP_URL = 'api/cart/getMyCartList?userId='
// 修改购物车数量
const MODIFYSHOPNUM_URL = 'api/cart/changeCart'
export default {
	data() {
		return {
			titleName: '购物车',
			refreshing: false,//下拉刷新
			loadinging: false,//上拉加载
			selectAll: false,//是否全选
			selectOne: false,//是否单选
			checkArr: [],//被选中产品的数组 用来做全部删除
			USERID: 'user_id',
			TOKEN: 'user_token',
			shopCarArr: {},
			config: {
				//初始单选框
			    unCheckedIcon: 'http://47.92.164.211:8011/PublicImage//unchecked.png',
				checkedIcon:'http://47.92.164.211:8011/PublicImage//checked.png',
			    disabledIcon:'https://gw.alicdn.com/tfs/TB1PtN3pwMPMeJjy1XdXXasrXXa-72-72.png',
			    checkedDisabledIcon:'https://gw.alicdn.com/tfs/TB1aPabpwMPMeJjy1XcXXXpppXa-72-72.png',
			    unCheckedDisabledIcon:'https://gw.alicdn.com/tfs/TB1lTuzpwoQMeJjy0FoXXcShVXa-72-72.png',
			    checkedColor: '#f40',
			},
			shopCar: {},// 物品对象
			discounts: 0.8,//折扣价
			// moneyValue: 0,//购买商品数
			// total: 0,//总价
			// shopNumber: 0,//商品个数
        }
	},
	methods: {
		reduceMoney(num,index) {
			var self = this,
				CartNums = self.shopCarArr.CartList[index].CartNum - 1
	        Util.WeexAjax({
	            url: MODIFYSHOPNUM_URL,
	            method: 'POST',
	            type: 'JSON',
	            token: self.TOKEN,
	            body: {
	            	"UserId": self.USERID,
	            	"CartId": self.shopCarArr.CartList[index].CartId,
	            	"CartNum": CartNums
	            },
	            callback: function(ret) {
	            	if(ret.Status == 1){
	            		var rets = ret.obj;
						self.shopCarArr.CartList[index].CartNum = parseInt(CartNums) - 1
	            		console.log(rets)
	            	}else{
                        modal.toast({
                            message: '请求错误',
                            duration: 1
                        })
	            	}
	            }
	        })
    		// this.shopCar[index].number = parseInt(this.shopCar[index].number) - 1;
    	},
    	addMoney(num,index) {var self = this;
	        Util.WeexAjax({
	            url: MODIFYSHOPNUM_URL,
	            method: 'POST',
	            type: 'JSON',
	            token: self.TOKEN,
	            body: {
	            	"UserId": self.USERID,
	            	"CartId": self.shopCarArr.CartList[index].CartId,
	            	"CartNum": (parseInt(self.shopCarArr.CartList[index].CartNum) + 1)
	            },
	            callback: function(ret) {
	            	if(ret.Status == 1){
	            		var rets = ret.obj;
						self.shopCarArr.CartList[index].CartNum = parseInt(self.shopCarArr.CartList[index].CartNum) + 1
	            		console.log(rets)
	            	}else{
                        modal.toast({
                            message: '请求错误',
                            duration: 1
                        })
	            	}
	            }
	        })
    		// this.shopCar[index].number = parseInt(this.shopCar[index].number) + 1;
    	},
		_initCheckArr() {
			for(var i = 0; i < this.shopCarArr.CartList.length; i++){
				this.checkArr.push({value: i,checked: false})
			}
		},
		// 选中
		wxcCheckBoxItemChecked(e) {
			this.selectOne = !this.selectOne;
			var value = e.value;
			if(this.selectOne){
				this.checkArr[value].checked = true;
				console.log(this.checkArr[value].checked)
			}else{
				this.checkArr[value].checked = false;
				console.log(this.checkArr[value].checked)
			}
		},
		// 全选按钮
		wxcCheck(){
			//判断是否全选
			this.selectAll = !this.selectAll;
			if(this.selectAll){
				for(var i = 0; i < this.checkArr.length; i++){
					this.checkArr[i].checked = true;
				}
			}else{
				for(var i = 0; i < this.checkArr.length; i++){
					this.checkArr[i].checked = false;
				}
			}
		},
		//全部删除按钮
		deletFoods() {
			for(var i = 0; i < this.checkArr.length; i++){
				if(this.checkArr[i].checked == true){
					this.shopCar.splice(i,1)
				}
			}
		}
	},
	created() {
        var fontModule = weex.requireModule("dom");
        fontModule.addRule('fontFace', {
            'fontFamily': "iconfont",
            'src': "url('//at.alicdn.com/t/font_948634_q51n034oj8.ttf')"
        })
        var self = this;
        storage.getItem(this.USERID,event => {
        	self.USERID = event.data
        	storage.getItem(this.TOKEN,event => {
        		self.TOKEN = event.data
		        Util.WeexAjax({
		            url: SHOP_URL + self.USERID,
		            method: 'GET',
		            type: 'JSON',
		            token: self.TOKEN,
		            callback: function(ret) {
		            	if(ret.Status == 1){
		            		var rets = ret.obj;
		            		self.shopCarArr = rets
		            		self._initCheckArr()
		            		console.log(self.shopCarArr)
		            	}else{
                            modal.toast({
                                message: '请求错误',
                                duration: 1
                            })
		            	}
		            }
		        })
        	})
        });
    },
    components: { 
    	WxcCheckbox, 
    	WxcCheckboxList, 
    	WxcStepper, 
    	"v-header": header 
    },
    computed: {
    	shopNumber() {
    		var num = 0;
    		var shopCarNum = 0;
    		for(var i = 0; i < this.shopCarArr.CartList.length; i++){
    			shopCarNum = this.shopCarArr.CartList[i].CartNum
    			num += parseInt(shopCarNum);
    		}
    		return num;
    	},
    	total() {
    		var money = 0;
    		var shopCarPrice = 0,
    			shopCarNum = 0;
    		for(var i = 0; i < this.shopCarArr.CartList.length; i++){
    			shopCarPrice = this.shopCarArr.CartList[i].SalesPrice
    			shopCarNum = this.shopCarArr.CartList[i].CartNum;
    			money += parseFloat(shopCarPrice) * parseInt(shopCarNum);
    		}
    		return money.toFixed(2);
    	},
    	discount() {
    		var count = 0;
    		var shopCarPrice = 0,
    			shopCarNum = 0;
    		for(var i = 0; i < this.shopCarArr.CartList.length; i++){
    			shopCarPrice = this.shopCarArr.CartList[i].SalesPrice
    			shopCarNum = this.shopCarArr.CartList[i].CartNum;
    			count += (parseFloat(shopCarPrice).toFixed(2) * parseInt(shopCarNum)) - (parseFloat(shopCarPrice).toFixed(2) * parseInt(shopCarNum) * this.discounts);
    		}
    		return count.toFixed(2);
    	}
    }
}
</script>

<style lang="stylus" scoped>
.iconFont{
    font-family: iconfont;
}
.shop{
	position: fixed;
	width: 750px;
	top: 0;
	bottom: 110px;
	background-color: #f5f5f5;
}
.shop-header{
	height: 240px;
	background-color: rgb(115,204,70);
}
/*.shop-header-title-wrapper{
	position: relative;
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	width: 710px;
	height: 92px;  26 + 40 + 26
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
}*/
.shop-address-wrapper{
	display: flex;
	flex-direction: row;
	align-items: center;
	padding-left: 20px;
	padding-right: 20px;
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
	width: 750px;
	padding-left: 20px;
	padding-right: 20px;
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
	margin-right: 25px;
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