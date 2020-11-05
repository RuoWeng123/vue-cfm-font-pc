<template>
  <div>
    <div class="base-container">
      <person-avatar :customer-id="customerId"></person-avatar>

    </div>

    <van-tabs
      class="tabs content-container"
      v-model="currentTab">
      <van-tab
        title="跟进记录"
        style="transform: translate3d(0, 0, 0);">
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
                 style="width: 80vw;margin-left:2vw;"
                 v-model="writeRecord"
                 placeholder="写跟进记录"/>
          <van-button class="ml10 pull-right"
               style="margin-right:2vw;"
               type="info"
               size="small"
               @click="onSave">提交
          </van-button>
        </div>
      </van-tab>
      <van-tab
        title="详细信息">
        <div style="padding: 10px 14px;overflow: auto;"
             :style="{maxHeight: wxChatHeightDetail + 'px'}"
             class="content-container-detail">
          <Card class="mb5">
            <el-row :gutter="10">
              <el-col :span="12">
              <span class="label"
                    style="display: block;font-size: 12px;">添加时间:</span>
                <span class="value">{{baseData.add_time}}</span>
              </el-col>
              <el-col :span="12">
              <span class="label"
                    style="display: block;font-size: 12px;">上次跟进:</span>
                <span class="value">{{baseData.follow_time}}</span>
              </el-col>
            </el-row>
          </Card>
          <Card class="mb16"
                style="display: block;height: auto;"
                title="基本信息">
            <div class="seal-box basic-user">
              <div style="width: 43vw;display:inline-block;margin-bottom: 10px;">
                <span class="customer-user-label">名称:</span>
                <span class="customer-user-name">{{ baseData.name }}</span>
              </div>
              <div
                   style="width: 43vw;display:inline-block;margin-bottom: 10px;">
                <span class="customer-user-label">别名:</span>
                <span class="customer-user-name">{{ baseData['备注'] }}</span>
              </div>
              <div
                   style="width: 43vw;display:inline-block;margin-bottom: 10px;">
                <span class="customer-user-label">公司:</span>
                <span class="customer-user-name">{{ baseData['公司'] }}</span>
              </div>
              <div
                   style="width: 43vw;display:inline-block;margin-bottom: 10px;">
                <span class="customer-user-label">手机:</span>
                <span class="customer-user-name">{{ baseData['手机号'] }}</span>
              </div>
              <div
                   style="width: 43vw;display:inline-block;margin-bottom: 10px;">
                <span class="customer-user-label">邮箱:</span>
                <span class="customer-user-name">{{ baseData['邮箱'] }}</span>
              </div>
              <div
                   style="width: 43vw;display:inline-block;margin-bottom: 10px;">
                <span class="customer-user-label">生日:</span>
                <span class="customer-user-name">{{ baseData['生日'] }}</span>
              </div>
              <div
                   style="width: 43vw;display:inline-block;margin-bottom: 10px;">
                <span class="customer-user-label">地址:</span>
                <span class="customer-user-name">{{ baseData['地址'] }}</span>
              </div>
            </div>
          </Card>

          <Card class="mb16"
                title="个人标签"
                :show-edit="true"
                style="display: block;"
                @onEdit="onAddPersonTag">
            <div style="display:block;">
              <span v-for="item in personTags"
                    class="person-tag"
                    :key="item">
                  <span class="tag-item">{{item.name}}</span>
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

      </van-tab>
    </van-tabs>

    <van-dialog v-model="editPersonTag"
                title="个人标签"
                :show-cancel-button="false"
                :show-confirm-button="false">
      <person-tag :customer-id="customerId"
                  :tags="personTags"
                  @onClose="onCloseEditPersonTag"></person-tag>
    </van-dialog>

    <van-dialog v-model="editCompanyTag"
                title="企业标签"
                :show-cancel-button="false"
                :show-confirm-button="false">
      <company-edit-tag :customer-id="customerId"
                        :tags="companyTags"
                        @onClose="onCloseEditCompanyTag"></company-edit-tag>
    </van-dialog>
  </div>

</template>

<script>
  import wxChat from './components/wxChat/wxChat'
  import Card from './components/card'
  import { getCustomerById, getCatetoryList, updateCustomerStatus, createRecord, updateCustomerBasic, getRecord,
    setToken, oAuthLogin, getWeChatConfig } from '@/common/api'
  import * as R from 'ramda'
  import moment from 'moment'
  import PersonTag from './components/personTag'
  import PersonAvatar from './components/personAvatar'
  import CompanyTag from './components/companyTag'
  import CompanyEditTag from './components/companyEditTag'
  import { initAgentConfig, getUserId } from './utils/initAgentConfig'
  /*
  * [{
            direction: 2,
            id: 1,
            type: 1,
            content: '你好!!',
            ctime: new Date().toLocaleString()
          },
            {
              direction: 1,
              id: 2,
              type: 1,
              content: '你也好。',
              ctime: new Date().toLocaleString()
            }]*/
  export default {
    name: 'customerDetail',
    components: { CompanyEditTag, wxChat, Card, PersonTag, PersonAvatar, CompanyTag },
    data () {
      return {
        customerId: null,
        writeRecord: null,
        selectedStatus: null,
        categoryList: [],
        statusList: [],
        baseData: {},
        currentTab: 0,
        personTags: [],
        companyTags: [],
        isEditField: false,
        currentStatus: null,
        currentCustomer: {},
        editPersonTag: false,
        editCompanyTag: false,
        upperTimes: 0,
        underTimes: 0,
        upperId: 0,
        underId: 6,
        width: window.screen.width,
        ownerAvatarUrl: require('@/assets/avatar1.png'),
        contactAvatarUrl: require('@/assets/avatar2.png'),
        wxChatData: [],
        wxChatHeight: 600,
        wxChatHeightDetail: 600
      }
    },
    async created () {
       //setToken("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjb3JwSWQiOiJ3dzk5OWRlZDFkZTJhOGFkMzEiLCJ1c2VySWQiOiJSdW9XZW5nIiwiZXhwIjo3MzcxMTgzMjg2fQ.1W4UyltXm_4Gr0etLKx_jY2cmpUOcxW_4Fk7K_Uw-Q4")
      let res = await getWeChatConfig({url:window.location.href})
      let config = res.data.data
      await initAgentConfig(config)
      let userId = await getUserId()

      this.initWidth()
    },
    methods: {
      onCloseEditPersonTag () {
        this.editPersonTag = false
        this.getTargetCustomer()
      },
      onAddPersonTag () {
        // this.selectedLastTag = null
        this.editPersonTag = true
        // this.dialogPersonTitle = '个人标签'
      },
      onEditCompanyTag () {
        this.editCompanyTag = true
      },
      onCloseEditCompanyTag () {
        this.editCompanyTag = false
        this.getTargetCustomer()
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
      saveField () {
        this.isEditField = false
        let params = {}
        this.baseList.forEach(item => {
          let temp = {}
          temp[item.label] = item.value
          params = Object.assign({}, params, temp)
        })

        updateCustomerBasic(params).then(res => {
          this.$message.success('操作成功')
        })
      },
      getTargetCustomer () {
        let id = this.customerId
        getCustomerById({ externalUserId: id }).then(res => {
          console.log('===', res)
          this.currentCustomer = res.data
          this.baseData = Object.assign({}, res.data.top, res.data.property)
          this.currentStatus = res.data.current_status
          //const tags = R.clone(res.data.tags)
          this.personTags = res.data.personal_tags
          this.companyTags = res.data.company_tags
        }).catch(err => {
          console.error('接口错', err)
        })
      },
      handleClick (val) {
        this.currentTab = val.name
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
          console.log(res)
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
            this.$message.warning('没有更多数据了')
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
        })
      }
    },
    async mounted () {
      this.customerId = await getUserId()
      this.getTargetCustomer()
      this.getCategoryList()
      this.getUpperData()
      this.wxChatData = []
      let bodyHeight = document.getElementsByTagName('body')[0].clientHeight
      this.wxChatHeight = bodyHeight - 80
      this.wxChatHeightDetail = bodyHeight - 100
    },
    watch: {
      customerId: function (val) {
        if (!val) return
        this.getTargetCustomer(val)
        this.getUpperData()
        this.wxChatData = []
      }
    }
  }
</script>

<style lang="less"
       scoped>

  .write-record {
    display: flex;
    position: absolute;
    bottom: 0px;
    background: #ffffff;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    height: 40px;
    width: 100vw;
    z-index: 999;
  }

  .base-container {
    height: 80px;
    width: auto;

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

  .content-container {
    overflow: auto;
    height: calc(~'100% - 80px');

    .label {
      height: 30px;
      font-size: 14px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #333333;
      line-height: 30px;
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

      .tag-item {
        margin-left: 5px;
        margin-right: 5px;
        padding: 5px;
        border: 1px solid #E4e4e4;
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


  .basic-user {
    flex-direction: row;
    align-items: baseline;

    .label {
      display: inline-block;
      width: 140px;
    }

    .value {
      height: 30px;
      line-height: 100%;
      width: 100%;
    }
  }


  .seal-box {
    display: block;
    margin-bottom: 10px;
    .customer-user-label {
      width: 45vw;
      margin-right: 10px;
    }

    .customer-user-name {
      width: 40vw;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
</style>
