import Vue from 'vue'
import Router from 'vue-router'
import order from '../components/trade/order.vue'
import chaxun from '../components/movie/chaxun.vue'
Vue.use(Router)

const router = new Router({
    mode: 'hash',
    base: '/',
    routes: [{
            path: '/',
            redirect: '/order'
        },
        {
            path: '/order',
            name: 'order',
            component:order,
            meta: {
                keepAlive: true
            }
        },
        {
            path: '/chaxun',
            name: 'chaxun',
            component:chaxun,
            meta: {
                keepAlive: true
            }
        },
        {
            path: '/ordermatch',
            name: 'ordermatch',
            component(resolve) {
                require(['@/components/trade/ordermatch'], resolve)
            }
        },
        {
            path: '/refund',
            name: 'refund',
            component(resolve) {
                require(['@/components/trade/refund'], resolve)
            },
            meta: {
                keepAlive: true
            }
        },
        {
            path: '/refundmatch',
            name: 'refundmatch',
            component(resolve) {
                require(['@/components/trade/refundmatch'], resolve)
            }
        },
        {
            path: '/goods',
            name: 'goods',
            component(resolve) {
                require(['@/components/goods/goodpage'], resolve)
            },
            meta:{
                keepAlive:true
            }
        },
        {
            path: '/gooddetail',
            name: 'gooddetail',
            component(resolve) {
                require(['@/components/goods/gooddetail'], resolve)
            }
        },
        {
            path: '/goodscreate',
            name: 'goodscreate',
            component(resolve) {
                require(['@/components/goods/goodcreate'], resolve)
            }
        },
        {
            path: '/uniconvert',
            name: 'uniconvert',
            component(resolve) {
                require(['@/components/tool/uniconvert'], resolve)
            }
        },
        {
            path: '/heh',
            name: '/heh',
            component(resolve) {
                require(['@/components/tool/heh'], resolve)
            }
        },
        {
            path: '/yingxiao',
            name: '/yingxiao',
            component(resolve) {
                require(['@/components/tool/yingxiao'], resolve)
            }
        },
        {
            path: '/jsonformatter',
            name: 'jsonformatter',
            component(resolve) {
                require(['@/components/tool/jsonformatter'], resolve)
            }
        },
        {
            path: '/autorefund',
            name: 'autorefund',
            component(resolve) {
                require(['@/components/trade/autorefund'], resolve)
            }
        },
        {
            path: '/qrtool',
            name: 'qrtool',
            component(resolve) {
                require(['@/components/tool/qrtool'], resolve)
            }
        }
    ]
})

export default router;