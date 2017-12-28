<template>
  <el-row>
    <el-form :inline="true" v-model="formdata" label-position="left" class="form-el" size="small">
      <el-form-item label="订单号">
        <el-input v-model="formdata.orderno" placeholder="订单号"></el-input>
      </el-form-item>
      <el-form-item label="退款单号">
        <el-input v-model="formdata.refundno" placeholder="退款单号"></el-input>
      </el-form-item>
      <el-form-item label="业态编码">
        <el-select v-model="formdata.tradecode" placeholder="业态编码" clearable>
          <el-option label="7023" value="7023"></el-option>
          <el-option label="7213" value="7213"></el-option>
          <el-option label="7113" value="7113"></el-option>
          <el-option label="7160" value="7160"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="search">查询</el-button>
      </el-form-item>
    </el-form>
    <el-table v-loading="loading" :data="tableData" border style="width: 100%" :row-class-name="tableRowClassName" :empty-text="tbText">
      <el-table-column fixed prop="ORDER_NO" label="订单号" width="150" align="center">
      </el-table-column>
      <el-table-column prop="REFUND_NO" label="退款单号" width="150" align="center">
      </el-table-column>
      <el-table-column prop="ORDER_CODE" label="业态编码" width="100" align="center">
      </el-table-column>
      <el-table-column prop="REFUND_AMT" label="退款金额(分)" width="120" align="center">
      </el-table-column>
      <el-table-column prop="REFUND_STATUS" label="退款单状态" width="150" align="center">
      </el-table-column>
      <el-table-column prop="MERCHANT_ID" label="商户id" width="110" align="center">
      </el-table-column>
      <el-table-column prop="STORE_ID" label="门店id" width="110" align="center">
      </el-table-column>
      <el-table-column prop="MEMBER_ID" label="用户id" width="120" align="center">
      </el-table-column>
      <el-table-column fixed="right" label="操作" min-width="150" align="center">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small">同步校验</el-button>
          <el-button v-if="scope.row.REFUND_STATUS==='FAIL'" @click="refundRetry(scope.row)" type="text" size="small">退款重试</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 20, 30, 50]" :page-size="pageSize" layout="total, sizes, prev, pager, next" :total="total">
    </el-pagination>
  </el-row>
</template>
<script>
  import Const from '@/config'
  export default {
    beforeRouteEnter: (to, from, next) => {
      if ('refundmatch' !== from.name) {
        next(vm => {
          vm.search()
        });
        return false;
      }
      next();
    },
    methods: {
      getData() {
        this.loading = true;
        this.$ajax.get(Const.host + "/trade/refund/list", {
          params: {
            orderno: this.formdata.orderno,
            tradecode: this.formdata.tradecode,
            refundno: this.formdata.refundno,
            curpage: this.currentPage,
            offset: this.pageSize,
            env: Const.env
          }
        }).then(
          response => {
            //console.log(response.data.Data)
            this.total = parseInt(response.data.Data.count);
            this.tableData = response.data.Data.list;
            this.loading = false;
          }).catch(err => {
          console.error(err);
          this.loading = false;
        })
      },
      search: function () {
        this.currentPage = 1;
        this.pageSize = 10;
        this.getData();
      },
      handleClick(row) {
        this.$router.push({
          path: '/refundmatch',
          query: {
            refundno: row.REFUND_NO
          }
        })
      },
      refundRetry(row) {
        let params = new URLSearchParams();
        params.append("orderNo", row.ORDER_NO);
        params.append("refundNo", row.REFUND_NO);
        this.$ajax.post(Const.host + "/trade/refund/retry", params).then(resp => {
          let data = resp.data;

          var notice = {
            title: '提示',
            message: '成功',
            offset: 100,
            type: 'success',
            duration: 2000
          };
          if (data.Code !== 200) {
            notice.message = data.Msg;
            notice.type = 'error';
          } else {
            this.$set(row, 'REFUND_STATUS', 'RETRYING');
          }
          this.$notify(notice);
        }).catch(err => {
          console.error(err);
        })
      },
      handleSizeChange(val) {
        this.pageSize = val;
        this.getData()
      },
      handleCurrentChange(val) {
        this.currentPage = val
        this.getData()
      },
      tableRowClassName(row) {
        var index = row.rowIndex;
        if (row.rowIndex % 2 !== 0) {
          return 'info-row';
        }
        return 'positive-row';
      },
    },
    mounted: function () {
      this.getData()
    },
    data() {
      return {
        total: 0,
        pageSize: 10,
        currentPage: 1,
        tableData: [],
        tbText: '暂无数据',
        formdata: {
          orderno: '',
          tradecode: '',
          refundno: ''
        },
        loading: false,
      }
    }
  }
</script>
<style lang="scss">
  .form-el {
    margin-top: 5px;
    margin-left: 5px;
  }
</style>