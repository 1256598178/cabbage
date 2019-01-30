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
/******/ 	return __webpack_require__(__webpack_require__.s = 85);
/******/ })
/************************************************************************/
/******/ ({

/***/ 20:
/***/ (function(module, exports) {

module.exports = {
  "headerBox_G": {
    "height": "90",
    "width": "750",
    "borderBottomWidth": "2",
    "borderBottomColor": "#eaeaea",
    "borderBottomStyle": "solid"
  },
  "headerBox_G_toBack": {
    "position": "absolute",
    "left": "20",
    "top": "22"
  },
  "headerBox_G_pageTip": {
    "color": "#333333",
    "fontSize": "36",
    "lineHeight": "88",
    "textAlign": "center"
  }
}

/***/ }),

/***/ 21:
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

exports.default = {
    props: ['title'],
    data: function data() {
        return {
            headerBox_G_toBack: 'http://192.168.2.201:8082/images/toBack.png'
        };
    },

    methods: {
        toBack_G: function toBack_G() {
            this.$router.back(-1);
        }
    }
};

/***/ }),

/***/ 22:
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: ["headerBox_G"]
  }, [_c('text', {
    staticClass: ["headerBox_G_pageTip"]
  }, [_vm._v(_vm._s(_vm.title))]), _c('image', {
    staticClass: ["headerBox_G_toBack"],
    staticStyle: {
      width: "31px",
      height: "44px"
    },
    attrs: {
      "src": _vm.headerBox_G_toBack
    },
    on: {
      "click": _vm.toBack_G
    }
  })])
},staticRenderFns: []}
module.exports.render._withStripped = true

/***/ }),

/***/ 23:
/***/ (function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = []

/* styles */
__vue_styles__.push(__webpack_require__(20)
)

/* script */
__vue_exports__ = __webpack_require__(21)

/* template */
var __vue_template__ = __webpack_require__(22)
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
__vue_options__.__file = "F:\\WebApp\\cabbage\\src\\components\\aabbcc\\header.vue"
__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
__vue_options__._scopeId = "data-v-c77d3f6a"
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

/***/ 85:
/***/ (function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = []

/* styles */
__vue_styles__.push(__webpack_require__(86)
)

/* script */
__vue_exports__ = __webpack_require__(87)

/* template */
var __vue_template__ = __webpack_require__(88)
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
__vue_options__.__file = "F:\\WebApp\\cabbage\\src\\components\\aabbcc\\personlInfo.vue"
__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
__vue_options__._scopeId = "data-v-ec1e4992"
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

/***/ 86:
/***/ (function(module, exports) {

module.exports = {
  "person": {
    "position": "fixed",
    "top": "90",
    "left": 0,
    "right": 0,
    "bottom": 0,
    "width": "710",
    "paddingLeft": "20",
    "paddingRight": "20"
  },
  "person-title-name": {
    "paddingTop": "30",
    "paddingBottom": "30",
    "fontSize": "24",
    "color": "#777777"
  },
  "person-content-box": {
    "display": "flex",
    "flexDirection": "row",
    "justifyContent": "flex-start",
    "alignItems": "center"
  },
  "person-content-camera-box": {
    "display": "flex",
    "flexDirection": "row",
    "justifyContent": "center",
    "alignItems": "center",
    "width": "150",
    "height": "150",
    "backgroundColor": "#e5e5e5"
  },
  "person-content-camera-image": {
    "width": "88",
    "height": "76"
  },
  "person-content-camera-name": {
    "flex": 1,
    "paddingLeft": "20",
    "paddingRight": "20",
    "fontSize": "24",
    "color": "#333333"
  },
  "person-listbox": {
    "marginTop": "3"
  },
  "person-listbox-list": {
    "height": "90",
    "lineHeight": "90",
    "borderBottomWidth": "1",
    "borderBottomColor": "#000000",
    "borderBottomStyle": "solid",
    "fontSize": "24",
    "color": "#333333"
  },
  "person-btn": {
    "position": "fixed",
    "bottom": "50",
    "left": "20",
    "width": "710",
    "height": "80",
    "lineHeight": "80",
    "textAlign": "center",
    "fontSize": "36",
    "color": "#333333",
    "borderRadius": "8.8",
    "backgroundColor": "#ffd46b"
  }
}

/***/ }),

/***/ 87:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _header = __webpack_require__(23);

var _header2 = _interopRequireDefault(_header);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  data: function data() {
    return {};
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
//
//
//
//
//
//
//

/***/ }),

/***/ 88:
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _vm._m(0)
},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: ["act"]
  }, [_c('div', {
    staticClass: ["person"]
  }, [_c('text', {
    staticClass: ["person-title-name"]
  }, [_vm._v("请填写完善个人资料信息")]), _c('div', {
    staticClass: ["person-content-box"]
  }, [_c('div', {
    staticClass: ["person-content-camera-box"]
  }, [_c('image', {
    staticClass: ["person-content-camera-image"],
    attrs: {
      "src": "../src/common/img/camera.png"
    }
  })]), _c('text', {
    staticClass: ["person-content-camera-name"]
  }, [_vm._v("更换照片")])]), _c('div', {
    staticClass: ["person-listbox"]
  }, [_c('input', {
    staticClass: ["person-listbox-list"],
    attrs: {
      "placeholder": "昵称",
      "type": "text",
      "name": ""
    }
  }), _c('input', {
    staticClass: ["person-listbox-list"],
    attrs: {
      "placeholder": "姓名",
      "type": "text",
      "name": ""
    }
  }), _c('input', {
    staticClass: ["person-listbox-list"],
    attrs: {
      "placeholder": "手机号码",
      "type": "text",
      "name": ""
    }
  }), _c('input', {
    staticClass: ["person-listbox-list"],
    attrs: {
      "placeholder": "邮箱",
      "type": "text",
      "name": ""
    }
  })]), _c('text', {
    staticClass: ["person-btn"]
  }, [_vm._v("确   定")])])])
}]}
module.exports.render._withStripped = true

/***/ })

/******/ });