<template>
  <div class="category-container">
    <div class="header mb16">
      <div>
        <span class="title">{{category.follow_status}}</span>
        <i :class="{'el-icon-s-fold': showSearchContent, 'el-icon-s-unfold': !showSearchContent}"
           class="pull-right"
           style="margin-top:5px;"
           @click="renderClassInRight"
           circle></i>
        <div class="action-list pull-right" ref="actionList">
          <el-tooltip class="item" content="编辑名称" placement="top">
            <i class="el-icon-edit mr5" @click="onEdit(category)"></i>
          </el-tooltip>
          <el-tooltip class="item" content="右侧新增分类" placement="top">
            <i class="el-icon-plus mr5" @click="onCreate(category)"></i>
          </el-tooltip>
          <el-tooltip class="item" content="删除该分类" placement="top">
            <el-popconfirm
              title="确定删除该分类吗？"
              @onConfirm="onDelete(category)"
            >
              <i class="el-icon-delete" slot="reference"></i>
            </el-popconfirm>
          </el-tooltip>
        </div>
      </div>
      <div class="count mt10">{{category.clients.length}}个客户</div>

    </div>
    <div class="content-container" >
      <draggable :list="customerList"
                  group="category"
                 @start="dragStart"
                 @end="dragEnd"
                 :class="categoryIndex"
                 style="width:250px;"
                 class="dragArea">
        <customer-card v-for="item in customerList"
                       :key="item.external_user_id"
                       :id="item.external_user_id"
                       :customer="item"
                       @dbClick="showCustomerOnDrawer(item)"
                       class="mb10"></customer-card>
      </draggable>
    </div>
    <el-dialog ref="layer"
               :visible.sync="dialogVisible"
               :title="dialogTitle"
              width="300px"
              height="200px">
      <el-form ref="form" :model="options">
        <el-form-item label="名称">
          <el-input v-model="options.name"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit(options)">确定</el-button>
          <el-button type="default" @click="onCancel">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
  import customerCard from './customerCard'
  import bus from '@/util/bus'
  import {addCategory, deleteCategory, updateCategory, updateCustomerStatus} from '../common/api'
  import draggable from 'vuedraggable'
  import * as R from 'ramda'
  import CustomerDetail from './customerDetail'
  import Avatar from 'vue-avatar'
  export default {
    name: 'categoryCard',
    components:{ customerCard, draggable },
    props:{
      customerList: {
        type: Array,
        default: function(){
          return []
        }
      },
      categoryList:{
        type: Array,
        default: function(){
          return []
        }
      },
      categoryIndex:{
        type: String,
        default: "dragArea-1"
      },
      category:{
        type: Object,
        default: function(){
          return {
            id: undefined,
            name: null,
            customerList:[]
          }
        }
      }
    },
    data(){
      return{
        isEdit: false,
        editName: null,
        showDrawer: false,
        showSearchContent: false,
        dialogVisible: false,
        dialogTitle:"",
        customerId: null,
        options:{
          name:''
        },
        customer:{}
      }
    },
    methods:{
      showCustomerOnDrawer(row){
        //this.showDrawer = true
        //this.customer = row
        bus.$emit('customerDrawer',row)
      },
      renderClassInRight () {
        this.showSearchContent = !this.showSearchContent
        console.log('show_state', this.showSearchContent)
        let node = this.$refs.actionList
        //TODO 2020/6/10  RUOWENG  因为每次执行不同操作，所以每次执行完了，从node列表中移除掉，避免下次影响
        if (this.showSearchContent) {
          node.style.display = 'block'
          node.classList.add('animate__animated', 'animate__lightSpeedInRight')
          node.addEventListener('animationend', (data) => {
            if (data.animationName === 'lightSpeedInRight') {
              node.classList.remove(`animate__animated`, 'animate__lightSpeedInRight')
            }
          })
        } else {
          this.$refs.actionList.classList.add('animate__animated', 'animate__lightSpeedOutRight')
          this.$refs.actionList.addEventListener('animationend', (data) => {
            if (data.animationName === 'lightSpeedOutRight') {
              this.$refs.actionList.style.display = 'none'
              node.classList.remove(`animate__animated`, 'animate__lightSpeedOutRight')
            }
          })
        }
      },
      onCreate(category){
        this.editName = category.follow_status
        this.isEdit = false
        this.options.name = null
        this.dialogTitle = '新增'
        this.dialogVisible = true
      },
      onEdit(category){
        this.editName = category.follow_status

        this.isEdit = true
        this.options = {name: this.category.name}
        this.dialogTitle = "编辑"
        this.dialogVisible = true
      },
      onDelete(category){
        this.editName = category.follow_status

        //TODO 2020/8/13  RUOWENG 请求删除接口
        if(this.category.customerList && this.category.customerList.length){
          this.$notify({
            title: '警告',
            message: '含有客户的分类无法被删除',
            type: 'warning'
          })
        }
        if(this.category.name === '未分类'){
          this.$notify({
            title: '警告',
            message: "未分类标签不可被删除！",
            type: 'warning'
          })
        }
        deleteCategory({status: this.editName}).then(res =>{
          this.onEmit()

        })
      },
      onSubmit(){
        //TODO 2020/8/13  RUOWENG 写入数据库
        let status = this.options.name
        if(this.isEdit){
          let params = {
            old_name: this.editName,
            new_name: status
          }
          updateCategory(params).then(res =>{
            this.onEmit()
            this.dialogVisible = false
          })
        }else{
          addCategory({status}).then(res =>{
            this.onEmit()
            this.dialogVisible = false
          })
        }
        //TODO 2020/8/13  RUOWENG 数据返回后，$emit 方法，重新绘制页面，布局改变了
      },
      onCancel(){
        this.dialogVisible = false
      },
      onEmit(){
        this.$emit('change-category',{success: true})
      },
      dragStart(e){
        console.log("开始拖拽",e)
      },
      dragEnd(e){
        console.log("结束拖拽",e)
        let {form, to, target} = e
        if(form !== to){
          this.customerId = e.item.id
          let index = Number(R.last(to.className))
          let follow_status = this.categoryList[index].follow_status
          this.changeStatus(follow_status)
        }
      },
      changeStatus(data){
        let params = {
          "external_user_id":this.customerId,
          "follow_status":data
        }
        updateCustomerStatus(params).then(res =>{
          this.$message({
            type:'success',
            message:'操作成功'
          })
        })
      }
    }
  }
</script>

<style lang="less" scoped>
  @import '~animate.css';
  .category-container{
    width: 250px;
    height: 100%;
    background:rgba(255,255,255,1);
    box-shadow:0px 0px 4px 0px rgba(0,0,0,0.03);
    border-radius:4px;
    border:1px solid rgba(232,232,232,1);
    padding: 14px;

    .header{
      width: 100%;
      height: 50px;

      .title{
        font-size:14px;
        font-family:PingFangSC-Medium,PingFang SC;
        font-weight:500;
        color:rgba(51,51,51,1);
        line-height:20px;
      }
      .count{
        height:17px;
        font-size:12px;
        font-family:PingFangSC-Regular,PingFang SC;
        font-weight:400;
        color:rgba(119,119,119,1);
        line-height:17px;
      }
    }
    .content-container{
      width: 100%;
      min-height: 130px;
      height: calc(~"100% - 60px");
      overflow: auto;
      .dragArea{
        min-height: 120px;
      }
    }
  }
  .action-list{
    display:none;
    width: 70px;
  }
</style>
