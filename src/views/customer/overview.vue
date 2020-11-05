<template>
  <div class="ml16" style="width: 100%">
    <el-tabs v-model="selectedTab" type="card">
      <el-tab-pane label="客户分析" name="first"></el-tab-pane>
    </el-tabs>
    <el-row class="mb10">
      <el-col :span="24">
        <el-date-picker
          v-model="selectedDatePicker"
          type="daterange"
          align="right"
          size="small"
          unlink-panels
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          @change="changeTime"
          :picker-options="pickerOptions"
        ></el-date-picker>
        <!--<el-button class="ml16" :type="picker === 1 ? 'primary' : 'default'" round @click="setTimePicker(1)">昨天
        </el-button>
        <el-button class="ml16" :type="picker === 7 ? 'primary' : 'default'" round @click="setTimePicker(7)">7天
        </el-button>
        <el-button class="ml16" :type="picker === 30 ? 'primary' : 'default'" round @click="setTimePicker(30)">30天
        </el-button>-->
      </el-col>
    </el-row>
    <el-row class="mb10">
      <el-col class="panel-title">总概览</el-col>
    </el-row>
    <el-row class="mb16" type="flex" justify="space-between">
      <el-col :span="9" class="overview-sum">
        <el-col :span="12" class="overview-sum-item">
          <div class="value-row">1000</div>
          <div class="info-row">总客户数</div>
        </el-col>
        <el-col :span="12" class="overview-sum-item">
          <div class="value-row">234</div>
          <div class="info-row">总流失数</div>
        </el-col>
        <el-col :span="12" class="overview-sum-item">
          <div class="value-row">167</div>
          <div class="info-row">总聊天量</div>
        </el-col>
        <el-col :span="12" class="overview-sum-item">
          <div class="value-row">19:45</div>
          <div class="info-row">平均回复时长</div>
        </el-col>
      </el-col>
      <el-col :span="14" class="overview-chart">
        <line-chart :series="lineDataOverview" class="chart-container"></line-chart>
      </el-col>
    </el-row>

    <el-row class="mb10">
      <el-col class="panel-title">客户指标</el-col>
    </el-row>

    <el-row class="mb16" type="flex" justify="space-between">
      <el-col :span="5" class="overview-field">
        <div @click="changeField('new')">
          <div class="header new-field">新增客户</div>
          <div class="content">
            <el-row class="value-row">
              <el-col :span="10">125</el-col>
              <el-col :span="14">1000</el-col>
            </el-row>
            <el-row class="unit-row">
              <el-col :span="10">发起申请</el-col>
              <el-col :span="14">新增客户数</el-col>
            </el-row>
          </div>
        </div>

      </el-col>
      <el-col :span="5" class="overview-field">
        <div @click="changeField('loose')">
          <div class="header loose-field">流失客户</div>
          <div class="content">
            <el-row class="value-row">
              <el-col :span="24">23</el-col>
            </el-row>
            <el-row class="unit-row">
              <el-col :span="24">被拉黑或删除的客户</el-col>
            </el-row>
          </div>
        </div>

      </el-col>
      <el-col :span="5" class="overview-field">
        <div @click="changeField('chat')">
          <div class="header chat-field">与客户聊天</div>
          <div class="content">
            <el-row class="value-row">
              <el-col :span="8">100</el-col>
              <el-col :span="8">30</el-col>
              <el-col :span="8">23%</el-col>
            </el-row>
            <el-row class="unit-row">
              <el-col :span="8">聊天总数</el-col>
              <el-col :span="8">回复消息数</el-col>
              <el-col :span="8">占比</el-col>
            </el-row>
          </div>
        </div>

      </el-col>
      <el-col :span="5" class="overview-field">
        <div @click="changeField('avg_time')">
          <div class="header avg-time-field">平均首次回复时长</div>
          <div class="content">
            <el-row class="value-row">
              <el-col :span="24">10:25</el-col>
            </el-row>
            <el-row class="unit-row">
              <el-col :span="24">平均首次回复时长</el-col>
            </el-row>
          </div>
        </div>

      </el-col>
    </el-row>

    <div class="field-chart">
      <line-chart :series="lineData" :target-field="selectedField" class="chart-container"
                  v-show="selectedField === 'new'"></line-chart>
      <line-chart :series="lineData1" :target-field="selectedField" class="chart-container" v-show="selectedField === 'loose'"></line-chart>
      <line-chart :series="lineData2"  :target-field="selectedField" class="chart-container"
                 v-show="selectedField === 'chat'"></line-chart>
      <bar-chart :series="pieData" :target-field="selectedField" :config="pieConfig" class="pie-container"
                 v-show="selectedField === 'avg_time'"></bar-chart>
    </div>
  </div>
</template>
<script>
import PieChart from '@/components/pieChart'
import LineChart from '@/components/lineChart'
import BarChart from '@/components/barChart'

export default {
  name: 'echart',
  components: {
    LineChart,
    BarChart
  },
  data() {
    return {
      selectedTab:'first',
      selectedDatePicker: [new Date().getTime() - 86400000, new Date()],
      picker: 1,
      pickerOptions: {
        shortcuts: [
          {
            text: '昨天',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '最近一周',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
              picker.$emit('pick', [start, end])
            }
          }
        ]
      },
      chartBaseOptions: [
        {title: 'title', name: '标题'},
        {title: 'textStyle', name: '字体样式'},
        {title: 'legend', name: '图例'},
        {title: 'grid', name: '网格'},
        {title: 'tooltip', name: '悬浮提示框'}
      ],
      chartTypeOptions: [],
      pieData: [
        {name: 'ruoweng', value: 100},
        {name: 'hongyu', value: 80},
        {name: 'tengteng', value: 100},
        {name: 'haohe', value: 200},
        {name: 'malong', value: 100}
      ],
      pieConfig: {
        showTitle: true,
        title: 'biaoti',
        grid: {
          left: 40,
          right: 5,
          bottom: 20,
          borderWidth: 0,
          x: '10%',
          y: '5%'
        },
        showArea: false
      },
      lineDataOverview: [
        {
          name: '新增客户',
          type: 'line',
          smooth: true,
          data: [
            {date:'08/10', value:20},
            {date:'08/11', value:30},
            {date:'08/12', value:40},
            {date:'08/13', value:55},
            {date:'08/14', value:30},
            {date:'08/15', value:70},
            {date:'08/16', value:80}
            ]
        },{
          name: '流失客户',
          type: 'line',
          color: '#84e4c7',
          smooth: true,
          data: [
            {date:'08/10', value:90},
            {date:'08/11', value:20},
            {date:'08/12', value:30},
            {date:'08/13', value:45},
            {date:'08/14', value:50},
            {date:'08/15', value:10},
            {date:'08/16', value:10}
            ]
        }
      ],
      lineData: [
        {
          name: '新增客户',
          type: 'line',
          smooth: true,
          color: '#FFC531',
          data: [
            {date:'08/10', value:20},
            {date:'08/11', value:30},
            {date:'08/12', value:40},
            {date:'08/13', value:55},
            {date:'08/14', value:30},
            {date:'08/15', value:70},
            {date:'08/16', value:80}
            ]
        },{
          name: '发起申请数',
          type: 'bar',
          smooth: true,
          color: '#5F82F5',
          areaStyle:{
            color:{
              type:'linear',
              x: 0,
              y: 1,
              x2: 0,
              y2: 0,
              colorStops: [{
                offset: 0, color: '#FFFFFF' // 0% 处的颜色
              }, {
                offset: 1, color: '#5F82F5' // 100% 处的颜色
              }]
            }
          },
          data: [
            {date:'08/10', value:50},
            {date:'08/11', value:60},
            {date:'08/12', value:70},
            {date:'08/13', value:55},
            {date:'08/14', value:30},
            {date:'08/15', value:70},
            {date:'08/16', value:10}
            ]
        }
      ],
      lineData1: [
        {
          name: '流失客户',
          type: 'line',
          smooth: true,
          color: '#FFC531',
          areaStyle:{
            color:{
              type:'linear',
              x: 0,
              y: 1,
              x2: 0,
              y2: 0,
              colorStops: [{
                offset: 0, color: '#FFFFFF' // 0% 处的颜色
              }, {
                offset: 1, color: '#FFC531' // 100% 处的颜色
              }]
            }
          },
          data: [
            {date:'08/10', value:20},
            {date:'08/11', value:30},
            {date:'08/12', value:40},
            {date:'08/13', value:55},
            {date:'08/14', value:30},
            {date:'08/15', value:70},
            {date:'08/16', value:80}
          ]
        }
      ],
      lineData2: [
        {
          name: '与客户聊天数',
          type: 'line',
          smooth: true,
          color: '#FF828C',
          areaStyle:{
            color:{
              type:'linear',
              x: 0,
              y: 1,
              x2: 0,
              y2: 0,
              colorStops: [{
                offset: 0, color: '#FFFFFF' // 0% 处的颜色
              }, {
                offset: 1, color: '#FF828C' // 100% 处的颜色
              }]
            }
          },
          data: [
            {date:'08/10', value:20},
            {date:'08/11', value:30},
            {date:'08/12', value:40},
            {date:'08/13', value:55},
            {date:'08/14', value:30},
            {date:'08/15', value:70},
            {date:'08/16', value:80}
          ]
        }
      ],
      inversionBarData: [
        {name: 'ruoweng', value: 100},
        {name: 'haohe', value: 1200},
        {name: 'zhiwei', value: 2200},
        {name: 'hongyu', value: 3200},
        {name: 'pengxu', value: 2400},
        {name: 'malong', value: 5200}
      ],
      inversionBarConfig: {},
      selectedField: 'new'
    }
  },
  methods: {
    init() {
    },
    changeField(field) {
      this.selectedField = field
    },
    setTimePicker(val) {
      let end = new Date()
      let start = new Date().getTime() - val * 86400000
      this.selectedDatePicker = [start, end]
    },
    changeTime(data){
      console.log(data)
    }
  },
  mounted() {
  }
}
</script>
<style lang="less" scoped>
.pie-container {
  display: block;
  width: 800px;
  height: 423px;
  overflow: hidden;
  margin: auto;
}

.line-container {
  display: block;
  width: 100%;
  height: 500px;
  overflow: hidden;
}

.bar-container {
  display: block;
  width: 100%;
  height: 540px;
  overflow: hidden;
  border: 1px solid #0c8032;
}

.container {
  display: block;
  width: 100%;
  height: 200px;
  border: 1px solid #e4e4e4;
}

.chart-container {
  display: block;
  width: 100%;
  height: 424px;
  padding: 14px 14px;
}

.panel-title {
  font-size: 16px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(25, 36, 58, 1);
  line-height: 22px;
}

.overview-sum {
  height: 320px;
  background: rgba(255, 255, 255, 1);
  border-radius: 15px;

  .overview-sum-item {
    height: 160px;
    padding: 40px 14px;
    text-align: center;

    .value-row {
      font-size: 24px;
      font-family: DINAlternate-Bold, DINAlternate;
      font-weight: bold;
      color: rgba(95, 130, 245, 1);
      line-height: 28px;
      margin-bottom: 16px;
    }

    .info-row {
      font-size: 14px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: rgba(119, 119, 119, 1);
      line-height: 20px;
    }
  }
}

.overview-chart {
  height: 320px;
  background: rgba(255, 255, 255, 1);
  border-radius: 15px;
}

.overview-field {
  background: rgba(255, 255, 255, 1);
  border-radius: 15px;

  .header {
    height: 20px;
    font-size: 14px;
    border-radius: 10px 10px 0px 0px;
    color: #ffffff;
    padding: 16px 14px
  }

  .content {
    height: 60px;
    background: rgba(255, 255, 255, 1);
    border-radius: 15px;
    padding: 12px 14px;

    .value-row {
      font-size: 18px;
      font-family: DINAlternate-Bold, DINAlternate;
      font-weight: bold;
      color: rgba(19, 19, 19, 1);
      line-height: 21px;
      text-align: center;
      margin-bottom: 10px;
    }

    .unit-row {
      font-size: 12px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: rgba(144, 146, 153, 1);
      line-height: 17px;
      text-align: center;
    }
  }
}

.new-field {
  background: rgba(95, 130, 245, 1);
}

.loose-field {
  background: rgba(255, 197, 49, 1);
}

.chat-field {
  background: rgba(255, 130, 140, 1);
}

.avg-time-field {
  background: rgba(190, 162, 218, 1);
}

.field-chart {
  width: 100%;
  height: 424px;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.03);
  border: 1px solid rgba(95, 130, 245, 1);
}
</style>
