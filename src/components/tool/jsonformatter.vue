<template>
    <div style="width:95%">
        <el-row>
            <el-col :span="24">
                <el-input type="textarea" placeholder="请输入内容" v-model="orign" :autosize="{minRows:8}"></el-input>
            </el-col>
        </el-row>
        <el-row>
            <el-col :xs="2">
                <el-button type="primary" @click="jsonFormatter">JSON格式化</el-button>
            </el-col>
        </el-row>
            <el-col :xs="4">
                <i class="el-icon-edit"></i>
                <i class="el-icon-share"></i>
                <i class="el-icon-delete"></i>
                <el-button type="primary" icon="el-icon-search">搜索</el-button>
            </el-col>
        <el-row>
            <el-col :offset="1">
                <pre class="font-regular" v-text="result"></pre>
            </el-col>
        </el-row>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                orign: '',
                result: ''
            }
        },
        methods: {
            jsonFormatter: function () {
                try {
                    if(this.orign>18)
                     this.result = '18以上'
                    else
                     this.result = '18以下'
                    
                } catch (error) {
                    this.result = "cannot be formatted with non json object";
                }
            }
        }
    }
</script>