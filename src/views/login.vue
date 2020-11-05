<template>
  <div class="login-page">
    <div class="header">
      <span class="root-header">
        <div class="logo inline-block"></div>
        <div class="inline-block ml10">
          <span class="title">好客跟进•</span>
          <span class="info">专业访客管理服务平台</span>
        </div>
      </span>
      <div class="action-area pull-right" style="margin-right: 100px;padding-top: 10px; width: 240px;display: flex;">
        <span href="javascript:;" @click="onLogin" style="width: 150px;height: 30px;display: inline-block"><img
          src="//wwcdn.weixin.qq.com/node/wwopen/wwopenmng/style/images/independent/brand/150x30_blue$6d6141e5.png"
                                    srcset="//wwcdn.weixin.qq.com/node/wwopen/wwopenmng/style/images/independent/brand/150x30_blue_2x$865922a3.png 2x" alt="企业微信登录"></span>
        <el-button class="ml16" type="primary" @click="onRegistry"
                   style="margin-right: 16px; background:#2985DD;height: 31px;margin-top:1px">注册
        </el-button>
      </div>

    </div>
    <div class="login-container">
        这里是官网内容面板
    </div>
  </div>
</template>

<script>
import {AuthLogin, AuthRegistry, setToken } from '@/common/api'

export default {
  data() {
    return {

    }
  },
  mounted() {
    this.onInit()
  },
  methods: {
    onInit(){
      let Authorization = this.$route.fullPath.split('=')[1] ? this.$route.fullPath.split('=')[1] : null
      if (Authorization) {
        setToken(Authorization)
        this.$router.push({path:'/customer'})
      } else if (window.localStorage.getItem('bingfeng_token')) {
        setToken()
        //this.$router.push({path:'/customer'})
      } else {
        //常规登录页面无需处理
      }
    },
    onRegistry(){
      AuthRegistry().then(res =>{
        window.open(res.data.url)
      })
    },
    onLogin(){
      AuthLogin().then(res =>{
        console.log("页面返回",res.data.url)
        if(!res.data || !res.data.url){
          this.$message.error("服务器错误")
          return
        }
        window.open(res.data.url)
      })
    }
  },
  watch:{
    '$route':function(){
      this.onInit()
    }
  }
}
</script>

<style
  lang="less"
  scoped>
.login-page {
  position: fixed;
  bottom: 0;
  top: 0;
  width: 100%;
  background: #FFFFFF;
  background-size: 100% 100%;
  .header{
    height: 50px;
    line-height: 50px;
    padding-left: 16px;

    .root-header {
      text-align: center;
      .logo{
        width: 48px;
        line-height: 50px;
        height: 50px;
        background: url('~@/assets/logo-white.png') no-repeat center center;
        background-size: contain;
        float: left;
      }
      .title{
        font-size:18px;
        font-family:PingFangSC-Regular,PingFang SC;
        font-weight:400;
        color:#2985DD;
        line-height:25px;
        -webkit-background-clip:text;
      }
      .info{
        font-size:14px;
        font-family:PingFangSC-Thin,PingFang SC;
        font-weight:100;
        color:#2985DD;
        line-height:20px;
        -webkit-background-clip:text;
      }
    }
  }
  .login-container {
    width: 382px;
    height: 486px;
    position: absolute;
    top: 50%;
    right: 30%;
    // margin-left: -216px;
    margin-top: -208px;
    color:#ffffff;
  }

  .login-top {
    // overflow: hidden;
    margin-bottom: 10px;
    width: 382px;
    text-align: center;

    p,
    h2 {
      float: left;
    }
  }

  .clearfix:after {
    display: block;
    clear: both;
    content: '';
    visibility: hidden;
    height: 0;
  }

  .clearfix {
    zoom: 1;
  }

  .login-title {
    // line-height: 50px;
    margin-top: 10px;
    margin-left: 15px;
    padding-left: 15px;
    border-left: 1px solid #ffffff;
    font-size: 26px;
    color: #ffffff;
  }

  .login-logo {
    width: 166px;
    height: 44px;
    margin-top: 5px;
    // margin: 47px 0 0 40px;
    background-size: contain;
  }

  .box-card {
    height: 358px;

    .card-title {
      font-size: 27px;
      color: #4a4a4a;
    }

    .card-btn {
      width: 100%;
    }
    .card-form{

      .content{
        height: 200px;
      }
      .qrcode{
        height: 240px;
        padding: 0px 70px 10px 70px;
      }
      .footer{
        width: 100%;
        height: 50px;
      }
      .register{
        width: 100%;
        text-align: right;
        height: 40px;
        bottom: 0px;
        padding: 0px 0px 10px 0px;
      }
    }
  }
}
</style>

<style lang="less">
.login-page {

}
</style>
