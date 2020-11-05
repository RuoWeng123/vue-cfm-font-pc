<!--企业标签-->
<template>
  <div class="group-card">
    <div class="header"
         v-for="item in copyTags"
         :key="item.group_name">
      <div class="title">
        <span class="label">分组: {{item.group_name}}</span>
      </div>
      <div class="tag-area">
         <span v-for="(subItem) in item.tags"
               :key="subItem.name"
               class="tag-item ml5 mr5"
               :class="{'status-1': subItem.status === 1}">
          <span class="tag-name"
                @click="updateStatus(subItem)">{{subItem.name}}</span>
          </span>
      </div>
    </div>
    <div class="footer">
      <div class="default"
           @click="onClose">取消
      </div>
      <div class="info"
           @click="onSave">确定
      </div>
    </div>
  </div>
</template>

<script>
  import {createCompanyTag} from "@/common/api"
  import { Toast } from 'vant'

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
        this.$emit('onClose',false)
      },
      onSave () {
        let params = {
          external_user_id: this.customerId,
          tags: this.copyTags.map(v => v.tags).flat()
        }
        createCompanyTag(params).then(res =>{
          Toast.success('操作成功')
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


<style lang="less"
       scoped>
  .group-card {
    height: 340px;
    display: flex;
    flex-direction: column;

    .header {
      width: 100%;
      padding: 0px 14px;
    }

    .tag-area {
      width: 100%;
      height: 105px;
      padding: 10px 10px;

      .tag-item {
        display: inline-block;
        padding: 8px 10px;
        border-radius: 3px;
        background: #F4F4F4;
        color: #333333;
        cursor: pointer;
        margin-bottom: 10px;
      }

      .status-1 {
        background: #5E81F4;
        color: #ffffff;
      }
    }

    .footer {
      width: 100%;
      height: 50px;
      line-height: 50px;
      border-top: 1px solid #E6E6E6;
      display:flex;
      flex-direction: row;
      justify-content: space-around;

      .default{
        width: 49vw;
        text-align: center;
        border-right: 1px solid #E6E6E6;
      }
      .info{
        width: 49vw;
        color: #5E81F4;
        text-align: center;
      }
    }
  }
</style>
