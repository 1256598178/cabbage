<template>
	<div class="act">
		<!-- <v-header :title="活动详情"></v-header> -->
		<list>
			<cell>
				<text class="act-t1">活动名称活动名称活动名称活动名称</text>
					<div class="act-t2">
						<div class="act-t2-content">
							<text class="act-t2-text">限</text><text class="act-t2-text-ac">50</text><text class="act-t2-text">人</text>
						</div>
						<div class="act-t2-content">
							<text class="act-t2-text">最低</text><text class="act-t2-text-ac">500</text><text class="act-t2-text">元</text>
						</div>
						<div class="act-t2-content">
							<text class="act-t2-text">静安区</text>
						</div>
					</div>
					<div class="act-t2-info-wrapper">
						<div class="act-t2-info">  
						    <image class="act-t2-info-show" src="../src/common/img/t1.png"></image><text class="act-t2-info-title">参与时间</text><text class="act-t2-info-content">2018年12月1日-2018年12月2日</text>
					    </div>
					    <div class="act-t2-info">  
						    <image class="act-t2-info-show" src="../src/common/img/t2.png"></image><text class="act-t2-info-title">参与时间</text><text class="act-t2-info-content">2018年12月1日-2018年12月2日</text>
					    </div>
					    <div class="act-t2-info">  
						    <image class="act-t2-info-show" src="../src/common/img/t3.png"></image><text class="act-t2-info-title">参与时间</text><text class="act-t2-info-content">2018年12月1日-2018年12月2日</text>
					    </div>
					    <div class="act-t2-info">  
						    <image class="act-t2-info-show" src="../src/common/img/t4.png"></image><text class="act-t2-info-title">参与时间</text><text class="act-t2-info-content">2018年12月1日-2018年12月2日</text>
					    </div>
					    <div class="btn-box">
					    	<text class="baoming-btn" @click="signUp()">我要报名</text>
					    </div>
					</div>
					<text class="act-t1 act-t3">活动详情</text>
					<div class="act-image-box">
						<image class="act-t3-image" src="../src/common/img/t5.png"></image>
					</div>
					<div class="model-box" v-if="model.boolSign">
						<div class="model-wrapper">
				        	<image class="model-close" src="../src/common/img/cuo.png" @click="close()"></image>
				        	<text class="model-title">{{model.title}}</text>
				        	<text class="model-subtitle" v-if="!model.payInfo">请确认是否报名？</text>
				        	<div class="model-pay-wrapper" v-if="model.payInfo">
				        		<div class="model-pay-list" @click="selectPay('alipay')" ref="alipay">
				        			<div class="model-pay-list-left"><image class="pay-image" :src="model.payment.alipayImage"></image><text class="pay-title">{{model.payment.alipay}}</text></div>
				        			<image class="pay-dui" :src="model.payment.alipayselect"></image>
				        		</div>
				        		<div class="model-pay-list" @click="selectPay('wechat')" ref="wechat">
				        			<div class="model-pay-list-left"><image class="pay-image" :src="model.payment.wechatImage"></image><text class="pay-title">{{model.payment.wechat}}</text></div>
				        			<image class="pay-dui" :src="model.payment.wechatselect"></image>
				        		</div>
				        		<div class="model-pay-list">
				        			<div class="model-pay-list-left"><image class="pay-image" :src="model.payment.moneyImaeg"></image><text class="pay-title">支付金额</text></div>
				        			<text class="model-pay-money">{{model.payment.money}}</text>
				        		</div>
				        	</div>
				        	<div class="model-bottom-btn-wrapper">
				        		<text class="model-bottom-btn model-bottom-btn-left" @click="sure()">确定</text>
				        		<text class="model-bottom-btn model-bottom-btn-right" @click="cancel()">取消</text>
				        	</div>
				        </div>
					</div>
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
  	signUp(){
  		this.model.boolSign = true;
  	},
  	close(){
  		this.model.boolSign = false;
  		this.model.payInfo = false;
  	},
  	sure() {
  		this.model.payInfo = true;
  		this.model.title = '报名支付';
  	},
  	cancel(){
  		this.model.boolSign = false;
  		this.model.payInfo = false;
  	},
  	selectPay(msg){
  		if(msg == 'alipay'){
  			this.model.payment.wechatselect = this.model.payment.unselect
  			this.model.payment.alipayselect = this.model.payment.select
  		}else if(msg == 'wechat'){
  			this.model.payment.alipayselect = this.model.payment.unselect
  			this.model.payment.wechatselect = this.model.payment.select
  		}
  		this.$refs[msg].children[1]
  	}
  },
  components: {
  	'v-header': header
  },
}
</script>

<style lang="stylus" scoped>
.act-t1{padding-left: 20px;padding-right: 20px;line-height: 85px;font-size: 34px;color: #333333;border-bottom-width: 1px;border-bottom-color: #dcdcdc;border-bottom-style: solid;}
.act-t2{padding-left: 20px;padding-right: 20px;padding-top: 22px;padding-bottom: 20px;display: flex;flex-direction: row;justify-content: flex-start;align-items: center;}
.act-t2-content{margin-right: 29px;display: flex;flex-direction: row;justify-content: flex-start;align-items: center;}
.act-t2-text{font-size: 24px;color: #333333;}
.act-t2-text-ac{color: #ff6204;font-size: 24px;}
.act-t2-info-wrapper{padding-top: 8px;padding-left: 20px;padding-right: 20px;}
.act-t2-info{display: flex;flex-direction: row;justify-content: flex-start;align-items: center;margin-bottom: 23px;}
.act-t2-info-show{width: 34px;height: 34px;margin-right: 26px;}
.act-t2-info-title{font-size: 30px;color: #333333;margin-right: 20px;}
.act-t2-info-content{font-size: 30px;color: #777777;}
.btn-box{display: flex;flex-direction: row;justify-content: flex-end;align-items: center;}
.baoming-btn{width: 200px; height: 60px; line-height: 60px; font-size: 30px; color: #333333;background-color: #ffd700; text-align: center; border-radius: 10px;}
.act-t3{font-size: 26px;margin-top: 5px;}
.act-image-box{padding-top: 20px;padding-left: 20px;padding-right: 20px;padding-bottom: 20px;}
.act-t3-image{width: 710px; height: 975px;}
.model-box{position: fixed;display: flex;flex-direction: row;justify-content: flex-start;align-items: center;top: 0;left: 0;right: 0;bottom: 0;background-color: rgba(0, 0, 0, .4)}
.model-wrapper{width: 710px;margin-left: 20px;margin-right: 20px;background-color: #fff;border-radius: 5px;padding-top: 35px;padding-left: 60px;padding-right: 60px;padding-bottom: 20px;border-radius: 15px;}
.model-close{position: absolute;width: 37px;height: 37px;top: 20px;right: 20px;}
.model-title{marign-bottom: 20px;font-size: 36px;color: #000000;line-height: 40px;text-align: center;}
.model-subtitle{margin-top: 40px;margin-bottom: 17px;font-size: 24px;color: #a3a3a3;text-align: center;}
.model-bottom-btn-wrapper{display: flex;flex-direction: row;justify-content: center;align-items: center;margin-top: 43px;}
.model-bottom-btn{width: 220px;height: 88px;line-height: 88px;margin-left: 10px;margin-right: 10px;text-align: center;border-radius: 15px;}
.model-bottom-btn-left{background-color: #ffd700;}
.model-bottom-btn-right{background-color: #dadada;}
.model-bottom-btn-pay{font-size: 36px;color: #333;}
.model-pay-wrapper{margin-top: 20px;}
.model-pay-list{display: flex;flex-direction: row;justify-content: space-between;align-items: center;padding-top: 20px;padding-bottom: 20px;padding-left: 10px;padding-right: 10px;border-bottom-width: 1px;border-bottom-style: solid;border-bottom-color: #f4f4f4;}
.model-pay-list-left{display: flex;flex-direction: row;justify-content: center;align-items: center;}
.pay-image{width: 28px;height: 28px;margin-right: 20px;}
.pay-dui{width: 30px;height: 30px;}
.pay-title{font-size: 24px;color: #333333;}
.model-pay-money{font-size: 26px;color: #ff6204;}
</style>