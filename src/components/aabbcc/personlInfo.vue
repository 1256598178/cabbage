<template>
	<div class="act">
		<!-- <v-header :title="活动详情"></v-header> -->
		<div class="person">
			<text class="person-title-name">请填写完善个人资料信息</text>
			<div class="person-content-box">
				<div class="person-content-camera-box">
					<image class="person-content-camera-image" src="../src/common/img/camera.png"></image>
				</div>
				<text class="person-content-camera-name">更换照片</text>
			</div>
			<div class="person-listbox">
				<input class="person-listbox-list" placeholder="昵称" type="text" name="">
				<input class="person-listbox-list" placeholder="姓名" type="text" name="">
				<input class="person-listbox-list" placeholder="手机号码" type="text" name="">
				<input class="person-listbox-list" placeholder="邮箱" type="text" name="">
			</div>
			<text class="person-btn">确&nbsp;&nbsp;&nbsp;定</text>
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
.person{position: fixed; top: 90px; left: 0; right: 0; bottom: 0; width: 710px; padding-left: 20px; padding-right: 20px;}
.person-title-name{padding-top: 30px; padding-bottom: 30px; font-size: 24px; color: #777777;}
.person-content-box{display: flex; flex-direction: row;justify-content: flex-start;align-items: center; }
.person-content-camera-box{display: flex; flex-direction: row;justify-content: center;align-items: center;width: 150px; height: 150px; background-color: #e5e5e5;}
.person-content-camera-image{width: 88px; height: 76px;}
.person-content-camera-name{flex: 1;padding-left: 20px; padding-right: 20px;font-size: 24px; color: #333333;}
.person-listbox{margin-top: 3px;}
.person-listbox-list{height: 90px; line-height: 90px;border-bottom-width: 1px; border-bottom-color: #000000; border-bottom-style: solid;font-size: 24px; color: #333333;}
.person-btn{position: fixed; bottom: 50px; left: 20px; width: 710px; height: 80px; line-height: 80px; text-align: center; font-size: 36px; color: #333333; border-radius: 8.8px; background-color: #ffd46b;}
</style>