<template>
	<div class="shop">
		<header class="shop-header">
			<v-header :titleName="titleName" :backPage="true"></v-header>
			<!-- <div class="shop-header-title-wrapper">
				<image class="backBtn" src="http://47.92.164.211:8011/PublicImage/backImage.png"></image>
				<text class="shop-header-title">订单结算</text>
			</div> -->
		</header>
		<list class="shop-wrapper">
			<cell>
				<div class="lemet-body lemet-address-wrapper">
					<div class="lemet-title-address">
						<div class="lemet-title-address-left">
							<image class="lemet-body-title-iconfont" src="http://47.92.164.211:8011/PublicImage/addressLink.png"></image>
					        <text class="lemet-body-title-name">绿白菜滨湖春融苑店</text>
						</div>
						<image class="lemet-title-address-right" src="http://47.92.164.211:8011/PublicImage/moreImage@16x25.png"></image>
					</div>
					<div class="lemet-address-box">
						<text class="lemet-address-box-text">合肥市滨湖区南京路与天柱山路交口春融苑{{titleName}}</text>
						<text class="lemet-address-box-text">联系电话：400 1234 4567</text>
					</div>
				</div>
				<div class="lemet-body lemet-food-time">
					<div class="lemet-food-time-list" @click="pickDate">
						<text class="lemet-food-time-name">预约取货日期</text>
						<div class="lemet-food-time-info">
							<text class="lemet-food-time-num lemet-food-time-name-active">{{dates}}</text>
							<image class="moreImage-14x9" src="http://47.92.164.211:8011/PublicImage/moreImage@14x9.png"></image>
						</div>
					</div>
					<div class="lemet-food-time-list" @click="pickTime">
						<text class="lemet-food-time-name">预约取货时间</text>
						<div class="lemet-food-time-info">
						    <text class="lemet-food-time-num">{{times}}</text>
							<image class="moreImage-14x9" src="http://47.92.164.211:8011/PublicImage/moreImage@14x9.png"></image>
						</div>
					</div>
					<div class="lemet-food-time-list">
						<text class="lemet-food-time-name">是否使用优惠券</text>
						<div class="lemet-food-time-info">
						    <text class="lemet-food-time-num">请选择优惠券</text>
							<image class="moreImage-14x9" src="http://47.92.164.211:8011/PublicImage/moreImage@14x9.png"></image>
						</div>
					</div>
					<div class="lemet-food-time-list">
						<text class="lemet-food-time-name">是否需要购物袋</text>
						<div class="lemet-food-time-info">
						    <text class="lemet-food-time-num">否</text>
							<image class="moreImage-14x9" src="http://47.92.164.211:8011/PublicImage/moreImage@14x9.png"></image>
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
						<div class="cellps" v-for="(item,index) in lemet.CartList">
							<image class="product-img" :src="item.ImageUrl"></image>
			        		<div class="pro-news">
			        			<div class="pro-r">
			        				<text class="product-title">{{item.ProductName}}</text>
			        			    <text class="product-title-weight">{{item.Weight}}</text>
			        			</div>
			        			<div class="pro-m">
			        				<text class="product-price">¥{{item.SalesPrice}}元/{{item.Unit}}</text>
			        				<text class="product-price-number">×{{item.CartNum}}</text>
			        			</div>
			        		</div>
						</div>
					</div>
				</div>
			</cell>
		</list>
		<div class="good-bottom-wrapper">
			<div class="good-bottom-member-wrapper">
				<image class="member-image" src="http://47.92.164.211:8011/PublicImage/menber@26x24.png"></image>
				<text class="member-text">升级会员，本单可为您节省</text><text class="member-text-num">{{(lemet.TotalPrice - (lemet.Discount * lemet.TotalPrice)).toFixed(2)}}</text><text class="member-text">元!</text>
			</div>
			<div class="good-bottom-list-wrapper">
				<div class="good-bottom-select-wrapper">
					<text class="good-bottom-total-text">预付款:</text>
					<text class="good-bottom-total-money">¥{{lemet.TotalPrice}}元</text>
				</div>
				<div class="good-bottom-total-button">
					<text class="good-bottom-total-button-text" @click="submitBtn()">提交订单</text>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import header from '../header/orderHeader.vue'
import Util from '../../../common/utils/utils.js'
import api from '../../../common/api/api.js'
// import Storage from '../../common/utils/storage.js'
const storage = weex.requireModule('storage')

const modal = weex.requireModule('modal')
var stream = weex.requireModule('stream')
const picker = weex.requireModule('picker')
export default {
	data() {
		return {
			titleName: '订单结算',
			dates:'',
			lemet: {},
			datesList:[],
			PickingId: [],
			pickid: '',
			times:'请选择',
			timeList:[],
			numList:[],
			USERID: 'user_id',
			TOKEN: 'user_token',
        }
	},
	methods: {
		pickDate () {
			picker.pick({
			  items: this.datesList,
			}, event => {
			  if (event.result === 'success') {
				this.dates = this.datesList[event.data]
				self.times = '请选择'
			  }
			})
			var self = this
			Util.WeexAjax({
			    url: api.TIMEURLS + '?date='+self.dates,
			    method: 'GET',
			    type: 'JSON',
			    callback: function(ret) {
			        // let rets = Util.JsonFormat(ret);
			        if (ret.Status == 0) {
			            
			        } else if (ret.Status == 1) {
			            console.log(ret)
						var arr=[];
						var num=[];
						for(var i = 0;i<ret.obj.length;i++){
							arr.push(ret.obj[i].PickingTime);
							num.push(ret.obj[i].PickingNum)
						}
			            self.timeList = arr
						self.numList = num
			        }
			    }
			})
			//self.times = self.timeList[0].PickingTime
		},
		pickTime () {
			var self = this
			picker.pick({
			  items: self.timeList,
			}, event => {
			  if (event.result === 'success') {
				if(self.numList[event.data]!=0){
					self.times = self.timeList[event.data]
					self.pickid = self.PickingId[event.data]
				}else{
					modal.toast({
						message: '预约已满，请选择其他时间',
						duration: 0.3
					})
				}
			  }
			}) 
		},
		analCartIds() {
	        // var url = decodeURI(weex.config.bundleUrl) + '?CartIds=279,280,281,282,283'; //取得整个地址栏
	        var url = decodeURI(weex.config.bundleUrl); //取得整个地址栏
	        console.log(url)
	        var result = url.match(new RegExp(/\?\w*\=\w*(\&\w*\=\w*)*/, "g"))[0].slice(1);
	        // console.log(result)
	        var key = result.match(new RegExp(/\w*\=/, "g"));
	        // console.log(key)
	        var value = url.match(new RegExp(/\=(\w*\,*)*/, "g"));
	        console.log(value)
	        var warp = {};
	        for (var indexes in value) {
	            key[indexes] = key[indexes].slice(0, key[indexes].length - 1)
	            value[indexes] = value[indexes].slice(1)
	            // console.log(value[indexes])
	            warp[key[indexes]] = value[indexes]
	        }
	        return warp
	    },
	    // 提交订单
	    submitBtn() {
	    	var self = this;
	        Util.WeexAjax({
	            url: api.SUBMITORDER_URL,
	            method: 'POST',
	            type: 'JSON',
	            token: self.TOKEN,
	            body: {
	            	"UserId": self.USERID,
	            	"CartIds": Util.analAjax({"routerName":function(){return self.$route.query}}).CartIds,
	            	"CouponId": 0,
	            	"ShopId": 1,
	            	"PickingDate": self.dates,
	            	// "PickingTimeId": self.pickid
	            	"PickingTimeId": '1'
	            },
	            callback: function(ret) {
	            	if(ret.Status == 1){
	            		// Util.jump({
			            //     "phoneJump": function(){
			            //         var bundleUrl = self.bundleUrl;
			            //         weex.requireModule('navigator').push({
			            //             url: Util.urlPort().urlAddPort + 'dist/' + 'components/main/checkstand/checkstand.js?TotalPrice=' + self.lemet.TotalPrice,
			            //             animated: "true"
			            //         }, event => {})
			            //     },
			            //     "webJump": function(){
			                    self.$router.push({
			                        name: "checkstand",
			                        query: {
			                            "TotalPrice": self.lemet.TotalPrice
			                        }
			                    })
			                // }
			            // })
                        // Util.NavigatUrl({
                        //     message: ret.Message,
                        //     duration: 1,
                        //     urls: 'components/checkstand/checkstand.js?TotalPrice=' + self.lemet.TotalPrice,
                        //     _this: self.$getConfig()
                        // })
	            	}else{
                        modal.toast({
                            message: ret.Message,
                            duration: 1
                        })
	            	}
	            }
	        })
	    }
	},
	created() {
        var fontModule = weex.requireModule("dom");
        fontModule.addRule('fontFace', {
            'fontFamily': "iconfont",
            'src': "url(" + api.iconUrl + ")"
        })
		var self = this;

		// 获取选中的购物车
        storage.getItem(self.USERID,event => {
        	self.USERID = event.data
        	storage.getItem(self.TOKEN,event => {
        		self.TOKEN = event.data
		        Util.WeexAjax({
		            url: api.GETMYCARTCHOSTLIST_URL + self.USERID + '&CartIds=' + Util.analAjax({"routerName":function(){return self.$route.query}}).CartIds,
		            method: 'GET',
		            type: 'JSON',
		            token: self.TOKEN,
		            callback: function(ret) {
		            	if(ret.Status == 1){
		            		self.lemet = ret.obj;
		            		console.log(self.lemet)
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
        // 获取日期请求
		Util.WeexAjax({
		    url: api.DATEURLS,
		    method: 'GET',
		    type: 'JSON',
		    callback: function(ret) {
		        // let rets = Util.JsonFormat(ret);
		        if (ret.Status == 0) {
		            
		        } else if (ret.Status == 1) {
		            console.log(ret)
					var arr=[];
					self.dates = ret.obj.PickingDateList[0].PickingDateText
					for(var i = 0;i<ret.obj.PickingDateList.length;i++){
						arr.push(ret.obj.PickingDateList[i].PickingDateText);
					}
		            self.datesList = arr
		        }
		    }
		})
        // 获取时间请求
		Util.WeexAjax({
		    url: api.TIMEURLS + '?date='+self.dates,
		    method: 'GET',
		    type: 'JSON',
		    callback: function(ret) {
		        // let rets = Util.JsonFormat(ret);
		        if (ret.Status == 0) {
		            
		        } else if (ret.Status == 1) {
		            console.log(ret)
					var arr=[];
					var num=[];
					var Id = [];
					//self.dates = ret.obj.PickingDateList[0].PickingDateText
					for(var i = 0;i<ret.obj.length;i++){
						arr.push(ret.obj[i].PickingTime);
						num.push(ret.obj[i].PickingNum);
						Id.push(ret.obj[i].PickingId)
					}
		            self.timeList = arr
					self.numList = num
					self.PickingId = Id
					console.log(self.PickingId)
					console.log(self.timeList)
					console.log(self.numList)
		        }
		    }
		})
    },
    components: {
    	"v-header": header 
    },
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
.shop-header-title-wrapper{
	position: relative;
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	width: 750px;
	height: 92px;
}
.shop-header-title{
	font-size: 43px;
	color: #fff;
}
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

.lemet-title-address,.lemet-food-time-list{  
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
}
.lemet-title-address{
	margin-bottom: 20px;
}
.lemet-title-address-left,
.lemet-food-time-info,
.lemet-trade-title-wrapper,
.pro-r{
	display: flex;
	flex-direction: row;
	align-items: center;
}
.lemet-title-address-right{
	width: 16px;
	height: 25px;
}
.lemet-body-title-name{
	font-size: 32px;
	color: #333333;
	line-height: 34px;
}
.lemet-body-title-iconfont{
	width: 35px;
	height: 35px;
	margin-right: 10px;
}
.lemet-address-box-text{
	font-size: 26px;
	color: #777777;
	line-height: 40px;	
}



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
	font-size: 26px;
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
	font-size: 32px;
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
.shop-wrapper{
	position: fixed;
	left: 0;
	top: 92px;
	bottom: 130px;
	width: 750px;
}
.good-bottom-wrapper{
	position: fixed;
	display: flex;
	flex-direction: column;
	bottom: 0px;
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
	width: 39px;
	height: 36px;
	margin-right: 10px;
}
.member-text,.member-text-num{
	font-size: 22px;
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
	font-size: 26px;
	color: #777777;
}
.good-bottom-total-money{
	font-size: 26px;
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