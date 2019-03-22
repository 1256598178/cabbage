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
/******/ 	return __webpack_require__(__webpack_require__.s = 125);
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

/***/ 125:
/***/ (function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = []

/* styles */
__vue_styles__.push(__webpack_require__(126)
)

/* script */
__vue_exports__ = __webpack_require__(127)

/* template */
var __vue_template__ = __webpack_require__(128)
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
__vue_options__.__file = "F:\\WebApp\\cabbage\\src\\components\\main\\shop\\setlemet.vue"
__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
__vue_options__._scopeId = "data-v-0cd46c9c"
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

/***/ 126:
/***/ (function(module, exports) {

module.exports = {
  "iconFont": {
    "fontFamily": "iconfont"
  },
  "shop": {
    "position": "fixed",
    "width": "750",
    "top": 0,
    "bottom": "110",
    "backgroundColor": "#f5f5f5"
  },
  "shop-header-title-wrapper": {
    "position": "relative",
    "display": "flex",
    "flexDirection": "row",
    "justifyContent": "center",
    "alignItems": "center",
    "width": "750",
    "height": "92"
  },
  "shop-header-title": {
    "fontSize": "43",
    "color": "#ffffff"
  },
  "lemet-body": {
    "marginBottom": "10"
  },
  "lemet-address-wrapper": {
    "paddingTop": "25",
    "paddingLeft": "20",
    "paddingRight": "20",
    "paddingBottom": "30",
    "backgroundColor": "#ffffff"
  },
  "lemet-food-time": {
    "backgroundColor": "#ffffff"
  },
  "lemet-trade-wrapper": {
    "backgroundColor": "#ffffff"
  },
  "lemet-title-address": {
    "display": "flex",
    "flexDirection": "row",
    "justifyContent": "space-between",
    "alignItems": "center",
    "marginBottom": "20"
  },
  "lemet-food-time-list": {
    "display": "flex",
    "flexDirection": "row",
    "justifyContent": "space-between",
    "alignItems": "center",
    "paddingTop": "20",
    "paddingBottom": "20",
    "paddingLeft": "20",
    "paddingRight": "20",
    "borderBottomWidth": "1",
    "borderBottomStyle": "solid",
    "borderBottomColor": "#f4f4f4"
  },
  "lemet-title-address-left": {
    "display": "flex",
    "flexDirection": "row",
    "alignItems": "center"
  },
  "lemet-food-time-info": {
    "display": "flex",
    "flexDirection": "row",
    "alignItems": "center"
  },
  "lemet-trade-title-wrapper": {
    "display": "flex",
    "flexDirection": "row",
    "alignItems": "center",
    "paddingTop": "20",
    "paddingBottom": "20",
    "paddingLeft": "20",
    "paddingRight": "20",
    "borderBottomWidth": "1",
    "borderBottomStyle": "solid",
    "borderBottomColor": "#f4f4f4"
  },
  "pro-r": {
    "display": "flex",
    "flexDirection": "row",
    "alignItems": "center"
  },
  "lemet-title-address-right": {
    "width": "16",
    "height": "25"
  },
  "lemet-body-title-iconfont": {
    "fontSize": "40",
    "color": "#333333",
    "lineHeight": "48",
    "marginRight": "10"
  },
  "lemet-body-title-name": {
    "fontSize": "30",
    "color": "#333333",
    "lineHeight": "34"
  },
  "lemet-address-box-text": {
    "fontSize": "24",
    "color": "#777777",
    "lineHeight": "40"
  },
  "lemet-food-time-name": {
    "fontSize": "24",
    "color": "#333333",
    "lineHeight": "26"
  },
  "lemet-food-time-num": {
    "fontSize": "24",
    "color": "#777777",
    "lineHeight": "26"
  },
  "lemet-food-time-name-active": {
    "fontSize": "24",
    "color": "#ffa800",
    "lineHeight": "26"
  },
  "moreImage-14x9": {
    "width": "14",
    "height": "9",
    "marginLeft": "12"
  },
  "lemet-trade-title-line": {
    "marginRight": "15",
    "width": "10",
    "height": "50",
    "backgroundColor": "#73cc00",
    "borderRadius": "10"
  },
  "lemet-trade-title-name": {
    "fontSize": "30",
    "color": "#333333",
    "lineHeight": "34"
  },
  "cellps": {
    "display": "flex",
    "flexDirection": "row",
    "borderBottomWidth": "1",
    "borderBottomColor": "#d2d2d2",
    "borderBottomStyle": "solid",
    "paddingTop": "20",
    "paddingBottom": "20",
    "paddingRight": "20",
    "paddingLeft": "20"
  },
  "product-img": {
    "width": "200",
    "height": "200",
    "marginRight": "30"
  },
  "pro-news": {
    "marginTop": "20",
    "display": "flex",
    "flexDirection": "column",
    "justifyContent": "space-between",
    "flex": 1,
    "height": "140"
  },
  "product-title": {
    "marginRight": "20",
    "fontSize": "30",
    "color": "#333333",
    "textOverflow": "ellipsis",
    "lines": 1
  },
  "product-title-weight": {
    "marginRight": "20",
    "fontSize": "30",
    "color": "#333333",
    "textOverflow": "ellipsis",
    "lines": 1
  },
  "pro-m": {
    "height": "42",
    "display": "flex",
    "flexDirection": "row",
    "justifyContent": "space-between",
    "alignItems": "center"
  },
  "product-type-box": {
    "height": "36",
    "marginTop": "10"
  },
  "product-type": {
    "width": "80",
    "fontSize": "20",
    "lineHeight": "36",
    "color": "#ffffff",
    "textAlign": "center",
    "borderRadius": "5",
    "backgroundColor": "#cccccc"
  },
  "product-types": {
    "opacity": 0
  },
  "product-price": {
    "fontSize": "30",
    "fontWeight": "bold",
    "color": "#f26100",
    "marginRight": "10"
  },
  "product-prices": {
    "fontSize": "20",
    "color": "#777777"
  },
  "shop-car-icon": {
    "width": "42",
    "height": "42",
    "position": "absolute",
    "bottom": 0,
    "right": 0
  },
  "shop-wrapper": {
    "position": "fixed",
    "left": 0,
    "top": "92",
    "bottom": "130",
    "width": "750"
  },
  "good-bottom-wrapper": {
    "position": "fixed",
    "display": "flex",
    "flexDirection": "column",
    "bottom": "0",
    "height": "155",
    "width": "750"
  },
  "good-bottom-member-wrapper": {
    "display": "flex",
    "flexDirection": "row",
    "alignItems": "center",
    "paddingLeft": "20",
    "paddingRight": "20",
    "height": "60",
    "backgroundColor": "#ade564"
  },
  "good-bottom-list-wrapper": {
    "display": "flex",
    "flexDirection": "row",
    "alignItems": "center",
    "paddingLeft": "20",
    "paddingRight": "20",
    "justifyContent": "space-between",
    "height": "95",
    "backgroundColor": "#ffffff"
  },
  "member-image": {
    "marginRight": "10",
    "fontSize": "27",
    "color": "#ffffff"
  },
  "member-text": {
    "fontSize": "18",
    "color": "#ffffff"
  },
  "member-text-num": {
    "fontSize": "18",
    "color": "#73cc00"
  },
  "good-bottom-select-wrapper": {
    "display": "flex",
    "flexDirection": "row",
    "alignItems": "center"
  },
  "good-bottom-total-wrapper": {
    "display": "flex",
    "flexDirection": "row",
    "alignItems": "center"
  },
  "good-bottom-total-text": {
    "fontSize": "24",
    "color": "#777777"
  },
  "good-bottom-total-money": {
    "fontSize": "24",
    "color": "#f26100"
  },
  "good-bottom-total-button": {
    "display": "flex",
    "flexDirection": "row",
    "justifyContent": "center",
    "alignItems": "center",
    "marginLeft": "20",
    "width": "220",
    "height": "70",
    "borderRadius": "220",
    "backgroundColor": "#73cc00"
  },
  "good-bottom-total-button-text": {
    "fontSize": "30",
    "color": "#ffffff"
  }
}

/***/ }),

/***/ 127:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _orderHeader = __webpack_require__(44);

var _orderHeader2 = _interopRequireDefault(_orderHeader);

var _utils = __webpack_require__(0);

var _utils2 = _interopRequireDefault(_utils);

var _api = __webpack_require__(1);

var _api2 = _interopRequireDefault(_api);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import Storage from '../../common/utils/storage.js'
var storage = weex.requireModule('storage'); //
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
//
//
//
//
//
//
//
//

var modal = weex.requireModule('modal');
var stream = weex.requireModule('stream');
var picker = weex.requireModule('picker');
exports.default = {
	data: function data() {
		return {
			titleName: '订单结算',
			dates: '',
			lemet: {},
			datesList: [],
			PickingId: [],
			pickid: '',
			times: '请选择',
			timeList: [],
			numList: [],
			USERID: 'user_id',
			TOKEN: 'user_token'
		};
	},

	methods: {
		pickDate: function pickDate() {
			var _this = this;

			picker.pick({
				items: this.datesList
			}, function (event) {
				if (event.result === 'success') {
					_this.dates = _this.datesList[event.data];
					self.times = '请选择';
				}
			});
			var self = this;
			_utils2.default.WeexAjax({
				url: _api2.default.TIMEURLS + '?date=' + self.dates,
				method: 'GET',
				type: 'JSON',
				callback: function callback(ret) {
					// let rets = Util.JsonFormat(ret);
					if (ret.Status == 0) {} else if (ret.Status == 1) {
						console.log(ret);
						var arr = [];
						var num = [];
						for (var i = 0; i < ret.obj.length; i++) {
							arr.push(ret.obj[i].PickingTime);
							num.push(ret.obj[i].PickingNum);
						}
						self.timeList = arr;
						self.numList = num;
					}
				}
			});
			//self.times = self.timeList[0].PickingTime
		},
		pickTime: function pickTime() {
			var self = this;
			picker.pick({
				items: self.timeList
			}, function (event) {
				if (event.result === 'success') {
					if (self.numList[event.data] != 0) {
						self.times = self.timeList[event.data];
						self.pickid = self.PickingId[event.data];
					} else {
						modal.toast({
							message: '预约已满，请选择其他时间',
							duration: 0.3
						});
					}
				}
			});
		},
		analCartIds: function analCartIds() {
			// var url = decodeURI(weex.config.bundleUrl) + '?CartIds=279,280,281,282,283'; //取得整个地址栏
			var url = decodeURI(weex.config.bundleUrl); //取得整个地址栏
			console.log(url);
			var result = url.match(new RegExp(/\?\w*\=\w*(\&\w*\=\w*)*/, "g"))[0].slice(1);
			// console.log(result)
			var key = result.match(new RegExp(/\w*\=/, "g"));
			// console.log(key)
			var value = url.match(new RegExp(/\=(\w*\,*)*/, "g"));
			console.log(value);
			var warp = {};
			for (var indexes in value) {
				key[indexes] = key[indexes].slice(0, key[indexes].length - 1);
				value[indexes] = value[indexes].slice(1);
				// console.log(value[indexes])
				warp[key[indexes]] = value[indexes];
			}
			return warp;
		},

		// 提交订单
		submitBtn: function submitBtn() {
			var self = this;
			_utils2.default.WeexAjax({
				url: _api2.default.SUBMITORDER_URL,
				method: 'POST',
				type: 'JSON',
				token: self.TOKEN,
				body: {
					"UserId": self.USERID,
					"CartIds": _utils2.default.analAjax({ "routerName": function routerName() {
							return self.$route.query;
						} }).CartIds,
					"CouponId": 0,
					"ShopId": 1,
					"PickingDate": self.dates,
					// "PickingTimeId": self.pickid
					"PickingTimeId": '1'
				},
				callback: function callback(ret) {
					if (ret.Status == 1) {
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
						});
						// }
						// })
						// Util.NavigatUrl({
						//     message: ret.Message,
						//     duration: 1,
						//     urls: 'components/checkstand/checkstand.js?TotalPrice=' + self.lemet.TotalPrice,
						//     _this: self.$getConfig()
						// })
					} else {
						modal.toast({
							message: ret.Message,
							duration: 1
						});
					}
				}
			});
		}
	},
	created: function created() {
		var fontModule = weex.requireModule("dom");
		fontModule.addRule('fontFace', {
			'fontFamily': "iconfont",
			'src': "url(" + _api2.default.iconUrl + ")"
		});
		var self = this;

		// 获取选中的购物车
		storage.getItem(self.USERID, function (event) {
			self.USERID = event.data;
			storage.getItem(self.TOKEN, function (event) {
				self.TOKEN = event.data;
				_utils2.default.WeexAjax({
					url: _api2.default.GETMYCARTCHOSTLIST_URL + self.USERID + '&CartIds=' + _utils2.default.analAjax({ "routerName": function routerName() {
							return self.$route.query;
						} }).CartIds,
					method: 'GET',
					type: 'JSON',
					token: self.TOKEN,
					callback: function callback(ret) {
						if (ret.Status == 1) {
							self.lemet = ret.obj;
							console.log(self.lemet);
						} else {
							modal.toast({
								message: '请求错误',
								duration: 1
							});
						}
					}
				});
			});
		});
		// 获取日期请求
		_utils2.default.WeexAjax({
			url: _api2.default.DATEURLS,
			method: 'GET',
			type: 'JSON',
			callback: function callback(ret) {
				// let rets = Util.JsonFormat(ret);
				if (ret.Status == 0) {} else if (ret.Status == 1) {
					console.log(ret);
					var arr = [];
					self.dates = ret.obj.PickingDateList[0].PickingDateText;
					for (var i = 0; i < ret.obj.PickingDateList.length; i++) {
						arr.push(ret.obj.PickingDateList[i].PickingDateText);
					}
					self.datesList = arr;
				}
			}
		});
		// 获取时间请求
		_utils2.default.WeexAjax({
			url: _api2.default.TIMEURLS + '?date=' + self.dates,
			method: 'GET',
			type: 'JSON',
			callback: function callback(ret) {
				// let rets = Util.JsonFormat(ret);
				if (ret.Status == 0) {} else if (ret.Status == 1) {
					console.log(ret);
					var arr = [];
					var num = [];
					var Id = [];
					//self.dates = ret.obj.PickingDateList[0].PickingDateText
					for (var i = 0; i < ret.obj.length; i++) {
						arr.push(ret.obj[i].PickingTime);
						num.push(ret.obj[i].PickingNum);
						Id.push(ret.obj[i].PickingId);
					}
					self.timeList = arr;
					self.numList = num;
					self.PickingId = Id;
					console.log(self.PickingId);
					console.log(self.timeList);
					console.log(self.numList);
				}
			}
		});
	},

	components: {
		"v-header": _orderHeader2.default
	}
};

/***/ }),

/***/ 128:
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: ["shop"]
  }, [_c('header', {
    staticClass: ["shop-header"],
    appendAsTree: true,
    attrs: {
      "append": "tree"
    }
  }, [_c('v-header', {
    attrs: {
      "titleName": _vm.titleName,
      "backPage": true
    }
  })], 1), _c('list', {
    staticClass: ["shop-wrapper"]
  }, [_c('cell', {
    appendAsTree: true,
    attrs: {
      "append": "tree"
    }
  }, [_c('div', {
    staticClass: ["lemet-body", "lemet-address-wrapper"]
  }, [_vm._m(0), _c('div', {
    staticClass: ["lemet-address-box"]
  }, [_c('text', {
    staticClass: ["lemet-address-box-text"]
  }, [_vm._v("合肥市滨湖区南京路与天柱山路交口春融苑" + _vm._s(_vm.titleName))]), _c('text', {
    staticClass: ["lemet-address-box-text"]
  }, [_vm._v("联系电话：400 1234 4567")])])]), _c('div', {
    staticClass: ["lemet-body", "lemet-food-time"]
  }, [_c('div', {
    staticClass: ["lemet-food-time-list"],
    on: {
      "click": _vm.pickDate
    }
  }, [_c('text', {
    staticClass: ["lemet-food-time-name"]
  }, [_vm._v("预约取货日期")]), _c('div', {
    staticClass: ["lemet-food-time-info"]
  }, [_c('text', {
    staticClass: ["lemet-food-time-num", "lemet-food-time-name-active"]
  }, [_vm._v(_vm._s(_vm.dates))]), _c('image', {
    staticClass: ["moreImage-14x9"],
    attrs: {
      "src": "http://47.92.164.211:8011/PublicImage/moreImage@14x9.png"
    }
  })])]), _c('div', {
    staticClass: ["lemet-food-time-list"],
    on: {
      "click": _vm.pickTime
    }
  }, [_c('text', {
    staticClass: ["lemet-food-time-name"]
  }, [_vm._v("预约取货时间")]), _c('div', {
    staticClass: ["lemet-food-time-info"]
  }, [_c('text', {
    staticClass: ["lemet-food-time-num"]
  }, [_vm._v(_vm._s(_vm.times))]), _c('image', {
    staticClass: ["moreImage-14x9"],
    attrs: {
      "src": "http://47.92.164.211:8011/PublicImage/moreImage@14x9.png"
    }
  })])]), _vm._m(1), _vm._m(2)])]), _c('cell', {
    appendAsTree: true,
    attrs: {
      "append": "tree"
    }
  }, [_c('div', {
    staticClass: ["lemet-body", "lemet-trade-wrapper"]
  }, [_vm._m(3), _c('div', {
    staticClass: ["lemet-trade-foods-wrapper"]
  }, _vm._l((_vm.lemet.CartList), function(item, index) {
    return _c('div', {
      staticClass: ["cellps"]
    }, [_c('image', {
      staticClass: ["product-img"],
      attrs: {
        "src": item.ImageUrl
      }
    }), _c('div', {
      staticClass: ["pro-news"]
    }, [_c('div', {
      staticClass: ["pro-r"]
    }, [_c('text', {
      staticClass: ["product-title"]
    }, [_vm._v(_vm._s(item.ProductName))]), _c('text', {
      staticClass: ["product-title-weight"]
    }, [_vm._v(_vm._s(item.Weight))])]), _c('div', {
      staticClass: ["pro-m"]
    }, [_c('text', {
      staticClass: ["product-price"]
    }, [_vm._v("¥" + _vm._s(item.SalesPrice) + "元/" + _vm._s(item.Unit))]), _c('text', {
      staticClass: ["product-price-number"]
    }, [_vm._v("×" + _vm._s(item.CartNum))])])])])
  }))])])]), _c('div', {
    staticClass: ["good-bottom-wrapper"]
  }, [_c('div', {
    staticClass: ["good-bottom-member-wrapper"]
  }, [_c('text', {
    staticClass: ["iconFont", "member-image"]
  }, [_vm._v("")]), _c('text', {
    staticClass: ["member-text"]
  }, [_vm._v("升级会员，本单可为您节省")]), _c('text', {
    staticClass: ["member-text-num"]
  }, [_vm._v(_vm._s((_vm.lemet.TotalPrice - (_vm.lemet.Discount * _vm.lemet.TotalPrice)).toFixed(2)))]), _c('text', {
    staticClass: ["member-text"]
  }, [_vm._v("元!")])]), _c('div', {
    staticClass: ["good-bottom-list-wrapper"]
  }, [_c('div', {
    staticClass: ["good-bottom-select-wrapper"]
  }, [_c('text', {
    staticClass: ["good-bottom-total-text"]
  }, [_vm._v("预付款:")]), _c('text', {
    staticClass: ["good-bottom-total-money"]
  }, [_vm._v("￥" + _vm._s(_vm.lemet.TotalPrice) + "元")])]), _c('div', {
    staticClass: ["good-bottom-total-button"]
  }, [_c('text', {
    staticClass: ["good-bottom-total-button-text"],
    on: {
      "click": function($event) {
        _vm.submitBtn()
      }
    }
  }, [_vm._v("提交订单")])])])])])
},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: ["lemet-title-address"]
  }, [_c('div', {
    staticClass: ["lemet-title-address-left"]
  }, [_c('text', {
    staticClass: ["iconFont", "lemet-body-title-iconfont"]
  }, [_vm._v("")]), _c('text', {
    staticClass: ["lemet-body-title-name"]
  }, [_vm._v("绿白菜滨湖春融苑店")])]), _c('image', {
    staticClass: ["lemet-title-address-right"],
    attrs: {
      "src": "http://47.92.164.211:8011/PublicImage/moreImage@16x25.png"
    }
  })])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: ["lemet-food-time-list"]
  }, [_c('text', {
    staticClass: ["lemet-food-time-name"]
  }, [_vm._v("是否使用优惠券")]), _c('div', {
    staticClass: ["lemet-food-time-info"]
  }, [_c('text', {
    staticClass: ["lemet-food-time-num"]
  }, [_vm._v("请选择优惠券")]), _c('image', {
    staticClass: ["moreImage-14x9"],
    attrs: {
      "src": "http://47.92.164.211:8011/PublicImage/moreImage@14x9.png"
    }
  })])])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: ["lemet-food-time-list"]
  }, [_c('text', {
    staticClass: ["lemet-food-time-name"]
  }, [_vm._v("是否需要购物袋")]), _c('div', {
    staticClass: ["lemet-food-time-info"]
  }, [_c('text', {
    staticClass: ["lemet-food-time-num"]
  }, [_vm._v("否")]), _c('image', {
    staticClass: ["moreImage-14x9"],
    attrs: {
      "src": "http://47.92.164.211:8011/PublicImage/moreImage@14x9.png"
    }
  })])])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: ["lemet-trade-title-wrapper"]
  }, [_c('div', {
    staticClass: ["lemet-trade-title-line"]
  }), _c('text', {
    staticClass: ["lemet-trade-title-name"]
  }, [_vm._v("商品品名")])])
}]}
module.exports.render._withStripped = true

/***/ }),

/***/ 18:
/***/ (function(module, exports) {

module.exports = {
  "iconFont": {
    "fontFamily": "iconfont"
  },
  "backBtn": {
    "position": "absolute",
    "left": "20",
    "top": "25.5",
    "width": "28",
    "height": "41"
  },
  "shareBtn": {
    "position": "absolute",
    "top": "23",
    "right": "20",
    "width": "46",
    "height": "46"
  },
  "layoutBtn-44": {
    "position": "absolute",
    "top": "24",
    "right": "20",
    "width": "44",
    "height": "44"
  },
  "shop-header-title-wrapper": {
    "position": "relative",
    "display": "flex",
    "flexDirection": "row",
    "justifyContent": "center",
    "alignItems": "center",
    "height": "92",
    "paddingLeft": "20",
    "paddingRight": "20",
    "backgroundColor": "#73cc46"
  },
  "shop-header-title": {
    "width": "500",
    "fontSize": "42",
    "color": "#ffffff",
    "textAlign": "center",
    "textOverflow": "ellipsis",
    "lines": 1
  },
  "shop-header-delet": {
    "position": "absolute",
    "right": "20",
    "top": 0,
    "marginTop": "27",
    "fontSize": "34",
    "lineHeight": "38",
    "color": "#c1e6a3"
  },
  "shop-header-info": {
    "position": "absolute",
    "right": "20",
    "top": 0,
    "marginTop": "27",
    "fontSize": "34",
    "lineHeight": "38",
    "color": "#ffffff"
  }
}

/***/ }),

/***/ 19:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _utils = __webpack_require__(0);

var _utils2 = _interopRequireDefault(_utils);

var _api = __webpack_require__(1);

var _api2 = _interopRequireDefault(_api);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

var MODIFYSHOPNUM_URL = 'api/cart/changeCart';
var navigator = weex.requireModule('navigator');
var modal = weex.requireModule('modal');
exports.default = {
    props: {
        titleName: {
            type: String
        },
        deleted: {
            type: Boolean
        },
        backPage: {
            type: Boolean
        },
        shareBtn: {
            type: Boolean
        },
        layout: {
            type: Boolean
        },
        layoutAct: {
            type: Boolean
        },
        cancel: {
            type: Boolean
        },
        info: {
            type: Boolean
        }
    },
    data: function data() {
        return {
            layoutActBool: false,
            btnImage: {
                backImage: "http://47.92.164.211:8011/PublicImage/backImage.png",
                shareImage: "http://47.92.164.211:8011/PublicImage/share@46x46.png"
            },
            layoutImage: {
                urlImage: 'http://47.92.164.211:8011/PublicImage/layout@44x44.png',
                urlImageAct: 'http://47.92.164.211:8011/PublicImage/layoutACT@44x44.png'
            }
        };
    },

    methods: {
        pops: function pops() {
            var self = this;
            // Util.pops({
            //     "webBack": function(){
            self.$router.go(-1);
            //     },
            //     "phoneBack": function(){
            //         weex.requireModule('navigator').pop({
            //             animated: "true"
            //         }, event => {
            //         })
            //     }
            // })
        },
        layoutClick: function layoutClick() {
            this.$emit("layoutAct", this.layoutActBool = !this.layoutActBool);
        },
        deletFoods: function deletFoods() {
            this.$emit("fetch");
        }
    },
    created: function created() {
        var fontModule = weex.requireModule("dom");
        fontModule.addRule('fontFace', {
            'fontFamily': "iconfont",
            'src': "url('" + _api2.default.iconUrl + "')"
        });
    }
};

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

/***/ 20:
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: ["shop-header-title-wrapper"]
  }, [(_vm.backPage) ? _c('image', {
    staticClass: ["backBtn"],
    attrs: {
      "src": _vm.btnImage.backImage
    },
    on: {
      "click": function($event) {
        _vm.pops()
      }
    }
  }) : _vm._e(), _c('text', {
    staticClass: ["shop-header-title"]
  }, [_vm._v(_vm._s(_vm.titleName))]), (_vm.deleted) ? _c('text', {
    staticClass: ["shop-header-delet"],
    on: {
      "click": function($event) {
        _vm.deletFoods()
      }
    }
  }, [_vm._v("删除")]) : _vm._e(), (_vm.cancel) ? _c('text', {
    staticClass: ["shop-header-delet"],
    on: {
      "click": function($event) {
        _vm.cancel()
      }
    }
  }, [_vm._v("取消")]) : _vm._e(), (_vm.info) ? _c('text', {
    staticClass: ["shop-header-info"],
    on: {
      "click": function($event) {}
    }
  }, [_vm._v("使用说明")]) : _vm._e(), (_vm.shareBtn) ? _c('image', {
    staticClass: ["shareBtn"],
    attrs: {
      "src": _vm.btnImage.shareImage
    }
  }) : _vm._e(), (_vm.layout) ? _c('image', {
    staticClass: ["layoutBtn-44"],
    attrs: {
      "src": _vm.layoutAct == false ? _vm.layoutImage.urlImage : _vm.layoutImage.urlImageAct
    },
    on: {
      "click": function($event) {
        _vm.layoutClick()
      }
    }
  }) : _vm._e()])
},staticRenderFns: []}
module.exports.render._withStripped = true

/***/ }),

/***/ 44:
/***/ (function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = []

/* styles */
__vue_styles__.push(__webpack_require__(18)
)

/* script */
__vue_exports__ = __webpack_require__(19)

/* template */
var __vue_template__ = __webpack_require__(20)
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
__vue_options__.__file = "F:\\WebApp\\cabbage\\src\\components\\main\\header\\orderHeader.vue"
__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
__vue_options__._scopeId = "data-v-207a0751"
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