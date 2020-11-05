<!--企业标签-->
<template>
  <div>
    <div class="group-card"
         v-for="item in copyTags"
         :key="item.group_name">
      <div class="title">
        <span class="label">分组: {{item.group_name}}</span>
      </div>
      <div class="group-container">
         <span v-for="(subItem) in item.tags"
               :key="subItem.name"
               class="tag-item ml5 mr5"
               :class="{'status-1': subItem.status === 1}">
          <span class="tag-name"
                @click="updateStatus(subItem)">{{subItem.name}}</span>
          </span>
      </div>
    </div>
    <div class="footer alR">
      <el-button type="default"
                 @click="onClose">取消
      </el-button>
      <el-button type="primary"
                 @click="onSave">确定
      </el-button>
    </div>
  </div>
</template>

<script>
  import {createCompanyTag} from "@/common/api"
  import * as R from 'ramda'
  export default {
    name: 'companyEditTag',
    props: ['customerId','tags'],
    data(){
      return{
        copyTags: []
      }
    },
    methods: {
      updateStatus (row) {
        row.status = row.status ? 0 : 1
      },
      onClose () {
        this.$emit('close',false)
      },
      onSave () {
        let params = {
          external_user_id: this.customerId,
          tags: this.copyTags.map(v => v.tags).flat()
        }
        createCompanyTag(params).then(res =>{
          this.$message.success('操作成功')
          this.onClose()
        }).catch(err =>{

        })
      }
    },
    mounted () {
      this.copyTags = JSON.parse(JSON.stringify(this.tags))
    },
    watch:{
      tags: function(){
        this.copyTags = JSON.parse(JSON.stringify(this.tags))
      }
    }
  }
</script>


<style lang="less" scoped>
  .group-card{

    .title{
      height: 30px;
      line-height: 40px;
      font-size: 13px;
      font-weight: bold;
    }

    .group-container{
      font-size: 12px;
      padding: 16px 5px;

      .tag-item{
        margin-left: 5px;
        margin-right: 5px;
        display: inline-block;
        padding: 8px 10px;
        border-radius: 3px;
        background: #F4F4F4;
        color: #333333;
        cursor: pointer;
      }

      .status-1{
        background: #5E81F4;
        color: #ffffff;
      }
    }
  }
</style>
<style lang="less"
       scoped>

  .person-tag-dialog {
    height: 340px;
    display: flex;
    flex-direction: column;

    .header {
      width: 100%;
    }

    .tag-area {
      width: 100%;
      height: 290px;
      padding: 10px 0px;

      .tag-item {
        display: inline-block;
        padding: 8px 10px;
        border-radius: 3px;
        background: #F4F4F4;
        color: #333333;
        cursor: pointer;
      }

      .status-1 {

      }
    }

    .footer {
      width: 100%;
      height: 40px;
    }
  }
</style>
