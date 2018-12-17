<template>
	<div class="modal" v-if="showModal">
		<div class="modal-wrapper">
			<div class="top">
			  {{modalTitle}}
		    </div>
		    <div class="main">
			    {{modalContent}}
		    </div>
		    <div class="foot">
			    <div class="btn" @click="cancel()">取消</div>
			    <div class="btn" @click="deterMine()">确定</div>
		    </div>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		showModal: {
			type: Boolean
		},
		hisArrays: {
			type: Array
		},
		modalTitle: {
			type: String
		},
		modalContent: {
			type: String
		}
	},
	methods: {
		cancel() {
			this.$emit("changeShowModal",false);
		},
		deterMine() {
			this.$emit("changeShowModal",false);
			this.$emit("delete",[]);
		}
	}
}
</script>

<style lang="stylus">
	.modal{
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: rgba(0,0,0,.5);
		z-index: 999;
		.modal-wrapper{
			position: absolute;
			width: 90%;
			top: 50%;
			left: 50%;
			transform: translate(-50%,-50%);
			border-radius: 5px;
			background: #fff;
			.top{
				padding: 15px;
				font-size: 18px;
				color: #73cc00;
				border-bottom: 1px solid #73cc00;
			}
			.main{
				padding: 25px 20px;
				font-size: 16px;
				color: #000;
			}
			.foot{
				display: flex;
				.btn{
					flex: 1;
					height: 45px;
					line-height: 45px;
					color: #777;
					text-align: center;
					border-top: 1px solid #eee;
					&:first-child{
						border-right: 1px solid #eee;
					}
				}
			}
		}
	}
</style>