<template>
    <div class="wrapper">
        <router-view />
        <div class="tab">
            <!-- <li class="tab-list" v-for="(item,index) in nav" @click="jump(index,item.path)" :key="index">
                <image class="nav-img" :src=" navIndex === index ? item.srct : item.srco"></image>
                <text class="iconFont"  v-html="item.iconText"></text>
                <text :class="[navIndex === index ? 'nav-cn-active' : 'nav-cn']">{{item.title}}</text>
            </li> -->
            <div class="tab-list" @click="jump('home')">
                <!-- <image class="nav-img" :src=" navIndex === index ? item.srct : item.srco"></image> -->
                <text class="iconFont" :class="[navIndex == 'home' ? 'nav-image-active' : 'nav-image']">&#xe605;</text>
                <text :class="[navIndex == 'home' ? 'nav-cn-active' : 'nav-cn']">首页</text>
            </div>
            <div class="tab-list" @click="jump('classes')">
                <!-- <image class="nav-img" :src=" navIndex === index ? item.srct : item.srco"></image> -->
                <text class="iconFont" :class="[navIndex == 'classes' ? 'nav-image-active' : 'nav-image']">&#xe645;</text>
                <text :class="[navIndex == 'classes' ? 'nav-cn-active' : 'nav-cn']">分类</text>
            </div>
            <div class="tab-list" @click="jump('shop')">
                <!-- <image class="nav-img" :src=" navIndex === index ? item.srct : item.srco"></image> -->
                <text class="iconFont" :class="[navIndex == 'shop' ? 'nav-image-active' : 'nav-image']">&#xe607;</text>
                <text :class="[navIndex == 'shop' ? 'nav-cn-active' : 'nav-cn']">购物车</text>
            </div>
            <div class="tab-list" @click="jump('goods')">
                <!-- <image class="nav-img" :src=" navIndex === index ? item.srct : item.srco"></image> -->
                <text class="iconFont" :class="[navIndex == 'goods' ? 'nav-image-active' : 'nav-image']">&#xe69e;</text>
                <text :class="[navIndex == 'goods' ? 'nav-cn-active' : 'nav-cn']">取货</text>
            </div>
            <div class="tab-list" @click="jump('my')">
                <!-- <image class="nav-img" :src=" navIndex === index ? item.srct : item.srco"></image> -->
                <text class="iconFont" :class="[navIndex == 'my' ? 'nav-image-active' : 'nav-image']">&#xe612;</text>
                <text :class="[navIndex == 'my' ? 'nav-cn-active' : 'nav-cn']">我的</text>
            </div>
        </div>
    </div>
</template>
<script>
export default {
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
            },
            {
                title: '购物车',
                iconText: '&#xe607;',
                srco: '../src/common/images/shop.png',
                srct: '../src/common/images/shop_act.png',
                path: 'shop'
            },
            {
                title: '取货',
                iconText: '&#xe69e;',
                srco: '../src/common/images/goods.png',
                srct: '../src/common/images/goods_act.png',
                path: 'goods'
            },
            {
                title: '我的',
                iconText: '&#xe612;',
                srco: '../src/common/images/my.png',
                srct: '../src/common/images/my_act.png',
                path: 'my'
            },
        ]
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
            'src': "url('//at.alicdn.com/t/font_948634_kqdokb9dv2i.ttf')"
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
    // margin-left: 50px;
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