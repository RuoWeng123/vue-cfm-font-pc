

<template>
  <div style="width: 100%;">
    <div class="header" v-if="title">
      <span class="border-left"></span>
      <span class="font-title">{{title}}</span>
      <van-button class="pull-right" type="info" size="mini" icon="plus" @click="onEdit" v-if="showEdit">编辑</van-button>
    </div>
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Card',
    props:{
      title:{
        type: String,
        default: null
      },
      showEdit:{
        type: Boolean,
        default: false
      }
    },
    data(){

    },
    methods:{
      onEdit(){
        this.$emit('onEdit',true)
      }
    }
  }
</script>

<style lang="less" scoped>
  .header{
    width: auto;
    height: 30px;
    line-height: 30px;
    padding-right: 16px;
    font-size: 16px;

    .border-left{
      width:2px;
      border-left: 2px solid #5E81F4;
      height: 20px;
      margin-right: 14px;
    }
    .font-title{

      font-size: 16px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: #333333;
      line-height: 22px;
    }
  }
  .content{

    background: #F9F9F9;
    border-radius: 2px;
    padding: 10px;
    font-size: 12px;
    .label{
      font-size: 12px;
    }
    color: #666666;
  }
</style>
