<template>
  <div class="layout-main">
    <Row  type="flex" ref="main" >
      <Col :span="8" class="layout-main-buttons">
        <CPButtons :iData="buttons" v-on:click="onButtonsClick"></CPButtons>
      </Col>
      <Col :span="1" />
      <Col :span="9" class="layout-main-search">
        <CPSearch :iData="search" v-on:search="onSearch"></CPSearch>
      </Col>
      <Col :span="6" class="layout-main-pagging">
        <Page ref="pagging" :current="1" :total="1" style="float:right;" simple></Page>
      </Col>
    </Row>
    <div ref="mainList" class="layout-main-list">
      <Table ref="selection" :columns="module_cols" :data="module_data"  style="width:100%;height:100%;" border 
      @on-selection-change="onSelected" 
      @on-sort-change="onSort"
      @on-row-dblclick="onRowDblclick"></Table>
    </div>
  </div>
</template>
<script>
const Default_mainPanelNonMainHeight = 70; //主区域的其它高度

export default {
  data() {
    return {
      schema: {
        assembly: "ESI.EntityLib",
        type: "Models.Module",
        excludes: ["Items", "Icon", "Url", "CreatedOn"]
      },
      buttons: {
        src: "http://localhost:10000/api/UserMgt/GetActions?mid=3",
        more: "MORE",
        actions: {
          g1: [],
          g2: []
        }
      },
      module_cols: [],
      module_data: [],
      search: {
        placeholder: "请输入关键字检索",
        keywords: "",
        advTitle: "高级检索"
      }
    };
  },
  computed: {},
  methods: {
    onButtonsClick: function(ctx) {
      if (ctx.Title == "新增") {
        let src = "http://localhost:10000/api/UserMgt/GetSchema";
        cpu.httpPost(this, src, this.schema, function(ret) {
          console.log(ret);
        });
      }
    },
    onSearch: function(ctx) {
      if (ctx.type == 2 || ctx.type == 1) cpu.info(this, ctx.type);
    },
    onSelected: function(ctx) {
      console.log(ctx.length);
    },
    onSort: function(ctx) {},
    onRowDblclick: function(ctx) {
      debugger;
    }
  },
  mounted: function() {
    this.$refs.mainList.style.height = `${this.$refs.main.clientHeight -
      Default_mainPanelNonMainHeight}px`;
  },
  beforeMount: function() {
    let that = this;

    let src = "http://localhost:10000/api/UserMgt/GetSchema?lib=ESI.EntityLib&name=Module";
    cpu.httpGet(this, src, function(ret) {
      if (ret == null) return;
      debugger;

      that.module_cols = ret;

      let src2 = "http://localhost:10000/api/UserMgt/GetModulesByUserId?mid=3";
      cpu.httpGet(that, src2, function(ret1) {
        if (ret1 == null) return;
        that.module_data = ret1[0].Items[0].Items[0].Items;
      });
    });
  }
};
</script>