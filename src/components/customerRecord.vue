<template>
  <div class="chat-container">
    <div class="chat-item" :class="{'is-current-user':currentUser === item.user}" v-for="item in chatList"
         :key="item.update_at">
      <div class="img-container">
        <img src="../assets/user-icon.png" alt=""
             style="width: 50px;height: 50px;">
      </div>
      <div class="content-container">
        <div class="header">
          <span class="update-time mr16">{{item.update_at}}</span>
          <span class="name">{{item.user}}</span>
        </div>
        <div class="content">
          {{item.content}}
        </div>
      </div>

    </div>
  </div>
</template>

<script>
  export default {
    name: 'CustomerRecord',
    data(){
      return {
        currentUser:'弱翁',
        chatList:[
          {user:'弱翁', update_at:'2020/08/29 12:12', content:'客户预先支付来 双十一的定金20W'},
          {user:'杨开', update_at:'2020/08/14 12:12', content:'客户转移至京东'},
          {user:'杨开', update_at:'2020/08/11 10:10', content:'对手给出的报价是我们报价的78%'},
          {user:'杨开', update_at:'2020/08/10 12:12', content:'改客户有初步成单意向'},
          {user:'杨开1', update_at:'2020/08/1 12:12', content:'测试向上滚动加载历史数据的效果'},
          {user:'杨开2', update_at:'2020/08/2 12:12', content:'测试向上滚动加载历史数据的效果'},
          {user:'杨开3', update_at:'2020/08/3 12:12', content:'测试向上滚动加载历史数据的效果'},
          {user:'弱翁', update_at:'2020/08/4 12:12', content:'测试向上滚动加载历史数据的效果'}
        ]
      }
    },
    methods:{

    }
  }
</script>

<style lang="less" scoped>
  .chat-container{
    display: flex;
    flex-direction: column-reverse;
    flex-wrap: nowrap;
    height: 100%;
    overflow: auto;

    .chat-item{
      display: inline-flex;
      margin-top: 16px;
      .image-container{
        width: 50px;
        height: 50px;
        margin-left: 5px;
        margin-right: 5px;
      }

      .content-container{
        width: 270px;
        min-height: 80px;
        font-size: 14px;
        .header{
          height: 25px;
          line-height: 25px;
        }
        .content{
          width: auto;
          padding: 10px;

          font-size: 12px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #333333;
          line-height: 15px;

          background: #EFF2FE;
          border-radius: 4px;
        }
      }
    }
    .is-current-user{
      flex-direction: row-reverse;

      .content-container{
        justify-items: flex-end;
        .header{
          display: inline-flex;
          flex-direction: row;
          align-items: flex-end;
        }
        .content{

          font-size: 12px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #FFFFFF;
          line-height: 15px;
          background: #5F82F5;
          border-radius: 4px;
          opacity: 1;
        }
      }

    }
  }
</style>
