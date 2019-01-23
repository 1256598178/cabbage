<template>
    <div class="shop-header-title-wrapper">
        <image class="backBtn" v-if="backPage" :src="btnImage.backImage" @click="pops()"></image>
        <text class="shop-header-title">{{titleName}}</text>
        <text class="shop-header-delet" v-if="deleted" @click="deletFoods()">删除</text>
        <text class="shop-header-delet" v-if="cancel" @click="cancel()">取消</text>
        <text class="shop-header-info" v-if="info" @click="">使用说明</text>
        <image class="shareBtn" v-if="shareBtn" :src="btnImage.shareImage"></image>
        <image class="layoutBtn-44" v-if="layout" @click="layoutClick()" :src="layoutAct == false ? layoutImage.urlImage : layoutImage.urlImageAct"></image>
    </div>
</template>
<script>
import Util from '../../common/utils/utils.js'
var navigator = weex.requireModule('navigator')
var modal = weex.requireModule('modal')
export default {
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
    data() {
        return {
            layoutActBool: false,
            btnImage: {
                backImage: "http://47.92.164.211:8011/PublicImage/backImage.png",
                shareImage: "http://47.92.164.211:8011/PublicImage/share@46x46.png"
            },
            layoutImage: {
                urlImage: 'http://47.92.164.211:8011/PublicImage/layout@44x44.png',
                urlImageAct: 'http://47.92.164.211:8011/PublicImage/layoutACT@44x44.png',
            }
        }
    },
    methods: {
        pops() {
            Util.pops()
        },
        layoutClick() {
            this.$emit("layoutAct", this.layoutActBool = !this.layoutActBool);
        }
    },
    created() {
        var fontModule = weex.requireModule("dom");
        fontModule.addRule('fontFace', {
            'fontFamily': "iconfont",
            'src': "url('//at.alicdn.com/t/font_948634_q51n034oj8.ttf')"
        })
    },
}
</script>
<style lang="stylus" scoped>
.iconFont {
    font-family: iconfont;
}

.backBtn {
    position: absolute;
    left: 20px;
    top: 25.5px;
    width: 28px;
    height: 41px;
}

.shareBtn {
    position: absolute;
    top: 23px;
    right: 20px;
    width: 46px;
    height: 46px;
}

.layoutBtn-44 {
    position: absolute;
    top: 24px;
    right: 20px;
    width: 44px;
    height: 44px;
}

.shop-header-title-wrapper {
    position: relative;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    height: 92px;
    /*26 + 40 + 26*/
    padding-left: 20px;
    padding-right: 20px;
    background-color: rgb(115, 204, 70);
}

.shop-header-title {
    width: 500px;
    font-size: 42px;
    color: #fff;
    text-align: center;
    text-overflow: ellipsis;
    lines: 1;
}

.shop-header-delet,
.shop-header-info {
    position: absolute;
    right: 20px;
    top: 0;
    margin-top: 27px;
    font-size: 34px;
    line-height: 38px;
    color: #c1e6a3;
}

.shop-header-info {
    color: #fff;
}
</style>