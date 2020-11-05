<!--企业标签-->
<template>
  <div>
    <div class="group-card"
         v-for="item in tags"
         :key="item.group_name">
      <div class="title">
        <span class="label">{{item.group_name}}</span>
      </div>
      <div class="group-container">
         <span v-for="(subItem) in item.tags"
               :key="subItem.name"
               class="tag-item ml5 mr5"
               :class="{'status-1': subItem.status === 1}">
          <span class="tag-name"
                @click="updateStatus(subItem)">{{subItem.name}}</span>
          </span>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'companyTag',
    props: ['tags'],
    methods: {
      updateStatus (row) {
        row.status = row.status ? 0 : 1
      },
      deleteTag (index) {
        this.showTags.splice(index, 1)
      }
    },
    mounted () {

    }
  }
</script>

<style lang="less" scoped>
  .group-card{

    .title{
      height: 30px;
      line-height: 40px;
      font-size: 13px;
      font-weight: bold;
    }

    .group-container{
      font-size: 12px;
      padding: 16px 5px;

      .tag-item{
        margin-left: 5px;
        margin-right: 5px;
        padding: 5px;
        border:1px solid #E4e4e4;
        cursor: pointer;
      }
      .status-1{
        background: #5E81F4;
        color: #ffffff;
      }
    }
  }
</style>
