import Vue from "vue";
import iView from "iview";
import VueRouter from "vue-router";
import Routers from "./router";
import axios from 'axios'

import Util from "./libs/util";
import SPLib from "./components/splib.js";
import App from "./app.vue";
import "iview/dist/styles/iview.css";

Vue.use(VueRouter);
Vue.use(iView);
Vue.use(SPLib);
Vue.prototype.$ajax = axios; // 解决无法使用 $ajax 的问题

// 路由配置 
const RouterConfig = {
    mode: "history", // 去掉URL 中的 #
    routes: Routers
};
const router = new VueRouter(RouterConfig);

router.beforeEach((to, from, next) => {
    iView.LoadingBar.start();
    Util.title(to.meta.title);
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