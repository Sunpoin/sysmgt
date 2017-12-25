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

<template>
    <div class="scp-search">
        <Input :v-model="keywords" :placeholder="placeholder">
          <Button slot="append" icon="ios-search-strong" @click="onSearch(0)"></Button>
          <Button slot="append"  type="ghost" style="color:#880000;"  @click="onSearch(1)">
            <span class="scp-search-adv-split">&nbsp;</span>{{advTitle}}</Button>
        </Input>
         <Modal :title="advTitle" v-model="advModal" @on-ok="onok" :mask-closable="false">
        <p>Content of dialog</p>
        <p>Content of dialog</p>
        <p>Content of dialog</p>
    </Modal>
    </div>   
</template>

<script>
export default {
  name: "cp-search",
  props:["keywords","placeholder", "advTitle", "onsearch", "onok"],
  data() {
    return {
      advModal: false
    };
  },
  methods: {
    onSearch: function(type) {
      try {
        if (type == 1) {
          this.advModal = true;
        }
      } catch (msg) {
        cpu.error(this, msg);
      }
    },
    onOk:function(){
      if(!!onok)
        onok();
    }
  },
  beforeMount: function() {}
};
</script>