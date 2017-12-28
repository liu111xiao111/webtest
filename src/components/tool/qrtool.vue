<template>
    <el-row>
        <div style="width:99%">
            <el-input type="textarea" placeholder="请输入内容" v-model="qrStr" :rows="6"></el-input>
            <el-button type="primary" @click="getQrCode">生成二维码</el-button>
        </div>
        <div style="text-align:center">
            <img :src="imgSrc" />
        </div>
    </el-row>
</template>
<script>
    import Const from '@/config'
    export default {
        data() {
            return {
                qrStr: '',
                imgSrc: ''
            }
        },
        methods: {
            getQrCode() {
                this.$ajax.post(Const.host + "/common/qrcode", {
                    data: this.qrStr
                }).then(resp => {
                    if (resp.data.code === "200") {
                        this.imgSrc = resp.data.data;
                    } else {
                        this.$notify({
                            title: '错误',
                            message: resp.data.msg, 
                            offset: 100,
                            duration: 2000,
                            type: 'error'
                        });
                    }


                }).catch(err => {
                    console.error(err);
                })
            }
        }
    }
</script>