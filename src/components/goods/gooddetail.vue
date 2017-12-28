<template>
    <div>
        <el-row v-loading.fullscreen.lock="fullLoading">
            <el-col :span="8">
                <div>
                    <el-button type="primary" size="small" @click="back" icon="el-icon-arrow-left"></el-button>
                    <el-tag type="primary">商品ID：{{goodsId}}</el-tag>
                    <el-tag type="warning">业态：{{orderCode}}</el-tag>
                </div>
            </el-col>
            <el-col :span="2" :offset="14">
                <div>
                    <el-button type="success" size="small" @click="getGoodDetail" icon="el-icon-refresh"></el-button>
                </div>
            </el-col>
        </el-row>
        <el-row>
            <div class="content_div">
                <el-table :data="skuStores" border style="width: 100%">
                    <el-table-column prop="skuId" label="SkuId" width="100" header-align="center"></el-table-column>
                    <el-table-column prop="attr" label="销售属性" width="100" header-align="center"></el-table-column>
                    <el-table-column prop="storeId" label="门店Id" min-width="150" header-align="center"></el-table-column>
                    <el-table-column prop="storeName" label="门店名称" min-width="240" header-align="center"></el-table-column>
                    <el-table-column prop="costPrice" label="成本价" header-align="center"></el-table-column>
                    <el-table-column prop="price" label="销售价" header-align="center"></el-table-column>
                    <el-table-column prop="fixedPrice" label="促销价" header-align="center"></el-table-column>
                    <el-table-column prop="promotionId" label="促销id" header-align="center"></el-table-column>
                    <el-table-column prop="stockLockNum" label="锁定库存" header-align="center"></el-table-column>
                    <el-table-column prop="stockLeftNum" label="剩余库存" header-align="center"></el-table-column>
                    <el-table-column prop="stockSaleNum" label="已售库存" header-align="center"></el-table-column>
                    <el-table-column label="操作" fixed="right">
                        <template slot-scope="scope">
                            <el-button type="primary" @click="createOrder(scope.row)" v-if="orderCode==='7023'||orderCode==='7160'">下单</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <div class="content_div">
                <pre>{{goodsDetail}}</pre>
            </div>
        </el-row>
    </div>
</template>
<script>
    import Const from '@/config';
    export default {
        data() {
            return {
                goodsId: '',
                orderCode: '',
                goodsDetail: '',
                fullLoading: false,
                skuStores: [],
                storeInfos: {},
                goodsInfo: {}
            }
        },
        mounted: function () {
            this.goodsId = this.$route.query.goodsId;
            this.getGoodDetail();
        },
        methods: {
            back: function () {
                this.$router.push({
                    path: '/goods'
                })
            },
            getGoodDetail: function () {
                this.fullLoading = true;
                this.$ajax.get(Const.apiEnv[Const.env] + "/goods/v3/goods/forward/" + this.goodsId).then(resp => {
                    //console.log(resp);
                    let respData = resp.data.data;
                    let keys = Object.keys(respData);
                    if (resp.data.status !== 200 && keys.length < 1) return false;
                    this.goodsDetail = JSON.stringify(respData, null, 4)
                    this.goodsInfo = {
                        goods: respData.goods,
                    }
                    let goodsSkus = respData.goodsSkus;
                    let saleFlag = respData.goods.saleFlag;
                    let logisticsFlag = respData.goods.logisticsFlag;
                    let logisticsType = respData.goods.logisticsType;
                    let category1Id = respData.goods.category1Id;
                    let brandId = respData.goods.brandId;

                    if (saleFlag === 0 && logisticsFlag === 1) {
                        this.orderCode = logisticsType === 0 ? '7023' : '7113'
                    } else if (saleFlag === 3) {
                        this.orderCode = '7160';
                    } else {
                        this.orderCode = '无效业态';
                    }

                    this.skuStores = [];
                    for (let i = 0; i < goodsSkus.length; i++) {
                        let attr = '';
                        for (let index in goodsSkus[i].selection) {
                            attr = attr + " " + goodsSkus[i].selection[index].attrValue;
                        }
                        for (let index in goodsSkus[i].stockPrices) {
                            let len = this.skuStores.push(goodsSkus[i].stockPrices[index]);
                            this.skuStores[len - 1]["attr"] = attr;
                        }
                    }

                    let storeIds = [];
                    this.skuStores.forEach(v => {
                        if (!storeIds.includes(v.storeId)) {
                            storeIds.push(v.storeId);
                        }
                    })

                    // 7160只支持单门店，以skuId为主键匹配
                    if (this.orderCode === '7160' && goodsSkus.length > 0) {
                        let skuItemObj = {};
                        goodsSkus.forEach(v => {
                            skuItemObj[v.id] = v.skuItems;
                        });
                        this.skuStores.forEach(s => {
                            this.$set(s, "skuItems", skuItemObj[s.skuId]);
                        })
                    }

                    var params = new URLSearchParams();
                    params.append('brandId', brandId);
                    params.append('category1Id', category1Id);

                    var skuStore = [];
                    for (let index in this.skuStores) {
                        skuStore.push({
                            skuId: this.skuStores[index].skuId,
                            storeId: this.skuStores[index].storeId,
                            price: this.skuStores[index].price
                        })
                    }
                    params.append('skuParmas', JSON.stringify(skuStore));
                    this.$ajax.post(
                        Const.apiEnv[Const.env] + "/ffan/v2/shopping3/GoodsSkuPromotion?__uni_source=1.5",
                        params).then(resp => {
                        if (resp.data.status === 200) {
                            var storeProList = resp.data.data.storeSkuSaleList;
                            this.skuStores.forEach(s => {
                                let promotionId = 0;
                                let fixedPrice = '-';
                                let validDate = '';
                                if (typeof (storeProList[s.storeId]) !== 'undefined' && typeof (storeProList[s.storeId][s.skuId]) !== 'undefined') {
                                    promotionId = storeProList[s.storeId][s.skuId]["promotionId"];
                                    fixedPrice = storeProList[s.storeId][s.skuId]["fixedPrice"];
                                    validDate = storeProList[s.storeId][s.skuId]["validDate"];
                                }
                                this.$set(s, "promotionId", promotionId);
                                this.$set(s, "fixedPrice", fixedPrice);
                                this.$set(s, "validDate", validDate);
                            })
                        }
                    }).catch(err => {
                        console.error(err)
                    })

                    this.$ajax.get(Const.apiEnv[Const.env] + "/v1/cdaservice/stores/multi", {
                        params: {
                            storeIds: JSON.stringify(storeIds)
                        }
                    }).then(resp => {
                        this.storeInfos = {};
                        if (resp.data.status === 200) {
                            let datas = resp.data.data;
                            for (let i = 0; i < datas.length; i++) {
                                this.storeInfos[datas[i].storeId + ""] = datas[i].storeName;
                            }
                            for (let index in this.skuStores) {
                                this.$set(this.skuStores[index], "storeName", this.storeInfos[this.skuStores[
                                    index].storeId])
                            }
                        }
                        this.fullLoading = false;
                    }).catch(err => {
                        console.error(err);
                        this.fullLoading = false;
                    })
                }).catch(err => {
                    this.fullLoading = false;
                    console.error(err);
                })
            },
            saveUids: function () {
                var uids = JSON.parse(localStorage.getItem("uids"));
                if (uids === null || typeof (uids) === 'undefined') uids = [];

                var uidArr = uids.map(u => {
                    return u.value + "_" + u.label;
                });

                if (Const.uid !== '' && !uidArr.includes(Const.uid + "_" + Const.env)) {
                    uids.push({
                        "value": Const.uid,
                        "label": Const.env
                    })
                    localStorage.setItem("uids", JSON.stringify(uids));
                }
            },
            createOrder: function (row) {
                if (Const.supportLocalStorage) this.saveUids();
                var notice = {
                    title: '提示',
                    message: '',
                    offset: 100,
                    type: 'success',
                    duration: 2000
                };


                let params = new URLSearchParams();
                params.append('tradeCode', this.orderCode);
                params.append('phoneNo', '13000000000');
                params.append('orderSrc', '2010');
                params.append('memberId', Const.uid);
                params.append('totalPrice', row.promotionId != '0' ? row.fixedPrice : row.price);

                var productInfos = [];
                if (this.orderCode === '' || this.orderCode === '无效业态') {
                    notice.message = '业态无效无法下单,请确认商品售卖属性';
                    notice.type = 'error';
                    this.$notify(notice);

                    return false;
                } else if (Const.uid === '') {
                    notice.message = '用户ID不能为空，请先选择UID！';
                    notice.type = 'error';
                    this.$notify(notice);

                    return false;
                } else if (this.orderCode === '7023') {
                    params.append('buyNow', 1);
                    productInfos = [{
                        buyNow: "1",
                        count: 1,
                        productId: row.skuId,
                        productInfo: {
                            attribute: row.attr,
                            parentId: this.goodsId,
                            pic: '',
                            price: row.price,
                            storeId: row.storeId,
                            storeName: row.storeName,
                            title: this.goodsId,
                            tradeCode: this.orderCode
                        },
                        promotionId: row.promotionId
                    }];
                } else if (this.orderCode === '7160') {
                    params.append('storeId', row.storeId);
                    productInfos = [{
                        productId: this.goodsId,
                        count: 1,
                        productCode: '7160',
                        productInfo: {
                            spacId: row.skuId,
                            tradeCode: '7160',
                            price: row.price,
                            title: this.goodsId,
                            pic: '',
                            parentId: row.storeId,
                            productId: this.goodsId,
                            skuid: row.skuId,
                            storeId: row.storeId,
                            costPrice: row.costPrice,
                            logisticsFlag: this.goodsInfo.goods.logisticsFlag,
                            logisticsType: this.goodsInfo.goods.logisticsType,
                            unconsumedRefundFlag: this.goodsInfo.goods.unconsumedRefundFlag,
                            unconsumedRefund: this.goodsInfo.goods.unconsumedRefund,
                            consumedRefundFlag: this.goodsInfo.goods.consumedRefundFlag,
                            consumedRefund: this.goodsInfo.goods.consumedRefund,
                            freeDelivery: 0,
                            skuItems: row.skuItems
                        }
                    }];
                }

                params.append('productInfos', JSON.stringify(productInfos));
                this.$ajax.post(Const.apiEnv[Const.env] + "/ffan/v6/orderCalculate", params).then(resp => {
                    let respData = resp.data;
                    //console.log(respData)
                    if (respData.status === 200) {
                        this.$ajax.post(Const.apiEnv[Const.env] + '/ffan/v6/order', params).then(resp => {
                            let respData = resp.data;
                            if (respData.status !== 200) {
                                notice.message = respData.message;
                                notice.type = 'error';
                            } else {
                                notice.message = '订单创建成功：' + respData.data.orderNo;
                                notice.type = 'success';
                            }
                            this.$notify(notice);
                        }).catch(err => {
                            console.error(err);
                        })
                    } else {
                        notice.message = respData.message;
                        notice.type = 'error';
                        this.$notify(notice);
                    }
                }).catch(err => {
                    console.error(err)
                })
            }
        }
    }
</script>
<style lang="scss">
    .content_div {
        margin-top: 2px;
        border: 1px #1e90ff dashed;
        padding: 4px;
        word-wrap: break-word;
    }
</style>