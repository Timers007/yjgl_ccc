<template>
  <div>
    <el-row>
      <!-- 左侧，提示早班、晚班或者上午、下午 -->
      <el-col :span="2">
        <div class="date-con tip-con">
          <el-col
            v-for="item in 5"
            :key="item"
            class="date thisMonth tip"
            :span="1"
          >
            <div class="morning">早班</div>
            <div class="evening">晚班</div>
          </el-col>
        </div>
      </el-col>
      <!-- 右侧，周一到周五具体内容 -->
      <el-col :span="22">
        <!-- 第一行表头，周一到周日 -->
        <div class="top-con">
          <div class="top" v-for="item in top" :key="item">星期{{ item }}</div>
        </div>
        <!-- 日历号 -->
        <div class="date-con">
          <div
            class="date"
            :class="[item.thisMonth, item.isToday, item.afterToday]"
            v-for="(item, index) in visibleCalendar"
            :key="index"
          >
            <div>{{ item.day }}</div>
            <div class="onejob" v-if="radio === 2">
              <div class="morning" v-if="item.data">
                {{ item.data.allday.toString() }}
              </div>
              <div class="morning" v-else></div>
            </div>
            <div class="doublejob" v-if="radio === 3">
              <div class="morning" v-if="item.data">
                {{ item.data.morning.toString() }}
                <span
                  class="spanstle"
                  v-if="item.afterToday === 'afterToday' && status"
                  >选择</span
                >
              </div>
              <div class="morning" v-else></div>
              <div class="evening" v-if="item.data">
                {{ item.data.after.toString() }}
                <span
                  class="spanstle"
                  v-if="item.afterToday === 'afterToday' && status"
                  >选择</span
                >
              </div>
              <div class="evening" v-else></div>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
  
  <script>
// import utils from './utils.js'
export default {
  props: {
    time: {
      type: Object,
      default: () => {
        return {};
      },
    },
    radio: {
      type: Number,
      default: () => {
        return {};
      },
    },
    status: {
      type: Boolean,
      default: () => {
        return {};
      },
    },
  },
  data() {
    return {
      top: ["一", "二", "三", "四", "五", "六", "日"],
      dutyMan: [
        {
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
    };
  },
  created() {
    console.log("123", this.time);
  },
  methods: {
    // 获取
  },
  computed: {
    // 获取当前月份显示日历,共42天
    visibleCalendar: function () {
      // 获取今天的年月日
      const today = new Date();
      today.setHours(0);
      today.setMinutes(0);
      today.setSeconds(0);
      today.setMilliseconds(0);
      const valueEnumBase = this.dutyMan.reduce(
        (p, c) => Object.assign(p, { [c.date]: c.people }),
        {}
      );
      console.log(valueEnumBase);
      const calendarArr = [];
      // 获取当前月份第一天
      const currentFirstDay = new Date(this.time.year, this.time.month, 1);
      // 获取第一天是周几，注意周日的时候getDay()返回的是0，要做特殊处理
      const weekDay =
        currentFirstDay.getDay() === 0 ? 7 : currentFirstDay.getDay();
      // 用当前月份第一天减去周几前面几天，就是看见的日历的第一天
      const startDay = currentFirstDay - (weekDay - 1) * 24 * 3600 * 1000;
      // 我们统一用35天来显示当前显示日历
      for (let i = 0; i < 35; i++) {
        const date = new Date(startDay + i * 24 * 3600 * 1000);
        const currentday =
          date.getFullYear() +
          "-" +
          (date.getMonth() + 1) +
          "-" +
          date.getDate();
        // if(currentday === valueEnumBase[currentday]){}
        calendarArr.push({
          date: new Date(startDay + i * 24 * 3600 * 1000),
          year: date.getFullYear(),
          month: date.getMonth() + 1,
          day: date.getDate(),
          // 是否在当月
          thisMonth:
            date.getFullYear() === today.getFullYear() &&
            date.getMonth() === today.getMonth()
              ? "thisMonth"
              : "",
          // 是否是今天
          isToday:
            date.getFullYear() === today.getFullYear() &&
            date.getMonth() === today.getMonth() &&
            date.getDate() === today.getDate()
              ? "isToday"
              : "",
          // 是否在今天之后
          afterToday: date.getTime() >= today.getTime() ? "afterToday" : "",
          data: valueEnumBase[currentday],
          currentday:
            date.getFullYear() +
            "-" +
            (date.getMonth() + 1) +
            "-" +
            date.getDate(),
        });
      }
      console.log(calendarArr, "calendarArr");
      return calendarArr;
    },
  },
};
</script>
  <style lang="scss" scoped>
.morning {
  height: 21px;
}
.evening {
  height: 21px;
}
.spanstle {
  background-color: coral;
  cursor: pointer;
}
.doublejob {
  height: 82px;
}
.onejob {
  height: 82px;
}
.top-con {
  display: flex;
  align-items: center;
  // height: 35px;
  .top {
    width: 13.285%;
    // background-color: rgb(242, 242, 242);
    background-color: rgb(47 119 147 / 47%);
    padding: 10px 0;
    margin: 5px;
    text-align: center;
  }
}
.date-con {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  .date {
    width: 12.285%;
    // width: calc((100% - 10px) / 8);
    text-align: center;
    padding: 5px;
    .morning {
      padding: 10px 0;
      background-color: rgb(179 192 209 / 52%);
    }
    .evening {
      padding: 10px 0;
      background-color: rgb(113 118 110 / 30%);
    }
  }
  .thisMonth {
    .morning {
      background-color: rgb(79 119 143 / 72%);
    }
    .evening {
      background-color: rgb(150 202 211 / 65%);
    }
  }
  .isToday {
    font-weight: 700;
    .morning {
      background-color: rgb(84 121 143);
    }
    .evening {
      background-color: rgb(113 180 193);
    }
  }
}
.tip-con {
  margin-top: 52px;
  .tip {
    margin-top: 18px;
    width: 100%;
  }
}
</style>
  
  