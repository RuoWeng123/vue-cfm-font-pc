
<!--原来是写跟进记录，现在改为渠道二维码页面-->
<template>
  <div class="container">
渠道二维码页面
<!--    <el-row class="mb10">-->
<!--      <el-col :span="24">-->
<!--        <el-button type="primary"-->
<!--                   @click="onCreate">新增二维码-->
<!--        </el-button>-->
<!--      </el-col>-->
<!--    </el-row>-->
<!--    <el-row>-->
<!--      <el-table :data="tableData" border size="small" >-->
<!--        <el-table-column prop="name" label="二维码名称"></el-table-column>-->
<!--        <el-table-column prop="create_at" label="创建时间"></el-table-column>-->
<!--        <el-table-column prop="create_person" label="创建员工"></el-table-column>-->
<!--        <el-table-column prop="add_num" label="添加人数"></el-table-column>-->
<!--        <el-table-column prop="status" label="状态"></el-table-column>-->
<!--        <el-table-column-->
<!--          align="center"-->
<!--          label="操作"-->
<!--          width="90px">-->
<!--          <template slot-scope="scope">-->
<!--            <i-->
<!--              class="icon el-icon-view mr5"-->
<!--              @click="onEdit(scope.row)"-->
<!--            />-->
<!--            &lt;!&ndash;            <i&ndash;&gt;-->
<!--            &lt;!&ndash;              class="icon el-icon-video-pause mr5"&ndash;&gt;-->
<!--            &lt;!&ndash;              @click="onUpdateStatus(scope.row)"&ndash;&gt;-->
<!--            &lt;!&ndash;            />&ndash;&gt;-->
<!--            <i-->
<!--              class="icon el-icon-delete"-->
<!--              @click="onDelete(scope.row)"-->
<!--            />-->
<!--          </template>-->
<!--        </el-table-column>-->
<!--      </el-table>-->
<!--    </el-row>-->
<!--    <el-dialog ref="layer"-->
<!--               :visible.sync="dialogEditVisible"-->
<!--               width="600px"-->
<!--               height="600px">-->
<!--      <el-form ref="form" :model="formOptions" label-width="90px">-->
<!--        <el-form-item label="名称">-->
<!--          <el-input v-model="formOptions.name"></el-input>-->
<!--        </el-form-item>-->
<!--        <el-form-item label="验证设置">-->
<!--          <el-radio v-model="formOptions.checkout" label="1">需验证</el-radio>-->
<!--          <el-radio v-model="formOptions.checkout" label="2">无需验证</el-radio>-->
<!--        </el-form-item>-->
<!--        <el-form-item label="开启欢迎语">-->
<!--          <el-radio v-model="formOptions.open_wel_content" label="1">发送欢迎语</el-radio>-->
<!--          <el-radio v-model="formOptions.open_wel_content" label="2">不发送欢迎语</el-radio>-->
<!--        </el-form-item>-->
<!--        <el-form-item label="开启欢迎语">-->
<!--          <el-input type="textarea" v-model="formOptions.wel_content"></el-input>-->
<!--        </el-form-item>-->
<!--        <el-form-item>-->
<!--          <el-button type="primary" @click="onSubmit">确定</el-button>-->
<!--          <el-button type="default" @click="onCancel">取消</el-button>-->
<!--        </el-form-item>-->
<!--      </el-form>-->
<!--    </el-dialog>-->
<!--    <el-dialog-->
<!--      title="删除提示"-->
<!--      :visible.sync="dialogVisible"-->
<!--      width="30%">-->
<!--      <span>删除后不可恢复，请确认删除</span>-->
<!--          <span slot="footer" class="dialog-footer">-->
<!--        <el-button @click="dialogVisible = false">取 消</el-button>-->
<!--        <el-button type="primary" @click="deleteOk">确 定</el-button>-->
<!--      </span>-->
<!--    </el-dialog>-->
  </div>
</template>

<script>
  const tableColumns = [
    {label: '二维码名称', field:'name', layout:'Text'},
    {label: '创建时间', field:'create_at', layout:'Text'},
    {label: '创建员工', field:'create_person', layout:'Text'},
    {label: '添加人数', field:'add_num', layout:'Text'},
    {label: '状态', field:'status', layout:'Text'}
  ]
  const formColumns = [
    {label:'名称', field:'name', layout:'Text'},
    {label:'验证设置', field:'checkout', layout:'Radio', source:'checkoutList'},
    {label:'开启欢迎语', field:'open_wel_content', layout:'Radio', source:'openWelContent'},
    {label:'欢迎语', field:'wel_content', layout:'Textarea'}
  ]
  export default {
    name: 'writeNote',
    data () {
      return {
        dialogVisible:false,
        dialogEditVisible: false,
        tableData: [],
        formOptions: {}
      }
    },
    methods:{
      onInit(){
        let rows = [
          {
            name:'二维码名称',
            create_at: "2019/08/07",
            create_person:"ruowen",
            add_num: 200,
            status: "在用",
            checkout: "1",
            open_wel_content: '1',
            wel_content: "这里是欢迎语的内容，你好呀，这里是欢迎语测试条件"
          }
        ]
        this.tableData = rows
      },
      onCreate(){
        this.dialogEditVisible = true
      },
      onEdit(row){
        this.formOptions = row
        this.dialogEditVisible = true
      },
      onDelete(){
        this.dialogVisible = true
      },
      deleteOk(){
        this.dialogVisible = false

      },
      onUpdateStatus(){
        this.dialogVisible = true
      },
      onSubmit(){
        this.dialogVisible = false
      },
      onCancel(){
        this.dialogVisible = false
      }
    },
    mounted () {
      this.onInit()
    }
  }
</script>

<style lang="less"
       scoped>
  .container {
    background: #ffffff;
    border-radius: 4px;
    padding: 16px;
  }
</style>
