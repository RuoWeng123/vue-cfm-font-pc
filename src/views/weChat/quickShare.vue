<template>

  <div>
    <el-row>
      <el-col :span="24">
        <div class="category-list">
          <div v-for="item in categoryList"
               class="category-item"
               :key="item.group_id"
               @click="clickCategory(item)"
          >
            {{item.group_name}}
            <span class="icon-area  pull-right">
               <i class="el-icon-delete" @click="deleteCategory(item)" ></i>
              <i class="el-icon-edit" @click="editCategory(item)" ></i>
            </span>

          </div>

        </div>
      </el-col>

    </el-row>

    <el-row>
      <el-col :span="24">
        <quick-reply :group-name="selectedCategory.group_name"
                     @add-category="addCategory"
                     :group-id="selectedCategory.group_id"></quick-reply>
      </el-col>
    </el-row>

    <el-dialog

      title="编辑分类"
      :visible.sync="categoryDialog"
      width="300px"
      height="200px">
      <div class="trust-confirm" style="height: auto;">
        <div>
          <el-input type="text"
                    class="mb10"
                 v-model="categoryName"
                 placeholder="分类名称"/>
        </div>
        <div class="trust-confirm-btnWrap">
          <div
            class="trust-confirm-cancel"
            @click="categoryDialog = false">
            取消
          </div>
          <div
            class="trust-confirm-confirm"
            style="color: #5E81F4"
            @click="onSubmitCategory">
            确 定
          </div>
        </div>
      </div>
    </el-dialog>
    <van-dialog
      v-model="dialogDeleteCategoryVisible"
      :show-cancel-button="false"
      :show-confirm-button="false">
      <div class="trust-confirm">
        <p class="trust-confirm-title">
          提示
        </p>
        <p class="trust-confirm-desc">
          删除后不可恢复，请确认删除
        </p>
        <div class="trust-confirm-btnWrap">
          <div
            class="trust-confirm-cancel"
            @click="dialogDeleteCategoryVisible = false">
            取消
          </div>
          <div
            class="trust-confirm-confirm"
            style="color: #5E81F4"
            @click="deleteCategoryOk">
            确 定
          </div>
        </div>
      </div>
    </van-dialog>
  </div>


</template>

<script>
  import {
    getQuickReplyList,
    addReplyCategory,
    editReplyCategory,
    deleteReplyCategory,
    deleteReplyOfCategory,
    updateReplyOfCategory,
    createReplyOfCategory,
    getReplyOfCategory,
    oAuthLogin,
    getWeChatConfig
  } from '@/common/api'

  import messageList from './components/listDrop'
  import quickReply from './quickReply'
  import * as R from 'ramda'
  import {initAgentConfig, getUserId, shareMessageToWeChat} from './utils/initAgentConfig'

  export default {
    name: 'gimmick',
    components: { quickReply },
    data () {
      return {
        userId: null,
        replyDialog: false,
        categoryDialog: false,
        dialogDeleteVisible: false,
        dialogDeleteCategoryVisible: false,
        searchKeyword: null,
        categoryList: [],
        replyList: [],
        categoryName: null,
        replyContent: null,
        isEditCategory: false,
        isEditReply: false,
        selectedCategory: {
          group_name: null,
          group_id: undefined
        },
        selectedReply: null,
        tableOptions: [],
        timeOutEvent: 0
      }
    },
    methods: {
      onInit () {
        getQuickReplyList().then(res => {
          let list = res.data.data.map(v => v.group)
          this.categoryList = list.map(v => {
            return Object.assign({}, v, { content: v.group_name })
          })
          this.selectedCategory = this.categoryList[0]
        }).catch(err => {
          this.$message.error('服务器错误')
          this.categoryList = []
        })
      },
      addCategory () {
        this.categoryDialog = true
        this.isEditCategory = false
        this.categoryName = null
      },
      onShowEditCategory () {
        this.isEditCategory = true
      },
      editCategory (row) {
        this.isEditCategory = true
        this.categoryDialog = true
        this.selectedCategory = row
        this.categoryName = R.clone(row.group_name)
      },
      deleteCategory (item) {
        this.dialogDeleteCategoryVisible = true
        this.selectedCategory = item

      },
      deleteCategoryOk () {
        deleteReplyCategory({ name: this.selectedCategory.group_name }).then(res => {
          this.onInit()
          this.dialogDeleteCategoryVisible = false
        })
      },
      onSubmitCategory () {
        if (this.isEditCategory) {
          let params = {
            old_name: this.selectedCategory.group_name,
            new_name: this.categoryName
          }
          editReplyCategory(params).then(res => {
            this.onInit()
            this.isEditCategory = false
            this.categoryDialog = false
          })
        } else {
          addReplyCategory({ name: this.categoryName }).then(res => {
            this.onInit()
            this.isEditCategory = false
            this.categoryDialog = false
          })
        }
      },

      clickCategory (item) {
        this.selectedCategory = item
        //this.$router.push({ path: '/hk_config/quickReply', query: { ...item } })
        //this.getReply()
      },

      onEdit (row) {
        this.isEditReply = true
        this.replyDialog = true
        this.selectedReply = row
        this.replyContent = R.clone(row.Content)
      },

      onCreate () {
        if (!this.selectedCategory || !this.selectedCategory.group_id) {
          this.$message.info('请优先选择一个分类')
          return
        }
        this.isEditReply = false
        this.replyDialog = true
        this.selectedReply = null
        this.replyContent = null
      },
      onDelete (row) {
        this.dialogDeleteVisible = true
        this.selectedReply = row
      },
      deleteOk () {
        let params = {
          group_id: this.selectedCategory.group_id,
          item_id: this.selectedReply.ItemId
        }
        this.dialogDeleteVisible = false
        deleteReplyOfCategory(params).then(res => {
          this.$message.success('操作成功')
          this.getReply()
        })
      },
      onSubmitReply () {
        if (this.isEditReply) {
          this.updateReply()
        } else {
          this.createReply()
        }
      },
      updateReply () {
        let params = {
          group_id: this.selectedCategory.group_id,
          quick_msg_contents: [
            {
              item_id: this.selectedReply.ItemId,
              content_type: 0,
              content: this.replyContent
            }
          ]
        }
        updateReplyOfCategory(params).then(res => {
          this.getReply()
          this.replyDialog = false
        })
      },
      createReply () {
        let params = {
          group_id: this.selectedCategory.group_id,
          quick_msg_contents: [
            {
              content_type: 0,
              content: this.replyContent
            }
          ]
        }
        createReplyOfCategory(params).then(res => {
          this.getReply()
          this.replyDialog = false
        })
      },
      getReply () {
        getReplyOfCategory({ group_name: this.selectedCategory.group_name }).then(res => {
          this.tableOptions = res.data.data.quick_msg_contents
        })
      },
      gotouchstart () {
        let that = this
        clearTimeout(this.timeOutEvent)//清除定时器
        that.timeOutEvent = 0
        that.timeOutEvent = setTimeout(function () {

        }, 600)//这里设置定时
      },
      //手释放，如果在500毫秒内就释放，则取消长按事件，此时可以执行onclick应该执行的事件
      gotouchend (item) {
        clearTimeout(this.timeOutEvent)
        if (this.timeOutEvent != 0) {
          //这里写要执行的内容（尤如onclick事件）
          this.deleteCategory(item)
        }
      },
//如果手指有移动，则取消所有事件，此时说明用户只是要移动而不是长按
      gotouchmove () {
        clearTimeout(this.timeOutEvent)//清除定时器
        this.timeOutEvent = 0
      }
    },
    mounted () {
      this.userId = getUserId()
      this.onInit()
    },
    async created () {
      //setToken("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjb3JwSWQiOiJ3dzk5OWRlZDFkZTJhOGFkMzEiLCJ1c2VySWQiOiJSdW9XZW5nIiwiZXhwIjo3MzcxMTgzMjg2fQ.1W4UyltXm_4Gr0etLKx_jY2cmpUOcxW_4Fk7K_Uw-Q4")
      let res = await getWeChatConfig({url:window.location.href})
      let config = res.data.data
      await initAgentConfig(config)

      this.initWidth()
    }
  }
</script>

<style lang="less"
       scoped>
  .header {
    padding: 5px;
    text-align: center;
  }

  .category-list {

    .category-item {
      height: 25px;
      line-height: 25px;
      background: #F6F6F6;
      border-radius: 3px;
      padding: 5px 10px;
      font-size: 12px;
      display: inline-block;
      position: relative;
      overflow: hidden;
      margin: 3px 5px;
      text-overflow:ellipsis; white-space: nowrap;


      .icon-area{
        width: 45px;
        height: 20px;
        display: none;
      }
      i{
        width: 20px;
        height: 20px;
      }
      &:hover{
        .icon-area{
          display: block;
        }
      }
    }
  }

  .left-container {
    height: 100vh;
    box-sizing: border-box;
    overflow-y: auto;
    padding: 10px 10px 60px;


    .content {
    }

    .footer {
      display: flex;
      justify-items: center;
    }
  }

  .right-container {
    padding: 14px;
    background: #ffffff;
    box-shadow: 2px 2px 2px #E4E4E4,2px -2px 2px #E4E4E4, -2px 2px 2px #E4E4E4,-2px -2px 2px #E4E4E4;
  }
</style>
