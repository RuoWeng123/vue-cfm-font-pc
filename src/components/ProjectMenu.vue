<template>
  <ul class="project-menu">
    <li class="first-li"  v-for="item in tree" :key="item.name">
      <div class="content" @click="onSelect(item)">{{item.label}}</div>
      <ul v-if="item.children && item.children.length" class="ul-children">
        <li class="second-li" v-for="subItem in item.children" :key="subItem.name"
             :class="{'is-current': currentPath === subItem.path}" >
          <div class="content"
               :class="{'is-current-div': currentPath === subItem.path}"
               @click="onSelect(subItem)">{{subItem.label}}</div>
        </li>
      </ul>
    </li>
  </ul>
</template>

<script>
  import {routers} from '@/router/router'
  import bus from "@/util/bus"
  import * as R from 'ramda'
  export default {
    name: 'ProjectMenu',
    data () {
      return {
        selectedPath:null,
        currentPath: '/customer/myCustomer',
        props: { children: 'children', label: 'label', value: 'name' },
        tree: [
          {
            path: '/customer',
            name: 'customer',
            label: '客户跟进',
            children: [
              {
                path: '/customer/myCustomer',
                name: 'customer_myCustomer',
                label: '我的客户'
              },
              {
                path: '/customer/overview',
                name: 'csutomer_overview',
                label: '客户分析'
              }
            ]
          },
          {
            path: '/company',
            name: 'company',
            redirect: '/company/list',
            label: '企微群管',
            children: [
              {
                path: '/company/list',
                name: 'company_list',
                label: '群客户列表'
              },{
                path: '/company/analyse',
                name: 'company_analyse',
                label: '群客户分析'
              }
            ]
          },
          {
            path: '/wechatUtils',
            name: 'wechatUtils',
            label: '企微工具',
            children: [
              // {
              //   path: '/wechatUtils/writeNote',
              //   name: 'wechatUtils_writeNote',
              //   label: '渠道二维码'
              // },
              {
                path: '/wechatUtils/quickReply',
                name: 'wechatUtils_quickReply',
                label: '快速回复'
              }
            ]
          }
        ]
      }
    },
    mounted () {
      this.currentPath = this.$route.path
      this.onInit()
    },
    created(){
      this.onInit()
    },
    methods: {
      async onInit () {
        this.tree = routers.slice(3,8)
      },
      onSelect (data) {
        this.selectedPath = data.name
        this.$router.push({ path: data.path })
        bus.$emit('closeDrawer',false)
      }
    },
    watch:{
      "$route": function(){
        this.currentPath = this.$route.path
      }
    }
  }
</script>

<style lang="less" scoped>
ul{
  padding-inline-start: 0px;
  list-style: none;
  width: 173px;
  li{
    list-style-type: none;
    text-align: left;
  }
}
  .project-menu {
    width: 173px;
    height: calc(~"100% - 40px");
    background: #ffffff;


    .first-li{
      height: auto;
      margin-bottom: 20px;
      font-size:12px;
      font-family:PingFangSC-Regular,PingFang SC;
      font-weight:400;
      color:rgba(119,119,119,1);

      .is-current{
        background:rgba(94,129,244,1);
        color: #ffffff;
      }

      .content{
        line-height:40px;
        padding-left: 32px;

        &:hover{
          background:rgba(94,129,244,1);
          color: #ffffff;
        }

      }

      .second-li{
        font-size:14px;
        font-family:PingFangSC-Regular,PingFang SC;
        font-weight:400;
        color:rgba(51,51,51,1);
        padding-left: 0px;
      }
      .is-current-div{
        color: #ffffff;
      }
    }


    .ul-children{

    }



    .el-tree-node:focus > .el-tree-node__content {
      background: #3f59d9;
    }

    .el-tree-node__content {
      height: 40px;

      &:hover {
        background: #3f59d9;
      }
    }

    .el-tree-node .is-current {
      background: #3f59d9;
    }
  }
</style>
