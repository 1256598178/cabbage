<template>
    <div>
        <image class="login-bg" src="http://47.92.164.211:8011/PublicImage/login-bg.png"></image>
        <!--导航栏-->
        <div class="titleBar">
            <!--状态栏-->
            <text class="statusbar"></text>
            <!--标题栏-->
            <wxc-minibar title="" background-color="transparent" text-color="#000" left-button='http://47.92.164.211:8011/PublicImage/backImages.png' @wxcMinibarLeftButtonClicked="minibarLeftButtonClick()"></wxc-minibar>
        </div>
        <div class="login-title">
            <text class="login-title-text">用户登录</text>
        </div>
        <div class="login-box">
            <div class="username">
                <text class="username-img iconFont">&#xe64f;</text>
                <input ref="username" @input="input1" type="text" placeholder="请输入您的手机号码" value="" class="input" />
            </div>
            <div class="username">
                <text class="password-img iconFont">&#xe614;</text>
                <input ref="passwords" @input="input2" :type="pBtn === true ? 'password' : 'text'" placeholder="请输入您的密码" class="input" />
                <image class="pBtn" @click="typeSelect" :src="pBtn === true ? 'http://47.92.164.211:8011/PublicImage/biyan-icon.png' : 'http://47.92.164.211:8011/PublicImage/zhenyan-icon.png'"></image>
            </div>
            <div class="login-tip-box">
                <text class="login-tip">{{loginTip}}</text>
            </div>
            <div class="login-btn-box">
                <text :class="[login === true ? 'login-btns' : 'login-btn']" @click="logins">登录</text>
            </div>
            <div class="reg">
                <div class="forgot">
                    <text class="forgot-text" @click="link('FindPassword')">忘记密码</text>
                </div>
                <div class="register">
                    <text class="reg-text">还没有账号?</text>
                    <text class="forgot-text" @click="link('register')">免费注册</text>
                </div>
            </div>
            <div class="other">
                <text class="other-text">其他登录方式</text>
                <div class="other-line"></div>
                <div class="other-login">
                    <image class="login-way" src="http://47.92.164.211:8011/PublicImage/wx.png"></image>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
//const dom = weex.requireModule('dom');
import { WxcMinibar } from 'weex-ui';
import Util from '../../common/utils/utils.js'
import api from '../../common/api/api.js'
import Storage from '../../common/utils/storage.js'
const modal = weex.requireModule('modal')
var stream = weex.requireModule('stream')

export default {
    components: {
        WxcMinibar,
    },
    data: () => ({
        pBtn: true,
        login: false,
        loginTip: "",
        loginValue: {
            name: "",
            word: ""
        },
    }),
    methods: {
        minibarLeftButtonClick() {
            var self = this
            // Util.pops({
            //     "webBack": function(){
            self.$router.go(-1)
            //     },
            //     "phoneBack": function(){
            //         weex.requireModule('navigator').pop({
            //             animated: "true"
            //         }, event => {
            //         })
            //     }
            // })
        },
        typeSelect() {
            if (this.pBtn) {
                this.pBtn = false;
            } else {
                this.pBtn = true;
            }
        },
        toParams(obj) {
            var param = ""
            for (const name in obj) {
                if (typeof obj[name] != 'function') {
                    param += "&" + name + "=" + encodeURI(obj[name])
                }
            }
            return param.substring(1)
        },
        input1(e) {
            this.loginValue.name = e.value;
            if ((/^1[34578]\d{9}$/.test(this.loginValue.name)) && this.loginValue.word.length >= 6) {
                this.login = true;
            } else {
                this.login = false;
            }
        },
        input2(e) {
            this.loginValue.word = e.value;
            if ((/^1[34578]\d{9}$/.test(this.loginValue.name)) && this.loginValue.word.length >= 6) {
                this.login = true;
            } else {
                this.login = false;
            }
        },
        logins() {
            /** 获取元素的value值，但是是初始设置值 */
            //var name = this.$refs.username.value;
            //var word = this.$refs.passwords.value;
            // if (this.login) {
                /** 获取元素的value值，但是是初始设置值 */
                //var name = this.$refs.username.value;
                //var word = this.$refs.passwords.value;
                if (this.login) {
                    var self = this;
                    Util.WeexAjax({
                        url: api.LOGIN_URL,
                        method: 'POST',
                        type: 'JSON',
                        body: {
                            // 手机号
                            'MobilePhone': this.loginValue.name,
                            // 'MobilePhone': '17718157597',
                            // 密码
                            'PassWord': this.loginValue.word,
                            // 'PassWord': '123456',
                        },
                        callback: function(ret) {
                            // let rets = Util.JsonFormat(ret);
                            if (ret.Status == 0) {
                                self.loginTip = ret.Message;
                            } else if (ret.Status == 1) {
                                console.log(ret)
                                Storage.setItems({
                                    'user_token': ret.obj.Token,
                                    'user_id': ret.obj.UserId
                                })
                                // Util.pops({
                                //     "webBack": function(){
                                //         self.$router.go(-1)
                                //     },
                                //     "phoneBack": function(){}
                                // })
                                // Util.jump({
                                //     "phoneJump": function(){
                                //         var bundleUrl = self.bundleUrl;
                                //         weex.requireModule('navigator').push({
                                //             url: Util.urlPort().urlAddPort + 'dist/' + "index.js",
                                //             animated: "true"
                                //         }, event => {})
                                //     },
                                //     "webJump": function(){
                                        self.$router.push({name: "main"})
                                    // }
                                // })
                            }
                        }
                    })
                }
        },
		link(urls){
            var self = this;
			// Util.jump({
   //              "phoneJump": function(){
   //                  var bundleUrl = self.bundleUrl;
   //                  weex.requireModule('navigator').push({
   //                      url: Util.urlPort().urlAddPort + 'dist/' + urls.phone,
   //                      animated: "true"
   //                  }, event => {})
   //              },
   //              "webJump": function(){
                    self.$router.push({name: urls})
            //     }
            // })
		}
    },
    created() {
        var fontModule = weex.requireModule("dom");
        fontModule.addRule('fontFace', {
            'fontFamily': "iconfont",
            'src': "url('" + api.iconUrl + "')"
        })
    }
};
</script>
<style>
.iconFont {
    font-family: iconfont;
}

.login-bg {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
}

.left {
    padding-left: 20px !important;
}

.left-button {
    width: 28px !important;
    height: 41px !important;
}

.login-title {
    border-bottom-width: 1px;
    border-bottom-color: #a0a0a0;
    border-bottom-style: solid;
    padding-left: 20px;
}

.login-title-text {
    font-size: 48px;
    line-height: 90px;
    color: #333;
}

.login-box {
    padding-left: 20px;
    padding-right: 20px;
    position: fixed;
    top: 210px;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 100;
}

.username {
    flex-direction: row;
    align-items: center;
    padding-top: 20px;
    padding-bottom: 20px;
    border-bottom-width: 1px;
    border-bottom-color: #dcdcdc;
    border-bottom-style: solid;
}

.username-img {
    width: 54px;
    font-size: 34px;
    line-height: 70px;
    color: #999;
    text-align: left;
}

.password-img {
    width: 54px;
    font-size: 32px;
    line-height: 70px;
    color: #999;
    text-align: left;
}

.pBtn {
    width: 34px;
    height: 22px;

}

.input {
    flex: 1;
    height: 70px;
    line-height: 70px;
    font-size: 30px;
    line-height: 70px !important;
    background-color: transparent;
}

.login-tip-box {
    width: 710px;
    height: 60px;
}

.login-tip {
    font-size: 24px;
    line-height: 40px;
    color: #ff0000;
    text-align: center;
}

.login-btn {
    height: 80px;
    font-size: 30px;
    line-height: 80px;
    border-radius: 40px;
    color: #fff;
    text-align: center;
    background-color: #abd475;
}

.login-btns {
    height: 80px;
    font-size: 30px;
    line-height: 80px;
    border-radius: 40px;
    color: #fff;
    text-align: center;
    background-color: #73cc00;
}

.reg {
    flex-direction: row;
    margin-top: 15px;
}

.forgot {
    flex: 1;
}

.forgot-text {
    width: auto;
    font-size: 24px;
    line-height: 30px;
    color: #73cc00;
}

.register {
    width: auto;
    flex-direction: row;
}

.reg-text {
    width: auto;
    font-size: 24px;
    line-height: 30px;
    color: #666;
}

.other {
    justify-content: center;
    text-align: center;
    margin-top: 230px;
}

.other-text {
    font-size: 24px;
    line-height: 30px;
    color: #666;
    text-align: center;
}

.other-line {
    width: 40px;
    height: 1px;
    background-color: #a0a0a0;
    margin-top: 20px;
    margin-bottom: 25px;
    margin-left: 335px;
    margin-right: 335px;
}

.other-login {
    flex-direction: row;
    justify-content: center;
}

.login-way {
    width: 86px;
    height: 86px;
    margin-left: 15px;
    margin-right: 15px;
}
</style>