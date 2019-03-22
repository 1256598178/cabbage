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
/******/ 	return __webpack_require__(__webpack_require__.s = 58);
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

/***/ 3:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = __webpack_require__(4);

Object.defineProperty(exports, 'default', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_index).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),

/***/ 4:
/***/ (function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = []

/* styles */
__vue_styles__.push(__webpack_require__(5)
)

/* script */
__vue_exports__ = __webpack_require__(6)

/* template */
var __vue_template__ = __webpack_require__(7)
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
__vue_options__.__file = "F:\\WebApp\\cabbage\\node_modules\\weex-ui\\packages\\wxc-minibar\\index.vue"
__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
__vue_options__._scopeId = "data-v-89592a74"
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


/***/ }),

/***/ 5:
/***/ (function(module, exports) {

module.exports = {
  "wxc-minibar": {
    "width": "750",
    "height": "90",
    "flexDirection": "row",
    "justifyContent": "space-between",
    "alignItems": "center",
    "backgroundColor": "#009ff0"
  },
  "left": {
    "width": "180",
    "paddingLeft": "32"
  },
  "middle-title": {
    "fontSize": "30",
    "color": "#ffffff",
    "height": "36",
    "lineHeight": "34"
  },
  "right": {
    "width": "180",
    "paddingRight": "32",
    "alignItems": "flex-end"
  },
  "left-button": {
    "width": "21",
    "height": "36"
  },
  "right-button": {
    "width": "32",
    "height": "32"
  },
  "icon-text": {
    "fontSize": "28",
    "color": "#ffffff"
  }
}

/***/ }),

/***/ 58:
/***/ (function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = []

/* styles */
__vue_styles__.push(__webpack_require__(59)
)

/* script */
__vue_exports__ = __webpack_require__(60)

/* template */
var __vue_template__ = __webpack_require__(61)
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
__vue_options__.__file = "F:\\WebApp\\cabbage\\src\\components\\login\\register.vue"
__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
__vue_options__._scopeId = "data-v-65af5984"
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

/***/ 59:
/***/ (function(module, exports) {

module.exports = {
  "iconFont": {
    "fontFamily": "iconfont"
  },
  "login-bg": {
    "position": "fixed",
    "width": "750",
    "top": 0,
    "bottom": 0,
    "left": 0,
    "right": 0
  },
  "login-title": {
    "borderBottomWidth": "1",
    "borderBottomColor": "#a0a0a0",
    "borderBottomStyle": "solid",
    "paddingLeft": "20"
  },
  "login-title-text": {
    "fontSize": "48",
    "lineHeight": "90",
    "color": "#333333"
  },
  "login-box": {
    "paddingLeft": "20",
    "paddingRight": "20",
    "position": "fixed",
    "top": "210",
    "left": 0,
    "right": 0,
    "bottom": 0,
    "zIndex": 100
  },
  "username": {
    "flexDirection": "row",
    "alignItems": "center",
    "paddingTop": "20",
    "paddingBottom": "20",
    "borderBottomWidth": "1",
    "borderBottomColor": "#dcdcdc",
    "borderBottomStyle": "solid"
  },
  "username-img": {
    "width": "42",
    "height": "44",
    "marginRight": "30"
  },
  "password-img": {
    "width": "40",
    "height": "44",
    "marginRight": "32"
  },
  "pBtn": {
    "width": "34",
    "height": "22"
  },
  "code-btn": {
    "width": "170",
    "height": "50",
    "borderWidth": "1",
    "borderColor": "#a0a0a0",
    "borderStyle": "solid",
    "borderRadius": "25",
    "fontSize": "24",
    "lineHeight": "48",
    "color": "#707070",
    "textAlign": "center"
  },
  "code-btn-logo": {
    "color": "#73cc00"
  },
  "code-btn-active": {
    "color": "#707070"
  },
  "input": {
    "flex": 1,
    "height": "70",
    "lineHeight": "70",
    "fontSize": "30",
    "backgroundColor": "rgba(0,0,0,0)",
    "outline": "none"
  },
  "login-tip-box": {
    "width": "710",
    "height": "60"
  },
  "login-tip": {
    "fontSize": "24",
    "lineHeight": "40",
    "color": "#ff0000",
    "textAlign": "center"
  },
  "login-btn": {
    "height": "80",
    "fontSize": "30",
    "lineHeight": "80",
    "borderRadius": "40",
    "color": "#ffffff",
    "textAlign": "center",
    "backgroundColor": "#abd475"
  },
  "login-btns": {
    "height": "80",
    "fontSize": "30",
    "lineHeight": "80",
    "borderRadius": "40",
    "color": "#ffffff",
    "textAlign": "center",
    "backgroundColor": "#73cc00"
  },
  "reg": {
    "flexDirection": "row",
    "marginTop": "15"
  },
  "forgot": {
    "flex": 1
  },
  "forgot-text": {
    "fontSize": "24",
    "lineHeight": "30",
    "color": "#73cc00"
  },
  "register": {
    "flexDirection": "row"
  },
  "reg-text": {
    "fontSize": "24",
    "lineHeight": "30",
    "color": "#666666"
  },
  "other": {
    "justifyContent": "center",
    "textAlign": "center",
    "marginTop": "230"
  },
  "other-text": {
    "fontSize": "24",
    "lineHeight": "30",
    "color": "#666666",
    "textAlign": "center"
  },
  "other-line": {
    "width": "40",
    "height": "1",
    "backgroundColor": "#a0a0a0",
    "marginTop": "20",
    "marginBottom": "25",
    "marginLeft": "335",
    "marginRight": "335"
  },
  "other-login": {
    "flexDirection": "row",
    "justifyContent": "center"
  },
  "login-way": {
    "width": "86",
    "height": "86",
    "marginLeft": "15",
    "marginRight": "15"
  }
}

/***/ }),

/***/ 6:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

var Navigator = weex.requireModule('navigator');
exports.default = {
  props: {
    backgroundColor: {
      type: String,
      default: '#FFC900'
    },
    leftButton: {
      type: String,
      default: 'https://gw.alicdn.com/tfs/TB1x18VpwMPMeJjy1XdXXasrXXa-21-36.png'
    },
    textColor: {
      type: String,
      default: '#3D3D3D'
    },
    rightButton: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: '标题'
    },
    leftText: {
      type: String,
      default: ''
    },
    rightText: {
      type: String,
      default: ''
    },
    useDefaultReturn: {
      type: Boolean,
      default: true
    },
    show: {
      type: Boolean,
      default: true
    },
    barStyle: {
      type: Object
    }
  },
  computed: {
    newBarStyle: function newBarStyle() {
      var backgroundColor = this.backgroundColor,
          barStyle = this.barStyle;

      return _extends({
        backgroundColor: backgroundColor
      }, barStyle);
    }
  },
  methods: {
    leftButtonClicked: function leftButtonClicked() {
      if (this.useDefaultReturn) {
        Navigator.pop({}, function (e) {});
      }
      this.$emit('wxcMinibarLeftButtonClicked', {});
    },
    rightButtonClicked: function rightButtonClicked() {
      var hasRightContent = this.rightText || this.rightButton || this.$slots && this.$slots.right;
      hasRightContent && this.$emit('wxcMinibarRightButtonClicked', {});
    }
  }
};

/***/ }),

/***/ 60:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _wxcMinibar = __webpack_require__(3);

var _wxcMinibar2 = _interopRequireDefault(_wxcMinibar);

var _utils = __webpack_require__(0);

var _utils2 = _interopRequireDefault(_utils);

var _api = __webpack_require__(1);

var _api2 = _interopRequireDefault(_api);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//const dom = weex.requireModule('dom');
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
exports.default = {
	data: function data() {
		return {
			objSetInval: {
				phoneCode: '获取验证码',
				boolSetInval: false, //判断验证码按钮是否为可以点击
				time: 1000 //倒计时为一分钟
			},
			callback: '',
			pBtn: true,
			login: false,
			logoTel: false,
			loginTip: "",
			loginValue: {
				name: "", // 手机号码
				word: "", // 手机密码
				code: "", // 短信验证码
				codes: "" // 邀请码
			}
		};
	},

	methods: {
		minibarLeftButtonClick: function minibarLeftButtonClick() {
			var self = this;
			// Util.pops({
			//     "webBack": function(){
			self.$router.go(-1);
			//     },
			//     "phoneBack": function(){
			//     	weex.requireModule('navigator').pop({
			//       animated: "true"
			//   }, event => {
			//   })
			//     }
			// })
		},
		typeSelect: function typeSelect() {
			if (this.pBtn) {
				this.pBtn = false;
			} else {
				this.pBtn = true;
			}
		},
		toParams: function toParams(obj) {
			var param = "";
			for (var name in obj) {
				if (typeof obj[name] != 'function') {
					param += "&" + name + "=" + encodeURI(obj[name]);
				}
			}
			return param.substring(1);
		},
		input1: function input1(e) {
			this.loginValue.name = e.value;
			if (/^1[34578]\d{9}$/.test(this.loginValue.name)) {
				this.logoTel = true;
				// console.log(this.logoTel)
			} else {
				this.logoTel = false;
			}
			if (/^1[34578]\d{9}$/.test(this.loginValue.name) && this.loginValue.word.length >= 6 && this.loginValue.code.length == 4) {
				this.login = true;
			} else {
				this.login = false;
			}
		},
		input2: function input2(e) {
			this.loginValue.word = e.value;
			if (/^1[34578]\d{9}$/.test(this.loginValue.name) && this.loginValue.word.length >= 6 && this.loginValue.code.length == 4) {
				this.login = true;
			} else {
				this.login = false;
			}
		},
		input3: function input3(e) {
			this.loginValue.code = e.value;
			if (/^1[34578]\d{9}$/.test(this.loginValue.name) && this.loginValue.word.length >= 6 && this.loginValue.code.length == 4) {
				this.login = true;
			} else {
				this.login = false;
			}
		},
		input4: function input4(e) {
			this.loginValue.codes = e.value;
			// this.ss = e.value;
			// console.log(this.loginValue.codes)
		},

		// 短信验证交互
		codeBtn: function codeBtn() {
			var self = this;
			// 判断倒计时是否结束 和 手机号是否正确
			if (!this.objSetInval.boolSetInval && this.logoTel) {
				// if(true){
				//判断是否点击执行
				var second = 60;
				var _this = this;
				_this.objSetInval.boolSetInval = true;
				var time = setInterval(function () {
					second--;
					_this.objSetInval.phoneCode = '(' + second + ')秒可重发';
					if (second <= 0) {
						clearInterval(time);
						_this.objSetInval.phoneCode = '获取验证码';
						_this.objSetInval.boolSetInval = false;
					}
				}, _this.objSetInval.time);
				_utils2.default.WeexAjax({
					url: _api2.default.GETCODE_URL,
					method: 'POST',
					type: 'JSON',
					body: { 'MobilePhone': +this.loginValue.name },
					// body: '17718157597',
					callback: function callback(ret) {
						// var rets = Util.JsonFormat(ret);
						// const rets = JSON.parse(ret)
						console.log(ret);
						// self.ss = rets;
						modal.toast({
							message: ret.Message,
							duration: 1
						});
						if (ret.Status == 0) {
							self.loginTip = ret.Message + '请稍后重试';
						}
					}
				});
			} else {
				this.loginTip = '请输入正确的手机号';
			}
		},
		register: function register() {
			/** 获取元素的value值，但是是初始设置值 */
			//var name = this.$refs.username.value;
			//var word = this.$refs.passwords.value;
			var self = this;
			if (this.login) {
				if (/^[a-z0-9_]{6,15}$/.test(this.loginValue.word)) {
					_utils2.default.WeexAjax({
						url: _api2.default.REGISTER_URL,
						method: 'POST',
						type: 'JSON',
						body: {
							// 手机号
							'MobilePhone': this.loginValue.name,
							// 短信验证码
							'ValidateCode': this.loginValue.code,
							// 密码
							'PassWord': this.loginValue.word,
							// 邀请码
							'InvitationCode': this.loginValue.codes
						},
						callback: function callback(ret) {
							// 判断当前设备
							if (ret.Status == 0) {
								console.log(self);
								self.loginTip = ret.Message;
							} else if (ret.Status == 1) {
								// Util.pops({
								//                             "webBack": function(){
								self.$router.go(-1);
								//     },
								//     "phoneBack": function(){}
								// })
							} else {
								modal.toast({
									message: '请求错误',
									duration: 1
								});
							}
						}
					});
				} else {
					this.loginTip = '密码应以字母、数字、下划线开头';
				}
			}
		}
	},
	created: function created() {
		var fontModule = weex.requireModule("dom");
		fontModule.addRule('fontFace', {
			'fontFamily': "iconfont",
			'src': "url('" + _api2.default.iconUrl + "')"
		});
	},

	components: {
		WxcMinibar: _wxcMinibar2.default
	}
};

/***/ }),

/***/ 61:
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', [_c('image', {
    staticClass: ["login-bg"],
    attrs: {
      "src": "http://47.92.164.211:8011/PublicImage/login-bg.png"
    }
  }), _c('div', {
    staticClass: ["titleBar"]
  }, [_c('text', {
    staticClass: ["statusbar"]
  }), _c('wxc-minibar', {
    attrs: {
      "title": "",
      "backgroundColor": "transparent",
      "textColor": "#000",
      "leftButton": "http://47.92.164.211:8011/PublicImage/backImages.png"
    },
    on: {
      "wxcMinibarLeftButtonClicked": _vm.minibarLeftButtonClick
    }
  })], 1), _vm._m(0), _c('div', {
    staticClass: ["login-box"]
  }, [_c('div', {
    staticClass: ["username"]
  }, [_c('image', {
    staticClass: ["username-img"],
    attrs: {
      "src": "http://47.92.164.211:8011/PublicImage/phone@22x34.png"
    }
  }), _c('input', {
    ref: "username",
    staticClass: ["input"],
    attrs: {
      "type": "text",
      "placeholder": "请输入您的手机号码",
      "value": ""
    },
    on: {
      "input": _vm.input1
    }
  }), _c('text', {
    staticClass: ["code-btn"],
    class: [_vm.logoTel == true ? 'code-btn-logo' : '', _vm.objSetInval.boolSetInval == true ? 'code-btn-active' : ''],
    on: {
      "click": function($event) {
        _vm.codeBtn()
      }
    }
  }, [_vm._v(_vm._s(_vm.objSetInval.phoneCode))])]), _c('div', {
    staticClass: ["username"]
  }, [_c('image', {
    staticClass: ["password-img"],
    attrs: {
      "src": "http://47.92.164.211:8011/PublicImage/code@20x38.png"
    }
  }), _c('input', {
    ref: "username",
    staticClass: ["input"],
    attrs: {
      "type": "text",
      "maxlength": "4",
      "placeholder": "请输入验证码",
      "value": ""
    },
    on: {
      "input": _vm.input3
    }
  })]), _c('div', {
    staticClass: ["username"]
  }, [_c('image', {
    staticClass: ["password-img"],
    attrs: {
      "src": "http://47.92.164.211:8011/PublicImage/password@24x32.png"
    }
  }), _c('input', {
    ref: "passwords",
    staticClass: ["input"],
    attrs: {
      "type": _vm.pBtn === true ? 'password' : 'text',
      "placeholder": "请输入您的密码"
    },
    on: {
      "input": _vm.input2
    }
  }), _c('image', {
    staticClass: ["pBtn"],
    attrs: {
      "src": _vm.pBtn === true ? 'http://47.92.164.211:8011/PublicImage/biyan-icon.png' : 'http://47.92.164.211:8011/PublicImage/zhenyan-icon.png'
    },
    on: {
      "click": _vm.typeSelect
    }
  })]), _c('div', {
    staticClass: ["username"]
  }, [_c('image', {
    staticClass: ["password-img"],
    attrs: {
      "src": "http://47.92.164.211:8011/PublicImage/share@20x38.png"
    }
  }), _c('input', {
    ref: "username",
    staticClass: ["input"],
    attrs: {
      "type": "text",
      "placeholder": "请输入邀请码（选填）",
      "value": ""
    },
    on: {
      "input": _vm.input4
    }
  })]), _c('div', {
    staticClass: ["login-tip-box"]
  }, [_c('text', {
    staticClass: ["login-tip"]
  }, [_vm._v(_vm._s(_vm.loginTip))])]), _c('div', {
    staticClass: ["login-btn-box"]
  }, [_c('text', {
    class: [_vm.login === true ? 'login-btns' : 'login-btn'],
    on: {
      "click": _vm.register
    }
  }, [_vm._v("完成注册")])]), _vm._m(1)])])
},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: ["login-title"]
  }, [_c('text', {
    staticClass: ["login-title-text"]
  }, [_vm._v("账户注册")])])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: ["reg"]
  }, [_c('div', {
    staticClass: ["register"]
  }, [_c('text', {
    staticClass: ["reg-text"]
  }, [_vm._v("用户注册代表同意")]), _c('text', {
    staticClass: ["forgot-text"]
  }, [_vm._v("《用户协议》")]), _c('text', {
    staticClass: ["reg-text"]
  }, [_vm._v("和")]), _c('text', {
    staticClass: ["forgot-text"]
  }, [_vm._v("《隐私政策》")])])])
}]}
module.exports.render._withStripped = true

/***/ }),

/***/ 7:
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return (_vm.show) ? _c('div', {
    staticClass: ["wxc-minibar"],
    style: _vm.newBarStyle
  }, [_c('div', {
    staticClass: ["left"],
    attrs: {
      "ariaLabel": "返回",
      "accessible": true
    },
    on: {
      "click": _vm.leftButtonClicked
    }
  }, [_vm._t("left", [(_vm.leftButton && !_vm.leftText) ? _c('image', {
    staticClass: ["left-button"],
    attrs: {
      "src": _vm.leftButton
    }
  }) : _vm._e(), (_vm.leftText) ? _c('text', {
    staticClass: ["icon-text"],
    style: {
      color: _vm.textColor
    }
  }, [_vm._v(_vm._s(_vm.leftText))]) : _vm._e()])], 2), _vm._t("middle", [_c('text', {
    staticClass: ["middle-title"],
    style: {
      color: _vm.textColor
    }
  }, [_vm._v(_vm._s(_vm.title))])]), _c('div', {
    staticClass: ["right"],
    on: {
      "click": _vm.rightButtonClicked
    }
  }, [_vm._t("right", [(_vm.rightButton && !_vm.rightText) ? _c('image', {
    staticClass: ["right-button"],
    attrs: {
      "src": _vm.rightButton,
      "ariaHidden": true
    }
  }) : _vm._e(), (_vm.rightText) ? _c('text', {
    staticClass: ["icon-text"],
    style: {
      color: _vm.textColor
    }
  }, [_vm._v(_vm._s(_vm.rightText))]) : _vm._e()])], 2)], 2) : _vm._e()
},staticRenderFns: []}
module.exports.render._withStripped = true

/***/ })

/******/ });