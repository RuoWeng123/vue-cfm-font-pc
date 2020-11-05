<template>
  <div class="person-tag-dialog">
    <div class="header">
      <el-input type="text"
                v-model="keyword"
                placeholder="搜索或创建标签，回车即可创建标签"
                @change="filterTag"></el-input>
    </div>
    <div class="tag-area">
      <span v-for="(item,index) in showTags"
            :key="item.tag_id"
            class="tag-item ml5 mr5 mb5"
            :class="{'status-1': item.status === 1}">
        <span class="tag-name"
              @click="updateStatus(item)">{{item.tag_name}}</span>
        <i class="el-icon-close ml5"
           @click="deleteTag(index)"></i>
      </span>

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
  import {createPersonTag, getPersonTags} from "@/common/api"
  export default {
    name: 'personTag',
    props: {
      customerId: {
        type: String,
        default: ""
      },
      show: {
        type: Boolean,
        default: false
      }
    },
    data () {
      return {
        personTags: [],
        showTags: [],
        keyword: null,
        deleteTags:[]
      }
    },
    mounted () {
      this.onInit()
    },
    methods: {
      onInit () {
        getPersonTags({externalUserId: this.customerId}).then(res =>{
          this.personTags = res.data.data.tags
          this.showTags = this.personTags
        })
      },
      filterTag (data) {
        if (!data) {
          this.showTags = this.personTags
          return
        }
        if(this.personTags){
          this.showTags = this.personTags.filter(v => v.tag_name.startsWith(data))
        }
        if (!this.showTags.length && data) {
          this.personTags.push({ tag_name: data, status: 0 })
          this.showTags = this.personTags
          this.keyword = null
        }
      },
      onClose () {
        this.$emit('onClose')
      },
      onSave () {
        let params = {
          external_user_id: this.customerId,
          change_tags: this.personTags.filter( v=> v.tag_name).map(item => {
            return Object.assign({}, item ,{name: item.tag_name})
          }),
          delete_tags: this.deleteTags
        }
        createPersonTag(params).then(res =>{
          this.onClose()
        }).catch(err =>{})

      },
      updateStatus (row) {
        row.status = row.status ? 0 : 1
      },
      deleteTag (index) {
        const target = this.showTags[index]
        target && target.tag_id ? this.deleteTags.push(target.tag_id) : false
        this.showTags.splice(index, 1)
      }
    },
    watch:{
      show: function(val){
        if(val){ this.onInit() }
      }
    }
  }
</script>

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
        background: #5E81F4;
        color: #ffffff;
      }
    }

    .footer {
      width: 100%;
      height: 40px;
    }
  }
</style>
