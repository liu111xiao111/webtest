<template>
  <div id="app">
    <mheader></mheader>

    <el-col :span="sidespan">
      <el-menu background-color="#333333" text-color="#fff" active-text-color="#ffd04b" :default-active="$route.path" class="el-menu-vertical-demo" :router="true">
        <el-submenu index="1">
          <template slot="title">
            <i class="iconfont icon-jiaoyiguanli"></i>
            <span slot="title">交易管理</span>
          </template>
          <el-menu-item index="/order">订单管理</el-menu-item>
          <el-menu-item index="/refund">退款单管理</el-menu-item>
          <el-menu-item index="/autorefund">自动退款管理</el-menu-item>
        </el-submenu>
        <el-submenu index="2">
          <template slot="title">
            <i class="iconfont icon-shangpinguanli"></i>
            <span slot="title">新商品管理</span>
          </template>
          <el-menu-item index="/goods">商品列表</el-menu-item>
          <el-menu-item index="/goodscreate">创建商品</el-menu-item>
        </el-submenu>
        <el-submenu index="3">
          <template slot="title">
            <i class="iconfont icon-changyonggongju"></i>
            <span slot="title">常用工具</span>
          </template>
          <el-menu-item index="/qrtool">通用二维码生成</el-menu-item>
          <el-menu-item index="/uniconvert">字符串编码转换</el-menu-item>
          <el-menu-item index="/jsonformatter">JSON字符串格式化</el-menu-item>
          <el-menu-item index="/yingxiao">营销查询</el-menu-item>
        </el-submenu>
      </el-menu>
    </el-col>

<el-col :span="24-sidespan">
      <keep-alive>
        <router-view v-if="$route.meta.keepAlive"></router-view>
      </keep-alive>
      <router-view v-if="!$route.meta.keepAlive"></router-view>
</el-col>

  </div>
</template>

<script>
  import mheader from '@/components/header/header'
  import Const from '@/config'
  export default {
    name: 'app',
    data() {
      return {
        sidespan: 4,
        uids: [],
        uid: ''
      }
    },
    components: {
      mheader
    },
    methods: {
      toCollapse: function () {
        this.sidespan = this.sidespan === 0 ? 4 : 0
      },
      changeUid: function (val) {
        Const.uid = val;
      },
      getUids: function () {
        this.uids = JSON.parse(localStorage.getItem("uids"));
      },
      delUid: function (uid) {
        var arr = JSON.parse(localStorage.getItem("uids"));
        if (arr === null || typeof (arr) === 'undefined') arr = [];

        this.uids = arr.filter((u, index, arr) => {
          return u.value !== uid;
        })

        localStorage.setItem('uids', JSON.stringify(this.uids));
      }
    },
    mounted: function () {
      if (!Const.supportLocalStorage) {
        this.$notify({
          title: '错误',
          message: '浏览器不支持本地存储，无法保存用户ID!',
          offset: 100,
          type: 'error',
          duration: 2000
        })
        return false;
      }
      this.getUids();
    }
  }
</script>

<style lang="scss">
  body {
    margin: 0px;
    padding: 1px;
  }

  #app {
    font-family: 'Microsoft Yahei', 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #333333;
  }

  h1,
  h2 {
    font-weight: normal;
  }

  a {
    color: #42b983;
  }


  .el-menu-vertical-demo:not(.el-menu--collapse) {
    margin-right: 2px;
    min-height: 400px;
  }

  .el-menu-vertical-demo {
    .el-menu-item {
      text-align: left;
    }
  }


  .bg-purple-dark {
    background: #333333;
  }

  .icon-collapse {
    text-align: center;
    font-size: 40px;
    color: #f7f2f2;
    margin-left: 5px;
  }

  .slide-fade-enter-active {
    transition: all .3s ease;
  }

  .slide-fade-leave-active {
    transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }

  .slide-fade-enter,
  .slide-fade-leave-to
  /* .slide-fade-leave-active for below version 2.1.8 */

  {
    transform: translateX(10px);
    opacity: 0;
  }
</style>