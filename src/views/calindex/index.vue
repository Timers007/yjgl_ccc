<template>
<div>
    <div class="changemonth">
        <el-date-picker v-model="monthValue" type="month" value-format="yyyy-MM" format="yyyy-MM" placeholder="选择月" @change="changeMonth">
        </el-date-picker>
    </div>
    <el-calendar v-model="nowdate">
        <template slot="dateCell" slot-scope="{ date, data }">
            <div style="text-align: center; font-size: smaller">
                {{ data.day.split("-").slice(1).join("-") }}
            </div>
            <div v-if="scheduleData[data.day]">
                <template>
                    <div class="cardtable">
                        <table style="width: 100%" border="1">
                            <tr>
                                <th>时间</th>
                                <th>领导</th>
                                <th>员工</th>
                            </tr>
                            <tr v-for="item in scheduleData[data.day].content" :key="item.date" @click="changeCalendar(scheduleData[data.day], data,date)">
                                <td>{{ item.date }}</td>
                                <td>{{ item.leader }}</td>
                                <td>{{ item.people }}</td>
                            </tr>
                        </table>
                    </div>
                </template>
            </div>
        </template>
    </el-calendar>
    <el-dialog :title="dutyTitle" :visible.sync="dialogTableVisible">
        <el-table :data="gridData" stripe>
            <el-table-column property="date" label="时段" width="150"></el-table-column>
            <el-table-column property="leader" label="值班领导" width="200"></el-table-column>
            <el-table-column property="leaderphone" label="联系电话"></el-table-column>
            <el-table-column property="people" label="值班人员"></el-table-column>
            <el-table-column property="peoplephone" label="联系电话"></el-table-column>
        </el-table>
    </el-dialog>
</div>
</template>

<script>
export default {
    data() {
        return {
            value: new Date(),
            monthValue: "",
            dialogTableVisible: false,
            scheduleData: {
                "2022-12-01": {
                    content: [{
                            date: "上午",
                            leader: "王小虎",
                            people: "周华正、杨康、李雯",
                            leaderphone: '15782325656',
                            peoplephone: "15782325656"
                        },
                        {
                            date: "下午",
                            leader: "王小虎",
                            people: "周华正、杨康、李雯",
                            leaderphone: '15782325656',
                            peoplephone: "15782325656"
                        },
                    ],
                },
                "2022-12-08": {
                    content: [{
                            date: "上午",
                            leader: "王小虎",
                            people: "周华正、杨康、李雯",
                        },
                        {
                            date: "下午",
                            leader: "王小虎",
                            people: "周华正、杨康、李雯",
                        },
                        {
                            date: "晚班",
                            leader: "王小虎",
                            people: "周华正、杨康、李雯",
                        },
                    ],
                },
                "2022-12-11": {
                    content: [{
                            date: "上午",
                            leader: "王小虎",
                            people: "周华正、杨康、李雯",
                        },
                        {
                            date: "下午",
                            leader: "王小虎",
                            people: "周华正、杨康、李雯",
                        },
                    ],
                },
                "2022-12-22": {
                    content: [{
                            date: "上午",
                            leader: "王小虎",
                            people: "周华正、杨康、李雯",
                        },
                        {
                            date: "下午",
                            leader: "王小虎",
                            people: "周华正、杨康、李雯",
                        },
                    ],
                },
                "2022-12-26": {
                    content: [{
                            date: "上午",
                            leader: "王小虎",
                            people: "周华正、杨康、李雯",
                            leaderphone: '15782325656',
                            peoplephone: "15782325656"
                        },
                        {
                            date: "下午",
                            leader: "王小虎",
                            people: "周华正、杨康、李雯",
                            leaderphone: '15782325656',
                            peoplephone: "15782325656"
                        },
                    ],
                },
            },
            dutyMan: [{
                    date: "2022-12-1",
                    people: {
                        morning: ["张三", "李四"],
                        after: ["周华", "王五"],
                    },
                },
                {
                    date: "2022-12-2",
                    people: {
                        morning: ["张宇", "李雯"],
                        after: ["周强", "舒城"],
                    },
                },
                {
                    date: "2022-12-3",
                    people: {
                        morning: ["卫哲", "蔡依林"],
                        after: ["胡本华", "刘思强"],
                    },
                },
                {
                    date: "2022-12-23",
                    people: {
                        morning: ["吴磊", "王毅"],
                        after: ["陈华", "刘思"],
                    },
                },
            ],
            nowdate: new Date(),
            tableData: [{
                    date: "上午",
                    leader: "王小虎",
                    people: "周华正、杨康、李雯",
                    leaderphone: '15782325656',
                    peoplephone: "15782325656"
            },
                {
                    date: "下午",
                    leader: "王小虎",
                    people: "周华正、杨康、李雯",

                },
            ],
            gridData: [],
        };
    },
    watch: {
        nowdate(val) {
            this.monthValue = val;
        },
    },
    computed: {},
    methods: {
        handleItemClick(e) {
            console.log(e);
        },
        changeMonth() {
            this.nowdate = new Date(this.monthValue);
        },
        changeCalendar(item, data) {
            console.log(item, data);
            this.dutyTitle = data.day.split("-").slice(1).join("-") + '值班详情'
            this.dialogTableVisible = true;
            this.gridData = item.content
        },
    },
};
</script>

<style lang="scss" scoped>
.cardtable {
    width: 100%;
    //   height: 100px;
    text-align: center;
    font-size: xx-small;
}

.changemonth {
    position: absolute;
    right: 42%;
    margin: 6px;
}

::v-deep .el-calendar-table__row {
    height: 120px;
}

::v-deep .el-calendar-table .el-calendar-day {
    height: 120px;
}

::v-deep .el-calendar__body {
    padding: 2px 20px 5px;
}

::v-deep .el-calendar-table thead th:before {
    content: "星期";
}
</style>
