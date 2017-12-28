<template>
    <div style = "width:99%">
        <el-row>
            <el-col :xs="2">
                <el-button type="primary" @click="getData">按一下这个按钮</el-button>
            </el-col>
        </el-row>     
      <el-row>
        <el-form :inline="true" v-model="movieId" >
            <el-form-item label="商品ID">
                <el-input v-model="movieId" placeholder="商品ID"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="search">查询</el-button>
            </el-form-item>
        </el-form>
            <el-table :data="tableData" border style="width: 100%" >
                <el-table-column prop="area" label="地区" width="140" align="center"></el-table-column>
                <el-table-column prop="address" label="地址" width="220" header-align="center"></el-table-column>
                <el-table-column prop="full_name" label="影城名字" width="100" header-align="center"></el-table-column>
            </el-table>
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :page="offset" :page-sizes="[10, 20]" :page-size="limit" layout="total, sizes, prev, pager, next" :total="total" >
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
      limit:10,
      offset:1,
      cityId:'110100',
      movieId:""

}
  },
        mounted: function () {
            this.getData();
        },

    methods:{
        getData:function(){
            
            var params = {            
                cityId:this.cityId,
                limit:this.limit,
                
            }
            this.loading = true
            this.$ajax.get('http://api.ffan.com/movie/v3/cinemas',{params:params}).then(resp => {
                let respData = resp.data;
                if(respData.status ===200){
                    this.result = JSON.stringify(resp.data, null, 4);
                    this.loading = false
                    this.tableData = resp.data.data.datas
                    this.total = resp.data.data.total
                }
            })
        },
        search: function () {
                this.currentPage = 1;
                this.pageSize = 10;
                this.getData();
            },
             handleSizeChange(curSize) {
                this.limit = curSize;
                this.getData();
            },
            handleCurrentChange(curPage) {
                this.offset = curPage;
                this.getData();
            },
        
    }
}
</script>