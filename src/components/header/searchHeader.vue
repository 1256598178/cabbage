<template>
	<div class="classes-head">
		<div class="search-box">
			<image class="search-icon" src="http://47.92.164.211:8011/PublicImage/search.png"></image>
			<text class="search-text">搜索商品名称</text>
		</div>
		<div class="scan-btn">
			<image class="scan-icon" src="http://47.92.164.211:8011/PublicImage/scan.png"></image>
		</div>
	</div>
</template>

<script>
export default {
	
}
</script>

<style lang="stylus" scoped>
	.classes-head{
		padding-top: 17px;
		padding-bottom: 17px;
		padding-left: 20px;
		padding-right: 20px;
		flex-direction: row;
		background-color: rgba(115,204,0,1);
	}
	.search-box{
		height: 56px;
		border-radius: 56px;
		background-color: rgba(255,255,255,0.5);
		padding-left: 20px;
		padding-right: 20px;
		flex: 1;
		flex-direction: row;
	}
	.search-icon{
		width: 32px;
		height: 32px;
		margin-top: 12px;
		margin-right: 15px;
	}
	.search-text{
		font-size: 24px;
		line-height: 56px;
		color: #fff;
	}
	.scan-btn{
		width: 42px;
		margin-left: 15px;
	}
	.scan-icon{
		width: 42px;
		height: 42px;
		margin-top: 7px;
	}
</style>