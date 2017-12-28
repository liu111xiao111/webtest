<template>
    <div style="width:99%">
        <el-row>
            <el-table :data="tableData" border style="width: 100%" >
                <el-table-column prop="shangping" label="商品名称" width="140" align="center"></el-table-column>
                <el-table-column prop="storeName" label="门店名称" width="220" header-align="center"></el-table-column>
                <el-table-column prop="storeId" label="门店Id" width="100" header-align="center"></el-table-column>
                <el-table-column prop="attr" label="销售属性" width="70" header-align="center"></el-table-column>
                <el-table-column prop="price" label="销售价" width="200" header-align="center"></el-table-column>
                <el-table-column prop="rule" label="限制规则" width="200" header-align="center"></el-table-column>
                <el-table-column label="操作" fixed="right">
                    <template slot-scope="scope">
                            <el-button type="primary" @click="common7023(scope.row)" :loading="scope.row.using" v-if="scope.row.shangping==='7023普通商品'">普通7023</el-button>
                            <el-button type="primary" @click="common7113(scope.row)" :loading="scope.row.using" v-if="scope.row.shangping==='7113普通商品'">普通7113</el-button>
                            <el-button type="primary" @click="common7160(scope.row)" :loading="scope.row.using" v-if="scope.row.shangping==='7160电影券包'">普通7160</el-button>
                            <el-button type="primary" @click="rule7023(scope.row)" :loading="scope.row.using" v-if="scope.row.shangping==='7023限购一次'">限购7023</el-button>
                            <el-button type="primary" @click="rule7113(scope.row)" :loading="scope.row.using" v-if="scope.row.shangping==='7113限购一次'">限购7113</el-button>
                            <el-button type="primary" @click="rule7160(scope.row)" :loading="scope.row.using" v-if="scope.row.shangping==='7160限购一次'">限购7160</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-row>
        <el-row>
            <el-col :span="24">
                <el-input type="textarea" placeholder="生成结果" v-model="id" :autosize="{minRows:8}"></el-input>
            </el-col>
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
      idd:'',
      url:'',
      checkList: [],
      cookie:'',
      tableData: [{
            
            shangping: '7023普通商品',
            attr: '鞋码39 鞋码38',
            storeId:'10556479，10556481',
            storeName: '植物医生测试（商圈内门店1） 植物医生测试（商圈内门店3）',
            price:'门店1的价格21.32， 4.99，门店2的价格41.32，9.99',
            rule:'2017-11-26 00:00:00 - 2018-12-14 15:15:00, 限购 100 个',
            using:false
          },{
            shangping: '7113普通商品',
            attr: '鞋码38',
            storeId:'10556479',
            storeName: '植物医生测试（商圈内门店1）',
            price:'	门店1的价格20',
            rule:'2017-11-26 00:00:00 - 2018-12-14 15:15:00, 限购 100 个',
            using:false
          },
          {
            shangping: '7160电影券包',
            attr: '鞋码39',
            storeId:'10556479',
            storeName: '植物医生测试（商圈内门店1）',
            price:'	门店1的价格30',
            rule:'2017-11-26 00:00:00 - 2018-12-14 15:15:00, 限购 100 个',
            using:false
          },
          {
            
            shangping: '7023限购一次',
            attr: '鞋码38',
            storeId:'10556479',
            storeName: '植物医生测试（商圈内门店1）',
            price:'门店1的价格31.22',
            rule:'2017-11-26 00:00:00 - 2019-03-07 10:10:00, 限购 1 个',
            using:false
          },{
            
            shangping: '7113限购一次',
            attr: '鞋码39',
            storeId:'10556479',
            storeName: '植物医生测试（商圈内门店1）',
            price:'门店1的价格32.41',
            rule:'2017-11-26 00:00:00 - 2019-03-07 10:10:00, 限购 1 个',
            using:false
          },{
            
            shangping: '7160限购一次',
            attr: '鞋码39',
            storeId:'10556479',
            storeName: '植物医生测试（商圈内门店1）',
            price:'门店1的价格18.72',
            rule:'2017-11-26 00:00:00 - 2019-03-07 10:10:00, 限购 1 个',
            using:false
          }],
    };
  },
  computed:{
    rid(){
      return "商品生成成功，商品ID为"+this.id;
    }
  },
  methods: {
    common7023: function(row) {
      var params = new URLSearchParams()
      params.append('publisherSubject', 0);
      params.append('publisherSubjectId', 10049024);
      params.append('merchantName', '植物医生测试商户');
      params.append('brandId', 20015933);
      params.append('category1Id', 1765);
      params.append('category2Id', 100417);
      params.append('category3Id', 1076);
      params.append('name', '7023普通商品');
      params.append('secondTitle', '');
      params.append('attributeGlobalSetting', 0);
      params.append('storeSKUs', JSON.stringify([{"storeId":10556479,"storeName":"植物医生测试（商圈内门店1）","cityId":310100,"plazaId":1000107,"skuList":[{"attributes":[{"behind":"","createTime":"2016-12-02 14:53:36","enable":"1","goodsAttrId":1000000873,"id":11788,"pic":"","showType":"02","sort":1,"type":"08","updateTime":"2017-10-20 21:56:09","value":"39","version":8,"attrName":"鞋码01","matched":true,"checked":true,"__priority":1}],"costPrice":"","priceCost":"21.32","stockLeftNum":"100","sellCode":"","barCode":""},{"attributes":[{"behind":"","createTime":"2016-12-02 14:53:36","enable":"1","goodsAttrId":1000000873,"id":11787,"pic":"","showType":"02","sort":1,"type":"08","updateTime":"2017-10-20 21:56:09","value":"38","version":8,"attrName":"鞋码01","matched":true,"checked":true,"__priority":1}],"costPrice":"","priceCost":"4.99","stockLeftNum":"100","sellCode":"","barCode":""}],"entGroupId":10001},{"storeId":10556481,"storeName":"植物医生测试（商圈内门店3）","cityId":310100,"plazaId":1000107,"skuList":[{"attributes":[{"behind":"","createTime":"2016-12-02 14:53:36","enable":"1","goodsAttrId":1000000873,"id":11788,"pic":"","showType":"02","sort":1,"type":"08","updateTime":"2017-10-20 21:56:09","value":"39","version":8,"attrName":"鞋码01","matched":true,"checked":true,"__priority":1}],"costPrice":"","priceCost":"41.32","stockLeftNum":"100","sellCode":"","barCode":""},{"attributes":[{"behind":"","createTime":"2016-12-02 14:53:36","enable":"1","goodsAttrId":1000000873,"id":11787,"pic":"","showType":"02","sort":1,"type":"08","updateTime":"2017-10-20 21:56:09","value":"38","version":8,"attrName":"鞋码01","matched":true,"checked":true,"__priority":1}],"costPrice":"","priceCost":"9.99","stockLeftNum":"100","sellCode":"","barCode":""}],"entGroupId":10001}]));
      params.append('blCodeFrom', 0);
      params.append('goodsScopeInfoList', JSON.stringify([{"plazaId":1000107,"cityId":310100,"storeId":10556479,"entGroupId":10001},{"plazaId":1000107,"cityId":310100,"storeId":10556481,"entGroupId":10001}]));
      params.append('priceCost', 200);
      params.append('saleFlag', 0);
      params.append('combinationGoodsType', 0);
      params.append('searchFlag', 0);
      params.append('goodsPics', JSON.stringify([{"pic":"http://img1.ffan.com/T1hKJgBydj1RCvBVdK"}]));
      params.append('mobileContent', JSON.stringify([{"content":"http://img1.ffan.com/T1VdYgBQJT1RCvBVdK","isPic":true}]));
      params.append('launchType', 1);
      params.append('launchTime', '');
      params.append('cancelType', 1);
      params.append('cancelTime', '');
      params.append('ifAutoOffShelf', 0);
      params.append('refundValidateType', 1);
      params.append('refundDynamicValueInHours', 72);
      params.append('fixRefundBeginTime', '');
      params.append('fixRefundEndTime', '');
      params.append('ruleInfo', JSON.stringify({"startTime":"2017-11-26 00:00:00","endTime":"2018-12-14 15:15:00","ruleNum":"100"}));
      params.append('freeDelivery', 0);
      params.append('settlementType', 1);
      params.append('consumedRefundFlag', 1);
      params.append('goodsId', -1);
      params.append('status', 1);
      params.append('logisticsType', 0);
      params.append('refundDayLimitType', 1);
      params.append('consumedRefundDays', 168);
      params.append('goodsAttributes', JSON.stringify([{"fill":"1","attrId":1000001533,"attrName":"长属性","attrValue":[{"attrValueId":13034,"attrValue":"ffffffffffffffffffff"}],"values":[{"behind":"","createTime":"2017-04-25 17:09:18","enable":"1","goodsAttrId":1000001533,"id":13032,"pic":"","showType":"02","sort":1,"type":"01","updateTime":"2017-04-25 17:10:47","value":"dggdfgfgfghghghjghjh","version":2},{"behind":"","createTime":"2017-04-25 17:09:18","enable":"1","goodsAttrId":1000001533,"id":13033,"pic":"","showType":"02","sort":1,"type":"01","updateTime":"2017-04-25 17:10:47","value":"我及开发股份和刚刚好就和钢结构和国际化及","version":2},{"behind":"","createTime":"2017-04-25 17:09:18","enable":"1","goodsAttrId":1000001533,"id":13034,"pic":"","showType":"02","sort":1,"type":"01","updateTime":"2017-04-25 17:10:47","value":"ffffffffffffffffffff","version":2}],"valueShowType":"02","valueType":"01","keyAttr":"1","enable":"1"}]));
      params.append('logisticsFlag', 1);
      params.append('stockFSType', 0);
      params.append('action', 'add');
      params.append('cookie',this.cookie)
      var header = { headers:{'Content-Type':'application/x-www-form-urlencoded'} } ;
      //console.log(header);
      row.using = true
      this.$ajax
        .post(
          Const.host+"/good/add",
          params,
          header
        )
        .then(resp => {
          let respData = resp.data;
          if (respData.status === 200) {
            this.result = JSON.stringify(resp.data, null, 4);
            this.id = "7023普通商品生成成功，商品ID为"+JSON.stringify(resp.data.data.id)
            row.using = false
          } else if(respData.code === "302"){
            let param = new URLSearchParams();
            param.append('username','18899997777');
            param.append('password','wanda123') 
            var header = { headers:{'Content-Type':'application/x-www-form-urlencoded'} } ;
            {
            this.$ajax.post(
                Const.host+"/common/bplogin",param,header
            ).then(resp =>{
                let respData = resp.data;
                if(respData.code === "200") {
                    this.cookie=resp.data.data;
                    params.set('cookie',this.cookie)
                    this.$ajax.post(
                                  Const.host+"/good/add",
                                    params,
                                    header
                    ).then(resp=>{
                        let respData = resp.data;
                        this.result = JSON.stringify(resp.data, null, 4);
                        this.id = "7023普通商品生成成功，商品ID为"+JSON.stringify(resp.data.data.id)
                        row.using = false
                    })
                    
                
                }else{this.id= '登录错误';
                      row.using = false}
            })
          }}
        }).catch(err => {
          console.error(err);
          this.id= '发生了一个未知错误';
          row.using = false;
        });
    },
      common7113: function(row) {
      var params = new URLSearchParams()
      params.append('publisherSubject', 0);
      params.append('publisherSubjectId', 10049024);
      params.append('merchantName', '植物医生测试商户');
      params.append('brandId', 20015933);
      params.append('category1Id', 1765);
      params.append('category2Id', 100417);
      params.append('category3Id', 1076);
      params.append('name', '7113普通商品');
      params.append('secondTitle', '');
      params.append('attributeGlobalSetting', 0);
      params.append('storeSKUs', JSON.stringify([{"storeId":10556479,"storeName":"植物医生测试（商圈内门店1）","cityId":310100,"plazaId":1000107,"skuList":[{"attributes":[{"behind":"","createTime":"2016-12-02 14:53:36","enable":"1","goodsAttrId":1000000873,"id":11787,"pic":"","showType":"02","sort":1,"type":"08","updateTime":"2017-10-20 21:56:09","value":"38","version":8,"attrName":"鞋码01","matched":true,"checked":true,"__priority":1}],"costPrice":"","priceCost":"20","stockLeftNum":"100","sellCode":"","barCode":""}],"entGroupId":10001}]));
      params.append('blCodeFrom', 0);
      params.append('goodsScopeInfoList', JSON.stringify([{"plazaId":1000107,"cityId":310100,"storeId":10556479,"entGroupId":10001}]));
      params.append('priceCost', 200);
      params.append('saleFlag', 0);
      params.append('combinationGoodsType', 0);
      params.append('searchFlag', 0);
      params.append('goodsPics', JSON.stringify([{"pic":"http://img1.ffan.com/T1hKJgBydj1RCvBVdK"}]));
      params.append('mobileContent', JSON.stringify([{"content":"http://img1.ffan.com/T1VdYgBQJT1RCvBVdK","isPic":true}]));
      params.append('launchType', 1);
      params.append('launchTime', '');
      params.append('cancelType', 1);
      params.append('cancelTime', '');
      params.append('ifAutoOffShelf', 0);
      params.append('refundValidateType', 1);
      params.append('refundDynamicValueInHours', 72);
      params.append('fixRefundBeginTime', '');
      params.append('fixRefundEndTime', '');
      params.append('ruleInfo', JSON.stringify({"startTime":"2017-11-26 00:00:00","endTime":"2018-12-14 15:15:00","ruleNum":"100"}));
      params.append('freeDelivery', 0);
      params.append('settlementType', 1);
      params.append('consumedRefundFlag', 1);
      params.append('goodsId', -1);
      params.append('status', 1);
      params.append('logisticsType', 2);
      params.append('refundDayLimitType', 4);
      params.append('goodsAttributes', JSON.stringify([{"fill":"1","attrId":1000001533,"attrName":"长属性","attrValue":[{"attrValueId":13034,"attrValue":"ffffffffffffffffffff"}],"values":[{"behind":"","createTime":"2017-04-25 17:09:18","enable":"1","goodsAttrId":1000001533,"id":13032,"pic":"","showType":"02","sort":1,"type":"01","updateTime":"2017-04-25 17:10:47","value":"dggdfgfgfghghghjghjh","version":2},{"behind":"","createTime":"2017-04-25 17:09:18","enable":"1","goodsAttrId":1000001533,"id":13033,"pic":"","showType":"02","sort":1,"type":"01","updateTime":"2017-04-25 17:10:47","value":"我及开发股份和刚刚好就和钢结构和国际化及","version":2},{"behind":"","createTime":"2017-04-25 17:09:18","enable":"1","goodsAttrId":1000001533,"id":13034,"pic":"","showType":"02","sort":1,"type":"01","updateTime":"2017-04-25 17:10:47","value":"ffffffffffffffffffff","version":2}],"valueShowType":"02","valueType":"01","keyAttr":"1","enable":"1"}]));
      params.append('logisticsFlag', 1);
      params.append('stockFSType', 0);
      params.append('action', 'add');
      params.append('cookie',this.cookie)
      var header = { headers:{'Content-Type':'application/x-www-form-urlencoded'} } ;
      //console.log(header);
      row.using = true
      this.$ajax
        .post(
          Const.host+"/good/add",
          params,
          header
        )
        .then(resp => {
          let respData = resp.data;
          if (respData.status === 200) {
            this.result = JSON.stringify(resp.data, null, 4);
            this.id = "7113普通商品生成成功，商品ID为"+JSON.stringify(resp.data.data.id)
            row.using = false
          } else if(respData.code === "302"){
            let param = new URLSearchParams();
            param.append('username','18899997777');
            param.append('password','wanda123') 
            var header = { headers:{'Content-Type':'application/x-www-form-urlencoded'} } ;
            {
            this.$ajax.post(
                Const.host+"/common/bplogin",param,header
            ).then(resp =>{
                let respData = resp.data;
                if(respData.code === "200") {
                    this.cookie=resp.data.data;
                    params.set('cookie',this.cookie)
                    this.$ajax.post(
                                  Const.host+"/good/add",
                                    params,
                                    header
                    ).then(resp=>{
                        let respData = resp.data;
                        this.result = JSON.stringify(resp.data, null, 4);
                        this.id = "7113普通商品生成成功，商品ID为"+JSON.stringify(resp.data.data.id);
                        row.using = false
                    })
                    
                }else{this.result= '登录错误';
                      row.using = false }
            })
          }}
        }).catch(err => {
          console.error(err);
          this.id= '发生了一个未知错误';
          row.using = false;
        });
    },
      common7160: function(row) {
      var params = new URLSearchParams()
      params.append('publisherSubject', 0);
      params.append('publisherSubjectId', 10049024);
      params.append('merchantName', '植物医生测试商户');
      params.append('brandId', 20015933);
      params.append('category1Id', 1765);
      params.append('category2Id', 100417);
      params.append('category3Id', 1076);
      params.append('name', '7160电影券包');
      params.append('secondTitle', '');
      params.append('attributeGlobalSetting', 0);
      params.append('storeSKUs', JSON.stringify([{"storeId":10556479,"storeName":"植物医生测试（商圈内门店1）","cityId":310100,"plazaId":1000107,"skuList":[{"attributes":[{"behind":"","createTime":"2016-12-02 14:53:36","enable":"1","goodsAttrId":1000000873,"id":11788,"pic":"","showType":"02","sort":1,"type":"08","updateTime":"2017-10-20 21:56:09","value":"39","version":8,"attrName":"鞋码01","matched":true,"checked":true,"__priority":1}],"costPrice":"","priceCost":"30","stockLeftNum":"100","sellCode":"","barCode":"","couponList":[{"type":0,"itemId":"20161201141328","num":1,"itemName":"电影测试10元券","price":"0.00","denominations":"10.00"}]}],"entGroupId":10001}]));
      params.append('blCodeFrom', 0);
      params.append('goodsScopeInfoList', JSON.stringify([{"plazaId":1000107,"cityId":310100,"storeId":10556479,"entGroupId":10001}]));
      params.append('priceCost', 200);
      params.append('saleFlag', 3);
      params.append('combinationGoodsType', 0);
      params.append('searchFlag', 0);
      params.append('goodsPics', JSON.stringify([{"pic":"http://img1.ffan.com/T1hKJgBydj1RCvBVdK"}]));
      params.append('mobileContent', JSON.stringify([{"content":"http://img1.ffan.com/T1VdYgBQJT1RCvBVdK","isPic":true}]));
      params.append('launchType', 1);
      params.append('launchTime', '');
      params.append('cancelType', 1);
      params.append('cancelTime', '');
      params.append('ifAutoOffShelf', 0);
      params.append('refundValidateType', 1);
      params.append('refundDynamicValueInHours', 72);
      params.append('fixRefundBeginTime', '');
      params.append('fixRefundEndTime', '');
      params.append('ruleInfo', JSON.stringify({"startTime":"2017-11-26 00:00:00","endTime":"2018-12-14 15:15:00","ruleNum":"100"}));
      params.append('freeDelivery', 0);
      params.append('settlementType', 1);
      params.append('consumedRefundFlag', 1);
      params.append('goodsId', -1);
      params.append('status', 1);
      params.append('logisticsType', 2);
      params.append('refundDayLimitType', 1);
      params.append('consumedRefundDays', 168);
      params.append('goodsAttributes', JSON.stringify([{"fill":"1","attrId":1000001533,"attrName":"长属性","attrValue":[{"attrValueId":13033,"attrValue":"我及开发股份和刚刚好就和钢结构和国际化及"}],"values":[{"behind":"","createTime":"2017-04-25 17:09:18","enable":"1","goodsAttrId":1000001533,"id":13032,"pic":"","showType":"02","sort":1,"type":"01","updateTime":"2017-04-25 17:10:47","value":"dggdfgfgfghghghjghjh","version":2},{"behind":"","createTime":"2017-04-25 17:09:18","enable":"1","goodsAttrId":1000001533,"id":13033,"pic":"","showType":"02","sort":1,"type":"01","updateTime":"2017-04-25 17:10:47","value":"我及开发股份和刚刚好就和钢结构和国际化及","version":2},{"behind":"","createTime":"2017-04-25 17:09:18","enable":"1","goodsAttrId":1000001533,"id":13034,"pic":"","showType":"02","sort":1,"type":"01","updateTime":"2017-04-25 17:10:47","value":"ffffffffffffffffffff","version":2}],"valueShowType":"02","valueType":"01","keyAttr":"1","enable":"1"}]));
      params.append('logisticsFlag', 0);
      params.append('stockFSType', 0);
      params.append('action', 'add');
      params.append('cookie',this.cookie)
      var header = { headers:{'Content-Type':'application/x-www-form-urlencoded'} } ;
      //console.log(header);
      row.using = true
      this.$ajax
        .post(
          Const.host+"/good/add",
          params,
          header
        )
        .then(resp => {
          let respData = resp.data;
          if (respData.status === 200) {
            this.result = JSON.stringify(resp.data, null, 4);
            this.id = "7160普通商品生成成功，商品ID为"+JSON.stringify(resp.data.data.id)
            row.using = false
          } else if(respData.code === "302"){
            let param = new URLSearchParams();
            param.append('username','18899997777');
            param.append('password','wanda123') 
            var header = { headers:{'Content-Type':'application/x-www-form-urlencoded'} } ;
            {
            this.$ajax.post(
                Const.host+"/common/bplogin",param,header
            ).then(resp =>{
                let respData = resp.data;
                if(respData.code === "200") {
                    this.cookie=resp.data.data;
                    params.set('cookie',this.cookie)
                    this.$ajax.post(
                                  Const.host+"/good/add",
                                    params,
                                    header
                    ).then(resp=>{
                        let respData = resp.data;
                        this.result = JSON.stringify(resp.data, null, 4);
                        this.id = "7160普通商品生成成功，商品ID为"+JSON.stringify(resp.data.data.id)
                        row.using = false
                    })               
                }else{this.result= '登录错误';row.using = false}
            })
          }}
        }).catch(err => {
          console.error(err);
          this.id= '发生了一个未知错误';
          row.using = false;
        });
    },
    rule7023: function(row) {
      var params = new URLSearchParams()
      params.append('publisherSubject', 0);
      params.append('publisherSubjectId', 10049024);
      params.append('merchantName', '植物医生测试商户');
      params.append('brandId', 20015933);
      params.append('category1Id', 1765);
      params.append('category2Id', 100417);
      params.append('category3Id', 1076);
      params.append('name', '7023限购一次');
      params.append('secondTitle', '');
      params.append('attributeGlobalSetting', 0);
      params.append('storeSKUs', JSON.stringify([{"storeId":10556479,"storeName":"植物医生测试（商圈内门店1）","cityId":310100,"plazaId":1000107,"skuList":[{"attributes":[{"behind":"","createTime":"2016-12-02 14:53:36","enable":"1","goodsAttrId":1000000873,"id":11788,"pic":"","showType":"02","sort":1,"type":"08","updateTime":"2017-10-20 21:56:09","value":"39","version":8,"attrName":"鞋码01","matched":true,"checked":true,"__priority":1}],"costPrice":"","priceCost":"32.41","stockLeftNum":"100","sellCode":"","barCode":""}],"entGroupId":10001}]));
      params.append('blCodeFrom', 0);
      params.append('goodsScopeInfoList', JSON.stringify([{"plazaId":1000107,"cityId":310100,"storeId":10556479,"entGroupId":10001}]));
      params.append('priceCost', 200);
      params.append('saleFlag', 0);
      params.append('combinationGoodsType', 0);
      params.append('searchFlag', 0);
      params.append('splitFlag', 1);
      params.append('goodsPics', JSON.stringify([{"pic":"http://img1.ffan.com/T1hKJgBydj1RCvBVdK"}]));
      params.append('mobileContent', JSON.stringify([{"content":"http://img1.ffan.com/T1VdYgBQJT1RCvBVdK","isPic":true}]));
      params.append('launchType', 1);
      params.append('launchTime', '');
      params.append('cancelType', 1);
      params.append('cancelTime', '');
      params.append('ifAutoOffShelf', 0);
      params.append('refundValidateType', 1);
      params.append('refundDynamicValueInHours', 72);
      params.append('fixRefundBeginTime', '');
      params.append('fixRefundEndTime', '');
      params.append('ruleInfo', JSON.stringify({"startTime":"2017-11-26 00:00:00","endTime":"2019-03-07 10:10:00","ruleNum":"1"}));
      params.append('freeDelivery', 0);
      params.append('settlementType', 1);
      params.append('consumedRefundFlag', 1);
      params.append('goodsId', -1);
      params.append('status', 1);
      params.append('logisticsType', 0);
      params.append('refundDayLimitType', 1);
      params.append('consumedRefundDays', 168);
      params.append('goodsAttributes', JSON.stringify([{"fill":"1","attrId":1000001533,"attrName":"长属性","attrValue":[{"attrValueId":13033,"attrValue":"我及开发股份和刚刚好就和钢结构和国际化及"}],"values":[{"behind":"","createTime":"2017-04-25 17:09:18","enable":"1","goodsAttrId":1000001533,"id":13032,"pic":"","showType":"02","sort":1,"type":"01","updateTime":"2017-04-25 17:10:47","value":"dggdfgfgfghghghjghjh","version":2},{"behind":"","createTime":"2017-04-25 17:09:18","enable":"1","goodsAttrId":1000001533,"id":13033,"pic":"","showType":"02","sort":1,"type":"01","updateTime":"2017-04-25 17:10:47","value":"我及开发股份和刚刚好就和钢结构和国际化及","version":2},{"behind":"","createTime":"2017-04-25 17:09:18","enable":"1","goodsAttrId":1000001533,"id":13034,"pic":"","showType":"02","sort":1,"type":"01","updateTime":"2017-04-25 17:10:47","value":"ffffffffffffffffffff","version":2}],"valueShowType":"02","valueType":"01","keyAttr":"1","enable":"1"}]));
      params.append('logisticsFlag', 1);
      params.append('stockFSType', 0);
      params.append('action', 'add');
      params.append('cookie',this.cookie)
      var header = { headers:{'Content-Type':'application/x-www-form-urlencoded'} } ;
      //console.log(header);
      row.using = true
      this.$ajax
        .post(
          Const.host+"/good/add",
          params,
          header
        )
        .then(resp => {
          let respData = resp.data;
          if (respData.status === 200) {
            this.result = JSON.stringify(resp.data, null, 4);
            this.id = "7023限制一次商品生成成功，商品ID为"+JSON.stringify(resp.data.data.id)
            row.using = false
          } else if(respData.code === "302"){
            let param = new URLSearchParams();
            param.append('username','18899997777');
            param.append('password','wanda123') 
            var header = { headers:{'Content-Type':'application/x-www-form-urlencoded'} } ;
            {
            this.$ajax.post(
                Const.host+"/common/bplogin",param,header
            ).then(resp =>{
                let respData = resp.data;
                if(respData.code === "200") {
                    this.cookie=resp.data.data;
                    params.set('cookie',this.cookie)
                    this.$ajax.post(
                                  Const.host+"/good/add",
                                    params,
                                    header
                    ).then(resp=>{
                        let respData = resp.data;
                        this.result = JSON.stringify(resp.data, null, 4);
                        this.id = "7023限制一次商品生成成功，商品ID为"+JSON.stringify(resp.data.data.id)
                        row.using = false
                    })
                    
                
                }else{this.result= '登录错误';row.using = false}
            })
          }}
        }).catch(err => {
          console.error(err);
          this.id= '发生了一个未知错误';
          row.using = false;
        });
    },
    rule7113: function(row) {
      var params = new URLSearchParams()
      params.append('publisherSubject', 0);
      params.append('publisherSubjectId', 10049024);
      params.append('merchantName', '植物医生测试商户');
      params.append('brandId', 20015933);
      params.append('category1Id', 1765);
      params.append('category2Id', 100417);
      params.append('category3Id', 1076);
      params.append('name', '7113限购一次');
      params.append('secondTitle', '');
      params.append('attributeGlobalSetting', 0);
      params.append('storeSKUs', JSON.stringify([{"storeId":10556479,"storeName":"植物医生测试（商圈内门店1）","cityId":310100,"plazaId":1000107,"skuList":[{"attributes":[{"behind":"","createTime":"2016-12-02 14:53:36","enable":"1","goodsAttrId":1000000873,"id":11787,"pic":"","showType":"02","sort":1,"type":"08","updateTime":"2017-10-20 21:56:09","value":"38","version":8,"attrName":"鞋码01","matched":true,"checked":true,"__priority":1}],"costPrice":"","priceCost":"31.22","stockLeftNum":"100","sellCode":"","barCode":""}],"entGroupId":10001}]));
      params.append('blCodeFrom', 0);
      params.append('goodsScopeInfoList', JSON.stringify([{"plazaId":1000107,"cityId":310100,"storeId":10556479,"entGroupId":10001}]));
      params.append('priceCost', 200);
      params.append('saleFlag', 0);
      params.append('combinationGoodsType', 0);
      params.append('searchFlag', 0);
      params.append('splitFlag', 1);
      params.append('goodsPics', JSON.stringify([{"pic":"http://img1.ffan.com/T1hKJgBydj1RCvBVdK"}]));
      params.append('mobileContent', JSON.stringify([{"content":"http://img1.ffan.com/T1VdYgBQJT1RCvBVdK","isPic":true}]));
      params.append('launchType', 1);
      params.append('launchTime', '');
      params.append('cancelType', 1);
      params.append('cancelTime', '');
      params.append('ifAutoOffShelf', 0);
      params.append('refundValidateType', 1);
      params.append('refundDynamicValueInHours', 72);
      params.append('fixRefundBeginTime', '');
      params.append('fixRefundEndTime', '');
      params.append('ruleInfo', JSON.stringify({"startTime":"2017-11-26 00:00:00","endTime":"2019-03-07 10:10:00","ruleNum":"1"}));
      params.append('freeDelivery', 0);
      params.append('settlementType', 1);
      params.append('consumedRefundFlag', 1);
      params.append('goodsId', -1);
      params.append('status', 1);
      params.append('logisticsType', 2);
      params.append('refundDayLimitType', 4);
      params.append('consumedRefundDays', 168);
      params.append('goodsAttributes', JSON.stringify([{"fill":"1","attrId":1000001533,"attrName":"长属性","attrValue":[{"attrValueId":13033,"attrValue":"我及开发股份和刚刚好就和钢结构和国际化及"}],"values":[{"behind":"","createTime":"2017-04-25 17:09:18","enable":"1","goodsAttrId":1000001533,"id":13032,"pic":"","showType":"02","sort":1,"type":"01","updateTime":"2017-04-25 17:10:47","value":"dggdfgfgfghghghjghjh","version":2},{"behind":"","createTime":"2017-04-25 17:09:18","enable":"1","goodsAttrId":1000001533,"id":13033,"pic":"","showType":"02","sort":1,"type":"01","updateTime":"2017-04-25 17:10:47","value":"我及开发股份和刚刚好就和钢结构和国际化及","version":2},{"behind":"","createTime":"2017-04-25 17:09:18","enable":"1","goodsAttrId":1000001533,"id":13034,"pic":"","showType":"02","sort":1,"type":"01","updateTime":"2017-04-25 17:10:47","value":"ffffffffffffffffffff","version":2}],"valueShowType":"02","valueType":"01","keyAttr":"1","enable":"1"}]));
      params.append('logisticsFlag', 1);
      params.append('stockFSType', 0);
      params.append('action', 'add');
      params.append('cookie',this.cookie)
      var header = { headers:{'Content-Type':'application/x-www-form-urlencoded'} } ;
      //console.log(header);
      row.using = true
      this.$ajax
        .post(
          Const.host+"/good/add",
          params,
          header
        )
        .then(resp => {
          let respData = resp.data;
          if (respData.status === 200) {
            this.result = JSON.stringify(resp.data, null, 4);
            this.id = "7113限制一次商品生成成功，商品ID为"+JSON.stringify(resp.data.data.id)
            row.using = false
          } else if(respData.code === "302"){
            let param = new URLSearchParams();
            param.append('username','18899997777');
            param.append('password','wanda123') 
            var header = { headers:{'Content-Type':'application/x-www-form-urlencoded'} } ;
            {
            this.$ajax.post(
                Const.host+"/common/bplogin",param,header
            ).then(resp =>{
                let respData = resp.data;
                if(respData.code === "200") {
                    this.cookie=resp.data.data;
                    params.set('cookie',this.cookie)
                    this.$ajax.post(
                                  Const.host+"/good/add",
                                    params,
                                    header
                    ).then(resp=>{
                        let respData = resp.data;
                        this.result = JSON.stringify(resp.data, null, 4);
                        this.id = "7113限制一次商品生成成功，商品ID为"+JSON.stringify(resp.data.data.id)
                        row.using = false
                    })
                    
                
                }else{this.result= '登录错误';row.using = false}
            })
          }}
        }).catch(err => {
          console.error(err);
          this.id= '发生了一个未知错误';
          row.using = false;
        });
    },
    rule7160: function(row) {
      var params = new URLSearchParams()
      params.append('publisherSubject', 0);
      params.append('publisherSubjectId', 10049024);
      params.append('merchantName', '植物医生测试商户');
      params.append('brandId', 20015933);
      params.append('category1Id', 1765);
      params.append('category2Id', 100417);
      params.append('category3Id', 1076);
      params.append('name', '7160限购一次');
      params.append('secondTitle', '');
      params.append('attributeGlobalSetting', 0);
      params.append('storeSKUs', JSON.stringify([{"storeId":10556479,"storeName":"植物医生测试（商圈内门店1）","cityId":310100,"plazaId":1000107,"skuList":[{"attributes":[{"behind":"","createTime":"2016-12-02 14:53:36","enable":"1","goodsAttrId":1000000873,"id":11788,"pic":"","showType":"02","sort":1,"type":"08","updateTime":"2017-10-20 21:56:09","value":"39","version":8,"attrName":"鞋码01","matched":true,"checked":true,"__priority":1}],"costPrice":"","priceCost":"18.72","stockLeftNum":"100","sellCode":"","barCode":"","couponList":[{"type":0,"itemId":"20161201141328","num":1,"itemName":"电影测试10元券","price":"0.00","denominations":"10.00"}]}],"entGroupId":10001}]));
      params.append('blCodeFrom', 0);
      params.append('goodsScopeInfoList', JSON.stringify([{"plazaId":1000107,"cityId":310100,"storeId":10556479,"entGroupId":10001}]));
      params.append('priceCost', 100);
      params.append('saleFlag', 3);
      params.append('combinationGoodsType', 0);
      params.append('searchFlag', 0);
      params.append('splitFlag', 1);
      params.append('goodsPics', JSON.stringify([{"pic":"http://img1.ffan.com/T1hKJgBydj1RCvBVdK"}]));
      params.append('mobileContent', JSON.stringify([{"content":"http://img1.ffan.com/T1VdYgBQJT1RCvBVdK","isPic":true}]));
      params.append('launchType', 1);
      params.append('launchTime', '');
      params.append('cancelType', 1);
      params.append('cancelTime', '');
      params.append('ifAutoOffShelf', 0);
      params.append('refundValidateType', 1);
      params.append('refundDynamicValueInHours', 72);
      params.append('fixRefundBeginTime', '');
      params.append('fixRefundEndTime', '');
      params.append('ruleInfo', JSON.stringify({"startTime":"2017-11-26 00:00:00","endTime":"2019-03-07 10:10:00","ruleNum":"1"}));
      params.append('freeDelivery', 0);
      params.append('settlementType', 1);
      params.append('consumedRefundFlag', 1);
      params.append('goodsId', -1);
      params.append('status', 1);
      params.append('logisticsType', 2);
      params.append('refundDayLimitType', 4);
      params.append('goodsAttributes', JSON.stringify([{"fill":"1","attrId":1000001533,"attrName":"长属性","attrValue":[{"attrValueId":13032,"attrValue":"dggdfgfgfghghghjghjh"}],"values":[{"behind":"","createTime":"2017-04-25 17:09:18","enable":"1","goodsAttrId":1000001533,"id":13032,"pic":"","showType":"02","sort":1,"type":"01","updateTime":"2017-04-25 17:10:47","value":"dggdfgfgfghghghjghjh","version":2},{"behind":"","createTime":"2017-04-25 17:09:18","enable":"1","goodsAttrId":1000001533,"id":13033,"pic":"","showType":"02","sort":1,"type":"01","updateTime":"2017-04-25 17:10:47","value":"我及开发股份和刚刚好就和钢结构和国际化及","version":2},{"behind":"","createTime":"2017-04-25 17:09:18","enable":"1","goodsAttrId":1000001533,"id":13034,"pic":"","showType":"02","sort":1,"type":"01","updateTime":"2017-04-25 17:10:47","value":"ffffffffffffffffffff","version":2}],"valueShowType":"02","valueType":"01","keyAttr":"1","enable":"1"}]));
      params.append('logisticsFlag', 0);
      params.append('stockFSType', 0);
      params.append('action', 'add');
      params.append('cookie',this.cookie)
      var header = { headers:{'Content-Type':'application/x-www-form-urlencoded'} } ;
      //console.log(header);
      row.using = true
      this.$ajax
        .post(
          Const.host+"/good/add",
          params,
          header
        )
        .then(resp => {
          let respData = resp.data;
          if (respData.status === 200) {
            this.result = JSON.stringify(resp.data, null, 4);
            this.id = "7160限制一次商品生成成功，商品ID为"+JSON.stringify(resp.data.data.id)
            row.using = false
          } else if(respData.code === "302"){
            let param = new URLSearchParams();
            param.append('username','18899997777');
            param.append('password','wanda123') 
            var header = { headers:{'Content-Type':'application/x-www-form-urlencoded'} } ;
            {
            this.$ajax.post(
               Const.host+ "/common/bplogin",param,header
            ).then(resp =>{
                let respData = resp.data;
                if(respData.code === "200") {
                    this.cookie=resp.data.data;
                    params.set('cookie',this.cookie)
                    this.$ajax.post(
                                  Const.host+"/good/add",
                                    params,
                                    header
                    ).then(resp=>{
                        let respData = resp.data;
                        this.result = JSON.stringify(resp.data, null, 4);
                        this.id = "7160限制一次商品生成成功，商品ID为"+JSON.stringify(resp.data.data.id)
                        row.using = false
                    })                
                }else{this.result= '登录错误';row.using = false}
            })
          }}
        }).catch(err => {
          console.error(err);
          this.id= '发生了一个未知错误';
          row.using = false;
        });
    },
    urlDecode: function() {
      this.result = decodeURI(this.orign);
    },
    urlEncode: function() {
      this.result = encodeURI(this.orign);
    }
  }
};
</script>