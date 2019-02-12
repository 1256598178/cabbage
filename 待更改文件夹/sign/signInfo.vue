<template>
	<div class="find">
		<div class="find-title-box">
			<v-header :titleName="titleName" :backPage="true"></v-header>
		</div>
		<list class="congra-body-wrapper">
			<cell v-for="(item,index) in sList" :key="index">
				<div class="signInfo">
					<div class="signInfo-wrapper">
						<image class="logo" src="../src/common/images/logo@45x45.png"></image>
						<text class="signInfo-name">签到成功</text>
						<text class="signInfo-subname">{{item.SignInDay}}</text>
					</div>
					<text class="signInfo-num">{{item.IsSignIn}}</text>
				</div>
			</cell>
		</list>
	</div>
</template>

<script>
import Util from '../../common/utils/utils.js'
import header from '../header/orderHeader.vue'
const stream = weex.requireModule('stream') 
const storage = weex.requireModule('storage')
export default {
	data() {
		return {
			titleName: '签到记录',
			LOGIN_URL:'api/account/getmysignin',
			USERID:'user_id',
			TOKEN:'user_token',
			sList:[]
		}
	},
	methods: {
		
	},
	components: {
    	"v-header": header 
    },
	created() {
		var self = this;
		storage.getItem(this.USERID,event => {
         self.USERID = event.data
         storage.getItem(this.TOKEN,event => {
          self.TOKEN = event.data
          Util.WeexAjax({
              url: self.LOGIN_URL + '?UserId=' + self.USERID,
              method: 'GET',
              type: 'JSON',
              token: self.TOKEN,
              callback: function(ret) {
               if(ret.Status == 1){
                //self.loginBool = true;
                self.sList = ret.obj.SignInList;
                console.log(self.sList);
               }
              }
          })
         })
        });
	}
}
</script>

<style lang="stylus" scoped>
.find{
	background-color: #f5f5f5;
}
.congra-body-wrapper{
	position: fixed;
	width: 750px;
	top: 90px;
	bottom: 0;
	margin-top: 20px;
	padding-left: 20px;
	padding-right: 20px;
	margin-bottom: 20px;
	background-color: #fff;
}
.signInfo{
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	padding-top: 15px;
	padding-bottom: 15px;
	padding-left: 20px;
	padding-right: 20px;
	background-color: #fff;
	border-bottom-width: 2px;
	border-bottom-color: #f4f4f4;
	border-bottom-style: solid;
}
.signInfo-wrapper{
	display: flex;
	flex-direction: row;
	align-items: center;
}
.logo{
	width: 45px;
	height: 45px;
}
.signInfo-name{
	margin-left: 20px;
	font-size: 22px;
	color: #33333;
	font-weight: bold;
}
.signInfo-subname{
	margin-left: 20px;
	font-size: 20px;
	color: #777777;
}
.signInfo-num{
	margin-right: 40px;
	margin-left: 20px;
	font-size: 20px;
	color: #f26100;
	font-weight: bold;
}
</style>