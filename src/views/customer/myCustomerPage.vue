<template>
  <div>

    <div class="filter-container mb10">
      <el-row>

        <el-col :span="24">
<!--          <mg-select-->
<!--            size="mini"-->
<!--            placeholder="标签"-->
<!--            v-model="selectedTag"-->
<!--            :source="tagList"-->
<!--          />-->
<!--          <mg-select-->
<!--            class="ml10"-->
<!--            size="mini"-->
<!--            placeholder="客户归属"-->
<!--            v-model="selectedCompany"-->
<!--            :source="companyList"-->
<!--          />-->
<!--          <mg-select-->
<!--            class="ml10"-->
<!--            size="mini"-->
<!--            placeholder="跟进状态"-->
<!--            v-model="selectedStatus"-->
<!--            :source="statusList"-->
<!--          />-->
<!--          <el-input v-model="keyword"-->
<!--                    class="ml10"-->
<!--                    placeholder="搜索客户"-->
<!--                    style="width: 200px;"-->
<!--                    @change="onSearch"></el-input>-->
<!--          <el-button class="ml10"-->
<!--                     type="text"-->
<!--                     @click="isMore = !isMore">{{!isMore ? '更多搜索条件' : '收起更多搜索'}}-->
<!--          </el-button>-->
<!--          <el-button class="ml10"-->
<!--                     type="primary"-->
<!--                     @click="onReset">重置-->
<!--          </el-button>-->

          <el-button class="pull-right"
                     @click="exportTable"
                     type="text">导出
          </el-button>
        </el-col>
        <el-col :span="24"
                v-if="isMore">

        </el-col>
      </el-row>
    </div>
    <div class="content-container mb10">
      <el-table :data="tableData" border size="small" @selection-change="changeSelection" @row-click="editCustom">
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column prop="name" label="昵称"></el-table-column>
        <el-table-column prop="remark" label="备注名"></el-table-column>
        <el-table-column prop="latest_follow_time" label="上次跟进"></el-table-column>
        <el-table-column prop="follow_status" label="跟进状态"></el-table-column>
        <el-table-column prop="wx_type" label="类型"></el-table-column>
        <el-table-column label="标签">
          <template slot-scope="scope">
            <el-button type="default" size="mini" class="ml5 mb5" v-for="item in scope.row.tags" :key="item">{{item }}</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="mobile_phone" label="手机号"></el-table-column>
        <el-table-column prop="add_time" label="添加时间"></el-table-column>
        <el-table-column
          align="center"
          label="操作"
          width="70px">
          <template slot-scope="scope">
           <!-- <i
              class="icon el-icon-s-promotion mr16"
              @click="onEdit(scope.row)"
            />-->
            <i
              class="icon el-icon-view"
              @click="editCustom(scope.row)"
            />
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="footer">
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="10"
        layout="total, sizes, prev, pager, next, jumper"
        :total="tableTotal">
      </el-pagination>
    </div>
  </div>
</template>

<script>

  import bus from "@/util/bus.js"
  import axios from 'axios'
  import moment from 'moment'

  import { getCustomerList } from '../../common/api'

  const Columns = [
    { label: '昵称', field: 'name', layout: 'Text' },
    { label: '备注名', field: 'remark', layout: 'Text' },
    { label: '上次跟进', field: 'update_at', layout: 'Text' },
    { label: '跟进状态', field: 'follow_status', layout: 'Text' },
    { label: '类型', field: 'corp_name', layout: 'Text' },
    { label: '手机号', field: 'mobile_phone', layout: 'Text' },
    { label: '添加时间', field: 'add_time', layout: 'Text' }
  ]
  export default {
    name: 'myCustomerPage',
    props: ['currentTab'],
    data () {
      return {
        selectedCustomer: {},
        selectedTable:[],
        selectedDatePicker: 'week',
        selectedTag: null,
        selectedCompany: null,
        selectedStatus: null,
        keyword: null,
        isMore: false,
        tagList: [],
        companyList: [],
        statusList: [],
        currentPage: 1,
        tableTotal: 0,
        showDrawer: false,
        tableData:[],
        bodyHeight:800
      }
    },
    methods: {
      changeSelection(data){
        this.selectedTable = data
      },
      onSearch () {
        //TODO 2020/8/11  RUOWENG 获取数据
        // axios.get(url, params).then(res => {
        //
        // })
      },
      onReset () {
        this.selectedTag = null
        this.selectedCompany = null
        this.keyword = null
        this.onSearch()
      },
      onEdit () {
        this.$message.info('假装有转移客户接口')
      },
      editCustom (row) {
        this.selectedCustomer = row
        this.showDrawer = true
        bus.$emit('customerDrawer',row)
      },
      onInit () {
        let day = 3650
        if(this.currentPage === 3){
          day = 7
        }else if(this.currentPage === 4){
          day = 30
        }
        let params = {
          days: day,
          pageSize: 10,
          pageIndex: this.currentPage
        }
        if (this.currentTab === 3) {
          params = Object.assign({}, params, { day })
        } else if (this.currentTab === 4) {
          params = Object.assign({}, params, { day })
        }
        //TODO 2020/9/4  RUOWENG axios 获取数据
        getCustomerList(params).then(res => {
          console.log(res)
          let { data } = res
          if (!data || !data.total_count) return
          this.tableTotal = data.total_count
          this.currentPage = data.page_index
          this.tableData = data.clients_list
        }).catch(err => {
          console.error('接口报错', err)
        })
        //TODO 2020/8/11  RUOWENG
      },
      handleCurrentChange () {
        this.onInit()
      },
      exportInstance (columns, data, title) {
        this.$export
          .csv({
            columns: columns,
            data: data,
            title: title
          })
          .then(() => {
            this.$message('导出CSV成功')
          })
      },
      exportTable () {
        if(!this.selectedTable) return
        let data = this.selectedTable
        if (!data || !data.length) return
        let columns = Columns.map(item => {
          return { label: item.label, prop: item.field }
        })
        let title = `客户导出报表`
        this.exportInstance(columns, data, title)
      }
    },
    mounted () {
      this.onInit()
      let _this = this
      bus.$on('updateCustomer', function(val){
        _this.onInit()
      })

    },
    watch: {
      currentTab: function () {
        this.onInit()
      }
    }

  }
</script>


