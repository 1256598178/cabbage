<template>
	<!-- 海鲜水产 -->
	<div class="find">
		<div class="find-title-box">
			<v-header :titleName="titleName" :backPage="true" :layout="true" :layoutAct="layoutAct" v-on:layoutAct="layout($event)"></v-header>
		</div>
		<list class="congra-body-wrapper">
			<cell>
				<div class="seafood-wrapper-layout">
					<div :class="[layoutAct == false ? 'seafood-wrapper' : 'seafood-wrapper-active']" v-for="items in seafoodArr.Items" @click="jump({'web':'goodIn','ProductId': items.ProductId})"><!-- seafood-wrapper-active -->
						<image class="seafood-image" :src="items.ImageUrl"></image>
						<div :class="[layoutAct == false ? 'seafood-bottom-wrapper' : 'seafood-bottom-wrapper-active']"><!-- seafood-bottom-wrapper-active -->
							<div class="seafood-bottom-name-box">
								<text class="seafood-bottom-name">{{items.ProductName}}&nbsp;&nbsp;&nbsp;{{items.Weight}}</text>
								<text class="seafood-bottom-subname" v-if="layoutAct">{{items.Introduce}}</text>
							</div>
							<div class="seafood-bottom-shop">
								<div class="seafood-bottom-shop-doller-wrapper">
									<div class="seafood-bottom-shop-doller-box">
										<text class="doller-font">¥</text><text class="seafood-bottom-shop-doller">{{items.SalesPrice  | droller}}元/斤</text>
									</div>
								    <text class="seafood-bottom-shop-all-doller">¥{{items.SalesPrice  | droller}}</text>
								</div>
								<image class="seafood-bottom-shop-car" src="http://47.92.164.211:8011/PublicImage/shop-car.png" @click="addShopCar(items.ProductId)"></image>
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
import Util from '../../../common/utils/utils.js'
import api from '../../../common/api/api.js'
const modal = weex.requireModule('modal')
const storage = weex.requireModule('storage')
export default {
	data() {
		return {
			titleName: '搜索结果',
			pageAjax: {
				categoryId: 12,
				page: 1,
				pageSize: 10,
			},
			refreshing: false,//下拉刷新
			loadinging: false,//上拉加载
			layoutAct: false,
			seafoodArr: {},
            USERID: 'user_id',
            TOKEN: 'user_token',
		}
	},
	methods: {
		onloading (){
			var _this = this;
			this.loadinging = true;
			Util.WeexAjax({
	            url: api.SEAFOOD_URL + 'categoryId='+ Util.analAjax({"routerName":function(){return _this.$route.query}}).CategoryId +'&page='+ (_this.pageAjax.page+1) +'&pageSize=' + _this.pageAjax.pageSize,
	            // url: SEAFOOD_URL + 'categoryId='+ _this.pageAjax.categoryId +'&page='+ (_this.pageAjax.page+1) +'&pageSize=' + _this.pageAjax.pageSize,
	            method: 'GET',
	            type: 'JSON',
	            callback: function(ret) {
	                if (ret.Status == 1) {
	                	var rets = ret.obj;
	                	console.log(rets)
	                	if(rets.CurrentPage != _this.seafoodArr.CurrentPage){
	                		_this.seafoodArr.CurrentPage = rets.CurrentPage;
	                		for(var item in rets.Items){
	                			_this.seafoodArr.Items.push(rets.Items[item])
	                		}
	                	}else{
	                		modal.toast({
					            message: '没有更多内容了哦~',
					            duration: 1
					        })
	                	}
	                	_this.loadinging = false;
	                }
	                console.log(_this.seafoodArr)
	            }
	        })
		},
		layout(msg) {
			this.layoutAct = msg;
		},
		jump(urls) {
            var self = this;
            // Util.jump({
            //     "phoneJump": function(){
            //         var bundleUrl = self.bundleUrl;
            //         weex.requireModule('navigator').push({
            //             url: Util.urlPort().urlAddPort + 'dist/' + urls.phone + '?' + urls.name + '=' + urls.CategoryId,
            //             animated: "true"
            //         }, event => {})
            //     },
            //     "webJump": function(){
                    self.$router.push({
                        name: urls.web,
                        query: {
                            "CategoryId": urls.CategoryId,
                            "ProductId": urls.ProductId
                        }
                    })
            //     }
            // })
	  	},
	  	addShopCar(Product_Id) {
            var self = this;
            Util.goLogin({
                "USERID": self.USERID,
                "TOKEN": self.TOKEN,
                "success": function(){
                    Util.WeexAjax({
                        url: api.SHOPCAR_URL,
                        method: 'POST',
                        type: 'JSON',
                        token: self.TOKEN,
                        body: {
                            "UserId": self.USERID,
                            "ProductId": Product_Id,
                            "CartNum": 1
                        },
                        callback: function(ret) {
                            if (ret.Status == 1) {
                                modal.toast({
                                    message: ret.Message,
                                    duration: 1
                                })
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
        }
	},
    created() {
    	var _this = this;
    	
        Util.WeexAjax({
            url: api.SEAFOOD_URL + 'categoryId='+ Util.analAjax({"routerName":function(){return _this.$route.query}}).CategoryId +'&page='+ 1 +'&pageSize=' + 10,
            // url: SEAFOOD_URL + 'categoryId='+ 12 +'&page='+ 1 +'&pageSize=' + 10,
            method: 'GET',
            type: 'JSON',
            callback: function(ret) {
                if (ret.Status == 1) {
                	var rets = ret.obj;
                	_this.seafoodArr = rets;
                	_this.titleName = rets.CategoryName
                	console.log(_this.seafoodArr)
                }
            }
        })
        storage.getItem(_this.USERID, event => {
            _this.USERID = event.data
            storage.getItem(_this.TOKEN, event => {
                _this.TOKEN = event.data
            })
        });
    },
	components: {
    	"v-header": header 
    },
    filters: {
    	droller: function (msg) {
    		return msg.toFixed(2)
    	}
    }
}
</script>

<style lang="stylus" scoped>
.refresh,
.loading {
    text-align: center;
}
.loading {
    width: 750px;
    height: 50px;
    line-height: 50px;
    display: -ms-flex;
    display: -webkit-flex;
    display: flex;
    -ms-flex-align: center;
    -webkit-align-items: center;
    -webkit-box-align: center;
    align-items: center;
    text-align: center;
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
	border-radius: 15px;
	box-shadow: 0 0 10px 3px #eee;
}
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
	font-size: 34px;
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
	text-overflow: ellipsis;
	lines: 2;
}
.seafood-bottom-shop{
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
}
.seafood-bottom-shop-doller-wrapper{
	display: flex;
	flex-direction: column;
	align-items: flex-start;
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
	font-size: 34px;
	color: #ff0000;
	line-height: 36px;
	font-weight: bold;
}
.seafood-bottom-shop-all-doller{
	margin-top: 10px;
	font-size: 28px;
	color: #777777;
	line-height: 30px;
}
.seafood-bottom-shop-car{
	width: 77px;
	height: 77px;
}
</style>