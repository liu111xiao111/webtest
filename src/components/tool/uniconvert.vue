<template>
    <div style="width:99%">
        <el-row>
            <el-col :span="24">
                <el-input type="textarea" placeholder="请输入内容" v-model="orign" :autosize="{minRows:8}"></el-input>
            </el-col>
        </el-row>
        <el-row>
            <el-col :xs="2">
                <el-button type="primary" @click="toUTF8">Unicode转换UTF-8</el-button>
                <el-button type="primary" @click="urlDecode">URL解码</el-button>
                <el-button type="primary" @click="urlEncode">URL加码</el-button>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="24">
                <el-input type="textarea" placeholder="转换结果" v-model="result" :autosize="{minRows:8}"></el-input>
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
            toUTF8: function () {
                this.result = unescape(this.orign.replace(/\\u/g, "%u"));
            },
            urlDecode: function () {
                this.result = decodeURI(this.orign);
            },
            urlEncode: function () {
                this.result = encodeURI(this.orign);
            }
        }
    }
</script>