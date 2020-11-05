<template>
  <div class="container">
    <el-tabs v-model="editableTabsValue"
             type="card"
             v-if="showPage"
             @tab-remove="removeTab">
      <el-tab-pane
        v-for="item in editableTabs"
        :key="item.name"
        :label="item.title"
        :name="item.name"
        :closable=" item.closable"
        style="padding: 0px 0px 10px 0px"
      >
        <span style="color:#C9C9C9;font-size: 12px;" v-if="editableTabsValue === '1'">企业微信中我添加的客户</span>
        <span style="color:#C9C9C9;font-size: 12px;" v-if="editableTabsValue === '2'">客户跟进状态跟进阶段的看板</span>
        <span style="color:#C9C9C9;font-size: 12px;" v-if="editableTabsValue === '3'">7天跟进记录</span>
        <span style="color:#C9C9C9;font-size: 12px;" v-if="editableTabsValue === '4'">30天跟进记录</span>
      </el-tab-pane>
    </el-tabs>
    <div class="content-container">
      <el-row v-if="editableTabsValue === '1' " class="mb10">
        <el-col :span="24">
          <el-button type="primary"
                     size="default"
                     @click="addTab(7)">7天跟进客户
          </el-button>
          <el-button type="primary"
                     size="default"
                     class="ml16"
                     @click="addTab(30)">30天跟进客户
          </el-button>
        </el-col>
      </el-row>

      <notice-board :current-tab="editableTabsValue"
                    v-if="editableTabsValue === '2' "></notice-board>
      <my-customer-page :current-tab="editableTabsValue"
                        v-else></my-customer-page>
    </div>
  </div>
</template>

<script>
import * as R from 'ramda'
import MyCustomerPage from './myCustomerPage'
import NoticeBoard from './noticeBoard'
import {setToken} from "@/common/api"

export default {
  name: 'myCustomer',
  components: {MyCustomerPage, NoticeBoard},
  data() {
    return {
      editableTabsValue: '1',
      showPage: false,
      editableTabs: [{
        title: '我的客户',
        name: '1',
        closable: false,
        content: 'Tab 1 content'
      }, {
        title: '客户看板',
        name: '2',
        closable: false,
        content: 'Tab 2 content'
      }]

    }
  },
  methods: {
    addTab(day) {
      let title = `${day}天跟进客户`
      let index = R.findIndex(R.propEq('title', title), this.editableTabs)
      if (index > 0) {
        this.editableTabsValue = index + 1 + ''
        return
      }

      let length = this.editableTabs.length
      let newTabName = length + 1 + ''

      this.editableTabs.push({
        title: title,
        name: newTabName,
        content: 'New Tab content',
        closable: true
      })
      this.editableTabsValue = newTabName
    },
    removeTab(targetName) {
      if (targetName === '1' || targetName === '2') return
      let tabs = this.editableTabs
      let activeName = this.editableTabsValue
      if (activeName === targetName) {
        tabs.forEach((tab, index) => {
          if (tab.name === targetName) {
            let nextTab = tabs[index + 1] || tabs[index - 1]
            if (nextTab) {
              activeName = nextTab.name
            }
          }
        })
      }

      this.editableTabsValue = activeName
      this.editableTabs = tabs.filter(tab => tab.name !== targetName)
    }
  },
  mounted() {
    this.showPage = true
  }

}
</script>

<style lang="less"
       scoped>
.container {
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: flex-start;
  padding-right: 16px;

  .filter-container {

  }

  .content-container {
    height: calc(~"100% - 100px");
    background: #FFFFFF;
    border-radius: 4px;
    padding: 16px;
  }

  .footer {
    display: inline-flex;
    flex-direction: column;
    align-content: center;
    justify-content: center;
    align-items: center;
    height: 60px;
  }
}
</style>
