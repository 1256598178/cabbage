<template>
	<div class="shop">
		<div class="shop-header">
			<!-- <div class="container"> -->
				<div class="shop-header-title-wrapper">
			        <text class="shop-header-title">{{titleName}}</text>
			        <text class="shop-header-delet" @click="deletFoods()">删除</text>
			    </div>
				<!-- <v-header :titleName="titleName" :deleted="true" :USERIDs="USERID" :TOKENs="TOKEN" :shopCarArrs="shopCarArr" v-on:fetch="deletAll($event)"></v-header> -->
				<!-- 待开发 -->
				<div class="shop-address-wrapper">
					<image class="iconfont-address" src="http://47.92.164.211:8011/PublicImage/address.png"></image>
					<text class="shop-address-text">绿白菜滨湖春融苑店</text>
				</div>
			<!-- </div> -->
		</div>
		<list class="shop-wrapper">
			<cell  v-for="(foods,index) in shopCarArr.CartList" :key="index" v-if="foods.CartNum > 0">
				<div class="shop-list">
					<wxc-checkbox :value="index" :config="config" :has-bottom-border="false" :checked="checkArr[index].checked" class="shop-list-checkout" @wxcCheckBoxItemChecked="wxcCheckBoxItemChecked"></wxc-checkbox>
					<image class="shop-list-image" :src="foods.ImageUrl"></image>
					<div class="shop-list-info">
						<div class="shop-list-info-title">
							<text class="shop-list-info-name">{{foods.ProductName}}{{foods.checked}}</text>
							<text class="shop-list-info-weight">{{foods.Weight}}g</text>
						</div>
						<div class="shop-list-money-wrapper">
							<div class="shop-list-money-left">
								<text class="shop-list-money">￥{{foods.SalesPrice}}元/{{foods.Unit}}</text>
							    <text class="shop-list-all-money">￥{{foods.Price}}</text>
							</div>
							<div class="shop-list-money-right">
								<image class="shop-list-money-reduce shop-list-money-img" src="http://47.92.164.211:8011/PublicImage/res@34x34.png" @click="reduceMoney(foods.CartNum,index)"></image>
								<text type="text" class="shop-list-money-number">{{foods.CartNum}}</text>
								<image class="shop-list-money-add shop-list-money-img" src="http://47.92.164.211:8011/PublicImage/add@34x34.png" @click="addMoney(foods.CartNum,index)"></image>
							</div>
						</div>
					</div>
				</div>
			</cell>
		</list>
		<div class="good-bottom-wrapper">
			<div class="good-bottom-member-wrapper">
				<image class="member-image" src="http://47.92.164.211:8011/PublicImage/menber@26x24.png"></image>
				<text class="member-text">升级会员，本单可为您节省</text><text class="member-text-num">{{discount}}</text><text class="member-text">元!</text>
			</div>
			<div class="good-bottom-list-wrapper">
				<div class="good-bottom-select-wrapper">
					<wxc-checkbox :config="config" :has-bottom-border="false" class="shop-list-checkout shop-bottom-checkout" :checked="selectAll" @wxcCheckBoxItemChecked="wxcCheck"></wxc-checkbox>
				    <text class="good-bottom-checked-all">全选</text>
				</div>
				<div class="good-bottom-total-wrapper">
					<text class="good-bottom-total-text">合计:</text>
					<text class="good-bottom-total-money">￥{{total}}元</text>
					<div class="good-bottom-total-button">
						<text class="good-bottom-total-button-text" @click="jump({'web':'setlemet'})">结算({{shopNumber}})</text>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import Util from '../../../common/utils/utils.js'
import api from '../../../common/api/api.js'
import { WxcCheckbox,WxcCheckboxList,WxcStepper } from 'weex-ui'
const modal = weex.requireModule('modal')
let stream = weex.requireModule("stream")
const storage = weex.requireModule('storage')
// const SUBITORDER_URL = 'api/cart/sumbitOrder'
export default {
	data() {
		return {
			titleName: '购物车',
			refreshing: false,//下拉刷新
			loadinging: false,//上拉加载
			selectAll: true,//是否全选
			selectOne: false,//是否单选
			checkArr: [],//被选中产品的数组 用来做全部删除
			USERID: 'user_id',
			TOKEN: 'user_token',
			shopCarArr: {},
			config: {
				//初始单选框
			    unCheckedIcon: 'http://47.92.164.211:8011/PublicImage/unchecked.png',
				checkedIcon:'http://47.92.164.211:8011/PublicImage/checked.png',
			    disabledIcon:'https://gw.alicdn.com/tfs/TB1PtN3pwMPMeJjy1XdXXasrXXa-72-72.png',
			    checkedDisabledIcon:'https://gw.alicdn.com/tfs/TB1aPabpwMPMeJjy1XcXXXpppXa-72-72.png',
			    unCheckedDisabledIcon:'https://gw.alicdn.com/tfs/TB1lTuzpwoQMeJjy0FoXXcShVXa-72-72.png',
			    checkedColor: '#f40',
			},
			shopCar: {},// 物品对象
			discounts: 0.0,//折扣价
			// moneyValue: 0,//购买商品数
			// total: 0,//总价
			// shopNumber: 0,//商品个数
        }
	},
	methods: {
		// 去除商品
		reduceMoney(num,index) {
			var self = this,
				// 本地修改
				CartNums = num - 1
	        Util.WeexAjax({
	            url: api.MODIFYSHOPNUM_URL,
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
						self.shopCarArr.CartList[index].CartNum = parseInt(CartNums)
						if(self.shopCarArr.CartList[index].CartNum <= 0){
							self.checkArr.splice(index, 1)
							self.shopCarArr.CartList.splice(index, 1)
						}
						// console.log(self.checkArr)
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
    	// 增加商品
    	addMoney(num,index) {
    		var self = this;
	        Util.WeexAjax({
	            url: api.MODIFYSHOPNUM_URL,
	            method: 'POST',
	            type: 'JSON',
	            token: self.TOKEN,
	            body: {
	            	"UserId": self.USERID,
	            	"CartId": self.shopCarArr.CartList[index].CartId,
	            	"CartNum": (parseInt(num) + 1)
	            },
	            callback: function(ret) {
	            	if(ret.Status == 1){
	            		var rets = ret.obj;
						self.shopCarArr.CartList[index].CartNum = parseInt(num) + 1
	            		// console.log(self.shopCarArr.CartList)
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
				// var aa =  this.shopCarArr.CartList[i]
				this.checkArr.push({checked: true})
				this.shopCarArr.CartList[i].checked = true;
			}
			// console.log(this.checkArr)
			// console.log(this.shopCarArr)
		},
		// 选中
		wxcCheckBoxItemChecked(e) {
			// this.selectOne = !this.selectOne;
			// console.log(this.selectOne)
			var value = e.value;
			this.checkArr[value].checked = e.checked;
			this.shopCarArr.CartList[value].checked = e.checked;
			console.log(this.checkArr)
			console.log(this.shopCarArr)
		},
		// 全选按钮
		wxcCheck(e){
			//判断是否全选
			// this.selectAll = !this.selectAll;
			var value = e.value;
			// if(e.checked){
			for(var i = 0; i < this.shopCarArr.CartList.length; i++){
				this.checkArr[i].checked = e.checked;
				this.shopCarArr.CartList[i].checked = e.checked;
			}
			// }else{
			// 	for(var i = 0; i < this.shopCarArr.CartList.length; i++){
			// 		this.checkArr[i].checked = false;
			// 		this.shopCarArr.CartList[i].checked = false;
			// 	}
			// }
			console.log(this.shopCarArr.CartList)
		},
		//删除按钮
		deletFoods() {
			// console.log(this.checkArr)
			// var sb=this.checkArr;
			// var index;
			var self = this;
			var arr = []
			for(var i = this.checkArr.length - 1; i >= 0; i--){
				if(this.checkArr[i].checked == true){
					// console.log(i+'----')
					var CartId = self.shopCarArr.CartList[i].CartId
                    self.checkArr.splice(i,1)
                    self.shopCarArr.CartList.splice(i,1)
					Util.WeexAjax({
	                    url: api.MODIFYSHOPNUM_URL,
	                    method: 'POST',
	                    type: 'JSON',
	                    token: self.TOKEN,
	                    body: {
	                        "UserId": self.USERID,
	                        "CartId": CartId,
	                        "CartNum": 0
	                    },
	                    callback: function(ret) {
	                        if(ret.Status == 1){
	                            var rets = ret.obj;
	                        }else{
	                            modal.toast({
	                                message: '请求错误',
	                                duration: 1
	                            })
	                        }
	                    }
	                })
				}
			}
		},
		jump(urls) {
			var self = this;
			var CartIds = '';
			for(var i = 0; i < this.shopCarArr.CartList.length; i++){
				if(this.shopCarArr.CartList[i].checked == true){
					CartIds += this.shopCarArr.CartList[i].CartId + ','
				}
			}
			// 替换字符串 替换掉最后一个逗号
			CartIds = CartIds.replace(/(\,$)/g,"");
            // Util.jump({
            //     "phoneJump": function(){
            //         var bundleUrl = self.bundleUrl;
            //         weex.requireModule('navigator').push({
            //             url: Util.urlPort().urlAddPort + 'dist/' + '?CartIds='+CartIds,
            //             animated: "true"
            //         }, event => {})
            //     },
            //     "webJump": function(){
                    self.$router.push({
                        name: urls.web,
                        query: {
                            "CartIds": CartIds
                        }
                    })
            //     }
            // })
	  	},
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
        		Util.goLogin({
	                "USERID": self.USERID,
	                "TOKEN": self.TOKEN,
	                "success": function(){
				        Util.WeexAjax({
				            url: api.SHOP_URL + self.USERID,
				            method: 'GET',
				            type: 'JSON',
				            token: self.TOKEN,
				            callback: function(ret) {
				            	if(ret.Status == 1){
				            		var rets = ret.obj;
				            		self.shopCarArr = rets
				            		self.discounts = rets.Discount
				            		// 初始化单选框
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
	                },
	                "fail": function(){
	                    // Util.jump({
	                    //     "phoneJump": function(){
	                    //         var bundleUrl = this.bundleUrl;
	                    //         weex.requireModule('navigator').push({
	                    //             url: Util.urlPort().urlAddPort + 'dist/' + "components/login/login.js",
	                    //             animated: "true"
	                    //         }, event => {})
	                    //     },
	                    //     "webJump": function(){
	                            self.$router.push({name: "login"})
	                    //     }
	                    // })
	                }
	            })
        	})
        });
    },
    components: { 
    	WxcCheckbox, 
    	WxcCheckboxList, 
    	WxcStepper,
    },
    computed: {
    	shopNumber() {
    		var num = 0;
    		var shopCarNum = 0;
    		// console.log(this.shopCarArr.CartList.length)
    		if(this.shopCarArr.CartList){
    		for(var i = 0; i < this.shopCarArr.CartList.length; i++){
    			shopCarNum = this.shopCarArr.CartList[i].CartNum
    			num += parseInt(shopCarNum);
    		}
    	}
    		return num;
    	},
    	total() {
    		var money = 0;
    		var shopCarPrice = 0,
    			shopCarNum = 0;
    			if(this.shopCarArr.CartList){
    		for(var i = 0; i < this.shopCarArr.CartList.length; i++){
    			shopCarPrice = this.shopCarArr.CartList[i].SalesPrice
    			shopCarNum = this.shopCarArr.CartList[i].CartNum;
    			money += parseFloat(shopCarPrice) * parseInt(shopCarNum);
    		}
    	}
    		return money.toFixed(2);
    	},
    	discount() {
    		var count = 0;
    		var shopCarPrice = 0,
    			shopCarNum = 0;
    		if(this.shopCarArr.CartList){
	    		for(var i = 0; i < this.shopCarArr.CartList.length; i++){
	    			shopCarPrice = this.shopCarArr.CartList[i].SalesPrice
	    			shopCarNum = this.shopCarArr.CartList[i].CartNum;
	    			count += (parseFloat(shopCarPrice).toFixed(2) * parseInt(shopCarNum)) - (parseFloat(shopCarPrice).toFixed(2) * parseInt(shopCarNum) * this.discounts);
	    		}
    		}
    		return count.toFixed(2);
    	},
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
.shop-address-wrapper{
	display: flex;
	flex-direction: row;
	align-items: center;
	padding-left: 20px;
	padding-right: 20px;
	padding-top: 21px;
}
.iconfont-address{
	width: 25px;
	height: 35px;
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
.shop-list-money-img{
	width: 34px;
	height: 34px;
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
	width: 26px;
	height: 24px;
	margin-right: 10px;
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





.backBtn {
    position: absolute;
    left: 20px;
    top: 25.5px;
    width: 28px;
    height: 41px;
}

.shareBtn {
    position: absolute;
    top: 23px;
    right: 20px;
    width: 46px;
    height: 46px;
}

.layoutBtn-44 {
    position: absolute;
    top: 24px;
    right: 20px;
    width: 44px;
    height: 44px;
}

.shop-header-title-wrapper {
    position: relative;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    height: 92px;
    /*26 + 40 + 26*/
    padding-left: 20px;
    padding-right: 20px;
    background-color: rgb(115, 204, 70);
}

.shop-header-title {
    width: 500px;
    font-size: 42px;
    color: #fff;
    text-align: center;
    text-overflow: ellipsis;
    lines: 1;
}

.shop-header-delet,
.shop-header-info {
    position: absolute;
    right: 20px;
    top: 0;
    margin-top: 27px;
    font-size: 34px;
    line-height: 38px;
    color: #c1e6a3;
}

.shop-header-info {
    color: #fff;
}
</style>