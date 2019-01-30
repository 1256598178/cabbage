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
/******/ 	return __webpack_require__(__webpack_require__.s = 68);
/******/ })
/************************************************************************/
/******/ ({

/***/ 4:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = __webpack_require__(5);

Object.defineProperty(exports, 'default', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_index).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),

/***/ 5:
/***/ (function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = []

/* styles */
__vue_styles__.push(__webpack_require__(6)
)

/* script */
__vue_exports__ = __webpack_require__(7)

/* template */
var __vue_template__ = __webpack_require__(8)
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

/***/ 6:
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

/***/ 68:
/***/ (function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = []

/* styles */
__vue_styles__.push(__webpack_require__(69)
)

/* script */
__vue_exports__ = __webpack_require__(70)

/* template */
var __vue_template__ = __webpack_require__(71)
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
__vue_options__.__file = "F:\\WebApp\\cabbage\\src\\components\\balance\\balance.vue"
__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
__vue_options__._scopeId = "data-v-5093c4fe"
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

/***/ 69:
/***/ (function(module, exports) {

module.exports = {
  "wrap": {
    "backgroundColor": "#f5f5f5"
  },
  "title": {
    "fontSize": "42",
    "color": "#ffffff"
  },
  "content": {
    "paddingTop": "30",
    "paddingRight": "30",
    "paddingBottom": "30",
    "paddingLeft": "30"
  },
  "demo-title": {
    "alignItems": "center",
    "marginBottom": "20",
    "marginTop": "40"
  },
  "titles": {
    "color": "#333333",
    "fontSize": "40"
  },
  "content-text": {
    "color": "#333333",
    "fontSize": "30",
    "marginTop": "20"
  },
  "my-currency": {
    "width": "750",
    "height": "255"
  },
  "my-image": {
    "width": "750",
    "height": "255",
    "position": "absolute",
    "top": 0,
    "left": 0
  },
  "my-title": {
    "fontSize": "36",
    "lineHeight": "40",
    "color": "#ffffff",
    "marginTop": "40",
    "marginLeft": "40"
  },
  "my-number": {
    "fontSize": "48",
    "lineHeight": "50",
    "color": "#ffffff",
    "marginTop": "20",
    "marginLeft": "40"
  },
  "game-list": {
    "flexDirection": "row",
    "paddingRight": "20",
    "paddingTop": "26",
    "paddingBottom": "26"
  },
  "game-cell": {
    "marginLeft": "20"
  },
  "game": {
    "width": "380",
    "height": "200"
  },
  "points-title": {
    "fontSize": "30",
    "lineHeight": "34",
    "color": "#333333",
    "textAlign": "center",
    "marginTop": "30"
  },
  "points-list": {
    "flexDirection": "row",
    "flexWrap": "wrap"
  },
  "points-cell": {
    "width": "330",
    "height": "150",
    "borderWidth": "1",
    "borderColor": "#777777",
    "borderStyle": "solid",
    "borderRadius": "10",
    "marginTop": "30",
    "marginLeft": "30"
  },
  "points-text01": {
    "fontSize": "36",
    "lineHeight": "40",
    "color": "#777777",
    "marginTop": "25",
    "textAlign": "center"
  },
  "points-text02": {
    "fontSize": "24",
    "lineHeight": "30",
    "color": "#777777",
    "marginTop": "20",
    "textAlign": "center"
  },
  "points-cell-crt": {
    "width": "330",
    "height": "150",
    "borderWidth": "1",
    "borderColor": "#73cc00",
    "borderStyle": "solid",
    "borderRadius": "10",
    "marginTop": "30",
    "marginLeft": "30"
  },
  "points-text01-crt": {
    "fontSize": "36",
    "lineHeight": "40",
    "color": "#73cc00",
    "marginTop": "25",
    "textAlign": "center"
  },
  "points-text02-crt": {
    "fontSize": "24",
    "lineHeight": "30",
    "color": "#73cc00",
    "marginTop": "20",
    "textAlign": "center"
  },
  "points-record": {
    "fontSize": "24",
    "lineHeight": "30",
    "color": "#777777",
    "textAlign": "center",
    "marginTop": "30",
    "textDecoration": "underline"
  },
  "login-btn-box": {
    "paddingLeft": "20",
    "paddingRight": "20",
    "marginTop": "70"
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
    "marginTop": "15",
    "paddingLeft": "20",
    "paddingRight": "20"
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
  }
}

/***/ }),

/***/ 7:
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

/***/ 70:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _wxcMinibar = __webpack_require__(4);

var _wxcMinibar2 = _interopRequireDefault(_wxcMinibar);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var navigator = weex.requireModule('navigator'); //
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

exports.default = {
	components: {
		WxcMinibar: _wxcMinibar2.default
	},
	data: function data() {
		return {
			crt: 0,
			mList: [{
				money: "100",
				points: "100"

			}, {
				money: "200",
				points: "200"

			}, {
				money: "300",
				points: "300"

			}, {
				money: "500",
				points: "500"

			}, {
				money: "1000",
				points: "1000"

			}, {
				money: "3000",
				points: "3000"

			}]
		};
	},
	methods: {
		minibarLeftButtonClick: function minibarLeftButtonClick() {
			this.$router.push('-1');
		},
		selects: function selects(indexs) {
			var flag = 0;
			this.crt = indexs;
			switch (indexs) {
				case 0:
					// 全部订单 
					flag = 100;
					break;
				case 1:
					// 待付款
					flag = 200;
					break;
				case 2:
					// 待取货
					flag = 300;
					break;
				case 3:
					// 待评价
					flag = 500;
					break;
				case 4:
					// 退款服务
					flag = 1000;
					break;
				case 5:
					// 售后服务
					flag = 3000;
					break;
			}
		}
	},
	created: function created() {
		//this.selects(0);
	}
};

/***/ }),

/***/ 71:
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: ["wrap"]
  }, [_c('div', {
    staticClass: ["titleBar"]
  }, [_c('text', {
    staticClass: ["statusbar"]
  }), _c('wxc-minibar', {
    attrs: {
      "title": "余额",
      "backgroundColor": "#73cc00",
      "textColor": "#FFFFFF",
      "leftButton": "http://47.92.164.211:8011/PublicImage/backImage.png",
      "rightText": "明细"
    },
    on: {
      "wxcMinibarLeftButtonClicked": _vm.minibarLeftButtonClick,
      "wxcMinibarRightButtonClicked": function($event) {}
    }
  }, [_c('text', {
    staticClass: ["title"],
    attrs: {
      "slot": "middle"
    },
    slot: "middle"
  }, [_vm._v("余额")])])], 1), _vm._m(0), _c('div', {
    staticClass: ["points"]
  }, [_c('text', {
    staticClass: ["points-title"]
  }, [_vm._v("余额充值")]), _c('div', {
    staticClass: ["points-list"]
  }, _vm._l((_vm.mList), function(nums, indexs) {
    return _c('div', {
      key: indexs,
      class: [_vm.crt === indexs ? 'points-cell-crt' : 'points-cell'],
      on: {
        "click": function($event) {
          _vm.selects(indexs)
        }
      }
    }, [_c('text', {
      class: [_vm.crt === indexs ? 'points-text01-crt' : 'points-text01']
    }, [_vm._v(_vm._s(nums.money) + "元")]), _c('text', {
      class: [_vm.crt === indexs ? 'points-text02-crt' : 'points-text02']
    }, [_vm._v("送" + _vm._s(nums.points) + "白菜币")])])
  }))]), _vm._m(1), _vm._m(2)])
},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: ["my-currency"]
  }, [_c('image', {
    staticClass: ["my-image"],
    attrs: {
      "src": "../src/components/balance/balance-bg.png"
    }
  }), _c('text', {
    staticClass: ["my-title"]
  }, [_vm._v("我的余额（元）")]), _c('text', {
    staticClass: ["my-number"]
  }, [_vm._v("0.00")])])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: ["login-btn-box"]
  }, [_c('text', {
    staticClass: ["login-btns"]
  }, [_vm._v("确认充值")])])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: ["reg"]
  }, [_c('div', {
    staticClass: ["register"]
  }, [_c('text', {
    staticClass: ["reg-text"]
  }, [_vm._v("确认充值代表已阅读并同意")]), _c('text', {
    staticClass: ["forgot-text"]
  }, [_vm._v("《绿白菜充值条款》")])])])
}]}
module.exports.render._withStripped = true

/***/ }),

/***/ 8:
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