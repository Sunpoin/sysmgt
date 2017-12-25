import CPMenu from "./CPMenu.vue";
import CPHeader from "./CPHeader.vue";
import CPButtons from "./CPButtons.vue";
import CPSearch from "./CPSearch.vue";

/** 组件协作器
 * 辅助解析组件的公共方法：
 *      1）实现将组件动态注册到 Vue 实例中
 *      2）提供组件模板字典（cplib.templates)
 *      3) 提供组件数据模型字典(cplib.dataModels)
 * 实现组件方法
 *      1）编写 template.vue 文件
 *      2）在本文件中  import 组件名称(如：SPGrid) from ./组件文件路径/SPGrid
 *      3）在 cplib.templates 中添加对应的字典如： {"sp-grid": SPGrid}
 * 调用方法：
 *      import cplib from ./cplib.js
 *      Vue.use(cplib);
 * 使用方法(在 Vue 实例内)：
 *      1) 读取对应组件的数据模型 ：this.cplib.dataModels["sp-grid"]
 *      2) 读取对应组件的template ：this.cplib.templates["sp-grid"]
 * 
*/
let cplib = function () {

}

/** 组件安装方法 在 Vue.user(cplib) 时触发 */
cplib.install = function (Vue, options) {
    window.cplib = Vue.prototype.$cplib = cplib;
    cplib.init(Vue);
}

/** 动态将组件字典中的组件注册到 Vue 中 */
cplib.init = function (Vue) {
    for (var key in cplib.templates) {
        if (cplib.templates.hasOwnProperty(key)) {
            Vue.component(key, cplib.templates[key]);
            cplib.dataModels[key] = cplib.templates[key]["data"]().dataModel;
        }
    }
}

/** 初始化时，自动填充数据模型，供外部使用 */
cplib.dataModels = {

}

/** 组件模板字典集合 */
cplib.templates = {
    "CPMenu":CPMenu,
    "CPHeader":CPHeader,
    "CPButtons":CPButtons,
    "CPSearch":CPSearch
}

export default cplib;