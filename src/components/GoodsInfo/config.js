/**
 * Created by Tw93 on 2016/11/4.
 */

export default {
	tabTitles: [{
			title: '商品',
			//icon: 'https://gw.alicdn.com/tfs/TB1MWXdSpXXXXcmXXXXXXXXXXXX-72-72.png',
			//activeIcon: 'https://gw.alicdn.com/tfs/TB1kCk2SXXXXXXFXFXXXXXXXXXX-72-72.png',
		},
		{
			title: '详情',
			//icon: 'https://gw.alicdn.com/tfs/TB1ARoKSXXXXXc9XVXXXXXXXXXX-72-72.png',
			//activeIcon: 'https://gw.alicdn.com/tfs/TB19Z72SXXXXXamXFXXXXXXXXXX-72-72.png'
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