<template>
	<div class="act">
		<!-- <v-header :title="活动详情"></v-header> -->
		<div class="person">
			<image class="person-content-camera-image" src="../src/common/img/ab1.png"></image>
			<div class="invite-box">
				<text class="invite-person-btn">邀请好友注册，好友成功消费后，进行消费金额返利，具体规则如下：</text>
				<text class="invite-person-btn">1、直接好友：返利5%；</text>
				<text class="invite-person-btn">2、间接好友（直接好友所邀请好友）：返利1%；</text>
				<text class="invite-person-btn">3、间接好友所邀请的好友，不享受返利。</text>
			</div>
			<text class="person-btn">确&nbsp;&nbsp;&nbsp;定</text>
			<div class="share-box">
				<div class="share-box-title">
					<div class="share-line"></div>
					<text class="invite-person invite-person-title">分享至</text>
					<div class="share-line"></div>
				</div>
				<div class="share-body">
					<div class="share-body-list">
						<image class="person-list-image" src="../src/common/img/share1.png"></image>
						<text class="invite-person invite-person-name">分享至</text>
					</div>
					<div class="share-body-list">
						<image class="person-list-image" src="../src/common/img/share2.png"></image>
						<text class="invite-person invite-person-name">分享至</text>
					</div>
					<div class="share-body-list">
						<image class="person-list-image" src="../src/common/img/share3.png"></image>
						<text class="invite-person invite-person-name">分享至</text>
					</div>
					<div class="share-body-list">
						<image class="person-list-image" src="../src/common/img/share4.png"></image>
						<text class="invite-person invite-person-name">分享至</text>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import header from './header.vue'
export default {
  data() {
  	return {
  	}
  },
  methods: {

  }
}
</script>

<style lang="stylus" scoped>
.person{position: fixed; top: 90px; left: 0; right: 0; bottom: 0; width: 750px;}
.person-content-camera-image{position: absolute; top: 0; width: 750px; height: 455px;}
.invite-box{margin-top: 185px; width: 710px; margin-left: 20px; margin-right: 20px;padding-top: 40px;padding-bottom: 80px; padding-left: 25px; padding-right: 25px;border-radius: 10px;background-color: #e4b94e}
.invite-person-btn{font-size: 26px; color: #ffffff; line-height: 40px;}
.person-btn{margin-top: 80px; margin-left: 20px;width: 710px; height: 80px; line-height: 80px; text-align: center; font-size: 36px; color: #333333; border-radius: 8.8px; background-color: #ffd46b;}
.share-box{margin-top: 80px;width: 710px;margin-left: 20px; marign-right: 20px;}
.share-box-title{display: flex; flex-direction: row;justify-content: center;align-items: center;}
.share-line{flex: 1; height: 1px; background-color: #bfbfbf;}
.invite-person{padding-left: 50px; padding-right: 20px; font-size: 20px; color: #777777;}
.invite-person-title{padding-left: 50px; padding-right: 50px;}
.share-body{margin-top: 25px;display: flex; flex-direction: row;justify-content: space-around;align-items: center;}
.share-body-list{display: flex; flex-direction: column;align-items: center;}
.person-list-image{width: 84px; height: 84px;}
.invite-person-name{margin-top: 20px; font-size: 22px;padding-left: 0; padding-right: 0;}
</style>