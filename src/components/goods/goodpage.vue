<template>
    <el-row>
        <el-form :inline="true" v-model="formdata" >
            <el-form-item label="商品ID">
                <el-input v-model="formdata.goodsId" placeholder="商品ID"></el-input>
            </el-form-item>
            <el-form-item label="商品名称">
                <el-input v-model="formdata.name" placeholder="商品名称"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="search">查询</el-button>
            </el-form-item>
        </el-form>
        <el-table v-loading="loading" :data="tableData" border style="width: 100%" :row-class-name="tableRowClassName">
            <el-table-column fixed label="商品ID" width="150" align="center">
                <template slot-scope="scope">
                    <a @mouseover="goodsLink(scope.row)" :href="scope.row.href" target="__blank">{{scope.row.id}}</a>
                </template>
            </el-table-column>
            <el-table-column prop="name" label="商品名称" width="350" align="center">
            </el-table-column>
            <el-table-column prop="publisherSubjectId" label="商户ID" width="150" align="center">
            </el-table-column>
            <el-table-column prop="price" label="最低销售价" width="100" align="center">
            </el-table-column>
            <el-table-column prop="brandId" label="品牌ID" width="100" align="center">
            </el-table-column>
            <el-table-column prop="goodsStatus" label="状态" min-width="100" align="center" :formatter="statusFormatter">
            </el-table-column>
            <el-table-column fixed="right" label="操作" width="180" align="center">
                <template slot-scope="scope">
                    <el-button @click="getDetail(scope.row)" type="text" size="small">数据详情</el-button>
                    <el-button @click="getQRCode(scope.row)" type="text" size="small">二维码</el-button>
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
        data() {
            return {
                loading: false,
                total: 0,
                pageSize: 10,
                currentPage: 1,
                tableData: [],
                formdata: {
                    name: '',
                    goodsId: ''
                },
            }
        },
        mounted: function () {
            this.getData();
        },
        beforeRouteEnter: (to, from, next) => {
            if ('gooddetail' !== from.name) {
                next(vm => {
                    vm.search()
                });
                return false;
            }
            next();
        },
        methods: {
            goodsLink: function (row) {
                var goodsId = row.id;
                var reg = new RegExp("cityId")
                if (reg.test(row.href)) return false;
                this.$ajax.get(Const.apiEnv[Const.env] + "/goodsmanager/v3/store/" + goodsId).then(resp => {
                    if (resp.data.status === 200) {
                        var cityId = resp.data.data.length > 0 ? resp.data.data[0].cityId : '';
                        var url = Const.h5Env[Const.env] + "/nw/?#/goods/detail/qixi-2017?goodsCode=" +
                            goodsId + "&cityId=" + cityId;
                        this.$set(row, 'href', url);
                    }
                })
            },
            getData: function () {
                this.loading = true;
                this.$ajax.get(Const.apiEnv[Const.env] + "/goodsmanager/v3/goods/page", {
                    params: {
                        name: this.formdata.name,
                        goodsId: this.formdata.goodsId,
                        page: this.currentPage,
                        size: this.pageSize
                    }
                }).then(resp => {
                    //console.log(resp.data)
                    if (resp.data.status === 200) {
                        var items = resp.data.data.items;
                        for (var i in items) {
                            items[i]["href"] =
                                Const.h5Env[Const.env] + "/nw/?#/goods/detail/qixi-2017?goodsCode=" + items[i]
                                .id;
                        }
                        this.tableData = items;
                        this.total = resp.data.data.totalCount;
                    } else {
                        this.tableData = [];
                        this.total = 0;
                    }
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
            getDetail: function (row) {
                this.$router.push({
                    path: '/gooddetail',
                    query: {
                        goodsId: row.id
                    }
                })
            },
            getQRCode: function (row) {
                var goodsId = row.id;
                var url = Const.host + "/good/qrcode?goodsId=" + row.id + "&env=" + Const.env;
                this.$alert('<img src="' + url + '"/>', row.name, {
                    dangerouslyUseHTMLString: true,
                    center: true,
                    closeOnPressEscape: true,
                    closeOnClickModal: true
                });
            },
            tableRowClassName(row) {
                var index = row.rowIndex;
                if (row.rowIndex % 2 !== 0) {
                    return 'info-row';
                }
                return 'positive-row';
            },
            handleSizeChange(curSize) {
                this.pageSize = curSize;
                this.getData();
            },
            handleCurrentChange(curPage) {
                this.currentPage = curPage;
                this.getData();
            },
            statusFormatter(row, column, cellValue) {
                switch (cellValue) {
                    case 0:
                        return '草稿';
                    case 1:
                        return '待审核';
                    case 2:
                        return '已上架';
                    case 3:
                        return '已下架';
                    case 4:
                        return '已驳回';
                    case 5:
                        return '待发布';
                    case 6:
                        return '下架待审核';
                    case 7:
                        return '已撤销';
                    default:
                        return '未知'
                }
            }
        }
    }
</script>
<style lang="scss">

</style>