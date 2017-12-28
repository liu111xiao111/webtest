<template>
    <div style = "width:99%">
        <el-row>
            <el-col :xs="2">
                <el-button type="primary" @click="getData">按一下这个按钮</el-button>
            </el-col>
        </el-row>     

      <el-row>
            <el-table :data="tableData" border style="width: 100%" >
                <el-table-column prop="promotionId" label="活动ID" width="140" align="center"></el-table-column>
                <el-table-column prop="spuid" label="商品ID" width="220" header-align="center"></el-table-column>
                <el-table-column prop="skuid" label="SKUid" width="100" header-align="center"></el-table-column>
                <el-table-column prop="storeid" label="门店ID" width="70" header-align="center"></el-table-column>
            </el-table>
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :page="page" :page-sizes="[10, 20]" :page-size="pageSize" layout="total, sizes, prev, pager, next" :total="total" >
            </el-pagination>
        </el-row>
    </div>
</template>
<script>
import Const from '@/config';
export default {
  data() {
    return {
      result: "",
      input: "",
      id: "",
       pageSize: 10,
      page: 1,
      total:0,
      loading:false,
      tableData:[],

}
  },
        mounted: function () {
            this.getData();
        },

    methods:{
        getData:function(){
            
            var params = {            
                __uni_source: "4.3",
                page: this.page,
                pagesize:this.pageSize
            }
            this.loading = true
            this.$ajax.post(Const.apiEnv[Const.env]+"/promotionapi/v1/all",params).then(resp => {
                let respData = resp.data;
                if(respData.status ===200){
                    this.result = JSON.stringify(resp.data, null, 4);
                    this.loading = false
                    this.tableData = resp.data.data.list
                    this.total = resp.data.data.total;
                }
            })
        },
             handleSizeChange(curSize) {
                this.pageSize = curSize;
                this.getData();
            },
            handleCurrentChange(curPage) {
                this.page = curPage;
                this.getData();
            },
        
    }
}
</script>