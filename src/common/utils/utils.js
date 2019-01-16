const Storage = require('./storage.js');
const stream = weex.requireModule('stream');
const navigator = weex.requireModule('navigator')
const modal = weex.requireModule('modal')
const AJAX_URL = 'http://47.92.164.211:8011/'
let utils = {
    // 发送请求
    WeexAjax(obj) {
        let me = this;
        let URL = obj.url;
        let Result = "loding...";
        if (obj.method == 'POST' || obj.method == 'GET') {
            stream.fetch({
                headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Authorization': 'Bearer ' + obj.token },
                method: obj.method,
                url: AJAX_URL + URL,
                type: obj.type,
                // body: 'MobilePhone='+this.loginValue.name
                // 拼接字符串
                body: me.toParams(obj.body)
            }, function(res) {
                if (!res.ok) {
                    me.Result = "request failed";
                    // me.loginTip = '请求错误,请重试!'
                } else {
                    // 返回相应内容
                    let rets = me.JsonFormat(res.data);
                    // console.log(rets.Status)
                    obj.callback(rets);
                }
            }, function(response) {});
        } else {
            console.log('请求方式错误')
        }
    },
    // body请求主体转换函数
    toParams(obj) {
        var param = ""
        for (const name in obj) {
            if (typeof obj[name] != 'function') {
                param += "&" + name + "=" + encodeURI(obj[name])
            }
        }
        return param.substring(1)
    },
    // 不同的设备json解析不同
    JsonFormat(msg) {
        let rest = {};
        if (this.device() == 0 || this.device() == 2) {
            rest = JSON.parse(msg)
        } else if (this.device() == 1) {
            rest = eval(msg)
        } else {
            rest = msg;
        }
        return rest;
    },
    // 页面跳转navigation
    jump(href, event) {
        var bundleUrl = this.bundleUrl;
        var url = decodeURI(weex.config.bundleUrl); //取得整个地址栏
        var result = url.match(new RegExp("[a-zA-z]+://[^\s]{19}", "g"));
        if (WXEnvironment.platform === 'Web') {
            console.warn('Web端跳转待开发')
            // window.location.href = 'http://192.168.1.103:8082/src/components/other/find.vue'
            // window.location.href = href
        } else {
            navigator.push({
                // url: '../../../dist/components/other/find.js',
                url: result + 'dist/' + href,
                // url: 'http://192.168.1.104:8082/dist/components/other/find.js',
                animated: "true"
            }, event => {
                // modal.toast({ message: 'callback: ' + event })
            })
        }
    },
    //跳转延迟
    NavigatUrl(obj) {
        const self = this;
        modal.toast({
            message: obj.message,
            duration: obj.duration
        })
        setTimeout(function() {
            self.bindThis(self.jump(obj.urls), obj._this)
        }, obj.duration)
    },
    // 判断当前处于哪个设备
    device() {
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
    bindThis(f, oTarget) {
        return function() {
            return f.apply(oTarget, arguments);
        };
    },
    analAjax() {
        var url = decodeURI(weex.config.bundleUrl); //取得整个地址栏
        var result = url.match(new RegExp(/\?\w*\=\w(\&\w*\=\w*)*/, "g"))[0].slice(1);
        var key = result.match(new RegExp(/\w*\=/, "g"));
        var value = result.match(new RegExp(/\=\w*/, "g"));
        var warp = {};
        for (var indexes in value) {
            key[indexes] = key[indexes].slice(0, key[indexes].length - 1)
            value[indexes] = value[indexes].slice(1)
            warp[key[indexes]] = value[indexes]
        }
        return warp
    }
}
export default utils;


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