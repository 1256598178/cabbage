<template>
    <!-- 我的优惠券 -->
    <div class="reward">
        <div class="find-title-box">
            <v-header :titleName="titleName" :backPage="true" :info="true"></v-header>
            <div class="find-title-boxs"></div>
        </div>
        <div class="header-title">
            <text class="header-title-name">不使用优惠券</text>
            <wxc-checkbox :config="config" :has-bottom-border="false" :checked="true" class="shop-list-checkout" @wxcCheckBoxItemChecked="wxcCheckBoxItemChecked"></wxc-checkbox>
        </div>
        <list class="item-container">
            <cell class="cell">
            	<text class="cell-title">每笔订单只能使用一张优惠券</text>
                <div class="coupon-list">
                    <div class="coupon-list-left" :class="[selectBox == false ? 'coupon-list-left-no' : '']">
                        <text class="coupon-list-left-title">适用范围：暖心火锅节满减券</text>
                        <text class="coupon-list-left-reduction">满25.0元可使用</text>
                        <text class="coupon-list-left-time">2018-11-30~2018-11-30</text>
                    </div>
                    <div class="coupon-list-line" :class="[selectBox == false ? 'coupon-line-list-no' : '']"></div>
                    <div class="coupon-list-right" :class="[selectBox == false ? 'coupon-list-right-no' : '']">
                        <div class="coupon-list-right-reduction-box">
                            <text class="coupon-list-right-reduction">¥</text><text class="coupon-list-right-num">5</text>
                        </div>
                        <text class="coupon-list-right-btn" :class="[selectBox == false ? 'coupon-list-right-btn-no' : '']">立即使用</text>
                    </div>
                </div>
                <div class="coupon-list">
                    <div class="coupon-list-left" :class="[selectBox == false ? 'coupon-list-left-no' : '']">
                        <text class="coupon-list-left-title">适用范围：暖心火锅节满减券</text>
                        <text class="coupon-list-left-reduction">满25.0元可使用</text>
                        <text class="coupon-list-left-time">2018-11-30~2018-11-30</text>
                    </div>
                    <div class="coupon-list-line" :class="[selectBox == false ? 'coupon-line-list-no' : '']"></div>
                    <div class="coupon-list-right" :class="[selectBox == false ? 'coupon-list-right-no' : '']">
                        <div class="coupon-list-right-reduction-box">
                            <text class="coupon-list-right-reduction">¥</text><text class="coupon-list-right-num">5</text>
                        </div>
                        <text class="coupon-list-right-btn" :class="[selectBox == false ? 'coupon-list-right-btn-no' : '']">立即使用</text>
                    </div>
                </div>
            </cell>
            <cell class="cell">
            	<text class="cell-title">每笔订单只能使用一张优惠券</text>
                <div class="coupon-list">
                    <div class="coupon-list-left coupon-list-left-no">
                        <text class="coupon-list-left-title">适用范围：暖心火锅节满减券</text>
                        <text class="coupon-list-left-reduction">满25.0元可使用</text>
                        <text class="coupon-list-left-time">2018-11-30~2018-11-30</text>
                    </div>
                    <div class="coupon-list-line coupon-line-list-no"></div>
                    <div class="coupon-list-right coupon-list-right-no">
                        <div class="coupon-list-right-reduction-box">
                            <text class="coupon-list-right-reduction">¥</text><text class="coupon-list-right-num">5</text>
                        </div>
                        <text class="coupon-list-right-btn coupon-list-right-btn-no">立即使用</text>
                    </div>
                </div>
                <div class="coupon-list">
                    <div class="coupon-list-left coupon-list-left-no">
                        <text class="coupon-list-left-title">适用范围：暖心火锅节满减券</text>
                        <text class="coupon-list-left-reduction">满25.0元可使用</text>
                        <text class="coupon-list-left-time">2018-11-30~2018-11-30</text>
                    </div>
                    <div class="coupon-list-line coupon-line-list-no"></div>
                    <div class="coupon-list-right coupon-list-right-no">
                        <div class="coupon-list-right-reduction-box">
                            <text class="coupon-list-right-reduction">¥</text><text class="coupon-list-right-num">5</text>
                        </div>
                        <text class="coupon-list-right-btn coupon-list-right-btn-no">立即使用</text>
                    </div>
                </div>
                <div class="coupon-list">
                    <div class="coupon-list-left coupon-list-left-no">
                        <text class="coupon-list-left-title">适用范围：暖心火锅节满减券</text>
                        <text class="coupon-list-left-reduction">满25.0元可使用</text>
                        <text class="coupon-list-left-time">2018-11-30~2018-11-30</text>
                    </div>
                    <div class="coupon-list-line coupon-line-list-no"></div>
                    <div class="coupon-list-right coupon-list-right-no">
                        <div class="coupon-list-right-reduction-box">
                            <text class="coupon-list-right-reduction">¥</text><text class="coupon-list-right-num">5</text>
                        </div>
                        <text class="coupon-list-right-btn coupon-list-right-btn-no">立即使用</text>
                    </div>
                </div>
                <div class="coupon-list">
                    <div class="coupon-list-left coupon-list-left-no">
                        <text class="coupon-list-left-title">适用范围：暖心火锅节满减券</text>
                        <text class="coupon-list-left-reduction">满25.0元可使用</text>
                        <text class="coupon-list-left-time">2018-11-30~2018-11-30</text>
                    </div>
                    <div class="coupon-list-line coupon-line-list-no"></div>
                    <div class="coupon-list-right coupon-list-right-no">
                        <div class="coupon-list-right-reduction-box">
                            <text class="coupon-list-right-reduction">¥</text><text class="coupon-list-right-num">5</text>
                        </div>
                        <text class="coupon-list-right-btn coupon-list-right-btn-no">立即使用</text>
                    </div>
                </div>
                <div class="coupon-list">
                    <div class="coupon-list-left coupon-list-left-no">
                        <text class="coupon-list-left-title">适用范围：暖心火锅节满减券</text>
                        <text class="coupon-list-left-reduction">满25.0元可使用</text>
                        <text class="coupon-list-left-time">2018-11-30~2018-11-30</text>
                    </div>
                    <div class="coupon-list-line coupon-line-list-no"></div>
                    <div class="coupon-list-right coupon-list-right-no">
                        <div class="coupon-list-right-reduction-box">
                            <text class="coupon-list-right-reduction">¥</text><text class="coupon-list-right-num">5</text>
                        </div>
                        <text class="coupon-list-right-btn coupon-list-right-btn-no">立即使用</text>
                    </div>
                </div>
                <div class="coupon-list">
                    <div class="coupon-list-left coupon-list-left-no">
                        <text class="coupon-list-left-title">适用范围：暖心火锅节满减券</text>
                        <text class="coupon-list-left-reduction">满25.0元可使用</text>
                        <text class="coupon-list-left-time">2018-11-30~2018-11-30</text>
                    </div>
                    <div class="coupon-list-line coupon-line-list-no"></div>
                    <div class="coupon-list-right coupon-list-right-no">
                        <div class="coupon-list-right-reduction-box">
                            <text class="coupon-list-right-reduction">¥</text><text class="coupon-list-right-num">5</text>
                        </div>
                        <text class="coupon-list-right-btn coupon-list-right-btn-no">立即使用</text>
                    </div>
                </div>
            </cell>
            <!-- 是否有内容 -->
            <cell class="reward-no-content" v-if="rewardContent">
                <div class="reward-no-icon">
                    <image class="reward-no-image" src="http://47.92.164.211:8011/PublicImage/reward@195x172.png"></image>
                    <text class="reward-no-image">暂无优惠券！</text>
                </div>
            </cell>
        </list>
    </div>
</template>
<script>
import header from '../header/orderHeader.vue'
import { WxcCheckbox, WxcCheckboxList, WxcStepper } from 'weex-ui'
export default {
    data() {
        return {
            titleName: '我的优惠券',
            rewardContent: false, //是否有内容
            refreshing: false, //下拉刷新
            loadinging: false, //上拉加载
            config: {
                //初始单选框
                unCheckedIcon: 'http://47.92.164.211:8011/PublicImage/unchecked.png',
                checkedIcon: 'http://47.92.164.211:8011/PublicImage/checked.png',
                disabledIcon: 'https://gw.alicdn.com/tfs/TB1PtN3pwMPMeJjy1XdXXasrXXa-72-72.png',
                checkedDisabledIcon: 'https://gw.alicdn.com/tfs/TB1aPabpwMPMeJjy1XcXXXpppXa-72-72.png',
                unCheckedDisabledIcon: 'https://gw.alicdn.com/tfs/TB1lTuzpwoQMeJjy0FoXXcShVXa-72-72.png',
                checkedColor: '#f40',
            },
            selectBox: true
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
        // 选中
        wxcCheckBoxItemChecked(e) {
        	this.selectBox = e.checked;
        	console.log(this.selectBox)
        },
    },
    components: {
        "v-header": header,
        WxcCheckbox,
        WxcCheckboxList,
        WxcStepper,
    }
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

/////////////////////////////
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

.header-title {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding-left: 20px;
    // padding-right: 20px;
    background-color: #fff;
}

.header-title-name {
    font-size: 24px;
    color: #333;
    // font-weight: bold;
}
.cell-title{
	margin-left: 20px;
	margin-top: 20px;
	margin-bottom: 20px;
	font-size: 22px;
	color: #777777;
}
////////////////////////////////选择按钮



// //////////////////不可选择按钮
.coupon-list-left-no,.coupon-list-right-no{
	background-color: #d0d0d0;
}
.coupon-line-list-no{
	border-color: #aaaaaa;
}
.coupon-list-right-btn-no{
	background-color: #a8a8a8;
}
</style>