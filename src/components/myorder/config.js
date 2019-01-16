/**
 * Created by Tw93 on 2016/11/4.
 */

export default {
	tabTitles: [{
			title: '全部订单',
			//icon: 'https://gw.alicdn.com/tfs/TB1MWXdSpXXXXcmXXXXXXXXXXXX-72-72.png',
			//activeIcon: 'https://gw.alicdn.com/tfs/TB1kCk2SXXXXXXFXFXXXXXXXXXX-72-72.png',
		},
		{
			title: '待付款',
			//icon: 'https://gw.alicdn.com/tfs/TB1ARoKSXXXXXc9XVXXXXXXXXXX-72-72.png',
			//activeIcon: 'https://gw.alicdn.com/tfs/TB19Z72SXXXXXamXFXXXXXXXXXX-72-72.png'
		},
		{
			title: '待取货',
			//icon: 'https://gw.alicdn.com/tfs/TB1VKMISXXXXXbyaXXXXXXXXXXX-72-72.png',
			//activeIcon: 'https://gw.alicdn.com/tfs/TB1aTgZSXXXXXazXFXXXXXXXXXX-72-72.png'
		},
		{
			title: '待评价',
			//icon: 'https://gw.alicdn.com/tfs/TB1Do3tSXXXXXXMaFXXXXXXXXXX-72-72.png',
			//activeIcon: 'https://gw.alicdn.com/tfs/TB1LiNhSpXXXXaWXXXXXXXXXXXX-72-72.png'
		},
		{
			title: '退款服务',
			//icon: 'https://gw.alicdn.com/tfs/TB1jFsLSXXXXXX_aXXXXXXXXXXX-72-72.png',
			//activeIcon: 'https://gw.alicdn.com/tfs/TB1_Kc.SXXXXXa8XpXXXXXXXXXX-72-72.png'
		},
		{
			title: '售后服务',
			//icon: 'https://gw.alicdn.com/tfs/TB199sPSXXXXXb4XVXXXXXXXXXX-72-72.png',
			//activeIcon: 'https://gw.alicdn.com/tfs/TB1DR.3SXXXXXc2XpXXXXXXXXXX-72-72.png'
		}
	],
	tabStyles: {
		bgColor: '#FFFFFF',
		titleColor: '#777777',
		activeTitleColor: '#73cc00',
		activeBgColor: '#FFFFFF',
		isActiveTitleBold: true,
		iconWidth: 70,
		iconHeight: 70,
		width: 140,
		height: 80,
		fontSize: 24,
		hasActiveBottom: true,
		activeBottomColor: '#73cc00',
		activeBottomHeight: 2,
		activeBottomWidth: 100,
		textPaddingLeft: 10,
		textPaddingRight: 10
	},
	// 使用 iconfont 模式的tab title配置
	tabIconFontTitles: [{
			title: '首页',
			codePoint: '\ue623'
		},
		{
			title: '特别推荐',
			codePoint: '\ue608'
		},
		{
			title: '消息中心',
			codePoint: '\ue752',
			badge: 5
		},
		{
			title: '我的主页',
			codePoint: '\ue601',
			dot: true
		}
	],
	tabIconFontStyles: {
		bgColor: '#FFFFFF',
		titleColor: '#666666',
		activeTitleColor: '#3D3D3D',
		activeBgColor: '#FFFFFF',
		isActiveTitleBold: true,
		width: 160,
		height: 120,
		fontSize: 24,
		textPaddingLeft: 10,
		textPaddingRight: 10,
		iconFontSize: 50,
		iconFontColor: '#333333',
		iconFontMarginBottom: 8,
		activeIconFontColor: 'red',
		iconFontUrl: '//at.alicdn.com/t/font_501019_mauqv15evc1pp66r.ttf'
	}
}