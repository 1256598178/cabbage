<template>
	<div class="search">
		<div class="shop-header-title-wrapper">
			<input autofocus="true" class="searchInput" type="text" placeholder="搜索商品名称" name="">
			<image class="input-image" src="../src/common/images/search.png"></image>
			<text class="shop-header-delet">取消</text>
		</div>
		<div class="search-body">
			<div class="search-hot search-hot-one">
				<div class="search-hot-title-box">
				    <text class="search-hot-title">热门搜索</text>
				</div>
				<div class="search-hot-wrapper">
					<div class="search-hot-list" v-for="item in 10"><text class="search-hot-list-text">叶菜类</text></div>
				</div>
			</div>
			<div class="search-hot">
				<div class="search-hot-title-box">
				    <text class="search-hot-title">历史搜索</text>
				    <image class="delet" src="../src/common/images/trash.png"></image>
				</div>
				<div class="search-hot-wrappe-history">
					<div class="search-hot-list-history" v-for="item in 10"><text class="search-hot-list-text search-hot-list-text-history">叶菜类叶菜叶菜类叶菜叶菜类叶菜叶菜类叶菜叶菜类叶菜叶菜类叶菜叶菜类叶菜</text></div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
		}
	}
}
</script>

<style lang="stylus" scoped>
.shop-header-title-wrapper{
	position: relative;
	display: flex;
	flex-direction: row;
	align-items: center;
	height: 92px;  /*26 + 40 + 26*/
	padding-left: 20px;
	padding-right: 20px;
	background-color: rgb(115,204,70);
}
.searchInput{
	padding-left: 70px;
	padding-right: 20px;
	width: 610px;
	height: 60px;
	background-color: rgba(255,255,255,.5);
	border-radius: 60px;
	color: #fff;
	placeholder-color: #fff;
	outline: none;
}
.shop-header-delet{
	position: absolute;
	right: 20px;
	top: 0;
	margin-top: 29px;
	font-size: 34px;
	color: #c1e6a3;
}
.input-image{
	position: absolute;
	margin-left: 18px;
	width: 33px;
	height: 33px;
}


//////////////////////////////////////
.search-body{
	padding-top: 20px;
	padding-left: 20px;
	padding-right: 20px;
}
.search-hot-one{
	margin-bottom: 40px;
}
.search-hot-title-box{
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 20px;
}
.search-hot-title{
	font-size: 24px;
	color: #333333;
}
.search-hot-wrapper,.search-hot-wrappe-history{
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	width: 710px;
}
.search-hot-wrapper{
	justify-content: space-between;
}
.search-hot-wrappe-history{

}
.search-hot-list,.search-hot-list-history{
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	margin-bottom: 20px;
	height: 50px;
	border-width: 1px;
	border-color: #d2d2d2;
	border-style: solid;
	border-radius: 50px;
}
.search-hot-list{
	width: 119px;
}
.search-hot-list-text{
	font-size: 25px;
	color: #555;
}
.delet{
	width: 25px;
	height: 25px;
}
.search-hot-list-history{
	max-width: 710px;
	padding-left: 25px;
	padding-right: 25px;
	margin-right: 20px;
}
.search-hot-list-text-history{
	max-width: 660px;
	text-overflow: ellipsis;
	lines: 1;
}
</style>