<style scoped>
.scp-search {
  width: 100%;
  height: 100%;
}

.scp-search-adv-split {
  border-right: 1px solid #363e4f;
  margin-right: 15px;
}
</style>

<template v-if="!!iData">
    <div class="scp-search">
      <Input :v-model="iData.keywords" :placeholder="iData.placeholder">
        <Button slot="append" icon="ios-search-strong" v-on:click="onSearch(1)"></Button>
        <Button slot="append"  type="ghost" style="color:#880000;" v-on:click="onSearch(0)">
          <span class="scp-search-adv-split">&nbsp;</span>{{iData.advTitle}}
          </Button>
      </Input>
      <Modal :title="iData.advTitle" v-model="advModal" v-on:on-ok="onSearch(2)" :mask-closable="false">
      </Modal>
    </div>   
</template>

<script>
export default {
  name: "CPSearch",
  props: ["iData"],
  data() {
    return {
      advModal: false,
      which: "CPHeader"
    };
  },
  methods: {
    onSearch:function(type){
      if(type == 0) this.advModal = true;

      this.$emit('search',{type:type});
    }
  },
  beforeMount: function() {}
};
</script>