<template>
  <el-aside width="auto" height="auto">
    <el-menu
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      :collapse="isCollapse"
    >
      <el-submenu
        v-for="(item, index) in menuList"
        :key="index"
        :index="item.index"
      >
        <template slot="title" >
          <i :class="item.icon"></i>
          <span slot="title">{{ item.label }}</span>
        </template>
        <el-menu-item
          v-for="(i, j) in item.children"
          :key="j"
          :index="i.index"
          @click="changeRouter(i.name)"
        >
          <i :class="i.icon"></i>
          <span slot="title">{{ i.label }}</span>
        </el-menu-item>
      </el-submenu>
    </el-menu>
  </el-aside>
</template>
  
  <script>
// import Bus from "./bus";
export default {
  name: "Sidebar",
  data() {
    return {
      isCollapse: false,
      items: [
        {
          title: "系统首页",
          path: "/index",
          icon: "el-icon-setting",
        },
        {
          title: "echarts图表",
          path: "echarts",
          icon: "el-icon-star-on",
          subItems: [
            {
              title: "简单图表",
              path: "/chart-simple",
            },
            {
              title: "复杂图表",
              path: "/chart-complex",
            },
          ],
        },
        {
          title: "tab选项卡",
          path: "/tab",
          icon: "el-icon-message",
        },
        {
          title: "表格",
          path: "/table",
          icon: "el-icon-tickets",
        },
        {
          title: "错误页面",
          path: "/error",
          icon: "el-icon-warning",
        },
        {
          title: "404页面",
          path: "/404",
          icon: "el-icon-error",
        },
      ],
      menuList: [
        {
          label: "应急资源",
          name: "/resource",
          icon: "el-icon-eleme",
          index: "1",
          children: [
            {
              label: "资源管理",
              name: "/resource",
              index: "1 - 1",
              icon: "el-icon-s-tools",
            },
            {
              label: "资源维护",
              name: "/resourceManage",
              index: "1 - 2",
              icon: "el-icon-setting",
            },
            {
              label: "资源统计",
              name: "/resourceManage",
              index: "1 - 3",
              icon: "el-icon-star-on",
            },
          ],
        },
        {
          label: "值班管理",
          name: "/calendar",
          index: "2",
          icon: "el-icon-s-cooperation",
          children: [
            {
              label: "值排班",
              name: "/calendar",
              index: "2 - 1",
              icon: "el-icon-setting",
            },
            {
              label: "值班详情",
              name: "/calindex",
              index: "2 - 2",
              icon: "el-icon-setting",
            },
            {
              label: "值班日报",
              name: "/resourceManage",
              index: "2 - 3",
              icon: "el-icon-setting",
            },
          ],
        },
        {
          label: "接处警",
          name: "/resource",
          icon: "el-icon-setting",
          index: "3",
          children: [
            {
              label: "接处警",
              name: "/resourceManage",
              index: "3 - 1",
              icon: "el-icon-setting",
            },
          ],
        },
        {
          label: "资源优化调配",
          name: "/resource",
          index: "4",
          icon: "el-icon-setting",
          children: [
            {
              label: "资源优化调配",
              name: "/resourceManage",
              index: "4 - 1",
              icon: "el-icon-setting",
            },
          ],
        },
      ],
    };
  },
  computed: {
    onRoutes() {
      return this.$route.fullPath;
    },
  },
  created() {
    // 通过 event bus进行组件间的通信 来折叠和展开侧边栏
    // Bus.$on('collapse', isCollapse => {
    //   this.isCollapse = isCollapse;
    // });
  },
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
  
  <style scoped lang="scss">
::v-deep .el-submenu__title {
  padding-left: 40px;
  height: 56px;
  line-height: 56px;
  font-size: 14px;
  color: #303133;
  padding: 0 50px;
  list-style: none;
  cursor: pointer;
  position: relative;
  transition: border-color 0.3s, background-color 0.3s, color 0.3s;
  box-sizing: border-box;
  white-space: nowrap;
}
.el-menu {
  height: 860px;
  border: none;
  &:not(.el-menu--collapse) {
    width: 200px;
  }
  text-align: left;
}
.el-menu-item.is-active {
  border-left: 3px solid;
  background-color: #171717 !important;
}
</style>
  