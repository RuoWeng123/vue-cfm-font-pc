<template>
  <div class="container">
<!--    <div class="header mb10">-->
<!--      <el-input-->
<!--        class="mr16"-->
<!--        style="width: 300px;"-->
<!--        placeholder="关键字,回车过滤"-->
<!--        suffix-icon="el-icon-search"-->
<!--        @change="onInit()"-->
<!--        v-model="keyword">-->
<!--      </el-input>-->
<!--      <el-button icon="el-icon-refresh" type="primary" @click="onInit()"></el-button>-->
<!--    </div>-->
    <div class="content-container">
      <category-card
        class="card-item"
         v-for="(item,index) in categoryList"
         :customer-list="item.clients"
         :category="item"
        :category-index="'dragArea-'+ index"
        :category-list="categoryList"
         @change-category="onInit"
         :key="item.id"></category-card>
    </div>
  </div>
</template>

<script>
  import CategoryCard from '@/components/categoryCard'
  import {getCatetoryList} from '@/common/api'
  import bus from "@/util/bus"
  const customerList = [
    {
      id: "1-1",
      name: '弱翁',
      name_remark: 'ruoweng',
      update_at: '2020/08/12',
      status: '目标分类下 的数据',
      company: '测试数据',
      telephone: '测试数据',
      tag: '测试数据',
      group: '测试数据',
      employee: '追踪人',
      create_at: '2020/08/12'
    }
  ]
  export default {
    components: { CategoryCard },
    data () {
      return {
        keyword: null,
        categoryList: []
      }
    },
    methods:{
      async onInit(){
        let params = {
          keyword:this.keyword
        }
        let data = await getCatetoryList(params)
        if(!data || !data.category_list){
          this.$notify({
            type:'warning',
            message:"数据获取未空，请添加客户后使用"
          })
          return
        }
        console.log("分类数据",data.category_list)
        this.categoryList = data && data.category_list && data.category_list.length ? data.category_list : []
      }
    },
    mounted () {
      this.onInit()
      let _this = this
      bus.$on('updateCustomer', function(val){
        _this.onInit()
      })
    }
  }
</script>

<style lang="less"
       scoped>
  .container {
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    justify-content: flex-start;
    padding-right: 16px;
    height: 100%;
    .content-container{
      display: inline-flex;
      flex-wrap: nowrap;
      align-items: flex-start;
      height: 100%;
      overflow: auto;
      .card-item{
        width: 266px;
        height: calc(~"100% - 20px");
        margin-right: 10px;
      }
    }
  }
</style>
