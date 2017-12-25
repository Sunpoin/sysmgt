<style scoped>
.scp-buttons {
  width: 100%;
  height: 100%;
}
.scp-buttons button {
  margin-right: 5px;
}
</style>

<template>
    <div class="scp-buttons">
        <template v-if="!$util.isEmpty(actions.g1)">
            <template v-for="(im,idx) in actions.g1">
                <Button type="ghost" :icon="$util.isEmpty(im.Icon) ? '':im.Icon" @click="onClick(im)" :key="idx" :disabled="im.Disabled">{{im.Title}}</Button>
            </template>
            <template v-if="!$util.isEmpty(actions.g2)">
                <Dropdown>
                <Button type="ghost">
                    {{morelabel}}
                    <Icon type="arrow-down-b"></Icon>
                </Button>
                <DropdownMenu slot="list">
                    <template v-for="(im,idx) in actions.g2">
                        <DropdownItem :key="idx" @on-click="onClick(im.Code)">{{im.Title}}</DropdownItem>
                    </template>
                </DropdownMenu>
                </Dropdown> 
            </template>
        </template>
    </div>   
</template>

<script>
export default {
  name: "cp-buttons",
  props: ["src", "onclick"],
  data() {
    return {
      morelabel: "更多操作",
      actions: {
        g1: [],
        g2: []
      },
      pending: ["Add","Ok"]
    };
  },
  methods: {
    fillData: function(that) {
      that.$ajax
        .get(this.src)
        .then(function(response) {
          if (
            response.data.Success &&
            !that.$util.isEmpty(response.data.Result)
          ) {
            response.data.Result.forEach(element => {
              if (element.ActionGroup == 0) {
                that.actions.g1.push(element);
              } else if (element.ActionGroup == 1) {
                that.actions.g2.push(element);
              }
            });
            that.$nextTick(function() {});
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    onClick: function(arg) {
      try {
        this.onclick(arg);
      } catch (error) {
        console.log(error);
      }
    }
  },
  beforeMount: function() {
    this.fillData(this);
  }
};
</script>