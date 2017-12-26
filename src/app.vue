<style scoped>
@import "styles/dark/layout.css";
</style>
<!-- 在元素上声明 style，是因为受到 ivue-row本身样式的影响，或者有动态处理的需要 ； 在 class 处则无效 -->
<template>
    <div class="layout" >
        <Row class="layout-menu-panel" :style="{'height':'100vh','display':layout.menuPanelDisplay}">
          <CPMenu :iData="menu"></CPMenu>
        </Row>
        <Row  type="flex" class="layout-header-panel" :style="{'height':layout.headerPanelHeight,'padding-left':layout.mainPanelPaddingLeft}">
          <CPHeader :iData="header" v-on:toggle="onToggle"></CPHeader>
        </Row>
        <Row class="layout-main-panel" :style="{'position':'absolute','height':'100vh','padding-left':layout.mainPanelPaddingLeft, 'padding-top':layout.headerPanelHeight}">
          <router-view></router-view>
        </Row>
    </div>
</template>
<script>

const Default_mainPanelPaddingLeft = "240px"; //菜单面板宽度（作为右侧面板的左定位）

export default {
  data() {
    return {
      layout: {
        mainPanelPaddingLeft: Default_mainPanelPaddingLeft,
        menuPanelDisplay: "block", // 左布局显示状态（用于收缩状态）
        headerPanelHeight: "60px" // 左布局显示状态（用于收缩状态）
      },
      item: {
        type: "sp-label",
        value: "testing"
      },
      header: {
        user: {
          id: 50000020,
          name: "Mark Elliot "
        },
        options: [
          { title: "个人信息", link: "" },
          { title: "系统帮助", link: "" },
          { title: "注销登录", link: "", divided: true }
        ]
      },
      menu:{
        src:"http://localhost:10000/api/UserMgt/GetModulesByUserId?uid=admin",
        items:[]
        
      }
    };
  },
  computed: {},
  methods: {
    onToggle: function() {
      if (this.layout.mainPanelPaddingLeft === 0) {
        this.layout.mainPanelPaddingLeft = Default_mainPanelPaddingLeft;
        this.layout.menuPanelDisplay = "block";
      } else {
        this.layout.mainPanelPaddingLeft = 0;
        this.layout.menuPanelDisplay = "none";
      }
    }
  },
  created: function() {
    
  },
  beforeUpdate: function() {
  },
  updated: function () {
},
  beforeMount: function() {
  },
  mounted: function() {
  },
  beforeDestroy() {}
};
</script>