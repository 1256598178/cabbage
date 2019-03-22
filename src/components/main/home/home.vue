<template>
    <div class="home">
        <v-header></v-header>
        <list class="home-wrapper">
            <refresh @refresh="onrefresh" :display="refreshing ? 'show' : 'hide'">
                <text class="refresh">下拉刷新...</text>
            </refresh>
            <cell>
                <slider class="list-box banner-wrapper" auto-play="autoPlay" interval="4000">
                    <div class="banner-list list-box-child" v-for="banner in homeArr.BannerList">
                        <image class="_banner" :src="banner.ImageUrl"></image>
                    </div>
                    <indicator class="indicator"></indicator>
                </slider>
            </cell>
            <cell>
                <slider class="list-box fication-wrapper">
                    <div class="fication-wrapper-list list-box-child" v-for="(item,cindex) in nav.navWrapperList" :key="cindex">
                        <div class="fication-wrapper-list-child" v-for="(list,index) in nav.navWrapperList[cindex]" @click="jump({'web':'seafood','CategoryId': list.CategoryId})" :key="index">
                            <image class="_fication" :src="list.TopImageUrl"></image>
                            <text class="fication-name">{{list.CategoryName}}</text>
                        </div>
                    </div>
                    <indicator class="indicator fication-indicator"></indicator>
                </slider>
            </cell>
            <cell>
                <div class="list-box wechat-wrapper">
                    <image class="_wechatImage" :src="service.wechatImage"></image>
                    <image class="wechat" :src="service.wechat"></image>
                    <div class="service-info">
                        <text class="face-name">{{service.names}}</text>
                        <a><text class="face-linkr">{{service.linkr}}</text></a>
                    </div>
                    <div class="tel-wrapper">
                        <image class="_tel" :src="service.telImage"></image>
                        <div>
                            <text class="telName">{{service.telName}}</text>
                            <text class="telNum">{{service.telNum}}</text>
                        </div>
                    </div>
                </div>
            </cell>
            <cell>
                <div class="list-box food-box">
                    <div class="foods-wrapper">
                        <div class="foods-wrapper-list">
                            <image class="foods-image-one" :src="homeArr.RegionCategoryList[0].RegionImageUrl"  v-if="boolArr[0]"  @click="jump({'web':'seafood','CategoryId': homeArr.RegionCategoryList[0].CategoryId})"></image>
                        </div>
                        <div class="foods-wrapper-list foods-wrapper-list-two">
                            <image class="foods-image foots-image-three" :src="homeArr.RegionCategoryList[1].RegionImageUrl" v-if="boolArr[1]" @click="jump({'web':'seafood','CategoryId': homeArr.RegionCategoryList[1].CategoryId})"></image>
                            <image class="foods-image" :src="homeArr.RegionCategoryList[2].RegionImageUrl" v-if="boolArr[2]" @click="jump({'web':'seafood','CategoryId': homeArr.RegionCategoryList[2].CategoryId})"></image>
                        </div>
                    </div>
                    <div class="foods-wrapper">
                        <div class="foods-wrapper-list">
                            <image class="foods-image" :src="homeArr.RegionCategoryList[3].RegionImageUrl" v-if="boolArr[3]" @click="jump({'web':'seafood', 'CategoryId': homeArr.RegionCategoryList[3].CategoryId})"></image>
                        </div>
                        <div class="foods-wrapper-list">
                            <image class="foods-image" :src="homeArr.RegionCategoryList[4].RegionImageUrl" v-if="boolArr[4]" @click="jump({'web':'seafood', 'CategoryId': homeArr.RegionCategoryList[4].CategoryId})"></image>
                        </div>
                    </div>
                </div>
            </cell>
            <cell v-for="(foodList,indexs) in homeArr.HotCategoryProdctListList" :key="indexs">
                <div class="list-box">
                    <image class="food-bg-image" :src="foodList.ImageUrl" @click="jump({'web':'seafood', 'CategoryId': foodList.CategoryId})"></image>
                </div>
                <div class="list-box foot-list-wrapper">
                    <div class="foot-list" v-for="food in homeArr.HotCategoryProdctListList[indexs].ProductsList" @click="jump({'web':'goodIn','ProductId': food.ProductId})">
                        <div class="image-box">
                            <image class="food-image" :src="food.ImageUrl"></image>
                        </div>
                        <div class="food-shop-wrapper">
                            <div class="food-name-wrapper">
                                <text class="foot-shop-name">{{food.ProductName}}&nbsp;&nbsp;{{food.Weight}}</text>
                            </div>
                            <div class="foot-dollar-wrapper">
                                <div class="foot-wrapper">
                                    <text class="foot-dollar">¥{{food.SalesPrice | droller}}元/斤</text>
                                    <text class="foot-more-money">¥{{food.Price | droller}}</text>
                                </div>
                                <image class="foot-shop-car" src="http://47.92.164.211:8011/PublicImage/shop-car.png" @click="addShopCar(food.ProductId)"></image>
                            </div>
                        </div>
                    </div>
                </div>
            </cell>
        </list>
    </div>
</template>
<script>
import header from '../header/header.vue'
import Util from '../../../common/utils/utils.js'
import api from '../../../common/api/api.js'
const modal = weex.requireModule('modal')
const storage = weex.requireModule('storage')
export default {
    data() {
        return {
            refreshing: false, //下拉刷新
            loadinging: false, //上拉加载
            panels: 1,
            autoPlay: true, //轮播图是否自动播放
            boolArr: [],
            homeArr: {},
            USERID: 'user_id',
            TOKEN: 'user_token',
            nav: {
                navWrapperList: []
            },
            service: {
                wechatImage: 'http://47.92.164.211:8011/PublicImage/wechatBg.png',
                wechat: 'http://47.92.164.211:8011/PublicImage/wechat.png',
                telImage: 'http://47.92.164.211:8011/PublicImage/phone.png',
                names: '绿白菜 • 滨湖春融苑店',
                linkr: '扫码添加微信实惠更多>',
                telName: '服务热线',
                telNum: '400-107-6027'
            },
        }
    },
    methods: {
        onrefresh() {
            this.refreshing = true;
            var _this = this;
            Util.WeexAjax({
                url: api.HOME_URL,
                method: 'GET',
                type: 'JSON',
                callback: function(ret) {
                    var rets = ret;
                    console.log(ret)
                    if (rets.Status == 1) {
                        _this.homeArr = ret.obj;
                        var TopCategoryList = _this.homeArr.TopCategoryList;
                        var index = 0,
                            fre = TopCategoryList.length / 10;
                        // 循环push 顶部推荐
                        for (var i = 0; i < fre; i++) {
                            // 十次一个循环
                            var arr = []
                            for (var j = 0; j < 10; j++) {
                                if(TopCategoryList[index]){
                                    arr.push(TopCategoryList[index])
                                }else{
                                    break;
                                }
                                index++;
                            }
                            _this.nav.navWrapperList.push(arr)
                            // console.log(_this.nav.navWrapperList)
                        }
                        // 给专区制作数组
                        for(var i = 0; i < _this.homeArr.RegionCategoryList.length; i++){
                            _this.boolArr[i] = true
                        }
                        _this.refreshing = false;
                        // console.log(_this.boolArr)
                    }else{
                        modal.toast({
                            message: '请求错误',
                            duration: 1
                        })
                    }
                }
            })
        },
        panel() {
            this.panels = (this.navWrapperList.length) / 10;
            // console.log(this.panels)
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
        jump1(urls) {
            var self = this;
            // Util.jump({
                // "phoneJump": function(){
                //     var bundleUrl = self.bundleUrl;
                //     weex.requireModule('navigator').push({
                //         url: Util.urlPort().urlAddPort + 'dist/' + urls.phone + '?' + urls.name + '=' + urls.ProductId,
                //         animated: "true"
                //     }, event => {})
                // },
                // "webJump": function(){
                    self.$router.push({
                        name: urls.web,
                        query: {
                            "CategoryId": urls.CategoryId,
                            "ProductId": urls.ProductId
                        }
                    })
                // }
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
    components: {
        'v-header': header
    },
    created() {
        var _this = this;
        Util.WeexAjax({
            url: api.HOME_URL,
            method: 'GET',
            type: 'JSON',
            callback: function(ret) {
                var rets = ret;
                console.log(ret)
                if (rets.Status == 1) {
                    _this.homeArr = ret.obj;
                    var TopCategoryList = _this.homeArr.TopCategoryList;
                    var index = 0,
                        fre = TopCategoryList.length / 10;
                    // 循环push 顶部推荐
                    for (var i = 0; i < fre; i++) {
                        // 十次一个循环
                        var arr = []
                        for (var j = 0; j < 10; j++) {
                        	if(TopCategoryList[index]){
                            	arr.push(TopCategoryList[index])
                        	}else{
                        		break;
                        	}
                            index++;
                        }
                        _this.nav.navWrapperList.push(arr)
                        // console.log(_this.nav.navWrapperList)
                    }
                    // 给专区制作数组
                    for(var i = 0; i < _this.homeArr.RegionCategoryList.length; i++){
                        _this.boolArr[i] = true
                    }
                    // console.log(_this.boolArr)
                }else{
                    modal.toast({
                        message: '请求错误',
                        duration: 1
                    })
                }
            }
        })
        storage.getItem(_this.USERID, event => {
            _this.USERID = event.data
            storage.getItem(_this.TOKEN, event => {
                _this.TOKEN = event.data
            })
        });
        // storage.setItem("user_id", '7', event => {
        //     console.log('set success')
        // })
        // storage.removeItem("user_id", event => {
        //     console.log('删除成功')
        // })
        // 初始化专区数组
        for(var i = 0; i < 5; i++){
            _this.boolArr.push(false)
        }
        // 打印搜索值
        // console.log(Util.analAjax().CategoryId)
    },
    filters: {
    	droller: function (msg) {
    		return msg.toFixed(2)
    	}
    }
}
</script>
<style scoped>
.home-wrapper {
    position: fixed;
    width: 750px;
    top: 90px;
    left: 0;
    right: 0;
    bottom: 110px;
}

.refresh{
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

.list-box {
    width: 710px;
    margin-top: 10px;
    margin-bottom: 10px;
    margin-left: 20px;
    margin-right: 20px;
}

.list-box-child {
    position: relative;
    width: 710px;
}

.banner-wrapper {
    margin-top: 20px;
    height: 300px;
    background-color: #eee;
    border-radius: 15px;
    box-shadow: 0px 2px 3px 2px #eee;
}

.banner-list {
    height: 300px;
}

._banner {
    width: 710px;
    height: 300px;
}

.indicator {
    position: absolute;
    width: 710px;
    height: 300px;
    top: 130px;
    left: 0px;
    item-color: rgb(255, 255, 255);
    item-selected-color: rgb(115, 204, 70);
    item-size: 20px;
}

.loading {
    width: 750px;
    height: 200px;
    display: -ms-flex;
    display: -webkit-flex;
    display: flex;
    -ms-flex-align: center;
    -webkit-align-items: center;
    -webkit-box-align: center;
    align-items: center;
}

.indicators {
    margin-top: 16px;
    height: 40px;
    width: 40px;
    color: #f40;
}

.fication-indicator {
    top: 165px;
    item-color: rgb(198, 194, 194);
    item-size: 15px;
}

.fication-wrapper {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: flex-start;
    height: 325px;
}

.fication-wrapper-list {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    flex-wrap: wrap;
}

.fication-wrapper-list-child {
    width: 142px;
    flex-direction: column;
    align-items: center;
}

.fication-name {
    margin-top: 10px;
    margin-bottom: 20px;
    font-size: 24px;
    color: #333333;
    text-align: center;
}

._fication {
    border-radius: 100px;
    width: 80px;
    height: 80px;
    box-shadow: 5px 2px 5px 2px #eee;
}

.wechat-wrapper {
    position: relative;
    height: 194px;
    padding-top: 7px;
    padding-bottom: 7px;
    padding-left: 10px;
    padding-right: 15px;
    border-radius: 10px;
    box-shadow: 0 0 5px 2px #eee;
}
.foots-image-three{
    margin-bottom: 10px;
}
._wechatImage {
    width: 685px;
    height: 180px;
}

.wechat {
    position: absolute;
    top: 70px;
    left: 88px;
    width: 50px;
    height: 50px;
}

.service-info {
    position: absolute;
    top: 45px;
    left: 210px;
}

.face-name {
    font-size: 26px;
    color: #333;
    font-weight: 700;
}

.face-linkr {
    font-size: 20px;
    color: #777;
    margin-top: 10px;
    text-decoration: underline;
}

.tel-wrapper {
    position: absolute;
    top: 60px;
    right: 32px;
    flex-direction: row;
}

._tel {
    width: 45px;
    height: 45px;
    margin-right: 5px;
}

.telName {
    font-size: 22px;
    color: #777777;
}

.telNum {
    margin-top: 5px;
    font-size: 24px;
    color: #333;
    font-weight: 900;
}

.food-box {
    height: 650px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

.foods-wrapper {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}

.foods-wrapper-list-two {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    justify-content: space-between;
}

.foods-image {
    width: 350px;
    height: 210px;
    border-radius: 20px;
}

.foods-image-one {
    width: 350px;
    height: 430px;
    border-radius: 20px;
}

.food-bg-image {
    width: 710px;
    height: 226px;
}

.foot-list-wrapper {
    margin-top: 0px;
    margin-bottom: 0px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    flex-wrap: wrap;
    align-content: center;
    align-content: space-between;
    background-color: #fbfbfb;
}

.foot-list {
    margin-top: 5px;
    margin-bottom: 5px;
    width: 350px;
    height: 550px;
    border-radius: 20px;
    box-shadow: 0 0 5px 2px #eee;
    background-color: #fff;
}

.image-box {
    width: 350px;
    height: 350px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
}

.food-image {
    width: 270px;
    height: 277px;
}

.food-shop-wrapper {
    padding-left: 20px;
    padding-right: 20px;
    width: 350px;
}

.food-name-wrapper {
    height: 90px;
}

.foot-shop-name {
    display: inline;
    font-size: 34px;
    font-weight: 500;
    color: #222222;
}

.foot-dollar-wrapper {
    display: flex;
    flex-direction: row;
}
.foot-wrapper{
    display: flex;
    flex-direction: column;
}
.foot-dollar {
    font-size: 34px;
    font-weight: 900;
    color: #ff0000;
}
.foot-more-money {
    margin-left: 2px;
    margin-top: 15px;
    font-size: 28px;
    color: #777777;
}

.foot-shop-car {
    position: absolute;
    width: 77px;
    height: 77px;
    top: 0;
    right: 0;
}
</style>