<style scoped>

</style>

<template>
    <div style="width:100%; height:100%;">
        <template v-if="$util.isEmpty(actions.g1)">
            <template v-for="(im,idx) in actions.g1">
                <Button type="ghost" :icon="!$util.isEmpty(im.Icon)" @click="onClick(im.Code)" :key="idx">{{im.Title}}</Button>
            </template>
            <template v-if="$util.isEmpty(actions.g2)">
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
  props: ["src"],
  data() {
    return {
        morelabel:"More",
      actions: {
        g1: [],
        g2: []
      }
    };
  },
  methods: {
    isArrayEmpty: function(ary) {
      return !ary || ary.length == 0;
    },
    initMenus: function(list, that) {
      if (that.isArrayEmpty(list) || list[0].Items.length == 0) return;

      that.Items = list[0].Items;
    },
    fillActions: function(that) {
      that.$ajax
        .get(this.src)
        .then(function(response) {
          let list = response.data.Result;
          if (response.data.Success && !!list && list.length > 0) {
            that.initMenuActived(list, that);
            that.$nextTick(function() {
              that.$refs[that.RefId].updateOpened();
              that.$refs[that.RefId].updateActiveName();
            });
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    onClick:function(arg){

    }
  }
};
</script>