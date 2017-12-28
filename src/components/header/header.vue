<template>
    <div class="headerclz">
        <el-row class="headbar bgcolor" align="middle">
            <el-col :span="3">
                <div>
                    <img :src="logSrc" />
                </div>
            </el-col>
            <el-col :span="10" class="tleft">
                <div>{{title}}</div>
            </el-col>

            <el-switch v-model="env" @change="changeEnv" active-value="sit" inactive-value="uat" active-text="SIT" inactive-text="UAT" style="float:right;margin-top:10px;padding:5px">
            </el-switch>

        </el-row>
    </div>
</template>
<script>
    import logo from '@/assets/img/logoPic.png'
    import Const from '@/config'
    export default {
        data() {
            return {
                title: "上海交易测试工具平台",
                logSrc: logo,
                env: Const.env,
            }
        },
        methods: {
            changeEnv() {
                Const.env = this.env;
                if (Const.supportLocalStorage) localStorage.setItem("env", this.env)
                this.$router.go(0);
            }
        },
    };
</script>
<style lang="scss">
    .headbar {
        border-radius: 4px;
        min-height: 30px;
        .tleft {
            font-family: 'Microsoft Yahei';
            color: #fff;
            font-size: 24px;
            margin-top: 25px;
        }
    }

    .bgcolor {
        background: #333333;
    }

    .headerclz {
        margin-bottom: 2px;
    }

    .el-switch span {
        color: #fff;
    }
</style>