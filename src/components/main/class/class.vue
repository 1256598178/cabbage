<template>
    <div class="class">
        <sHeader></sHeader>
        <div class="class-box">
            <div class="left-box">
                <!-- 左侧导航 -->
                <list class="nav-list" show-scrollbar="false">
                    <cell class="cell" v-for="(num,index) in classArr" @click="select(index,num.CategoryId)" :key="index">
                        <div :class="[navIndex === index ? 'panel-crt' : 'panel']">
                            <text :class="[navIndex === index ? 'text-crt' : 'text']">{{num.CategoryName}}</text><!-- CategoryName -->
                        </div>
                    </cell>
                </list>
            </div>
            <div class="right-box">
                <div class="sec-nav">
                    <!-- 右侧头部导航 -->
                    <scroller class="sec-nav-list" show-scrollbar="false" scroll-direction="horizontal">
                        <div class="cells" v-for="(nums,indexs) in classsubArr" @click="selects(indexs)" :key="indexs">
                            <text :class="[navIndexs === indexs ? 'texts-crt' : 'texts']">{{nums.CategoryName}}</text>
                        </div>
                    </scroller>
                    <div class="slideShow">
                        <text class="iconFont slideShow-icon" @click="openCover" ref="slideBtn">&#xe731;</text>
                    </div>
                </div>
                <div class="product-box">
                    <!-- 右侧下面内容 -->
                    <scroller class="product-list">
                        <div class="cellp" v-for="(parent,index) in classsubArr" :key="index" ref="item">
                            <text class="nav-title">{{parent.CategoryName}}</text>
                            <list>
                                <cell class="cellps" v-for="(child,cindex) in classsubArr[index].product" @click="jump({'web':'goodIn','ProductId': child.ProductId})" :key="cindex">
                                    <image class="product-img" :src="child.ImageUrl"></image>
                                    <div class="pro-news">
                                        <text class="product-title">{{child.ProductName}}</text>
                                        <div class="product-type-box"><text :class="[child.sellOut === true ? 'product-type' : 'product-types']">已售完</text></div>
                                        <div class="pro-m">
                                            <text class="product-price">￥{{child.SalesPrice}}元/{{child.Unit}}</text>
                                            <text class="product-prices">￥{{child.Price}}元</text>
                                            <image class="shop-car-icon" src="http://47.92.164.211:8011/PublicImage/shop-car-icon.png" @click="addShopCar(child.ProductId)"></image>
                                        </div>
                                    </div>
                                </cell>
                            </list>
                        </div>
                    </scroller>
                    <!--<div class="nav-head"><text class="nav-title">火锅类</text></div>-->
                </div>
            </div>
        </div>
        <div ref="slides" class="cover" @click="closeCover">
            <div class="demo-content">
                <div class="slide-list">
                    <div class="cells slide-list-cell" v-for="(nums,indexs) in classsubArr" @click="selects(indexs)" :key="indexs">
                        <text :class="[navIndexs === indexs ? 'texts-crt' : 'texts']">{{nums.CategoryName}}</text>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import Util from '../../../common/utils/utils.js'
import api from '../../../common/api/api.js'
//1.先使用import导入你要在该组件中使用的子组件
import sHeader from '../header/header.vue'
import { WxcPopup } from 'weex-ui'
const dom = weex.requireModule('dom')
const storage = weex.requireModule('storage')
const animation = weex.requireModule('animation')
const modal = weex.requireModule('modal')
export default {
    data() {
        return {
            list: [{
                title: '速食',
                id: 1,
                urls: "../src/json/sushi.json"
            }, {
                title: '冲调类',
                id: 2,
                urls: "../src/json/chongtiao.json"
            }, {
                title: '熟食',
                id: 3,
                urls: "../src/json/shushi.json"
            }],
            pList: [],
            //分类数组
            classArr: {},
            classsubArr: [],
            navIndex: 0,
            navIndexs: 0,
            bool: true,
            USERID: 'user_id',
            TOKEN: 'user_token',
        }
    },
    //2.然后,在components中写入子组件
    components: { sHeader, WxcPopup },
    methods: {
        select(index, categoryId) {
            var self = this;
            self.navIndex = index;
            // console.log(categoryId)
            // console.log(self.classArr[index].CategoryList)
            // 获取二级分类
            // self.classsubArr = self.classArr[index].CategoryList
            // 获取产品列表
            Util.WeexAjax({
                url: api.SELECT_URL + categoryId,
                method: 'GET',
                type: 'JSON',
                callback: function(ret) {
                    if (ret.Status == 1) {
                        var rets = ret.obj;
                        var map = {},
                            dest = [];
                        for (var i = 0; i < rets.length; i++) {
                            if (!map[rets[i].ChildId]) {
                                dest.push({
                                    ChildId: rets[i].ChildId,
                                    data: [rets[i]]
                                })
                                map[rets[i].ChildId] = rets[i]
                            } else {
                                for (var j = 0; j < dest.length; j++) {
                                    if (dest[j].ChildId == rets[i].ChildId) {
                                        dest[j].data.push(rets[i])
                                    }
                                }
                            }
                        }
                        // console.log(dest);
                        for (var i = 0; i < self.classArr[self.navIndex].CategoryList.length; i++) {
                            var aa = self.classArr[self.navIndex].CategoryList[i]
                            for (var j = 0; j < dest.length; j++) {
                                var bb = dest[j].ChildId;
                                if (aa.CategoryId == bb) {
                                    // console.log(bb.data)
                                    aa.product = dest[j].data
                                }
                            }
                        }
                        self.classsubArr = self.classArr[self.navIndex].CategoryList
                        console.log(self.classsubArr)
                    }
                }
            })

        },
        selects(indexs) {
            console.log(indexs);
            var testEl = this.$refs.slides;
            var testEt = this.$refs.slideBtn;
            this.navIndexs = indexs;
            const el = this.$refs.item[indexs];
            console.log(this.$refs.item[indexs].clientHeight);
            dom.scrollToElement(el, {});
            animation.transition(testEl, {
                styles: {
                    transform: 'translateX(0)',
                },
                duration: 500, //ms
                timingFunction: 'ease',
                delay: 0 //ms
            });
            animation.transition(testEt, {
                styles: {
                    transform: 'rotateX(0deg)',
                },
                duration: 500, //ms
                timingFunction: 'ease',
                delay: 0 //ms
            });
            this.bool = true;
        },
        openCover() {
            var testEl = this.$refs.slides;
            var testEt = this.$refs.slideBtn;
            if (this.bool) {
                animation.transition(testEl, {
                    styles: {
                        transform: 'translateX(-600px)',
                    },
                    duration: 500, //ms
                    timingFunction: 'ease',
                    delay: 0 //ms
                });
                animation.transition(testEt, {
                    styles: {
                        transform: 'rotateX(180deg)',
                    },
                    duration: 500, //ms
                    timingFunction: 'ease',
                    delay: 0 //ms
                });
                this.bool = false;
            } else {
                animation.transition(testEl, {
                    styles: {
                        transform: 'translateX(0)',
                    },
                    duration: 500, //ms
                    timingFunction: 'ease',
                    delay: 0 //ms
                });
                animation.transition(testEt, {
                    styles: {
                        transform: 'rotateX(0deg)',
                    },
                    duration: 500, //ms
                    timingFunction: 'ease',
                    delay: 0 //ms
                });
                this.bool = true;
            }
        },
        //非状态组件，需要在这里关闭
        closeCover() {
            var testEl = this.$refs.slides;
            var testEt = this.$refs.slideBtn;
            animation.transition(testEl, {
                styles: {
                    transform: 'translateX(0)',
                },
                duration: 500, //ms
                timingFunction: 'ease',
                delay: 0 //ms
            });
            animation.transition(testEt, {
                styles: {
                    transform: 'rotateX(0deg)',
                },
                duration: 500, //ms
                timingFunction: 'ease',
                delay: 0 //ms
            });
            this.bool = true;
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
                        // }
                    // })
                }
            })
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
                            "ProductId": urls.ProductId
                        }
                    })
            //     }
            // })
        }
    },
    created() {
        var _this = this;
        // 获取右侧列表信息和左侧副标题
        Util.WeexAjax({
            url: api.CLASS_URL,
            method: 'GET',
            type: 'JSON',
            callback: function(ret) {
                if (ret.Status == 1) {
                    _this.classArr = ret.obj;
                    Util.WeexAjax({
                        url: api.SELECT_URL + _this.classArr[0].CategoryId,
                        method: 'GET',
                        type: 'JSON',
                        callback: function(ret) {
                            if (ret.Status == 1) {
                                var rets = ret.obj;
                                var map = {},
                                    dest = [];
                                for (var i = 0; i < rets.length; i++) {
                                    if (!map[rets[i].ChildId]) {
                                        dest.push({
                                            ChildId: rets[i].ChildId,
                                            data: [rets[i]]
                                        })
                                        map[rets[i].ChildId] = rets[i]
                                    } else {
                                        for (var j = 0; j < dest.length; j++) {
                                            if (dest[j].ChildId == rets[i].ChildId) {
                                                dest[j].data.push(rets[i])
                                            }
                                        }
                                    }
                                }
                                // console.log(dest);
                                for (var i = 0; i < _this.classArr[0].CategoryList.length; i++) {
                                    var aa = _this.classArr[0].CategoryList[i]
                                    for (var j = 0; j < dest.length; j++) {
                                        var bb = dest[j].ChildId;
                                        if (aa.CategoryId == bb) {
                                            // console.log(bb.data)
                                            aa.product = dest[j].data
                                        }
                                    }
                                }
                                _this.classsubArr = _this.classArr[0].CategoryList
                                // console.log(_this.classsubArr)
                            }
                        }
                    })
                }
            }
        })
        var fontModule = weex.requireModule("dom");
        fontModule.addRule('fontFace', {
            'fontFamily': "iconfont",
            'src': "url('" + api.iconUrl + "')"
        })
        storage.getItem(_this.USERID, event => {
            _this.USERID = event.data
            storage.getItem(_this.TOKEN, event => {
                _this.TOKEN = event.data
                
            })
        });
    }
}
</script>
<style lang="stylus" scoped>
.left-nav {
    width: 150px;
}

.nav-list {
    width: 150px;
    position: fixed;
    top: 90px;
    left: 0;
    bottom: 110px;
    background-color: rgba(246, 246, 246, 1);
}

.panel {
    height: 88px;
    padding-top: 16px;
    padding-bottom: 16px;
}

.panel-crt {
    height: 88px;
    padding-top: 16px;
    padding-bottom: 16px;
    background-color: #fff;
}

.text {
    font-size: 24px;
    line-height: 56px;
    text-align: center;
    color: #333;
    border-left-width: 8px;
    border-left-style: solid;
    border-left-color: rgba(115, 204, 0, 0);
}

.text-crt {
    font-size: 24px;
    line-height: 56px;
    text-align: center;
    color: #41B883;
    border-left-width: 8px;
    border-left-style: solid;
    border-left-color: rgba(115, 204, 0, 1);
}

.right-box {
    width: 580px;
    position: fixed;
    top: 90px;
    bottom: 110px;
    right: 0;
}

.iconFont {
    font-family: iconfont;
}

.sec-nav {
    flex-direction: row;
}

.sec-nav-list {
    flex: 1;
    flex-direction: row;
    height: 88px;
    padding-top: 24px;
    border-bottom-width: 1px;
    border-bottom-color: #d2d2d2;
    border-bottom-style: solid;
    margin-right: 20px;
}

.slideShow {
    width: 80px;
    height: 88px;
    position: absolute;
    top: 0;
    right: 0;
}

.slideShow-icon {
    font-size: 50px;
    color: #999;
    line-height: 88px;
    text-align: center;
}

.cover {
    width: 600px;
    position: fixed;
    top: 177px;
    bottom: 110px;
    right: -600px;
    background-color: rgba(0, 0, 0, 0.5);
    transition: all .5s ease;
    overflow: hidden;
}

.demo-content {
    background-color: #fff;
}

.cells {
    width: auto;
    height: 40px;
    padding-left: 20px;
    padding-right: 20px;
    border-width: 1px;
    border-color: #d2d2d2;
    border-style: solid;
    margin-left: 15px;
    border-radius: 40px;
}

.slide-list {
    flex-direction: row;
    padding-top: 10px;
    padding-bottom: 10px;
}

.slide-list-cell {
    width: 173px;
    margin-left: 20px;
    margin-top: 10px;
    margin-bottom: 10px;
}

.texts {
    font-size: 22px;
    line-height: 38px;
    text-align: center;
}

.texts-crt {
    font-size: 22px;
    line-height: 38px;
    color: #41B883;
    text-align: center;
}

.product-box {
    width: 580px;
    position: fixed;
    top: 178px;
    bottom: 110px;
    right: 0;
}

.nav-head {
    width: 580px;
    position: absolute;
    top: 0;
    left: 0;
    background-color: #fff;
    padding-right: 20px;
}

.nav-title {
    width: 560px;
    padding-top: 15px;
    padding-bottom: 15px;
    font-size: 22px;
    border-bottom-width: 1px;
    border-bottom-color: #d2d2d2;
    border-bottom-style: solid;
}

.cellps {
    flex-direction: row;
    border-bottom-width: 1px;
    border-bottom-color: #d2d2d2;
    border-bottom-style: solid;
    padding-top: 30px;
    padding-bottom: 30px;
    margin-right: 20px;
}

.product-img {
    width: 200px;
    height: 200px;
    margin-right: 30px;
}

.pro-news {
    flex: 1;
}

.product-title {
    font-size: 30px;
    color: #333;
    margin-top: 20px;
    text-overflow: ellipsis;
    lines: 1;
}

.product-type-box {
    height: 36px;
    margin-top: 10px;
}

.product-type {
    width: 80px;
    font-size: 20px;
    line-height: 36px;
    color: #fff;
    text-align: center;
    border-radius: 5px;
    background-color: #ccc;
}

.product-types {
    opacity: 0;
}

.pro-m {
    height: 42px;
    flex-direction: row;
    align-items: flex-end;
}

.product-price {
    font-size: 30px;
    font-weight: bold;
    color: #f26100;
    margin-right: 10px;
}

.product-prices {
    font-size: 20px;
    color: #777;
}

.shop-car-icon {
    width: 42px;
    height: 42px;
    position: absolute;
    bottom: 0;
    right: 0;
}
</style>