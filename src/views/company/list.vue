<template>
  <div>
    <el-tabs v-model="selectedTab" type="card">
      <el-tab-pane label="群客户列表" name="first"></el-tab-pane>
    </el-tabs>
    <p>

      好客跟进，群客户列表正在开发中，如果意向，请联系 <br>
      姓名: 杨开  <br>
      微信: 开Richard
    </p>
  </div>
</template>

<script>
export default {
  data(){
    return{
      selectedTab:'first'
    }
  }
}
</script>

<style>

</style>
