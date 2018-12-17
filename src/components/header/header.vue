<template>
  <div class="header clearfix">
    <div class="container">
    	<div class="left-wrapper fl">
	    	<div class="logo"><a class="_img" href=""></a></div>
		    <div class="address">
		    	<span class="_img"></span>
		    	<span class="text">{{addressText}}</span>
		    	<span class="arrow"></span>
		    </div>
	    </div>
	    <div class="right-wrapper fr">
	    	<span class="search" @click="searchOpen()"></span>
	    	<span class="scan"></span>
	    </div>
    </div>
    <transition name="slide-fade">
	    <div class="searchPage" v-if="showSearch">
	    	<div class="top">
	    		<div class="container">
	    			<div class="search-wrapper">
	    				<form class="search-form" action="" method="get" accept-charset="utf-8">
	    					<input class="search-input" type="search" v-focus v-model="searchContent" placeholder="搜索商品名称" @keyup.13="search()" name="cabbFoot">
	    				</form>
	    			    <span class="text" @click="searchClose()">取消</span>
	    			</div>
	    		</div>
	    	</div>
	    	<div class="context">
	    		<div class="search-box">
	    			<h3 class="title">{{hotSearch}}</h3>
	    		    <ul class="searchText clearfix">
	    			    <li v-for="(hotArray,key) in hotArrays" @click="clickHotSearch($event)">{{hotArray}}</li>
	    		    </ul>
	    		</div>
	    		<div class="search-box" v-if="this.hisArrays.length > 0">
		    		<h3 class="title">{{hisSearch}}<span class="trash fr" @click="modalOpen()"></span></h3>
		    		<ul class="searchText his clearfix">
		    			<li v-for="(hisArray,key) in hisArrays" :key="key" @click="clickHotSearch($event)">{{hisArray}}</li>
		    		</ul>
	    		</div>
	    	</div>
	    </div>
	</transition>
	<v-modal v-bind:showModal="showModal" v-bind:hisArrays="hisArrays" v-bind:modalTitle="modalTitle" v-bind:modalContent="modalContent" v-on:changeShowModal="modalClose($event)" v-on:delete="clearAllSearch($event)"></v-modal>
  </div>
</template>

<script>
import modal from '../modal/modal.vue'
export default {
  data() {
  	return {
  		addressText: '合肥市滨湖春融苑店',
  		showSearch: false,//搜索页面打开与关闭
  		showModal: false,
  		searchContent: '',//搜索框中的内容
  		hotSearch: '热门搜索',
  		hisSearch: '历史搜索',
  		hotArrays: ['今日特价','卤制品','热菜','鱼','水果','肉','鸡蛋','粮油副食','馒头','休闲食品','虾','盐'],  //热门搜索
  		hisArrays: ['1111111111','今日特价今日今日特价今日特价','33','44'], //历史搜索数据
  		// 模态框
  		modalTitle: '温馨提示', //头
  		modalContent: '是否确定删除历史搜索记录？',  //主题内容
  	}
  },
  methods: {
  	// 打开搜索页
  	searchOpen() {
  		this.showSearch = true
  	},
  	// 关闭搜索页
  	searchClose() {
  		this.showSearch = false
  	},
  	// 搜索功能    带开发
  	search() {
  		window.location.href = 'www.baidu.com'
  	},
  	// 清除历史记录
  	clearAllSearch(msg) {
  		this.hisArrays = msg;
  	},
  	// 打开modal
  	modalOpen() {
  		this.showModal = true;
  	},
  	// 关闭modal
  	modalClose(msg) {
  		this.showModal = msg;
  	},
  	// 热门搜索
  	clickHotSearch(even) {
  		this.searchContent = event.target.innerText;
  		this.search()
  	}
  },
  components: {
  	"v-modal": modal
  },
  directives: {
    // 注册一个局部的自定义指令 v-focus
    focus: {
      // 指令的定义
      inserted: function (el) {
        // 聚焦元素
        el.focus()
      }
    }
  }
}
</script>

<style lang="stylus">
@import '../../common/stylus/base.styl';
.header{
	height: 45px;
	background: #73cc00;
	box-shadow: 0 2px 2px 2px #eee;
	box-sizing: border-box;
	overflow: hidden;
	.left-wrapper{
		padding: 6.5px 0;
		.logo{
			display: inline-block;
			vertical-align: middle;
			._img{
				display: block;
				width: 35px;
				height: 31.5px;
				background: url(./logo.png) no-repeat;
				background-size: 35px 31.5px;
			}
		}
		.address{
			display: inline-block;
			margin-left: 15px;
			font-size: 0;
			color: #fff;
			vertical-align: middle;
			._img{
				display: inline-block;
				width: 12.5px;
				height: 17.5px;
				background: url(./address.png) no-repeat;
				background-size: 12.5px 17.5px;
				vertical-align: middle;
			}
			.text{
				margin: 0 5px;
				font-size: 12px;
				vertical-align: middle;
			}
			.arrow{
				display: inline-block;
				width: 7px;
				height: 4.5px;
				background: url(./arrow.png) no-repeat;
				background-size: 7px 4.5px;
				vertical-align: middle;
			}
		}
	}
	.right-wrapper{
		padding: 11.75px 0;
		.search{
			display: inline-block;
			width: 21.5px;
			height: 21.5px;
			background: url(./search.png) no-repeat;
			background-size: 21.5px 21.5px;
			vertical-align: middle;
		}
		.scan{
			display: inline-block;
			margin-left: 15px;   
			width: 21px;
			height: 21px;
			background: url(./scan.png) no-repeat;
			background-size: 21px 21px;
			vertical-align: middle;
		}
	}
	.searchPage{
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: #fff;
		z-index: 99;
		.top{
			height: 45px;
			padding: 7px 0;
			background: #73cc00;
			box-sizing: border-box;
			overflow: hidden;
			.search-wrapper{
				display: flex;
				height: 100%;
				font-size: 12px;
				color: #fff;
				.search-form{
					width: 100%;
					flex: 1;
					.search-input{
						width: 100%;
						height: 100%;
						padding: 1px  2px 1px 28px;
						border-radius: 5px;
						font-size: 14px;
						background: url(./search.png) no-repeat;
						background-color: rgba(255,255,255,.3)
						background-size: 18.5px 18.5px;
						background-position: 5px 6.25px;
						color: rgba(255,255,255,1)
						box-sizing: border-box;
						outline: none;
						&::-webkit-input-placeholder{
							color: #fff;
							font-size: 14px;
						}
						&::-moz-input-placeholder{
							color: #fff;
							font-size: 14px;
						}
						&::-ms-input-placeholder{
							color: #fff;
							font-size: 14px;
						}
					}
				}
				.text{
					flex: 0 0 36px;
					text-align: right;
					line-height: 31px;
					opacity: .5;
				}
			}
		}
		.context{
			background: #EEF1F0;
			height: 100%;
			.search-box{
				margin-bottom: 5px;
				.title{
					padding: 10px 15px 7px;
					font-size: 14px;
					color: #777;
					.trash{
						width: 15.5px;
						height: 15.5px;
						background: url(./trash.png) no-repeat;
						background-size: 15.5px 15.5px;
					}
				}
				.searchText{
					margin-left: calc(15px - 1%);
					margin-right: calc(15px - 1%);
					&>li{
						float: left;
						width: 18%;
						margin: 1% 1%;
						height: 30px;
						line-height: 30px;
						color: #777;
						font-size: 12px;
						text-align: center;
						background: #fff;
						border-radius: 50px;
					}
					&.his{
						margin: 0;
						&>li{
							min-width: 18%;
							width: auto;
							padding: 0 5px;
							overflow: hidden;
						}
					}
				}
			}
		}
	}
}

/* 可以设置不同的进入和离开动画 */
/* 设置持续时间和动画函数 */
.slide-fade-enter-active {
  transition: all .1s ease;
}
.slide-fade-leave-active {
  transition: all .1s ease;
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active 用于 2.1.8 以下版本 */ {
  transform: translateX(10px);
  opacity: 0;
}

</style>
