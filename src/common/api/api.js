let ajaxUrl = {
	// POST
	SHOPCAR_URL: "api/cart/addCart", //添加到购物车
	LOGIN_URL: "api/account/login", // 登录
	GETCODE_URL: "api/account/getsmscode", //获取短信验证码
	FINDPASSWORD_URL: "api/account/findpassword",  //修改密码
	REGISTER_URL: "api/account/register", //注册
	MODIFYSHOPNUM_URL: "api/cart/changeCart",  //修改购物车
	SUBMITORDER_URL: "api/cart/sumbitOrder", //  提交订单
	// GET
	HOME_URL: "api/basic/gethomepage", //获取首页
	SEAFOOD_URL: "api/product/getprodcutlistbypage?",  //根据分类获取商品列表(分页)
	GETPRODCUTDETAIL_URL: "api/product/getprodcutdetail",  //根据商品Id获取商品信息
	CLASS_URL: "api/product/getcagegorylist",  //获取分类数据
	SELECT_URL: "api/product/getprodcutlist?categoryId=",  //根据商品id获取商品
	SHOP_URL: "api/cart/getMyCartList?userId=",  //获取购物车列表
	GETMYCARTCHOSTLIST_URL: "api/cart/getMyCartChoseList?UserId=",  //获取选中的购物车列表
	DATEURLS: "api/cart/getPickingDateTime", //取货日期
	TIMEURLS: "api/cart/getPickingTime",  //取货时间
	GETUSERINFO_URL: "api/account/getuserinfo", //获取我的信息




	// 字体图标
	iconUrl: "//at.alicdn.com/t/font_948634_j56el7oqed.ttf",
}

export default ajaxUrl;