<template>
	<div class="act">
		<list>
			<cell>
				<div class="my-title-bg">
					<image class="my-title-bgImage" src="../src/common/img/titbg.png"></image>
					<text class="my-title-text">我的</text>
					<div class="my-heart-box">
						<image class="my-heart-box-image" src="../src/common/img/tit.png"></image>
						<text class="my-heart-box-name">张某某</text>
						<text class="my-heart-box-subname">客户</text>
					</div>
				</div>
				<div class="my-demand-box">
					<div class="my-demand-balance-box">
						<div class="my-demand-balance-list my-demand-balance-list-left">
							<text class="my-demand-balance-list-title">账户余额(元)</text>
							<text class="my-demand-balance-list-num">1000.00</text>
						</div>
						<div class="my-demand-balance-list">
							<text class="my-demand-balance-list-title">存酒(瓶)</text>
							<text class="my-demand-balance-list-num">25</text>
						</div>
					</div>
					<div class="my-demand-active-box">
						<div class="my-demand-active-box-list">
							<image class="my-demand-active-box-list-image" src="../src/common/img/a1.png"></image>
							<text class="my-demand-active-box-list-name">我的需求</text>
							<div class="my-demand-active-box-list-num-box">
								<text class="my-demand-active-box-list-num-text my-demand-active-box-list-num-textleft">25</text><text class="my-demand-active-box-list-num-text">个</text>
							</div>
						</div>
						<div class="my-demand-active-box-list">
							<image class="my-demand-active-box-list-image" src="../src/common/img/a2.png"></image>
							<text class="my-demand-active-box-list-name">我的活动</text>
							<div class="my-demand-active-box-list-num-box">
								<text class="my-demand-active-box-list-num-text my-demand-active-box-list-num-textleft">25</text><text class="my-demand-active-box-list-num-text">个</text>
							</div>
						</div>
					</div>
				</div>
				<div class="info-box">
					<div class="info-box-list">
						<div class="info-box-list-left-box">
							<image class="info-box-list-left-image" src="../src/common/img/s1.png"></image>
							<text class="info-box-list-left-text">邀请好友</text>
						</div>
						<div class="info-box-list-left-box">
							<text class="info-box-list-right-text">赚取佣金</text>
							<image class="info-box-list-right-image" src="../src/common/img/left.png"></image>
						</div>
					</div>
					<div class="info-box-list">
						<div class="info-box-list-left-box">
							<image class="info-box-list-left-image" src="../src/common/img/s2.png"></image>
							<text class="info-box-list-left-text">个人信息</text>
						</div>
						<div class="info-box-list-left-box">
							<image class="info-box-list-right-image" src="../src/common/img/left.png"></image>
						</div>
					</div>
					<div class="info-box-list">
						<div class="info-box-list-left-box">
							<image class="info-box-list-left-image" src="../src/common/img/s3.png"></image>
							<text class="info-box-list-left-text">关于我们</text>
						</div>
						<div class="info-box-list-left-box">
							<image class="info-box-list-right-image" src="../src/common/img/left.png"></image>
						</div>
					</div>
					<div class="info-box-list">
						<div class="info-box-list-left-box">
							<image class="info-box-list-left-image" src="../src/common/img/s4.png"></image>
							<text class="info-box-list-left-text">退出登录</text>
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
  	}
  }
}
</script>

<style lang="stylus" scoped> 
.act{background-color: #f4f4f4;}
.my-title-bg{position: relative; height: 410px;}
.my-title-bgImage{ position: absolute;top: 0;left: 0;right: 0;bottom: 0; }
.my-title-text{ font-size: 42px;color: #333; text-align: center; font-weight: blod; line-height: 80px; margin-bottom: 30px; }
.my-heart-box{ display: flex; flex-direction: column; justify-content: center;align-items: center;  }
.my-heart-box-image{ width: 150px; height: 150px; border-radius: 50%; margin-bottom: 15px; }
.my-heart-box-name{ font-size: 30px; color: #333333;}
.my-heart-box-subname{ font-size: 24px; color: #333333;}

.my-demand-box{position: relative;padding-top: 125px; }
.my-demand-balance-box{position: fixed; top: 355px; width: 710px; margin-left: 20px; display: flex; flex-direction: row; justify-content: center;align-items: center; box-shadow: 0 0 3px 5px #eee; border-radius: 15px;padding: 20px; background-color: #fff;}
.my-demand-balance-list{ flex: 1; }
.my-demand-balance-list-left{ border-right-width: 1px; border-right-color: #e5e5e5; border-right-style: solid; }
.my-demand-balance-list-title{ margin-top: 20px;text-align: center;font-size: 24px;color: #777777;}
.my-demand-balance-list-num{ text-align: center;font-size: 52px; color: #333333; margin-top:15px; margin-bottom: 20px;}

.my-demand-active-box{margin-top: 25px; margin-left: 20px; margin-right: 20px; padding-bottom: 25px; width: 710px;display: flex; flex-direction: row; justify-content: space-between;align-items: center;}
.my-demand-active-box-list{width:350px; display: flex; flex-direction: column; justify-content: center;align-items: center;border-radius: 15px; box-shadow: 0 0 3px 5px #eee; padding: 15px; height: 185px;background-color: #fff; }
.my-demand-active-box-list-image{width: 55px; height: 55px; margin: 15px 20px;}
.my-demand-active-box-list-name{ font-size: 24px; color: #777777; }
.my-demand-active-box-list-num-box{display: flex; flex-direction: row; justify-content: center;align-items: center;}
.my-demand-active-box-list-num-text{ font-size: 24px; color:#777777; line-height: 30px;}
.my-demand-active-box-list-num-textleft{color:#ff6204}


.info-box-list{ line-height: 82px; height: 82px; display: flex; flex-direction: row; justify-content: space-between;align-items: center; background-color: #fff; padding-left: 20px;padding-right: 20px; }
.info-box-list-left-box{ display: flex; flex-direction: row;justify-content: flex-start;align-items: center; }
.info-box-list-left-image{ width: 28px; height: 30px; margin-right: 10px;}
.info-box-list-left-text{ font-size: 26px; color:#333333; }
.info-box-list-right-text{  font-size: 26px; color:#777;  }
.info-box-list-right-image{ width: 13px; height: 20px; margin-left: 25px; }
</style>