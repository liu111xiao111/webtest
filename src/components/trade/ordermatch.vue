<template>
  <div>
    <el-row>
      <el-tag type="primary">订单号：{{orderno}}</el-tag>
      <el-button size="primary" @click="back">返回</el-button>
    </el-row>
    <el-row>
      <div class="hr0"></div>
    </el-row>
    <el-collapse v-model="activeName" accordion @change="changeItem">
      <el-collapse-item title="TRADE_ORDER" name="TRADE_ORDER">
        <div v-for="v in orderdata.order" :key="v.ID" v-loading="loading">
          <el-row class="diff_tb">
            <el-table v-loading="loading" :border="true" :data="v.diff" :row-class-name="tableRowClassName">
              <el-table-column prop="key" label="不一致字段" width="100px">
              </el-table-column>
              <el-table-column prop="sh" label="上海" min-width="120px">
              </el-table-column>
              <el-table-column prop="bj" label="北京" min-width="120px">
              </el-table-column>
            </el-table>
          </el-row>
          <el-row>
            <el-col :span="11">
              <el-tag type="success">上海</el-tag>
              <div class="order_value">
                <pre v-text="v.sh"></pre>
              </div>
            </el-col>
            <el-col :span="11" :offset="1">
              <el-tag type="success">北京</el-tag>
              <div class="order_value">
                <pre v-text="v.bj"></pre>
              </div>
            </el-col>
          </el-row>
        </div>
      </el-collapse-item>

      <el-collapse-item title="TRADE_PRODUCT" name="TRADE_PRODUCT">
        <div v-for="v in orderdata.product" :key="v.ID">
          <el-row class="diff_tb">
            <el-table v-loading="loading" :border="true" :data="v.diff" :row-class-name="tableRowClassName">
              <el-table-column prop="key" label="不一致字段" width="100px">
              </el-table-column>
              <el-table-column prop="sh" label="上海" min-width="120px">
              </el-table-column>
              <el-table-column prop="bj" label="北京" min-width="120px">
              </el-table-column>
            </el-table>
          </el-row>
          <el-row>
            <el-col :span="11">
              <el-tag type="success">上海</el-tag>
              <div class="order_value">
                <pre v-text="v.sh"></pre>
              </div>
            </el-col>
            <el-col :span="11" :offset="1">
              <el-tag type="success">北京</el-tag>
              <div class="order_value">
                <pre v-text="v.bj"></pre>
              </div>
            </el-col>
          </el-row>
        </div>
      </el-collapse-item>
      <el-collapse-item title="TRADE_ORDER_LOG" name="TRADE_ORDER_LOG">
        <div v-for="v in orderdata.log" :key="v.ID">
          <el-row class="diff_tb">
            <el-table v-loading="loading" :border="true" :data="v.diff" :row-class-name="tableRowClassName">
              <el-table-column prop="key" label="不一致字段" width="100px">
              </el-table-column>
              <el-table-column prop="sh" label="上海" min-width="120px">
              </el-table-column>
              <el-table-column prop="bj" label="北京" min-width="120px">
              </el-table-column>
            </el-table>
          </el-row>
          <el-row>
            <el-col :span="11">
              <el-tag type="success">上海</el-tag>
              <div class="order_value">
                <pre v-text="v.sh"></pre>
              </div>
            </el-col>
            <el-col :span="11" :offset="1">
              <el-tag type="success">北京</el-tag>
              <div class="order_value">
                <pre v-text="v.bj"></pre>
              </div>
            </el-col>
          </el-row>
          <div class="hr0"></div>
        </div>
      </el-collapse-item>
      <el-collapse-item title="TRADE_PAYINFO" name="TRADE_PAYINFO">
        <div v-for="v in orderdata.payinfo" :key="v.ID">
          <el-row class="diff_tb">
            <el-table v-loading="loading" :border="true" :data="v.diff" :row-class-name="tableRowClassName">
              <el-table-column prop="key" label="不一致字段" width="100px">
              </el-table-column>
              <el-table-column prop="sh" label="上海" min-width="120px">
              </el-table-column>
              <el-table-column prop="bj" label="北京" min-width="120px">
              </el-table-column>
            </el-table>
          </el-row>
          <el-row>
            <el-col :span="11">
              <el-tag type="success">上海</el-tag>
              <div class="order_value">
                <pre v-text="v.sh"></pre>
              </div>
            </el-col>
            <el-col :span="11" :offset="1">
              <el-tag type="success">北京</el-tag>
              <div class="order_value">
                <pre v-text="v.bj"></pre>
              </div>
            </el-col>
          </el-row>
          <div class="hr0"></div>
        </div>
      </el-collapse-item>
      <el-collapse-item title="TRADE_ORDER_USE_COUPON" name="TRADE_ORDER_USE_COUPON">
        <div v-for="v in orderdata.coupon" :key="v.ID">
          <el-row class="diff_tb">
            <el-table v-loading="loading" :border="true" :data="v.diff" :row-class-name="tableRowClassName">
              <el-table-column prop="key" label="不一致字段" width="100px">
              </el-table-column>
              <el-table-column prop="sh" label="上海" min-width="120px">
              </el-table-column>
              <el-table-column prop="bj" label="北京" min-width="120px">
              </el-table-column>
            </el-table>
          </el-row>
          <el-row>
            <el-col :span="11">
              <el-tag type="success">上海</el-tag>
              <div class="order_value">
                <pre v-text="v.sh"></pre>
              </div>
            </el-col>
            <el-col :span="11" :offset="1">
              <el-tag type="success">北京</el-tag>
              <div class="order_value">
                <pre v-text="v.bj"></pre>
              </div>
            </el-col>
          </el-row>
          <div class="hr0"></div>
        </div>
      </el-collapse-item>
      <el-collapse-item title="TRADE_PROMOTION" name="TRADE_PROMOTION">
        <div v-for="v in orderdata.promotion" :key="v.ID">
          <el-row class="diff_tb">
            <el-table v-loading="loading" :border="true" :data="v.diff" :row-class-name="tableRowClassName">
              <el-table-column prop="key" label="不一致字段" width="100px">
              </el-table-column>
              <el-table-column prop="sh" label="上海" min-width="120px">
              </el-table-column>
              <el-table-column prop="bj" label="北京" min-width="120px">
              </el-table-column>
            </el-table>
          </el-row>
          <el-row>
            <el-col :span="11">
              <el-tag type="success">上海</el-tag>
              <div class="order_value">
                <pre v-text="v.sh"></pre>
              </div>
            </el-col>
            <el-col :span="11" :offset="1">
              <el-tag type="success">北京</el-tag>
              <div class="order_value">
                <pre v-text="v.bj"></pre>
              </div>
            </el-col>
          </el-row>
          <div class="hr0"></div>
        </div>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>
<script>
  import Const from '@/config'
  export default {
    data() {
      return {
        loading: false,
        activeName: 'TRADE_ORDER',
        orderdata: {
          order: [],
          product: [],
          log: [],
          payinfo: [],
          coupon: [],
          promotion: []
        },
        orderno: '',
      }
    },
    mounted: function () {
      //console.log(this.$route.query.orderno);
      this.orderno = this.$route.query.orderno;
      this.getListByUrl('TRADE_ORDER');
    },
    methods: {
      tableRowClassName(row) {
        var index = row.rowIndex;
        if (row.rowIndex % 2 !== 0) {
          return 'info-row';
        }
        return 'positive-row';
      },
      back: function () {
        this.$router.push({
          path: "/order",
        });
      },
      changeItem: function (activeName) {
        this.getListByUrl(activeName);
      },

      getListByUrl: function (activeName) {
        this.loading = true;

        let obj = [];
        let url = "";
        switch (activeName) {
          case 'TRADE_ORDER':
            url = Const.host + "/trade/order?orderno=" + this.orderno + "&env=" + Const.env;
            obj = this.orderdata.order;
            break;
          case 'TRADE_PRODUCT':
            url = Const.host + "/trade/order/product?orderno=" + this.orderno + "&env=" + Const.env;
            obj = this.orderdata.product;
            break;
          case 'TRADE_ORDER_LOG':
            url = Const.host + "/trade/order/log?orderno=" + this.orderno + "&env=" + Const.env;
            obj = this.orderdata.log;
            break;
          case 'TRADE_PAYINFO':
            url = Const.host + "/trade/order/payinfo?orderno=" + this.orderno + "&env=" + Const.env;
            obj = this.orderdata.payinfo;
            break;
          case 'TRADE_ORDER_USE_COUPON':
            url = Const.host + "/trade/order/coupon?orderno=" + this.orderno + "&env=" + Const.env;
            obj = this.orderdata.coupon;
            break;
          case 'TRADE_PROMOTION':
            url = Const.host + "/trade/order/promotion?orderno=" + this.orderno + "&env=" + Const.env;
            obj = this.orderdata.promotion;
            break;
          default:
            return false;
        }

        this.$ajax.get(url).then(response => {
          var shdata = response.data.Data.sh === null ? [] : response.data.Data.sh;
          var bjdata = response.data.Data.bj === null ? [] : response.data.Data.bj;

          obj.length = 0;
          if (shdata.length < 1) {
            obj.push({
              sh: "",
              bj: "",
              diff: []
            })
          }
          for (var i = 0; i < shdata.length; i++) {
            var data = {
              sh: "",
              bj: "",
              diff: []
            };
            data["sh"] = JSON.stringify(shdata[i], null, 4);
            data["bj"] = JSON.stringify(bjdata[i], null, 4);

            if (bjdata === null || typeof (bjdata) === 'undefined' || bjdata.length === 0) {
              data['diff'].push({
                "key": "nomatch",
                "sh": "all",
                "bj": "null"
              })
            } else {
              for (var key in shdata[i]) {
                if (typeof (bjdata[i][key]) === 'undefined') bjdata[i][key] = '';
                if (shdata[i][key] !== bjdata[i][key]) {
                  data["diff"].push({
                    "key": key,
                    "sh": shdata[i][key],
                    "bj": bjdata[i][key]
                  })
                }
              }
            }

            obj.push(data);
          }
          this.loading = false;
        }).catch(err => {
          console.log(err);
          this.loading = false;
        });
      }
    }
  }
</script>
<style lang="scss">
  .diff_tb {
    width: 100%;
    padding: 5px;
  }

  .order_value {
    margin-top: 2px;
    border: 1px #1e90ff dashed;
    padding: 4px;
    word-wrap: break-word;
  }

  .bg-dark {
    background: rgb(6, 64, 93)
  }

  pre {
    white-space: pre-wrap;
    word-wrap: break-word;
  }
</style>