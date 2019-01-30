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
/******/ 	return __webpack_require__(__webpack_require__.s = 167);
/******/ })
/************************************************************************/
/******/ ({

/***/ 167:
/***/ (function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = []

/* styles */
__vue_styles__.push(__webpack_require__(168)
)

/* script */
__vue_exports__ = __webpack_require__(169)

/* template */
var __vue_template__ = __webpack_require__(170)
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
__vue_options__.__file = "F:\\WebApp\\cabbage\\src\\components\\myorder\\order-item.vue"
__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
__vue_options__._scopeId = "data-v-fbe0c20c"
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

/***/ 168:
/***/ (function(module, exports) {

module.exports = {
  "item_whole": {
    "marginLeft": "20",
    "marginRight": "20",
    "marginTop": "20",
    "marginBottom": "20",
    "color": "#afddff"
  },
  "item_title": {
    "flexDirection": "row",
    "justifyContent": "space-between",
    "marginBottom": "20"
  },
  "item_left_title": {
    "fontSize": "32",
    "color": "#000000"
  },
  "item_right_title": {
    "fontSize": "32",
    "color": "#F2A12F"
  },
  "item_content": {
    "flexDirection": "column"
  },
  "item_text": {
    "flexDirection": "row",
    "fontSize": "28",
    "color": "#333333",
    "marginTop": "20"
  },
  "text_create_time": {
    "marginLeft": "100",
    "fontSize": "28",
    "color": "#333333"
  },
  "text_order": {
    "marginLeft": "165",
    "fontSize": "28",
    "color": "#333333"
  }
}

/***/ }),

/***/ 169:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

//存储
storage.setItem('title', '单据详情-1', function (event) {
  undefined.state = 'set success';
  console.log('set success');
}); //获取
storage.getItem('title', function (event) {
  undefined.title = 'value: ' + event.data;
  modal.toast({ 'message': '收到' + undefined.title, 'duration': 1 });
});

/***/ }),

/***/ 170:
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: ["item_whole"]
  }, [_c('div', {
    staticClass: ["item_title"]
  }, [_c('text', {
    staticClass: ["item_left_title"]
  }, [_vm._v(_vm._s(_vm.leftTitle))]), _c('text', {
    staticClass: ["item_right_title"]
  }, [_vm._v(_vm._s(_vm.rightTitle))])]), _c('div', {
    staticClass: ["item_content"]
  }, [_c('div', {
    staticClass: ["item_text"]
  }, [_c('text', {
    staticClass: ["item_name"]
  }, [_vm._v(_vm._s("创建时间"))]), _c('text', {
    staticClass: ["text_create_time"]
  }, [_vm._v(_vm._s(_vm.createTime))])]), _c('div', {
    staticClass: ["item_text"]
  }, [_c('text', {
    staticClass: ["item_name"]
  }, [_vm._v(_vm._s("作业单据"))]), _c('text', {
    staticClass: ["text_create_time"]
  }, [_vm._v(_vm._s(_vm.workOrder))])]), _c('div', {
    staticClass: ["item_text"]
  }, [_c('text', {
    staticClass: ["item_name"]
  }, [_vm._v(_vm._s("订单"))]), _c('text', {
    staticClass: ["text_order"]
  }, [_vm._v(_vm._s(_vm.order))])])])])
},staticRenderFns: []}
module.exports.render._withStripped = true

/***/ })

/******/ });