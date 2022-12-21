<template>
<div>
    <el-row class="header_search">
        <el-col :span="12">
            <div class="demo-input-suffix">
                <div style="width:200px;height: 20px;">属性方式：</div>
                <el-input placeholder="请输入搜索条件" style="width:300px" v-model="input1">
                </el-input>
            </div>
        </el-col>
        <el-col :span="12">
            <div class="grid-content bg-purple-light">属性方式：</div>
        </el-col>
    </el-row>
    <el-row class="body_content" :gutter="20">
        <!-- <el-col :span="4">
            <div class="grid-content bg-purple">
                <el-tree :data="data" show-checkbox node-key="id" :default-expanded-keys="[2, 3]" :default-checked-keys="[5]" :props="defaultProps">
                </el-tree>
            </div>
        </el-col> -->
        <el-col :span="24">
            <div class="grid-content bg-purple-light">
                <el-table :data="tableData" style="width: 100%">
                    <el-table-column prop="date" label="日期" width="180">
                    </el-table-column>
                    <el-table-column prop="name" label="姓名" width="180">
                    </el-table-column>
                    <el-table-column prop="address" label="地址">
                    </el-table-column>
                </el-table>
            </div>
        </el-col>

    </el-row>
</div>
</template>

<script>
export default {
    data() {
        return {
            input1: "",
            data: [{
                id: 1,
                label: '一级 1',
                children: [{
                    id: 4,
                    label: '二级 1-1',
                    children: [{
                        id: 9,
                        label: '三级 1-1-1'
                    }, {
                        id: 10,
                        label: '三级 1-1-2'
                    }]
                }]
            }, {
                id: 2,
                label: '一级 2',
                children: [{
                    id: 5,
                    label: '二级 2-1'
                }, {
                    id: 6,
                    label: '二级 2-2'
                }]
            }, {
                id: 3,
                label: '一级 3',
                children: [{
                    id: 7,
                    label: '二级 3-1'
                }, {
                    id: 8,
                    label: '二级 3-2'
                }]
            }],
            defaultProps: {
                children: 'children',
                label: 'label'
            },
            tableData: [{
                date: '2016-05-02',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
            }, {
                date: '2016-05-04',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1517 弄'
            }, {
                date: '2016-05-01',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1519 弄'
            }, {
                date: '2016-05-03',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1516 弄'
            }]
        }
    }
};
</script>

<style lang="scss" scoped>
.header_search {
    height: 100px;
}

.body_content {
    height: 700px;
}

.demo-input-suffix {
    display: flex;
}
</style>
