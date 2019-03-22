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
/******/ 	return __webpack_require__(__webpack_require__.s = 91);
/******/ })
/************************************************************************/
/******/ ({

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

/***/ 91:
/***/ (function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = []

/* styles */
__vue_styles__.push(__webpack_require__(92)
)

/* script */
__vue_exports__ = __webpack_require__(93)

/* template */
var __vue_template__ = __webpack_require__(94)
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
__vue_options__.__file = "F:\\WebApp\\cabbage\\src\\components\\main\\goods\\goods.vue"
__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
__vue_options__._scopeId = "data-v-33713c7b"
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

/***/ 92:
/***/ (function(module, exports) {

module.exports = {
  "claim-goods-box": {
    "position": "fixed",
    "top": 0,
    "bottom": "110",
    "left": 0,
    "right": 0,
    "backgroundColor": "#f5f5f5"
  },
  "shop-header": {
    "width": "750",
    "height": "92",
    "backgroundColor": "rgb(115,204,70)"
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
  "shop-header-delet": {
    "position": "absolute",
    "right": 0,
    "top": 0,
    "marginTop": "29",
    "fontSize": "34",
    "color": "#c1e6a3"
  },
  "shop-address-wrapper": {
    "display": "flex",
    "flexDirection": "row",
    "alignItems": "center",
    "paddingTop": "21"
  },
  "iconFont": {
    "fontFamily": "iconfont"
  },
  "iconfont-address": {
    "marginRight": "15",
    "fontSize": "36",
    "color": "#ffffff"
  },
  "shop-address-text": {
    "fontSize": "30",
    "color": "#ffffff",
    "fontWeight": "600"
  },
  "slider": {
    "marginTop": "60",
    "width": "750",
    "height": "815"
  },
  "cabbage-img-box": {
    "width": "90",
    "height": "90",
    "borderRadius": "90",
    "backgroundColor": "#e0f8b1",
    "flexDirection": "row",
    "justifyContent": "center",
    "position": "absolute",
    "top": 0,
    "left": "330"
  },
  "cabbage-image": {
    "width": "58",
    "height": "77",
    "marginTop": "10"
  },
  "frame": {
    "width": "750",
    "flexDirection": "row",
    "justifyContent": "center",
    "position": "relative"
  },
  "frame-box": {
    "width": "710",
    "height": "770",
    "paddingTop": "75",
    "marginTop": "45",
    "backgroundColor": "#ffffff",
    "borderRadius": "10"
  },
  "claim-box": {
    "marginLeft": "60",
    "marginRight": "60",
    "flexDirection": "row",
    "marginTop": "20"
  },
  "claim-time": {
    "flexDirection": "row",
    "flex": 1
  },
  "share": {
    "width": "54",
    "height": "54",
    "flexDirection": "row",
    "justifyContent": "center",
    "alignItems": "center",
    "borderRadius": "54",
    "borderWidth": "4",
    "borderColor": "#73cc00",
    "borderStyle": "solid"
  },
  "share-btn": {
    "width": "34",
    "height": "32"
  },
  "text-box01": {
    "flexDirection": "row",
    "justifyContent": "center",
    "marginTop": "20"
  },
  "qr-code-box": {
    "marginTop": "30",
    "marginBottom": "20",
    "paddingTop": "30",
    "paddingBottom": "30",
    "borderTopWidth": "1",
    "borderTopColor": "#f4f4f4",
    "borderTopStyle": "solid",
    "borderBottomWidth": "1",
    "borderBottomColor": "#f4f4f4",
    "borderBottomStyle": "solid",
    "flexDirection": "row",
    "justifyContent": "center"
  },
  "qr-code-image": {
    "width": "300",
    "height": "300"
  },
  "text01": {
    "fontSize": "30",
    "lineHeight": "36",
    "color": "#333333",
    "textAlign": "center"
  },
  "text02": {
    "fontSize": "24",
    "lineHeight": "30",
    "color": "#777777",
    "textAlign": "center",
    "marginTop": "20"
  },
  "text03": {
    "fontSize": "24",
    "lineHeight": "30",
    "color": "#73cc00",
    "textAlign": "center"
  },
  "text04": {
    "fontSize": "24",
    "lineHeight": "30",
    "color": "#333333",
    "textAlign": "center"
  },
  "text05": {
    "fontSize": "24",
    "lineHeight": "30",
    "color": "#333333"
  },
  "text06": {
    "fontSize": "24",
    "lineHeight": "30",
    "color": "#777777"
  },
  "text07": {
    "fontSize": "24",
    "lineHeight": "30",
    "color": "#73cc00",
    "marginLeft": "60"
  },
  "claim-index-box": {
    "position": "fixed",
    "bottom": "150",
    "left": 0
  },
  "claim-index": {
    "width": "750",
    "fontSize": "24",
    "lineHeight": "30",
    "color": "#333333",
    "textAlign": "center"
  }
}

/***/ }),

/***/ 93:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _api = __webpack_require__(1);

var _api2 = _interopRequireDefault(_api);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
	data: function data() {
		return {
			goodsList: [{
				store: '（滨湖春融苑店1）',
				src: 'http://47.92.164.211:8011/PublicImage/qr-code.png',
				phone: '18469113870',
				orderNumber: '6565645646465456465',
				dates: '2018-12-03',
				time: '10:00-10:30'
			}, {
				store: '（滨湖春融苑店2）',
				src: 'http://47.92.164.211:8011/PublicImage/qr-code.png',
				phone: '18469113870',
				orderNumber: '6565645646465456466',
				dates: '2018-12-03',
				time: '10:00-10:30'
			}, {
				store: '（滨湖春融苑店3）',
				src: 'http://47.92.164.211:8011/PublicImage/qr-code.png',
				phone: '18469113870',
				orderNumber: '6565645646465456467',
				dates: '2018-12-03',
				time: '10:00-10:30'
			}],
			cIndex: 1,
			len: 0
		};
	},

	methods: {
		change: function change(e) {
			this.cIndex = e.index + 1;
		}
	},
	created: function created() {
		var fontModule = weex.requireModule("dom");
		fontModule.addRule('fontFace', {
			'fontFamily': "iconfont",
			'src': "url('" + _api2.default.iconUrl + "')"
		});
	},
	mounted: function mounted() {
		this.len = this.$refs.claim.length;
	}
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
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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

/***/ 94:
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: ["claim-goods-box"]
  }, [_vm._m(0), _c('slider', {
    staticClass: ["slider"],
    attrs: {
      "interval": "3000",
      "autoPlay": "false"
    },
    on: {
      "change": _vm.change
    }
  }, _vm._l((_vm.goodsList), function(num) {
    return _c('div', {
      ref: "claim",
      refInFor: true,
      staticClass: ["frame"]
    }, [_c('div', {
      staticClass: ["frame-box"]
    }, [_c('text', {
      staticClass: ["text01"]
    }, [_vm._v(_vm._s(num.orderNumber))]), _c('text', {
      staticClass: ["text02"]
    }, [_vm._v(_vm._s(num.phone))]), _c('div', {
      staticClass: ["text-box01"]
    }, [_c('text', {
      staticClass: ["text06"]
    }, [_vm._v("请您前往")]), _c('text', {
      staticClass: ["text03"]
    }, [_vm._v(_vm._s(num.store))]), _c('text', {
      staticClass: ["text06"]
    }, [_vm._v("进行取货")])]), _c('div', {
      staticClass: ["qr-code-box"]
    }, [_c('image', {
      staticClass: ["qr-code-image"],
      attrs: {
        "src": num.src
      }
    })]), _c('text', {
      staticClass: ["text07"]
    }, [_vm._v("订单编号：" + _vm._s(num.orderNumber))]), _c('div', {
      staticClass: ["claim-box"]
    }, [_c('div', {
      staticClass: ["claim-time"]
    }, [_c('text', {
      staticClass: ["text05"]
    }, [_vm._v("取货时间：")]), _c('div', {
      staticClass: ["text-box02"]
    }, [_c('text', {
      staticClass: ["text04"]
    }, [_vm._v(_vm._s(num.dates))]), _c('text', {
      staticClass: ["text04"]
    }, [_vm._v(_vm._s(num.time))])])]), _vm._m(1, true)])]), _vm._m(2, true)])
  })), _c('div', {
    staticClass: ["claim-index-box"]
  }, [_c('text', {
    staticClass: ["claim-index"]
  }, [_vm._v(_vm._s(this.cIndex) + "/" + _vm._s(this.len))])])])
},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('header', {
    staticClass: ["shop-header"],
    appendAsTree: true,
    attrs: {
      "append": "tree"
    }
  }, [_c('div', {
    staticClass: ["container"]
  }, [_c('div', {
    staticClass: ["shop-header-title-wrapper"]
  }, [_c('text', {
    staticClass: ["shop-header-title"]
  }, [_vm._v("取货")])])])])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: ["share"]
  }, [_c('image', {
    staticClass: ["share-btn"],
    attrs: {
      "src": "http://47.92.164.211:8011/PublicImage/share@34x32.png"
    }
  })])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: ["cabbage-img-box"]
  }, [_c('image', {
    staticClass: ["cabbage-image"],
    attrs: {
      "src": "http://47.92.164.211:8011/PublicImage/cabbage-icon.png"
    }
  })])
}]}
module.exports.render._withStripped = true

/***/ })

/******/ });