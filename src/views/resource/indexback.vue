<template>
  <div class="treest">
    <div class="left">
      <!-- <el-tabs type="border-card" class="tabs">
        <el-tab-pane v-for="(item, index) in tabs_list" :key="index">
          <span slot="label" >
            
            {{ item.label }}</span
          >
          {{ item.label }}
        </el-tab-pane>
      </el-tabs> -->

      <el-tree
        :data="treedata"
        show-checkbox
        node-key="id"
        
        :props="defaultProps"
        @check-change="handleCheckChange"
      >
      </el-tree>
    </div>
    <el-button @click="getTree">生成</el-button>
    <div class="right">
      <el-tree
        :data="newtreedata"
        show-checkbox
        node-key="id"
        :props="defaultProps"
      >
      </el-tree>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      data: [
        {
          id: 1,
          label: "一级 1",
          children: [
            {
              id: 4,
              label: "二级 1-1",
              children: [
                {
                  id: 9,
                  label: "三级 1-1-1",
                },
                {
                  id: 10,
                  label: "三级 1-1-2",
                },
              ],
            },
          ],
        },
        {
          id: 2,
          label: "一级 2",
          children: [
            {
              id: 5,
              label: "二级 2-1",
            },
            {
              id: 6,
              label: "二级 2-2",
            },
          ],
        },
        {
          id: 3,
          label: "一级 3",
          children: [
            {
              id: 7,
              label: "二级 3-1",
            },
            {
              id: 8,
              label: "二级 3-2",
            },
          ],
        },
      ],
      defaultProps: {
        children: "children",
        label: "label",
      },
      tabs_list: [
        {
          label: "应急资源",
          value: "应急资源",
        },
        {
          label: "危险品",
          value: "危险品",
        },
        {
          label: "地图资源",
          value: "地图资源",
        },
        {
          label: "物资保障",
          value: "物资保障",
        },
        {
          label: "物资保障",
          value: "物资保障",
        },
        {
          label: "物资保障",
          value: "物资保障",
        },
      ],
      treedata: [],
      newtreedata: [],
    };
  },
  mounted() {
    this.getdata();
  },
  methods: {
    getdata() {
      axios({
        method: "get",
        url: "http://120.46.153.149:8087/resourcesmanager/sysResourcesTypeInfo",
        params: {},
      })
        .then((res) => {
          console.log(res.data.data);
          if (res.data.code === 20000) {
            let arrtree = res.data.data;
            // let newarr = [];
            // arrtree.map((item) => {
            //   if (item.label != "综合态势" && item.label != "危险源") {
            //     newarr.push(item);
            //   }
            // });
            // console.log(newarr);
            this.treedata = arrtree;
          } else {
            Message.warning("请求失败，请重试！");
          }
        })
        .catch((err) => {
          Message.error("网络错误！");
        });
    },
    handleCheckChange(data, checked, indeterminate) {
      console.log(data, checked, indeterminate);
      if (checked) {
        this.newtreedata.push(...this.walkTreeData(this.treedata, data.id));
      }
      
    },
    getTree() {},
    /**
     * 递归计算选中的节点
     */
    walkTreeData(nodes, selectedKeys) {
      const ret = [];
      nodes.forEach((node) => {
        const newNode = { ...node };
        // delete newNode.children;
        node.children &&
          (newNode.children = this.walkTreeData(node.children, selectedKeys));
        if (
          selectedKeys.includes(newNode.id) ||
          (newNode.children && newNode.children.length)
        ) {
          ret.push(newNode);
        }
      });
      return ret;
    },
  },
};
</script>
<style lang="scss" scoped>
.treest {
  display: flex;
  padding: 10px;
}
.left {
  width: 400px;
  height: 100%;
}
.right {
  width: 400px;
  height: 100%;
  margin-left: 20px;
}
.tabs {
}

::v-deep .el-tabs__item {
  padding: 0 10px;
  width: 90px;
}
</style>