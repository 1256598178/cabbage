// { "framework": "Vue"} 

/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 109);
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
var Storage = __webpack_require__(2);
var stream = weex.requireModule('stream');
var navigator = weex.requireModule('navigator');
var modal = weex.requireModule('modal');
var AJAX_URL = 'http://47.92.164.211:8011/';
var utils = {
    // 发送请求
    WeexAjax: function WeexAjax(obj) {
        var me = this;
        var URL = obj.url;
        var Result = "loding...";
        if (obj.method == 'POST' || obj.method == 'GET') {
            weex.requireModule('stream').fetch({
                headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Authorization': 'Bearer ' + obj.token },
                method: obj.method,
                url: AJAX_URL + URL,
                type: obj.type,
                // body: 'MobilePhone='+this.loginValue.name
                // 拼接字符串
                body: me.toParams(obj.body)
            }, function (res) {
                if (!res.ok) {
                    me.Result = "request failed";
                    // me.loginTip = '请求错误,请重试!'
                } else {
                    // 返回相应内容
                    var rets = me.JsonFormat(res.data);
                    // console.log(rets.Status)
                    obj.callback(rets);
                }
            }, function (response) {});
        } else {
            console.log('请求方式错误');
        }
    },

    // body请求主体转换函数
    toParams: function toParams(obj) {
        var param = "";
        for (var name in obj) {
            if (typeof obj[name] != 'function') {
                param += "&" + name + "=" + encodeURI(obj[name]);
            }
        }
        return param.substring(1);
    },

    // 不同的设备json解析不同
    JsonFormat: function JsonFormat(msg) {
        var rest = {};
        if (this.device() == 0 || this.device() == 2) {
            rest = JSON.parse(msg);
        } else if (this.device() == 1) {
            rest = eval(msg);
        } else {
            rest = msg;
        }
        return rest;
    },

    // 页面跳转navigation
    jump: function jump(obj, event) {
        if (WXEnvironment.platform === 'Web') {
            obj.webJump();
        } else {
            obj.phoneJump();
        }
    },

    // 返回
    pops: function pops(obj, event) {
        if (WXEnvironment.platform === 'Web') {
            // console.warn('Web端跳转待开发')
            obj.webBack();
        } else {
            obj.phoneBack();
        }
    },

    // 判断当前处于哪个设备
    device: function device() {
        if (WXEnvironment.platform === 'android') {
            // console.log('Android')
            return 0;
        } else if (WXEnvironment.platform === 'iOS') {
            // console.log('iOS')
            return 1;
        } else {
            // console.log('Web')
            return 2;
        }
    },

    // 改变this指向问题
    bindThis: function bindThis(f, oTarget) {
        return function () {
            return f.apply(oTarget, arguments);
        };
    },
    analAjax: function analAjax(obj) {
        var warp = {};
        // if (WXEnvironment.platform === 'Web') {
        warp = obj.routerName();
        // } else {
        //     // var url = decodeURI(weex.config.bundleUrl); //取得整个地址栏
        //     var url = this.urlPort().url;
        //     console.log(url)
        //     var result = url.match(new RegExp(/\?\w*\=\w*(\&\w*\=\w*)*/, "g"))[0].slice(1);
        //     // console.log(result)
        //     var key = result.match(new RegExp(/\w*\=/, "g"));
        //     // console.log(key)
        //     var value = result.match(new RegExp(/\=\w*/, "g"));
        //     // console.log(value)
        //     for (var indexes in value) {
        //         key[indexes] = key[indexes].slice(0, key[indexes].length - 1)
        //         value[indexes] = value[indexes].slice(1)
        //         // console.log(value[indexes])
        //         warp[key[indexes]] = value[indexes]
        //     }
        // }
        console.log(warp);
        return warp;
    },

    // 判断没有userid和token就前往登录页
    goLogin: function goLogin(obj) {
        if (obj.USERID == 'user_id' || obj.USERID == 'null' || obj.USERID == 'undefined' || obj.TOKEN == 'user_token' || obj.TOKEN == 'null' || obj.TOKEN == 'undefined') {
            obj.fail();
            console.log('请先登录');
        } else {
            obj.success();
        }
    },

    // 获取url + ip
    urlPort: function urlPort() {
        var url = decodeURI(weex.config.bundleUrl); //取得整个地址栏
        // 获取ip+端口
        var result = url.match(new RegExp("[a-zA-z]+://[^\s]{19}", "g"));
        return {
            "url": url,
            "urlAddPort": result
        };
    }
};
exports.default = utils;

// //跳转延迟
// NavigatUrl(obj) {
//     const self = this;
//     weex.requireModule('modal').toast({
//         message: obj.message,
//         duration: obj.duration
//     })
//     setTimeout(function() {
//         self.bindThis(self.jump(obj.urls), obj._this)
//     }, obj.duration * 1000)
// },
// login () {
//   navigator.push({url:this.getJumpBaseUrl('login')})
// },
// getJumpBaseUrl(toUrl) {  
//  console.log(1)
//     var bundleUrl = weex.config.bundleUrl;  
//     bundleUrl = new String(bundleUrl);  
//     var nativeBase;  
//     var native;  
//     if (WXEnvironment.platform === 'Android') {
//      console.log('Android')  
//         nativeBase = 'file://assets/dist/';  
//         native = nativeBase + toUrl + ".js";  
//     } else if (WXEnvironment.platform === 'iOS') {  
//      console.log('iOS')  
//         nativeBase = bundleUrl.substring(0, bundleUrl.lastIndexOf('/') + 1);  
//         native = nativeBase + toUrl + ".js";  
//     } else {  
//      console.log('Web')  
//         var host = 'localhost:8082';  
//         var matches = /\/\/([^\/]+?)\//.exec(bundleUrl);  
//         if (matches && matches.length >= 2) {  
//             host = matches[1];  
//         }  

//         //此处需注意一下,tabbar 用的直接是jsbundle 的路径,但是navigator是直接跳转到新页面上的.  
//         if (typeof window === 'object') {  
//             nativeBase = 'http://' + host + '/';  
//             console.log(nativeBase+'---1')
//         } else {  
//             nativeBase = 'http://' + host + '/';  
//             console.log(nativeBase+'---2')
//         }  

//         native = nativeBase + toUrl + ".html";  
//         console.log(native+'---3')
//     }  
//     return native;  
// },
// 
// 
// 
// 
// 
// 
// 
// analAjax(obj) {
//     var warp = {};
//     if (WXEnvironment.platform === 'Web') {
//         warp = obj.routerName();
//     } else {
//         // var url = decodeURI(weex.config.bundleUrl); //取得整个地址栏
//         var url = this.urlPort().url;
//         console.log(url)
//         var result = url.match(new RegExp(/\?\w*\=\w*(\&\w*\=\w*)*/, "g"))[0].slice(1);
//         // console.log(result)
//         var key = result.match(new RegExp(/\w*\=/, "g"));
//         // console.log(key)
//         var value = result.match(new RegExp(/\=\w*/, "g"));
//         // console.log(value)
//         for (var indexes in value) {
//             key[indexes] = key[indexes].slice(0, key[indexes].length - 1)
//             value[indexes] = value[indexes].slice(1)
//             // console.log(value[indexes])
//             warp[key[indexes]] = value[indexes]
//         }
//     }
//     console.log(warp)
//     return warp
// },
// 
// 
// 
// 
// 
// 
// 
// 
//

/***/ }),

/***/ 1:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
var ajaxUrl = {
	// POST
	SHOPCAR_URL: "api/cart/addCart", //添加到购物车
	LOGIN_URL: "api/account/login", // 登录
	GETCODE_URL: "api/account/getsmscode", //获取短信验证码
	FINDPASSWORD_URL: "api/account/findpassword", //修改密码
	REGISTER_URL: "api/account/register", //注册
	MODIFYSHOPNUM_URL: "api/cart/changeCart", //修改购物车
	SUBMITORDER_URL: "api/cart/sumbitOrder", //  提交订单
	// GET
	HOME_URL: "api/basic/gethomepage", //获取首页
	SEAFOOD_URL: "api/product/getprodcutlistbypage?", //根据分类获取商品列表(分页)
	GETPRODCUTDETAIL_URL: "api/product/getprodcutdetail", //根据商品Id获取商品信息
	CLASS_URL: "api/product/getcagegorylist", //获取分类数据
	SELECT_URL: "api/product/getprodcutlist?categoryId=", //根据商品id获取商品
	SHOP_URL: "api/cart/getMyCartList?userId=", //获取购物车列表
	GETMYCARTCHOSTLIST_URL: "api/cart/getMyCartChoseList?UserId=", //获取选中的购物车列表
	DATEURLS: "api/cart/getPickingDateTime", //取货日期
	TIMEURLS: "api/cart/getPickingTime", //取货时间
	GETUSERINFO_URL: "api/account/getuserinfo", //获取我的信息


	// 字体图标
	iconUrl: "//at.alicdn.com/t/font_948634_j56el7oqed.ttf"
};

exports.default = ajaxUrl;

/***/ }),

/***/ 109:
/***/ (function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = []

/* styles */
__vue_styles__.push(__webpack_require__(110)
)

/* script */
__vue_exports__ = __webpack_require__(111)

/* template */
var __vue_template__ = __webpack_require__(112)
__vue_options__ = __vue_exports__ = __vue_exports__ || {}
if (
  typeof __vue_exports__.default === "object" ||
  typeof __vue_exports__.default === "function"
) {
if (Object.keys(__vue_exports__).some(function (key) { return key !== "default" && key !== "__esModule" })) {console.error("named exports are not supported in *.vue files.")}
__vue_options__ = __vue_exports__ = __vue_exports__.default
}
if (typeof __vue_options__ === "function") {
  __vue_options__ = __vue_options__.options
}
__vue_options__.__file = "F:\\WebApp\\cabbage\\src\\components\\main\\home\\home.vue"
__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
__vue_options__._scopeId = "data-v-3fb7a5a7"
__vue_options__.style = __vue_options__.style || {}
__vue_styles__.forEach(function (module) {
  for (var name in module) {
    __vue_options__.style[name] = module[name]
  }
})
if (typeof __register_static_styles__ === "function") {
  __register_static_styles__(__vue_options__._scopeId, __vue_styles__)
}

module.exports = __vue_exports__
module.exports.el = 'true'
new Vue(module.exports)


/***/ }),

/***/ 110:
/***/ (function(module, exports) {

module.exports = {
  "home-wrapper": {
    "position": "fixed",
    "width": "750",
    "top": "90",
    "left": 0,
    "right": 0,
    "bottom": "110"
  },
  "refresh": {
    "width": "750",
    "height": "50",
    "lineHeight": "50",
    "display": "flex",
    "MsFlexAlign": "center",
    "WebkitAlignItems": "center",
    "WebkitBoxAlign": "center",
    "alignItems": "center",
    "textAlign": "center"
  },
  "list-box": {
    "width": "710",
    "marginTop": "10",
    "marginBottom": "10",
    "marginLeft": "20",
    "marginRight": "20"
  },
  "list-box-child": {
    "position": "relative",
    "width": "710"
  },
  "banner-wrapper": {
    "marginTop": "20",
    "height": "300",
    "backgroundColor": "#eeeeee",
    "borderRadius": "15",
    "boxShadow": "0px 2px 3px 2px #eee"
  },
  "banner-list": {
    "height": "300"
  },
  "_banner": {
    "width": "710",
    "height": "300"
  },
  "indicator": {
    "position": "absolute",
    "width": "710",
    "height": "300",
    "top": "130",
    "left": "0",
    "itemColor": "rgb(255,255,255)",
    "itemSelectedColor": "rgb(115,204,70)",
    "itemSize": "20"
  },
  "loading": {
    "width": "750",
    "height": "200",
    "display": "flex",
    "MsFlexAlign": "center",
    "WebkitAlignItems": "center",
    "WebkitBoxAlign": "center",
    "alignItems": "center"
  },
  "indicators": {
    "marginTop": "16",
    "height": "40",
    "width": "40",
    "color": "#ff4400"
  },
  "fication-indicator": {
    "top": "165",
    "itemColor": "rgb(198,194,194)",
    "itemSize": "15"
  },
  "fication-wrapper": {
    "display": "flex",
    "flexDirection": "row",
    "justifyContent": "flex-start",
    "alignItems": "flex-start",
    "height": "325"
  },
  "fication-wrapper-list": {
    "display": "flex",
    "flexDirection": "row",
    "justifyContent": "flex-start",
    "alignItems": "center",
    "flexWrap": "wrap"
  },
  "fication-wrapper-list-child": {
    "width": "142"
  },
  "fication-name": {
    "marginTop": "10",
    "marginBottom": "20",
    "fontSize": "22",
    "color": "#333333",
    "textAlign": "center"
  },
  "_fication": {
    "borderRadius": "100",
    "marginLeft": "21",
    "width": "100",
    "height": "100",
    "boxShadow": "5px 2px 5px 2px #eee"
  },
  "wechat-wrapper": {
    "position": "relative",
    "height": "194",
    "paddingTop": "7",
    "paddingBottom": "7",
    "paddingLeft": "10",
    "paddingRight": "15",
    "borderRadius": "10",
    "boxShadow": "0 0 5px 2px #eee"
  },
  "_wechatImage": {
    "width": "685",
    "height": "180"
  },
  "wechat": {
    "position": "absolute",
    "top": "70",
    "left": "88",
    "width": "50",
    "height": "50"
  },
  "service-info": {
    "position": "absolute",
    "top": "55",
    "left": "210"
  },
  "face-name": {
    "fontSize": "22",
    "color": "#333333",
    "fontWeight": "700"
  },
  "face-linkr": {
    "fontSize": "14",
    "color": "#777777",
    "marginTop": "10",
    "textDecoration": "underline"
  },
  "tel-wrapper": {
    "position": "absolute",
    "top": "60",
    "right": "32",
    "flexDirection": "row"
  },
  "_tel": {
    "width": "43",
    "height": "43",
    "marginRight": "10"
  },
  "telName": {
    "fontSize": "14",
    "color": "#777777"
  },
  "telNum": {
    "marginTop": "9",
    "fontSize": "20",
    "color": "#333333",
    "fontWeight": "900"
  },
  "food-box": {
    "height": "650",
    "display": "flex",
    "flexDirection": "column",
    "justifyContent": "space-between"
  },
  "foods-wrapper": {
    "display": "flex",
    "flexDirection": "row",
    "justifyContent": "space-between"
  },
  "foods-wrapper-list-two": {
    "display": "flex",
    "flexDirection": "column",
    "flexWrap": "wrap",
    "justifyContent": "space-between"
  },
  "foods-image": {
    "width": "350",
    "height": "210",
    "borderRadius": "20"
  },
  "foods-image-one": {
    "height": "430"
  },
  "food-bg-image": {
    "width": "710",
    "height": "226"
  },
  "foot-list-wrapper": {
    "marginTop": "0",
    "marginBottom": "0",
    "display": "flex",
    "flexDirection": "row",
    "justifyContent": "space-between",
    "flexWrap": "wrap",
    "alignContent": "space-between",
    "backgroundColor": "#fbfbfb"
  },
  "foot-list": {
    "marginTop": "5",
    "marginBottom": "5",
    "width": "350",
    "height": "480",
    "borderRadius": "20",
    "boxShadow": "0 0 5px 2px #eee",
    "backgroundColor": "#ffffff"
  },
  "image-box": {
    "width": "350",
    "height": "350",
    "display": "flex",
    "flexDirection": "row",
    "justifyContent": "center",
    "alignItems": "center"
  },
  "food-image": {
    "width": "270",
    "height": "277"
  },
  "food-shop-wrapper": {
    "paddingLeft": "20",
    "paddingRight": "20",
    "width": "350",
    "height": "130"
  },
  "food-name-wrapper": {
    "marginBottom": "34"
  },
  "foot-shop-name": {
    "display": "inline",
    "fontSize": "30",
    "fontWeight": "500",
    "color": "#222222"
  },
  "foot-dollar-wrapper": {
    "position": "relative",
    "height": "96",
    "display": "flex",
    "flexDirection": "row"
  },
  "foot-dollar": {
    "fontSize": "30",
    "fontWeight": "600",
    "color": "#f26100"
  },
  "foot-more-money": {
    "marginLeft": "15",
    "marginTop": "7",
    "fontSize": "20",
    "color": "#777777"
  },
  "foot-shop-car": {
    "position": "absolute",
    "width": "44",
    "height": "44",
    "top": 0,
    "right": 0
  }
}

/***/ }),

/***/ 111:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _header = __webpack_require__(31);

var _header2 = _interopRequireDefault(_header);

var _utils = __webpack_require__(0);

var _utils2 = _interopRequireDefault(_utils);

var _api = __webpack_require__(1);

var _api2 = _interopRequireDefault(_api);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var modal = weex.requireModule('modal'); //
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

var storage = weex.requireModule('storage');
exports.default = {
    data: function data() {
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
                telNum: '400-1000-000'
            }
        };
    },

    methods: {
        onrefresh: function onrefresh() {
            this.refreshing = true;
            var _this = this;
            _utils2.default.WeexAjax({
                url: _api2.default.HOME_URL,
                method: 'GET',
                type: 'JSON',
                callback: function callback(ret) {
                    var rets = ret;
                    console.log(ret);
                    if (rets.Status == 1) {
                        _this.homeArr = ret.obj;
                        var TopCategoryList = _this.homeArr.TopCategoryList;
                        var index = 0,
                            fre = TopCategoryList.length / 10;
                        // 循环push 顶部推荐
                        for (var i = 0; i < fre; i++) {
                            // 十次一个循环
                            var arr = [];
                            for (var j = 0; j < 10; j++) {
                                if (TopCategoryList[index]) {
                                    arr.push(TopCategoryList[index]);
                                } else {
                                    break;
                                }
                                index++;
                            }
                            _this.nav.navWrapperList.push(arr);
                            // console.log(_this.nav.navWrapperList)
                        }
                        // 给专区制作数组
                        for (var i = 0; i < _this.homeArr.RegionCategoryList.length; i++) {
                            _this.boolArr[i] = true;
                        }
                        _this.refreshing = false;
                        // console.log(_this.boolArr)
                    } else {
                        modal.toast({
                            message: '请求错误',
                            duration: 1
                        });
                    }
                }
            });
        },
        panel: function panel() {
            this.panels = this.navWrapperList.length / 10;
            // console.log(this.panels)
        },
        jump: function jump(urls) {
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
            });
            //     }
            // })
        },
        jump1: function jump1(urls) {
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
            });
            // }
            // })
        },
        addShopCar: function addShopCar(Product_Id) {
            var self = this;
            _utils2.default.goLogin({
                "USERID": self.USERID,
                "TOKEN": self.TOKEN,
                "success": function success() {
                    _utils2.default.WeexAjax({
                        url: _api2.default.SHOPCAR_URL,
                        method: 'POST',
                        type: 'JSON',
                        token: self.TOKEN,
                        body: {
                            "UserId": self.USERID,
                            "ProductId": Product_Id,
                            "CartNum": 1
                        },
                        callback: function callback(ret) {
                            if (ret.Status == 1) {
                                modal.toast({
                                    message: ret.Message,
                                    duration: 1
                                });
                            } else {
                                modal.toast({
                                    message: '请求错误',
                                    duration: 1
                                });
                            }
                        }
                    });
                },
                "fail": function fail() {
                    // Util.jump({
                    //     "phoneJump": function(){
                    //         var bundleUrl = this.bundleUrl;
                    //         weex.requireModule('navigator').push({
                    //             url: Util.urlPort().urlAddPort + 'dist/' + "components/login/login.js",
                    //             animated: "true"
                    //         }, event => {})
                    //     },
                    //     "webJump": function(){
                    self.$router.push({ name: "login" });
                    //     }
                    // })
                }
            });
        }
    },
    components: {
        'v-header': _header2.default
    },
    created: function created() {
        var _this = this;
        _utils2.default.WeexAjax({
            url: _api2.default.HOME_URL,
            method: 'GET',
            type: 'JSON',
            callback: function callback(ret) {
                var rets = ret;
                console.log(ret);
                if (rets.Status == 1) {
                    _this.homeArr = ret.obj;
                    var TopCategoryList = _this.homeArr.TopCategoryList;
                    var index = 0,
                        fre = TopCategoryList.length / 10;
                    // 循环push 顶部推荐
                    for (var i = 0; i < fre; i++) {
                        // 十次一个循环
                        var arr = [];
                        for (var j = 0; j < 10; j++) {
                            if (TopCategoryList[index]) {
                                arr.push(TopCategoryList[index]);
                            } else {
                                break;
                            }
                            index++;
                        }
                        _this.nav.navWrapperList.push(arr);
                        // console.log(_this.nav.navWrapperList)
                    }
                    // 给专区制作数组
                    for (var i = 0; i < _this.homeArr.RegionCategoryList.length; i++) {
                        _this.boolArr[i] = true;
                    }
                    // console.log(_this.boolArr)
                } else {
                    modal.toast({
                        message: '请求错误',
                        duration: 1
                    });
                }
            }
        });
        storage.getItem(_this.USERID, function (event) {
            _this.USERID = event.data;
            storage.getItem(_this.TOKEN, function (event) {
                _this.TOKEN = event.data;
            });
        });
        // storage.setItem("user_id", '7', event => {
        //     console.log('set success')
        // })
        // storage.removeItem("user_id", event => {
        //     console.log('删除成功')
        // })
        // 初始化专区数组
        for (var i = 0; i < 5; i++) {
            _this.boolArr.push(false);
        }
        // 打印搜索值
        // console.log(Util.analAjax().CategoryId)
    },

    filters: {
        droller: function droller(msg) {
            return msg.toFixed(2);
        }
    }
};

/***/ }),

/***/ 112:
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: ["home"]
  }, [_c('v-header'), _c('list', {
    staticClass: ["home-wrapper"]
  }, [_c('refresh', {
    attrs: {
      "display": _vm.refreshing ? 'show' : 'hide'
    },
    on: {
      "refresh": _vm.onrefresh
    }
  }, [_c('text', {
    staticClass: ["refresh"]
  }, [_vm._v("下拉刷新...")])]), _c('cell', {
    appendAsTree: true,
    attrs: {
      "append": "tree"
    }
  }, [_c('slider', {
    staticClass: ["list-box", "banner-wrapper"],
    attrs: {
      "autoPlay": "autoPlay",
      "interval": "4000"
    }
  }, [_vm._l((_vm.homeArr.BannerList), function(banner) {
    return _c('div', {
      staticClass: ["banner-list", "list-box-child"]
    }, [_c('image', {
      staticClass: ["_banner"],
      attrs: {
        "src": banner.ImageUrl
      }
    })])
  }), _c('indicator', {
    staticClass: ["indicator"]
  })], 2)]), _c('cell', {
    appendAsTree: true,
    attrs: {
      "append": "tree"
    }
  }, [_c('slider', {
    staticClass: ["list-box", "fication-wrapper"]
  }, [_vm._l((_vm.nav.navWrapperList), function(item, cindex) {
    return _c('div', {
      key: cindex,
      staticClass: ["fication-wrapper-list", "list-box-child"]
    }, _vm._l((_vm.nav.navWrapperList[cindex]), function(list, index) {
      return _c('div', {
        key: index,
        staticClass: ["fication-wrapper-list-child"],
        on: {
          "click": function($event) {
            _vm.jump({
              'web': 'seafood',
              'CategoryId': list.CategoryId
            })
          }
        }
      }, [_c('image', {
        staticClass: ["_fication"],
        attrs: {
          "src": list.TopImageUrl
        }
      }), _c('text', {
        staticClass: ["fication-name"]
      }, [_vm._v(_vm._s(list.CategoryName))])])
    }))
  }), _c('indicator', {
    staticClass: ["indicator", "fication-indicator"]
  })], 2)]), _c('cell', {
    appendAsTree: true,
    attrs: {
      "append": "tree"
    }
  }, [_c('div', {
    staticClass: ["list-box", "wechat-wrapper"]
  }, [_c('image', {
    staticClass: ["_wechatImage"],
    attrs: {
      "src": _vm.service.wechatImage
    }
  }), _c('image', {
    staticClass: ["wechat"],
    attrs: {
      "src": _vm.service.wechat
    }
  }), _c('div', {
    staticClass: ["service-info"]
  }, [_c('text', {
    staticClass: ["face-name"]
  }, [_vm._v(_vm._s(_vm.service.names))]), _c('a', [_c('text', {
    staticClass: ["face-linkr"]
  }, [_vm._v(_vm._s(_vm.service.linkr))])])]), _c('div', {
    staticClass: ["tel-wrapper"]
  }, [_c('image', {
    staticClass: ["_tel"],
    attrs: {
      "src": _vm.service.telImage
    }
  }), _c('div', [_c('text', {
    staticClass: ["telName"]
  }, [_vm._v(_vm._s(_vm.service.telName))]), _c('text', {
    staticClass: ["telNum"]
  }, [_vm._v(_vm._s(_vm.service.telNum))])])])])]), _c('cell', {
    appendAsTree: true,
    attrs: {
      "append": "tree"
    }
  }, [_c('div', {
    staticClass: ["list-box", "food-box"]
  }, [_c('div', {
    staticClass: ["foods-wrapper"]
  }, [_c('div', {
    staticClass: ["foods-wrapper-list"]
  }, [(_vm.boolArr[0]) ? _c('image', {
    staticClass: ["foods-image", "foods-image-one"],
    attrs: {
      "src": _vm.homeArr.RegionCategoryList[0].RegionImageUrl
    },
    on: {
      "click": function($event) {
        _vm.jump({
          'web': 'seafood',
          'CategoryId': _vm.homeArr.RegionCategoryList[0].CategoryId
        })
      }
    }
  }) : _vm._e()]), _c('div', {
    staticClass: ["foods-wrapper-list", "foods-wrapper-list-two"]
  }, [(_vm.boolArr[1]) ? _c('image', {
    staticClass: ["foods-image"],
    attrs: {
      "src": _vm.homeArr.RegionCategoryList[1].RegionImageUrl
    },
    on: {
      "click": function($event) {
        _vm.jump({
          'web': 'seafood',
          'CategoryId': _vm.homeArr.RegionCategoryList[1].CategoryId
        })
      }
    }
  }) : _vm._e(), (_vm.boolArr[2]) ? _c('image', {
    staticClass: ["foods-image"],
    attrs: {
      "src": _vm.homeArr.RegionCategoryList[2].RegionImageUrl
    },
    on: {
      "click": function($event) {
        _vm.jump({
          'web': 'seafood',
          'CategoryId': _vm.homeArr.RegionCategoryList[2].CategoryId
        })
      }
    }
  }) : _vm._e()])]), _c('div', {
    staticClass: ["foods-wrapper"]
  }, [_c('div', {
    staticClass: ["foods-wrapper-list"]
  }, [(_vm.boolArr[3]) ? _c('image', {
    staticClass: ["foods-image"],
    attrs: {
      "src": _vm.homeArr.RegionCategoryList[3].RegionImageUrl
    },
    on: {
      "click": function($event) {
        _vm.jump({
          'web': 'seafood',
          'CategoryId': _vm.homeArr.RegionCategoryList[3].CategoryId
        })
      }
    }
  }) : _vm._e()]), _c('div', {
    staticClass: ["foods-wrapper-list"]
  }, [(_vm.boolArr[4]) ? _c('image', {
    staticClass: ["foods-image"],
    attrs: {
      "src": _vm.homeArr.RegionCategoryList[4].RegionImageUrl
    },
    on: {
      "click": function($event) {
        _vm.jump({
          'web': 'seafood',
          'CategoryId': _vm.homeArr.RegionCategoryList[4].CategoryId
        })
      }
    }
  }) : _vm._e()])])])]), _vm._l((_vm.homeArr.HotCategoryProdctListList), function(foodList, indexs) {
    return _c('cell', {
      key: indexs,
      appendAsTree: true,
      attrs: {
        "append": "tree"
      }
    }, [_c('div', {
      staticClass: ["list-box"]
    }, [_c('image', {
      staticClass: ["food-bg-image"],
      attrs: {
        "src": foodList.ImageUrl
      },
      on: {
        "click": function($event) {
          _vm.jump({
            'web': 'seafood',
            'CategoryId': foodList.CategoryId
          })
        }
      }
    })]), _c('div', {
      staticClass: ["list-box", "foot-list-wrapper"]
    }, _vm._l((_vm.homeArr.HotCategoryProdctListList[indexs].ProductsList), function(food) {
      return _c('div', {
        staticClass: ["foot-list"],
        on: {
          "click": function($event) {
            _vm.jump({
              'web': 'goodIn',
              'ProductId': food.ProductId
            })
          }
        }
      }, [_c('div', {
        staticClass: ["image-box"]
      }, [_c('image', {
        staticClass: ["food-image"],
        attrs: {
          "src": food.ImageUrl
        }
      })]), _c('div', {
        staticClass: ["food-shop-wrapper"]
      }, [_c('div', {
        staticClass: ["food-name-wrapper"]
      }, [_c('text', {
        staticClass: ["foot-shop-name"]
      }, [_vm._v(_vm._s(food.ProductName) + "  " + _vm._s(food.Weight))])]), _c('div', {
        staticClass: ["foot-dollar-wrapper"]
      }, [_c('text', {
        staticClass: ["foot-dollar"]
      }, [_vm._v("￥" + _vm._s(_vm._f("droller")(food.SalesPrice)))]), _c('text', {
        staticClass: ["foot-more-money"]
      }, [_vm._v("￥" + _vm._s(_vm._f("droller")(food.Price)))]), _c('image', {
        staticClass: ["foot-shop-car"],
        attrs: {
          "src": "http://47.92.164.211:8011/PublicImage/shop-car.png"
        },
        on: {
          "click": function($event) {
            _vm.addShopCar(food.ProductId)
          }
        }
      })])])])
    }))])
  })], 2)], 1)
},staticRenderFns: []}
module.exports.render._withStripped = true

/***/ }),

/***/ 14:
/***/ (function(module, exports) {

module.exports = {
  "header": {
    "height": "90",
    "paddingLeft": "20",
    "paddingRight": "20",
    "backgroundColor": "#73cc46",
    "display": "flex",
    "flexDirection": "row"
  },
  "address-wrapper": {
    "marginTop": "27.5",
    "flex": 1,
    "flexDirection": "row"
  },
  "address-name": {
    "fontSize": "26",
    "lineHeight": "35",
    "color": "#ffffff"
  },
  "search-wrapper": {
    "marginTop": "23.5",
    "width": "117",
    "flexDirection": "row"
  },
  "_logo": {
    "marginTop": "13.5",
    "width": "70",
    "height": "63",
    "marginRight": "30"
  },
  "_address": {
    "marginRight": "12",
    "width": "25",
    "height": "35"
  },
  "_arrow": {
    "marginTop": "13",
    "marginLeft": "11",
    "width": "14",
    "height": "9"
  },
  "_magnifier": {
    "width": "43",
    "height": "43",
    "marginRight": "32"
  },
  "_scan": {
    "width": "42",
    "height": "42"
  }
}

/***/ }),

/***/ 15:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _utils = __webpack_require__(0);

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  data: function data() {
    return {
      logo: "http://47.92.164.211:8011/PublicImage/logo_title.png", //logo图
      address: "http://47.92.164.211:8011/PublicImage/address.png", // 定位图标
      arrow: "http://47.92.164.211:8011/PublicImage/arrow.png",
      magnifier: "http://47.92.164.211:8011/PublicImage/search.png", // 放大镜图标
      scan: "http://47.92.164.211:8011/PublicImage/scan.png", // 扫一扫图标
      position: '合肥市滨湖春融苑店'
    };
  },

  methods: {}
}; //
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/***/ }),

/***/ 16:
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('header', {
    staticClass: ["header"],
    appendAsTree: true,
    attrs: {
      "append": "tree"
    }
  }, [_c('image', {
    staticClass: ["_logo"],
    attrs: {
      "src": _vm.logo
    }
  }), _c('div', {
    staticClass: ["address-wrapper"]
  }, [_c('image', {
    staticClass: ["_address"],
    attrs: {
      "src": _vm.address
    }
  }), _c('text', {
    staticClass: ["address-name"]
  }, [_vm._v(_vm._s(this.position))]), _c('image', {
    staticClass: ["_arrow"],
    attrs: {
      "src": _vm.arrow
    }
  })]), _c('div', {
    staticClass: ["search-wrapper"]
  }, [_c('div', {
    staticClass: ["magnifier"]
  }, [_c('image', {
    staticClass: ["_magnifier"],
    attrs: {
      "src": _vm.magnifier
    },
    on: {
      "click": function($event) {
        _vm.jump()
      }
    }
  })]), _c('div', {
    staticClass: ["scan"]
  }, [_c('image', {
    staticClass: ["_scan"],
    attrs: {
      "src": _vm.scan
    }
  })])])])
},staticRenderFns: []}
module.exports.render._withStripped = true

/***/ }),

/***/ 2:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
var Util = __webpack_require__(0);
var storage = weex.requireModule('storage');
var modal = weex.requireModule('modal');
var AIstorage = {
    // 存入到手机储存中
    setItems: function setItems(obj) {
        for (var item in obj) {
            storage.setItem(item, obj[item], function (event) {
                console.log('set success');
            });
        }
    },

    // 获取
    getItems: function getItems(obj) {
        var arr = '';
        storage.getItem(obj.value, function (event) {
            arr = event.data;
            obj.callback(arr);
        });
        return arr;
    },

    // getItems(obj) {
    //     let arr = {};
    //     for(var i = 0; i < arguments.length; i++){
    //         arr[arguments[i]] = storage.getItem(arguments[i], event => {
    //             arr[arguments[i]] = event.data;
    //             console.log(arr)
    //         })
    //     }
    //     return arr;
    // },
    // 移除
    removeItem: function removeItem(name) {
        var _this = this;

        storage.removeItem(name, function (event) {
            console.log('delete value:', event.data);
            _this.state = 'deleted';
        });
    },

    // 全部移除
    getAll: function getAll() {
        storage.getAllKeys(function (event) {
            // modal.toast({ message: event.result })
            if (event.result === 'success') {
                modal.toast({
                    message: 'props: ' + event.data.join(', ')
                });
            }
        });
    }
};
exports.default = AIstorage;

/***/ }),

/***/ 31:
/***/ (function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = []

/* styles */
__vue_styles__.push(__webpack_require__(14)
)

/* script */
__vue_exports__ = __webpack_require__(15)

/* template */
var __vue_template__ = __webpack_require__(16)
__vue_options__ = __vue_exports__ = __vue_exports__ || {}
if (
  typeof __vue_exports__.default === "object" ||
  typeof __vue_exports__.default === "function"
) {
if (Object.keys(__vue_exports__).some(function (key) { return key !== "default" && key !== "__esModule" })) {console.error("named exports are not supported in *.vue files.")}
__vue_options__ = __vue_exports__ = __vue_exports__.default
}
if (typeof __vue_options__ === "function") {
  __vue_options__ = __vue_options__.options
}
__vue_options__.__file = "F:\\WebApp\\cabbage\\src\\components\\main\\header\\header.vue"
__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
__vue_options__._scopeId = "data-v-7f046127"
__vue_options__.style = __vue_options__.style || {}
__vue_styles__.forEach(function (module) {
  for (var name in module) {
    __vue_options__.style[name] = module[name]
  }
})
if (typeof __register_static_styles__ === "function") {
  __register_static_styles__(__vue_options__._scopeId, __vue_styles__)
}

module.exports = __vue_exports__


/***/ })

/******/ });