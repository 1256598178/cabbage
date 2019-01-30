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
/******/ 	return __webpack_require__(__webpack_require__.s = 237);
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
var Storage = __webpack_require__(1);
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
            stream.fetch({
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
    jump: function jump(href, event) {
        var bundleUrl = this.bundleUrl;
        var url = decodeURI(weex.config.bundleUrl); //取得整个地址栏
        // 获取ip+端口
        var result = url.match(new RegExp("[a-zA-z]+://[^\s]{19}", "g"));
        if (WXEnvironment.platform === 'Web') {
            console.warn('Web端跳转待开发');
            // window.location.href = 'http://192.168.1.103:8082/src/components/other/find.vue'
            // window.location.href = href
        } else {
            navigator.push({
                // url: '../../../dist/components/other/find.js',
                url: result + 'dist/' + href,
                // url: 'http://192.168.1.104:8082/dist/components/other/find.js',
                animated: "true"
            }, function (event) {
                // modal.toast({ message: 'callback: ' + event })
            });
        }
    },
    pops: function pops(event) {
        if (WXEnvironment.platform === 'Web') {
            console.warn('Web端跳转待开发');
        } else {
            navigator.pop({
                animated: "true"
            }, function (event) {});
        }
    },

    //跳转延迟
    NavigatUrl: function NavigatUrl(obj) {
        var self = this;
        modal.toast({
            message: obj.message,
            duration: obj.duration
        });
        setTimeout(function () {
            self.bindThis(self.jump(obj.urls), obj._this);
        }, obj.duration);
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
    analAjax: function analAjax() {
        var url = decodeURI(weex.config.bundleUrl); //取得整个地址栏
        console.log(url);
        var result = url.match(new RegExp(/\?\w*\=\w*(\&\w*\=\w*)*/, "g"))[0].slice(1);
        // console.log(result)
        var key = result.match(new RegExp(/\w*\=/, "g"));
        // console.log(key)
        var value = result.match(new RegExp(/\=\w*/, "g"));
        // console.log(value)
        var warp = {};
        for (var indexes in value) {
            key[indexes] = key[indexes].slice(0, key[indexes].length - 1);
            value[indexes] = value[indexes].slice(1);
            // console.log(value[indexes])
            warp[key[indexes]] = value[indexes];
        }
        // console.log(warp)
        return warp;
    }
};
exports.default = utils;

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

/***/ }),

/***/ 1:
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

/***/ 10:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _utils = __webpack_require__(0);

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MODIFYSHOPNUM_URL = 'api/cart/changeCart'; //
//
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
            _utils2.default.pops();
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
            'src': "url('//at.alicdn.com/t/font_948634_q51n034oj8.ttf')"
        });
    }
};

/***/ }),

/***/ 11:
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

/***/ 12:
/***/ (function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = []

/* styles */
__vue_styles__.push(__webpack_require__(9)
)

/* script */
__vue_exports__ = __webpack_require__(10)

/* template */
var __vue_template__ = __webpack_require__(11)
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

/***/ 17:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var required = __webpack_require__(18),
    qs = __webpack_require__(19),
    protocolre = /^([a-z][a-z0-9.+-]*:)?(\/\/)?([\S\s]*)/i,
    slashes = /^[A-Za-z][A-Za-z0-9+-.]*:\/\//;

/**
 * These are the parse rules for the URL parser, it informs the parser
 * about:
 *
 * 0. The char it Needs to parse, if it's a string it should be done using
 *    indexOf, RegExp using exec and NaN means set as current value.
 * 1. The property we should set when parsing this value.
 * 2. Indication if it's backwards or forward parsing, when set as number it's
 *    the value of extra chars that should be split off.
 * 3. Inherit from location if non existing in the parser.
 * 4. `toLowerCase` the resulting value.
 */
var rules = [['#', 'hash'], // Extract from the back.
['?', 'query'], // Extract from the back.
function sanitize(address) {
  // Sanitize what is left of the address
  return address.replace('\\', '/');
}, ['/', 'pathname'], // Extract from the back.
['@', 'auth', 1], // Extract from the front.
[NaN, 'host', undefined, 1, 1], // Set left over value.
[/:(\d+)$/, 'port', undefined, 1], // RegExp the back.
[NaN, 'hostname', undefined, 1, 1] // Set left over.
];

/**
 * These properties should not be copied or inherited from. This is only needed
 * for all non blob URL's as a blob URL does not include a hash, only the
 * origin.
 *
 * @type {Object}
 * @private
 */
var ignore = { hash: 1, query: 1 };

/**
 * The location object differs when your code is loaded through a normal page,
 * Worker or through a worker using a blob. And with the blobble begins the
 * trouble as the location object will contain the URL of the blob, not the
 * location of the page where our code is loaded in. The actual origin is
 * encoded in the `pathname` so we can thankfully generate a good "default"
 * location from it so we can generate proper relative URL's again.
 *
 * @param {Object|String} loc Optional default location object.
 * @returns {Object} lolcation object.
 * @public
 */
function lolcation(loc) {
  var globalVar;

  if (typeof window !== 'undefined') globalVar = window;else if (typeof global !== 'undefined') globalVar = global;else if (typeof self !== 'undefined') globalVar = self;else globalVar = {};

  var location = globalVar.location || {};
  loc = loc || location;

  var finaldestination = {},
      type = typeof loc === 'undefined' ? 'undefined' : _typeof(loc),
      key;

  if ('blob:' === loc.protocol) {
    finaldestination = new Url(unescape(loc.pathname), {});
  } else if ('string' === type) {
    finaldestination = new Url(loc, {});
    for (key in ignore) {
      delete finaldestination[key];
    }
  } else if ('object' === type) {
    for (key in loc) {
      if (key in ignore) continue;
      finaldestination[key] = loc[key];
    }

    if (finaldestination.slashes === undefined) {
      finaldestination.slashes = slashes.test(loc.href);
    }
  }

  return finaldestination;
}

/**
 * @typedef ProtocolExtract
 * @type Object
 * @property {String} protocol Protocol matched in the URL, in lowercase.
 * @property {Boolean} slashes `true` if protocol is followed by "//", else `false`.
 * @property {String} rest Rest of the URL that is not part of the protocol.
 */

/**
 * Extract protocol information from a URL with/without double slash ("//").
 *
 * @param {String} address URL we want to extract from.
 * @return {ProtocolExtract} Extracted information.
 * @private
 */
function extractProtocol(address) {
  var match = protocolre.exec(address);

  return {
    protocol: match[1] ? match[1].toLowerCase() : '',
    slashes: !!match[2],
    rest: match[3]
  };
}

/**
 * Resolve a relative URL pathname against a base URL pathname.
 *
 * @param {String} relative Pathname of the relative URL.
 * @param {String} base Pathname of the base URL.
 * @return {String} Resolved pathname.
 * @private
 */
function resolve(relative, base) {
  var path = (base || '/').split('/').slice(0, -1).concat(relative.split('/')),
      i = path.length,
      last = path[i - 1],
      unshift = false,
      up = 0;

  while (i--) {
    if (path[i] === '.') {
      path.splice(i, 1);
    } else if (path[i] === '..') {
      path.splice(i, 1);
      up++;
    } else if (up) {
      if (i === 0) unshift = true;
      path.splice(i, 1);
      up--;
    }
  }

  if (unshift) path.unshift('');
  if (last === '.' || last === '..') path.push('');

  return path.join('/');
}

/**
 * The actual URL instance. Instead of returning an object we've opted-in to
 * create an actual constructor as it's much more memory efficient and
 * faster and it pleases my OCD.
 *
 * It is worth noting that we should not use `URL` as class name to prevent
 * clashes with the global URL instance that got introduced in browsers.
 *
 * @constructor
 * @param {String} address URL we want to parse.
 * @param {Object|String} [location] Location defaults for relative paths.
 * @param {Boolean|Function} [parser] Parser for the query string.
 * @private
 */
function Url(address, location, parser) {
  if (!(this instanceof Url)) {
    return new Url(address, location, parser);
  }

  var relative,
      extracted,
      parse,
      instruction,
      index,
      key,
      instructions = rules.slice(),
      type = typeof location === 'undefined' ? 'undefined' : _typeof(location),
      url = this,
      i = 0;

  //
  // The following if statements allows this module two have compatibility with
  // 2 different API:
  //
  // 1. Node.js's `url.parse` api which accepts a URL, boolean as arguments
  //    where the boolean indicates that the query string should also be parsed.
  //
  // 2. The `URL` interface of the browser which accepts a URL, object as
  //    arguments. The supplied object will be used as default values / fall-back
  //    for relative paths.
  //
  if ('object' !== type && 'string' !== type) {
    parser = location;
    location = null;
  }

  if (parser && 'function' !== typeof parser) parser = qs.parse;

  location = lolcation(location);

  //
  // Extract protocol information before running the instructions.
  //
  extracted = extractProtocol(address || '');
  relative = !extracted.protocol && !extracted.slashes;
  url.slashes = extracted.slashes || relative && location.slashes;
  url.protocol = extracted.protocol || location.protocol || '';
  address = extracted.rest;

  //
  // When the authority component is absent the URL starts with a path
  // component.
  //
  if (!extracted.slashes) instructions[3] = [/(.*)/, 'pathname'];

  for (; i < instructions.length; i++) {
    instruction = instructions[i];

    if (typeof instruction === 'function') {
      address = instruction(address);
      continue;
    }

    parse = instruction[0];
    key = instruction[1];

    if (parse !== parse) {
      url[key] = address;
    } else if ('string' === typeof parse) {
      if (~(index = address.indexOf(parse))) {
        if ('number' === typeof instruction[2]) {
          url[key] = address.slice(0, index);
          address = address.slice(index + instruction[2]);
        } else {
          url[key] = address.slice(index);
          address = address.slice(0, index);
        }
      }
    } else if (index = parse.exec(address)) {
      url[key] = index[1];
      address = address.slice(0, index.index);
    }

    url[key] = url[key] || (relative && instruction[3] ? location[key] || '' : '');

    //
    // Hostname, host and protocol should be lowercased so they can be used to
    // create a proper `origin`.
    //
    if (instruction[4]) url[key] = url[key].toLowerCase();
  }

  //
  // Also parse the supplied query string in to an object. If we're supplied
  // with a custom parser as function use that instead of the default build-in
  // parser.
  //
  if (parser) url.query = parser(url.query);

  //
  // If the URL is relative, resolve the pathname against the base URL.
  //
  if (relative && location.slashes && url.pathname.charAt(0) !== '/' && (url.pathname !== '' || location.pathname !== '')) {
    url.pathname = resolve(url.pathname, location.pathname);
  }

  //
  // We should not add port numbers if they are already the default port number
  // for a given protocol. As the host also contains the port number we're going
  // override it with the hostname which contains no port number.
  //
  if (!required(url.port, url.protocol)) {
    url.host = url.hostname;
    url.port = '';
  }

  //
  // Parse down the `auth` for the username and password.
  //
  url.username = url.password = '';
  if (url.auth) {
    instruction = url.auth.split(':');
    url.username = instruction[0] || '';
    url.password = instruction[1] || '';
  }

  url.origin = url.protocol && url.host && url.protocol !== 'file:' ? url.protocol + '//' + url.host : 'null';

  //
  // The href is just the compiled result.
  //
  url.href = url.toString();
}

/**
 * This is convenience method for changing properties in the URL instance to
 * insure that they all propagate correctly.
 *
 * @param {String} part          Property we need to adjust.
 * @param {Mixed} value          The newly assigned value.
 * @param {Boolean|Function} fn  When setting the query, it will be the function
 *                               used to parse the query.
 *                               When setting the protocol, double slash will be
 *                               removed from the final url if it is true.
 * @returns {URL} URL instance for chaining.
 * @public
 */
function set(part, value, fn) {
  var url = this;

  switch (part) {
    case 'query':
      if ('string' === typeof value && value.length) {
        value = (fn || qs.parse)(value);
      }

      url[part] = value;
      break;

    case 'port':
      url[part] = value;

      if (!required(value, url.protocol)) {
        url.host = url.hostname;
        url[part] = '';
      } else if (value) {
        url.host = url.hostname + ':' + value;
      }

      break;

    case 'hostname':
      url[part] = value;

      if (url.port) value += ':' + url.port;
      url.host = value;
      break;

    case 'host':
      url[part] = value;

      if (/:\d+$/.test(value)) {
        value = value.split(':');
        url.port = value.pop();
        url.hostname = value.join(':');
      } else {
        url.hostname = value;
        url.port = '';
      }

      break;

    case 'protocol':
      url.protocol = value.toLowerCase();
      url.slashes = !fn;
      break;

    case 'pathname':
    case 'hash':
      if (value) {
        var char = part === 'pathname' ? '/' : '#';
        url[part] = value.charAt(0) !== char ? char + value : value;
      } else {
        url[part] = value;
      }
      break;

    default:
      url[part] = value;
  }

  for (var i = 0; i < rules.length; i++) {
    var ins = rules[i];

    if (ins[4]) url[ins[1]] = url[ins[1]].toLowerCase();
  }

  url.origin = url.protocol && url.host && url.protocol !== 'file:' ? url.protocol + '//' + url.host : 'null';

  url.href = url.toString();

  return url;
}

/**
 * Transform the properties back in to a valid and full URL string.
 *
 * @param {Function} stringify Optional query stringify function.
 * @returns {String} Compiled version of the URL.
 * @public
 */
function toString(stringify) {
  if (!stringify || 'function' !== typeof stringify) stringify = qs.stringify;

  var query,
      url = this,
      protocol = url.protocol;

  if (protocol && protocol.charAt(protocol.length - 1) !== ':') protocol += ':';

  var result = protocol + (url.slashes ? '//' : '');

  if (url.username) {
    result += url.username;
    if (url.password) result += ':' + url.password;
    result += '@';
  }

  result += url.host + url.pathname;

  query = 'object' === _typeof(url.query) ? stringify(url.query) : url.query;
  if (query) result += '?' !== query.charAt(0) ? '?' + query : query;

  if (url.hash) result += url.hash;

  return result;
}

Url.prototype = { set: set, toString: toString };

//
// Expose the URL parser and some additional properties that might be useful for
// others or testing.
//
Url.extractProtocol = extractProtocol;
Url.location = lolcation;
Url.qs = qs;

module.exports = Url;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ }),

/***/ 18:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Check if we're required to add a port number.
 *
 * @see https://url.spec.whatwg.org/#default-port
 * @param {Number|String} port Port number we need to check
 * @param {String} protocol Protocol we need to check against.
 * @returns {Boolean} Is it a default port for the given protocol
 * @api private
 */

module.exports = function required(port, protocol) {
  protocol = protocol.split(':')[0];
  port = +port;

  if (!port) return false;

  switch (protocol) {
    case 'http':
    case 'ws':
      return port !== 80;

    case 'https':
    case 'wss':
      return port !== 443;

    case 'ftp':
      return port !== 21;

    case 'gopher':
      return port !== 70;

    case 'file':
      return false;
  }

  return port !== 0;
};

/***/ }),

/***/ 19:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var has = Object.prototype.hasOwnProperty,
    undef;

/**
 * Decode a URI encoded string.
 *
 * @param {String} input The URI encoded string.
 * @returns {String} The decoded string.
 * @api private
 */
function decode(input) {
  return decodeURIComponent(input.replace(/\+/g, ' '));
}

/**
 * Simple query string parser.
 *
 * @param {String} query The query string that needs to be parsed.
 * @returns {Object}
 * @api public
 */
function querystring(query) {
  var parser = /([^=?&]+)=?([^&]*)/g,
      result = {},
      part;

  while (part = parser.exec(query)) {
    var key = decode(part[1]),
        value = decode(part[2]);

    //
    // Prevent overriding of existing properties. This ensures that build-in
    // methods like `toString` or __proto__ are not overriden by malicious
    // querystrings.
    //
    if (key in result) continue;
    result[key] = value;
  }

  return result;
}

/**
 * Transform a query string to an object.
 *
 * @param {Object} obj Object that should be transformed.
 * @param {String} prefix Optional prefix.
 * @returns {String}
 * @api public
 */
function querystringify(obj, prefix) {
  prefix = prefix || '';

  var pairs = [],
      value,
      key;

  //
  // Optionally prefix with a '?' if needed
  //
  if ('string' !== typeof prefix) prefix = '?';

  for (key in obj) {
    if (has.call(obj, key)) {
      value = obj[key];

      //
      // Edge cases where we actually want to encode the value to an empty
      // string instead of the stringified value.
      //
      if (!value && (value === null || value === undef || isNaN(value))) {
        value = '';
      }

      pairs.push(encodeURIComponent(key) + '=' + encodeURIComponent(value));
    }
  }

  return pairs.length ? prefix + pairs.join('&') : '';
}

//
// Expose the module.
//
exports.stringify = querystringify;
exports.parse = querystring;

/***/ }),

/***/ 2:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof2 = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; /**
                                                                                                                                                                                                                                                                                * CopyRight (C) 2017-2022 Alibaba Group Holding Limited.
                                                                                                                                                                                                                                                                                * Created by Tw93 on 17/11/01
                                                                                                                                                                                                                                                                                */

var _urlParse = __webpack_require__(17);

var _urlParse2 = _interopRequireDefault(_urlParse);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Utils = {
  UrlParser: _urlParse2.default,
  _typeof: function _typeof(obj) {
    return Object.prototype.toString.call(obj).slice(8, -1).toLowerCase();
  },
  isPlainObject: function isPlainObject(obj) {
    return Utils._typeof(obj) === 'object';
  },
  isString: function isString(obj) {
    return typeof obj === 'string';
  },
  isNonEmptyArray: function isNonEmptyArray() {
    var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

    return obj && obj.length > 0 && Array.isArray(obj) && typeof obj !== 'undefined';
  },
  isObject: function isObject(item) {
    return item && (typeof item === 'undefined' ? 'undefined' : _typeof2(item)) === 'object' && !Array.isArray(item);
  },
  isEmptyObject: function isEmptyObject(obj) {
    return Object.keys(obj).length === 0 && obj.constructor === Object;
  },
  decodeIconFont: function decodeIconFont(text) {
    // 正则匹配 图标和文字混排 eg: 我去上学校&#xe600;,天天不&#xe600;迟到
    var regExp = /&#x[a-z|0-9]{4,5};?/g;
    if (regExp.test(text)) {
      return text.replace(new RegExp(regExp, 'g'), function (iconText) {
        var replace = iconText.replace(/&#x/, '0x').replace(/;$/, '');
        return String.fromCharCode(replace);
      });
    } else {
      return text;
    }
  },
  mergeDeep: function mergeDeep(target) {
    for (var _len = arguments.length, sources = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      sources[_key - 1] = arguments[_key];
    }

    if (!sources.length) return target;
    var source = sources.shift();
    if (Utils.isObject(target) && Utils.isObject(source)) {
      for (var key in source) {
        if (Utils.isObject(source[key])) {
          if (!target[key]) {
            Object.assign(target, _defineProperty({}, key, {}));
          }
          Utils.mergeDeep(target[key], source[key]);
        } else {
          Object.assign(target, _defineProperty({}, key, source[key]));
        }
      }
    }
    return Utils.mergeDeep.apply(Utils, [target].concat(sources));
  },
  appendProtocol: function appendProtocol(url) {
    if (/^\/\//.test(url)) {
      var bundleUrl = weex.config.bundleUrl;

      return 'http' + (/^https:/.test(bundleUrl) ? 's' : '') + ':' + url;
    }
    return url;
  },
  encodeURLParams: function encodeURLParams(url) {
    var parsedUrl = new _urlParse2.default(url, true);
    return parsedUrl.toString();
  },
  goToH5Page: function goToH5Page(jumpUrl) {
    var animated = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    var callback = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

    var Navigator = weex.requireModule('navigator');
    var jumpUrlObj = new Utils.UrlParser(jumpUrl, true);
    var url = Utils.appendProtocol(jumpUrlObj.toString());
    Navigator.push({
      url: Utils.encodeURLParams(url),
      animated: animated.toString()
    }, callback);
  },

  env: {
    isTaobao: function isTaobao() {
      var appName = weex.config.env.appName;

      return (/(tb|taobao|淘宝)/i.test(appName)
      );
    },
    isTrip: function isTrip() {
      var appName = weex.config.env.appName;

      return appName === 'LX';
    },
    isBoat: function isBoat() {
      var appName = weex.config.env.appName;

      return appName === 'Boat' || appName === 'BoatPlayground';
    },
    isWeb: function isWeb() {
      var platform = weex.config.env.platform;

      return (typeof window === 'undefined' ? 'undefined' : _typeof2(window)) === 'object' && platform.toLowerCase() === 'web';
    },
    isIOS: function isIOS() {
      var platform = weex.config.env.platform;

      return platform.toLowerCase() === 'ios';
    },

    /**
     * 是否为 iPhone X or iPhoneXS or iPhoneXR or iPhoneXS Max
     * @returns {boolean}
     */
    isIPhoneX: function isIPhoneX() {
      var deviceHeight = weex.config.env.deviceHeight;

      if (Utils.env.isWeb()) {
        return (typeof window === 'undefined' ? 'undefined' : _typeof2(window)) !== undefined && window.screen && window.screen.width && window.screen.height && (parseInt(window.screen.width, 10) === 375 && parseInt(window.screen.height, 10) === 812 || parseInt(window.screen.width, 10) === 414 && parseInt(window.screen.height, 10) === 896);
      }
      return Utils.env.isIOS() && (deviceHeight === 2436 || deviceHeight === 2688 || deviceHeight == 1792);
    },
    isAndroid: function isAndroid() {
      var platform = weex.config.env.platform;

      return platform.toLowerCase() === 'android';
    },
    isAlipay: function isAlipay() {
      var appName = weex.config.env.appName;

      return appName === 'AP';
    },
    isTmall: function isTmall() {
      var appName = weex.config.env.appName;

      return (/(tm|tmall|天猫)/i.test(appName)
      );
    },
    isAliWeex: function isAliWeex() {
      return Utils.env.isTmall() || Utils.env.isTrip() || Utils.env.isTaobao();
    },

    /**
     * 获取weex屏幕真实的设置高度，需要减去导航栏高度
     * @returns {Number}
     */
    getPageHeight: function getPageHeight() {
      var env = weex.config.env;

      var navHeight = Utils.env.isWeb() ? 0 : Utils.env.isIPhoneX() ? 176 : 132;
      return env.deviceHeight / env.deviceWidth * 750 - navHeight;
    },

    /**
     * 获取weex屏幕真实的设置高度
     * @returns {Number}
     */
    getScreenHeight: function getScreenHeight() {
      var env = weex.config.env;

      return env.deviceHeight / env.deviceWidth * 750;
    }
  },

  /**
   * 版本号比较
   * @memberOf Utils
   * @param currVer {string}
   * @param promoteVer {string}
   * @returns {boolean}
   * @example
   *
   * const { Utils } = require('@ali/wx-bridge');
   * const { compareVersion } = Utils;
   * console.log(compareVersion('0.1.100', '0.1.11')); // 'true'
   */
  compareVersion: function compareVersion() {
    var currVer = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '0.0.0';
    var promoteVer = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '0.0.0';

    if (currVer === promoteVer) return true;
    var currVerArr = currVer.split('.');
    var promoteVerArr = promoteVer.split('.');
    var len = Math.max(currVerArr.length, promoteVerArr.length);
    for (var i = 0; i < len; i++) {
      var proVal = ~~promoteVerArr[i];
      var curVal = ~~currVerArr[i];
      if (proVal < curVal) {
        return true;
      } else if (proVal > curVal) {
        return false;
      }
    }
    return false;
  },

  /**
   * 分割数组
   * @param arr 被分割数组
   * @param size 分割数组的长度
   * @returns {Array}
   */
  arrayChunk: function arrayChunk() {
    var arr = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    var size = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 4;

    var groups = [];
    if (arr && arr.length > 0) {
      groups = arr.map(function (e, i) {
        return i % size === 0 ? arr.slice(i, i + size) : null;
      }).filter(function (e) {
        return e;
      });
    }
    return groups;
  },

  /*
   * 截断字符串
   * @param str 传入字符串
   * @param len 截断长度
   * @param hasDot 末尾是否...
   * @returns {String}
   */
  truncateString: function truncateString(str, len) {
    var hasDot = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

    var newLength = 0;
    var newStr = '';
    var singleChar = '';
    var chineseRegex = /[^\x00-\xff]/g;
    var strLength = str.replace(chineseRegex, '**').length;
    for (var i = 0; i < strLength; i++) {
      singleChar = str.charAt(i).toString();
      if (singleChar.match(chineseRegex) !== null) {
        newLength += 2;
      } else {
        newLength++;
      }
      if (newLength > len) {
        break;
      }
      newStr += singleChar;
    }

    if (hasDot && strLength > len) {
      newStr += '...';
    }
    return newStr;
  },

  /*
   * 转换 obj 为 url params参数
   * @param obj 传入字符串
   * @returns {String}
   */
  objToParams: function objToParams(obj) {
    var str = "";
    for (var key in obj) {
      if (str !== "") {
        str += "&";
      }
      str += key + "=" + encodeURIComponent(obj[key]);
    }
    return str;
  },

  /*
   * 转换 url params参数为obj
   * @param str 传入url参数字符串
   * @returns {Object}
   */
  paramsToObj: function paramsToObj(str) {
    var obj = {};
    try {
      obj = JSON.parse('{"' + decodeURI(str).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') + '"}');
    } catch (e) {
      console.log(e);
    }
    return obj;
  },

  animation: {
    /**
     * 返回定义页面转场动画起初的位置
     * @param ref
     * @param transform 运动类型
     * @param status
     * @param callback 回调函数
     */
    pageTransitionAnimation: function pageTransitionAnimation(ref, transform, status, callback) {
      var animation = weex.requireModule('animation');
      animation.transition(ref, {
        styles: {
          transform: transform
        },
        duration: status ? 250 : 300, // ms
        timingFunction: status ? 'ease-in' : 'ease-out',
        delay: 0 // ms
      }, function () {
        callback && callback();
      });
    }
  },
  uiStyle: {
    /**
     * 返回定义页面转场动画起初的位置
     * @param animationType 页面转场动画的类型 push，model
     * @param size 分割数组的长度
     * @returns {}
     */
    pageTransitionAnimationStyle: function pageTransitionAnimationStyle(animationType) {
      if (animationType === 'push') {
        return {
          left: '750px',
          top: '0px',
          height: weex.config.env.deviceHeight / weex.config.env.deviceWidth * 750 + 'px'
        };
      } else if (animationType === 'model') {
        return {
          top: weex.config.env.deviceHeight / weex.config.env.deviceWidth * 750 + 'px',
          left: '0px',
          height: weex.config.env.deviceHeight / weex.config.env.deviceWidth * 750 + 'px'
        };
      }
      return {};
    }
  }
};

exports.default = Utils;

/***/ }),

/***/ 237:
/***/ (function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = []

/* styles */
__vue_styles__.push(__webpack_require__(238)
)

/* script */
__vue_exports__ = __webpack_require__(239)

/* template */
var __vue_template__ = __webpack_require__(240)
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
__vue_options__.__file = "F:\\WebApp\\cabbage\\src\\components\\shop\\shop.vue"
__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
__vue_options__._scopeId = "data-v-4b5b4ebe"
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

/***/ 238:
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
  "shop-header": {
    "height": "240",
    "backgroundColor": "#73cc46"
  },
  "shop-address-wrapper": {
    "display": "flex",
    "flexDirection": "row",
    "alignItems": "center",
    "paddingLeft": "20",
    "paddingRight": "20",
    "paddingTop": "21"
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
  "shop-wrapper": {
    "position": "fixed",
    "left": 0,
    "top": "174",
    "bottom": "265",
    "width": "750",
    "paddingLeft": "20",
    "paddingRight": "20"
  },
  "shop-list": {
    "display": "flex",
    "flexDirection": "row",
    "alignItems": "center",
    "width": "710",
    "height": "260",
    "marginBottom": "10",
    "paddingLeft": "20",
    "paddingRight": "20",
    "backgroundColor": "#ffffff",
    "borderRadius": "20"
  },
  "shop-list-radio": {
    "width": "60",
    "height": "60",
    "borderRadius": 50,
    "backgroundColor": "#ff4400",
    "color": "#ffffff",
    "fontSize": "60",
    "textAlign": "center",
    "lineHeight": "60"
  },
  "shop-list-image": {
    "marginRight": "25",
    "width": "200",
    "height": "200"
  },
  "shop-list-info": {
    "display": "flex",
    "flexDirection": "column",
    "justifyContent": "space-between",
    "flex": 1,
    "height": "176"
  },
  "shop-list-info-title": {
    "display": "flex",
    "flexDirection": "row",
    "alignItems": "center"
  },
  "shop-list-money-left": {
    "display": "flex",
    "flexDirection": "row",
    "alignItems": "center"
  },
  "shop-list-money-right": {
    "display": "flex",
    "flexDirection": "row",
    "alignItems": "center"
  },
  "shop-list-money-wrapper": {
    "display": "flex",
    "flexDirection": "row",
    "justifyContent": "space-between"
  },
  "shop-list-info-name": {
    "fontSize": "30",
    "color": "#222222"
  },
  "shop-list-money": {
    "fontSize": "30",
    "color": "#f26100",
    "fontWeight": "600"
  },
  "shop-list-info-weight": {
    "marginLeft": "23"
  },
  "shop-list-all-money": {
    "marginLeft": "15",
    "fontSize": "20",
    "color": "#777777"
  },
  "shop-list-money-number": {
    "width": "40",
    "fontSize": "20",
    "color": "#777777",
    "textAlign": "center",
    "backgroundColor": "rgba(0,0,0,0)"
  },
  "shop-list-money-reduce": {
    "fontSize": "35"
  },
  "shop-list-money-add": {
    "fontSize": "35",
    "color": "#73cc46"
  },
  "good-bottom-wrapper": {
    "position": "fixed",
    "display": "flex",
    "flexDirection": "column",
    "bottom": "109",
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
  "shop-bottom-checkout": {
    "height": "90"
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

/***/ 239:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _wxcStepper = __webpack_require__(54);

var _wxcStepper2 = _interopRequireDefault(_wxcStepper);

var _wxcCheckboxList = __webpack_require__(59);

var _wxcCheckboxList2 = _interopRequireDefault(_wxcCheckboxList);

var _wxcCheckbox = __webpack_require__(67);

var _wxcCheckbox2 = _interopRequireDefault(_wxcCheckbox);

var _utils = __webpack_require__(0);

var _utils2 = _interopRequireDefault(_utils);

var _orderHeader = __webpack_require__(12);

var _orderHeader2 = _interopRequireDefault(_orderHeader);

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

var modal = weex.requireModule('modal');
var stream = weex.requireModule("stream");
var storage = weex.requireModule('storage');
// 获取购物车列表
var SHOP_URL = 'api/cart/getMyCartList?userId=';
// 修改购物车数量
var MODIFYSHOPNUM_URL = 'api/cart/changeCart';
var SUBITORDER_URL = 'api/cart/sumbitOrder';
exports.default = {
	data: function data() {
		return {
			titleName: '购物车',
			refreshing: false, //下拉刷新
			loadinging: false, //上拉加载
			selectAll: true, //是否全选
			selectOne: false, //是否单选
			checkArr: [], //被选中产品的数组 用来做全部删除
			USERID: 'user_id',
			TOKEN: 'user_token',
			shopCarArr: {},
			config: {
				//初始单选框
				unCheckedIcon: 'http://47.92.164.211:8011/PublicImage/unchecked.png',
				checkedIcon: 'http://47.92.164.211:8011/PublicImage/checked.png',
				disabledIcon: 'https://gw.alicdn.com/tfs/TB1PtN3pwMPMeJjy1XdXXasrXXa-72-72.png',
				checkedDisabledIcon: 'https://gw.alicdn.com/tfs/TB1aPabpwMPMeJjy1XcXXXpppXa-72-72.png',
				unCheckedDisabledIcon: 'https://gw.alicdn.com/tfs/TB1lTuzpwoQMeJjy0FoXXcShVXa-72-72.png',
				checkedColor: '#f40'
			},
			shopCar: {}, // 物品对象
			discounts: 0.0 //折扣价
			// moneyValue: 0,//购买商品数
			// total: 0,//总价
			// shopNumber: 0,//商品个数
		};
	},

	methods: {
		// 去除商品
		reduceMoney: function reduceMoney(num, index) {
			var self = this,

			// 本地修改
			CartNums = num - 1;
			_utils2.default.WeexAjax({
				url: MODIFYSHOPNUM_URL,
				method: 'POST',
				type: 'JSON',
				token: self.TOKEN,
				body: {
					"UserId": self.USERID,
					"CartId": self.shopCarArr.CartList[index].CartId,
					"CartNum": CartNums
				},
				callback: function callback(ret) {
					if (ret.Status == 1) {
						var rets = ret.obj;
						self.shopCarArr.CartList[index].CartNum = parseInt(CartNums);
						if (self.shopCarArr.CartList[index].CartNum <= 0) {
							self.checkArr.splice(index, 1);
							self.shopCarArr.CartList.splice(index, 1);
						}
						// console.log(self.checkArr)
					} else {
						modal.toast({
							message: '请求错误',
							duration: 1
						});
					}
				}
			});
			// this.shopCar[index].number = parseInt(this.shopCar[index].number) - 1;
		},

		// 增加商品
		addMoney: function addMoney(num, index) {
			var self = this;
			_utils2.default.WeexAjax({
				url: MODIFYSHOPNUM_URL,
				method: 'POST',
				type: 'JSON',
				token: self.TOKEN,
				body: {
					"UserId": self.USERID,
					"CartId": self.shopCarArr.CartList[index].CartId,
					"CartNum": parseInt(num) + 1
				},
				callback: function callback(ret) {
					if (ret.Status == 1) {
						var rets = ret.obj;
						self.shopCarArr.CartList[index].CartNum = parseInt(num) + 1;
						// console.log(self.shopCarArr.CartList)
					} else {
						modal.toast({
							message: '请求错误',
							duration: 1
						});
					}
				}
			});
			// this.shopCar[index].number = parseInt(this.shopCar[index].number) + 1;
		},
		_initCheckArr: function _initCheckArr() {
			for (var i = 0; i < this.shopCarArr.CartList.length; i++) {
				// var aa =  this.shopCarArr.CartList[i]
				this.checkArr.push({ checked: true });
				this.shopCarArr.CartList[i].checked = true;
			}
			// console.log(this.checkArr)
			// console.log(this.shopCarArr)
		},

		// 选中
		wxcCheckBoxItemChecked: function wxcCheckBoxItemChecked(e) {
			// this.selectOne = !this.selectOne;
			// console.log(this.selectOne)
			var value = e.value;
			this.checkArr[value].checked = e.checked;
			this.shopCarArr.CartList[value].checked = e.checked;
			console.log(this.checkArr);
			console.log(this.shopCarArr);
		},

		// 全选按钮
		wxcCheck: function wxcCheck(e) {
			//判断是否全选
			// this.selectAll = !this.selectAll;
			var value = e.value;
			// if(e.checked){
			for (var i = 0; i < this.shopCarArr.CartList.length; i++) {
				this.checkArr[i].checked = e.checked;
				this.shopCarArr.CartList[i].checked = e.checked;
			}
			// }else{
			// 	for(var i = 0; i < this.shopCarArr.CartList.length; i++){
			// 		this.checkArr[i].checked = false;
			// 		this.shopCarArr.CartList[i].checked = false;
			// 	}
			// }
			console.log(this.shopCarArr.CartList);
		},

		//删除按钮
		deletFoods: function deletFoods() {
			// console.log(this.checkArr)
			// var sb=this.checkArr;
			// var index;
			var self = this;
			var arr = [];
			for (var i = this.checkArr.length - 1; i >= 0; i--) {
				if (this.checkArr[i].checked == true) {
					// console.log(i+'----')
					var CartId = self.shopCarArr.CartList[i].CartId;
					self.checkArr.splice(i, 1);
					self.shopCarArr.CartList.splice(i, 1);
					_utils2.default.WeexAjax({
						url: MODIFYSHOPNUM_URL,
						method: 'POST',
						type: 'JSON',
						token: self.TOKEN,
						body: {
							"UserId": self.USERID,
							"CartId": CartId,
							"CartNum": 0
						},
						callback: function callback(ret) {
							if (ret.Status == 1) {
								var rets = ret.obj;
							} else {
								modal.toast({
									message: '请求错误',
									duration: 1
								});
							}
						}
					});
				}
			}
		},
		jump: function jump(href) {
			var CartIds = '';
			for (var i = 0; i < this.shopCarArr.CartList.length; i++) {
				if (this.shopCarArr.CartList[i].checked == true) {
					CartIds += this.shopCarArr.CartList[i].CartId + ',';
				}
			}
			// 替换字符串 替换掉最后一个逗号
			CartIds = CartIds.replace(/(\,$)/g, "");
			_utils2.default.bindThis(_utils2.default.jump(href + '?CartIds=' + CartIds), this.$getConfig());
			console.log(href + '?CartIds=' + CartIds);
		}
	},
	created: function created() {
		var _this = this;

		var fontModule = weex.requireModule("dom");
		fontModule.addRule('fontFace', {
			'fontFamily': "iconfont",
			'src': "url('//at.alicdn.com/t/font_948634_q51n034oj8.ttf')"
		});
		var self = this;
		storage.getItem(this.USERID, function (event) {
			self.USERID = event.data;
			storage.getItem(_this.TOKEN, function (event) {
				self.TOKEN = event.data;
				_utils2.default.WeexAjax({
					url: SHOP_URL + self.USERID,
					method: 'GET',
					type: 'JSON',
					token: self.TOKEN,
					callback: function callback(ret) {
						if (ret.Status == 1) {
							var rets = ret.obj;
							self.shopCarArr = rets;
							self.discounts = rets.Discount;
							// 初始化单选框
							self._initCheckArr();
							console.log(self.shopCarArr);
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
	},

	components: {
		WxcCheckbox: _wxcCheckbox2.default,
		WxcCheckboxList: _wxcCheckboxList2.default,
		WxcStepper: _wxcStepper2.default,
		"v-header": _orderHeader2.default
	},
	computed: {
		shopNumber: function shopNumber() {
			var num = 0;
			var shopCarNum = 0;
			// console.log(this.shopCarArr.CartList.length)
			for (var i = 0; i < this.shopCarArr.CartList.length; i++) {
				shopCarNum = this.shopCarArr.CartList[i].CartNum;
				num += parseInt(shopCarNum);
			}
			return num;
		},
		total: function total() {
			var money = 0;
			var shopCarPrice = 0,
			    shopCarNum = 0;
			for (var i = 0; i < this.shopCarArr.CartList.length; i++) {
				shopCarPrice = this.shopCarArr.CartList[i].SalesPrice;
				shopCarNum = this.shopCarArr.CartList[i].CartNum;
				money += parseFloat(shopCarPrice) * parseInt(shopCarNum);
			}
			return money.toFixed(2);
		},
		discount: function discount() {
			var count = 0;
			var shopCarPrice = 0,
			    shopCarNum = 0;
			for (var i = 0; i < this.shopCarArr.CartList.length; i++) {
				shopCarPrice = this.shopCarArr.CartList[i].SalesPrice;
				shopCarNum = this.shopCarArr.CartList[i].CartNum;
				count += parseFloat(shopCarPrice).toFixed(2) * parseInt(shopCarNum) - parseFloat(shopCarPrice).toFixed(2) * parseInt(shopCarNum) * this.discounts;
			}
			return count.toFixed(2);
		}
	}
};

/***/ }),

/***/ 240:
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
  }, [_c('div', {
    staticClass: ["shop-header-title-wrapper"]
  }, [_c('text', {
    staticClass: ["shop-header-title"]
  }, [_vm._v(_vm._s(_vm.titleName))]), _c('text', {
    staticClass: ["shop-header-delet"],
    on: {
      "click": function($event) {
        _vm.deletFoods()
      }
    }
  }, [_vm._v("删除")])]), _vm._m(0)]), _c('list', {
    staticClass: ["shop-wrapper"]
  }, _vm._l((_vm.shopCarArr.CartList), function(foods, index) {
    return (foods.CartNum > 0) ? _c('cell', {
      key: index,
      appendAsTree: true,
      attrs: {
        "append": "tree"
      }
    }, [_c('div', {
      staticClass: ["shop-list"]
    }, [_c('wxc-checkbox', {
      staticClass: ["shop-list-checkout"],
      attrs: {
        "value": index,
        "config": _vm.config,
        "hasBottomBorder": false,
        "checked": _vm.checkArr[index].checked
      },
      on: {
        "wxcCheckBoxItemChecked": _vm.wxcCheckBoxItemChecked
      }
    }), _c('image', {
      staticClass: ["shop-list-image"],
      attrs: {
        "src": foods.ImageUrl
      }
    }), _c('div', {
      staticClass: ["shop-list-info"]
    }, [_c('div', {
      staticClass: ["shop-list-info-title"]
    }, [_c('text', {
      staticClass: ["shop-list-info-name"]
    }, [_vm._v(_vm._s(foods.ProductName) + _vm._s(foods.checked))]), _c('text', {
      staticClass: ["shop-list-info-weight"]
    }, [_vm._v(_vm._s(foods.Weight) + "g")])]), _c('div', {
      staticClass: ["shop-list-money-wrapper"]
    }, [_c('div', {
      staticClass: ["shop-list-money-left"]
    }, [_c('text', {
      staticClass: ["shop-list-money"]
    }, [_vm._v("￥" + _vm._s(foods.SalesPrice) + "元/" + _vm._s(foods.Unit))]), _c('text', {
      staticClass: ["shop-list-all-money"]
    }, [_vm._v("￥" + _vm._s(foods.Price))])]), _c('div', {
      staticClass: ["shop-list-money-right"]
    }, [_c('text', {
      staticClass: ["iconFont", "shop-list-money-reduce"],
      on: {
        "click": function($event) {
          _vm.reduceMoney(foods.CartNum, index)
        }
      }
    }, [_vm._v("")]), _c('text', {
      staticClass: ["shop-list-money-number"],
      attrs: {
        "type": "text"
      }
    }, [_vm._v(_vm._s(foods.CartNum))]), _c('text', {
      staticClass: ["iconFont", "shop-list-money-add"],
      on: {
        "click": function($event) {
          _vm.addMoney(foods.CartNum, index)
        }
      }
    }, [_vm._v("")])])])])], 1)]) : _vm._e()
  })), _c('div', {
    staticClass: ["good-bottom-wrapper"]
  }, [_c('div', {
    staticClass: ["good-bottom-member-wrapper"]
  }, [_c('text', {
    staticClass: ["iconFont", "member-image"]
  }, [_vm._v("")]), _c('text', {
    staticClass: ["member-text"]
  }, [_vm._v("升级会员，本单可为您节省")]), _c('text', {
    staticClass: ["member-text-num"]
  }, [_vm._v(_vm._s(_vm.discount))]), _c('text', {
    staticClass: ["member-text"]
  }, [_vm._v("元!")])]), _c('div', {
    staticClass: ["good-bottom-list-wrapper"]
  }, [_c('div', {
    staticClass: ["good-bottom-select-wrapper"]
  }, [_c('wxc-checkbox', {
    staticClass: ["shop-list-checkout", "shop-bottom-checkout"],
    attrs: {
      "config": _vm.config,
      "hasBottomBorder": false,
      "checked": _vm.selectAll
    },
    on: {
      "wxcCheckBoxItemChecked": _vm.wxcCheck
    }
  }), _c('text', {
    staticClass: ["good-bottom-checked-all"]
  }, [_vm._v("全选")])], 1), _c('div', {
    staticClass: ["good-bottom-total-wrapper"]
  }, [_c('text', {
    staticClass: ["good-bottom-total-text"]
  }, [_vm._v("合计:")]), _c('text', {
    staticClass: ["good-bottom-total-money"]
  }, [_vm._v("￥" + _vm._s(_vm.total) + "元")]), _c('div', {
    staticClass: ["good-bottom-total-button"]
  }, [_c('text', {
    staticClass: ["good-bottom-total-button-text"],
    on: {
      "click": function($event) {
        _vm.jump('components/shop/setlemet.js')
      }
    }
  }, [_vm._v("结算(" + _vm._s(_vm.shopNumber) + ")")])])])])])])
},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: ["shop-address-wrapper"]
  }, [_c('text', {
    staticClass: ["iconFont", "iconfont-address"]
  }, [_vm._v("")]), _c('text', {
    staticClass: ["shop-address-text"]
  }, [_vm._v("绿白菜滨湖春融苑店")])])
}]}
module.exports.render._withStripped = true

/***/ }),

/***/ 3:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var g;

// This works in non-strict mode
g = function () {
	return this;
}();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1, eval)("this");
} catch (e) {
	// This works if the window reference is available
	if ((typeof window === "undefined" ? "undefined" : _typeof(window)) === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;

/***/ }),

/***/ 38:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = __webpack_require__(39);

Object.defineProperty(exports, 'default', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_index).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),

/***/ 39:
/***/ (function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = []

/* styles */
__vue_styles__.push(__webpack_require__(40)
)

/* script */
__vue_exports__ = __webpack_require__(41)

/* template */
var __vue_template__ = __webpack_require__(42)
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
__vue_options__.__file = "F:\\WebApp\\cabbage\\node_modules\\weex-ui\\packages\\wxc-cell\\index.vue"
__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
__vue_options__._scopeId = "data-v-cdfc23d8"
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

/***/ 40:
/***/ (function(module, exports) {

module.exports = {
  "wxc-cell": {
    "flexDirection": "row",
    "alignItems": "center",
    "paddingLeft": "24",
    "paddingRight": "24",
    "backgroundColor": "#ffffff"
  },
  "cell-margin": {
    "marginBottom": "24"
  },
  "cell-title": {
    "flex": 1
  },
  "cell-indent": {
    "paddingBottom": "30",
    "paddingTop": "30"
  },
  "has-desc": {
    "paddingBottom": "18",
    "paddingTop": "18"
  },
  "cell-top-border": {
    "borderTopColor": "#e2e2e2",
    "borderTopWidth": "1"
  },
  "cell-bottom-border": {
    "borderBottomColor": "#e2e2e2",
    "borderBottomWidth": "1"
  },
  "cell-label-text": {
    "fontSize": "30",
    "color": "#666666",
    "width": "188",
    "marginRight": "10"
  },
  "cell-arrow-icon": {
    "width": "22",
    "height": "22"
  },
  "cell-content": {
    "color": "#333333",
    "fontSize": "30",
    "lineHeight": "40"
  },
  "cell-desc-text": {
    "color": "#999999",
    "fontSize": "24",
    "lineHeight": "30",
    "marginTop": "4",
    "marginRight": "30"
  },
  "extra-content-text": {
    "fontSize": "28",
    "color": "#999999",
    "marginRight": "4"
  }
}

/***/ }),

/***/ 41:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _utils = __webpack_require__(2);

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  props: {
    label: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    },
    extraContent: {
      type: String,
      default: ''
    },
    desc: {
      type: String,
      default: ''
    },
    link: {
      type: String,
      default: ''
    },
    hasTopBorder: {
      type: Boolean,
      default: false
    },
    hasMargin: {
      type: Boolean,
      default: false
    },
    hasBottomBorder: {
      type: Boolean,
      default: true
    },
    hasArrow: {
      type: Boolean,
      default: false
    },
    arrowIcon: {
      type: String,
      default: 'https://gw.alicdn.com/tfs/TB11zBUpwMPMeJjy1XbXXcwxVXa-22-22.png'
    },
    hasVerticalIndent: {
      type: Boolean,
      default: true
    },
    cellStyle: {
      type: Object,
      default: function _default() {
        return {};
      }
    },
    autoAccessible: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    cellClicked: function cellClicked(e) {
      var link = this.link;
      this.$emit('wxcCellClicked', { e: e });
      link && _utils2.default.goToH5Page(link, true);
    }
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

/***/ }),

/***/ 42:
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    class: ['wxc-cell', _vm.hasTopBorder && 'cell-top-border', _vm.hasBottomBorder && 'cell-bottom-border', _vm.hasMargin && 'cell-margin', _vm.hasVerticalIndent && 'cell-indent', _vm.desc && 'has-desc'],
    style: _vm.cellStyle,
    attrs: {
      "accessible": _vm.autoAccessible,
      "ariaLabel": (_vm.label + "," + _vm.title + "," + _vm.desc)
    },
    on: {
      "click": _vm.cellClicked
    }
  }, [_vm._t("label", [(_vm.label) ? _c('div', [_c('text', {
    staticClass: ["cell-label-text"]
  }, [_vm._v(_vm._s(_vm.label))])]) : _vm._e()]), _c('div', {
    staticClass: ["cell-title"]
  }, [_vm._t("title", [_c('text', {
    staticClass: ["cell-content"]
  }, [_vm._v(_vm._s(_vm.title))]), (_vm.desc) ? _c('text', {
    staticClass: ["cell-desc-text"]
  }, [_vm._v(_vm._s(_vm.desc))]) : _vm._e()])], 2), _vm._t("value"), _vm._t("default"), (_vm.extraContent) ? _c('text', {
    staticClass: ["extra-content-text"]
  }, [_vm._v(_vm._s(_vm.extraContent))]) : _vm._e(), (_vm.hasArrow) ? _c('image', {
    staticClass: ["cell-arrow-icon"],
    attrs: {
      "src": _vm.arrowIcon,
      "ariaHidden": true
    }
  }) : _vm._e()], 2)
},staticRenderFns: []}
module.exports.render._withStripped = true

/***/ }),

/***/ 43:
/***/ (function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = []

/* styles */
__vue_styles__.push(__webpack_require__(62)
)

/* script */
__vue_exports__ = __webpack_require__(63)

/* template */
var __vue_template__ = __webpack_require__(65)
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
__vue_options__.__file = "F:\\WebApp\\cabbage\\node_modules\\weex-ui\\packages\\wxc-checkbox\\index.vue"
__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
__vue_options__._scopeId = "data-v-29104935"
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

/***/ 54:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = __webpack_require__(55);

Object.defineProperty(exports, 'default', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_index).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),

/***/ 55:
/***/ (function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = []

/* styles */
__vue_styles__.push(__webpack_require__(56)
)

/* script */
__vue_exports__ = __webpack_require__(57)

/* template */
var __vue_template__ = __webpack_require__(58)
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
__vue_options__.__file = "F:\\WebApp\\cabbage\\node_modules\\weex-ui\\packages\\wxc-stepper\\index.vue"
__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
__vue_options__._scopeId = "data-v-7edddefb"
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

/***/ 56:
/***/ (function(module, exports) {

module.exports = {
  "wxc-stepper": {
    "flexDirection": "row"
  },
  "stepper-plus": {
    "width": "56",
    "height": "56",
    "backgroundColor": "#ededed",
    "alignItems": "center",
    "justifyContent": "center",
    "borderRadius": "6"
  },
  "stepper-minus": {
    "width": "56",
    "height": "56",
    "backgroundColor": "#ededed",
    "alignItems": "center",
    "justifyContent": "center",
    "borderRadius": "6"
  },
  "stepper-input": {
    "borderWidth": 0,
    "textAlign": "center",
    "color": "#3d3d3d",
    "fontSize": "30",
    "lineHeight": "56",
    "width": "86"
  },
  "stepper-icon": {
    "fontSize": "36",
    "color": "#666666",
    "marginTop": "-4"
  }
}

/***/ }),

/***/ 57:
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
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
  props: {
    min: {
      type: [String, Number],
      default: 1
    },
    max: {
      type: [String, Number],
      default: 100
    },
    step: {
      type: [String, Number],
      default: 1
    },
    disabled: {
      type: Boolean,
      default: false
    },
    defaultValue: {
      type: [String, Number],
      default: 1
    },
    readOnly: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    disableStyle: function disableStyle() {
      if (this.disabled) {
        return {
          color: '#cccccc'
        };
      }
    },
    valueString: function valueString() {
      return this.value.toString();
    }
  },
  data: function data() {
    return {
      value: 1,
      isLess: false,
      isOver: false
    };
  },
  watch: {
    defaultValue: function defaultValue(newNum) {
      this.value = newNum;
    }
  },
  created: function created() {
    this.value = parseInt(this.defaultValue, 10);
    if (this.disabled) {
      this.isLess = true;
      this.isOver = true;
    }
  },

  methods: {
    minusClicked: function minusClicked() {
      if (this.disabled) {
        return;
      }
      var isMinOver = this.value <= this.min;
      var nowNum = this.value - parseInt(this.step, 10);
      if (isMinOver) {
        this.$emit('wxcStepperValueIsMinOver', { value: this.value });
      } else {
        this.value = nowNum;
        this.resetDisabledStyle();
      }
      // 由于此处已经减step
      if (nowNum <= this.min) {
        this.value = parseInt(this.min, 10);
        this.isLess = true;
      }
      this.$emit('wxcStepperValueChanged', { value: this.value });
    },
    plusClicked: function plusClicked() {
      if (this.disabled) {
        return;
      }
      var isMaxOver = this.value >= this.max;
      var nowNum = this.value + parseInt(this.step, 10);
      if (isMaxOver) {
        this.$emit('wxcStepperValueIsMaxOver', { value: this.value });
      } else {
        this.value = nowNum;
        this.resetDisabledStyle();
      }
      // 由于此处已经加step
      if (nowNum >= this.max) {
        this.value = parseInt(this.max, 10);
        this.isOver = true;
      }
      this.$emit('wxcStepperValueChanged', { value: this.value });
    },
    onInput: function onInput(e) {
      this.correctInputValue(e.value);
    },
    onBlur: function onBlur(e) {
      this.correctInputValue(e.value);
    },
    correctInputValue: function correctInputValue(v) {
      if (/^[1-9]\d{0,}$/.test(v) && parseInt(v, 10) >= this.min && parseInt(v, 10) <= this.max) {
        this.value = parseInt(v, 10);
      }
      this.$emit('wxcStepperValueChanged', { value: this.value });
    },
    resetDisabledStyle: function resetDisabledStyle() {
      this.isLess = false;
      this.isOver = false;
    }
  }
};

/***/ }),

/***/ 58:
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: ["wxc-stepper"]
  }, [_c('div', {
    staticClass: ["stepper-minus"],
    attrs: {
      "ariaLabel": "减数",
      "accessible": true
    },
    on: {
      "click": _vm.minusClicked
    }
  }, [_c('text', {
    staticClass: ["stepper-icon"],
    style: {
      color: _vm.isLess ? '#cccccc' : '#666666'
    }
  }, [_vm._v("-")])]), _c('input', {
    staticClass: ["stepper-input"],
    style: _vm.disableStyle,
    attrs: {
      "type": "number",
      "value": _vm.valueString,
      "disabled": _vm.disabled || _vm.readOnly
    },
    on: {
      "input": _vm.onInput,
      "blur": _vm.onBlur
    }
  }), _c('div', {
    staticClass: ["stepper-plus"],
    attrs: {
      "ariaLabel": "加数",
      "accessible": true
    },
    on: {
      "click": _vm.plusClicked
    }
  }, [_c('text', {
    staticClass: ["stepper-icon"],
    style: {
      color: _vm.isOver ? '#cccccc' : '#666666'
    }
  }, [_vm._v("+")])])])
},staticRenderFns: []}
module.exports.render._withStripped = true

/***/ }),

/***/ 59:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = __webpack_require__(60);

Object.defineProperty(exports, 'default', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_index).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),

/***/ 60:
/***/ (function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = []

/* script */
__vue_exports__ = __webpack_require__(61)

/* template */
var __vue_template__ = __webpack_require__(66)
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
__vue_options__.__file = "F:\\WebApp\\cabbage\\node_modules\\weex-ui\\packages\\wxc-checkbox-list\\index.vue"
__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
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

/***/ 61:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = __webpack_require__(43);

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  components: { WxcCheckbox: _index2.default },
  props: {
    list: {
      type: Array,
      default: function _default() {
        return [];
      }
    },
    config: {
      type: Object,
      default: function _default() {
        return {};
      }
    }
  },
  data: function data() {
    return {
      checkedList: []
    };
  },
  created: function created() {
    var _this = this;

    var list = this.list;

    if (list && list.length > 0) {
      list.forEach(function (item, i) {
        item.checked && _this.checkedList.push(item.value);
      });
    }
  },

  methods: {
    wxcCheckBoxItemChecked: function wxcCheckBoxItemChecked(e) {
      if (e.checked) {
        this.checkedList.push(e.value);
      } else {
        var index = this.checkedList.indexOf(e.value);
        this.checkedList.splice(index, 1);
      }
      this.$emit('wxcCheckBoxListChecked', { checkedList: this.checkedList });
    }
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

/***/ }),

/***/ 62:
/***/ (function(module, exports) {

module.exports = {
  "checkbox": {
    "width": "48",
    "height": "48"
  },
  "title-text": {
    "fontSize": "30"
  }
}

/***/ }),

/***/ 63:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _wxcCell = __webpack_require__(38);

var _wxcCell2 = _interopRequireDefault(_wxcCell);

var _type = __webpack_require__(64);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } } //
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
  components: { WxcCell: _wxcCell2.default },
  props: {
    hasTopBorder: {
      type: Boolean,
      default: false
    },
    hasBottomBorder: {
      type: Boolean,
      default: true
    },
    title: {
      type: String,
      require: true
    },
    value: {
      type: [String, Number, Object],
      require: true
    },
    disabled: {
      type: Boolean,
      default: false
    },
    checked: {
      type: Boolean,
      default: false
    },
    config: {
      type: Object,
      default: function _default() {
        return {};
      }
    }
  },
  data: function data() {
    return {
      icon: [_type.CHECKED, _type.UNCHECKED, _type.CHECKED_DISABLED, _type.UNCHECKED_DISABLED],
      color: '#3D3D3D',
      innerChecked: false
    };
  },
  computed: {
    checkIcon: function checkIcon() {
      var icon = this.icon,
          disabled = this.disabled,
          innerChecked = this.innerChecked,
          config = this.config;

      var mergeIcon = [].concat(_toConsumableArray(icon));
      config.checkedIcon && (mergeIcon[0] = config.checkedIcon);
      config.unCheckedIcon && (mergeIcon[1] = config.unCheckedIcon);
      config.checkedDisabledIcon && (mergeIcon[2] = config.checkedDisabledIcon);
      config.unCheckedDisabledIcon && (mergeIcon[3] = config.unCheckedDisabledIcon);
      if (disabled) {
        return mergeIcon[innerChecked ? 2 : 3];
      } else {
        return mergeIcon[innerChecked ? 0 : 1];
      }
    },
    textColor: function textColor() {
      var innerChecked = this.innerChecked,
          disabled = this.disabled,
          config = this.config;

      var checkedColor = config.checkedColor ? config.checkedColor : '#EE9900';
      return innerChecked && !disabled ? checkedColor : '#3D3D3D';
    }
  },
  watch: {
    checked: function checked(newChecked) {
      this.innerChecked = newChecked;
    }
  },
  created: function created() {
    var checked = this.checked;

    this.innerChecked = checked;
  },

  methods: {
    wxcCellClicked: function wxcCellClicked() {
      var disabled = this.disabled,
          innerChecked = this.innerChecked,
          value = this.value;

      if (!disabled) {
        this.innerChecked = !innerChecked;
        this.$emit('wxcCheckBoxItemChecked', { value: value, checked: this.innerChecked });
      }
    }
  }
};

/***/ }),

/***/ 64:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * CopyRight (C) 2017-2022 Alibaba Group Holding Limited.
 * Created by Tw93 on 2017/10/21.
 */

var CHECKED = exports.CHECKED = 'https://gw.alicdn.com/tfs/TB14fp2pwMPMeJjy1XbXXcwxVXa-72-72.png';
var UNCHECKED = exports.UNCHECKED = 'https://gw.alicdn.com/tfs/TB1U6SbpwMPMeJjy1XcXXXpppXa-72-72.png';
var CHECKED_DISABLED = exports.CHECKED_DISABLED = 'https://gw.alicdn.com/tfs/TB1aPabpwMPMeJjy1XcXXXpppXa-72-72.png';
var UNCHECKED_DISABLED = exports.UNCHECKED_DISABLED = 'https://gw.alicdn.com/tfs/TB1lTuzpwoQMeJjy0FoXXcShVXa-72-72.png';

/***/ }),

/***/ 65:
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('wxc-cell', {
    attrs: {
      "hasTopBorder": _vm.hasTopBorder,
      "hasBottomBorder": _vm.hasBottomBorder,
      "accessible": true,
      "ariaLabel": (_vm.title + ",状态为" + (_vm.checked ? '已选中' : '未选中') + "," + (_vm.disabled ? '不可更改' : '点击可切换'))
    },
    on: {
      "wxcCellClicked": _vm.wxcCellClicked
    }
  }, [_c('text', {
    staticClass: ["title-text"],
    style: {
      color: _vm.textColor
    },
    attrs: {
      "slot": "title"
    },
    slot: "title"
  }, [_vm._v(_vm._s(_vm.title))]), _c('image', {
    staticClass: ["checkbox"],
    attrs: {
      "slot": "value",
      "src": _vm.checkIcon
    },
    slot: "value"
  })])
},staticRenderFns: []}
module.exports.render._withStripped = true

/***/ }),

/***/ 66:
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', _vm._l((_vm.list), function(item, i) {
    return _c('wxc-checkbox', _vm._b({
      key: i,
      attrs: {
        "config": _vm.config
      },
      on: {
        "wxcCheckBoxItemChecked": _vm.wxcCheckBoxItemChecked
      }
    }, 'wxc-checkbox', item, false))
  }))
},staticRenderFns: []}
module.exports.render._withStripped = true

/***/ }),

/***/ 67:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = __webpack_require__(43);

Object.defineProperty(exports, 'default', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_index).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),

/***/ 9:
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

/***/ })

/******/ });