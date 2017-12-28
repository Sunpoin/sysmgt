<style scoped>
.scp-table {
  width:100%;
  height:100%;
}
</style>

<template>
    <div class="scp-table">
      <Table style="width:100%;height:100%;" 
        ref="selection" 
        :columns="module_cols" 
        :data="module_data"
        border 
        v-on:on-selection-change="onCboxCheck" 
        v-on:on-sort-change="onColSort"
        v-on:on-row-dblclick="onRowDblclick"></Table>
    </div> 
</template>

<script>
export default {
  name: "CPTable",
  props: ["iData"],
  data() {
    return {};
  },
  methods: {
    onCboxCheck:function(ctx){
      this.$emit("on-cbox-check", ctx);
    },
    onColSort:function(ctx){
      this.$emit("on-col-sort", ctx);
    },
    onRowDblclick:function(ctx){
      this.$emit("on-row-dblclick", ctx);
    }
  },
  beforeMount: function() {
    let that = this;

    // 获取列结构
    
  }
};
</script>