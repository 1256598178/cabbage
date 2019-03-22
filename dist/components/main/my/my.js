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
/******/ 	return __webpack_require__(__webpack_require__.s = 117);
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

/***/ 117:
/***/ (function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = []

/* styles */
__vue_styles__.push(__webpack_require__(118)
)

/* script */
__vue_exports__ = __webpack_require__(119)

/* template */
var __vue_template__ = __webpack_require__(120)
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
__vue_options__.__file = "F:\\WebApp\\cabbage\\src\\components\\main\\my\\my.vue"
__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
__vue_options__._scopeId = "data-v-7577fb47"
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

/***/ 118:
/***/ (function(module, exports) {

module.exports = {
  "iconFont": {
    "fontFamily": "iconfont"
  },
  "my": {
    "position": "fixed",
    "width": "750",
    "top": 0,
    "bottom": "110",
    "backgroundColor": "#f5f5f5"
  },
  "cell-box": {
    "marginLeft": "20",
    "marginRight": "20",
    "width": "710",
    "marginTop": "10",
    "marginBottom": "10"
  },
  "my-header-title-wrapper": {
    "position": "relative",
    "width": "750",
    "height": "92",
    "paddingLeft": "20",
    "paddingRight": "20",
    "display": "flex",
    "flexDirection": "row",
    "justifyContent": "center",
    "alignItems": "center",
    "backgroundColor": "#73cc46"
  },
  "my-header-info-wrapper": {
    "position": "absolute",
    "width": "48",
    "height": "45",
    "display": "flex",
    "flexDirection": "row",
    "justifyContent": "flex-start",
    "alignItems": "flex-end",
    "right": "20",
    "top": 0,
    "marginTop": "23.5",
    "fontSize": "34",
    "lineHeight": "36",
    "color": "#c1e6a3"
  },
  "my-header": {
    "width": "750",
    "height": "148",
    "backgroundColor": "#73cc46",
    "borderBottomLeftRadius": "70",
    "borderBottomRightRadius": "70"
  },
  "my-header-title": {
    "fontSize": "43",
    "color": "#ffffff",
    "lineHeight": "45"
  },
  "my-header-info": {
    "width": "42",
    "height": "34"
  },
  "info-number": {
    "position": "absolute",
    "top": "0",
    "right": "-2",
    "width": "22",
    "height": "22",
    "backgroundColor": "#ffffff",
    "fontSize": "14",
    "color": "#73cc00",
    "borderRadius": 50,
    "textAlign": "center",
    "lineHeight": "22"
  },
  "my-info-wrapper": {
    "display": "flex",
    "flexDirection": "row",
    "justifyContent": "space-between",
    "alignItems": "center",
    "height": "147",
    "width": "710",
    "marginLeft": "20",
    "marginRight": "20"
  },
  "my-info-wrapper-left": {
    "display": "flex",
    "flexDirection": "row"
  },
  "my-info-logo-wrapper": {
    "display": "flex",
    "flexDirection": "row",
    "justifyContent": "center",
    "alignItems": "flex-end",
    "marginRight": "10",
    "paddingBottom": "5",
    "paddingTop": "5",
    "paddingLeft": "5",
    "paddingRight": "5",
    "width": "100",
    "height": "100",
    "borderRadius": 50,
    "backgroundColor": "#d9f2aa"
  },
  "my-info-logo": {
    "width": "60",
    "height": "85"
  },
  "my-info-sign-wrapper": {
    "display": "flex",
    "flexDirection": "column"
  },
  "my-info-sign-time": {
    "fontSize": "36",
    "lineHeight": "40",
    "color": "#ffffff"
  },
  "my-info-sign-box": {
    "display": "flex",
    "flexDirection": "row",
    "justifyContent": "center",
    "alignItems": "center",
    "marginTop": "15",
    "width": "100",
    "height": "40",
    "borderRadius": "40",
    "backgroundColor": "#ffa200"
  },
  "my-info-sign-text": {
    "fontSize": "20",
    "lineHeight": "22",
    "color": "#ffffff"
  },
  "mylogin": {
    "height": "100",
    "lineHeight": "100",
    "fontSize": "36",
    "color": "#ffffff"
  },
  "my-info-sign-iconfont": {
    "width": "20",
    "height": "20",
    "marginRight": "10"
  },
  "my-info-colum-wrapper": {
    "display": "flex",
    "flexDirection": "row"
  },
  "my-info-colum-list": {
    "display": "flex",
    "flexDirection": "row",
    "alignItems": "center"
  },
  "my-info-colum-list-left": {
    "display": "flex",
    "flexDirection": "column",
    "justifyContent": "center",
    "alignItems": "center"
  },
  "my-info-colum-text": {
    "lineHeight": "24",
    "fontSize": "22",
    "color": "#ffffff"
  },
  "my-info-colum-num": {
    "lineHeight": "24",
    "fontSize": "22",
    "color": "#ffffff",
    "marginTop": "8"
  },
  "my-info-colum-line": {
    "marginLeft": "20",
    "marginRight": "20",
    "width": "1",
    "height": "30",
    "backgroundColor": "#ffffff"
  },
  "my-member-area": {
    "display": "flex",
    "flexDirection": "column",
    "top": "-15",
    "width": "710",
    "paddingTop": "20",
    "paddingLeft": "20",
    "paddingRight": "20",
    "marginLeft": "20",
    "marginRight": "20",
    "borderRadius": "15",
    "backgroundColor": "#ffffff"
  },
  "my-member-area-title": {
    "display": "flex",
    "flexDirection": "row",
    "justifyContent": "space-between",
    "alignItems": "center",
    "width": "670",
    "height": "40",
    "marginBottom": "20"
  },
  "my-member-area-title-left": {
    "display": "flex",
    "flexDirection": "row",
    "alignItems": "center"
  },
  "member-iconfont": {
    "width": "35",
    "height": "29",
    "marginRight": "15"
  },
  "my-member-area-title-left-text": {
    "fontSize": "24",
    "lineHeight": "26",
    "color": "#333333"
  },
  "my-member-area-title-right": {
    "width": "110",
    "height": "40",
    "borderRadius": "40",
    "backgroundColor": "#ff8a6f"
  },
  "my-member-area-title-right-text": {
    "textAlign": "center",
    "fontSize": "20",
    "lineHeight": "40",
    "color": "#ffffff"
  },
  "my-member-area-body": {
    "display": "flex",
    "flexDirection": "row",
    "flexWrap": "wrap",
    "justifyContent": "flex-start",
    "alignContent": "space-between",
    "marginLeft": "20"
  },
  "my-member-area-body-list": {
    "display": "flex",
    "flexDirection": "row",
    "alignItems": "center",
    "minWidth": "108",
    "marginRight": "40",
    "marginBottom": "20"
  },
  "my-member-area-body-list-image": {
    "width": "22",
    "height": "22"
  },
  "my-member-area-body-list-text": {
    "fontSize": "20",
    "color": "#ff9000",
    "paddingLeft": "5"
  },
  "my-order-wrapper": {
    "marginTop": 0,
    "display": "flex",
    "flexDirection": "column",
    "paddingTop": "20",
    "paddingLeft": "20",
    "paddingRight": "20",
    "backgroundColor": "#ffffff",
    "borderRadius": "15"
  },
  "my-tool-wrapper": {
    "marginTop": "10",
    "display": "flex",
    "flexDirection": "column",
    "paddingTop": "20",
    "paddingLeft": "20",
    "paddingRight": "20",
    "backgroundColor": "#ffffff",
    "borderRadius": "15"
  },
  "my-order-title": {
    "display": "flex",
    "flexDirection": "row",
    "justifyContent": "space-between",
    "alignItems": "center",
    "marginBottom": "25"
  },
  "my-order-title-text": {
    "color": "#333333",
    "fontSize": "30",
    "lineHeight": "32"
  },
  "my-all-order-title": {
    "color": "#333333",
    "fontSize": "20",
    "lineHeight": "22",
    "display": "flex",
    "flexDirection": "row",
    "alignItems": "center"
  },
  "my-all-order-title-icon": {
    "marginLeft": "10",
    "width": "14",
    "height": "20"
  },
  "my-order-body": {
    "display": "flex",
    "flexDirection": "row",
    "justifyContent": "space-around"
  },
  "my-order-body-list": {
    "position": "relative",
    "display": "flex",
    "flexDirection": "column",
    "justifyContent": "space-between",
    "alignItems": "center",
    "marginBottom": "20"
  },
  "my-order-body-list-image": {
    "marginTop": "10",
    "marginBottom": "10",
    "width": "42",
    "height": "42"
  },
  "my-order-body-list-number": {
    "right": "0",
    "borderWidth": "1",
    "borderStyle": "solid",
    "borderColor": "#73cc00"
  },
  "my-order-body-list-image-text": {
    "fontSize": "20",
    "lineHeight": "22",
    "color": "#777777"
  },
  "my-tell-me-wrapper": {
    "display": "flex",
    "flexDirection": "row",
    "justifyContent": "space-between"
  },
  "my-tell-me-image": {
    "width": "350",
    "height": "180",
    "borderRadius": "10"
  },
  "my-tool-body": {
    "display": "flex",
    "flexDirection": "row",
    "flexWrap": "wrap",
    "width": "670"
  },
  "my-tool-body-list": {
    "display": "flex",
    "flexDirection": "column",
    "justifyContent": "center",
    "alignItems": "center",
    "width": "223",
    "marginBottom": "20"
  },
  "my-tool-body-list-image": {
    "marginBottom": "15",
    "width": "52",
    "height": "52"
  },
  "my-tool-body-list-image-text": {
    "fontSize": "24",
    "lineHeight": "26",
    "color": "#777777"
  }
}

/***/ }),

/***/ 119:
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
var storage = weex.requireModule('storage');
exports.default = {
	data: function data() {
		return {
			titleName: '我的',
			USERID: 'user_id',
			TOKEN: 'user_token',
			loginBool: false, //判断是否登录 显示登录注册
			myInfo: {}, //我的信息
			ConTool: [{
				title: '我的收藏',
				ImageUrl: 'http://47.92.164.211:8011/PublicImage/tool_01.png',
				navigationUrl: 'components/my/my.js'
			}, {
				title: '发现',
				ImageUrl: 'http://47.92.164.211:8011/PublicImage/tool_02.png',
				navigationUrl: 'components/my/my.js'
			}, {
				title: '分享APP',
				ImageUrl: 'http://47.92.164.211:8011/PublicImage/tool_03.png',
				navigationUrl: 'components/my/my.js'
			}, {
				title: '用户协议',
				ImageUrl: 'http://47.92.164.211:8011/PublicImage/tool_04.png',
				navigationUrl: 'components/my/my.js'
			}, {
				title: '设置',
				ImageUrl: 'http://47.92.164.211:8011/PublicImage/tool_05.png',
				navigationUrl: 'components/setUp/setUp.js'
			}]
		};
	},

	methods: {
		loginBtn: function loginBtn() {
			// Util.bindThis(Util.jump('components/login/login.js'),this.$getConfig())
			var self = this;
			// Util.jump({
			//     "phoneJump": function(){
			//         var bundleUrl = self.bundleUrl;
			//         weex.requireModule('navigator').push({
			//             url: Util.urlPort().urlAddPort + 'dist/' + 'components/login/login.js',
			//             animated: "true"
			//         }, event => {})
			//     },
			//     "webJump": function(){
			self.$router.push({
				name: "login"
			});
			//     }
			// })
		}
	},
	created: function created() {
		var _this = this;

		var self = this;
		var fontModule = weex.requireModule("dom");
		fontModule.addRule('fontFace', {
			'fontFamily': "iconfont",
			'src': "url('" + _api2.default.iconUrl + "')"
		});
		storage.getItem(this.USERID, function (event) {
			self.USERID = event.data;
			storage.getItem(_this.TOKEN, function (event) {
				self.TOKEN = event.data;
				_utils2.default.WeexAjax({
					url: _api2.default.GETUSERINFO_URL + '?UserId=' + self.USERID,
					method: 'GET',
					type: 'JSON',
					token: self.TOKEN,
					callback: function callback(ret) {
						if (ret.Status == 1) {
							self.loginBool = true;
							self.myInfo = ret.obj;
							console.log(self.myInfo);
							self.TOKEN = self.myInfo;
						}
					}
				});
			});
		});
	}
};

/***/ }),

/***/ 120:
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: ["my"]
  }, [_c('header', {
    staticClass: ["my-header-title-wrapper"],
    appendAsTree: true,
    attrs: {
      "append": "tree"
    }
  }, [_c('text', {
    staticClass: ["my-header-title"]
  }, [_vm._v(_vm._s(_vm.titleName))]), _vm._m(0)]), _c('list', [_c('cell', {
    appendAsTree: true,
    attrs: {
      "append": "tree"
    }
  }, [_c('div', {
    staticClass: ["my-header"]
  }, [_c('div', {
    staticClass: ["my-info-wrapper"]
  }, [_c('div', {
    staticClass: ["my-info-wrapper-left"]
  }, [_vm._m(1), (_vm.loginBool) ? _c('div', {
    staticClass: ["my-info-sign-wrapper"]
  }, [_c('text', {
    staticClass: ["my-info-sign-time"]
  }, [_vm._v("68分59秒")]), _vm._m(2)]) : _vm._e(), (!_vm.loginBool) ? _c('text', {
    staticClass: ["mylogin"],
    on: {
      "click": function($event) {
        _vm.loginBtn()
      }
    }
  }, [_vm._v("注册/登录")]) : _vm._e()]), _c('div', {
    staticClass: ["my-info-wrapper-right"]
  }, [_c('div', {
    staticClass: ["my-info-colum-wrapper"]
  }, _vm._l((4), function(item, index) {
    return _c('div', {
      key: index,
      staticClass: ["my-info-colum-list"]
    }, [_vm._m(3, true), (index != 3) ? _c('div', {
      staticClass: ["my-info-colum-line"]
    }) : _vm._e()])
  }))])])]), _c('div', {
    staticClass: ["my-member-area"]
  }, [_vm._m(4), _c('div', {
    staticClass: ["my-member-area-body"]
  }, _vm._l((6), function(item) {
    return _c('div', {
      staticClass: ["my-member-area-body-list"]
    }, [_c('image', {
      staticClass: ["my-member-area-body-list-image"],
      attrs: {
        "src": "http://47.92.164.211:8011/PublicImage/merage_01.png"
      }
    }), _c('text', {
      staticClass: ["my-member-area-body-list-text"]
    }, [_vm._v("尊享黑卡")])])
  }))])]), _c('cell', {
    appendAsTree: true,
    attrs: {
      "append": "tree"
    }
  }, [_c('div', {
    staticClass: ["cell-box", "my-order-wrapper"]
  }, [_vm._m(5), _c('div', {
    staticClass: ["my-order-body"]
  }, _vm._l((5), function(item) {
    return _c('div', {
      staticClass: ["my-order-body-list"]
    }, [_c('image', {
      staticClass: ["my-order-body-list-image"],
      attrs: {
        "src": "http://47.92.164.211:8011/PublicImage/order_01.png"
      }
    }), _c('text', {
      staticClass: ["info-number", "my-order-body-list-number"]
    }, [_vm._v("2")]), _c('text', {
      staticClass: ["my-order-body-list-image-text"]
    }, [_vm._v("待付款")])])
  }))])]), _vm._m(6), _c('cell', {
    appendAsTree: true,
    attrs: {
      "append": "tree"
    }
  }, [_c('div', {
    staticClass: ["cell-box", "my-tool-wrapper"]
  }, [_vm._m(7), _c('div', {
    staticClass: ["my-tool-body"]
  }, _vm._l((_vm.ConTool), function(item) {
    return _c('div', {
      staticClass: ["my-tool-body-list"]
    }, [_c('image', {
      staticClass: ["my-tool-body-list-image"],
      attrs: {
        "src": item.ImageUrl
      }
    }), _c('text', {
      staticClass: ["my-tool-body-list-image-text"]
    }, [_vm._v(_vm._s(item.title))])])
  }))])])])])
},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: ["my-header-info-wrapper"]
  }, [_c('image', {
    staticClass: ["my-header-info"],
    attrs: {
      "src": "http://47.92.164.211:8011/PublicImage/info@42x34.png"
    }
  }), _c('text', {
    staticClass: ["info-number"]
  }, [_vm._v("2")])])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: ["my-info-logo-wrapper"]
  }, [_c('image', {
    staticClass: ["my-info-logo"],
    attrs: {
      "src": "http://47.92.164.211:8011/PublicImage/logo.png"
    }
  })])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: ["my-info-sign-box"]
  }, [_c('image', {
    staticClass: ["my-info-sign-iconfont"],
    attrs: {
      "src": "http://47.92.164.211:8011/PublicImage/sign@20x20.png"
    }
  }), _c('text', {
    staticClass: ["my-info-sign-text"]
  }, [_vm._v("签到")])])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: ["my-info-colum-list-left"]
  }, [_c('text', {
    staticClass: ["my-info-colum-text"]
  }, [_vm._v("余额")]), _c('text', {
    staticClass: ["my-info-colum-num"]
  }, [_vm._v("0.00元")])])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: ["my-member-area-title"]
  }, [_c('div', {
    staticClass: ["my-member-area-title-left"]
  }, [_c('image', {
    staticClass: ["member-iconfont"],
    attrs: {
      "src": "http://47.92.164.211:8011/PublicImage/crown@35x39.png"
    }
  }), _c('text', {
    staticClass: ["my-member-area-title-left-text"]
  }, [_vm._v("会员权益")])]), _c('div', {
    staticClass: ["my-member-area-title-right"]
  }, [_c('text', {
    staticClass: ["my-member-area-title-right-text"]
  }, [_vm._v("开通会员")])])])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: ["my-order-title"]
  }, [_c('text', {
    staticClass: ["my-order-title-text"]
  }, [_vm._v("我的订单")]), _c('div', {
    staticClass: ["my-all-order-title"]
  }, [_c('text', {
    staticClass: ["my-all-order-title"]
  }, [_vm._v("全部订单")]), _c('image', {
    staticClass: ["my-all-order-title-icon"],
    attrs: {
      "src": "http://47.92.164.211:8011/PublicImage/order@left.png"
    }
  })])])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('cell', {
    appendAsTree: true,
    attrs: {
      "append": "tree"
    }
  }, [_c('div', {
    staticClass: ["cell-box", "my-tell-me-wrapper"]
  }, [_c('image', {
    staticClass: ["my-tell-me-image"],
    attrs: {
      "src": "http://47.92.164.211:8011/PublicImage/link_01.png"
    }
  }), _c('image', {
    staticClass: ["my-tell-me-image"],
    attrs: {
      "src": "http://47.92.164.211:8011/PublicImage/link_02.png"
    }
  })])])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: ["my-order-title"]
  }, [_c('text', {
    staticClass: ["my-order-title-text"]
  }, [_vm._v("便捷工具")])])
}]}
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

/***/ })

/******/ });