<template>
	<!-- 我的奖励 -->
	<div class="reward">
		<div class="find-title-box">
			<v-header :titleName="titleName" :backPage="true"></v-header>
			<div class="find-title-boxs"></div>
		</div>
		<wxc-tab-page ref="wxc-tab-page" :tab-titles="tabTitles" :tab-styles="tabStyles" title-type="icon" :tab-page-height="tabPageHeight" @wxcTabPageCurrentTabSelected="wxcTabPageCurrentTabSelected">
			<list v-for="(v,index) in tabList" :key="index" class="item-container" :style="{ height: (tabPageHeight - tabStyles.height - 122) + 'px' }">
			  <!-- <cell class="border-cell"></cell> -->
			  <!-- <cell v-for="(demo,key) in v" class="cell" :key="key">
			    <wxc-pan-item :ext-id="'1-' + (v) + '-' + (key)" url="" @wxcPanItemPan="wxcPanItemPan">
			     <div class="content">
			        <text>{{key}}</text>
			     </div>
			    </wxc-pan-item>
			  </cell> -->
			  <cell class="reward-no-content" v-if="rewardContent">
			      <div class="reward-no-icon">
			      	  <image class="reward-no-image" src="http://47.92.164.211:8011/PublicImage/reward@195x172.png"></image>
			      	  <text class="reward-no-image">暂无信息！</text>
			      </div>
			  </cell>
			</list>
		</wxc-tab-page>
	</div>
</template>

<script>
import header from '../header/orderHeader.vue'
const dom = weex.requireModule('dom');
import { WxcTabPage, WxcPanItem, Utils, BindEnv } from 'weex-ui';
// https://github.com/alibaba/weex-ui/blob/master/example/tab-page/config.js
import Config from './config'
import Vue from 'vue'
export default {
	data() {
		return {
			titleName: '我的奖励',
			rewardContent: false,//是否有内容
			refreshing: false,//下拉刷新
			loadinging: false,//上拉加载
			tabTitles: Config.tabTitles,
	        tabStyles: Config.tabStyles,
	        tabList: [],
	        demoList: [1, 2, 3, 4, 5, 6, 7, 8, 9],
	        tabPageHeight: 1334
		}
	},
	methods: {
    	onrefresh (){
			this.refreshing = true;
			setTimeout(()=>{
				this.refreshing = false;
			},2000)
		},
		onloading (){
			this.loadinging = true;
			setTimeout(()=>{
				this.loadinging = false;
			},2000)
		},
		wxcTabPageCurrentTabSelected (e) {
        const self = this;
        const index = e.page;
        /* Unloaded tab analog data request */
        if (!Utils.isNonEmptyArray(self.tabList[index])) {
          setTimeout(() => {
            Vue.set(self.tabList, index, self.demoList);
          }, 100);
        }
      },
      wxcPanItemPan (e) {
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
    created () {
      this.tabPageHeight = Utils.env.getPageHeight();
      this.tabList = [...Array(this.tabTitles.length).keys()].map(i => []);
      Vue.set(this.tabList, 0, this.demoList);
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
.wxc-tab-page {
	margin-top: 10px;
}

.item-container {
  width: 750px;
  background-color: #f5f5f5;
}

.border-cell {
  background-color: #f2f3f4;
  width: 750px;
  height: 24px;
  align-items: center;
  justify-content: center;
}

.cell {
  background-color: #ffffff;
}

.content{
  width: 750px;
  height: 300px;
  border-bottom-width: 1px;
  align-items: center;
  justify-content: center;
}

.reward-no-content{
	display: flex;
	flex-direction: row;
	align-items: center;
    justify-content: center;
	width: 750px;
	height: 470px;
}
.reward-no-icon{
	display: flex;
	flex-direction: column;
	align-items: center;
}
.reward-no-image{
	width: 195px;
	height: 172px;
}
.reward-no-image{
	font-size: 22px;
	color: #777777;
	margin-top: 20px;
	text-align: center;
}
</style>