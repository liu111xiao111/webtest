<template>
    <div style = "width:99%">
        <el-row>
            <el-col :span="24">
                <el-input type="textarea" v-model="input" placeholder="请输入内容"></el-input>
            </el-col>
        </el-row>
        <el-row>
            <el-col :xs="2">
                <el-button type="primary" @click="getData">输入一个数字</el-button>
            </el-col>
        </el-row>     
        <el-row>
            <el-col :offset="1">
                <pre class="font-regular" v-text="result"></pre>
            </el-col>
        </el-row>
                <el-row>
            <el-col :span="24">
                <el-input type="textarea" placeholder="转换结果" v-model="result" :autosize="{minRows:8}"></el-input>
            </el-col>
        </el-row>
        <el-row>
            <el-table :data="tableData" border style="width: 100%" >
                <el-table-column prop="id" label="状态ID" width="350" align="center">
                </el-table-column>
            </el-table>
        </el-row>
    </div>
</template>
<script>
    import Const from '@/config'
    export default {
        data() {
            return {
                input: '',
                result: '',
                tableData: [],
                id:'',
                



            }
        },
        methods: {
            getData: function () {
                this.loading = true;
                this.$ajax.get("http://api.ffan.com/movie/v1/playDates", {
                    params: {
                        cityId: 110100,
                        movieId: this.input
                        
                    }}).then(resp => {
                        this.result = JSON.stringify(resp.data,null,4);
                        var items = resp.data;
                        items['id'] = items.status;
                        this.tableData = new Array(items);
                        console.log(this.tableData);

                    })
                
                }
            }
        }
    
</script>