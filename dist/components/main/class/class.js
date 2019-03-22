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
/******/ 	return __webpack_require__(__webpack_require__.s = 82);
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

/***/ 26:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = __webpack_require__(27);

Object.defineProperty(exports, 'default', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_index).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),

/***/ 27:
/***/ (function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = []

/* styles */
__vue_styles__.push(__webpack_require__(28)
)

/* script */
__vue_exports__ = __webpack_require__(29)

/* template */
var __vue_template__ = __webpack_require__(30)
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
__vue_options__.__file = "F:\\WebApp\\cabbage\\node_modules\\weex-ui\\packages\\wxc-overlay\\index.vue"
__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
__vue_options__._scopeId = "data-v-06f82c8c"
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

/***/ 28:
/***/ (function(module, exports) {

module.exports = {
  "wxc-overlay": {
    "width": "750",
    "position": "fixed",
    "left": 0,
    "top": 0,
    "bottom": 0,
    "right": 0
  }
}

/***/ }),

/***/ 29:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

var animation = weex.requireModule('animation');
exports.default = {
  props: {
    show: {
      type: Boolean,
      default: true
    },
    hasAnimation: {
      type: Boolean,
      default: true
    },
    duration: {
      type: [Number, String],
      default: 300
    },
    timingFunction: {
      type: Array,
      default: function _default() {
        return ['ease-in', 'ease-out'];
      }
    },
    opacity: {
      type: [Number, String],
      default: 0.6
    },
    canAutoClose: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    overlayStyle: function overlayStyle() {
      return {
        opacity: this.hasAnimation ? 0 : 1,
        backgroundColor: 'rgba(0, 0, 0,' + this.opacity + ')'
      };
    },
    shouldShow: function shouldShow() {
      var _this = this;

      var show = this.show,
          hasAnimation = this.hasAnimation;

      hasAnimation && setTimeout(function () {
        _this.appearOverlay(show);
      }, 50);
      return show;
    }
  },
  methods: {
    overlayClicked: function overlayClicked(e) {
      this.canAutoClose ? this.appearOverlay(false) : this.$emit('wxcOverlayBodyClicked', {});
    },
    appearOverlay: function appearOverlay(bool) {
      var _this2 = this;

      var duration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.duration;
      var hasAnimation = this.hasAnimation,
          timingFunction = this.timingFunction,
          canAutoClose = this.canAutoClose;

      var needEmit = !bool && canAutoClose;
      needEmit && this.$emit('wxcOverlayBodyClicking', {});
      var overlayEl = this.$refs['wxc-overlay'];
      if (hasAnimation && overlayEl) {
        animation.transition(overlayEl, {
          styles: {
            opacity: bool ? 1 : 0
          },
          duration: duration,
          timingFunction: timingFunction[bool ? 0 : 1],
          delay: 0
        }, function () {
          needEmit && _this2.$emit('wxcOverlayBodyClicked', {});
        });
      } else {
        needEmit && this.$emit('wxcOverlayBodyClicked', {});
      }
    }
  }
};

/***/ }),

/***/ 30:
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', [(_vm.show) ? _c('div', {
    ref: "wxc-overlay",
    staticClass: ["wxc-overlay"],
    style: _vm.overlayStyle,
    attrs: {
      "hack": _vm.shouldShow
    },
    on: {
      "click": _vm.overlayClicked
    }
  }) : _vm._e()])
},staticRenderFns: []}
module.exports.render._withStripped = true

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


/***/ }),

/***/ 82:
/***/ (function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = []

/* styles */
__vue_styles__.push(__webpack_require__(83)
)

/* script */
__vue_exports__ = __webpack_require__(84)

/* template */
var __vue_template__ = __webpack_require__(90)
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
__vue_options__.__file = "F:\\WebApp\\cabbage\\src\\components\\main\\class\\class.vue"
__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
__vue_options__._scopeId = "data-v-3af4bd3f"
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

/***/ 83:
/***/ (function(module, exports) {

module.exports = {
  "left-nav": {
    "width": "150"
  },
  "nav-list": {
    "width": "150",
    "position": "fixed",
    "top": "90",
    "left": 0,
    "bottom": "110",
    "backgroundColor": "#f6f6f6"
  },
  "panel": {
    "height": "88",
    "paddingTop": "16",
    "paddingBottom": "16"
  },
  "panel-crt": {
    "height": "88",
    "paddingTop": "16",
    "paddingBottom": "16",
    "backgroundColor": "#ffffff"
  },
  "text": {
    "fontSize": "24",
    "lineHeight": "56",
    "textAlign": "center",
    "color": "#333333",
    "borderLeftWidth": "8",
    "borderLeftStyle": "solid",
    "borderLeftColor": "rgba(115,204,0,0)"
  },
  "text-crt": {
    "fontSize": "24",
    "lineHeight": "56",
    "textAlign": "center",
    "color": "#41b883",
    "borderLeftWidth": "8",
    "borderLeftStyle": "solid",
    "borderLeftColor": "#73cc00"
  },
  "right-box": {
    "width": "580",
    "position": "fixed",
    "top": "90",
    "bottom": "110",
    "right": 0
  },
  "iconFont": {
    "fontFamily": "iconfont"
  },
  "sec-nav": {
    "flexDirection": "row"
  },
  "sec-nav-list": {
    "flex": 1,
    "flexDirection": "row",
    "height": "88",
    "paddingTop": "24",
    "borderBottomWidth": "1",
    "borderBottomColor": "#d2d2d2",
    "borderBottomStyle": "solid",
    "marginRight": "20"
  },
  "slideShow": {
    "flexDirection": "row",
    "justifyContent": "center",
    "alignItems": "center",
    "width": "80",
    "height": "88",
    "position": "absolute",
    "top": 0,
    "right": 0
  },
  "slideShow-icon": {
    "width": "14",
    "height": "9"
  },
  "cover": {
    "width": "600",
    "position": "fixed",
    "top": "177",
    "bottom": "110",
    "right": "-600",
    "backgroundColor": "rgba(0,0,0,0.5)",
    "transitionDuration": 500,
    "transitionTimingFunction": "ease",
    "overflow": "hidden"
  },
  "@TRANSITION": {
    "cover": {
      "duration": 500,
      "timingFunction": "ease"
    }
  },
  "demo-content": {
    "backgroundColor": "#ffffff"
  },
  "cells": {
    "height": "40",
    "paddingLeft": "20",
    "paddingRight": "20",
    "borderWidth": "1",
    "borderColor": "#d2d2d2",
    "borderStyle": "solid",
    "marginLeft": "15",
    "borderRadius": "40"
  },
  "slide-list": {
    "flexDirection": "row",
    "paddingTop": "10",
    "paddingBottom": "10"
  },
  "slide-list-cell": {
    "width": "173",
    "marginLeft": "20",
    "marginTop": "10",
    "marginBottom": "10"
  },
  "texts": {
    "fontSize": "22",
    "lineHeight": "38",
    "textAlign": "center"
  },
  "texts-crt": {
    "fontSize": "22",
    "lineHeight": "38",
    "color": "#41b883",
    "textAlign": "center"
  },
  "product-box": {
    "width": "580",
    "position": "fixed",
    "top": "178",
    "bottom": "110",
    "right": 0
  },
  "nav-head": {
    "width": "580",
    "position": "absolute",
    "top": 0,
    "left": 0,
    "backgroundColor": "#ffffff",
    "paddingRight": "20"
  },
  "nav-title": {
    "width": "560",
    "paddingTop": "15",
    "paddingBottom": "15",
    "fontSize": "22",
    "borderBottomWidth": "1",
    "borderBottomColor": "#d2d2d2",
    "borderBottomStyle": "solid"
  },
  "cellps": {
    "flexDirection": "row",
    "borderBottomWidth": "1",
    "borderBottomColor": "#d2d2d2",
    "borderBottomStyle": "solid",
    "paddingTop": "30",
    "paddingBottom": "30",
    "marginRight": "20"
  },
  "product-img": {
    "width": "200",
    "height": "200",
    "marginRight": "30"
  },
  "pro-news": {
    "flex": 1
  },
  "product-title": {
    "fontSize": "30",
    "color": "#333333",
    "marginTop": "20",
    "textOverflow": "ellipsis",
    "lines": 1
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
  "pro-m": {
    "height": "42",
    "flexDirection": "row",
    "alignItems": "flex-end"
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
  }
}

/***/ }),

/***/ 84:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _wxcPopup = __webpack_require__(85);

var _wxcPopup2 = _interopRequireDefault(_wxcPopup);

var _utils = __webpack_require__(0);

var _utils2 = _interopRequireDefault(_utils);

var _api = __webpack_require__(1);

var _api2 = _interopRequireDefault(_api);

var _header = __webpack_require__(31);

var _header2 = _interopRequireDefault(_header);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var dom = weex.requireModule('dom');
//1.先使用import导入你要在该组件中使用的子组件
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
var animation = weex.requireModule('animation');
var modal = weex.requireModule('modal');
exports.default = {
    data: function data() {
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
            TOKEN: 'user_token'
        };
    },

    //2.然后,在components中写入子组件
    components: { sHeader: _header2.default, WxcPopup: _wxcPopup2.default },
    methods: {
        select: function select(index, categoryId) {
            var self = this;
            self.navIndex = index;
            // console.log(categoryId)
            // console.log(self.classArr[index].CategoryList)
            // 获取二级分类
            // self.classsubArr = self.classArr[index].CategoryList
            // 获取产品列表
            _utils2.default.WeexAjax({
                url: _api2.default.SELECT_URL + categoryId,
                method: 'GET',
                type: 'JSON',
                callback: function callback(ret) {
                    if (ret.Status == 1) {
                        var rets = ret.obj;
                        var map = {},
                            dest = [];
                        for (var i = 0; i < rets.length; i++) {
                            if (!map[rets[i].ChildId]) {
                                dest.push({
                                    ChildId: rets[i].ChildId,
                                    data: [rets[i]]
                                });
                                map[rets[i].ChildId] = rets[i];
                            } else {
                                for (var j = 0; j < dest.length; j++) {
                                    if (dest[j].ChildId == rets[i].ChildId) {
                                        dest[j].data.push(rets[i]);
                                    }
                                }
                            }
                        }
                        // console.log(dest);
                        for (var i = 0; i < self.classArr[self.navIndex].CategoryList.length; i++) {
                            var aa = self.classArr[self.navIndex].CategoryList[i];
                            for (var j = 0; j < dest.length; j++) {
                                var bb = dest[j].ChildId;
                                if (aa.CategoryId == bb) {
                                    // console.log(bb.data)
                                    aa.product = dest[j].data;
                                }
                            }
                        }
                        self.classsubArr = self.classArr[self.navIndex].CategoryList;
                        console.log(self.classsubArr);
                    }
                }
            });
        },
        selects: function selects(indexs) {
            console.log(indexs);
            var testEl = this.$refs.slides;
            var testEt = this.$refs.slideBtn;
            this.navIndexs = indexs;
            var el = this.$refs.item[indexs];
            console.log(this.$refs.item[indexs].clientHeight);
            dom.scrollToElement(el, {});
            animation.transition(testEl, {
                styles: {
                    transform: 'translateX(0)'
                },
                duration: 500, //ms
                timingFunction: 'ease',
                delay: 0 //ms
            });
            animation.transition(testEt, {
                styles: {
                    transform: 'rotateX(0deg)'
                },
                duration: 500, //ms
                timingFunction: 'ease',
                delay: 0 //ms
            });
            this.bool = true;
        },
        openCover: function openCover() {
            var testEl = this.$refs.slides;
            var testEt = this.$refs.slideBtn;
            if (this.bool) {
                animation.transition(testEl, {
                    styles: {
                        transform: 'translateX(-600px)'
                    },
                    duration: 500, //ms
                    timingFunction: 'ease',
                    delay: 0 //ms
                });
                animation.transition(testEt, {
                    styles: {
                        transform: 'rotateX(180deg)'
                    },
                    duration: 500, //ms
                    timingFunction: 'ease',
                    delay: 0 //ms
                });
                this.bool = false;
            } else {
                animation.transition(testEl, {
                    styles: {
                        transform: 'translateX(0)'
                    },
                    duration: 500, //ms
                    timingFunction: 'ease',
                    delay: 0 //ms
                });
                animation.transition(testEt, {
                    styles: {
                        transform: 'rotateX(0deg)'
                    },
                    duration: 500, //ms
                    timingFunction: 'ease',
                    delay: 0 //ms
                });
                this.bool = true;
            }
        },

        //非状态组件，需要在这里关闭
        closeCover: function closeCover() {
            var testEl = this.$refs.slides;
            var testEt = this.$refs.slideBtn;
            animation.transition(testEl, {
                styles: {
                    transform: 'translateX(0)'
                },
                duration: 500, //ms
                timingFunction: 'ease',
                delay: 0 //ms
            });
            animation.transition(testEt, {
                styles: {
                    transform: 'rotateX(0deg)'
                },
                duration: 500, //ms
                timingFunction: 'ease',
                delay: 0 //ms
            });
            this.bool = true;
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
                    // }
                    // })
                }
            });
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
                    "ProductId": urls.ProductId
                }
            });
            //     }
            // })
        }
    },
    created: function created() {
        var _this = this;
        // 获取右侧列表信息和左侧副标题
        _utils2.default.WeexAjax({
            url: _api2.default.CLASS_URL,
            method: 'GET',
            type: 'JSON',
            callback: function callback(ret) {
                if (ret.Status == 1) {
                    _this.classArr = ret.obj;
                    _utils2.default.WeexAjax({
                        url: _api2.default.SELECT_URL + _this.classArr[0].CategoryId,
                        method: 'GET',
                        type: 'JSON',
                        callback: function callback(ret) {
                            if (ret.Status == 1) {
                                var rets = ret.obj;
                                var map = {},
                                    dest = [];
                                for (var i = 0; i < rets.length; i++) {
                                    if (!map[rets[i].ChildId]) {
                                        dest.push({
                                            ChildId: rets[i].ChildId,
                                            data: [rets[i]]
                                        });
                                        map[rets[i].ChildId] = rets[i];
                                    } else {
                                        for (var j = 0; j < dest.length; j++) {
                                            if (dest[j].ChildId == rets[i].ChildId) {
                                                dest[j].data.push(rets[i]);
                                            }
                                        }
                                    }
                                }
                                // console.log(dest);
                                for (var i = 0; i < _this.classArr[0].CategoryList.length; i++) {
                                    var aa = _this.classArr[0].CategoryList[i];
                                    for (var j = 0; j < dest.length; j++) {
                                        var bb = dest[j].ChildId;
                                        if (aa.CategoryId == bb) {
                                            // console.log(bb.data)
                                            aa.product = dest[j].data;
                                        }
                                    }
                                }
                                _this.classsubArr = _this.classArr[0].CategoryList;
                                // console.log(_this.classsubArr)
                            }
                        }
                    });
                }
            }
        });
        var fontModule = weex.requireModule("dom");
        fontModule.addRule('fontFace', {
            'fontFamily': "iconfont",
            'src': "url('" + _api2.default.iconUrl + "')"
        });
        storage.getItem(_this.USERID, function (event) {
            _this.USERID = event.data;
            storage.getItem(_this.TOKEN, function (event) {
                _this.TOKEN = event.data;
            });
        });
    }
};

/***/ }),

/***/ 85:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = __webpack_require__(86);

Object.defineProperty(exports, 'default', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_index).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),

/***/ 86:
/***/ (function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = []

/* styles */
__vue_styles__.push(__webpack_require__(87)
)

/* script */
__vue_exports__ = __webpack_require__(88)

/* template */
var __vue_template__ = __webpack_require__(89)
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
__vue_options__.__file = "F:\\WebApp\\cabbage\\node_modules\\weex-ui\\packages\\wxc-popup\\index.vue"
__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
__vue_options__._scopeId = "data-v-08e4cbd4"
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

/***/ 87:
/***/ (function(module, exports) {

module.exports = {
  "wxc-popup": {
    "position": "fixed",
    "width": "750"
  },
  "top": {
    "left": 0,
    "right": 0
  },
  "bottom": {
    "left": 0,
    "right": 0
  },
  "left": {
    "bottom": 0,
    "top": 0
  },
  "right": {
    "bottom": 0,
    "top": 0
  }
}

/***/ }),

/***/ 88:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _wxcOverlay = __webpack_require__(26);

var _wxcOverlay2 = _interopRequireDefault(_wxcOverlay);

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

var animation = weex.requireModule('animation');
var platform = weex.config.env.platform;

var isWeb = (typeof window === 'undefined' ? 'undefined' : _typeof(window)) === 'object' && platform.toLowerCase() === 'web';
exports.default = {
  components: { WxcOverlay: _wxcOverlay2.default },
  props: {
    show: {
      type: Boolean,
      default: false
    },
    pos: {
      type: String,
      default: 'bottom'
    },
    popupColor: {
      type: String,
      default: '#FFFFFF'
    },
    overlayCfg: {
      type: Object,
      default: function _default() {
        return {
          hasAnimation: true,
          timingFunction: ['ease-in', 'ease-out'],
          duration: 300,
          opacity: 0.6
        };
      }
    },
    height: {
      type: [Number, String],
      default: 840
    },
    standOut: {
      type: [Number, String],
      default: 0
    },
    width: {
      type: [Number, String],
      default: 750
    },
    animation: {
      type: Object,
      default: function _default() {
        return {
          timingFunction: 'ease-in'
        };
      }
    }
  },
  data: function data() {
    return {
      haveOverlay: true,
      isOverShow: true
    };
  },
  computed: {
    isNeedShow: function isNeedShow() {
      var _this = this;

      setTimeout(function () {
        _this.appearPopup(_this.show);
      }, 50);
      return this.show;
    },
    _height: function _height() {
      this.appearPopup(this.show, 150);
      return this.height;
    },
    padStyle: function padStyle() {
      var pos = this.pos,
          width = this.width,
          height = this.height,
          popupColor = this.popupColor,
          standOut = this.standOut;

      var stand = parseInt(standOut, 10);
      var style = {
        width: width + 'px',
        backgroundColor: popupColor
      };
      pos === 'top' && (style = _extends({}, style, {
        top: -height + stand + 'px',
        height: height + 'px'
      }));
      pos === 'bottom' && (style = _extends({}, style, {
        bottom: -height + stand + 'px',
        height: height + 'px'
      }));
      pos === 'left' && (style = _extends({}, style, {
        left: -width + stand + 'px'
      }));
      pos === 'right' && (style = _extends({}, style, {
        right: -width + stand + 'px'
      }));
      return style;
    }
  },
  methods: {
    handleTouchEnd: function handleTouchEnd(e) {
      // 在支付宝上面有点击穿透问题
      var platform = weex.config.env.platform;

      platform === 'Web' && e.preventDefault && e.preventDefault();
    },
    hide: function hide() {
      this.appearPopup(false);
      this.$refs.overlay.appearOverlay(false);
    },
    wxcOverlayBodyClicking: function wxcOverlayBodyClicking() {
      this.isShow && this.appearPopup(false);
    },
    appearPopup: function appearPopup(bool) {
      var _this2 = this;

      var duration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 300;

      this.isShow = bool;
      var popupEl = this.$refs['wxc-popup'];
      if (!popupEl) {
        return;
      }
      animation.transition(popupEl, _extends({
        styles: {
          transform: this.getTransform(this.pos, this.width, this.height, !bool)
        },
        duration: duration,
        delay: 0
      }, this.animation), function () {
        if (!bool) {
          _this2.$emit('wxcPopupOverlayClicked', { pos: _this2.pos });
        }
      });
    },
    getTransform: function getTransform(pos, width, height, bool) {
      var _size = pos === 'top' || pos === 'bottom' ? height : width;
      bool && (_size = 0);
      var _transform = void 0;
      switch (pos) {
        case 'top':
          _transform = 'translateY(' + _size + 'px)';
          break;
        case 'bottom':
          _transform = 'translateY(-' + _size + 'px)';
          break;
        case 'left':
          _transform = 'translateX(' + _size + 'px)';
          break;
        case 'right':
          _transform = 'translateX(-' + _size + 'px)';
          break;
      }
      return _transform;
    }
  }
};

/***/ }),

/***/ 89:
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', [_c('div', {
    on: {
      "touchend": _vm.handleTouchEnd
    }
  }, [(_vm.show) ? _c('wxc-overlay', _vm._b({
    ref: "overlay",
    attrs: {
      "show": _vm.haveOverlay && _vm.isOverShow
    },
    on: {
      "wxcOverlayBodyClicking": _vm.wxcOverlayBodyClicking
    }
  }, 'wxc-overlay', _vm.overlayCfg, false)) : _vm._e()], 1), (_vm.show) ? _c('div', {
    ref: "wxc-popup",
    class: ['wxc-popup', _vm.pos],
    style: _vm.padStyle,
    attrs: {
      "height": _vm._height,
      "hack": _vm.isNeedShow
    },
    on: {
      "click": function () {}
    }
  }, [_vm._t("default")], 2) : _vm._e()])
},staticRenderFns: []}
module.exports.render._withStripped = true

/***/ }),

/***/ 90:
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: ["class"]
  }, [_c('sHeader'), _c('div', {
    staticClass: ["class-box"]
  }, [_c('div', {
    staticClass: ["left-box"]
  }, [_c('list', {
    staticClass: ["nav-list"],
    attrs: {
      "showScrollbar": "false"
    }
  }, _vm._l((_vm.classArr), function(num, index) {
    return _c('cell', {
      key: index,
      staticClass: ["cell"],
      appendAsTree: true,
      attrs: {
        "append": "tree"
      },
      on: {
        "click": function($event) {
          _vm.select(index, num.CategoryId)
        }
      }
    }, [_c('div', {
      class: [_vm.navIndex === index ? 'panel-crt' : 'panel']
    }, [_c('text', {
      class: [_vm.navIndex === index ? 'text-crt' : 'text']
    }, [_vm._v(_vm._s(num.CategoryName))])])])
  }))]), _c('div', {
    staticClass: ["right-box"]
  }, [_c('div', {
    staticClass: ["sec-nav"]
  }, [_c('scroller', {
    staticClass: ["sec-nav-list"],
    attrs: {
      "showScrollbar": "false",
      "scrollDirection": "horizontal"
    }
  }, _vm._l((_vm.classsubArr), function(nums, indexs) {
    return _c('div', {
      key: indexs,
      staticClass: ["cells"],
      on: {
        "click": function($event) {
          _vm.selects(indexs)
        }
      }
    }, [_c('text', {
      class: [_vm.navIndexs === indexs ? 'texts-crt' : 'texts']
    }, [_vm._v(_vm._s(nums.CategoryName))])])
  })), _c('div', {
    staticClass: ["slideShow"]
  }, [_c('image', {
    ref: "slideBtn",
    staticClass: ["slideShow-icon"],
    attrs: {
      "src": "http://47.92.164.211:8011/PublicImage/moreImage@14x9.png"
    },
    on: {
      "click": _vm.openCover
    }
  })])]), _c('div', {
    staticClass: ["product-box"]
  }, [_c('scroller', {
    staticClass: ["product-list"]
  }, _vm._l((_vm.classsubArr), function(parent, index) {
    return _c('div', {
      key: index,
      ref: "item",
      refInFor: true,
      staticClass: ["cellp"]
    }, [_c('text', {
      staticClass: ["nav-title"]
    }, [_vm._v(_vm._s(parent.CategoryName))]), _c('list', _vm._l((_vm.classsubArr[index].product), function(child, cindex) {
      return _c('cell', {
        key: cindex,
        staticClass: ["cellps"],
        appendAsTree: true,
        attrs: {
          "append": "tree"
        },
        on: {
          "click": function($event) {
            _vm.jump({
              'web': 'goodIn',
              'ProductId': child.ProductId
            })
          }
        }
      }, [_c('image', {
        staticClass: ["product-img"],
        attrs: {
          "src": child.ImageUrl
        }
      }), _c('div', {
        staticClass: ["pro-news"]
      }, [_c('text', {
        staticClass: ["product-title"]
      }, [_vm._v(_vm._s(child.ProductName))]), _c('div', {
        staticClass: ["product-type-box"]
      }, [_c('text', {
        class: [child.sellOut === true ? 'product-type' : 'product-types']
      }, [_vm._v("已售完")])]), _c('div', {
        staticClass: ["pro-m"]
      }, [_c('text', {
        staticClass: ["product-price"]
      }, [_vm._v("￥" + _vm._s(child.SalesPrice) + "元/" + _vm._s(child.Unit))]), _c('text', {
        staticClass: ["product-prices"]
      }, [_vm._v("￥" + _vm._s(child.Price) + "元")]), _c('image', {
        staticClass: ["shop-car-icon"],
        attrs: {
          "src": "http://47.92.164.211:8011/PublicImage/shop-car-icon.png"
        },
        on: {
          "click": function($event) {
            _vm.addShopCar(child.ProductId)
          }
        }
      })])])])
    }))])
  }))])])]), _c('div', {
    ref: "slides",
    staticClass: ["cover"],
    on: {
      "click": _vm.closeCover
    }
  }, [_c('div', {
    staticClass: ["demo-content"]
  }, [_c('div', {
    staticClass: ["slide-list"]
  }, _vm._l((_vm.classsubArr), function(nums, indexs) {
    return _c('div', {
      key: indexs,
      staticClass: ["cells", "slide-list-cell"],
      on: {
        "click": function($event) {
          _vm.selects(indexs)
        }
      }
    }, [_c('text', {
      class: [_vm.navIndexs === indexs ? 'texts-crt' : 'texts']
    }, [_vm._v(_vm._s(nums.CategoryName))])])
  }))])])], 1)
},staticRenderFns: []}
module.exports.render._withStripped = true

/***/ })

/******/ });