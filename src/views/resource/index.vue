<template>
  <div class="resource_main">
    <div class="left_tree">
      <el-row :gutter="20">
        <el-col :span="12">
          <div class="transfer-box">
            <div class="transfer-box-header">
              <el-checkbox @change="getLeftValue" v-model="leftCheck"
                ><b>可分配的功能资源789789</b></el-checkbox
              >
              <div style="float: right; margin-right: 10px">
                <el-button type="success" size="small" @click="add"
                  >添加<i class="el-icon-arrow-right el-icon--right"></i
                ></el-button>
              </div>
            </div>
            <div class="transfer-box-content">
              <el-tree
                :data="data"
                show-checkbox
                node-key="id"
                ref="tree"
                :expand-on-click-node="false"
                :props="defaultProps"
              >
              </el-tree>
            </div>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="transfer-box">
            <div class="transfer-box-header">
              <el-checkbox @change="getRightValue" v-model="rightCheck"
                ><b>已选择的功能资源</b></el-checkbox
              >
              <div style="float: right; margin-right: 10px">
                <el-button
                  type="success"
                  icon="el-icon-arrow-left"
                  size="small"
                  @click="del"
                  >移除</el-button
                >
              </div>
            </div>
            <div class="transfer-box-content">
              <el-tree
                :data="targetData"
                show-checkbox
                node-key="id"
                :expand-on-click-node="false"
                default-expand-all
                :props="defaultProps"
                ref="treeRight"
                @node-click="nodeClick"
                @check-change="handleCheckChange"
              >
              </el-tree>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="right_map">
        <mapCesium />
    </div>
  </div>
</template>

<script>
function recursion(obj, cb) {
  if (Array.isArray(obj) && obj.length > 0) {
    for (const item of obj) {
      if (item.children) recursion(item.children, cb);
      typeof cb == "function" && cb(obj, item);
    }
  }
}
import axios from "axios";
import mapCesium  from "../map_cesium/index.vue";
export default {
  data() {
    return {
      perId: "",
      btnLoading: false,
      selectedResRows: [],
      leftCheck: "",
      rightCheck: "",
      data: [],
      defaultProps: {
        children: "children", //子集
        label: "label", //显示的文本
      },
      targetData: [],
      getNodeId: [], //初始化时获取所有勾选的id
      treedata: [],
    };
  },
  components:{
    mapCesium
  },
  created() {
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
            this.treedata = arrtree;
            this.data = arrtree;
          } else {
            Message.warning("请求失败，请重试！");
          }
        })
        .catch((err) => {
          Message.error("网络错误！");
        });
    },
    getLeftValue(val) {
      console.log(val);
      if (val) {
        this.$refs.tree.setCheckedNodes(this.data);
      } else {
        this.$refs.tree.setCheckedKeys([]);
      }
    },
    getRightValue(val) {
      if (val) {
        this.$refs.treeRight.setCheckedNodes(this.targetData);
      } else {
        this.$refs.treeRight.setCheckedKeys([]);
      }
    },
    getTop() {
      let param = {
        perId: this.perId,
      };
      this.$api.per
        .getPerDetail(param)
        .then((res) => {
          if (res.data.code == "0") {
            this.topInfo = res.data.data;
            this.getAllResTreeList(this.topInfo.mdcKey);
          }
        })
        .catch((error) => {});
    },
    //获取所有菜单信息
    getAllResTreeList(mdcKey) {
      this.$api.resource
        .selectMenuTreeByMdcKey({
          mdcKey: mdcKey,
        })
        .then((res) => {
          if (res.data.code == "0") {
            this.data = res.data.data;
            this.getPerBindResList();
          } else {
            this.$message({
              type: "error",
              message: res.data.msg,
            });
          }
        });
    },
    add() {
      let selectedKeysLeft = this.$refs.tree.getCheckedKeys(); //获取勾选的，不包含父级id
      let selectedNodesLeft = this.$refs.tree.getCheckedNodes(false, true); //获取所有勾选的node
      if (selectedKeysLeft.length > 0) {
        //复制选择的元素
        this.handleData(
          selectedKeysLeft,
          selectedNodesLeft,
          this.targetData,
          this.data
        );
        //重置选择
        this.$refs.tree.setCheckedKeys([]);
        this.leftCheck = false;
        this.rightCheck = false;
      } else {
        this.$message.info("请先勾选数据");
      }
    },
    // del() {
    //     this.targetData = [];
    // },
    del() {
      let selectedKeysRight = this.$refs.treeRight.getCheckedKeys(); //获取勾选的，不包含父级id
      let selectedNodesRight = this.$refs.treeRight.getCheckedNodes(
        false,
        true
      ); //获取所有勾选的node
      if (selectedKeysRight.length > 0) {
        this.handledeleteData(
          selectedKeysRight,
          selectedNodesRight,
          this.data,
          this.targetData
        );
        //重置选择
        this.$refs.treeRight.setCheckedKeys([]);
        this.rightCheck = false;
        this.leftCheck = false;
      } else {
        this.$message.info("请先勾选数据");
      }
    },
    /**
         *selectedKeys参数为勾选的id，不包含半勾选
         selectedNodes参数为获取所有勾选的node
         targetData参数为操作后获得的结果数据
         data参数为需要操作勾选的源数据 **/
    handleData(selectedKeys, selectedNodes, targetData, data) {
      selectedNodes.forEach((nodes) => {
        let parentNode;
        recursion(targetData, function (obj, item) {
          //寻找要插入的元素的父节点是否存在
          if (nodes.parentId == item.id) parentNode = item;
        });
        //初始化要插入的节点数据
        let nodeObj = {
          id: nodes.id,
          label: nodes.label,
          parentId: nodes.parentId,
        };
        nodes.parentId && (nodeObj.nodeObj = nodes.parentId);
        nodes.children && (nodeObj.children = []);
        //如果找到父节点,那么代表是子节点，没有找到那么就是一级节点。
        if (parentNode) {
          //判断父节点是否已经存在这个节点。如果不存在就插入
          if (!parentNode.children.find((item) => item.id == nodes.id))
            parentNode.children.push(nodeObj);
        } else {
          //一级节点需要在顶层数组里插入
          if (!targetData.find((item) => item.id == nodes.id))
            targetData.push(nodeObj);
        }
      });
      //删除选中的元素
      // recursion(data, function (obj, item) {
      //     selectedKeys.forEach((delItem) => {
      //         //找到选中的元素删除
      //         let index = obj.findIndex((findItem) => {
      //             return delItem == findItem.id;
      //         });
      //         index > -1 && obj.splice(index, 1);

      //     });
      // });
    },
    handledeleteData(selectedKeys, selectedNodes, targetData, data) {
      //删除选中的元素
      recursion(data, function (obj, item) {
        selectedKeys.forEach((delItem) => {
          //找到选中的元素删除
          let index = obj.findIndex((findItem) => {
            return delItem == findItem.id;
          });
          index > -1 && obj.splice(index, 1);
        });
      });
    },
    nodeClick(A, B, C) {
      console.log(A, B, C);
    },
    handleCheckChange(A, B, C) {
      console.log(A, B, C);
    },
  },
};
</script>

<style lang="scss" scoped>
.resource_main{
    display: flex;
}
.left_tree{
    width: 30%;
    margin-right: 20px;
}
.right_map{
    width: 70%;
}
.transfer-box-header {
    height: 40px;
    display: flex;
    align-items: center;
//   margin-bottom: 20px;
}
::v-deep .el-tree {
  overflow: auto;
  max-height: 800px;
}
::v-deep .el-checkbox:last-of-type {
    margin-right: 20px;
}
</style>
