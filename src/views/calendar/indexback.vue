<template>
  <div class="calendarMain">
    <div>
      <el-radio-group v-model="radio">
        <el-radio :label="1">单周</el-radio>
        <el-radio :label="2">单班</el-radio>
        <el-radio :label="3">双班</el-radio>
        <el-radio :label="4">三班</el-radio>
      </el-radio-group>
    </div>
    <el-card class="box-card">
      <!-- 操作栏 -->
      <el-row type="flex" justify="space-around" class="header_row">
        <el-col :span="12">
          <!-- 月份选择器 -->
          <MonthPicker @changeMonth="changeMonth"></MonthPicker>
        </el-col>
        <el-col :span="12">
          <el-button type="success" size="small" @click="changestatus">编辑排班</el-button>
        </el-col>
      </el-row>
      <!-- 日历栏 -->
      <el-row class="calendar-con">
        <Calendar :time="time" :radio="radio" :status="status"></Calendar>
      </el-row>
    </el-card>
  </div>
</template>

<script>
// 月份选择器
import MonthPicker from "./MonthPicker";
// 日历组件
import Calendar from "./Calendar";
export default {
  components: {
    Calendar,
    MonthPicker,
  },
  data() {
    return {
      radio: 3,
      status: false,
      time: {
        year: new Date().getFullYear(),
        month: new Date().getMonth(),
      },
    };
  },
  created() {},
  methods: {
    // 修改月份
    changeMonth(time) {
      console.log("time", time);
      this.time = time;
    },
    changestatus() {
      this.status = !this.status;
    },
  },
};
</script>

<style lang="scss" scoped>

::v-deep .el-button--success {
    color: #FFFFFF;
    background-color: #91a089;
    border-color: #595a59;
}


.calendarMain {
  width: 100%;
  height: 100%;
  .box-card {
    width: 99%;
    height: 98%;
  }
}
.calendar-con {
  // margin-top: 50px;
}
.header_row {
  height: 50px;
  display: flex;
  align-items: center;
}
</style>
