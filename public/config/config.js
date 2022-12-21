/*
 * @Descripttion: santana
 * @LastEditTime: 2022-02-15 16:18:38
 */
(function () {
	window.xtConfig = window.xtConfig || {
		baseName: '园区应急',
		baseLogo: 'https://scpic.chinaz.net/Files/pic/icons128/8227/g10.png',
		baseUrl: 'http://127.0.0.1/',

		subsys: '',
		copyright: 'Copyright © 2022-2023 All Rights Reserved.',
		version: '',
		// 文件预览前缀
		preview: 'http://36.133.177.83:9001/onlinePreview?url=',

		// stompjs 消息推送设置
		ws: {
			WS_URL: '120.46.153.149:8087',
			hasdebug: true,
			prefix: 'http://36.133.177.83:9100/xtConfig-api/ws/websocketJS',
			// 是否允许打开
			allowopen: true,
			// 全局打开状态  可以在主页连接一次  其他页面直接调用
			isopen: false,
		},
		// 地图配置
		mapCfg: {
			cesium: {
				baseImageUrl: 'https://webst01.is.autonavi.com/appmaptile?style=6&x={x}&y={y}&z={z}',
				baseLabelUrl: '',
				defaultPoint: [120, 30],
				defaultName: 'xx',
				mode: '3D',
			},
			basemap: {
				IMAGE_URL: 'https://webst01.is.autonavi.com/appmaptile?style=6&x={x}&y={y}&z={z}',
				NOTE_URL:
					'http://webst02.is.autonavi.com/appmaptile?x={x}&y={y}&z={z}&lang=zh_cn&size=1&scale=1&style=8',
			},
			minZoom: 1,
			maxZoom: 18,
			lng: '108.89',
			lat: '34.221',
			address: '陕西省西安市 ',
			center: [108.99, 34.2311],
			zoom: 13,
		},
		// 模块定制配置
		module: {
			plan: {},
		},
	};
})();
