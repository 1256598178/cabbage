<template>
	<div class="act">
		<!-- <v-header :title="活动详情"></v-header> -->
		<list>
			<cell>
				<div class="result">
            <div class="times">
                <div class="list payment">
                  <div class="result-text">
                    <text class="protext protextact">提现申请已提交，等待系统处理</text>
                    <text class="time">05-09  13:32</text>
                  </div>
                  <image class="icon" src="../src/common/img/dui.png"></image>
                </div>
                <div class="list not">
                  <div class="result-text result-text-bottom">
                    <text class="protext">预计到账时间</text>
                    <text class="time">05-09  13:32</text>
                  </div>
                  <image class="icon icon-bottom" src="../src/common/img/qian.png"></image>
                </div>
            </div>
        </div>
				<text class="person-btn">查看账户余额</text>
			</cell>
		</list>
	</div>
</template>

<script>
import header from './header.vue'
export default {
  data() {
  	return {
  		model:{
  			boolSign: false,
	  		payInfo: false,
	  		title: '提示',
	  		payment:{
	  			alipay: '支付宝',
	  			alipayImage: '../src/common/img/d1.png',
	  			alipayselect: '../src/common/img/dui.png',
	  			wechat: '微信',
	  			wechatImage: '../src/common/img/d2.png',
	  			wechatselect: '../src/common/img/quans.png',
	  			money: '500',
	  			moneyImaeg: '../src/common/img/d3.png',
	  			select: '../src/common/img/dui.png',
	  			unselect: '../src/common/img/quans.png'
	  		}
  		}
  	}
  },
  methods: {
  	selectPay(msg){
  		if(msg == 'alipay'){
  			this.model.payment.wechatselect = this.model.payment.unselect
  			this.model.payment.alipayselect = this.model.payment.select
  		}else if(msg == 'wechat'){
  			this.model.payment.alipayselect = this.model.payment.unselect
  			this.model.payment.wechatselect = this.model.payment.select
  		}
  	}
  },
  components: {
  	'v-header': header
  },
}
</script>

<style lang="stylus" scoped>
.act{position: fixed; top: 90px; left: 0; right: 0; bottom: 0;}
.act-t1{padding-right: 20px;line-height: 85px;font-size: 24px;color: #777; width: 710px; margin-left: 20px; margin-right: 20px;}
.act-t3{font-size: 26px; color: #333333;}
.act-t4{margin-top: 15px; margin-left: 20px; margin-right: 20px; font-size: 24px; color: #777777; }
.model-pay-list{display: flex;flex-direction: row;justify-content: space-between;align-items: center;padding-top: 20px;padding-bottom: 20px;padding-left: 20px;padding-right: 20px;border-bottom-width: 1px;border-bottom-style: solid;border-bottom-color: #f4f4f4;}
.model-pay-list-left{display: flex;flex-direction: row;justify-content: center;align-items: center;}
.pay-image{width: 33px;height: 33px;margin-right: 32px;}
.pay-dui{width: 30px;height: 30px;}
.pay-title{font-size: 24px;color: #333333;}
.widthdraw{margin-top: 40px;padding-left: 20px;padding-right: 20px;border-bottom-width: 1px;border-bottom-style: solid;border-bottom-color: #f4f4f4;}
.widthdraw-input-box{margin-top: 12px;margin-bottom: 10px;display: flex;flex-direction: row;justify-content: flex-start;align-items: center;}
.pay-doller{margin-left: 20px;width: 16px; height: 23px;}
.widthdraw-input{flex: 1; margin-left: 15px;height: 63px;}
.person-btn{width: 710px; margin-left: 20px; margin-top: 150px; height: 80px; line-height: 80px; text-align: center; font-size: 36px; color: #333333; border-radius: 8.8px; background-color: #ffd46b;}
.icon{position: absolute;width: 30px;height: 30px;left: 0px;}
.icon-bottom{top: 40px;}
.times{margin-top: 100px;}
.list{margin-left: 55px;padding-left: 15px;position:relative;display: flex;flex-direction: row;align-items: flex-start;height: 110px;overflow: visible;}
.result-text{height:110px;border-left-width: 2px;border-left-color:#ffd262;border-left-style: solid;}
.protext{margin-left: 50px;margin-bottom: 15px;;font-size: 26px;color: #333333;font-weight: bold; }
.protextact{color: #cca032}
.time{margin-left: 50px;font-size: 22px; color: #777777}
.result-text-bottom{display: flex;flex-direction: column;justify-content: flex-end;}
</style>