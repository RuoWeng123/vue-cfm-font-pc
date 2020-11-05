<template>
  <div class="error-container">
    <div class="logo"></div>
    <div class="title mb10">
      登录失败，企业未授权
    </div>
    <div class="info mb10">
      您正在登录的企业未被授权，请重新选择企业或者注册好客跟进，如有疑问请 <a href="javascript:void(0)" @click="onCustomer">联系客户</a>
    </div>
    <div class="button-area mb10">
      <el-button type="primary" @click="jumpTo" style="width: 250px;" size="default">重新登录</el-button>
    </div>
    <div class="redirected">
      如何添加第三方应用? <a href="https://zhuanlan.zhihu.com/p/151369325">查看教程</a>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'loginError1',
    data(){
      return{

      }
    },
    methods:{
      jumpTo(){
        this.$router.push({path:"/"})
      },
      onCustomer(){
        this.$message.info("联系人：杨开。微信：开Richard")
      }
    }
  }
</script>

<style lang="less" scoped>
  .error-container{
    display: flex;
    justify-content: center;
    flex-direction: column;
    width: auto;
    height: 100%;
    padding: 14px;
    align-items: center;


    a{
      text-decoration: none;
    }
    .logo{
      width: 150px;
      height: 150px;
      background: url('~@/assets/set_error.png') no-repeat center center;

    }
    .title{
      width: 100%;
      display: block;
      align-items: center;
      text-align: center;
      font-size: 18px;
      font-weight: bold;
    }
    .info{
      font-size: 14px;
      width: 100%;
      display: block;
      text-align: center;
      color: #535353;
    }
    .button-area{
      width: 100%;
      display: block;
      text-align: center;
      height: 50px;
      line-height: 50px;
    }
    .redirected{
      width: 100%;
      display: block;
      text-align: center;
      font-size: 14px;
    }
  }
</style>
