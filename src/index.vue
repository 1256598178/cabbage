<template>
    <div class="wrapper">
        <router-view />
        <ul class="tab">
            <li class="tab-list" v-for="(item,index) in nav" @click="jump(index,item.path)" :key="index">
                <image class="nav-img" :src=" navIndex === index ? item.srct : item.srco"></image>
                <text :class="[navIndex === index ? 'nav-cn-active' : 'nav-cn']">{{item.title}}</text>
            </li>
        </ul>
    </div>
</template>
<script>
export default {
    data: {
        nav: [{
                title: '首页',
                srco: '../src/common/images/home.png',
                srct: '../src/common/images/home_act.png',
                path: 'home'
            }, {
                title: '分类',
                srco: '../src/common/images/class.png',
                srct: '../src/common/images/class_act.png',
                path: 'classes'
            },
            {
                title: '购物车',
                srco: '../src/common/images/shop.png',
                srct: '../src/common/images/shop_act.png',
                path: 'shop'
            },
            {
                title: '取货',
                srco: '../src/common/images/goods.png',
                srct: '../src/common/images/goods_act.png',
                path: 'goods'
            },
            {
                title: '我的',
                srco: '../src/common/images/my.png',
                srct: '../src/common/images/my_act.png',
                path: 'my'
            },
        ],
        navIndex: 0,
    },
    methods: {
        jump(index, msg) {
            this.navIndex = index;
            this.$router.push(msg);
        }
    }
}
</script>
<style lang="stylus" scoped>
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
}

.nav-img {
    width: 50px;
    height: 50px;
    margin-top: 15px;
    margin-left: 50px;
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
</style>