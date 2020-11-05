<template>
  <div class="container">
    <el-tabs v-model="selectedTab" type="card">
      <el-tab-pane label="快速回复" name="first" style="padding: 0px 0px 10px 0px">
        <span style="color:#C9C9C9;font-size: 12px;">企业微信中消息快速回复话术</span>
      </el-tab-pane>
    </el-tabs>
  <project-layout left-style="width: 230px;"
                  right-style="width: calc(100% - 240px)"
                  footer-style=" bottom: 0px;"
  >
    <div slot="left"
         class="left-container">
      <div class="content">
        <ul style="padding-left: 0px;">
          <li v-for="item in categoryList" :key="item.group_id" @click="clickCategory(item)"
              style="height: 40px;line-height: 40px;">
            <div :class="{'is-current': selectedCategory.group_id === item.group_id}" style="padding-left: 10px;" >
              {{item.group_name}}
              <span class="pull-right icon-area">
                <i class="el-icon-edit mr10"
                   @click="editCategory(item)"></i>
                <i class="el-icon-delete"
                   @click="deleteCategory(item)"></i>
              </span>
            </div>

          </li>
        </ul>
      </div>
      <div class="footer" style="width: 100%;display: block;">
        <el-button type="text"
                   icon="el-icon-plus"
                   style="width:100%"
                   @click="addCategory">新增分类
        </el-button>
      </div>
    </div>
    <div slot="right"
         class="right-container">
      <div class="header mb10">
        <el-input type="text"
                  style="width: 300px;"
                  placeholder="请输入关键字"
                  v-model="searchKeyword"></el-input>
        <el-button type="primary"
                   class="pull-right"
                   @click="onCreate">新增
        </el-button>
      </div>
      <el-table :data="tableOptions" border size="small">
        <el-table-column prop="Content" label="话术内容"></el-table-column>
        <el-table-column label="创建人">
          <span :slot-scope="scope">{{selectedCategory.user_name}}</span>
        </el-table-column>
        <el-table-column prop="MsgCreatedAt" label="创建时间"></el-table-column>
          <el-table-column
            align="center"
            label="操作"
            width="70px">
            <template slot-scope="scope">
              <i
                class="icon el-icon-view mr16"
                @click="onEdit(scope.row)"
              />
              <i
                class="icon el-icon-delete"
                @click="onDelete(scope.row)"
              />
            </template>
          </el-table-column>
      </el-table>
    </div>


  </project-layout>
  <el-dialog
    title="快捷消息"
    :visible.sync="replyDialog"
    width="30%">
    <el-input type="textarea" v-model="replyContent" placeholder="请输入快捷恢复内容"></el-input>
    <div slot="footer"
         class="dialog-footer">
      <el-button @click="replyDialog = false">取 消</el-button>
      <el-button type="primary"
                 @click="onSubmitReply">确 定</el-button>
    </div>
  </el-dialog>
  <el-dialog
    title="分类"
    :visible.sync="categoryDialog"
    width="300px"
    height="300px">
    <div class="container">
      <el-input type="text" v-model="categoryName" placeholder="分类名称"></el-input>
    </div>
    <div slot="footer"
         class="dialog-footer">
      <el-button @click="categoryDialog = false">取 消</el-button>
      <el-button type="primary"
                 @click="onSubmitCategory">确 定</el-button>
    </div>
  </el-dialog>

    <el-dialog
      title="删除提示"
      :visible.sync="dialogDeleteCategoryVisible"
      width="30%">
      <span>删除后不可恢复，请确认删除</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogDeleteCategoryVisible = false">取 消</el-button>
        <el-button type="primary" @click="deleteCategoryOk">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog
      title="删除提示"
      :visible.sync="dialogDeleteVisible"
      width="30%">
      <span>删除后不可恢复，请确认删除</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogDeleteVisible = false">取 消</el-button>
        <el-button type="primary" @click="deleteOk">确 定</el-button>
      </span>
    </el-dialog>
  </div>

</template>

<script>
  import ProjectLayout from '@/components/ProjectLayout.vue'
  import {getQuickReplyList,
    addReplyCategory,
    editReplyCategory,
    deleteReplyCategory,
    deleteReplyOfCategory,
    updateReplyOfCategory,
    createReplyOfCategory,
    getReplyOfCategory
  } from '@/common/api'

  import * as R from 'ramda'
  export default {
    name: 'quickReply',
    components: { ProjectLayout },
    data () {
      return {
        selectedTab:'first',
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
          group_id: undefined
        },
        selectedReply:null,
        tableOptions: []
      }
    },
    methods: {
      onInit () {
        getQuickReplyList().then(res => {
          this.categoryList = res.data.data.map(v=> v.group)
          this.selectedCategory = this.categoryList && this.categoryList[0]
        }).catch(err =>{
          this.$message.error("服务器错误")
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
      deleteCategoryOk(){
        deleteReplyCategory({name: this.selectedCategory.group_name}).then(res =>{
          this.onInit()
          this.dialogDeleteCategoryVisible = false
        })
      },
      onSubmitCategory(){
        if(this.isEditCategory){
          let params = {
            old_name: this.selectedCategory.group_name,
            new_name: this.categoryName
          }
          editReplyCategory(params).then(res =>{
            this.onInit()
            this.isEditCategory = false
            this.categoryDialog = false
          })
        }else{
          addReplyCategory({name: this.categoryName}).then(res =>{
            this.onInit()
            this.isEditCategory = false
            this.categoryDialog = false
          })
        }
      },

      clickCategory(item){
        this.selectedCategory = item
        this.getReply()
      },

      onEdit(row){
        this.isEditReply = true
        this.replyDialog = true
        this.selectedReply = row
        this.replyContent = R.clone(row.Content)
      },

      onCreate () {
        if(!this.selectedCategory || !this.selectedCategory.group_id){
          this.$message.info("请优先选择一个分类")
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
      deleteOk(){
        let params ={
          group_id: this.selectedCategory.group_id,
          item_id: this.selectedReply.ItemId
        }
        this.dialogDeleteVisible = false
        deleteReplyOfCategory(params).then(res =>{
          this.$message.success("操作成功")
          this.getReply()
        })
      },
      onSubmitReply(){
        if(this.isEditReply){
          this.updateReply()
        }else{
          this.createReply()
        }
      },
      updateReply(){
        let params = {
          group_id: this.selectedCategory.group_id,
          quick_msg_contents:[
            {
              item_id: this.selectedReply.ItemId,
              content_type: 0,
              content: this.replyContent
            }
          ]
        }
        updateReplyOfCategory(params).then(res =>{
          this.getReply()
          this.replyDialog = false
        })
      },
      createReply(){
        let params = {
          group_id: this.selectedCategory.group_id,
          quick_msg_contents:[
            {
              content_type: 0,
              content: this.replyContent
            }
          ]
        }
        createReplyOfCategory(params).then(res =>{
          this.getReply()
          this.replyDialog = false
        })
      },
      getReply(){
        getReplyOfCategory({group_name: this.selectedCategory.group_name}).then(res =>{
          this.tableOptions = res.data.data.quick_msg_contents
        })
      }

    },
    mounted () {
      this.onInit()
    }
  }
</script>

<style lang="less"
       scoped>
  .left-container{
    padding: 2px 14px 10px 14px;
    background: #ffffff;
    box-shadow: 2px 2px 2px #E4E4E4,2px -2px 2px #E4E4E4,-2px 2px 2px #E4E4E4,-2px -2px 2px #E4E4E4;
    .content{
      ul{
        li{
          list-style: none;
          height: 40px;
          line-height: 40px;
          font-size: 16px;


          .icon-area{
            display: inline-block;
            opacity: 0;
            width: 55px;

            i{
              width: 18px;
              height: 18px;
            }
          }
          &:hover {
            background: #91bcf4;
            color: #FFFFFF;

            .icon-area{
              display: inline-block;
              opacity: 1;
              color: whitesmoke;
            }
          }
          .is-current {
            background: #5E81F4;
            color: #FFFFFF;

          }
        }
      }
    }
    .footer{
      display: flex;
      justify-items: center;
    }
  }

  .right-container{
    padding: 14px;
    background: #ffffff;
    box-shadow: 2px 2px 2px #E4E4E4,2px -2px 2px #E4E4E4,-2px 2px 2px #E4E4E4,-2px -2px 2px #E4E4E4;
  }
</style>
