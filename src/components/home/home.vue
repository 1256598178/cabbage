<template>
	<div class="home">
		<list>
			<refresh>
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
				<div class="list-box">
					
				</div>
			</cell>
			<loading>
				<text class="loading">加载更多...</text>
			</loading>
		</list>
	</div>
</template>

<script>
export default {
	data() {
		return {
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
			}
		}
	}
}
</script>

<style scoped="">
.home{
	padding-top: 10px;
	padding-bottom: 10px;
	padding-left: 20px;
	padding-right: 20px;
}
.refresh,.loading{
	text-align: center;
}
.list-box{
	width: 710px;
	margin-top: 10px;
	margin-bottom: 10px;
}
.list-box-child{
	position: relative;
	width: 710px;
}
.banner-wrapper{
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
	font-size: 18px;
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
	font-size: 16px;
	color: #777777;
}
.telNum{
	margin-top: 6px;
	font-size: 20px;
	color: #333;
	font-weight: 900;
}
</style>