<!--
 * @Descripttion: 
 * @LastEditTime: 2022-04-23 17:11:59
-->
<template>
	<div class="xt-map-container">
		<el-row>
			<el-col :span="24">
				<div id="xtmapbox"></div>
			</el-col>
		</el-row>
	</div>
</template>

<script>

export default {
	name: 'MapContainer',
	components: {},
	data() {
		return {

		};
	},
	created() { },
	mounted() {
		this.initViewer();
	},
	methods: {
		// 初始化viewer对象
		initViewer() {
			window.viewer = new Cesium.Viewer('xtmapbox', {
				animation: true,
				shouldAnimate: true,
				baseLayerPicker: false,
				fullscreenButton: false,
				geocoder: false,
				homeButton: false,
				sceneModePicker: false,
				selectionIndicator: false,
				timeline: true,
				navigationHelpButton: false,
				infoBox: false,
				mapMode2D: Cesium.MapMode2D.ROTATE,
				navigationInstructionsInitiallyVisible: false,

				/* imageryProvider: new Cesium.TileMapServiceImageryProvider({
					url: '/lib/Cesium/Assets/Textures/NaturalEarthII',
				}), */
				/* terrainProvider: new Cesium.CesiumTerrainProvider({
					url: 'http://223.84.66.67:8092/terrain/DEM',
				}), */
				imageryProvider: new Cesium.UrlTemplateImageryProvider({
					url: 'http://120.46.153.149:8310/tilecache/service/tms/1.0.0/klmy_Image-JPEG-4326@EPSG:4326@jpeg/{z}/{x}/{reverseY}.jpeg',
					tilingScheme: new Cesium.GeographicTilingScheme(),
					// url: 'http://gwxc.shipxy.com/tile.g?z={z}&x={x}&y={y}',
					// url: 'http://223.84.66.67:8092/xyz/image/{z}/{x}/{y}.jpg',
					// url: 'https://webst01.is.autonavi.com/appmaptile?style=6&x={x}&y={y}&z={z}',
					// IMAGE_URL: 'https://webst01.is.autonavi.com/appmaptile?style=6&x={x}&y={y}&z={z}',
					// NOTE_URL: 'http://webst02.is.autonavi.com/appmaptile?x={x}&y={y}&z={z}&lang=zh_cn&size=1&scale=1&style=8',

					// tilingScheme: new Cesium.WebMercatorTilingScheme(),
					// tilingScheme: new Cesium.GeographicTilingScheme(),
				}),
			});

			//显示帧率
			window.viewer.scene.debugShowFramesPerSecond = true;

			//深度检测
			// viewer.scene.globe.depthTestAgainstTerrain = true;

			//取消默认的双击追踪entity
			viewer.cesiumWidget.screenSpaceEventHandler.removeInputAction(
				Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK
			);
			// viewer.cesiumWidget.screenSpaceEventHandler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_CLICK);

			viewer.scene.globe.showGroundAtmosphere = false;
			viewer._cesiumWidget._creditContainer.style.display = 'none';
			viewer.animation.container.style.display = 'none';
			viewer.timeline.container.style.display = 'none';
			viewer.scene.fxaa = true;
			viewer.scene.postProcessStages.fxaa.enabled = true;

			// window.viewer.scene.debugShowFramesPerSecond = true;

			viewer.scene.skyBox = new Cesium.SkyBox({
				sources: {
					positiveX: `assets/skybox/tycho2t3_80_px.jpg`,
					negativeX: `assets/skybox/tycho2t3_80_mx.jpg`,
					positiveY: `assets/skybox/tycho2t3_80_py.jpg`,
					negativeY: `assets/skybox/tycho2t3_80_my.jpg`,
					positiveZ: `assets/skybox/tycho2t3_80_pz.jpg`,
					negativeZ: `assets/skybox/tycho2t3_80_mz.jpg`,
				},
			});



			viewer.camera.flyTo({
				destination: Cesium.Cartesian3.fromDegrees(85.01162265301838, 45.580163733536146, 447.82475988983236),
				orientation: {
					heading: Cesium.Math.toRadians(352.69970867336923),
					pitch: Cesium.Math.toRadians(-28.790968079975457),
					roll: Cesium.Math.toRadians(359.9720525080366),
				},
			});

			/*viewer.camera.flyTo(
				{
					alt: 355.66256886235226,
					heading: 349.16115322864385,
					lat: 45.581034205376696,
					lon: 85.01085045527115,
					pitch: -27.539509872927464,
					roll: 0.0014601694501542777,
				},
				2,
				() => {}
			); */

			// 矢量地图

			// 无偏移影像
			/* 	let smart = new Cesium.UrlTemplateImageryProvider({
				url: 'http://xxx:8310/tilecache/service/tms/1.0.0/klmy_Image-JPEG-4326@EPSG:4326@jpeg/{z}/{x}/{reverseY}.jpeg',
				tilingScheme: new Cesium.GeographicTilingScheme(),
			});
			viewer.imageryLayers.addImageryProvider(smart); */

			// this.init3DModel();
		},

		init3DModel() {
			var qxmoUrl =
				'http://xxx:8310/tiltphoto/api/v1/layers/dataset/Kelamayi-3DTiles_21_35-B3DM--/tileset.json';

			let tileset = new Cesium.Cesium3DTileset({
				url: qxmoUrl,
			});

			tileset.readyPromise.then((tileset) => {
				const cartographic = Cesium.Cartographic.fromCartesian(tileset.boundingSphere.center);
				const surface = Cesium.Cartesian3.fromRadians(cartographic.longitude, cartographic.latitude, 0.0);
				const offset = Cesium.Cartesian3.fromRadians(cartographic.longitude, cartographic.latitude, -215);
				const translation = Cesium.Cartesian3.subtract(offset, surface, new Cesium.Cartesian3());
				tileset.modelMatrix = Cesium.Matrix4.fromTranslation(translation);
				viewer.scene.primitives.add(tileset);
			});
		},

		initApi() {

		}
	},
	computed: {},
};
</script>

<style scoped>
.xt-map-container {
	height: 100%;
}

.xt-map-container>>>.el-row,
.xt-map-container>>>.el-col {
	height: 100%;
}

#xtmapbox {
	/* height: 100%; */
    height: 860px;
	/* width已经被限制在了el-col中 */
	/* padding: 20px; */
}
</style>
