<template>
    <div>
        <el-row>
            <el-tag type="primary">退款单号：{{$route.query.refundno}}</el-tag>
            <el-button size="primary" @click="back">返回</el-button>
        </el-row>
        <el-row>
            <div class="hr0"></div>
        </el-row>
        <el-collapse v-model="activeName" accordion @change="changeItem">
            <el-collapse-item title="TRADE_REFUND" name="TRADE_REFUND">
                <el-row class="diff_tb">
                    <el-table :border="true" :data="diffdata.refund" :row-class-name="tableRowClassName">
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
                            <pre v-text="orderdata.refund.sh"></pre>
                        </div>
                    </el-col>
                    <el-col :span="11" :offset="1">
                        <el-tag type="success">北京</el-tag>
                        <div class="order_value">
                            <pre v-text="orderdata.refund.bj"></pre>
                        </div>
                    </el-col>
                </el-row>
            </el-collapse-item>
        </el-collapse>
    </div>
</template>
<script>
    import Const from '@/config'
    export default {
        data() {
            return {
                diffdata: {
                    refund: [],
                },
                activeName: 'TRADE_REFUND',
                orderdata: {
                    refund: {
                        sh: "",
                        bj: ""
                    },
                },
                refundno: ''
            }
        },
        mounted: function () {
            //console.log(this.$route.query.refundno);
            this.refundno = this.$route.query.refundno;
            this.getRefunds();
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
                    path: "/refund"
                });
            },
            changeItem: function (activeName) {
                switch (activeName) {
                    case 'TRADE_REFUND':
                        this.getRefunds()
                        break;
                }
            },
            getRefunds: function () {
                this.$ajax.get(Const.host + "/trade/refund?refundno=" + this.refundno + "&env=" + Const.env).then(response => {
                    var refund_sh = response.data.Data.sh[0]
                    var refund_bj = response.data.Data.bj[0]

                    this.orderdata.refund.sh = JSON.stringify(refund_sh, null, 4)
                    this.orderdata.refund.bj = JSON.stringify(refund_bj, null, 4)
                    this.diffdata.refund = [];
                    for (var key in refund_sh) {
                        if (refund_sh[key] !== refund_bj[key]) {
                            this.diffdata.refund.push({
                                "key": key,
                                "sh": refund_sh[key],
                                "bj": refund_bj[key]
                            })
                        }
                    }

                }).catch(err => {
                    console.error(err)
                })
            },
        }
    };
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