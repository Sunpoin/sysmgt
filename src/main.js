import Vue from "vue";
import iView from "iview";
import VueRouter from "vue-router";
import Routers from "./router";
import axios from 'axios'

import CPU from "./libs/cpu";
import Sys from "./libs/sys";
import SPLib from "./components/splib.js";
import App from "./app.vue";
import "iview/dist/styles/iview.css";

Vue.use(VueRouter);
Vue.use(iView);
Vue.use(SPLib);

// 全局注册
Vue.prototype.cpu = window.cpu = CPU; // 必须同时提供 Vue.cpu ，供 Vue 内部调用使用; 直接使用 window.cpu 是为了方便编码调用
Vue.prototype.$ajax = axios;

// 路由配置 
const RouterConfig = {
    mode: "history", // 去掉URL 中的 #
    routes: Routers
};
const router = new VueRouter(RouterConfig);

router.beforeEach((to, from, next) => {
    iView.LoadingBar.start();
    next();
});

router.afterEach((to, from, next) => {
    iView.LoadingBar.finish();
    window.scrollTo(0, 0);
});

let vm = new Vue({
    el: "#app",
    router: router,
    render: h => h(App)
});