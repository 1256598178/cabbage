<template>
    <!-- 我的优惠券 -->
    <div class="reward">
        <div class="find-title-box">
            <v-header :titleName="titleName" :backPage="true" :info="true"></v-header>
            <div class="find-title-boxs"></div>
        </div>
        <wxc-tab-page ref="wxc-tab-page" :tab-titles="tabTitles" :tab-styles="tabStyles" title-type="icon" :tab-page-height="tabPageHeight" @wxcTabPageCurrentTabSelected="wxcTabPageCurrentTabSelected">
            <list v-for="(v,index) in tabList" :key="index" class="item-container" :style="{ height: (tabPageHeight - tabStyles.height - 122 ) + 'px',backgroundColor: '#f5f5f5'}">
                <cell class="border-cell"></cell>
                <!-- 优惠券列表 -->
                <cell v-for="(demo,key) in v" class="cell" :key="key">
                    <wxc-pan-item :ext-id="'1-' + (v) + '-' + (key)" url="" @wxcPanItemPan="wxcPanItemPan">
                        <div class="coupon-list">
                            <div class="coupon-list-left">
                                <text class="coupon-list-left-title">适用范围：暖心火锅节满减券</text>
                                <text class="coupon-list-left-reduction">满25.0元可使用</text>
                                <text class="coupon-list-left-time">2018-11-30~2018-11-30</text>
                            </div>
                            <div class="coupon-list-line"></div>
                            <div class="coupon-list-right">
                                <div class="coupon-list-right-reduction-box">
                                    <text class="coupon-list-right-reduction">¥</text><text class="coupon-list-right-num">5</text>
                                </div>
                                <text class="coupon-list-right-btn">立即使用</text>
                            </div>
                        </div>
                    </wxc-pan-item>
                </cell>
                <!-- 是否有内容 -->
                <cell class="reward-no-content" v-if="rewardContent">
                    <div class="reward-no-icon">
                        <image class="reward-no-image" src="http://47.92.164.211:8011/PublicImage/reward@195x172.png"></image>
                        <text class="reward-no-image">暂无优惠券！</text>
                    </div>
                </cell>
            </list>
        </wxc-tab-page>
    </div>
</template>
<script>
import header from '../header/orderHeader.vue'
import Util from '../../common/utils/utils.js'
import { WxcTabPage, WxcPanItem, Utils, BindEnv } from 'weex-ui';
// https://github.com/alibaba/weex-ui/blob/master/example/tab-page/config.js
import Config from './config'
import Vue from 'vue'
const dom = weex.requireModule('dom');
const storage = weex.requireModule('storage')
const MYCOUPON = 'api/account/getmycouponslist?UserId='
export default {
    data() {
        return {
            titleName: '我的优惠券',
            rewardContent: false, //是否有内容
            refreshing: false, //下拉刷新
            loadinging: false, //上拉加载
            tabTitles: Config.tabTitles,
            tabStyles: Config.tabStyles,
            USERID: 'user_id',
			TOKEN: 'user_token',
            tabList: [],
            demoList: [1, 2, 3, 4, 5, 6, 7, 8, 9],
            tabPageHeight: 1334
        }
    },
    methods: {
        onrefresh() {
            this.refreshing = true;
            setTimeout(() => {
                this.refreshing = false;
            }, 2000)
        },
        onloading() {
            this.loadinging = true;
            setTimeout(() => {
                this.loadinging = false;
            }, 2000)
        },
        wxcTabPageCurrentTabSelected(e) {
            const self = this;
            const index = e.page;
            /* Unloaded tab analog data request */
            if (!Utils.isNonEmptyArray(self.tabList[index])) {
                setTimeout(() => {
                    Vue.set(self.tabList, index, self.demoList);
                }, 100);
            }
        },
        wxcPanItemPan(e) {
            if (BindEnv.supportsEBForAndroid()) {
                this.$refs['wxc-tab-page'].bindExp(e.element);
            }
        }
    },
    components: {
        "v-header": header,
        WxcTabPage,
        WxcPanItem
    },
    created() {
        this.tabPageHeight = Utils.env.getPageHeight();
        this.tabList = [...Array(this.tabTitles.length).keys()].map(i => []);
        Vue.set(this.tabList, 0, this.demoList);
        // 发送ajsx
        var self = this;
        storage.getItem(this.USERID, event => {
            self.USERID = event.data
            storage.getItem(this.TOKEN, event => {
                self.TOKEN = event.data
                Util.WeexAjax({
                    url: MYCOUPON + self.USERID,
                    method: 'GET',
                    type: 'JSON',
                    token: self.TOKEN,
                    callback: function(ret) {
                    	var rets = ret;
                        if (ret.Status == 1) {
                        	console.log(rets)
                        }
                    }
                })
            })
        });
    },
}
</script>
<style lang="stylus" scoped>
.congra-body-wrapper {
    padding-top: 20px;
    padding-left: 20px;
    padding-right: 20px;
    padding-bottom: 20px;
    background-color: #fff;
}

.find-title-boxs {
    height: 10px;
    width: 750px;
    background-color: #f5f5f5;
}

.item-container {
    width: 750px;
    background-color: #f5f5f5;
}

.border-cell {
    background-color: #f5f5f5;
    width: 750px;
    height: 24px;
    align-items: center;
    justify-content: center;
}

.cell {
    background-color: #f5f5f5;
}

.coupon-list {
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 710px;
    margin-left: 20px;
    margin-right: 20px;
    margin-bottom: 15px;
}

.coupon-list-left,
.coupon-list-right {
    padding: 25px 20px;
    background-color: #addfb8;
    height: 200px;
    border-radius: 15px;
}

.coupon-list-left {
    display: flex;
    flex-direction: column;
    width: 539.5px;
}

.coupon-list-left-title {
    margin-bottom: 40px;
    font-size: 30px;
    color: #ffffff;
    font-weight: bold;
}

.coupon-list-left-reduction,
.coupon-list-left-time {
    margin-bottom: 10px;
    font-size: 24px;
    color: #ffffff;
}

.coupon-list-line {
    width: 1px;
    height: 177px;
    border-width: .5px;
    border-color: #22ac38;
    border-style: dashed;
}

.coupon-list-right {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 169.5px;
}

.coupon-list-right-reduction-box {
    display: flex;
    flex-direction: row;
    align-items: flex-end;
}

.coupon-list-right-reduction {
    margin-right: 5px;
    font-size: 60px;
    color: #fff;
    line-height: 68px;
}

.coupon-list-right-num {
    font-size: 80px;
    color: #fff;
    font-weight: bold;
    line-height: 84px;
}

.coupon-list-right-btn {
    width: 95px;
    height: 30px;
    font-size: 18px;
    color: #fff;
    border-radius: 30px;
    background-color: #73cc00;
    text-align: center;
    line-height: 30px;
}

////////////////////////无内容显示信息

.reward-no-content {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    width: 750px;
    height: 470px;
}

.reward-no-icon {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.reward-no-image {
    width: 195px;
    height: 172px;
}

.reward-no-image {
    font-size: 22px;
    color: #777777;
    margin-top: 20px;
    text-align: center;
}
</style>