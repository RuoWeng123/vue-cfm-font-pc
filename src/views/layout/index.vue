<template>
  <div class="container-warp">
    <el-header style="height: 48px;">
      <span class="root-header">
        <div class="logo inline-block"></div>
        <div class="inline-block ml10">
          <span class="title">好客跟进•</span>
          <span class="info">专业访客管理服务平台</span>
        </div>
      </span>
      <span class="header-right">
       <!-- <span class="notify">
          <el-badge :value="12" class="item">
            <i class="el-icon-bell">通知</i>
          </el-badge>
        </span>
        <span class="message">
          <el-badge :value="12" class="item">
            <i class="el-icon-message">私信</i>
          </el-badge>
        </span>-->
        <el-dropdown trigger="click" class="root-exit">
          <span class="el-dropdown-link">
            {{user.name}}<i class="el-icon-caret-bottom el-icon--right"></i>
          </span>

          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item class="clearfix">
              <span
                @click="onExit">退出</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>

      </span>
    </el-header>
    <el-container>
      <el-aside width="175px">
        <project-menu
          class="page-menu"
        />
      </el-aside>
      <el-main>
        <router-view class="content-page"/>
      </el-main>
    </el-container>

    <my-drawer
      class="my-drawer"
      id="actionDrawer">
      <div slot="header" style="text-align: center">
        <i class="el-icon-close cursor-point" style="width: 20px;height: 20px;float:left;" @click="onCloseDrawer"></i>
        <span style="text-align: center">客户信息</span>
      </div>
      <customer-detail slot="container" :customer-id="customer.external_user_id"></customer-detail>
    </my-drawer>
  </div>
</template>

<script>
  import ProjectMenu from '@/components/ProjectMenu'
  import {getUserInfoByToken} from "@/common/api"
  import myDrawer from '@/components/myDrawer'
  import CustomerDetail from '@/components/customerDetail'
  import bus from "@/util/bus"
  import * as R from 'ramda'
  export default {
    components: {
      ProjectMenu,
      CustomerDetail,
      myDrawer
    },
    data(){
      return{
        isRouterAlive: false,
        bodyHeight: 800,
        showDrawer:false,
        customer:{},
        user:{
          name: "admin"
        }
      }
    },
    computed:{
      token: function(){
        return window.localStorage.getItem('bingfeng_token')
      }
    },
    methods: {
      onExit () {
        window.localStorage.setItem('bingfeng_token', '')
        window.localStorage.setItem('bingfeng_user',null)
        this.$router.push('/login')
      },
      getUserInfo(token){
        getUserInfoByToken().then(res =>{
          console.log("用户信息",res)
          this.user = res.data.data
          window.localStorage.setItem('bingfeng_user',this.user.name)
        }).catch(err =>{
          //this.$message.error("用户信息未获取")
          this.user.name = "用户名"

        })
      },
      onCloseDrawer(){
        this.showDrawer = false
        this.renderClassInRight()
      },
      renderClassInRight () {
        let node = document.getElementById("actionDrawer")
        if(R.isEmpty(this.customer) || !this.customer.external_user_id){
          node.style.display = 'none'
          return
        }
        //this.showDrawer = !this.showDrawer
        console.log('show_state', this.showDrawer)
        if(!node) return
        if(this.showDrawer && node.style.display === 'block') return
        //TODO 2020/6/10  RUOWENG  因为每次执行不同操作，所以每次执行完了，从node列表中移除掉，避免下次影响
        if (this.showDrawer) {
          node.style.display = 'block'
          // node.add('animate__animated', 'animate__fadeInRight')
          // node.addEventListener('animationend', (data) => {
          //   if (data.animationName === 'fadeInRight') {
          //     node.remove(`animate__animated`, 'animate__fadeInRight')
          //   }
          // })
        } else {
          node.style.display = 'none'
          // node.add('animate__animated', 'animate__fadeOutRight')
          // node.addEventListener('animationend', (data) => {
          //   if (data.animationName === 'fadeOutRight') {
          //     node.style.display = 'none'
          //     node.remove(`animate__animated`, 'animate__fadeOutRight')
          //   }
          // })
        }
      }
    },
    created(){
      console.log(this.$route)
      if(this.$route.redirectedFrom === '/customer'){
        window.location.reload()
      }
    },
    mounted () {
      this.getUserInfo()
      this.bodyHeight = document.getElementsByTagName('body')[0].attributes.style.ownerElement.scrollHeight
      let _this = this
      bus.$on('customerDrawer',(customer) =>{
        _this.customer = customer
        _this.showDrawer = true
        _this.renderClassInRight()
      })
      bus.$on('closeDrawer', () =>{
        _this.onCloseDrawer()
      })
    },
    watch:{
      token: function(val){
        this.getUserInfo(val)
      }
    }
  }
</script>

<style
  lang="scss"
  scoped>
  .page-left {
    display: flex;
    flex-direction: column;
    background-color: #272a47;
    width: 100%;
    height: 100%;
  }

  .page-menu {
    box-sizing: border-box;
    flex: 1;
    background:rgba(255,255,255,1);
    color:rgba(51,51,51,1);
    overflow-x: hidden;
    overflow-y: auto;

    &::-webkit-scrollbar {
      display: none;
    }
  }
  .my-drawer{
    display:none;
    position:absolute;
    width: 400px;
    right:0;
    top:0px;
    background: #ffffff;
    z-index: 1001;

    .header{
      height: 50px;
      line-height: 50px;
    }
  }
</style>

<style
  lang="less"
  scoped>
  @import '~animate.css';
  .container-warp {
    height: 100%;
    overflow: hidden;

    .custom-aside {
      &::-webkit-scrollbar {
        display: none;
      }

      img {
        width: 80%;
        margin-top: 10px;
      }
    }
  }

  .el-header {
    display: flex;
    justify-content: space-between;
    background:rgba(94,129,244,1);
    box-shadow: 0 1px 0 0 #e5e6eb;
    text-align: left;
    line-height: 48px;
    color:rgba(255,255,255,1);

    .root-header {
      text-align: center;
      .logo{
        width: 48px;
        line-height: 48px;
        height: 40px;
        background: url('~@/assets/logo.png') no-repeat center center;
        background-size: contain;
        float: left;
      }
      .title{
        font-size:18px;
        font-family:PingFangSC-Regular,PingFang SC;
        font-weight:400;
        color:rgba(255,255,255,1);
        line-height:25px;
        -webkit-background-clip:text;
      }
      .info{
        font-size:14px;
        font-family:PingFangSC-Thin,PingFang SC;
        font-weight:100;
        color:rgba(255,255,255,1);
        line-height:20px;
        -webkit-background-clip:text;
      }
    }
  }

  @aside-width: 10px;
  .el-aside {
    text-align: center;
    height: 100%;
    display: inline-block;
    border:1px solid rgba(232,233,239,1);
    .logo-area {
      display: block;
      height: 48px;
      line-height: 48px;
      margin: auto;
      background: #ffffff;
      box-shadow: 0 1px 0 0 rgba(0, 0, 0, 0.55);
    }
  }

  .header-right{
    font-size: 12px;
    width: 300px;
    display: inline-block;
    text-align: right;
    margin-right: 14px;

    .notify{
      width: 88px;
      display: inline-block;
    }
    .message{
      width: 88px;
      display: inline-block;
    }
    .root-exit {
      width: 100px;
      font-size: 12px;
      color: #ffffff;
      display: inline-block;
    }
  }


  .el-main {
    background-color: #f5f6fa;
    color: #333;
    text-align: left;
    width: calc(~"100% - 161px");
    height: 100%;
    display: inline-block;
    position: absolute;
    overflow-y: auto;
    overflow-x: hidden;
    .c-header-title {
      font-size: 18px;
      text-align: left;
      font-family: PingFangSC-Medium;
      color: #666666;
      margin-bottom: 16px;
    }

    .content-page {
      height: 100%;
      box-sizing: border-box;
    }
  }

  .el-container {
    margin-bottom: 0px;
    display: inline-block;
    width: 100%;
    position: absolute;
  }

  .el-container:nth-child(1) {
    height: 60px;
  }

  .el-container:nth-child(2) {
    height: calc(~"100% - 60px");
  }
</style>
