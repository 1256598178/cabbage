<template>
	<div>
		<!--导航栏-->
		<div class="titleBar">
			<!--状态栏-->
			<text class="statusbar"></text>
			<!--标题栏-->
			<wxc-minibar title="我的订单" background-color="#73cc00" text-color="#FFFFFF" left-button='http://47.92.164.211:8011/PublicImage/backImage.png' @wxcMinibarLeftButtonClicked="minibarLeftButtonClick">
				<text class="title" slot="middle">我的订单</text>
			</wxc-minibar>
			<text class="border-cell"></text>
		</div>
		
		<wxc-tab-page class="listBar" ref="wxc-tab-page" :tab-titles="tabTitles" :tab-styles="tabStyles" title-type="text" :tab-page-height="tabPageHeight" @wxcTabPageCurrentTabSelected="wxcTabPageCurrentTabSelected">
			<list class="item-container" v-for="(v,index) in tabList" :key="index" :style="{ height: (tabPageHeight - tabStyles.height-100) + 'px' }">
				<cell class="cell" v-for="(item,key) in v" :key="key">
					<!--<wxc-pan-item url="http://www.baidu.com/" @wxcPanItemPan="wxcPanItemPan">-->
						<div class="item_whole">
							<div class="item_title">
								<text class="item_left_title">{{item.pWay}}</text>
								<div class="item_text">
									<text class="item_name">订单号</text>
									<text class="text_create_time">{{item.orderNum}}</text>
								</div>
								<text class="item_right_title">{{item.orderType}}</text>
							</div>
							<div class="item_content">
								<scroller class="sec-nav-list" show-scrollbar="false" scroll-direction="horizontal">
								    <div class="cells" v-for="(nums,indexs) in item.orderProduct" :key="indexs">
								      	<image class="product-img" :src="nums"></image>
								    </div>
								</scroller>
								<div class="slideShow">
									<text class="iconFont slideShow-icon" ref="slideBtn">&#xe7ad;</text>
								</div>
							</div>
							<div class="item-price">
								<div class="item-l">
									<text class="item-num">共{{item.orderProduct.length}}件商品</text>
								</div>
								<div class="item-r">
									<text class="item-m">金额:</text>
									<text class="item-p">￥{{item.money}}元</text>
								</div>
							</div>
							<div :class="[item.orderStatus === '3' ? 'item-bottom' : 'item-bottoms']">
								<div class="item-l">
									<text class="item-sh">申请售后</text>
								</div>
								<div class="item-r">
									<text class="item-dpj">待评价</text>
								</div>
							</div>
						</div>
					<!-- 下划线 -->
					<text class="border-cell"></text>
					<!--</wxc-pan-item>-->
				</cell>
			</list>
		</wxc-tab-page>
		
	</div>
</template>

<style scoped>
	.listBar{
		position: fixed;
		top: 100px;
		bottom: 0;
		left: 0;
		right: 0;
		
	}
	/*.titleBar{
		width: 750px;
		height: 90px;
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
	}*/
	.title{
		font-size: 42px;
		color: #fff;
	}
	.left{
		padding-left: 20px !important;
	}
	.left-button{
		width: 28px !important;
		height: 41px !important;
	}
	.item-container {
		width: 750px;
		background-color: #f5f5f5;
		margin-top: 10px;
	}
	
	.border-cell {
		background-color: #f5f5f5;
		width: 750px;
		height: 10px;
		align-items: center;
		justify-content: center;
	}
	
	.cell {
		background-color: #ffffff;
	}
	
	.content {
		width: 750px;
		height: 300px;
		border-bottom-width: 1px;
		align-items: center;
		justify-content: center;
	}
	.item_whole {
		/*margin-left: 20px;
		margin-right: 20px;
		margin-top: 20px;
		margin-bottom: 20px;
		color: #afddff;*/
	}
	
	.item_title {
		flex-direction: row;
		justify-content: space-between;
		padding: 10px 20px;
		border-bottom-width: 2px;
		border-bottom-style: solid;
		border-bottom-color: #f4f4f4;
	}
	
	.item_left_title {
		width: 100px;
		height: 40px;
		border-radius: 5px;
		font-size: 20px;
		line-height: 40px;
		text-align: center;
		color: #fff;
		background-color: #f99191;
	}
	
	.item_right_title {
		width: 100px;
		height: 40px;
		font-size: 22px;
		line-height: 40px;
		text-align: right;
		color: #f26100;
	}
	
	.item_content {
		flex-direction: row;
		padding: 20px 20px 20px 10px;
		border-bottom-width: 2px;
		border-bottom-style: solid;
		border-bottom-color: #f4f4f4;
	}
	
	.item_text {
		flex: 1;
		flex-direction: row;
		margin-left: 20px;
	}
	
	.item_name{
		font-size: 22px;
		line-height: 40px;
		text-align: left;
		color: #333;
		margin-right: 16px;
	}
	
	.text_create_time {
		font-size: 22px;
		line-height: 40px;
		color: #999;
	}
	
	.text_order {
		margin-left: 165px;
		font-size: 28px;
		color: #333333;
	}
	
	.sec-nav-list{
		flex: 1;
		flex-direction: row;
	}
	
	.product-img{
		width: 150px;
		height: 150px;
		margin: 0 10px;
	}
	
	.iconFont{
	    font-family: iconfont;
	}
	
	.slideShow-icon{
		width: 50px;
		background: #fff;
  		color: #cdcdcd;
  		line-height: 150px;
  		text-align: center;
  	}
  	.item-price{
  		flex-direction: row;
  		justify-content: flex-end;
  		padding: 20px;
  	}
  	.item-l{
  		width: auto;
  		margin-right: 20px;
  	}
  	.item-r{
  		width: auto;
  		flex-direction: row;
  	}
  	.item-num{
  		font-size: 22px;
  		line-height: 40px;
  		color: #333;
  	}
  	.item-m{
  		width: auto;
  		font-size: 22px;
  		line-height: 40px;
  		color: #333;
  		margin-right: 10px;
  	}
  	.item-p{
  		width: auto;
  		font-size: 22px;
  		line-height: 40px;
  		color: #f26100;
  	}
  	.item-bottom{
  		flex-direction: row;
  		justify-content: flex-end;
  		padding: 20px;
  		border-top-width: 2px;
		border-top-style: solid;
		border-top-color: #f4f4f4;
  	}
  	.item-bottoms{
  		height: 0px;
  		overflow: hidden;
  	}
  	.item-sh{
  		width: 100px;
  		height: 40px;
  		line-height: 38px;
  		font-size: 20px;
  		color: #999;
  		text-align: center;
  		border-width: 1px;
  		border-color: #bfbfbf;
  		border-style: solid;
  		border-radius: 5px;
  	}
  	.item-dpj{
  		width: 100px;
  		height: 40px;
  		line-height: 38px;
  		font-size: 20px;
  		color: #999;
  		text-align: center;
  		border-width: 1px;
  		border-color: #bfbfbf;
  		border-style: solid;
  		border-radius: 5px;
  	}
</style>
<script>
	const dom = weex.requireModule('dom');
	import { WxcMinibar, WxcTabPage, WxcPanItem, Utils, BindEnv } from 'weex-ui';

	// https://github.com/alibaba/weex-ui/blob/master/example/tab-page/config.js
	//import orderItem from './order-item.vue'
	import Config from './config'
	import Vue from 'vue'
	const navigator = weex.requireModule('navigator') 
	const modal = weex.requireModule('modal') 
	const stream = weex.requireModule('stream') 
	const storage = weex.requireModule('storage') 

	export default {
		components: {
			WxcMinibar,
			WxcTabPage,
			WxcPanItem,
			Config,
			//orderItem
		},
		data: () => ({
			tabTitles: Config.tabTitles,
			tabStyles: Config.tabStyles,
			tabList: [],
			needSlider: true,
			demoList: [1, 2, 3, 4, 5, 6, 7, 8, 9],
			supportSlide: true,
			isTabView: true,
			tabPageHeight: 1334,
			orderList: [],
			createTime: '180009900',
			workorder: '99999999'
		}),
		methods: {
			getOrderData(curpage) {
				const self = this
				var flag = 0
				switch(curpage) {
					case 0: // 全部订单 
						flag = 0
						break
					case 1: // 待付款
						flag = 1
						break
					case 2: // 待取货
						flag = 2
						break
					case 3: // 待评价
						flag = 3
						break
					case 4: // 退款服务
						flag = 4
						break
					case 5: // 售后服务
						flag = 5
						break
				} //这里url自己写就好
				var url = '../src/components/myorder/order'+flag+'.json'
				console.log('geturl----' + url)

				stream.fetch({
					method: 'GET',
					url: url,
					type: 'json'
				}, function(response) {
					console.log(response)
					self.orderList = response.data.orderList // 刷新当前页面的数据 // tablist是对于tab的集合 需要v-for //orderlist是对应tab下的list数据的集合 需要v-for
					//console.log(response.data.orderList);
					Vue.set(self.tabList, curpage, self.orderList)
					console.log(self.orderList.length)
				}, function(response) {
					console.log('http in progress')
				})
			},
			wxcTabPageCurrentTabSelected(e) {
				const self = this;
				const index = e.page;
				// 接口调用
				this.getOrderData(index)
			},
			wxcPanItemPan(e) {
				if(BindEnv.supportsEBForAndroid()) {
					this.$refs['wxc-tab-page'].bindExp(e.element);
				}
			},
			minibarLeftButtonClick() {
				this.$router.push('-1')
			}
		},
		created() {
			var fontModule = weex.requireModule("dom");
	        fontModule.addRule('fontFace', {
	            'fontFamily': "iconfont",
	            'src': "url(" + this.$store.state.iconUrl + ")"
        	});
			this.tabPageHeight = Utils.env.getPageHeight();
			//this.tabList = [...Array(this.tabTitles.length).keys()].map(i => []);
			//Vue.set(this.tabList, 0, this.demoList);
			this.getOrderData(0);
		}
	};
</script>