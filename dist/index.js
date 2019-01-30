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
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
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
/* 1 */
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
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = []

/* styles */
__vue_styles__.push(__webpack_require__(43)
)

/* script */
__vue_exports__ = __webpack_require__(44)

/* template */
var __vue_template__ = __webpack_require__(55)
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
__vue_options__._scopeId = "data-v-30c69e5a"
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
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/*global Vue*/
// import router from './router'
/* weex initialized here, please do not move this line */
var router = __webpack_require__(4);
var App = __webpack_require__(71);
// const App = require('@/components/class/class.	vue');//分类
// const App = require('@/components/shop/shop.vue');//购物
// const App = require('@/components/shop/setlemet.vue');//
// const App = require('@/components/my/my.vue');//我的
// const App = require('@/components/other/find.vue');//发现
// const App = require('@/components/other/congratulate.vue');//新年贺岁
// const App = require('@/components/seafood/seafood.vue');//海鲜水产
// const App = require('@/components/sign/signInfo.vue');//签到记录
// const App = require('@/components/sign/sign.vue');//签到
// const App = require('@/components/search/search.vue');//搜索页面
// const App = require('@/components/collection/collection.vue');//我的收藏
// const App = require('@/components/coupon/coupon.vue');//优惠券
// const App = require('@/components/coupon/myCoupon.vue');//我的优惠券
// const App = require('@/components/information/information.vue');//信息通知
// const App = require('@/components/reward/reward.vue');//我的奖励
// const App = require('@/components/register/register.vue');//注册
// const App = require('@/components/login/login.vue');//登录
// const App = require('@/components/checkstand/checkstand.vue');//测试
/* eslint-disable no-new */
new Vue(Vue.util.extend({ el: '#root', router: router }, App));
router.push('/');

// ///////////////////////////////////////////////////
// 
// weex compile src dist编辑文件生成对应的js入口文件 实现页面的跳转

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _vueRouter = __webpack_require__(5);

var _vueRouter2 = _interopRequireDefault(_vueRouter);

var _home = __webpack_require__(6);

var _home2 = _interopRequireDefault(_home);

var _class = __webpack_require__(14);

var _class2 = _interopRequireDefault(_class);

var _shop = __webpack_require__(32);

var _shop2 = _interopRequireDefault(_shop);

var _goods = __webpack_require__(63);

var _goods2 = _interopRequireDefault(_goods);

var _my = __webpack_require__(67);

var _my2 = _interopRequireDefault(_my);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*global Vue*/
Vue.use(_vueRouter2.default);
module.exports = new _vueRouter2.default({
  linkActiveClass: 'active',
  routes: [{
    path: '/',
    redirect: '/home'
  }, {
    path: '/home',
    component: _home2.default
  }, {
    path: '/classes',
    component: _class2.default
  }, {
    path: '/shop',
    component: _shop2.default
  }, {
    path: '/goods',
    component: _goods2.default
  }, {
    path: '/my',
    component: _my2.default
  }]
});

/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/*!
  * vue-router v3.0.2
  * (c) 2018 Evan You
  * @license MIT
  */
/*  */

function assert (condition, message) {
  if (!condition) {
    throw new Error(("[vue-router] " + message))
  }
}

function warn (condition, message) {
  if ("development" !== 'production' && !condition) {
    typeof console !== 'undefined' && console.warn(("[vue-router] " + message));
  }
}

function isError (err) {
  return Object.prototype.toString.call(err).indexOf('Error') > -1
}

function extend (a, b) {
  for (var key in b) {
    a[key] = b[key];
  }
  return a
}

var View = {
  name: 'RouterView',
  functional: true,
  props: {
    name: {
      type: String,
      default: 'default'
    }
  },
  render: function render (_, ref) {
    var props = ref.props;
    var children = ref.children;
    var parent = ref.parent;
    var data = ref.data;

    // used by devtools to display a router-view badge
    data.routerView = true;

    // directly use parent context's createElement() function
    // so that components rendered by router-view can resolve named slots
    var h = parent.$createElement;
    var name = props.name;
    var route = parent.$route;
    var cache = parent._routerViewCache || (parent._routerViewCache = {});

    // determine current view depth, also check to see if the tree
    // has been toggled inactive but kept-alive.
    var depth = 0;
    var inactive = false;
    while (parent && parent._routerRoot !== parent) {
      if (parent.$vnode && parent.$vnode.data.routerView) {
        depth++;
      }
      if (parent._inactive) {
        inactive = true;
      }
      parent = parent.$parent;
    }
    data.routerViewDepth = depth;

    // render previous view if the tree is inactive and kept-alive
    if (inactive) {
      return h(cache[name], data, children)
    }

    var matched = route.matched[depth];
    // render empty node if no matched route
    if (!matched) {
      cache[name] = null;
      return h()
    }

    var component = cache[name] = matched.components[name];

    // attach instance registration hook
    // this will be called in the instance's injected lifecycle hooks
    data.registerRouteInstance = function (vm, val) {
      // val could be undefined for unregistration
      var current = matched.instances[name];
      if (
        (val && current !== vm) ||
        (!val && current === vm)
      ) {
        matched.instances[name] = val;
      }
    }

    // also register instance in prepatch hook
    // in case the same component instance is reused across different routes
    ;(data.hook || (data.hook = {})).prepatch = function (_, vnode) {
      matched.instances[name] = vnode.componentInstance;
    };

    // resolve props
    var propsToPass = data.props = resolveProps(route, matched.props && matched.props[name]);
    if (propsToPass) {
      // clone to prevent mutation
      propsToPass = data.props = extend({}, propsToPass);
      // pass non-declared props as attrs
      var attrs = data.attrs = data.attrs || {};
      for (var key in propsToPass) {
        if (!component.props || !(key in component.props)) {
          attrs[key] = propsToPass[key];
          delete propsToPass[key];
        }
      }
    }

    return h(component, data, children)
  }
}

function resolveProps (route, config) {
  switch (typeof config) {
    case 'undefined':
      return
    case 'object':
      return config
    case 'function':
      return config(route)
    case 'boolean':
      return config ? route.params : undefined
    default:
      if (true) {
        warn(
          false,
          "props in \"" + (route.path) + "\" is a " + (typeof config) + ", " +
          "expecting an object, function or boolean."
        );
      }
  }
}

/*  */

var encodeReserveRE = /[!'()*]/g;
var encodeReserveReplacer = function (c) { return '%' + c.charCodeAt(0).toString(16); };
var commaRE = /%2C/g;

// fixed encodeURIComponent which is more conformant to RFC3986:
// - escapes [!'()*]
// - preserve commas
var encode = function (str) { return encodeURIComponent(str)
  .replace(encodeReserveRE, encodeReserveReplacer)
  .replace(commaRE, ','); };

var decode = decodeURIComponent;

function resolveQuery (
  query,
  extraQuery,
  _parseQuery
) {
  if ( extraQuery === void 0 ) extraQuery = {};

  var parse = _parseQuery || parseQuery;
  var parsedQuery;
  try {
    parsedQuery = parse(query || '');
  } catch (e) {
    "development" !== 'production' && warn(false, e.message);
    parsedQuery = {};
  }
  for (var key in extraQuery) {
    parsedQuery[key] = extraQuery[key];
  }
  return parsedQuery
}

function parseQuery (query) {
  var res = {};

  query = query.trim().replace(/^(\?|#|&)/, '');

  if (!query) {
    return res
  }

  query.split('&').forEach(function (param) {
    var parts = param.replace(/\+/g, ' ').split('=');
    var key = decode(parts.shift());
    var val = parts.length > 0
      ? decode(parts.join('='))
      : null;

    if (res[key] === undefined) {
      res[key] = val;
    } else if (Array.isArray(res[key])) {
      res[key].push(val);
    } else {
      res[key] = [res[key], val];
    }
  });

  return res
}

function stringifyQuery (obj) {
  var res = obj ? Object.keys(obj).map(function (key) {
    var val = obj[key];

    if (val === undefined) {
      return ''
    }

    if (val === null) {
      return encode(key)
    }

    if (Array.isArray(val)) {
      var result = [];
      val.forEach(function (val2) {
        if (val2 === undefined) {
          return
        }
        if (val2 === null) {
          result.push(encode(key));
        } else {
          result.push(encode(key) + '=' + encode(val2));
        }
      });
      return result.join('&')
    }

    return encode(key) + '=' + encode(val)
  }).filter(function (x) { return x.length > 0; }).join('&') : null;
  return res ? ("?" + res) : ''
}

/*  */

var trailingSlashRE = /\/?$/;

function createRoute (
  record,
  location,
  redirectedFrom,
  router
) {
  var stringifyQuery$$1 = router && router.options.stringifyQuery;

  var query = location.query || {};
  try {
    query = clone(query);
  } catch (e) {}

  var route = {
    name: location.name || (record && record.name),
    meta: (record && record.meta) || {},
    path: location.path || '/',
    hash: location.hash || '',
    query: query,
    params: location.params || {},
    fullPath: getFullPath(location, stringifyQuery$$1),
    matched: record ? formatMatch(record) : []
  };
  if (redirectedFrom) {
    route.redirectedFrom = getFullPath(redirectedFrom, stringifyQuery$$1);
  }
  return Object.freeze(route)
}

function clone (value) {
  if (Array.isArray(value)) {
    return value.map(clone)
  } else if (value && typeof value === 'object') {
    var res = {};
    for (var key in value) {
      res[key] = clone(value[key]);
    }
    return res
  } else {
    return value
  }
}

// the starting route that represents the initial state
var START = createRoute(null, {
  path: '/'
});

function formatMatch (record) {
  var res = [];
  while (record) {
    res.unshift(record);
    record = record.parent;
  }
  return res
}

function getFullPath (
  ref,
  _stringifyQuery
) {
  var path = ref.path;
  var query = ref.query; if ( query === void 0 ) query = {};
  var hash = ref.hash; if ( hash === void 0 ) hash = '';

  var stringify = _stringifyQuery || stringifyQuery;
  return (path || '/') + stringify(query) + hash
}

function isSameRoute (a, b) {
  if (b === START) {
    return a === b
  } else if (!b) {
    return false
  } else if (a.path && b.path) {
    return (
      a.path.replace(trailingSlashRE, '') === b.path.replace(trailingSlashRE, '') &&
      a.hash === b.hash &&
      isObjectEqual(a.query, b.query)
    )
  } else if (a.name && b.name) {
    return (
      a.name === b.name &&
      a.hash === b.hash &&
      isObjectEqual(a.query, b.query) &&
      isObjectEqual(a.params, b.params)
    )
  } else {
    return false
  }
}

function isObjectEqual (a, b) {
  if ( a === void 0 ) a = {};
  if ( b === void 0 ) b = {};

  // handle null value #1566
  if (!a || !b) { return a === b }
  var aKeys = Object.keys(a);
  var bKeys = Object.keys(b);
  if (aKeys.length !== bKeys.length) {
    return false
  }
  return aKeys.every(function (key) {
    var aVal = a[key];
    var bVal = b[key];
    // check nested equality
    if (typeof aVal === 'object' && typeof bVal === 'object') {
      return isObjectEqual(aVal, bVal)
    }
    return String(aVal) === String(bVal)
  })
}

function isIncludedRoute (current, target) {
  return (
    current.path.replace(trailingSlashRE, '/').indexOf(
      target.path.replace(trailingSlashRE, '/')
    ) === 0 &&
    (!target.hash || current.hash === target.hash) &&
    queryIncludes(current.query, target.query)
  )
}

function queryIncludes (current, target) {
  for (var key in target) {
    if (!(key in current)) {
      return false
    }
  }
  return true
}

/*  */

// work around weird flow bug
var toTypes = [String, Object];
var eventTypes = [String, Array];

var Link = {
  name: 'RouterLink',
  props: {
    to: {
      type: toTypes,
      required: true
    },
    tag: {
      type: String,
      default: 'a'
    },
    exact: Boolean,
    append: Boolean,
    replace: Boolean,
    activeClass: String,
    exactActiveClass: String,
    event: {
      type: eventTypes,
      default: 'click'
    }
  },
  render: function render (h) {
    var this$1 = this;

    var router = this.$router;
    var current = this.$route;
    var ref = router.resolve(this.to, current, this.append);
    var location = ref.location;
    var route = ref.route;
    var href = ref.href;

    var classes = {};
    var globalActiveClass = router.options.linkActiveClass;
    var globalExactActiveClass = router.options.linkExactActiveClass;
    // Support global empty active class
    var activeClassFallback = globalActiveClass == null
      ? 'router-link-active'
      : globalActiveClass;
    var exactActiveClassFallback = globalExactActiveClass == null
      ? 'router-link-exact-active'
      : globalExactActiveClass;
    var activeClass = this.activeClass == null
      ? activeClassFallback
      : this.activeClass;
    var exactActiveClass = this.exactActiveClass == null
      ? exactActiveClassFallback
      : this.exactActiveClass;
    var compareTarget = location.path
      ? createRoute(null, location, null, router)
      : route;

    classes[exactActiveClass] = isSameRoute(current, compareTarget);
    classes[activeClass] = this.exact
      ? classes[exactActiveClass]
      : isIncludedRoute(current, compareTarget);

    var handler = function (e) {
      if (guardEvent(e)) {
        if (this$1.replace) {
          router.replace(location);
        } else {
          router.push(location);
        }
      }
    };

    var on = { click: guardEvent };
    if (Array.isArray(this.event)) {
      this.event.forEach(function (e) { on[e] = handler; });
    } else {
      on[this.event] = handler;
    }

    var data = {
      class: classes
    };

    if (this.tag === 'a') {
      data.on = on;
      data.attrs = { href: href };
    } else {
      // find the first <a> child and apply listener and href
      var a = findAnchor(this.$slots.default);
      if (a) {
        // in case the <a> is a static node
        a.isStatic = false;
        var aData = a.data = extend({}, a.data);
        aData.on = on;
        var aAttrs = a.data.attrs = extend({}, a.data.attrs);
        aAttrs.href = href;
      } else {
        // doesn't have <a> child, apply listener to self
        data.on = on;
      }
    }

    return h(this.tag, data, this.$slots.default)
  }
}

function guardEvent (e) {
  // don't redirect with control keys
  if (e.metaKey || e.altKey || e.ctrlKey || e.shiftKey) { return }
  // don't redirect when preventDefault called
  if (e.defaultPrevented) { return }
  // don't redirect on right click
  if (e.button !== undefined && e.button !== 0) { return }
  // don't redirect if `target="_blank"`
  if (e.currentTarget && e.currentTarget.getAttribute) {
    var target = e.currentTarget.getAttribute('target');
    if (/\b_blank\b/i.test(target)) { return }
  }
  // this may be a Weex event which doesn't have this method
  if (e.preventDefault) {
    e.preventDefault();
  }
  return true
}

function findAnchor (children) {
  if (children) {
    var child;
    for (var i = 0; i < children.length; i++) {
      child = children[i];
      if (child.tag === 'a') {
        return child
      }
      if (child.children && (child = findAnchor(child.children))) {
        return child
      }
    }
  }
}

var _Vue;

function install (Vue) {
  if (install.installed && _Vue === Vue) { return }
  install.installed = true;

  _Vue = Vue;

  var isDef = function (v) { return v !== undefined; };

  var registerInstance = function (vm, callVal) {
    var i = vm.$options._parentVnode;
    if (isDef(i) && isDef(i = i.data) && isDef(i = i.registerRouteInstance)) {
      i(vm, callVal);
    }
  };

  Vue.mixin({
    beforeCreate: function beforeCreate () {
      if (isDef(this.$options.router)) {
        this._routerRoot = this;
        this._router = this.$options.router;
        this._router.init(this);
        Vue.util.defineReactive(this, '_route', this._router.history.current);
      } else {
        this._routerRoot = (this.$parent && this.$parent._routerRoot) || this;
      }
      registerInstance(this, this);
    },
    destroyed: function destroyed () {
      registerInstance(this);
    }
  });

  Object.defineProperty(Vue.prototype, '$router', {
    get: function get () { return this._routerRoot._router }
  });

  Object.defineProperty(Vue.prototype, '$route', {
    get: function get () { return this._routerRoot._route }
  });

  Vue.component('RouterView', View);
  Vue.component('RouterLink', Link);

  var strats = Vue.config.optionMergeStrategies;
  // use the same hook merging strategy for route hooks
  strats.beforeRouteEnter = strats.beforeRouteLeave = strats.beforeRouteUpdate = strats.created;
}

/*  */

var inBrowser = typeof window !== 'undefined';

/*  */

function resolvePath (
  relative,
  base,
  append
) {
  var firstChar = relative.charAt(0);
  if (firstChar === '/') {
    return relative
  }

  if (firstChar === '?' || firstChar === '#') {
    return base + relative
  }

  var stack = base.split('/');

  // remove trailing segment if:
  // - not appending
  // - appending to trailing slash (last segment is empty)
  if (!append || !stack[stack.length - 1]) {
    stack.pop();
  }

  // resolve relative path
  var segments = relative.replace(/^\//, '').split('/');
  for (var i = 0; i < segments.length; i++) {
    var segment = segments[i];
    if (segment === '..') {
      stack.pop();
    } else if (segment !== '.') {
      stack.push(segment);
    }
  }

  // ensure leading slash
  if (stack[0] !== '') {
    stack.unshift('');
  }

  return stack.join('/')
}

function parsePath (path) {
  var hash = '';
  var query = '';

  var hashIndex = path.indexOf('#');
  if (hashIndex >= 0) {
    hash = path.slice(hashIndex);
    path = path.slice(0, hashIndex);
  }

  var queryIndex = path.indexOf('?');
  if (queryIndex >= 0) {
    query = path.slice(queryIndex + 1);
    path = path.slice(0, queryIndex);
  }

  return {
    path: path,
    query: query,
    hash: hash
  }
}

function cleanPath (path) {
  return path.replace(/\/\//g, '/')
}

var isarray = Array.isArray || function (arr) {
  return Object.prototype.toString.call(arr) == '[object Array]';
};

/**
 * Expose `pathToRegexp`.
 */
var pathToRegexp_1 = pathToRegexp;
var parse_1 = parse;
var compile_1 = compile;
var tokensToFunction_1 = tokensToFunction;
var tokensToRegExp_1 = tokensToRegExp;

/**
 * The main path matching regexp utility.
 *
 * @type {RegExp}
 */
var PATH_REGEXP = new RegExp([
  // Match escaped characters that would otherwise appear in future matches.
  // This allows the user to escape special characters that won't transform.
  '(\\\\.)',
  // Match Express-style parameters and un-named parameters with a prefix
  // and optional suffixes. Matches appear as:
  //
  // "/:test(\\d+)?" => ["/", "test", "\d+", undefined, "?", undefined]
  // "/route(\\d+)"  => [undefined, undefined, undefined, "\d+", undefined, undefined]
  // "/*"            => ["/", undefined, undefined, undefined, undefined, "*"]
  '([\\/.])?(?:(?:\\:(\\w+)(?:\\(((?:\\\\.|[^\\\\()])+)\\))?|\\(((?:\\\\.|[^\\\\()])+)\\))([+*?])?|(\\*))'
].join('|'), 'g');

/**
 * Parse a string for the raw tokens.
 *
 * @param  {string}  str
 * @param  {Object=} options
 * @return {!Array}
 */
function parse (str, options) {
  var tokens = [];
  var key = 0;
  var index = 0;
  var path = '';
  var defaultDelimiter = options && options.delimiter || '/';
  var res;

  while ((res = PATH_REGEXP.exec(str)) != null) {
    var m = res[0];
    var escaped = res[1];
    var offset = res.index;
    path += str.slice(index, offset);
    index = offset + m.length;

    // Ignore already escaped sequences.
    if (escaped) {
      path += escaped[1];
      continue
    }

    var next = str[index];
    var prefix = res[2];
    var name = res[3];
    var capture = res[4];
    var group = res[5];
    var modifier = res[6];
    var asterisk = res[7];

    // Push the current path onto the tokens.
    if (path) {
      tokens.push(path);
      path = '';
    }

    var partial = prefix != null && next != null && next !== prefix;
    var repeat = modifier === '+' || modifier === '*';
    var optional = modifier === '?' || modifier === '*';
    var delimiter = res[2] || defaultDelimiter;
    var pattern = capture || group;

    tokens.push({
      name: name || key++,
      prefix: prefix || '',
      delimiter: delimiter,
      optional: optional,
      repeat: repeat,
      partial: partial,
      asterisk: !!asterisk,
      pattern: pattern ? escapeGroup(pattern) : (asterisk ? '.*' : '[^' + escapeString(delimiter) + ']+?')
    });
  }

  // Match any characters still remaining.
  if (index < str.length) {
    path += str.substr(index);
  }

  // If the path exists, push it onto the end.
  if (path) {
    tokens.push(path);
  }

  return tokens
}

/**
 * Compile a string to a template function for the path.
 *
 * @param  {string}             str
 * @param  {Object=}            options
 * @return {!function(Object=, Object=)}
 */
function compile (str, options) {
  return tokensToFunction(parse(str, options))
}

/**
 * Prettier encoding of URI path segments.
 *
 * @param  {string}
 * @return {string}
 */
function encodeURIComponentPretty (str) {
  return encodeURI(str).replace(/[\/?#]/g, function (c) {
    return '%' + c.charCodeAt(0).toString(16).toUpperCase()
  })
}

/**
 * Encode the asterisk parameter. Similar to `pretty`, but allows slashes.
 *
 * @param  {string}
 * @return {string}
 */
function encodeAsterisk (str) {
  return encodeURI(str).replace(/[?#]/g, function (c) {
    return '%' + c.charCodeAt(0).toString(16).toUpperCase()
  })
}

/**
 * Expose a method for transforming tokens into the path function.
 */
function tokensToFunction (tokens) {
  // Compile all the tokens into regexps.
  var matches = new Array(tokens.length);

  // Compile all the patterns before compilation.
  for (var i = 0; i < tokens.length; i++) {
    if (typeof tokens[i] === 'object') {
      matches[i] = new RegExp('^(?:' + tokens[i].pattern + ')$');
    }
  }

  return function (obj, opts) {
    var path = '';
    var data = obj || {};
    var options = opts || {};
    var encode = options.pretty ? encodeURIComponentPretty : encodeURIComponent;

    for (var i = 0; i < tokens.length; i++) {
      var token = tokens[i];

      if (typeof token === 'string') {
        path += token;

        continue
      }

      var value = data[token.name];
      var segment;

      if (value == null) {
        if (token.optional) {
          // Prepend partial segment prefixes.
          if (token.partial) {
            path += token.prefix;
          }

          continue
        } else {
          throw new TypeError('Expected "' + token.name + '" to be defined')
        }
      }

      if (isarray(value)) {
        if (!token.repeat) {
          throw new TypeError('Expected "' + token.name + '" to not repeat, but received `' + JSON.stringify(value) + '`')
        }

        if (value.length === 0) {
          if (token.optional) {
            continue
          } else {
            throw new TypeError('Expected "' + token.name + '" to not be empty')
          }
        }

        for (var j = 0; j < value.length; j++) {
          segment = encode(value[j]);

          if (!matches[i].test(segment)) {
            throw new TypeError('Expected all "' + token.name + '" to match "' + token.pattern + '", but received `' + JSON.stringify(segment) + '`')
          }

          path += (j === 0 ? token.prefix : token.delimiter) + segment;
        }

        continue
      }

      segment = token.asterisk ? encodeAsterisk(value) : encode(value);

      if (!matches[i].test(segment)) {
        throw new TypeError('Expected "' + token.name + '" to match "' + token.pattern + '", but received "' + segment + '"')
      }

      path += token.prefix + segment;
    }

    return path
  }
}

/**
 * Escape a regular expression string.
 *
 * @param  {string} str
 * @return {string}
 */
function escapeString (str) {
  return str.replace(/([.+*?=^!:${}()[\]|\/\\])/g, '\\$1')
}

/**
 * Escape the capturing group by escaping special characters and meaning.
 *
 * @param  {string} group
 * @return {string}
 */
function escapeGroup (group) {
  return group.replace(/([=!:$\/()])/g, '\\$1')
}

/**
 * Attach the keys as a property of the regexp.
 *
 * @param  {!RegExp} re
 * @param  {Array}   keys
 * @return {!RegExp}
 */
function attachKeys (re, keys) {
  re.keys = keys;
  return re
}

/**
 * Get the flags for a regexp from the options.
 *
 * @param  {Object} options
 * @return {string}
 */
function flags (options) {
  return options.sensitive ? '' : 'i'
}

/**
 * Pull out keys from a regexp.
 *
 * @param  {!RegExp} path
 * @param  {!Array}  keys
 * @return {!RegExp}
 */
function regexpToRegexp (path, keys) {
  // Use a negative lookahead to match only capturing groups.
  var groups = path.source.match(/\((?!\?)/g);

  if (groups) {
    for (var i = 0; i < groups.length; i++) {
      keys.push({
        name: i,
        prefix: null,
        delimiter: null,
        optional: false,
        repeat: false,
        partial: false,
        asterisk: false,
        pattern: null
      });
    }
  }

  return attachKeys(path, keys)
}

/**
 * Transform an array into a regexp.
 *
 * @param  {!Array}  path
 * @param  {Array}   keys
 * @param  {!Object} options
 * @return {!RegExp}
 */
function arrayToRegexp (path, keys, options) {
  var parts = [];

  for (var i = 0; i < path.length; i++) {
    parts.push(pathToRegexp(path[i], keys, options).source);
  }

  var regexp = new RegExp('(?:' + parts.join('|') + ')', flags(options));

  return attachKeys(regexp, keys)
}

/**
 * Create a path regexp from string input.
 *
 * @param  {string}  path
 * @param  {!Array}  keys
 * @param  {!Object} options
 * @return {!RegExp}
 */
function stringToRegexp (path, keys, options) {
  return tokensToRegExp(parse(path, options), keys, options)
}

/**
 * Expose a function for taking tokens and returning a RegExp.
 *
 * @param  {!Array}          tokens
 * @param  {(Array|Object)=} keys
 * @param  {Object=}         options
 * @return {!RegExp}
 */
function tokensToRegExp (tokens, keys, options) {
  if (!isarray(keys)) {
    options = /** @type {!Object} */ (keys || options);
    keys = [];
  }

  options = options || {};

  var strict = options.strict;
  var end = options.end !== false;
  var route = '';

  // Iterate over the tokens and create our regexp string.
  for (var i = 0; i < tokens.length; i++) {
    var token = tokens[i];

    if (typeof token === 'string') {
      route += escapeString(token);
    } else {
      var prefix = escapeString(token.prefix);
      var capture = '(?:' + token.pattern + ')';

      keys.push(token);

      if (token.repeat) {
        capture += '(?:' + prefix + capture + ')*';
      }

      if (token.optional) {
        if (!token.partial) {
          capture = '(?:' + prefix + '(' + capture + '))?';
        } else {
          capture = prefix + '(' + capture + ')?';
        }
      } else {
        capture = prefix + '(' + capture + ')';
      }

      route += capture;
    }
  }

  var delimiter = escapeString(options.delimiter || '/');
  var endsWithDelimiter = route.slice(-delimiter.length) === delimiter;

  // In non-strict mode we allow a slash at the end of match. If the path to
  // match already ends with a slash, we remove it for consistency. The slash
  // is valid at the end of a path match, not in the middle. This is important
  // in non-ending mode, where "/test/" shouldn't match "/test//route".
  if (!strict) {
    route = (endsWithDelimiter ? route.slice(0, -delimiter.length) : route) + '(?:' + delimiter + '(?=$))?';
  }

  if (end) {
    route += '$';
  } else {
    // In non-ending mode, we need the capturing groups to match as much as
    // possible by using a positive lookahead to the end or next path segment.
    route += strict && endsWithDelimiter ? '' : '(?=' + delimiter + '|$)';
  }

  return attachKeys(new RegExp('^' + route, flags(options)), keys)
}

/**
 * Normalize the given path string, returning a regular expression.
 *
 * An empty array can be passed in for the keys, which will hold the
 * placeholder key descriptions. For example, using `/user/:id`, `keys` will
 * contain `[{ name: 'id', delimiter: '/', optional: false, repeat: false }]`.
 *
 * @param  {(string|RegExp|Array)} path
 * @param  {(Array|Object)=}       keys
 * @param  {Object=}               options
 * @return {!RegExp}
 */
function pathToRegexp (path, keys, options) {
  if (!isarray(keys)) {
    options = /** @type {!Object} */ (keys || options);
    keys = [];
  }

  options = options || {};

  if (path instanceof RegExp) {
    return regexpToRegexp(path, /** @type {!Array} */ (keys))
  }

  if (isarray(path)) {
    return arrayToRegexp(/** @type {!Array} */ (path), /** @type {!Array} */ (keys), options)
  }

  return stringToRegexp(/** @type {string} */ (path), /** @type {!Array} */ (keys), options)
}
pathToRegexp_1.parse = parse_1;
pathToRegexp_1.compile = compile_1;
pathToRegexp_1.tokensToFunction = tokensToFunction_1;
pathToRegexp_1.tokensToRegExp = tokensToRegExp_1;

/*  */

// $flow-disable-line
var regexpCompileCache = Object.create(null);

function fillParams (
  path,
  params,
  routeMsg
) {
  try {
    var filler =
      regexpCompileCache[path] ||
      (regexpCompileCache[path] = pathToRegexp_1.compile(path));
    return filler(params || {}, { pretty: true })
  } catch (e) {
    if (true) {
      warn(false, ("missing param for " + routeMsg + ": " + (e.message)));
    }
    return ''
  }
}

/*  */

function createRouteMap (
  routes,
  oldPathList,
  oldPathMap,
  oldNameMap
) {
  // the path list is used to control path matching priority
  var pathList = oldPathList || [];
  // $flow-disable-line
  var pathMap = oldPathMap || Object.create(null);
  // $flow-disable-line
  var nameMap = oldNameMap || Object.create(null);

  routes.forEach(function (route) {
    addRouteRecord(pathList, pathMap, nameMap, route);
  });

  // ensure wildcard routes are always at the end
  for (var i = 0, l = pathList.length; i < l; i++) {
    if (pathList[i] === '*') {
      pathList.push(pathList.splice(i, 1)[0]);
      l--;
      i--;
    }
  }

  return {
    pathList: pathList,
    pathMap: pathMap,
    nameMap: nameMap
  }
}

function addRouteRecord (
  pathList,
  pathMap,
  nameMap,
  route,
  parent,
  matchAs
) {
  var path = route.path;
  var name = route.name;
  if (true) {
    assert(path != null, "\"path\" is required in a route configuration.");
    assert(
      typeof route.component !== 'string',
      "route config \"component\" for path: " + (String(path || name)) + " cannot be a " +
      "string id. Use an actual component instead."
    );
  }

  var pathToRegexpOptions = route.pathToRegexpOptions || {};
  var normalizedPath = normalizePath(
    path,
    parent,
    pathToRegexpOptions.strict
  );

  if (typeof route.caseSensitive === 'boolean') {
    pathToRegexpOptions.sensitive = route.caseSensitive;
  }

  var record = {
    path: normalizedPath,
    regex: compileRouteRegex(normalizedPath, pathToRegexpOptions),
    components: route.components || { default: route.component },
    instances: {},
    name: name,
    parent: parent,
    matchAs: matchAs,
    redirect: route.redirect,
    beforeEnter: route.beforeEnter,
    meta: route.meta || {},
    props: route.props == null
      ? {}
      : route.components
        ? route.props
        : { default: route.props }
  };

  if (route.children) {
    // Warn if route is named, does not redirect and has a default child route.
    // If users navigate to this route by name, the default child will
    // not be rendered (GH Issue #629)
    if (true) {
      if (route.name && !route.redirect && route.children.some(function (child) { return /^\/?$/.test(child.path); })) {
        warn(
          false,
          "Named Route '" + (route.name) + "' has a default child route. " +
          "When navigating to this named route (:to=\"{name: '" + (route.name) + "'\"), " +
          "the default child route will not be rendered. Remove the name from " +
          "this route and use the name of the default child route for named " +
          "links instead."
        );
      }
    }
    route.children.forEach(function (child) {
      var childMatchAs = matchAs
        ? cleanPath((matchAs + "/" + (child.path)))
        : undefined;
      addRouteRecord(pathList, pathMap, nameMap, child, record, childMatchAs);
    });
  }

  if (route.alias !== undefined) {
    var aliases = Array.isArray(route.alias)
      ? route.alias
      : [route.alias];

    aliases.forEach(function (alias) {
      var aliasRoute = {
        path: alias,
        children: route.children
      };
      addRouteRecord(
        pathList,
        pathMap,
        nameMap,
        aliasRoute,
        parent,
        record.path || '/' // matchAs
      );
    });
  }

  if (!pathMap[record.path]) {
    pathList.push(record.path);
    pathMap[record.path] = record;
  }

  if (name) {
    if (!nameMap[name]) {
      nameMap[name] = record;
    } else if ("development" !== 'production' && !matchAs) {
      warn(
        false,
        "Duplicate named routes definition: " +
        "{ name: \"" + name + "\", path: \"" + (record.path) + "\" }"
      );
    }
  }
}

function compileRouteRegex (path, pathToRegexpOptions) {
  var regex = pathToRegexp_1(path, [], pathToRegexpOptions);
  if (true) {
    var keys = Object.create(null);
    regex.keys.forEach(function (key) {
      warn(!keys[key.name], ("Duplicate param keys in route with path: \"" + path + "\""));
      keys[key.name] = true;
    });
  }
  return regex
}

function normalizePath (path, parent, strict) {
  if (!strict) { path = path.replace(/\/$/, ''); }
  if (path[0] === '/') { return path }
  if (parent == null) { return path }
  return cleanPath(((parent.path) + "/" + path))
}

/*  */

function normalizeLocation (
  raw,
  current,
  append,
  router
) {
  var next = typeof raw === 'string' ? { path: raw } : raw;
  // named target
  if (next.name || next._normalized) {
    return next
  }

  // relative params
  if (!next.path && next.params && current) {
    next = extend({}, next);
    next._normalized = true;
    var params = extend(extend({}, current.params), next.params);
    if (current.name) {
      next.name = current.name;
      next.params = params;
    } else if (current.matched.length) {
      var rawPath = current.matched[current.matched.length - 1].path;
      next.path = fillParams(rawPath, params, ("path " + (current.path)));
    } else if (true) {
      warn(false, "relative params navigation requires a current route.");
    }
    return next
  }

  var parsedPath = parsePath(next.path || '');
  var basePath = (current && current.path) || '/';
  var path = parsedPath.path
    ? resolvePath(parsedPath.path, basePath, append || next.append)
    : basePath;

  var query = resolveQuery(
    parsedPath.query,
    next.query,
    router && router.options.parseQuery
  );

  var hash = next.hash || parsedPath.hash;
  if (hash && hash.charAt(0) !== '#') {
    hash = "#" + hash;
  }

  return {
    _normalized: true,
    path: path,
    query: query,
    hash: hash
  }
}

/*  */



function createMatcher (
  routes,
  router
) {
  var ref = createRouteMap(routes);
  var pathList = ref.pathList;
  var pathMap = ref.pathMap;
  var nameMap = ref.nameMap;

  function addRoutes (routes) {
    createRouteMap(routes, pathList, pathMap, nameMap);
  }

  function match (
    raw,
    currentRoute,
    redirectedFrom
  ) {
    var location = normalizeLocation(raw, currentRoute, false, router);
    var name = location.name;

    if (name) {
      var record = nameMap[name];
      if (true) {
        warn(record, ("Route with name '" + name + "' does not exist"));
      }
      if (!record) { return _createRoute(null, location) }
      var paramNames = record.regex.keys
        .filter(function (key) { return !key.optional; })
        .map(function (key) { return key.name; });

      if (typeof location.params !== 'object') {
        location.params = {};
      }

      if (currentRoute && typeof currentRoute.params === 'object') {
        for (var key in currentRoute.params) {
          if (!(key in location.params) && paramNames.indexOf(key) > -1) {
            location.params[key] = currentRoute.params[key];
          }
        }
      }

      if (record) {
        location.path = fillParams(record.path, location.params, ("named route \"" + name + "\""));
        return _createRoute(record, location, redirectedFrom)
      }
    } else if (location.path) {
      location.params = {};
      for (var i = 0; i < pathList.length; i++) {
        var path = pathList[i];
        var record$1 = pathMap[path];
        if (matchRoute(record$1.regex, location.path, location.params)) {
          return _createRoute(record$1, location, redirectedFrom)
        }
      }
    }
    // no match
    return _createRoute(null, location)
  }

  function redirect (
    record,
    location
  ) {
    var originalRedirect = record.redirect;
    var redirect = typeof originalRedirect === 'function'
      ? originalRedirect(createRoute(record, location, null, router))
      : originalRedirect;

    if (typeof redirect === 'string') {
      redirect = { path: redirect };
    }

    if (!redirect || typeof redirect !== 'object') {
      if (true) {
        warn(
          false, ("invalid redirect option: " + (JSON.stringify(redirect)))
        );
      }
      return _createRoute(null, location)
    }

    var re = redirect;
    var name = re.name;
    var path = re.path;
    var query = location.query;
    var hash = location.hash;
    var params = location.params;
    query = re.hasOwnProperty('query') ? re.query : query;
    hash = re.hasOwnProperty('hash') ? re.hash : hash;
    params = re.hasOwnProperty('params') ? re.params : params;

    if (name) {
      // resolved named direct
      var targetRecord = nameMap[name];
      if (true) {
        assert(targetRecord, ("redirect failed: named route \"" + name + "\" not found."));
      }
      return match({
        _normalized: true,
        name: name,
        query: query,
        hash: hash,
        params: params
      }, undefined, location)
    } else if (path) {
      // 1. resolve relative redirect
      var rawPath = resolveRecordPath(path, record);
      // 2. resolve params
      var resolvedPath = fillParams(rawPath, params, ("redirect route with path \"" + rawPath + "\""));
      // 3. rematch with existing query and hash
      return match({
        _normalized: true,
        path: resolvedPath,
        query: query,
        hash: hash
      }, undefined, location)
    } else {
      if (true) {
        warn(false, ("invalid redirect option: " + (JSON.stringify(redirect))));
      }
      return _createRoute(null, location)
    }
  }

  function alias (
    record,
    location,
    matchAs
  ) {
    var aliasedPath = fillParams(matchAs, location.params, ("aliased route with path \"" + matchAs + "\""));
    var aliasedMatch = match({
      _normalized: true,
      path: aliasedPath
    });
    if (aliasedMatch) {
      var matched = aliasedMatch.matched;
      var aliasedRecord = matched[matched.length - 1];
      location.params = aliasedMatch.params;
      return _createRoute(aliasedRecord, location)
    }
    return _createRoute(null, location)
  }

  function _createRoute (
    record,
    location,
    redirectedFrom
  ) {
    if (record && record.redirect) {
      return redirect(record, redirectedFrom || location)
    }
    if (record && record.matchAs) {
      return alias(record, location, record.matchAs)
    }
    return createRoute(record, location, redirectedFrom, router)
  }

  return {
    match: match,
    addRoutes: addRoutes
  }
}

function matchRoute (
  regex,
  path,
  params
) {
  var m = path.match(regex);

  if (!m) {
    return false
  } else if (!params) {
    return true
  }

  for (var i = 1, len = m.length; i < len; ++i) {
    var key = regex.keys[i - 1];
    var val = typeof m[i] === 'string' ? decodeURIComponent(m[i]) : m[i];
    if (key) {
      // Fix #1994: using * with props: true generates a param named 0
      params[key.name || 'pathMatch'] = val;
    }
  }

  return true
}

function resolveRecordPath (path, record) {
  return resolvePath(path, record.parent ? record.parent.path : '/', true)
}

/*  */

var positionStore = Object.create(null);

function setupScroll () {
  // Fix for #1585 for Firefox
  // Fix for #2195 Add optional third attribute to workaround a bug in safari https://bugs.webkit.org/show_bug.cgi?id=182678
  window.history.replaceState({ key: getStateKey() }, '', window.location.href.replace(window.location.origin, ''));
  window.addEventListener('popstate', function (e) {
    saveScrollPosition();
    if (e.state && e.state.key) {
      setStateKey(e.state.key);
    }
  });
}

function handleScroll (
  router,
  to,
  from,
  isPop
) {
  if (!router.app) {
    return
  }

  var behavior = router.options.scrollBehavior;
  if (!behavior) {
    return
  }

  if (true) {
    assert(typeof behavior === 'function', "scrollBehavior must be a function");
  }

  // wait until re-render finishes before scrolling
  router.app.$nextTick(function () {
    var position = getScrollPosition();
    var shouldScroll = behavior.call(router, to, from, isPop ? position : null);

    if (!shouldScroll) {
      return
    }

    if (typeof shouldScroll.then === 'function') {
      shouldScroll.then(function (shouldScroll) {
        scrollToPosition((shouldScroll), position);
      }).catch(function (err) {
        if (true) {
          assert(false, err.toString());
        }
      });
    } else {
      scrollToPosition(shouldScroll, position);
    }
  });
}

function saveScrollPosition () {
  var key = getStateKey();
  if (key) {
    positionStore[key] = {
      x: window.pageXOffset,
      y: window.pageYOffset
    };
  }
}

function getScrollPosition () {
  var key = getStateKey();
  if (key) {
    return positionStore[key]
  }
}

function getElementPosition (el, offset) {
  var docEl = document.documentElement;
  var docRect = docEl.getBoundingClientRect();
  var elRect = el.getBoundingClientRect();
  return {
    x: elRect.left - docRect.left - offset.x,
    y: elRect.top - docRect.top - offset.y
  }
}

function isValidPosition (obj) {
  return isNumber(obj.x) || isNumber(obj.y)
}

function normalizePosition (obj) {
  return {
    x: isNumber(obj.x) ? obj.x : window.pageXOffset,
    y: isNumber(obj.y) ? obj.y : window.pageYOffset
  }
}

function normalizeOffset (obj) {
  return {
    x: isNumber(obj.x) ? obj.x : 0,
    y: isNumber(obj.y) ? obj.y : 0
  }
}

function isNumber (v) {
  return typeof v === 'number'
}

function scrollToPosition (shouldScroll, position) {
  var isObject = typeof shouldScroll === 'object';
  if (isObject && typeof shouldScroll.selector === 'string') {
    var el = document.querySelector(shouldScroll.selector);
    if (el) {
      var offset = shouldScroll.offset && typeof shouldScroll.offset === 'object' ? shouldScroll.offset : {};
      offset = normalizeOffset(offset);
      position = getElementPosition(el, offset);
    } else if (isValidPosition(shouldScroll)) {
      position = normalizePosition(shouldScroll);
    }
  } else if (isObject && isValidPosition(shouldScroll)) {
    position = normalizePosition(shouldScroll);
  }

  if (position) {
    window.scrollTo(position.x, position.y);
  }
}

/*  */

var supportsPushState = inBrowser && (function () {
  var ua = window.navigator.userAgent;

  if (
    (ua.indexOf('Android 2.') !== -1 || ua.indexOf('Android 4.0') !== -1) &&
    ua.indexOf('Mobile Safari') !== -1 &&
    ua.indexOf('Chrome') === -1 &&
    ua.indexOf('Windows Phone') === -1
  ) {
    return false
  }

  return window.history && 'pushState' in window.history
})();

// use User Timing api (if present) for more accurate key precision
var Time = inBrowser && window.performance && window.performance.now
  ? window.performance
  : Date;

var _key = genKey();

function genKey () {
  return Time.now().toFixed(3)
}

function getStateKey () {
  return _key
}

function setStateKey (key) {
  _key = key;
}

function pushState (url, replace) {
  saveScrollPosition();
  // try...catch the pushState call to get around Safari
  // DOM Exception 18 where it limits to 100 pushState calls
  var history = window.history;
  try {
    if (replace) {
      history.replaceState({ key: _key }, '', url);
    } else {
      _key = genKey();
      history.pushState({ key: _key }, '', url);
    }
  } catch (e) {
    window.location[replace ? 'replace' : 'assign'](url);
  }
}

function replaceState (url) {
  pushState(url, true);
}

/*  */

function runQueue (queue, fn, cb) {
  var step = function (index) {
    if (index >= queue.length) {
      cb();
    } else {
      if (queue[index]) {
        fn(queue[index], function () {
          step(index + 1);
        });
      } else {
        step(index + 1);
      }
    }
  };
  step(0);
}

/*  */

function resolveAsyncComponents (matched) {
  return function (to, from, next) {
    var hasAsync = false;
    var pending = 0;
    var error = null;

    flatMapComponents(matched, function (def, _, match, key) {
      // if it's a function and doesn't have cid attached,
      // assume it's an async component resolve function.
      // we are not using Vue's default async resolving mechanism because
      // we want to halt the navigation until the incoming component has been
      // resolved.
      if (typeof def === 'function' && def.cid === undefined) {
        hasAsync = true;
        pending++;

        var resolve = once(function (resolvedDef) {
          if (isESModule(resolvedDef)) {
            resolvedDef = resolvedDef.default;
          }
          // save resolved on async factory in case it's used elsewhere
          def.resolved = typeof resolvedDef === 'function'
            ? resolvedDef
            : _Vue.extend(resolvedDef);
          match.components[key] = resolvedDef;
          pending--;
          if (pending <= 0) {
            next();
          }
        });

        var reject = once(function (reason) {
          var msg = "Failed to resolve async component " + key + ": " + reason;
          "development" !== 'production' && warn(false, msg);
          if (!error) {
            error = isError(reason)
              ? reason
              : new Error(msg);
            next(error);
          }
        });

        var res;
        try {
          res = def(resolve, reject);
        } catch (e) {
          reject(e);
        }
        if (res) {
          if (typeof res.then === 'function') {
            res.then(resolve, reject);
          } else {
            // new syntax in Vue 2.3
            var comp = res.component;
            if (comp && typeof comp.then === 'function') {
              comp.then(resolve, reject);
            }
          }
        }
      }
    });

    if (!hasAsync) { next(); }
  }
}

function flatMapComponents (
  matched,
  fn
) {
  return flatten(matched.map(function (m) {
    return Object.keys(m.components).map(function (key) { return fn(
      m.components[key],
      m.instances[key],
      m, key
    ); })
  }))
}

function flatten (arr) {
  return Array.prototype.concat.apply([], arr)
}

var hasSymbol =
  typeof Symbol === 'function' &&
  typeof Symbol.toStringTag === 'symbol';

function isESModule (obj) {
  return obj.__esModule || (hasSymbol && obj[Symbol.toStringTag] === 'Module')
}

// in Webpack 2, require.ensure now also returns a Promise
// so the resolve/reject functions may get called an extra time
// if the user uses an arrow function shorthand that happens to
// return that Promise.
function once (fn) {
  var called = false;
  return function () {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    if (called) { return }
    called = true;
    return fn.apply(this, args)
  }
}

/*  */

var History = function History (router, base) {
  this.router = router;
  this.base = normalizeBase(base);
  // start with a route object that stands for "nowhere"
  this.current = START;
  this.pending = null;
  this.ready = false;
  this.readyCbs = [];
  this.readyErrorCbs = [];
  this.errorCbs = [];
};

History.prototype.listen = function listen (cb) {
  this.cb = cb;
};

History.prototype.onReady = function onReady (cb, errorCb) {
  if (this.ready) {
    cb();
  } else {
    this.readyCbs.push(cb);
    if (errorCb) {
      this.readyErrorCbs.push(errorCb);
    }
  }
};

History.prototype.onError = function onError (errorCb) {
  this.errorCbs.push(errorCb);
};

History.prototype.transitionTo = function transitionTo (location, onComplete, onAbort) {
    var this$1 = this;

  var route = this.router.match(location, this.current);
  this.confirmTransition(route, function () {
    this$1.updateRoute(route);
    onComplete && onComplete(route);
    this$1.ensureURL();

    // fire ready cbs once
    if (!this$1.ready) {
      this$1.ready = true;
      this$1.readyCbs.forEach(function (cb) { cb(route); });
    }
  }, function (err) {
    if (onAbort) {
      onAbort(err);
    }
    if (err && !this$1.ready) {
      this$1.ready = true;
      this$1.readyErrorCbs.forEach(function (cb) { cb(err); });
    }
  });
};

History.prototype.confirmTransition = function confirmTransition (route, onComplete, onAbort) {
    var this$1 = this;

  var current = this.current;
  var abort = function (err) {
    if (isError(err)) {
      if (this$1.errorCbs.length) {
        this$1.errorCbs.forEach(function (cb) { cb(err); });
      } else {
        warn(false, 'uncaught error during route navigation:');
        console.error(err);
      }
    }
    onAbort && onAbort(err);
  };
  if (
    isSameRoute(route, current) &&
    // in the case the route map has been dynamically appended to
    route.matched.length === current.matched.length
  ) {
    this.ensureURL();
    return abort()
  }

  var ref = resolveQueue(this.current.matched, route.matched);
    var updated = ref.updated;
    var deactivated = ref.deactivated;
    var activated = ref.activated;

  var queue = [].concat(
    // in-component leave guards
    extractLeaveGuards(deactivated),
    // global before hooks
    this.router.beforeHooks,
    // in-component update hooks
    extractUpdateHooks(updated),
    // in-config enter guards
    activated.map(function (m) { return m.beforeEnter; }),
    // async components
    resolveAsyncComponents(activated)
  );

  this.pending = route;
  var iterator = function (hook, next) {
    if (this$1.pending !== route) {
      return abort()
    }
    try {
      hook(route, current, function (to) {
        if (to === false || isError(to)) {
          // next(false) -> abort navigation, ensure current URL
          this$1.ensureURL(true);
          abort(to);
        } else if (
          typeof to === 'string' ||
          (typeof to === 'object' && (
            typeof to.path === 'string' ||
            typeof to.name === 'string'
          ))
        ) {
          // next('/') or next({ path: '/' }) -> redirect
          abort();
          if (typeof to === 'object' && to.replace) {
            this$1.replace(to);
          } else {
            this$1.push(to);
          }
        } else {
          // confirm transition and pass on the value
          next(to);
        }
      });
    } catch (e) {
      abort(e);
    }
  };

  runQueue(queue, iterator, function () {
    var postEnterCbs = [];
    var isValid = function () { return this$1.current === route; };
    // wait until async components are resolved before
    // extracting in-component enter guards
    var enterGuards = extractEnterGuards(activated, postEnterCbs, isValid);
    var queue = enterGuards.concat(this$1.router.resolveHooks);
    runQueue(queue, iterator, function () {
      if (this$1.pending !== route) {
        return abort()
      }
      this$1.pending = null;
      onComplete(route);
      if (this$1.router.app) {
        this$1.router.app.$nextTick(function () {
          postEnterCbs.forEach(function (cb) { cb(); });
        });
      }
    });
  });
};

History.prototype.updateRoute = function updateRoute (route) {
  var prev = this.current;
  this.current = route;
  this.cb && this.cb(route);
  this.router.afterHooks.forEach(function (hook) {
    hook && hook(route, prev);
  });
};

function normalizeBase (base) {
  if (!base) {
    if (inBrowser) {
      // respect <base> tag
      var baseEl = document.querySelector('base');
      base = (baseEl && baseEl.getAttribute('href')) || '/';
      // strip full URL origin
      base = base.replace(/^https?:\/\/[^\/]+/, '');
    } else {
      base = '/';
    }
  }
  // make sure there's the starting slash
  if (base.charAt(0) !== '/') {
    base = '/' + base;
  }
  // remove trailing slash
  return base.replace(/\/$/, '')
}

function resolveQueue (
  current,
  next
) {
  var i;
  var max = Math.max(current.length, next.length);
  for (i = 0; i < max; i++) {
    if (current[i] !== next[i]) {
      break
    }
  }
  return {
    updated: next.slice(0, i),
    activated: next.slice(i),
    deactivated: current.slice(i)
  }
}

function extractGuards (
  records,
  name,
  bind,
  reverse
) {
  var guards = flatMapComponents(records, function (def, instance, match, key) {
    var guard = extractGuard(def, name);
    if (guard) {
      return Array.isArray(guard)
        ? guard.map(function (guard) { return bind(guard, instance, match, key); })
        : bind(guard, instance, match, key)
    }
  });
  return flatten(reverse ? guards.reverse() : guards)
}

function extractGuard (
  def,
  key
) {
  if (typeof def !== 'function') {
    // extend now so that global mixins are applied.
    def = _Vue.extend(def);
  }
  return def.options[key]
}

function extractLeaveGuards (deactivated) {
  return extractGuards(deactivated, 'beforeRouteLeave', bindGuard, true)
}

function extractUpdateHooks (updated) {
  return extractGuards(updated, 'beforeRouteUpdate', bindGuard)
}

function bindGuard (guard, instance) {
  if (instance) {
    return function boundRouteGuard () {
      return guard.apply(instance, arguments)
    }
  }
}

function extractEnterGuards (
  activated,
  cbs,
  isValid
) {
  return extractGuards(activated, 'beforeRouteEnter', function (guard, _, match, key) {
    return bindEnterGuard(guard, match, key, cbs, isValid)
  })
}

function bindEnterGuard (
  guard,
  match,
  key,
  cbs,
  isValid
) {
  return function routeEnterGuard (to, from, next) {
    return guard(to, from, function (cb) {
      next(cb);
      if (typeof cb === 'function') {
        cbs.push(function () {
          // #750
          // if a router-view is wrapped with an out-in transition,
          // the instance may not have been registered at this time.
          // we will need to poll for registration until current route
          // is no longer valid.
          poll(cb, match.instances, key, isValid);
        });
      }
    })
  }
}

function poll (
  cb, // somehow flow cannot infer this is a function
  instances,
  key,
  isValid
) {
  if (
    instances[key] &&
    !instances[key]._isBeingDestroyed // do not reuse being destroyed instance
  ) {
    cb(instances[key]);
  } else if (isValid()) {
    setTimeout(function () {
      poll(cb, instances, key, isValid);
    }, 16);
  }
}

/*  */

var HTML5History = (function (History$$1) {
  function HTML5History (router, base) {
    var this$1 = this;

    History$$1.call(this, router, base);

    var expectScroll = router.options.scrollBehavior;
    var supportsScroll = supportsPushState && expectScroll;

    if (supportsScroll) {
      setupScroll();
    }

    var initLocation = getLocation(this.base);
    window.addEventListener('popstate', function (e) {
      var current = this$1.current;

      // Avoiding first `popstate` event dispatched in some browsers but first
      // history route not updated since async guard at the same time.
      var location = getLocation(this$1.base);
      if (this$1.current === START && location === initLocation) {
        return
      }

      this$1.transitionTo(location, function (route) {
        if (supportsScroll) {
          handleScroll(router, route, current, true);
        }
      });
    });
  }

  if ( History$$1 ) HTML5History.__proto__ = History$$1;
  HTML5History.prototype = Object.create( History$$1 && History$$1.prototype );
  HTML5History.prototype.constructor = HTML5History;

  HTML5History.prototype.go = function go (n) {
    window.history.go(n);
  };

  HTML5History.prototype.push = function push (location, onComplete, onAbort) {
    var this$1 = this;

    var ref = this;
    var fromRoute = ref.current;
    this.transitionTo(location, function (route) {
      pushState(cleanPath(this$1.base + route.fullPath));
      handleScroll(this$1.router, route, fromRoute, false);
      onComplete && onComplete(route);
    }, onAbort);
  };

  HTML5History.prototype.replace = function replace (location, onComplete, onAbort) {
    var this$1 = this;

    var ref = this;
    var fromRoute = ref.current;
    this.transitionTo(location, function (route) {
      replaceState(cleanPath(this$1.base + route.fullPath));
      handleScroll(this$1.router, route, fromRoute, false);
      onComplete && onComplete(route);
    }, onAbort);
  };

  HTML5History.prototype.ensureURL = function ensureURL (push) {
    if (getLocation(this.base) !== this.current.fullPath) {
      var current = cleanPath(this.base + this.current.fullPath);
      push ? pushState(current) : replaceState(current);
    }
  };

  HTML5History.prototype.getCurrentLocation = function getCurrentLocation () {
    return getLocation(this.base)
  };

  return HTML5History;
}(History));

function getLocation (base) {
  var path = decodeURI(window.location.pathname);
  if (base && path.indexOf(base) === 0) {
    path = path.slice(base.length);
  }
  return (path || '/') + window.location.search + window.location.hash
}

/*  */

var HashHistory = (function (History$$1) {
  function HashHistory (router, base, fallback) {
    History$$1.call(this, router, base);
    // check history fallback deeplinking
    if (fallback && checkFallback(this.base)) {
      return
    }
    ensureSlash();
  }

  if ( History$$1 ) HashHistory.__proto__ = History$$1;
  HashHistory.prototype = Object.create( History$$1 && History$$1.prototype );
  HashHistory.prototype.constructor = HashHistory;

  // this is delayed until the app mounts
  // to avoid the hashchange listener being fired too early
  HashHistory.prototype.setupListeners = function setupListeners () {
    var this$1 = this;

    var router = this.router;
    var expectScroll = router.options.scrollBehavior;
    var supportsScroll = supportsPushState && expectScroll;

    if (supportsScroll) {
      setupScroll();
    }

    window.addEventListener(supportsPushState ? 'popstate' : 'hashchange', function () {
      var current = this$1.current;
      if (!ensureSlash()) {
        return
      }
      this$1.transitionTo(getHash(), function (route) {
        if (supportsScroll) {
          handleScroll(this$1.router, route, current, true);
        }
        if (!supportsPushState) {
          replaceHash(route.fullPath);
        }
      });
    });
  };

  HashHistory.prototype.push = function push (location, onComplete, onAbort) {
    var this$1 = this;

    var ref = this;
    var fromRoute = ref.current;
    this.transitionTo(location, function (route) {
      pushHash(route.fullPath);
      handleScroll(this$1.router, route, fromRoute, false);
      onComplete && onComplete(route);
    }, onAbort);
  };

  HashHistory.prototype.replace = function replace (location, onComplete, onAbort) {
    var this$1 = this;

    var ref = this;
    var fromRoute = ref.current;
    this.transitionTo(location, function (route) {
      replaceHash(route.fullPath);
      handleScroll(this$1.router, route, fromRoute, false);
      onComplete && onComplete(route);
    }, onAbort);
  };

  HashHistory.prototype.go = function go (n) {
    window.history.go(n);
  };

  HashHistory.prototype.ensureURL = function ensureURL (push) {
    var current = this.current.fullPath;
    if (getHash() !== current) {
      push ? pushHash(current) : replaceHash(current);
    }
  };

  HashHistory.prototype.getCurrentLocation = function getCurrentLocation () {
    return getHash()
  };

  return HashHistory;
}(History));

function checkFallback (base) {
  var location = getLocation(base);
  if (!/^\/#/.test(location)) {
    window.location.replace(
      cleanPath(base + '/#' + location)
    );
    return true
  }
}

function ensureSlash () {
  var path = getHash();
  if (path.charAt(0) === '/') {
    return true
  }
  replaceHash('/' + path);
  return false
}

function getHash () {
  // We can't use window.location.hash here because it's not
  // consistent across browsers - Firefox will pre-decode it!
  var href = window.location.href;
  var index = href.indexOf('#');
  return index === -1 ? '' : decodeURI(href.slice(index + 1))
}

function getUrl (path) {
  var href = window.location.href;
  var i = href.indexOf('#');
  var base = i >= 0 ? href.slice(0, i) : href;
  return (base + "#" + path)
}

function pushHash (path) {
  if (supportsPushState) {
    pushState(getUrl(path));
  } else {
    window.location.hash = path;
  }
}

function replaceHash (path) {
  if (supportsPushState) {
    replaceState(getUrl(path));
  } else {
    window.location.replace(getUrl(path));
  }
}

/*  */

var AbstractHistory = (function (History$$1) {
  function AbstractHistory (router, base) {
    History$$1.call(this, router, base);
    this.stack = [];
    this.index = -1;
  }

  if ( History$$1 ) AbstractHistory.__proto__ = History$$1;
  AbstractHistory.prototype = Object.create( History$$1 && History$$1.prototype );
  AbstractHistory.prototype.constructor = AbstractHistory;

  AbstractHistory.prototype.push = function push (location, onComplete, onAbort) {
    var this$1 = this;

    this.transitionTo(location, function (route) {
      this$1.stack = this$1.stack.slice(0, this$1.index + 1).concat(route);
      this$1.index++;
      onComplete && onComplete(route);
    }, onAbort);
  };

  AbstractHistory.prototype.replace = function replace (location, onComplete, onAbort) {
    var this$1 = this;

    this.transitionTo(location, function (route) {
      this$1.stack = this$1.stack.slice(0, this$1.index).concat(route);
      onComplete && onComplete(route);
    }, onAbort);
  };

  AbstractHistory.prototype.go = function go (n) {
    var this$1 = this;

    var targetIndex = this.index + n;
    if (targetIndex < 0 || targetIndex >= this.stack.length) {
      return
    }
    var route = this.stack[targetIndex];
    this.confirmTransition(route, function () {
      this$1.index = targetIndex;
      this$1.updateRoute(route);
    });
  };

  AbstractHistory.prototype.getCurrentLocation = function getCurrentLocation () {
    var current = this.stack[this.stack.length - 1];
    return current ? current.fullPath : '/'
  };

  AbstractHistory.prototype.ensureURL = function ensureURL () {
    // noop
  };

  return AbstractHistory;
}(History));

/*  */



var VueRouter = function VueRouter (options) {
  if ( options === void 0 ) options = {};

  this.app = null;
  this.apps = [];
  this.options = options;
  this.beforeHooks = [];
  this.resolveHooks = [];
  this.afterHooks = [];
  this.matcher = createMatcher(options.routes || [], this);

  var mode = options.mode || 'hash';
  this.fallback = mode === 'history' && !supportsPushState && options.fallback !== false;
  if (this.fallback) {
    mode = 'hash';
  }
  if (!inBrowser) {
    mode = 'abstract';
  }
  this.mode = mode;

  switch (mode) {
    case 'history':
      this.history = new HTML5History(this, options.base);
      break
    case 'hash':
      this.history = new HashHistory(this, options.base, this.fallback);
      break
    case 'abstract':
      this.history = new AbstractHistory(this, options.base);
      break
    default:
      if (true) {
        assert(false, ("invalid mode: " + mode));
      }
  }
};

var prototypeAccessors = { currentRoute: { configurable: true } };

VueRouter.prototype.match = function match (
  raw,
  current,
  redirectedFrom
) {
  return this.matcher.match(raw, current, redirectedFrom)
};

prototypeAccessors.currentRoute.get = function () {
  return this.history && this.history.current
};

VueRouter.prototype.init = function init (app /* Vue component instance */) {
    var this$1 = this;

  "development" !== 'production' && assert(
    install.installed,
    "not installed. Make sure to call `Vue.use(VueRouter)` " +
    "before creating root instance."
  );

  this.apps.push(app);

  // main app already initialized.
  if (this.app) {
    return
  }

  this.app = app;

  var history = this.history;

  if (history instanceof HTML5History) {
    history.transitionTo(history.getCurrentLocation());
  } else if (history instanceof HashHistory) {
    var setupHashListener = function () {
      history.setupListeners();
    };
    history.transitionTo(
      history.getCurrentLocation(),
      setupHashListener,
      setupHashListener
    );
  }

  history.listen(function (route) {
    this$1.apps.forEach(function (app) {
      app._route = route;
    });
  });
};

VueRouter.prototype.beforeEach = function beforeEach (fn) {
  return registerHook(this.beforeHooks, fn)
};

VueRouter.prototype.beforeResolve = function beforeResolve (fn) {
  return registerHook(this.resolveHooks, fn)
};

VueRouter.prototype.afterEach = function afterEach (fn) {
  return registerHook(this.afterHooks, fn)
};

VueRouter.prototype.onReady = function onReady (cb, errorCb) {
  this.history.onReady(cb, errorCb);
};

VueRouter.prototype.onError = function onError (errorCb) {
  this.history.onError(errorCb);
};

VueRouter.prototype.push = function push (location, onComplete, onAbort) {
  this.history.push(location, onComplete, onAbort);
};

VueRouter.prototype.replace = function replace (location, onComplete, onAbort) {
  this.history.replace(location, onComplete, onAbort);
};

VueRouter.prototype.go = function go (n) {
  this.history.go(n);
};

VueRouter.prototype.back = function back () {
  this.go(-1);
};

VueRouter.prototype.forward = function forward () {
  this.go(1);
};

VueRouter.prototype.getMatchedComponents = function getMatchedComponents (to) {
  var route = to
    ? to.matched
      ? to
      : this.resolve(to).route
    : this.currentRoute;
  if (!route) {
    return []
  }
  return [].concat.apply([], route.matched.map(function (m) {
    return Object.keys(m.components).map(function (key) {
      return m.components[key]
    })
  }))
};

VueRouter.prototype.resolve = function resolve (
  to,
  current,
  append
) {
  var location = normalizeLocation(
    to,
    current || this.history.current,
    append,
    this
  );
  var route = this.match(location, current);
  var fullPath = route.redirectedFrom || route.fullPath;
  var base = this.history.base;
  var href = createHref(base, fullPath, this.mode);
  return {
    location: location,
    route: route,
    href: href,
    // for backwards compat
    normalizedTo: location,
    resolved: route
  }
};

VueRouter.prototype.addRoutes = function addRoutes (routes) {
  this.matcher.addRoutes(routes);
  if (this.history.current !== START) {
    this.history.transitionTo(this.history.getCurrentLocation());
  }
};

Object.defineProperties( VueRouter.prototype, prototypeAccessors );

function registerHook (list, fn) {
  list.push(fn);
  return function () {
    var i = list.indexOf(fn);
    if (i > -1) { list.splice(i, 1); }
  }
}

function createHref (base, fullPath, mode) {
  var path = mode === 'hash' ? '#' + fullPath : fullPath;
  return base ? cleanPath(base + '/' + path) : path
}

VueRouter.install = install;
VueRouter.version = '3.0.2';

if (inBrowser && window.Vue) {
  window.Vue.use(VueRouter);
}

/* harmony default export */ __webpack_exports__["default"] = (VueRouter);


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = []

/* styles */
__vue_styles__.push(__webpack_require__(7)
)

/* script */
__vue_exports__ = __webpack_require__(8)

/* template */
var __vue_template__ = __webpack_require__(13)
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
__vue_options__.__file = "F:\\WebApp\\cabbage\\src\\components\\home\\home.vue"
__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
__vue_options__._scopeId = "data-v-7b63ac08"
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
/* 7 */
/***/ (function(module, exports) {

module.exports = {
  "home-wrapper": {
    "position": "fixed",
    "width": "750",
    "top": "90",
    "left": 0,
    "right": 0,
    "bottom": "110"
  },
  "refresh": {
    "width": "750",
    "height": "50",
    "lineHeight": "50",
    "display": "flex",
    "MsFlexAlign": "center",
    "WebkitAlignItems": "center",
    "WebkitBoxAlign": "center",
    "alignItems": "center",
    "textAlign": "center"
  },
  "list-box": {
    "width": "710",
    "marginTop": "10",
    "marginBottom": "10",
    "marginLeft": "20",
    "marginRight": "20"
  },
  "list-box-child": {
    "position": "relative",
    "width": "710"
  },
  "banner-wrapper": {
    "marginTop": "20",
    "height": "300",
    "backgroundColor": "#eeeeee",
    "borderRadius": "15",
    "boxShadow": "0px 2px 3px 2px #eee"
  },
  "banner-list": {
    "height": "300"
  },
  "_banner": {
    "width": "710",
    "height": "300"
  },
  "indicator": {
    "position": "absolute",
    "width": "710",
    "height": "300",
    "top": "130",
    "left": "0",
    "itemColor": "rgb(255,255,255)",
    "itemSelectedColor": "rgb(115,204,70)",
    "itemSize": "20"
  },
  "loading": {
    "width": "750",
    "height": "200",
    "display": "flex",
    "MsFlexAlign": "center",
    "WebkitAlignItems": "center",
    "WebkitBoxAlign": "center",
    "alignItems": "center"
  },
  "indicators": {
    "marginTop": "16",
    "height": "40",
    "width": "40",
    "color": "#ff4400"
  },
  "fication-indicator": {
    "top": "165",
    "itemColor": "rgb(198,194,194)",
    "itemSize": "15"
  },
  "fication-wrapper": {
    "height": "325"
  },
  "fication-wrapper-list": {
    "display": "flex",
    "flexDirection": "row",
    "justifyContent": "flex-start",
    "alignItems": "center",
    "flexWrap": "wrap"
  },
  "fication-wrapper-list-child": {
    "width": "142"
  },
  "fication-name": {
    "marginTop": "10",
    "marginBottom": "20",
    "fontSize": "22",
    "color": "#333333",
    "textAlign": "center"
  },
  "_fication": {
    "borderRadius": "100",
    "marginLeft": "21",
    "width": "100",
    "height": "100",
    "boxShadow": "5px 2px 5px 2px #eee"
  },
  "wechat-wrapper": {
    "position": "relative",
    "height": "194",
    "paddingTop": "7",
    "paddingBottom": "7",
    "paddingLeft": "10",
    "paddingRight": "15",
    "borderRadius": "10",
    "boxShadow": "0 0 5px 2px #eee"
  },
  "_wechatImage": {
    "width": "685",
    "height": "180"
  },
  "wechat": {
    "position": "absolute",
    "top": "70",
    "left": "88",
    "width": "50",
    "height": "50"
  },
  "service-info": {
    "position": "absolute",
    "top": "55",
    "left": "210"
  },
  "face-name": {
    "fontSize": "22",
    "color": "#333333",
    "fontWeight": "700"
  },
  "face-linkr": {
    "fontSize": "14",
    "color": "#777777",
    "marginTop": "10",
    "textDecoration": "underline"
  },
  "tel-wrapper": {
    "position": "absolute",
    "top": "60",
    "right": "32",
    "flexDirection": "row"
  },
  "_tel": {
    "width": "43",
    "height": "43",
    "marginRight": "10"
  },
  "telName": {
    "fontSize": "14",
    "color": "#777777"
  },
  "telNum": {
    "marginTop": "9",
    "fontSize": "20",
    "color": "#333333",
    "fontWeight": "900"
  },
  "food-box": {
    "height": "650",
    "display": "flex",
    "flexDirection": "column",
    "justifyContent": "space-between"
  },
  "foods-wrapper": {
    "display": "flex",
    "flexDirection": "row",
    "justifyContent": "space-between"
  },
  "foods-wrapper-list-two": {
    "display": "flex",
    "flexDirection": "column",
    "flexWrap": "wrap",
    "justifyContent": "space-between"
  },
  "foods-image": {
    "width": "350",
    "height": "210",
    "borderRadius": "20"
  },
  "foods-image-one": {
    "height": "430"
  },
  "food-bg-image": {
    "width": "710",
    "height": "226"
  },
  "foot-list-wrapper": {
    "marginTop": "0",
    "marginBottom": "0",
    "display": "flex",
    "flexDirection": "row",
    "justifyContent": "space-between",
    "flexWrap": "wrap",
    "alignContent": "space-between",
    "backgroundColor": "#fbfbfb"
  },
  "foot-list": {
    "marginTop": "5",
    "marginBottom": "5",
    "width": "350",
    "height": "480",
    "borderRadius": "20",
    "boxShadow": "0 0 5px 2px #eee",
    "backgroundColor": "#ffffff"
  },
  "image-box": {
    "width": "350",
    "height": "350",
    "display": "flex",
    "flexDirection": "row",
    "justifyContent": "center",
    "alignItems": "center"
  },
  "food-image": {
    "width": "270",
    "height": "277"
  },
  "food-shop-wrapper": {
    "paddingLeft": "20",
    "paddingRight": "20",
    "width": "350",
    "height": "130"
  },
  "food-name-wrapper": {
    "marginBottom": "34"
  },
  "foot-shop-name": {
    "display": "inline",
    "fontSize": "30",
    "fontWeight": "500",
    "color": "#222222"
  },
  "foot-dollar-wrapper": {
    "position": "relative",
    "height": "96",
    "display": "flex",
    "flexDirection": "row"
  },
  "foot-dollar": {
    "fontSize": "30",
    "fontWeight": "600",
    "color": "#f26100"
  },
  "foot-more-money": {
    "marginLeft": "15",
    "marginTop": "7",
    "fontSize": "20",
    "color": "#777777"
  },
  "foot-shop-car": {
    "position": "absolute",
    "width": "44",
    "height": "44",
    "top": 0,
    "right": 0
  }
}

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _header = __webpack_require__(9);

var _header2 = _interopRequireDefault(_header);

var _utils = __webpack_require__(0);

var _utils2 = _interopRequireDefault(_utils);

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

var modal = weex.requireModule('modal');
var storage = weex.requireModule('storage');
var HOME_URL = 'api/basic/gethomepage';
var SHOPCAR_URL = 'api/cart/addCart';
exports.default = {
    data: function data() {
        return {
            refreshing: false, //下拉刷新
            loadinging: false, //上拉加载
            panels: 1,
            autoPlay: true, //轮播图是否自动播放
            boolArr: [],
            homeArr: {},
            USERID: 'user_id',
            TOKEN: 'user_token',
            nav: {
                navWrapperList: []
            },
            service: {
                wechatImage: 'http://47.92.164.211:8011/PublicImage/wechatBg.png',
                wechat: 'http://47.92.164.211:8011/PublicImage/wechat.png',
                telImage: 'http://47.92.164.211:8011/PublicImage/phone.png',
                names: '绿白菜 • 滨湖春融苑店',
                linkr: '扫码添加微信实惠更多>',
                telName: '服务热线',
                telNum: '400-1000-000'
            }
        };
    },

    methods: {
        onrefresh: function onrefresh() {
            this.refreshing = true;
            var _this = this;
            _utils2.default.WeexAjax({
                url: HOME_URL,
                method: 'GET',
                type: 'JSON',
                callback: function callback(ret) {
                    var rets = ret;
                    console.log(ret);
                    if (rets.Status == 1) {
                        _this.homeArr = ret.obj;
                        var TopCategoryList = _this.homeArr.TopCategoryList;
                        var index = 0,
                            fre = TopCategoryList.length / 10;
                        // 循环push 顶部推荐
                        for (var i = 0; i < fre; i++) {
                            // 十次一个循环
                            var arr = [];
                            for (var j = 0; j < 10; j++) {
                                if (TopCategoryList[index]) {
                                    arr.push(TopCategoryList[index]);
                                } else {
                                    break;
                                }
                                index++;
                            }
                            _this.nav.navWrapperList.push(arr);
                            // console.log(_this.nav.navWrapperList)
                        }
                        // 给专区制作数组
                        for (var i = 0; i < _this.homeArr.RegionCategoryList.length; i++) {
                            _this.boolArr[i] = true;
                        }
                        _this.refreshing = false;
                        // console.log(_this.boolArr)
                    } else {
                        modal.toast({
                            message: '请求错误',
                            duration: 1
                        });
                    }
                }
            });
        },
        panel: function panel() {
            this.panels = this.navWrapperList.length / 10;
            // console.log(this.panels)
        },
        jump: function jump(href) {
            _utils2.default.bindThis(_utils2.default.jump(href), this.$getConfig());
        },
        addShopCar: function addShopCar(Product_Id) {
            var self = this;
            _utils2.default.WeexAjax({
                url: SHOPCAR_URL,
                //url: self.LOGIN_URL + '?categoryId=1',    
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
        }
    },
    components: {
        'v-header': _header2.default
    },
    created: function created() {
        var _this = this;
        _utils2.default.WeexAjax({
            url: HOME_URL,
            method: 'GET',
            type: 'JSON',
            callback: function callback(ret) {
                var rets = ret;
                console.log(ret);
                if (rets.Status == 1) {
                    _this.homeArr = ret.obj;
                    var TopCategoryList = _this.homeArr.TopCategoryList;
                    var index = 0,
                        fre = TopCategoryList.length / 10;
                    // 循环push 顶部推荐
                    for (var i = 0; i < fre; i++) {
                        // 十次一个循环
                        var arr = [];
                        for (var j = 0; j < 10; j++) {
                            if (TopCategoryList[index]) {
                                arr.push(TopCategoryList[index]);
                            } else {
                                break;
                            }
                            index++;
                        }
                        _this.nav.navWrapperList.push(arr);
                        // console.log(_this.nav.navWrapperList)
                    }
                    // 给专区制作数组
                    for (var i = 0; i < _this.homeArr.RegionCategoryList.length; i++) {
                        _this.boolArr[i] = true;
                    }
                    // console.log(_this.boolArr)
                } else {
                    modal.toast({
                        message: '请求错误',
                        duration: 1
                    });
                }
            }
        });
        storage.getItem(_this.USERID, function (event) {
            _this.USERID = event.data;
            storage.getItem(_this.TOKEN, function (event) {
                _this.TOKEN = event.data;
            });
        });
        // 初始化专区数组
        for (var i = 0; i < 5; i++) {
            _this.boolArr.push(false);
        }
        // 打印搜索值
        // console.log(Util.analAjax().CategoryId)
    },

    filters: {
        droller: function droller(msg) {
            return msg.toFixed(2);
        }
    }
};

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = []

/* styles */
__vue_styles__.push(__webpack_require__(10)
)

/* script */
__vue_exports__ = __webpack_require__(11)

/* template */
var __vue_template__ = __webpack_require__(12)
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
__vue_options__.__file = "F:\\WebApp\\cabbage\\src\\components\\header\\header.vue"
__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
__vue_options__._scopeId = "data-v-0f66b2fc"
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
/* 10 */
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
/* 11 */
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
      logo: "http://47.92.164.211:8011/PublicImage/logo.png", //logo图
      address: "http://47.92.164.211:8011/PublicImage/address.png", // 定位图标
      arrow: "http://47.92.164.211:8011/PublicImage/arrow.png",
      magnifier: "http://47.92.164.211:8011/PublicImage/search.png", // 放大镜图标
      scan: "http://47.92.164.211:8011/PublicImage/scan.png", // 扫一扫图标
      position: '合肥市滨湖春融苑店'
    };
  },

  methods: {
    jump: function jump() {
      _utils2.default.bindThis(_utils2.default.jump('components/search/search.js'), this.$getConfig());
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

/***/ }),
/* 12 */
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
    },
    on: {
      "click": function($event) {
        _vm.jump()
      }
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
/* 13 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: ["home"]
  }, [_c('v-header'), _c('list', {
    staticClass: ["home-wrapper"]
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
  }, [_c('slider', {
    staticClass: ["list-box", "banner-wrapper"],
    attrs: {
      "autoPlay": "autoPlay",
      "interval": "4000"
    }
  }, [_vm._l((_vm.homeArr.BannerList), function(banner) {
    return _c('div', {
      staticClass: ["banner-list", "list-box-child"]
    }, [_c('image', {
      staticClass: ["_banner"],
      attrs: {
        "src": banner.ImageUrl
      }
    })])
  }), _c('indicator', {
    staticClass: ["indicator"]
  })], 2)]), _c('cell', {
    appendAsTree: true,
    attrs: {
      "append": "tree"
    }
  }, [_c('slider', {
    staticClass: ["list-box", "fication-wrapper"]
  }, [_vm._l((_vm.nav.navWrapperList), function(item, cindex) {
    return _c('div', {
      key: cindex,
      staticClass: ["fication-wrapper-list", "list-box-child"]
    }, _vm._l((_vm.nav.navWrapperList[cindex]), function(list, index) {
      return _c('div', {
        key: index,
        staticClass: ["fication-wrapper-list-child"],
        on: {
          "click": function($event) {
            _vm.jump('components/seafood/seafood.js?CategoryId=' + list.CategoryId)
          }
        }
      }, [_c('image', {
        staticClass: ["_fication"],
        attrs: {
          "src": list.TopImageUrl
        }
      }), _c('text', {
        staticClass: ["fication-name"]
      }, [_vm._v(_vm._s(list.CategoryName))])])
    }))
  }), _c('indicator', {
    staticClass: ["indicator", "fication-indicator"]
  })], 2)]), _c('cell', {
    appendAsTree: true,
    attrs: {
      "append": "tree"
    }
  }, [_c('div', {
    staticClass: ["list-box", "wechat-wrapper"]
  }, [_c('image', {
    staticClass: ["_wechatImage"],
    attrs: {
      "src": _vm.service.wechatImage
    }
  }), _c('image', {
    staticClass: ["wechat"],
    attrs: {
      "src": _vm.service.wechat
    }
  }), _c('div', {
    staticClass: ["service-info"]
  }, [_c('text', {
    staticClass: ["face-name"]
  }, [_vm._v(_vm._s(_vm.service.names))]), _c('a', [_c('text', {
    staticClass: ["face-linkr"]
  }, [_vm._v(_vm._s(_vm.service.linkr))])])]), _c('div', {
    staticClass: ["tel-wrapper"]
  }, [_c('image', {
    staticClass: ["_tel"],
    attrs: {
      "src": _vm.service.telImage
    }
  }), _c('div', [_c('text', {
    staticClass: ["telName"]
  }, [_vm._v(_vm._s(_vm.service.telName))]), _c('text', {
    staticClass: ["telNum"]
  }, [_vm._v(_vm._s(_vm.service.telNum))])])])])]), _c('cell', {
    appendAsTree: true,
    attrs: {
      "append": "tree"
    }
  }, [_c('div', {
    staticClass: ["list-box", "food-box"]
  }, [_c('div', {
    staticClass: ["foods-wrapper"]
  }, [_c('div', {
    staticClass: ["foods-wrapper-list"]
  }, [(_vm.boolArr[0]) ? _c('image', {
    staticClass: ["foods-image", "foods-image-one"],
    attrs: {
      "src": _vm.homeArr.RegionCategoryList[0].RegionImageUrl
    },
    on: {
      "click": function($event) {
        _vm.jump('components/seafood/seafood.js?CategoryId=' + _vm.homeArr.RegionCategoryList[0].CategoryId)
      }
    }
  }) : _vm._e()]), _c('div', {
    staticClass: ["foods-wrapper-list", "foods-wrapper-list-two"]
  }, [(_vm.boolArr[1]) ? _c('image', {
    staticClass: ["foods-image"],
    attrs: {
      "src": _vm.homeArr.RegionCategoryList[1].RegionImageUrl
    },
    on: {
      "click": function($event) {
        _vm.jump('components/seafood/seafood.js?CategoryId=' + _vm.homeArr.RegionCategoryList[1].CategoryId)
      }
    }
  }) : _vm._e(), (_vm.boolArr[2]) ? _c('image', {
    staticClass: ["foods-image"],
    attrs: {
      "src": _vm.homeArr.RegionCategoryList[2].RegionImageUrl
    },
    on: {
      "click": function($event) {
        _vm.jump('components/seafood/seafood.js?CategoryId=' + _vm.homeArr.RegionCategoryList[2].CategoryId)
      }
    }
  }) : _vm._e()])]), _c('div', {
    staticClass: ["foods-wrapper"]
  }, [_c('div', {
    staticClass: ["foods-wrapper-list"]
  }, [(_vm.boolArr[3]) ? _c('image', {
    staticClass: ["foods-image"],
    attrs: {
      "src": _vm.homeArr.RegionCategoryList[3].RegionImageUrl
    },
    on: {
      "click": function($event) {
        _vm.jump('components/seafood/seafood.js?CategoryId=' + _vm.homeArr.RegionCategoryList[3].CategoryId)
      }
    }
  }) : _vm._e()]), _c('div', {
    staticClass: ["foods-wrapper-list"]
  }, [(_vm.boolArr[4]) ? _c('image', {
    staticClass: ["foods-image"],
    attrs: {
      "src": _vm.homeArr.RegionCategoryList[4].RegionImageUrl
    },
    on: {
      "click": function($event) {
        _vm.jump('components/seafood/seafood.js?CategoryId=' + _vm.homeArr.RegionCategoryList[4].CategoryId)
      }
    }
  }) : _vm._e()])])])]), _vm._l((_vm.homeArr.HotCategoryProdctListList), function(foodList, indexs) {
    return _c('cell', {
      key: indexs,
      appendAsTree: true,
      attrs: {
        "append": "tree"
      }
    }, [_c('div', {
      staticClass: ["list-box"]
    }, [_c('image', {
      staticClass: ["food-bg-image"],
      attrs: {
        "src": foodList.ImageUrl
      },
      on: {
        "click": function($event) {
          _vm.jump('components/seafood/seafood.js?CategoryId=' + foodList.CategoryId)
        }
      }
    })]), _c('div', {
      staticClass: ["list-box", "foot-list-wrapper"]
    }, _vm._l((_vm.homeArr.HotCategoryProdctListList[indexs].ProductsList), function(food) {
      return _c('div', {
        staticClass: ["foot-list"],
        on: {
          "click": function($event) {
            _vm.jump('components/GoodsInfo/Goods.js?ProductId=' + food.ProductId)
          }
        }
      }, [_c('div', {
        staticClass: ["image-box"]
      }, [_c('image', {
        staticClass: ["food-image"],
        attrs: {
          "src": food.ImageUrl
        }
      })]), _c('div', {
        staticClass: ["food-shop-wrapper"]
      }, [_c('div', {
        staticClass: ["food-name-wrapper"]
      }, [_c('text', {
        staticClass: ["foot-shop-name"]
      }, [_vm._v(_vm._s(food.ProductName) + "  " + _vm._s(food.Weight))])]), _c('div', {
        staticClass: ["foot-dollar-wrapper"]
      }, [_c('text', {
        staticClass: ["foot-dollar"]
      }, [_vm._v("￥" + _vm._s(_vm._f("droller")(food.SalesPrice)))]), _c('text', {
        staticClass: ["foot-more-money"]
      }, [_vm._v("￥" + _vm._s(_vm._f("droller")(food.Price)))]), _c('image', {
        staticClass: ["foot-shop-car"],
        attrs: {
          "src": "../src/components/home/shop-car.png"
        },
        on: {
          "click": function($event) {
            _vm.addShopCar(food.ProductId)
          }
        }
      })])])])
    }))])
  })], 2)], 1)
},staticRenderFns: []}
module.exports.render._withStripped = true

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = []

/* styles */
__vue_styles__.push(__webpack_require__(15)
)

/* script */
__vue_exports__ = __webpack_require__(16)

/* template */
var __vue_template__ = __webpack_require__(31)
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
__vue_options__.__file = "F:\\WebApp\\cabbage\\src\\components\\class\\class.vue"
__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
__vue_options__._scopeId = "data-v-71fb8054"
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
/* 15 */
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
    "width": "80",
    "height": "88",
    "position": "absolute",
    "top": 0,
    "right": 0
  },
  "slideShow-icon": {
    "fontSize": "50",
    "color": "#999999",
    "lineHeight": "88",
    "textAlign": "center"
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
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _wxcPopup = __webpack_require__(17);

var _wxcPopup2 = _interopRequireDefault(_wxcPopup);

var _utils = __webpack_require__(0);

var _utils2 = _interopRequireDefault(_utils);

var _searchHeader = __webpack_require__(27);

var _searchHeader2 = _interopRequireDefault(_searchHeader);

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

var dom = weex.requireModule('dom');
//1.先使用import导入你要在该组件中使用的子组件

var storage = weex.requireModule('storage');
var animation = weex.requireModule('animation');
var modal = weex.requireModule('modal');
var CLASS_URL = 'api/product/getcagegorylist';
var SELECT_URL = 'api/product/getprodcutlist?categoryId=';
var SHOPCAR_URL = 'api/cart/addCart';
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
    components: { sHeader: _searchHeader2.default, WxcPopup: _wxcPopup2.default },
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
                url: SELECT_URL + categoryId,
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
            console.log(Product_Id);
            _utils2.default.WeexAjax({
                url: SHOPCAR_URL,
                //url: self.LOGIN_URL + '?categoryId=1',    
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
        jump: function jump(href) {
            _utils2.default.bindThis(_utils2.default.jump(href), this.$getConfig());
        }
    },
    created: function created() {
        var _this = this;
        // 获取右侧列表信息和左侧副标题
        _utils2.default.WeexAjax({
            url: CLASS_URL,
            method: 'GET',
            type: 'JSON',
            callback: function callback(ret) {
                if (ret.Status == 1) {
                    _this.classArr = ret.obj;
                    _utils2.default.WeexAjax({
                        url: SELECT_URL + _this.classArr[0].CategoryId,
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
            'src': "url('//at.alicdn.com/t/font_948634_gubgm8w1dr.ttf')"
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
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = __webpack_require__(18);

Object.defineProperty(exports, 'default', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_index).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = []

/* styles */
__vue_styles__.push(__webpack_require__(19)
)

/* script */
__vue_exports__ = __webpack_require__(20)

/* template */
var __vue_template__ = __webpack_require__(26)
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
__vue_options__._scopeId = "data-v-ef24f190"
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
/* 19 */
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
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _wxcOverlay = __webpack_require__(21);

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
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = __webpack_require__(22);

Object.defineProperty(exports, 'default', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_index).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = []

/* styles */
__vue_styles__.push(__webpack_require__(23)
)

/* script */
__vue_exports__ = __webpack_require__(24)

/* template */
var __vue_template__ = __webpack_require__(25)
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
__vue_options__._scopeId = "data-v-5dc5d348"
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
/* 23 */
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
/* 24 */
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
/* 25 */
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
/* 26 */
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
/* 27 */
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
__vue_options__.__file = "F:\\WebApp\\cabbage\\src\\components\\header\\searchHeader.vue"
__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
__vue_options__._scopeId = "data-v-7409b4f8"
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
/* 28 */
/***/ (function(module, exports) {

module.exports = {
  "classes-head": {
    "paddingTop": "17",
    "paddingBottom": "17",
    "paddingLeft": "20",
    "paddingRight": "20",
    "flexDirection": "row",
    "backgroundColor": "#73cc00"
  },
  "search-box": {
    "height": "56",
    "borderRadius": "56",
    "backgroundColor": "rgba(255,255,255,0.5)",
    "paddingLeft": "20",
    "paddingRight": "20",
    "flex": 1,
    "flexDirection": "row"
  },
  "search-icon": {
    "width": "32",
    "height": "32",
    "marginTop": "12",
    "marginRight": "15"
  },
  "search-text": {
    "fontSize": "24",
    "lineHeight": "56",
    "color": "#ffffff"
  },
  "scan-btn": {
    "width": "42",
    "marginLeft": "15"
  },
  "scan-icon": {
    "width": "42",
    "height": "42",
    "marginTop": "7"
  }
}

/***/ }),
/* 29 */
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

exports.default = {};

/***/ }),
/* 30 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _vm._m(0)
},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: ["classes-head"]
  }, [_c('div', {
    staticClass: ["search-box"]
  }, [_c('image', {
    staticClass: ["search-icon"],
    attrs: {
      "src": "http://47.92.164.211:8011/PublicImage/search.png"
    }
  }), _c('text', {
    staticClass: ["search-text"]
  }, [_vm._v("搜索商品名称")])]), _c('div', {
    staticClass: ["scan-btn"]
  }, [_c('image', {
    staticClass: ["scan-icon"],
    attrs: {
      "src": "http://47.92.164.211:8011/PublicImage/scan.png"
    }
  })])])
}]}
module.exports.render._withStripped = true

/***/ }),
/* 31 */
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
  }, [_c('text', {
    ref: "slideBtn",
    staticClass: ["iconFont", "slideShow-icon"],
    on: {
      "click": _vm.openCover
    }
  }, [_vm._v("")])])]), _c('div', {
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
            _vm.jump('components/GoodsInfo/Goods.js?ProductId=' + child.ProductId)
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

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = []

/* styles */
__vue_styles__.push(__webpack_require__(33)
)

/* script */
__vue_exports__ = __webpack_require__(34)

/* template */
var __vue_template__ = __webpack_require__(62)
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
__vue_options__._scopeId = "data-v-7d6b305c"
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
/* 33 */
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
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _wxcStepper = __webpack_require__(35);

var _wxcStepper2 = _interopRequireDefault(_wxcStepper);

var _wxcCheckboxList = __webpack_require__(40);

var _wxcCheckboxList2 = _interopRequireDefault(_wxcCheckboxList);

var _wxcCheckbox = __webpack_require__(57);

var _wxcCheckbox2 = _interopRequireDefault(_wxcCheckbox);

var _utils = __webpack_require__(0);

var _utils2 = _interopRequireDefault(_utils);

var _orderHeader = __webpack_require__(58);

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
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = __webpack_require__(36);

Object.defineProperty(exports, 'default', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_index).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = []

/* styles */
__vue_styles__.push(__webpack_require__(37)
)

/* script */
__vue_exports__ = __webpack_require__(38)

/* template */
var __vue_template__ = __webpack_require__(39)
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
__vue_options__._scopeId = "data-v-53770b9d"
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
/* 37 */
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
/* 38 */
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
/* 39 */
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
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = __webpack_require__(41);

Object.defineProperty(exports, 'default', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_index).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = []

/* script */
__vue_exports__ = __webpack_require__(42)

/* template */
var __vue_template__ = __webpack_require__(56)
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
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = __webpack_require__(2);

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
/* 43 */
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
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _wxcCell = __webpack_require__(45);

var _wxcCell2 = _interopRequireDefault(_wxcCell);

var _type = __webpack_require__(54);

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
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = __webpack_require__(46);

Object.defineProperty(exports, 'default', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_index).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = []

/* styles */
__vue_styles__.push(__webpack_require__(47)
)

/* script */
__vue_exports__ = __webpack_require__(48)

/* template */
var __vue_template__ = __webpack_require__(53)
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
__vue_options__._scopeId = "data-v-63bed4b2"
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
/* 47 */
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
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _utils = __webpack_require__(49);

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
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof2 = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; /**
                                                                                                                                                                                                                                                                                * CopyRight (C) 2017-2022 Alibaba Group Holding Limited.
                                                                                                                                                                                                                                                                                * Created by Tw93 on 17/11/01
                                                                                                                                                                                                                                                                                */

var _urlParse = __webpack_require__(50);

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
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var required = __webpack_require__(51)
  , qs = __webpack_require__(52)
  , protocolre = /^([a-z][a-z0-9.+-]*:)?(\/\/)?([\S\s]*)/i
  , slashes = /^[A-Za-z][A-Za-z0-9+-.]*:\/\//;

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
var rules = [
  ['#', 'hash'],                        // Extract from the back.
  ['?', 'query'],                       // Extract from the back.
  function sanitize(address) {          // Sanitize what is left of the address
    return address.replace('\\', '/');
  },
  ['/', 'pathname'],                    // Extract from the back.
  ['@', 'auth', 1],                     // Extract from the front.
  [NaN, 'host', undefined, 1, 1],       // Set left over value.
  [/:(\d+)$/, 'port', undefined, 1],    // RegExp the back.
  [NaN, 'hostname', undefined, 1, 1]    // Set left over.
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

  if (typeof window !== 'undefined') globalVar = window;
  else if (typeof global !== 'undefined') globalVar = global;
  else if (typeof self !== 'undefined') globalVar = self;
  else globalVar = {};

  var location = globalVar.location || {};
  loc = loc || location;

  var finaldestination = {}
    , type = typeof loc
    , key;

  if ('blob:' === loc.protocol) {
    finaldestination = new Url(unescape(loc.pathname), {});
  } else if ('string' === type) {
    finaldestination = new Url(loc, {});
    for (key in ignore) delete finaldestination[key];
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
  var path = (base || '/').split('/').slice(0, -1).concat(relative.split('/'))
    , i = path.length
    , last = path[i - 1]
    , unshift = false
    , up = 0;

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

  var relative, extracted, parse, instruction, index, key
    , instructions = rules.slice()
    , type = typeof location
    , url = this
    , i = 0;

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
    } else if ((index = parse.exec(address))) {
      url[key] = index[1];
      address = address.slice(0, index.index);
    }

    url[key] = url[key] || (
      relative && instruction[3] ? location[key] || '' : ''
    );

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
  if (
      relative
    && location.slashes
    && url.pathname.charAt(0) !== '/'
    && (url.pathname !== '' || location.pathname !== '')
  ) {
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

  url.origin = url.protocol && url.host && url.protocol !== 'file:'
    ? url.protocol +'//'+ url.host
    : 'null';

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
        url.host = url.hostname +':'+ value;
      }

      break;

    case 'hostname':
      url[part] = value;

      if (url.port) value += ':'+ url.port;
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

  url.origin = url.protocol && url.host && url.protocol !== 'file:'
    ? url.protocol +'//'+ url.host
    : 'null';

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

  var query
    , url = this
    , protocol = url.protocol;

  if (protocol && protocol.charAt(protocol.length - 1) !== ':') protocol += ':';

  var result = protocol + (url.slashes ? '//' : '');

  if (url.username) {
    result += url.username;
    if (url.password) result += ':'+ url.password;
    result += '@';
  }

  result += url.host + url.pathname;

  query = 'object' === typeof url.query ? stringify(url.query) : url.query;
  if (query) result += '?' !== query.charAt(0) ? '?'+ query : query;

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


/***/ }),
/* 51 */
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
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var has = Object.prototype.hasOwnProperty
  , undef;

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
  var parser = /([^=?&]+)=?([^&]*)/g
    , result = {}
    , part;

  while (part = parser.exec(query)) {
    var key = decode(part[1])
      , value = decode(part[2]);

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

  var pairs = []
    , value
    , key;

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

      pairs.push(encodeURIComponent(key) +'='+ encodeURIComponent(value));
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
/* 53 */
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
/* 54 */
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
/* 55 */
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
/* 56 */
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
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = __webpack_require__(2);

Object.defineProperty(exports, 'default', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_index).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 58 */
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
__vue_options__.__file = "F:\\WebApp\\cabbage\\src\\components\\header\\orderHeader.vue"
__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
__vue_options__._scopeId = "data-v-215a929c"
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
/* 59 */
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
/* 60 */
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
/* 61 */
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
/* 62 */
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
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = []

/* styles */
__vue_styles__.push(__webpack_require__(64)
)

/* script */
__vue_exports__ = __webpack_require__(65)

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
__vue_options__.__file = "F:\\WebApp\\cabbage\\src\\components\\goods\\goods.vue"
__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
__vue_options__._scopeId = "data-v-6a77ff90"
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
/* 64 */
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
    "borderRadius": "54",
    "borderWidth": "4",
    "borderColor": "#73cc00",
    "borderStyle": "solid"
  },
  "share-btn": {
    "fontSize": "42",
    "lineHeight": "50",
    "color": "#73cc00",
    "textAlign": "center"
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
/* 65 */
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
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
			goodsList: [{
				store: '（滨湖春融苑店1）',
				src: '../src/components/goods/qr-code.png',
				phone: '18469113870',
				orderNumber: '6565645646465456465',
				dates: '2018-12-03',
				time: '10:00-10:30'
			}, {
				store: '（滨湖春融苑店2）',
				src: '../src/components/goods/qr-code.png',
				phone: '18469113870',
				orderNumber: '6565645646465456466',
				dates: '2018-12-03',
				time: '10:00-10:30'
			}, {
				store: '（滨湖春融苑店3）',
				src: '../src/components/goods/qr-code.png',
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
			'src': "url('//at.alicdn.com/t/font_948634_gubgm8w1dr.ttf')"
		});
	},
	mounted: function mounted() {
		this.len = this.$refs.claim.length;
	}
};

/***/ }),
/* 66 */
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
  }, [_c('text', {
    staticClass: ["share-btn", "iconFont"]
  }, [_vm._v("")])])
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

/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = []

/* styles */
__vue_styles__.push(__webpack_require__(68)
)

/* script */
__vue_exports__ = __webpack_require__(69)

/* template */
var __vue_template__ = __webpack_require__(70)
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
__vue_options__.__file = "F:\\WebApp\\cabbage\\src\\components\\my\\my.vue"
__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
__vue_options__._scopeId = "data-v-c5801bc8"
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
/* 68 */
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
    "fontSize": "42.5",
    "lineHeight": "44",
    "color": "#ffffff"
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
    "fontSize": "20",
    "lineHeight": "22",
    "color": "#ffffff",
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
    "marginRight": "15",
    "fontSize": "35",
    "lineHeight": "37",
    "color": "#fdc90b"
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
    "width": "223.3333",
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
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _utils = __webpack_require__(0);

var _utils2 = _interopRequireDefault(_utils);

var _storage = __webpack_require__(1);

var _storage2 = _interopRequireDefault(_storage);

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
var LOGIN_URL = 'api/account/getuserinfo';
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
		}
	},
	created: function created() {
		var _this = this;

		var self = this;
		var fontModule = weex.requireModule("dom");
		fontModule.addRule('fontFace', {
			'fontFamily': "iconfont",
			'src': "url('//at.alicdn.com/t/font_948634_9f4vyo6e75w.ttf')"
		});
		storage.getItem(this.USERID, function (event) {
			self.USERID = event.data;
			storage.getItem(_this.TOKEN, function (event) {
				self.TOKEN = event.data;
				_utils2.default.WeexAjax({
					url: LOGIN_URL + '?UserId=' + self.USERID,
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
/* 70 */
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
        "src": "http://47.92.164.211:8011/PublicImage/order_04.png"
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
  }))]), _c('text', {
    staticClass: ["my-tool-body-list-image-text"]
  }, [_vm._v(_vm._s(_vm.TOKEN))])])])])
},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: ["my-header-info-wrapper"]
  }, [_c('text', {
    staticClass: ["iconFont", "my-header-info"]
  }, [_vm._v("")]), _c('text', {
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
  }, [_c('text', {
    staticClass: ["iconFont", "my-info-sign-iconfont"]
  }, [_vm._v("")]), _c('text', {
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
  }, [_c('text', {
    staticClass: ["iconFont", "member-iconfont"]
  }, [_vm._v("")]), _c('text', {
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
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = []

/* styles */
__vue_styles__.push(__webpack_require__(72)
)

/* script */
__vue_exports__ = __webpack_require__(73)

/* template */
var __vue_template__ = __webpack_require__(74)
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
__vue_options__.__file = "F:\\WebApp\\cabbage\\src\\index.vue"
__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
__vue_options__._scopeId = "data-v-1a4d8e3c"
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
/* 72 */
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
/* 73 */
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

exports.default = {
    data: {
        navIndex: 'home',
        nav: [{
            title: '首页',
            iconText: '&#xe605;',
            srco: '../src/common/images/home.png',
            srct: '../src/common/images/home_act.png',
            path: 'home'
        }, {
            title: '分类',
            iconText: '&#xe645;',
            srco: '../src/common/images/class.png',
            srct: '../src/common/images/class_act.png',
            path: 'classes'
        }, {
            title: '购物车',
            iconText: '&#xe607;',
            srco: '../src/common/images/shop.png',
            srct: '../src/common/images/shop_act.png',
            path: 'shop'
        }, {
            title: '取货',
            iconText: '&#xe69e;',
            srco: '../src/common/images/goods.png',
            srct: '../src/common/images/goods_act.png',
            path: 'goods'
        }, {
            title: '我的',
            iconText: '&#xe612;',
            srco: '../src/common/images/my.png',
            srct: '../src/common/images/my_act.png',
            path: 'my'
        }]
    },
    methods: {
        jump: function jump(msg) {
            // this.navIndex = index;
            this.$router.push(msg);
            this.navIndex = msg;
        }
    },
    created: function created() {
        var fontModule = weex.requireModule("dom");
        fontModule.addRule('fontFace', {
            'fontFamily': "iconfont",
            'src': "url('//at.alicdn.com/t/font_948634_kqdokb9dv2i.ttf')"
        });
    }
};

/***/ }),
/* 74 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: ["wrapper"]
  }, [_c('router-view'), _c('div', {
    staticClass: ["tab"]
  }, [_c('div', {
    staticClass: ["tab-list"],
    on: {
      "click": function($event) {
        _vm.jump('home')
      }
    }
  }, [_c('text', {
    staticClass: ["iconFont"],
    class: [_vm.navIndex == 'home' ? 'nav-image-active' : 'nav-image']
  }, [_vm._v("")]), _c('text', {
    class: [_vm.navIndex == 'home' ? 'nav-cn-active' : 'nav-cn']
  }, [_vm._v("首页")])]), _c('div', {
    staticClass: ["tab-list"],
    on: {
      "click": function($event) {
        _vm.jump('classes')
      }
    }
  }, [_c('text', {
    staticClass: ["iconFont"],
    class: [_vm.navIndex == 'classes' ? 'nav-image-active' : 'nav-image']
  }, [_vm._v("")]), _c('text', {
    class: [_vm.navIndex == 'classes' ? 'nav-cn-active' : 'nav-cn']
  }, [_vm._v("分类")])]), _c('div', {
    staticClass: ["tab-list"],
    on: {
      "click": function($event) {
        _vm.jump('shop')
      }
    }
  }, [_c('text', {
    staticClass: ["iconFont"],
    class: [_vm.navIndex == 'shop' ? 'nav-image-active' : 'nav-image']
  }, [_vm._v("")]), _c('text', {
    class: [_vm.navIndex == 'shop' ? 'nav-cn-active' : 'nav-cn']
  }, [_vm._v("购物车")])]), _c('div', {
    staticClass: ["tab-list"],
    on: {
      "click": function($event) {
        _vm.jump('goods')
      }
    }
  }, [_c('text', {
    staticClass: ["iconFont"],
    class: [_vm.navIndex == 'goods' ? 'nav-image-active' : 'nav-image']
  }, [_vm._v("")]), _c('text', {
    class: [_vm.navIndex == 'goods' ? 'nav-cn-active' : 'nav-cn']
  }, [_vm._v("取货")])]), _c('div', {
    staticClass: ["tab-list"],
    on: {
      "click": function($event) {
        _vm.jump('my')
      }
    }
  }, [_c('text', {
    staticClass: ["iconFont"],
    class: [_vm.navIndex == 'my' ? 'nav-image-active' : 'nav-image']
  }, [_vm._v("")]), _c('text', {
    class: [_vm.navIndex == 'my' ? 'nav-cn-active' : 'nav-cn']
  }, [_vm._v("我的")])])])], 1)
},staticRenderFns: []}
module.exports.render._withStripped = true

/***/ })
/******/ ]);