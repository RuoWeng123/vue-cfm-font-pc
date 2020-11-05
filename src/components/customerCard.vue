<template>
  <div class="customer-card" >
    <div @dblclick="dbClick()">
      <div class="first-container mb14">
        <div class="img-container pull-left">
          <avatar :username="userName.substr(0,7)"  :size="40" style="width: 40px;height: 40px;"></avatar>
        </div>
        <div class="detail-status" style="margin-left: 50px; padding-top:5px;" >
          <span class="customer-name mb8">{{customer.name}}</span>
          <div class="customer-wechat">{{customer.wx_type}}</div>
        </div>
      </div>
      <div class="last-time mb10 mt5">
        上次跟进: <span class="ml10">{{customer.latest_follow_time}}</span>
      </div>
      <div class="employee">
        当前归属: <span class="ml10">{{customer.employee}}</span>
      </div>
    </div>


  </div>
</template>

<script>
  import Avatar from 'vue-avatar'
  import moment from 'moment'
  export default {
    name: 'customerCard',
    props:['customer'],
    components:{Avatar},
    data(){
      return {
        showDrawer:false
      }
    },

    computed: {
      userName: function(){
        return this.customer.name.replace(/\s*/g,'')
      }
    },
    filters:{
      filterCustomerTime: function(data){
        return moment((new Date(data).getTime()) + 28800000).format('YYYY-MM-DD HH:mm:ss')
      }
    },
    methods:{
      dbClick(){
        this.$emit('dbClick',this.customer)
      },
      updateStatus(){
        //TODO 2020/8/13  RUOWENG 弹出跟新状态的弹出，的窗口修改，
        // 这里最好是拖拽修改
      }
    },
    mounted () {

    }
  }
</script>

<style lang="less" scoped>
.customer-card{
  background:rgba(255,255,255,1);
  box-shadow:0px 0px 4px 0px rgba(0,0,0,0.03);
  border-radius:4px;
  border:1px solid rgba(232,232,232,1);
  padding: 14px;
  display: flex;
  flex-direction: column;
  align-content: flex-start;

  .first-container{
    width: 100%;
    height: 40px;

    .img-container{
      width: 30px;
      height: 30px;
      display: inline-block;
      img{
        width:30px;
        height:30px;
        border-radius:2px;
      }
    }
    .customer-name{
      display: block;
      width: 175px;
      height:12px;
      font-size:12px;
      font-family:PingFangSC-Regular,PingFang SC;
      font-weight:400;
      color:rgba(51,51,51,1);
      line-height:12px;
      vertical-align: top;
      overflow: hidden;
      text-overflow:ellipsis; white-space: nowrap;
    }

    .customer-wechat{
      width: 100%;
      height:12px;
      font-size:12px;
      font-family:PingFangSC-Regular,PingFang SC;
      font-weight:400;
      color:rgba(94,129,244,1);
      line-height:12px;
    }
  }



  .last-time{
    display: block;
    width: 100%;
    height:12px;
    font-size:12px;
    font-family:PingFangSC-Regular,PingFang SC;
    font-weight:400;
    color:rgba(51,51,51,1);
    line-height:12px;
  }
  .employee{
    width: 100%;
    height:12px;
    font-size:12px;
    font-family:PingFangSC-Regular,PingFang SC;
    font-weight:400;
    color:rgba(51,51,51,1);
    line-height:12px;
  }
}
</style>
