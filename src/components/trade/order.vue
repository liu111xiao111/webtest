<template>
  <el-row>
    <el-form :inline="true" v-model="formdata" label-position="left" class="form-el" size="small">
      <el-form-item label="订单号">
        <el-input v-model="formdata.orderno" placeholder="订单号"></el-input>
      </el-form-item>
      <el-form-item label="业态编码">
        <el-select v-model="formdata.tradecode" placeholder="业态编码" clearable>
          <el-option label="7023" value="7023"></el-option>
          <el-option label="7213" value="7213"></el-option>
          <el-option label="7113" value="7113"></el-option>
          <el-option label="7160" value="7160"></el-option>
          <el-option label="7110" value="7110"></el-option>
          <el-option label="7260" value="7260"></el-option>
        </el-select>
      </el-form-item>
      <el-checkbox v-model="formdata.needChild" label="填写父单查子单" border size="small"></el-checkbox>
      <el-form-item>
        <el-button type="primary" @click="search">查询</el-button>
      </el-form-item>
    </el-form>
    <el-table v-loading="loading" :data="tableData" border style="width: 100%" :row-class-name="tableRowClassName">
      <el-table-column fixed prop="ORDER_NO" label="订单号" width="150" align="center">
      </el-table-column>
      <el-table-column prop="CREATE_TIME" label="创建时间" width="110" align="center">
      </el-table-column>
      <el-table-column prop="ORDER_CODE" label="业态编码" width="90" align="center">
      </el-table-column>
      <el-table-column prop="ORDER_AMT" label="订单金额(分)" width="90" align="center">
      </el-table-column>
      <el-table-column prop="REAL_PAY_AMT" label="实付金额(分)" width="100" align="center">
      </el-table-column>
      <el-table-column prop="ORDER_STATUS" label="订单状态" width="150" align="center">
      </el-table-column>
      <el-table-column prop="" label="提货码" width="120" align="center">
        <template slot-scope="scope" v-if="(scope.row.ORDER_CODE==='7023' && scope.row.SPLIT_STATUS==='2')||scope.row.ORDER_CODE==='7213'">
          <el-button type="primary" @click="showPickupDlg(scope.row)">提货码</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="PARENT_NO" label="父单号" width="150" align="center"></el-table-column>
      <el-table-column prop="MERCHANT_ID" label="商户id" width="120" align="center">
      </el-table-column>
      <el-table-column prop="STORE_ID" label="门店id" width="120" align="center">
      </el-table-column>
      <el-table-column prop="MEMBER_ID" label="用户id" width="170" align="center">
      </el-table-column>
      <el-table-column prop="SPLIT_STATUS" label="是否拆分" min-width="120" align="center">
      </el-table-column>
      <el-table-column fixed="right" label="操作" min-width="200" align="center">
        <template slot-scope="scope">
          <el-button @click="syncCheck(scope.row)" type="text" size="small">同步校验</el-button>
          <el-button v-if="scope.row.ORDER_CODE==='7023'||scope.row.ORDER_CODE==='7213'" @click="lackAlert(scope.row)" type="text" size="small">缺货</el-button>
          <el-button v-if="scope.row.ORDER_CODE==='7023'||scope.row.ORDER_CODE==='7213'" @click="comingNotice(scope.row)" type="text" size="small">到自提</el-button>
          <el-button v-if="scope.row.ORDER_CODE==='7113'" @click="showDateDlg(scope.row)" type="text" size="small">一键配送</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="选择日期" :visible.sync="dateDlg.visible" :append-to-body="true" width="20%" @open="dlgOpen">
      <el-date-picker v-model="dateDlg.date" type="datetime" placeholder="选择日期时间" :editable="false" :clearable="false" value-format="yyyy-MM-dd HH:mm:ss">
      </el-date-picker>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dateDlg.visible = false;dateDlg.orderno=''">取 消</el-button>
        <el-button type="primary" @click="dispatch">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="提货码-物流系统" :visible.sync="pickupDlg.visible" :append-to-body="true" @open="getPickupCode" width="20%">
      <span>
        <el-badge :value="pickupDlg.pickcodeStatus">
          <p>{{pickupDlg.pickupCode}}</p>
        </el-badge>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="pickupDlg.visible = false;pickupDlg.orderno=''">取 消</el-button>
        <el-button type="primary" @click="usePickupCode" :loading="pickupDlg.using">核 销</el-button>
      </span>
    </el-dialog>
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 20, 30, 50]" :page-size="pageSize" layout="total, sizes, prev, pager, next" :total="total">
    </el-pagination>
  </el-row>
</template>
<script>
  import Const from '@/config/index.js'
  export default {
    beforeRouteEnter: (to, from, next) => {
      if ('ordermatch' !== from.name) {
        next(vm => {
          vm.search();
        })
        return false;
      }
      next();
    },
    methods: {
      getData() {
        this.loading = true;
        this.$ajax.get(Const.host + "/trade/list", {
          params: {
            orderno: this.formdata.orderno,
            tradecode: this.formdata.tradecode,
            needChild: this.formdata.needChild ? 1 : 0,
            curpage: this.currentPage,
            offset: this.pageSize,
            env: Const.env
          }
        }).then(response => {
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
      syncCheck(row) {
        this.$router.push({
          path: '/ordermatch',
          query: {
            orderno: row.ORDER_NO,
          }
        })
      },
      lackAlert(row) {
        var params = new URLSearchParams();
        params.append('storeId', row.STORE_ID);
        params.append('merchantId', row.MERCHANT_ID);
        params.append('orderNos', row.ORDER_NO);
        params.append('stockStatus', 0);
        this.$ajax.post(Const.apiEnv[Const.env] + "/shtrade/v1/ffan/cartOrder/orderRemarkGoodsStock", params).then(resp => {
          //console.log(resp.data)
          var data = resp.data;
          var bSuccess = data.status !== 200 ? false : true;
          var notice = {
            title: bSuccess ? '操作成功' : '操作失败',
            message: data.message,
            offset: 100,
            type: bSuccess ? 'success' : 'error',
            duration: bSuccess ? 1000 : 2000
          }
          this.$notify(notice)
        }).catch(err => {
          console.error(err)
        })
      },
      comingNotice(row) {
        var params = new URLSearchParams();
        params.append('orderNos', row.ORDER_NO);
        params.append('storeId', row.STORE_ID);
        params.append('merchantId', row.MERCHANT_ID);
        params.append('pickUpGoodsStatus', 1);

        this.$ajax.post(Const.apiEnv[Const.env] + "/ffan/v3/cart/PickUpAddr", params).then(resp => {
          //console.log(resp.data);
          var data = resp.data;
          var bSuccess = data.status !== 200 ? false : true;
          var notice = {
            title: bSuccess ? '操作成功' : '操作失败',
            message: data.message,
            offset: 100,
            type: bSuccess ? 'success' : 'error',
            duration: bSuccess ? 1000 : 2000
          }
          this.$notify(notice);
        }).catch(err => {
          console.error(err);
        })
      },
      showDateDlg(row) {
        this.dateDlg.visible = true;
        this.dateDlg.orderno = row.ORDER_NO;
      },
      dispatch() {
        this.dateDlg.visible = false;
        //console.log(this.dateDlg.date);
        this.$ajax.post(Const.apiEnv[Const.env] + "/wd/v1/delivered", {
          request: [{
            orderNo: this.dateDlg.orderno,
            waybillNo: '3335036115705',
            deliveredTime: this.dateDlg.date,
            logisticsCompany: '申通',
            logisticsCompanyCode: 'shentong'
          }]
        }).then(resp => {
          var bSuccess = (resp.data.status !== 200) || (resp.data.data.length > 0) ? false : true;
          var notice = {
            title: bSuccess ? '操作成功' : '操作失败',
            message: bSuccess ? resp.data.message : resp.data.data[0].errMsg,
            offset: 100,
            type: bSuccess ? 'success' : 'error',
            duration: bSuccess ? 1000 : 2000
          };
          this.$notify(notice);
        })
      },
      handleSizeChange(val) {
        this.pageSize = val;
        this.getData();
      },
      handleCurrentChange(val) {
        this.currentPage = val;
        this.getData()
      },
      tableRowClassName(row) {
        var index = row.rowIndex;
        if (row.rowIndex % 2 !== 0) {
          return 'info-row';
        }
        return 'positive-row';
      },
      dlgOpen() {
        this.dateDlg.date = this.$dateFns.format(new Date(), "YYYY-MM-DD HH:mm:SS");
      },
      showPickupDlg(row) {
        this.pickupDlg.visible = true;
        this.pickupDlg.orderno = row.ORDER_NO;
        this.pickupDlg.storeid = row.STORE_ID;
      },
      usePickupCode() {
        var params = new URLSearchParams();
        params.append('signNo', this.pickupDlg.pickupCode);
        params.append('operator', 'system');
        params.append('orderNo', this.pickupDlg.orderno);
        params.append('storeId', this.pickupDlg.storeid)


        this.pickupDlg.using = true;
        this.$ajax.post(Const.apiEnv[Const.env] + "/pickup/v1/use/" + this.pickupDlg.pickupCode + "/system", params).then(
          resp => {
            let bSuccess = resp.data.status !== 200 ? false : true;
            let notice = {
              title: bSuccess ? '操作成功' : '操作失败',
              message: resp.data.message,
              offset: 100,
              type: bSuccess ? 'success' : 'error',
              duration: bSuccess ? 1000 : 2000
            }
            this.$notify(notice);
            this.pickupDlg.using = false;
            this.pickupDlg.visible = false;
            this.getData();
          }).catch(err => {
          console.error(err);
          this.pickupDlg.using = false;
        })
      },
      getPickupCode() {
        this.$ajax.get(Const.apiEnv[Const.env] + "/pickup/v1/pickupCode/" + this.pickupDlg.orderno).then(resp => {
          if (resp.data.status === 200) {
            this.$set(this.pickupDlg, 'pickupCode', resp.data.data.sign)
            switch (resp.data.data.signStatus) {
              case '1':
                this.$set(this.pickupDlg, 'pickcodeStatus', '未核销');
                break;
              case '2':
                this.$set(this.pickupDlg, 'pickcodeStatus', '已核销');
                break;
              case '3':
                this.$set(this.pickupDlg, 'pickcodeStatus', '已过期');
                break;
              case '4':
                this.$set(this.pickupDlg, 'pickcodeStatus', '已退款');
                break;
              default:
                this.$set(this.pickupDlg, 'pickcodeStatus', '');
                break;
            }
          } else {
            this.$set(this.pickupDlg, 'pickcodeStatus', '');
            this.$set(this.pickupDlg, "pickupCode", resp.data.message);
          }
        }).catch(err => {
          console.error(err);
        })
      }
    },
    mounted: function () {
      this.getData()
    },
    data() {
      return {
        loading: false,
        total: 0,
        pageSize: 10,
        currentPage: 1,
        tableData: [],
        formdata: {
          orderno: '',
          tradecode: '',
          needChild: false,
        },
        dateDlg: {
          visible: false,
          date: '',
          orderno: ''
        },
        pickupDlg: {
          visible: false,
          pickupCode: '',
          orderno: '',
          storeid: '',
          using: false,
          pickcodeStatus: ''
        }
      }
    }
  }
</script>
<style lang="scss">
  .form-el {
    margin-top: 5px;
    margin-left: 5px;
  }

  span p {
    font-size: 20px;
    text-align: center;
  }
</style>