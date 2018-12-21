<template>
	<div class="home">
		<v-header></v-header>
		<list class="home-wrapper">
			<refresh @refresh="onrefresh" :display="refreshing ? 'show' : 'hide'">
				<text class="refresh">下拉刷新...</text>
			</refresh>
			<cell>
				<slider class="list-box banner-wrapper" auto-play="autoPlay" interval="4000">
					<div class="banner-list list-box-child" v-for="banner in bannerList">
						<image class="_banner" :src="banner.url"></image>
					</div>
					<indicator class="indicator"></indicator>
				</slider>
			</cell>
			<cell>
				<slider class="list-box fication-wrapper">
					<!-- 待开发 -->
					<ul class="fication-wrapper-list list-box-child" v-for="">
						<li class="fication-wrapper-list-child" v-for="(list,index) in navWrapperList" v-if="index<10" :key="index">
							<image class="_fication" :src="list.imageUrl"></image>
						    <text class="fication-name">{{list.names}}</text>
						</li>
					</ul>
					<indicator class="indicator fication-indicator"></indicator>
				</slider>
			</cell>
			<cell>
				<div class="list-box wechat-wrapper">
					<image class="_wechatImage" :src="service.wechatImage"></image>
					<image class="wechat" :src="service.wechat"></image>
					<div class="service-info">
						<text class="face-name">{{service.names}}</text>
						<a><text class="face-linkr">{{service.linkr}}</text></a>
					</div>
					<div class="tel-wrapper">
						<image class="_tel" :src="service.telImage"></image>
						<div>
							<text class="telName">{{service.telName}}</text>
						    <text class="telNum">{{service.telNum}}</text>
						</div>
					</div>
				</div>
			</cell>
			<cell>
				<div class="list-box food-box">
					<div class="foods-wrapper">
					    <div class="foods-wrapper-list"><image class="foods-image foods-image-one" src="../src/components/home/food-icon-1.png"></image></div>
					    <div class="foods-wrapper-list foods-wrapper-list-two">
					    	<image class="foods-image" src="../src/components/home/food-icon-2.png"></image>
					    	<image class="foods-image" src="../src/components/home/food-icon-2.png"></image>
					    </div>
				    </div>
				    <div class="foods-wrapper">
					    <div class="foods-wrapper-list"><image class="foods-image" src="../src/components/home/food-icon-2.png"></image></div>
					    <div class="foods-wrapper-list"><image class="foods-image" src="../src/components/home/food-icon-2.png"></image></div>
				    </div>
				</div>
			</cell>
			<cell>
				<div class="list-box">
					<image class="food-bg-image" src="../src/components/home/food-bg-01.png"></image>
				</div>
			</cell>
			<cell>
				<ul class="list-box foot-list-wrapper">
					<li class="foot-list" v-for="foodList in foodWrapper.foodLists">
						<div class="image-box">
							<image class="food-image" :src="foodList.urlImage"></image>
						</div>
						<div class="food-shop-wrapper">
							<div class="food-name-wrapper">
								<text class="foot-shop-name">{{foodList.foodName}}&nbsp;&nbsp;{{foodList.foodWeight}}g</text>
							</div>
							<div class="foot-dollar-wrapper">
								<text class="foot-dollar">￥{{foodList.price}}</text>
								<text class="foot-more-money">￥{{foodList.allMoney}}</text>
								<image class="foot-shop-car" src="../src/components/home/shop-car.png"></image>
							</div>
						</div>
					</li>
				</ul>
			</cell>
			<loading class="loading" @loading="onloading" :display="loadinging ? 'show' : 'hide'">
				<text class="loading">加载更多...</text>
				<loading-indicator class="indicators"></loading-indicator>
			</loading>
		</list>
	</div>
</template>

<script>
import header from '../header/header.vue'
export default {
	data() {
		return {
			refreshing: false,
			loadinging: false,
			autoPlay: true, //轮播图是否自动播放
			bannerList: [
				{
					url: '../src/components/home/banner.png'
				},{
					url: '../src/components/home/banner.png'
				},{
					url: '../src/components/home/banner.png'
				},{
					url: '../src/components/home/banner.png'
				}
			],
			navWrapperList: [
				{
					id: 1,
					imageUrl: '../src/components/home/nav_list1.png',
					names: '今日特价2'
				},{
					id: 2,
					imageUrl: '../src/components/home/nav_list2.png',
					names: '新品抢先'
				},
				{
					id: 3,
					imageUrl: '../src/components/home/nav_list3.png',
					names: '网络最红'
				},
				{
					id: 4,
					imageUrl: '../src/components/home/nav_list4.png',
					names: '海鲜水产'
				},
				{
					id: 5,
					imageUrl: '../src/components/home/nav_list5.png',
					names: '幸运抽奖'
				},{
					id: 1,
					imageUrl: '../src/components/home/nav_list1.png',
					names: '今日特价'
				},{
					id: 2,
					imageUrl: '../src/components/home/nav_list2.png',
					names: '新品抢先'
				},
				{
					id: 3,
					imageUrl: '../src/components/home/nav_list3.png',
					names: '网络最红'
				},
				{
					id: 4,
					imageUrl: '../src/components/home/nav_list4.png',
					names: '海鲜水产'
				},
				{
					id: 5,
					imageUrl: '../src/components/home/nav_list5.png',
					names: '幸运抽奖'
				},
				{
					id: 1,
					imageUrl: '../src/components/home/nav_list1.png',
					names: '今日特价2'
				},{
					id: 2,
					imageUrl: '../src/components/home/nav_list2.png',
					names: '新品抢先'
				},
				{
					id: 3,
					imageUrl: '../src/components/home/nav_list3.png',
					names: '网络最红'
				},
				{
					id: 4,
					imageUrl: '../src/components/home/nav_list4.png',
					names: '海鲜水产'
				},
				{
					id: 5,
					imageUrl: '../src/components/home/nav_list5.png',
					names: '幸运抽奖'
				},{
					id: 1,
					imageUrl: '../src/components/home/nav_list1.png',
					names: '今日特价'
				},{
					id: 2,
					imageUrl: '../src/components/home/nav_list2.png',
					names: '新品抢先'
				},
				{
					id: 3,
					imageUrl: '../src/components/home/nav_list3.png',
					names: '网络最红'
				},
				{
					id: 4,
					imageUrl: '../src/components/home/nav_list4.png',
					names: '海鲜水产'
				},
				{
					id: 5,
					imageUrl: '../src/components/home/nav_list5.png',
					names: '幸运抽奖'
				}
			],
			service: {
				wechatImage: '../src/components/home/wechatBg.png',
				wechat: '../src/components/home/wechat.png',
				telImage: '../src/components/home/phone.png',
				names: '绿白菜 • 滨湖春融苑店',
				linkr: '扫码添加微信实惠更多>',
				telName: '服务热线',
				telNum: '400-1000-000'
			},
			foodWrapper: {
				shopCar: '../src/components/home/shop-car.png',
				foodLists: [
					{
						urlImage: '../src/components/home/food_01.png',
						foodName: '荷兰豆',
						foodWeight: '1000',
						price: '5.38',
						allMoney: '18.85'
					},
					{
						urlImage: '../src/components/home/food_02.png',
						foodName: '荷兰豆',
						foodWeight: '1000',
						price: '5.38',
						allMoney: '18.85'
					},
					{
						urlImage: '../src/components/home/food_03.png',
						foodName: '荷兰豆',
						foodWeight: '1000',
						price: '5.38',
						allMoney: '18.85'
					},{
						urlImage: '../src/components/home/food_04.png',
						foodName: '荷兰豆',
						foodWeight: '1000',
						price: '5.38',
						allMoney: '18.85'
					}
				]
			}
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
		}
	},
    components: {
      'v-header': header
    }
}
</script>

<style scoped>
.home-wrapper{
	position: fixed;
	width: 750px;
	top: 90px;
	left: 0;
	right: 0;
	bottom: 110px;
}
.refresh,.loading{
	text-align: center;
}
.list-box{
	width: 710px;
	margin-top: 10px;
	margin-bottom: 10px;
	margin-left: 20px;
	margin-right: 20px;
}
.list-box-child{
	position: relative;
	width: 710px;
}
.banner-wrapper{
	margin-top: 20px;
	height: 300px;
	background-color: #eee;
	border-radius: 15px;
	box-shadow: 0px 2px 3px 2px #eee;
}
.banner-list{
	height: 300px;
}
._banner{
	width: 710px;
	height: 300px;
}
.indicator{
	position: absolute;
	width: 710px;
	height: 300px;
	top: 130px;
	left: 0px;
    item-color: rgb(255,255,255);
    item-selected-color: rgb(115,204,70);
    item-size: 20px;
}

/*下拉刷新样式*/
.loading{
	width: 750px;
    height: 200px;
    display: -ms-flex;
    display: -webkit-flex;
    display: flex;
    -ms-flex-align: center;
    -webkit-align-items: center;
    -webkit-box-align: center;
    align-items: center;
}
.indicators {
	margin-top: 16px;
	height: 40px;
	width: 40px;
	color: #f40;
}
.fication-indicator{
	top: 165px;
	item-color: rgb(198,194,194);
	item-size: 15px;
}
.fication-wrapper{
	height: 325px;
}
.fication-wrapper-list{
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	flex-wrap: wrap;
}
.fication-wrapper-list-child{
	width: 142px;
}
.fication-name{
	margin-top: 10px;
	margin-bottom: 20px;
	font-size: 22px;
	color: #333333;
	text-align: center;
}
._fication{
	border-radius: 50%;
	margin-left: 21px;
	width: 100px;
	height: 100px;
	box-shadow: 5px 2px 5px 2px #eee;
}
.wechat-wrapper{
	position: relative;
	height: 194px;
	padding-top: 7px;
	padding-bottom: 7px;
	padding-left: 10px;
	padding-right: 15px;
	border-radius: 10px;
	box-shadow: 0 0 5px 2px #eee;
}
._wechatImage{
	width: 685px;
	height: 180px;
}
.wechat{
	position: absolute;
	top: 70px;
	left: 88px;
	width: 50px;
	height: 50px;
}
.service-info{
	position: absolute;
	top: 55px;
	left: 210px;
}
.face-name{
	font-size: 22px;
	color: #333;
	font-weight: 700;
}
.face-linkr{
	font-size: 14px;
	color: #777;
	margin-top: 10px;
	text-decoration: underline;
}
.tel-wrapper{
	position: absolute;
	top: 60px;
	right: 32px;
	flex-direction: row;
}
._tel{
	width: 43px;
	height: 43px;
	margin-right: 10px;
}
.telName{
	font-size: 14px;
	color: #777777;
}
.telNum{
	margin-top: 9px;
	font-size: 20px;
	color: #333;
	font-weight: 900;
}
.food-box{
	height: 650px;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
}
.foods-wrapper{
	display: flex;
	flex-direction: row;
	justify-content: space-between;
}
.foods-wrapper-list-two{
	display: flex;
	flex-direction: column;
    flex-wrap: wrap;
	justify-content: space-between;
}
.foods-image{
	width: 350px;
	height: 210px;
	border-radius: 20px;
}
.foods-image-one{
	height: 430px;
}
.food-bg-image{
	width: 710px;
	height: 226px;
}
/*首页购物车*/
.foot-list-wrapper{
	margin-top: 0px;
	margin-bottom: 0px;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	flex-wrap: wrap;
	align-content: center;
	align-content: space-between;
	background-color: #fbfbfb;
}
.foot-list{
	margin-top: 5px;
	margin-bottom: 5px;
	width: 350px;
	height: 480px;
	border-radius: 20px;
	box-shadow: 0 0 5px 2px #eee;
	background-color: #fff;
}
.image-box{
	width: 350px;
	height: 350px;
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
}
.food-image{
	width: 270px;
	height: 277px;
}
.food-shop-wrapper{
	padding-left: 20px;
	padding-right: 20px;
	width: 350px;
	height: 130px;
}
.food-name-wrapper{
	margin-bottom: 34px;
}
.foot-shop-name{
	display: inline;
	font-size: 30px;
	font-weight: 500;
	color: #222222;
}
.foot-dollar-wrapper{
	position: relative;
	height: 96px;
	display: flex;
	flex-direction: row;
}
.foot-dollar{
	font-size: 30px;
	font-weight: 600;
	color: #f26100;
}
.foot-more-money{
	margin-left: 15px;
	margin-top: 7px;
	font-size: 20px;
	color: #777777;
}
.foot-shop-car{
	position: absolute;
	width: 44px;
	height: 44px;
	top: 0;
	right: 0;
}
</style>