<template>
    <div>
        <el-row>
            <el-card>
                <div slot="header">
                    <el-alert title="自动退款扫描" type="success" :closable="false"></el-alert>
                </div>
                <div>
                    扫描时间段：
                    <el-date-picker value-format="yyyy-MM-dd" style="width:80%" v-model="autorefund_date" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
                    </el-date-picker>
                    <el-button type="primary" style="float:right" @click="scanAutoRefund">触发扫描</el-button>
                </div>
            </el-card>
        </el-row>
        <el-row>
            <el-form style="margin-top:10px" :inline="true" v-model="formdata" label-position="left" class="form-el" size="small">
                <el-form-item label="订单号">
                    <el-input v-model="formdata.orderno" placeholder="订单号"></el-input>
                </el-form-item>
                <el-form-item label="退款单号">
                    <el-input v-model="formdata.refundno" placeholder="退款单号"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="search">查询</el-button>
                </el-form-item>
            </el-form>
            <el-table v-loading="loading" :data="tableData" border style="width: 100%" :row-class-name="tableRowClassName">
                <el-table-column fixed prop="ORDER_NO" label="订单号" width="200" align="center">
                </el-table-column>
                <el-table-column prop="REFUND_NO" label="退款单号" width="150" align="center">
                </el-table-column>
                <el-table-column prop="CREATE_TIME" label="创建时间" width="200" align="center">
                </el-table-column>
                <el-table-column prop="LOG_INFO" label="退款原因" min-width="150" align="center">
                </el-table-column>
                <el-table-column prop="OPERATOR" label="操作员" min-width="150" align="center">
                </el-table-column>
            </el-table>
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 20, 30, 50]" :page-size="pageSize" layout="total, sizes, prev, pager, next" :total="total">
            </el-pagination>
        </el-row>
    </div>
</template>
<script>
    import Const from '@/config'
    export default {
        data() {
            return {
                autorefund_date: [],
                loading: false,
                formdata: {
                    orderno: '',
                    refundno: ''
                },
                total: 0,
                pageSize: 10,
                currentPage: 1,
                tableData: []
            }
        },
        methods: {
            tableRowClassName(row) {
                var index = row.rowIndex;
                if (row.rowIndex % 2 !== 0) {
                    return 'info-row';
                }
                return 'positive-row';
            },
            scanAutoRefund: function () {
                let notice = {
                    title: '提示',
                    message: '操作成功',
                    offset: 100,
                    type: 'success',
                    duration: 2000
                };
                if (this.autorefund_date.length < 1) {
                    notice.message = '开始日期和结束日期不能为空！'
                    notice.type = 'error';
                    this.$notify(notice);
                    return false;
                }

                let params = new URLSearchParams();
                params.append('startTime', this.autorefund_date[0]);
                params.append('endTime', this.autorefund_date[1]);
                params.append('env',Const.env);
                this.$ajax.post(Const.host + "/trade/autorefund", params).then(resp => {
                    if (resp.data.Msg !== 'ok') {
                        notice.message = '操作失败';
                        notice.type = 'error';
                    }
                    this.$notify(notice);
                }).catch(err => {
                    console.error(err);
                })
            },
            search: function () {
                this.currentPage = 1;
                this.pageSize = 10;
                this.getData();
            },
            getData: function () {
                this.$ajax.get(Const.host + "/trade/autorefund/list", {
                    params: {
                        orderno: this.formdata.orderno,
                        refundno: this.formdata.refundno,
                        curpage: this.currentPage,
                        offset: this.pageSize,
                        env:Const.env
                    }
                }).then(resp => {
                    //console.log(resp.data);
                    if (resp.data.Code === 200) {
                        this.total = parseInt(resp.data.Data.count);
                        this.tableData = resp.data.Data.list;
                    }
                }).catch(err => {
                    console.error(err);
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

        },
        mounted: function () {
            this.getData();
        }
    }
</script>