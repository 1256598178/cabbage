<template>
    <div class="wrapper">
        <router-view />
        <div class="tab">
            <div class="tab-list" v-for="(item,index) in nav" @click="jump(item.path)" :key="index">
                <image class="nav-img" :src=" navIndex === item.path ? item.srct : item.srco"></image>
                <!-- <text class="iconFont" :class="[navIndex == item.path ? 'nav-image-active' : 'nav-image']">{{item.iconText}}</text> -->
                <text :class="[navIndex == item.path ? 'nav-cn-active' : 'nav-cn']">{{item.title}}</text>
            </div>
        </div>
    </div>
</template>
<script>
import api from '../../common/api/api.js'
export default {
    data() {
        return {
            navIndex: 'home',
            nav: [{
                    title: '首页',
                    iconText: '\ue605', //'&#xe619;'转换成'\ue619'是为了解决在v-for循环中直接显示字符串的bug
                    srco: 'http://47.92.164.211:8011/PublicImage/home.png',
                    srct: 'http://47.92.164.211:8011/PublicImage/home_act.png',
                    path: 'home'
                }, {
                    title: '分类',
                    iconText: '\ue645',
                    srco: 'http://47.92.164.211:8011/PublicImage/class.png',
                    srct: 'http://47.92.164.211:8011/PublicImage/class_act.png',
                    path: 'classes'
                },
                {
                    title: '购物车',
                    iconText: '\ue607',
                    srco: 'http://47.92.164.211:8011/PublicImage/shop.png',
                    srct: 'http://47.92.164.211:8011/PublicImage/shop_act.png',
                    path: 'shop'
                },
                {
                    title: '取货',
                    iconText: '\ue69e',
                    srco: 'http://47.92.164.211:8011/PublicImage/goods.png',
                    srct: 'http://47.92.164.211:8011/PublicImage/goods_act.png',
                    path: 'goods'
                },
                {
                    title: '我的',
                    iconText: '\ue612',
                    srco: 'http://47.92.164.211:8011/PublicImage/my.png',
                    srct: 'http://47.92.164.211:8011/PublicImage/my_act.png',
                    path: 'my'
                },
            ]
            }
        },
    methods: {
        jump(msg) {
            // this.navIndex = index;
            this.$router.push(msg);
            this.navIndex = msg;
        }
    },
    created() {
        var fontModule = weex.requireModule("dom");
        fontModule.addRule('fontFace', {
            'fontFamily': "iconfont",
            'src': "url('" + api.iconUrl + "')"
        })
    }
}
</script>
<style lang="stylus" scoped>
.iconFont{
    font-family: iconfont;
}
.tab {
    position: fixed;
    bottom: 0;
    height: 110px;
    width: 750px;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    border-top-width: 1px;
    border-top-color: #eee;
    border-top-style: solid;
    background-color: #fff;
}

.tab-list {
    width: 150px;
    height: 110px;
    text-align: center;
    display: flex;
    justify-content: center;
    flex-warp:warp;
    align-items: center;
    flex-direction: column;
}

.nav-img {
    width: 50px;
    height: 50px;
    margin-top: 15px;
}

.nav-cn {
    font-size: 20px;
    text-align: center;
    margin-top: 10px;
    color: #777;
}

.nav-cn-active {
    font-size: 20px;
    text-align: center;
    margin-top: 10px;
    color: #73cc00;
}
.nav-image{
    font-size: 50px;
    color: #777777;
}
.nav-image-active{
    font-size: 50px;
    color: #73cc00;
}
</style>