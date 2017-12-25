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
        <template v-if="!cpu.isEmpty(actions.g1)">
            <template v-for="(im,idx) in actions.g1">
                <Button type="ghost" :icon="cpu.isEmpty(im.Icon) ? '':im.Icon" @click="onClick(im)" :key="idx" :disabled="im.Disabled">{{im.Title}}</Button>
            </template>
            <template v-if="!cpu.isEmpty(actions.g2)">
                <Dropdown>
                  <Button type="ghost">
                      {{morelabel}}
                      <Icon type="arrow-down-b"></Icon>
                  </Button>
                  <DropdownMenu slot="list">
                      <template v-for="(im,idx) in actions.g2">
                          <DropdownItem :disabled="im.Disabled" :key="idx" @on-click="onClick(im)">{{im.Title}}</DropdownItem>
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
      }
    };
  },
  methods: {
    fillData: function(that) {
      cpu.httpGet(that, that.src, function(ret) {
        if (cpu.isEmpty(ret)) {
          throw "Result is null.";
        }

        ret.forEach(element => {
          if (element.ActionGroup == 0) {
            that.actions.g1.push(element);
          } else if (element.ActionGroup == 1) {
            that.actions.g2.push(element);
          }
        });
      });
    },
    onClick: function(current) {
      current.Disabled = true;
      try {
        this.onclick(current);
      } catch (msg) {
        cpu.error(this, msg);
      }

      current.Disabled = false;
    }
  },
  beforeMount: function() {
    this.fillData(this);
  }
};
</script>