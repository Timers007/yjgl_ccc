<!-- 地图拾取经纬度 -->
<template>
  <div class="map-address">
    <div id="mapDiv"></div>
    <div class="left-top">
      <el-input
        v-model="input"
        placeholder="请输入关键词搜索"
        class="address-search"
        @input="searchWithName"
      >
        <el-button size="mini" @click="confirm" slot="append"
          >确认选中</el-button
        >
      </el-input>
      <div class="address-list" v-show="addressList && addressList.length">
        <div
          v-for="(item, index) in addressList"
          :key="index"
          @click="selectOneAddr(item.address + item.name)"
        >
          <div>{{ item.address }}</div>
          <div>{{ item.name }}</div>
        </div>
      </div>
    </div>
    <div class="bottom-info">
      <el-row :gutter="20">
        <el-col :span="8"
          ><div class="grid-content bg-purple">【经度】：{{ addinfo.lng }}</div></el-col
        >
        <el-col :span="8"
          ><div class="grid-content bg-purple">【纬度】：{{ addinfo.lat }}</div></el-col
        >
        <el-col :span="8"
          ><div class="grid-content bg-purple">
            【详细地址】：{{ addinfo.address }}
          </div></el-col
        >
      </el-row>
    </div>
  </div>
</template>
  
  <script>
export default {
  components: {},
  data() {
    return {
      lng: 0,
      lat: 0,
      address: "",
      marker: {},
      input: "",
      map: {},
      addressList: [],
      addinfo: {
        address: "",
        lng: null,
        lat: null,
      },
    };
  },
  computed: {},
  watch: {
    input(val) {
      if (!val) {
        this.addressList = [];
        // 用来清空删除太快时候出现列表的bug
        setTimeout(() => {
          this.addressList = [];
        }, 3000);
      }
    },
  },
  methods: {
    confirm() {
      if (this.lng && this.lat && this.address) {
        this.$emit("closeMapaddressDialog", false);
      } else {
        this.$message.warning("鼠标点选或搜索选中地址后再进行确认");
      }
    },
    // 搜索 天地图LocalSearch
    searchWithName(val) {
      if (val) {
        let that = this;
        var config = {
          pageCapacity: 10, //每页显示的数量
          onSearchComplete: localSearchResult, //接收数据的回调函数
        };
        //创建搜索对象
        let localsearch = new T.LocalSearch(that.map, config);
        localsearch.search(that.input, 5);
        function localSearchResult(result) {
          //清空地图及搜索列表
          clearAll();
          //解析建议词信息
          suggests(result.getSuggests());
        }
        //解析建议词信息
        function suggests(obj) {
          if (obj && obj.length) {
            //建议词提示，如果搜索类型为公交规划建议词或公交站搜索时，返回结果为公交信息的建议词。
            console.log(obj);
            that.addressList = obj;
          }
        }
        //清空地图及搜索列表
        function clearAll() {
          that.map.clearOverLays();
        }
      } else {
        this.addressList = [];
      }
    },
    // 初始化地图
    initMap() {
      var map;
      var zoom = 12;
      map = new T.Map("mapDiv", {
        projection: "EPSG:4326",
      });
      map.centerAndZoom(new T.LngLat(84.91791, 45.60259), zoom);
      map.setMapType(TMAP_NORMAL_MAP); // 设置地图类型
      this.map = map;
      //创建对象
      let geocode = new T.Geocoder();
      // 鼠标点击逆地理搜索
      map.addEventListener("click", function (e) {
        geocode.getLocation(e.lnglat, searchResult);
      });
      let that = this;
      function searchResult(result) {
        if (result.getStatus() == 0) {
          // console.log(result.getAddress());
          that.address = result.getAddress();
          that.addinfo.address = that.address;
          that.$emit("setAddress", that.address);
          let label = new T.Label({
            text: that.address,
            position: that.marker.getLngLat(),
            offset: new T.Point(10, -20),
          });
        //   map.addOverLay(label);
        } else {
          map.clearOverLays();
          console.log(result.getMsg());
        }
      }
      var cp = new T.CoordinatePickup(map, { callback: getLngLat });
      cp.addEvent();
      function getLngLat(lnglat) {
        map.clearOverLays();
        // console.log("这是lnglat.lng.toFixed(6) ", lnglat.lng.toFixed(6));
        // console.log("这是lnglat.lat.toFixed(6)", lnglat.lat.toFixed(6));
        that.lng = lnglat.lng.toFixed(6);
        that.lat = lnglat.lat.toFixed(6);
        that.addinfo.lng = that.lng;
        that.addinfo.lat = that.lat;
        that.$emit("setPosition", [that.lng, that.lat]);
        that.marker = new T.Marker(new T.LngLat(that.lng, that.lat)); // 创建点
        map.addOverLay(that.marker);
      }
    },
    selectOneAddr(val) {
      let that = this;
      that.map.clearOverLays();
      //创建对象
      let geocoder = new T.Geocoder();
      geocoder.getPoint(val, searchResult);
      function searchResult(result) {
        if (result.getStatus() == 0) {
          that.map.panTo(result.getLocationPoint(), 16);
          //创建标注对象
          var marker = new T.Marker(result.getLocationPoint());
          //向地图上添加标注
          let label = new T.Label({
            text: val,
            position: result.getLocationPoint(),
            offset: new T.Point(10, -20),
          });
          that.map.addOverLay(label);
          that.map.addOverLay(marker);
          that.address = val;
          that.$emit("setAddress", val);
          that.lng = result.getLocationPoint().lng;
          that.lat = result.getLocationPoint().lat;
          that.$emit("setPosition", [
            result.getLocationPoint().lng,
            result.getLocationPoint().lat,
          ]);
        } else {
          this.$message.warning("定位出错请重新选择");
        }
      }
    },
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    this.initMap();
  },
  beforeCreate() {},
  beforeMount() {},
  beforeUpdate() {},
  updated() {},
  beforeDestroy() {},
  destroyed() {},
  //如果页面有keep-alive缓存功能，这个函数会触发
  activated() {},
};
</script>
  <style lang='scss' scoped>
.cur {
  cursor: pointer;
}
// .bottom-info {
//   position: absolute;
//   left: 55px;
//   top: 120px;
//   display: flex;
//   flex-direction: column;
// }
.map-address {
  height: 60vh;
}

#mapDiv {
  height: 100%;
  position: relative;
}

.left-top {
  position: absolute;
  left: 55px;
  top: 120px;
  display: flex;
  flex-direction: column;
}

.address-search {
  width: 20vw;
  z-index: 10000;
  margin-bottom: 20px;
}

.address-list {
  display: flex;
  flex-direction: column;
  z-index: 10000;
  background-color: #fff;
  padding: 10px;
  min-width: 18vw;
  border: 1px solid #dcdfe6;

  > div {
    display: flex;
    align-items: center;
    height: 30px;
    cursor: pointer;
    color: #409eff;

    &:hover {
      background-color: #eee;
    }
  }
}
</style>
  <style>
.address-search .el-input-group__append,
.el-input-group__prepend {
  background-color: #409eff;
  color: #fff;
}
</style>
  