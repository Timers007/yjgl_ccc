<template>
  <div>
    <el-container id="main">
      <el-header>Header</el-header>
      <el-container style="height: 900px">
        <el-aside width="260px">
          <asides />
          

          <!-- <el-menu
            default-active="2"
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b"
          >
            <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>应急资源</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="1-1" @click="changeRouter('/resource')"
                  >资源维护</el-menu-item
                >
                <el-menu-item
                  index="1-2"
                  @click="changeRouter('/resourceManage')"
                  >资源管理</el-menu-item
                >
                <el-menu-item index="1-2">资源统计</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="2">
              <el-menu-item index="2-1" @click="changeRouter('/mapCesium')">
                <i class="el-icon-menu"></i>
                <span slot="title">地图</span>
              </el-menu-item>
            </el-submenu>
            <el-submenu index="3">
              <el-menu-item index="3">
                <template slot="title">
                  <i class="el-icon-location"></i>
                  <span>值班管理</span>
                </template>
                <el-menu-item-group>
                  <el-menu-item index="3-1" @click="changeRouter('/calindex')"
                    >值排班</el-menu-item
                  >
                  <el-menu-item index="3-2" @click="changeRouter('/calendar')"
                    >值班详情</el-menu-item
                  >
                  <el-menu-item index="3-2">值班日报</el-menu-item>
                </el-menu-item-group>
              </el-menu-item>
            </el-submenu>
            <el-submenu index="4">
              <el-menu-item index="4">
                <i class="el-icon-setting"></i>
                <span slot="title">接处警</span>
              </el-menu-item>
            </el-submenu>
          </el-menu> -->
        </el-aside>
        <el-main>
          <!-- <mapCesium /> -->
          <!-- <index /> -->
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import index from "../views/calendar/index.vue";
import mapCesium from "../views/map_cesium/index.vue";
import asides from "./aside01.vue";
export default {
  components: { index, mapCesium,asides },
  data() {
    return {
      isCollapse:false,
      menuList: [
        {
          label: "应急资源",
          name: "/resource",
          icon:"el-icon-eleme",
          index: "1",
          children: [
            {
              label: "资源管理",
              name: "/resource",
              index: "1 - 1",
              icon:"el-icon-s-tools",
            },
            {
              label: "资源维护",
              name: "/resourceManage",
              index: "1 - 2",
              icon:"el-icon-setting",
            },
            {
              label: "资源统计",
              name: "/resourceManage",
              index: "1 - 3",
              icon:"el-icon-star-on",
            },
          ],
        },
        {
          label: "值班管理",
          name: "/calendar",
          index: "2",
          icon:"el-icon-s-cooperation",
          children: [
            {
              label: "值排班",
              name: "/calendar",
              index: "2 - 1",
              icon:"el-icon-setting",
            },
            {
              label: "值班详情",
              name: "/calindex",
              index: "2 - 2",
              icon:"el-icon-setting",
            },
            {
              label: "值班日报",
              name: "/resourceManage",
              index: "2 - 3",
              icon:"el-icon-setting",
            },
          ],
        },
        {
          label: "接处警",
          name: "/resource",
          icon:"el-icon-setting",
          index: "3",
          children: [
            {
              label: "接处警",
              name: "/resourceManage",
              index: "3 - 1",
              icon:"el-icon-setting",
            },
          ],
        },
        {
          label: "资源优化调配",
          name: "/resource",
          index: "4",
          icon:"el-icon-setting",
          children: [
            {
              label: "资源优化调配",
              name: "/resourceManage",
              index: "4 - 1",
              icon:"el-icon-setting",
            },
          ],
        },
      ],
    };
  },
  created() {},
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    changeRouter(route) {
      console.log(route, "route");
      this.$router.push({ path: route });
    },
    // isCollapse(){},
  },
};
</script>
<style lang="scss" scoped>
  .el-menu-vertical-demo {
    width: 200px;
    min-height: 400px;
  }
</style>
<style>


#main {
  height: 100%;
  font-size: 1rem;
}

.el-header,
.el-footer {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  /* line-height: 160px; */
}

body > .el-container {
  margin-bottom: 40px;
  height: 100%;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
</style>
