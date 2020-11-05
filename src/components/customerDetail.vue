<template>
  <div class="drawer-container">
    <div class="base-container">
      <div style="width: 50px;height: 60px;line-height: 60px;display: inline-block;"
           v-if="currentName">
        <avatar :username="currentName.substr(0,7)"
                style="width: 50px;height: 50px;"></avatar>
      </div>

      <div class="detail-status">
        <div class="detail-title">{{currentName}}</div>
        <el-select v-model="currentStatus"
                   placeholder="跟进状态"
                   @change="changeStatus"
                   size="mini">
          <el-option
            v-for="item in categoryList"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </div>

    </div>
    <div class="header-tabs">
      <div class="tab-panel"
           :class="{'is-current-tab': currentTab}"
           @click="currentTab = true">跟进记录
      </div>
      <div class="tab-panel"
           :class="{'is-current-tab': !currentTab}"
           @click="currentTab = false">详细信息
      </div>
    </div>
    <div class="content-container">

      <div v-show="currentTab">
        <wxChat
          ref="wxChat"
          :data="wxChatData"
          :showShade="false"
          contactNickname="写跟进"
          :getUpperData="getUpperData"
          :getUnderData="getUnderData"
          :ownerAvatarUrl="ownerAvatarUrl"
          :contactAvatarUrl="contactAvatarUrl"
          :max-height="wxChatHeight"
          :width="width">
        </wxChat>
        <div class="write-record">
          <el-input type="textarea"
                    autosize
                    v-model="writeRecord"
                    placeholder="写跟进记录"></el-input>
          <el-button class="ml10 pull-right"
                     type="primary"
                     @click="onSave">提交
          </el-button>
        </div>
      </div>
      <div v-show="!currentTab" class="content-container-detail" style="overflow: auto;" :style="{maxHeight:wxChatHeight + 'px'}">
        <Card class="mb5">
          <el-row :gutter="10">
            <el-col :span="12">
              <span class="label"
                    style="display: block;font-size: 12px;">添加时间:</span>
              <span class="value">{{add_time}}</span>
            </el-col>
            <el-col :span="12">
              <span class="label"
                    style="display: block;font-size: 12px;">上次跟进:</span>
              <span class="value">{{follow_time}}</span>
            </el-col>
          </el-row>
        </Card>
        <Card class="mb16"
              title="基本信息">
          <el-row :gutter="10"
                  class="basic-user mb10">
            <el-col :span="12"
                    class="mb10"
                    v-for="(item,index) in baseList"
                    :key="item.label">
              <span class="label"
                    v-if="!isEditField"
                    @dblclick="onEditBasicField(item)">{{item.label}}:</span>
              <el-input class="edit-label mb5"
                        type="text"
                        v-model="item.label"
                        v-if="isEditField"></el-input>
              <span class="value ml10"
                    v-if="!isEditField"
                    :class="{'allow-edit': allowEditFields.includes(item.label)}">
                {{item.value}}
              </span>
              <i class="el-icon-circle-close pull-right mt10 cursor-point"
                 style="width: 20px;height: 20px;"
                 v-if="isEditField"
                 @click="deleteField(index)"></i>
              <el-input class="value"
                        type="text"
                        v-model="item.value"
                        v-if="isEditField"></el-input>
            </el-col>
          </el-row>
        </Card>

        <Card class="mb16"
              title="个人标签"
              :show-edit="true"
              @onEdit="onEditPersonTag">
          <div style="display:flex;">
            <span v-for="item in personTags"
                  class="person-tag"
                  :key="item">
                <span class="tag-item">{{item.name}}</span>
<!--                  <i class="el-icon-circle-close"-->
<!--                     v-if="!item.status"-->
<!--                     @click="onEditPersonTag(item)"></i>-->
            </span>
          </div>

        </Card>
        <Card class="mb16"
              title="企业标签"
              :show-edit="true"
              @onEdit="onEditCompanyTag">
          <company-tag :tags="companyTags"></company-tag>
        </Card>
      </div>
    </div>
    <el-dialog ref="layer"
               :visible.sync="editPersonTag"
               :title="dialogPersonTitle"
               :append-to-body="true"
               height="400px"
               width="500px">
      <person-tag :customer-id="customerId"
                  :tags="personTags"
                  :show="editPersonTag"
                  @onClose="onCloseEditPersonTag"></person-tag>
    </el-dialog>

    <el-dialog ref="layer"
               :visible.sync="editCompanyTag"
               title="编辑企业标签"
               :append-to-body="true"
               height="400px"
               width="500px">
      <company-edit-tag :tags="companyTags" :customer-id="customerId" @close="onCloseCompany"></company-edit-tag>
    </el-dialog>
    <el-dialog ref="layer"
               :visible.sync="dialogBasicVisible"
               :title="editBasicFieldTitle"
               :append-to-body="true"
               height="150px"
               width="300px">
      <el-form ref="form"
               :model="options"
               style="height: 40px;">
        <el-form-item label="">

          <el-date-picker
            v-model="options.name"
            type="date"
            v-if="editBasicFieldTitle === '生日'"
            value-format="yyyy-MM-dd"
            style="width: 100%;"
            placeholder="选择日期">
          </el-date-picker>
          <el-input v-model="options.name"
                    placeholder="请输入内容" v-else></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button type="default"
                   @click="dialogBasicVisible = false">取消
        </el-button>
        <el-button type="primary"
                   @click="onSubmitBasicField(options)">确定
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import Avatar from 'vue-avatar'
  import wxChat from './wxChat'
  import Card from './Card'
  import { getCustomerById } from '@/common/api'
  import bus from '@/util/bus'
  import {
    getCatetoryList,
    updateCustomerStatus,
    createRecord,
    updateCustomerBasic,
    getRecord,
    updateCompanyTag,
    createCompanyTag,
    deleteCompanyTag
  } from '../common/api'
  import * as R from 'ramda'
  import moment from 'moment'
  import PersonTag from '@/components/personTag'
  import CompanyTag from '@/components/companyTag'
  import CompanyEditTag from '@/components/companyEditTag'

  export default {
    name: 'customerDetail',
    components: { wxChat, Card, Avatar, PersonTag, CompanyEditTag, CompanyTag },
    props: ['customerId'],
    data () {
      return {
        writeRecord: null,
        selectedStatus: null,
        categoryList: [],
        statusList: [],
        baseList: [],
        currentTab: true,
        personTags: [],
        companyTags: [],
        isEditField: false,
        currentStatus: null,
        currentCustomer: {},
        currentName: null,

        dialogPersonTitle: null,
        editPersonTag: false,
        selectedLastTag: null,
        options: {
          name: null
        },
        add_time: null,
        follow_time: null,
        dialogCompanyTitle: null,
        editCompanyTag: false,
        selectedLastCompanyTag: null,
        allowEditFields: [],
        dialogBasicVisible: false,
        editBasicFieldTitle: '编辑',

        upperTimes: 0,
        underTimes: 0,
        upperId: 0,
        underId: 6,
        width: window.screen.width,
        ownerAvatarUrl: require('../assets/avatar1.png'),
        contactAvatarUrl: require('../assets/avatar2.png'),
        wxChatData: [],
        wxChatHeight: 0
      }
    },
    created () {
      this.initWidth()
    },
    methods: {
      onCloseEditPersonTag(){
        this.editPersonTag = false
        this.getTargetCustomer()
      },


      onEditPersonTag () {
        this.selectedLastTag = null
        this.editPersonTag = true
        this.dialogPersonTitle = '个人标签'
      },

      onCloseCompany(){
        this.editCompanyTag = false
        this.getTargetCustomer()
      },
      onEditCompanyTag (data) {
        this.editCompanyTag = true
      },

      onSubmitBasicField () {
        let temp = {}
        temp[this.editBasicFieldTitle] = this.options.name
        this.saveField(temp)
        this.dialogBasicVisible = false
      },
      addField () {
        this.baseList.push({ value: '', label: '未命名' })
        this.isEditField = true
      },
      editField () {
        this.isEditField = true
      },

      deleteField (index) {
        this.baseList.splice(index, 1)
      },
      saveField (target) {
        this.isEditField = false
        let params = {}
        this.baseList.forEach(item => {
          let temp = {}
          temp[item.label] = item.value
          params = Object.assign({}, params, temp)
        })
        params = Object.assign({}, params, target)
        params = Object.assign({}, params, {external_user_id: this.customerId, modified_attrs :[this.editBasicFieldTitle]})
        updateCustomerBasic(params).then(res => {
          this.$message.success('操作成功')
          this.getTargetCustomer()
        })
      },
      getTargetCustomer () {
        if (!this.customerId) return
        let id = this.customerId
        getCustomerById({ externalUserId: id }).then(res => {
          console.log(res)
          this.currentCustomer = res.data
          this.currentName = res.data.top.name
          this.currentStatus = res.data.top.current_status
          this.personTags = res.data.personal_tags
          this.companyTags = res.data.company_tags
          this.add_time = res.data.top.add_time
          this.follow_time = res.data.top.follow_time
          this.baseList = []
          this.allowEditFields = res.data.property['可修改属性']
          let allowEdit = R.clone(res.data.property['可修改属性'])
          delete res.data.property['可修改属性']
          for (let key in res.data.property) {
            let temp = {
              value: res.data.property[key] || null,
              label: key
            }
            if (temp.label === '生日' && temp.value) {
              temp.value = moment(temp.value).format('YYYY-MM-DD')
            }
            this.baseList.push(temp)
          }
        }).catch(err => {
          console.error('接口错', err)
        })
      },
      onSave () {
        if (!this.writeRecord) return
        let params = {
          content_type: 0,
          content: this.writeRecord,
          external_user_id: this.customerId
        }
        let user_name = window.localStorage.getItem('bingfeng_user')
        this.wxChatData = [{
          direction: 2,
          id: new Date().getTime(),
          type: 1,
          content: params.content,
          ctime: new Date(),
          re_mark: user_name + ' 写跟进记录',
          create_user_name: user_name
        }]
        //this.$refs.wxChat.infinite()
        this.writeRecord = null
        createRecord(params).then(res => {
          this.onEmit()
        })
      },
      initWidth () {
        var ua = navigator.userAgent
        var ipad = ua.match(/(iPad).*OS\s([\d_]+)/),
          isIphone = !ipad && ua.match(/(iPhone\sOS)\s([\d_]+)/),
          isAndroid = ua.match(/(Android)\s+([\d.]+)/),
          isMobile = isIphone || isAndroid
        //非移动端设置400px宽度，移动端是100%
        if (!isMobile) {
          this.width = 372
        }
      },

      //向上滚动加载数据
      getUpperData () {
        var me = this
        if (!this.customerId) return
        // 这里为模拟异步加载数据
        // 实际上你可能要这么写:
        // return axios.get('xxx').then(function(result){
        //     return result;  //result的格式需要类似下面resolve里面的数组
        // })
        let params = {
          external_user_id: this.customerId,
          start_time: this.wxChatData[0] && this.wxChatData[0].ctime ?
            new Date(this.wxChatData[0].ctime) :
            new Date(new Date().getTime() + 28800000).toISOString()
        }
        getRecord(params).then(res => {
          if (res.data.data && res.data.data.length) {
            let list = res.data.data.map((item, index) => {
              return {
                direction: item.is_current_user ? 2 : 1,
                id: item.message_id,
                type: 1,
                content: item.content,
                ctime: new Date(item.created_at).getTime() + 28800000,
                re_mark: item.re_mark,
                create_user_avatar: item.create_user_avatar,
                create_user_name: item.create_user_name
              }
            })
            this.wxChatData = list.reverse()
          } else {
            this.wxChatData = []
          }
        })
      },

      getUnderData (content) {
        var me = this
        //意义同getUpperData()
        return new Promise(function (resolve) {
          setTimeout(function () {
            //模拟加载完毕
            if (!me.writeRecord) {
              return resolve([])
            }

            //加载数据
            resolve(
              [{
                direction: 1,
                id: me.underId + 1,
                type: 1,
                content: content,
                ctime: new Date().toLocaleString()
              }]
            )
          }, 1000)

          me.underId = me.underId + 2
          me.underTimes++
        })
      },
      getCategoryList () {
        getCatetoryList({ keyword: null }).then(res => {
          this.categoryList = res.category_list.map(item => {
            return {
              value: item.follow_status,
              label: item.follow_status
            }
          })
        })
      },
      changeStatus (data) {
        let params = {
          'external_user_id': this.customerId,
          'follow_status': data
        }
        updateCustomerStatus(params).then(res => {
          this.$message({
            type: 'success',
            message: '操作成功'
          })
          this.onEmit()
        })
      },
      onEditBasicField (row) {
        this.editBasicFieldTitle = row.label
        this.options.name = row.value
        if (this.allowEditFields.includes(row.label)) {
          this.dialogBasicVisible = true
        }
      },
      onEmit () {
        bus.$emit('updateCustomer', { success: true })
      }
    },
    mounted () {
      this.getTargetCustomer()
      this.getCategoryList()
      this.getUpperData()
      this.wxChatData = []
      let bodyHeight = document.getElementsByTagName('body')[0].attributes.style.ownerElement.scrollHeight
      this.wxChatHeight = bodyHeight - 40 - 54 - 32 - 50
    },
    watch: {
      customerId: function (val) {
        if (!val) {
          bus.$emit('closeDrawer',false)
          return
        }
        this.getTargetCustomer(val)
        this.$refs.wxChat.clearData()
        this.wxChatData = []
        this.getUpperData()
      }
    }
  }
</script>

<style lang="less"
       scoped>
  .drawer-container {
    display: block;
    position: relative;
    flex-direction: column;
    flex-wrap: nowrap;
    justify-content: flex-start;
    padding: 0px 16px;
    height: 100%;

    .base-container {
      height: 70px;
      display: inline-flex;

      .detail-status {
        display: inline-block;
        margin-left: 10px;
        height: 60px
      }

      .detail-title {
        margin-bottom: 10px;
        font-size: 14px;
      }
    }


    .header-tabs {
      width: auto;
      height: 50px;
      line-height: 50px;
      font-size: 15px;
      margin-bottom: 2px;

      .tab-panel {
        width: 50%;
        display: inline-block;
        text-align: center;
        cursor: pointer;
      }

      &:hover {
        color: #5E81F4;
      }

      .is-current-tab {
        color: #5E81F4;
        border-bottom: 2px solid #5E81F4;
      }
    }
    .content-container {
      overflow: auto;
      height: 100%;

      .label {
        height: 30px;
        font-size: 14px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #333333;
        line-height: 30px;
      }

      .write-record {
        display: inline-flex;
        position: absolute;
        bottom: 0px;
        flex-direction: row;
        align-items: baseline;
        height: 40px;
        width: 373px;
        z-index: 999;
      }


      .content-container-detail{
        height: 98%;
        padding-bottom: 10px;
      }
      .basic-user {
        flex-direction: row;
        align-items: baseline;
        font-size: 12px;

        .label {
          display: inline-block;
          width: 52px;
          font-size: 12px;
          font-family: PingFangSC-Regular, PingFang SC;
        }

        .edit-label {
          width: 120px;
          font-size: 12px;
          font-family: PingFangSC-Regular, PingFang SC;
        }

        .value {
          height: 30px;
          line-height: 30px;
          width: 100%;
          min-width: 50px;
          font-size: 12px;
          font-family: PingFangSC-Regular, PingFang SC;
        }

        .allow-edit {
          color: #5E81F4;
        }
      }

      .person-tag {
        display: inline-block;
        position: relative;
        margin-left: 5px;
        margin-right: 5px;
        /*&:hover {*/
        /*  border: 1px dashed #19be6b;*/

        /*  i {*/
        /*    opacity: 1;*/
        /*    color: #19be6b;*/
        /*    cursor: pointer;*/
        /*  }*/
        /*}*/
        .tag-item{
          margin-left: 5px;
          margin-right: 5px;
          padding: 5px;
          border:1px solid #E4e4e4;
          cursor: pointer;
        }

        i {
          position: absolute;
          opacity: 0;
          top: -10px;
          right: -10px;

        }
      }
    }


  }
</style>
