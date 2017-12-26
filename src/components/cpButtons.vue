<style scoped>
.scp-buttons {
  width: 100%;
  height: 100%;
}
.scp-buttons button {
  margin-right: 5px;
}
</style>

<template v-if="!!iData.actions">
    <div class="scp-buttons">
        <template v-if="!cpu.isEmpty(iData.actions.g1)">
            <template v-for="(im,idx) in iData.actions.g1">
                <Button type="ghost" :icon="cpu.isEmpty(im.icon) ? '':im.icon" v-on:click="onClick(im)" :key="idx" :disabled="im.disabled">{{im.title}}</Button>
            </template>
            <template v-if="!cpu.isEmpty(iData.actions.g2)">
                <Dropdown>
                  <Button type="ghost">
                      {{iData.more}}
                      <Icon type="arrow-down-b"></Icon>
                  </Button>
                  <DropdownMenu slot="list">
                      <template v-for="(im1,idx1) in iData.actions.g2">
                          <DropdownItem :disabled="im1.disabled" :key="idx1">
                             <a href="javascript:void(0)" v-on:click="onClick(im1)">{{im1.title}}</a>
                          </DropdownItem>
                      </template>
                  </DropdownMenu>
                </Dropdown> 
            </template>
        </template>
    </div>   
</template>

<script>
export default {
  name: "CPButtons",
  props: ["iData"],
  data() {
    return {};
  },
  methods: {
    test:function(name){
      console.log(name);
    },
    onClick: function(ctx) {
      this.$emit("click", ctx);
    },
    fillData: function(that) {
      if (cpu.isEmpty(that.iData.src)) return;

      cpu.httpGet(that, that.iData.src, function(ret) {
        if (cpu.isEmpty(ret)) {
          throw "Result is null.";
        }

        ret.forEach(element => {
          if (element.actionGroup == 0) {
            that.iData.actions.g1.push(element);
          } else if (element.actionGroup == 1) {
            that.iData.actions.g2.push(element);
          }
        });
      });
    }
  },
  beforeMount: function() {
    this.fillData(this);
  }
};
</script>