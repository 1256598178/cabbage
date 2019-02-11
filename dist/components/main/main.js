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
/******/ 	return __webpack_require__(__webpack_require__.s = 113);
/******/ })
/************************************************************************/
/******/ ({

/***/ 113:
/***/ (function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = []

/* styles */
__vue_styles__.push(__webpack_require__(114)
)

/* script */
__vue_exports__ = __webpack_require__(115)

/* template */
var __vue_template__ = __webpack_require__(116)
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
__vue_options__.__file = "F:\\WebApp\\cabbage\\src\\components\\main\\main.vue"
__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
__vue_options__._scopeId = "data-v-2c92a09e"
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

/***/ 114:
/***/ (function(module, exports) {

module.exports = {
  "iconFont": {
    "fontFamily": "iconfont"
  },
  "tab": {
    "position": "fixed",
    "bottom": 0,
    "height": "110",
    "width": "750",
    "display": "flex",
    "flexDirection": "row",
    "justifyContent": "space-around",
    "alignItems": "center",
    "borderTopWidth": "1",
    "borderTopColor": "#eeeeee",
    "borderTopStyle": "solid",
    "backgroundColor": "#ffffff"
  },
  "tab-list": {
    "width": "150",
    "height": "110",
    "textAlign": "center",
    "display": "flex",
    "justifyContent": "center",
    "flexWarp": "warp",
    "alignItems": "center",
    "flexDirection": "column"
  },
  "nav-img": {
    "width": "50",
    "height": "50",
    "marginTop": "15"
  },
  "nav-cn": {
    "fontSize": "20",
    "textAlign": "center",
    "marginTop": "10",
    "color": "#777777"
  },
  "nav-cn-active": {
    "fontSize": "20",
    "textAlign": "center",
    "marginTop": "10",
    "color": "#73cc00"
  },
  "nav-image": {
    "fontSize": "50",
    "color": "#777777"
  },
  "nav-image-active": {
    "fontSize": "50",
    "color": "#73cc00"
  }
}

/***/ }),

/***/ 115:
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

exports.default = {
    data: function data() {
        return {
            navIndex: 'home',
            nav: [{
                title: '首页',
                iconText: '\uE605', //'&#xe619;'转换成'\ue619'是为了解决在v-for循环中直接显示字符串的bug
                srco: '../src/common/images/home.png',
                srct: '../src/common/images/home_act.png',
                path: 'home'
            }, {
                title: '分类',
                iconText: '\uE645',
                srco: '../src/common/images/class.png',
                srct: '../src/common/images/class_act.png',
                path: 'classes'
            }, {
                title: '购物车',
                iconText: '\uE607',
                srco: '../src/common/images/shop.png',
                srct: '../src/common/images/shop_act.png',
                path: 'shop'
            }, {
                title: '取货',
                iconText: '\uE69E',
                srco: '../src/common/images/goods.png',
                srct: '../src/common/images/goods_act.png',
                path: 'goods'
            }, {
                title: '我的',
                iconText: '\uE612',
                srco: '../src/common/images/my.png',
                srct: '../src/common/images/my_act.png',
                path: 'my'
            }]
        };
    },

    methods: {
        jump: function jump(msg) {
            this.$router.push(msg);
            this.navIndex = msg;
        }
    },
    created: function created() {
        var fontModule = weex.requireModule("dom");
        fontModule.addRule('fontFace', {
            'fontFamily': "iconfont",
            'src': "url(" + this.$store.state.iconUrl + ")"
        });
    }
};

/***/ }),

/***/ 116:
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: ["wrapper"]
  }, [_c('router-view'), _c('div', {
    staticClass: ["tab"]
  }, _vm._l((_vm.nav), function(item, index) {
    return _c('div', {
      key: index,
      staticClass: ["tab-list"],
      on: {
        "click": function($event) {
          _vm.jump(item.path)
        }
      }
    }, [_c('text', {
      staticClass: ["iconFont"],
      class: [_vm.navIndex == item.path ? 'nav-image-active' : 'nav-image']
    }, [_vm._v(_vm._s(item.iconText))]), _c('text', {
      class: [_vm.navIndex == item.path ? 'nav-cn-active' : 'nav-cn']
    }, [_vm._v(_vm._s(item.title))])])
  }))], 1)
},staticRenderFns: []}
module.exports.render._withStripped = true

/***/ })

/******/ });