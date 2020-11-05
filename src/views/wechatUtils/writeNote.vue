<template>
  <div>
    <el-tabs v-model="selectedTab" type="card">
      <el-tab-pane label="写跟进" name="first" style="padding: 0px 0px 10px 0px">
      </el-tab-pane>
    </el-tabs>
    <div class="note-container">
      <div class="left"></div>
      <div class="right"></div>
    </div>
  </div>

</template>

<script>
  export default {
    name: 'qrCode',
    data(){
      return{
        selectedTab: 'first'
      }
    }
  }
</script>

<style lang="less" scoped>
  .note-container{
    width: 100%;
    height: 90%;
    padding: 14px;
    display: flex;
    justify-content: space-around;
    flex-direction: row;
    align-items: center;
    .left{
      width: 400px;
      height: 400px;
      background: url("~@/assets/genjin_1.png");
      background-size: contain;
    }
    .right{
      width: 400px;
      height: 400px;
      background: url("~@/assets/genjin_2.png");
      background-size: contain;
    }
  }
</style>
