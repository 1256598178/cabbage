<template>
	<div class="item_whole">
		<div class="item_title">
			<text class="item_left_title">{{leftTitle}}</text>
			<text class="item_right_title">{{rightTitle}}</text>
		</div>
		<div class="item_content">
			<div class="item_text">
				<text class="item_name">{{"创建时间"}}</text>
				<text class="text_create_time">{{createTime}}</text>
			</div>
			<div class="item_text">
				<text class="item_name">{{"作业单据"}}</text>
				<text class="text_create_time">{{workOrder}}</text>
			</div>
			<div class="item_text">
				<text class="item_name">{{"订单"}}</text>
				<text class="text_order">{{order}}</text>
			</div>
		</div>
	</div>
</template>
<script>
	import { WxcRichText, WxcSpecialRichText } from 'weex-ui'
	export default {
		name: 'order-item',
		components: {
			WxcRichText,
			WxcSpecialRichText
		},
		props: {
			leftTitle: {
				type: String,
				default: '单据信息'
			},
			rightTitle: {
				type: String,
				default: '调拨入库'
			},
			createTime: {
				type: String,
				default: '100'
			},
			workOrder: {
				type: String,
				default: '1000'
			},
			order: {
				type: String,
				default: '1000'
			}
		},
		data: function() {
			return {}
		}

	}
</script>
<style scoped>
	.item_whole {
		margin-left: 20px;
		margin-right: 20px;
		margin-top: 20px;
		margin-bottom: 20px;
		color: #afddff;
	}
	
	.item_title {
		flex-direction: row;
		justify-content: space-between;
		margin-bottom: 20px;
	}
	
	.item_left_title {
		font-size: 32px;
		color: #000000;
	}
	
	.item_right_title {
		font-size: 32px;
		color: #F2A12F;
	}
	
	.item_content {
		flex-direction: column;
	}
	
	.item_text {
		flex-direction: row;
		font-size: 28px;
		color: #333333;
		margin-top: 20px;
	}
	
	.text_create_time {
		margin-left: 100px;
		font-size: 28px;
		color: #333333;
	}
	
	.text_order {
		margin-left: 165px;
		font-size: 28px;
		color: #333333;
	}
</style>


<script>
	//存储
	storage.setItem('title', '单据详情-1', event => {        
		this.state = 'set success'
        console.log('set success')
    })//获取
    storage.getItem('title', event => {     
    	this.title = 'value: ' + event.data
      	modal.toast({'message': '收到' + this.title, 'duration': 1})
    })
</script>

