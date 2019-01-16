<template>
	<!-- 发现页面 -->
	<div class="find">
		<div class="find-title-box">
			<v-header :titleName="titleName" :backPage="true"></v-header>
		</div>
		<div class="find-body-wrapper">
			<list class="find-body-list">
				<cell v-for="(item,index) in 100" :key="index">
					<div class="find-body-news-wrapper">
						<text :class="[index === 0 ? 'find-title-time-active' : 'find-title-time']">2019-01-02</text>
						<div class="find-body-news-list">
							<div class="find-body-news-title-wrapper">
								<text class="find-body-news-title-name">绿白菜恭祝广大用户新春愉快！</text>
								<text class="find-body-news-title-subname">新年到，绿白菜恭祝大家新春愉快，合家欢乐！！</text>
							</div>
							<image class="find-body-news-image" src="../src/components/other/news_01.png"></image>
						</div>
					</div>
				</cell>
			</list>
		</div>
	</div>
</template>

<script>
import header from '../header/orderHeader.vue'
export default {
	data() {
		return {
			titleName: '发现',
		}
	},
	components: {
    	"v-header": header 
    },
}
</script>

<style lang="stylus" scoped>
.find{
	background-color: #f5f5f5;
}
.find-title-box{
	height: 220px;
	background-color: rgb(115,204,70);
}
.find-body-wrapper{
	top: -130px;
}
.find-body-list{
	position: fixed;
	padding-left: 20px;
	padding-right: 20px;
	top: 110px;
	bottom: 0;
}
.find-body-news-wrapper{
	margin-bottom: 40px;
}
.find-title-time-active,.find-title-time{
	margin-bottom: 5px;
	text-align: center;
	font-size: 24px;
	color: #fff;
	line-height: 30px;
}
.find-title-time-active{
	color: #fff;
}
.find-title-time{
	color: #777777;
}
.find-body-news-list{
	padding-top: 20px;
	padding-left: 20px;
	padding-right: 20px;
	padding-bottom: 20px;
	background-color: #fff;
	border-radius: 15px;
}
.find-body-news-title-name{
	margin-bottom: 10px;
	font-size: 30px;
	color: #484848;
	line-height: 35px;
	font-weight: bold;
}
.find-body-news-title-subname{
	margin-bottom: 15px;
	font-size: 24px;
	color: #999999;
	line-height: 30px;
}
.find-body-news-image{
	width: 670px;
	height: 373px;
}
</style>