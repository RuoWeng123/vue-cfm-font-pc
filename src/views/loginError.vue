<template>
  <div class="container">
    <div class="footer">
      上海冰丰科技有限公司
    </div>
    <div class="content">
      <div class="popup">
        <login-error-1 v-if="errorType === '1'"></login-error-1>
        <login-error-2 v-if="errorType === '2'"></login-error-2>
      </div>
    </div>

  </div>
</template>

<script>
  import loginError1 from './layout/loginError1'
  import loginError2 from './layout/loginError2'
  export default {
    name: 'loginError',
    components:{loginError1, loginError2},
    data(){
      return {
        errorType:1
      }
    },
    created(){
      window.reload()
    },
    mounted () {
      let {type} = this.$route.query
      if(!type) {
        this.$router.push({path:'/'})
      }else{
        this.errorType = type
      }
    }
  }
</script>

<style lang="less" scoped>
  .container{
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column-reverse;

    .content{
      width: 100%;
      flex: 1;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      .popup{
        width:360px;
        height: 360px;
        display: block;
        border: 1px solid #e4e4e4;
      }
    }

    .footer{
      width: 100%;
      height: 60px;
      text-align: center;
      line-height: 60px;
      font-size: 12px;
      color:gray;
    }
  }
</style>
