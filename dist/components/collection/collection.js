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
/******/ 	return __webpack_require__(__webpack_require__.s = 96);
/******/ })
/************************************************************************/
/******/ ({

/***/ 10:
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: ["shop-header-title-wrapper"]
  }, [(_vm.backPage) ? _c('image', {
    staticClass: ["backBtn"],
    attrs: {
      "src": "../src/common/images/backImage.png"
    },
    on: {
      "click": function($event) {
        _vm.backJump()
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
      "src": "../src/common/images/share@46x46.png"
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

/***/ 11:
/***/ (function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = []

/* styles */
__vue_styles__.push(__webpack_require__(8)
)

/* script */
__vue_exports__ = __webpack_require__(9)

/* template */
var __vue_template__ = __webpack_require__(10)
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
__vue_options__.__file = "F:\\WebApp\\cabbage\\src\\components\\header\\orderHeader.vue"
__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
__vue_options__._scopeId = "data-v-20c9827a"
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

/***/ 8:
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

/***/ 9:
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
			layoutImage: {
				urlImage: '../src/common/images/layout@44x44.png',
				urlImageAct: '../src/common/images/layoutACT@44x44.png'
			}
		};
	},

	methods: {
		backJump: function backJump() {
			navigator.pop({
				// url: '../src/components/other/find.vue',congratulate
				url: 'http://192.168.1.103:8082/dist/index.js',
				animated: "true"
			}, function (event) {
				// modal.toast({ message: 'callback: ' + event })
			});
		},
		layoutClick: function layoutClick() {
			this.$emit("layoutAct", this.layoutActBool = !this.layoutActBool);
		}
	},
	created: function created() {
		var fontModule = weex.requireModule("dom");
		fontModule.addRule('fontFace', {
			'fontFamily': "iconfont",
			'src': "url('//at.alicdn.com/t/font_948634_q51n034oj8.ttf')"
		});
	}
};

/***/ }),

/***/ 96:
/***/ (function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = []

/* styles */
__vue_styles__.push(__webpack_require__(97)
)

/* script */
__vue_exports__ = __webpack_require__(98)

/* template */
var __vue_template__ = __webpack_require__(99)
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
__vue_options__.__file = "F:\\WebApp\\cabbage\\src\\components\\collection\\collection.vue"
__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
__vue_options__._scopeId = "data-v-6632023e"
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

/***/ 97:
/***/ (function(module, exports) {

module.exports = {
  "congra-body-wrapper": {
    "position": "fixed",
    "width": "750",
    "top": "90",
    "bottom": 0,
    "marginTop": "20",
    "paddingLeft": "20",
    "paddingRight": "20",
    "marginBottom": "20",
    "backgroundColor": "#ffffff"
  },
  "seafood-wrapper-layout": {
    "display": "flex",
    "flexDirection": "row",
    "flexWrap": "wrap",
    "justifyContent": "space-between"
  },
  "seafood-wrapper": {
    "marginBottom": "10",
    "paddingLeft": "20",
    "paddingRight": "20",
    "paddingTop": "20",
    "paddingBottom": "20",
    "width": "350",
    "backgroundColor": "#ffffff",
    "borderWidth": "2",
    "borderStyle": "solid",
    "borderColor": "#eeeeee",
    "borderRadius": "10",
    "boxShadow": "0 0 10px 3px #eee"
  },
  "seafood-wrapper-active": {
    "display": "flex",
    "flexDirection": "row",
    "width": "710",
    "marginBottom": "10",
    "paddingLeft": "20",
    "paddingRight": "20",
    "paddingTop": "20",
    "paddingBottom": "20",
    "backgroundColor": "#ffffff",
    "borderWidth": "2",
    "borderStyle": "solid",
    "borderColor": "#eeeeee",
    "borderRadius": "15",
    "boxShadow": "0 0 10px 3px #eee"
  },
  "seafood-image": {
    "width": "310",
    "height": "310"
  },
  "seafood-bottom-wrapper": {
    "marginTop": "20"
  },
  "seafood-bottom-wrapper-active": {
    "flex": 1,
    "display": "flex",
    "justifyContent": "space-between",
    "height": "310",
    "paddingTop": "50",
    "paddingLeft": "30",
    "paddingBottom": "30"
  },
  "seafood-bottom-name-box": {
    "marginBottom": "50"
  },
  "seafood-bottom-name": {
    "width": "310",
    "fontSize": "30",
    "color": "#222222",
    "lineHeight": "34",
    "fontWeight": "bold",
    "textOverflow": "ellipsis",
    "lines": 1
  },
  "seafood-bottom-subname": {
    "marginTop": "10",
    "fontSize": "22",
    "color": "#777777"
  },
  "seafood-bottom-shop": {
    "display": "flex",
    "flexDirection": "row",
    "justifyContent": "space-between",
    "alignItems": "center"
  },
  "seafood-bottom-shop-doller-wrapper": {
    "display": "flex",
    "flexDirection": "row",
    "alignItems": "center"
  },
  "seafood-bottom-shop-doller-box": {
    "display": "flex",
    "flexDirection": "row",
    "alignItems": "flex-end"
  },
  "doller-font": {
    "marginRight": "3",
    "fontSize": "22",
    "color": "#333333",
    "lineHeight": "30"
  },
  "seafood-bottom-shop-doller": {
    "fontSize": "30",
    "color": "#f26100",
    "lineHeight": "34",
    "fontWeight": "bold"
  },
  "seafood-bottom-shop-all-doller": {
    "marginLeft": "10",
    "fontSize": "20",
    "color": "#777777",
    "lineHeight": "24"
  },
  "seafood-bottom-shop-car": {
    "width": "44",
    "height": "44"
  }
}

/***/ }),

/***/ 98:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _orderHeader = __webpack_require__(11);

var _orderHeader2 = _interopRequireDefault(_orderHeader);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
	data: function data() {
		return {
			titleName: '我的收藏',
			refreshing: false, //下拉刷新
			loadinging: false, //上拉加载
			layoutAct: false
		};
	},

	methods: {
		onrefresh: function onrefresh() {
			var _this = this;

			this.refreshing = true;
			setTimeout(function () {
				_this.refreshing = false;
			}, 2000);
		},
		onloading: function onloading() {
			var _this2 = this;

			this.loadinging = true;
			setTimeout(function () {
				_this2.loadinging = false;
			}, 2000);
		}
	},
	components: {
		"v-header": _orderHeader2.default
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

/***/ }),

/***/ 99:
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: ["find"]
  }, [_c('div', {
    staticClass: ["find-title-box"]
  }, [_c('v-header', {
    attrs: {
      "titleName": _vm.titleName,
      "backPage": true
    }
  })], 1), _c('list', {
    staticClass: ["congra-body-wrapper"]
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
  }, [_c('div', {
    staticClass: ["seafood-wrapper-layout"]
  }, _vm._l((10), function(items) {
    return _c('div', {
      staticClass: ["seafood-wrapper-active"]
    }, [_c('image', {
      staticClass: ["seafood-image"],
      attrs: {
        "src": "../src/components/seafood/seafood_01.png"
      }
    }), _vm._m(0, true)])
  }))]), _c('loading', {
    staticClass: ["loading"],
    attrs: {
      "display": _vm.loadinging ? 'show' : 'hide'
    },
    on: {
      "loading": _vm.onloading
    }
  }, [_c('text', {
    staticClass: ["loading"]
  }, [_vm._v("加载更多...")]), _c('loading-indicator', {
    staticClass: ["indicators"]
  })])])])
},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: ["seafood-bottom-wrapper-active"]
  }, [_c('div', {
    staticClass: ["seafood-bottom-name-box"]
  }, [_c('text', {
    staticClass: ["seafood-bottom-name"]
  }, [_vm._v("越南进口巴沙鱼  100...")]), _c('text', {
    staticClass: ["seafood-bottom-subname"]
  }, [_vm._v("新鲜冷冻，无骨无刺，肉质鲜嫩")])]), _c('div', {
    staticClass: ["seafood-bottom-shop"]
  }, [_c('div', {
    staticClass: ["seafood-bottom-shop-doller-wrapper"]
  }, [_c('div', {
    staticClass: ["seafood-bottom-shop-doller-box"]
  }, [_c('text', {
    staticClass: ["doller-font"]
  }, [_vm._v("¥")]), _c('text', {
    staticClass: ["seafood-bottom-shop-doller"]
  }, [_vm._v("21.40元/斤")])]), _c('text', {
    staticClass: ["seafood-bottom-shop-all-doller"]
  }, [_vm._v("¥21.40")])]), _c('image', {
    staticClass: ["seafood-bottom-shop-car"],
    attrs: {
      "src": "../src/common/images/shop-car.png"
    }
  })])])
}]}
module.exports.render._withStripped = true

/***/ })

/******/ });