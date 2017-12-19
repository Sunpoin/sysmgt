<style>
.scp-menu {
  width: 100%;
  height: 100%;
}
/* 让菜单标题层次感更清晰 */
.ivu-menu-submenu-title {
  background-color: #f5f7f9;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}
.scp-menu-logo {
  height: 60px;
  width: 100%;
  text-align: center;
  padding-top: 20px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}
.scp-menu-copy {
  width: 100%;
  color: #9ea7b4;
  text-align: center;
  position: absolute;
  bottom: 10px;
  font-size: 12px;
}
</style>

<template>
    <Menu :ref="RefId"  theme="light" class="scp-menu" :active-name="ActiveName" :open-names="OpenNames "  @on-select="onSelected" accordion>
        <div class="scp-menu-logo">{{Logo}}</div>
        <template v-for="(im, idx) in Items">
            <Submenu :name="im.ModuleId" :key="idx">
                <template slot="title">
                    <template v-if="!!im.Icon && im.Icon.length >0">
                        <Icon :type="im.Icon"></Icon>
                    </template>
                    {{im.Name}}
                </template>
                <template v-if="!isArrayNull(im.Items)" >
                    <template v-for="(im1, idx1) in im.Items">
                       <template v-if="!isArrayNull(im1.Items)" >
                           <MenuGroup :title="im1.Name" :key="idx1">
                                <template v-for="(im2, idx2) in im1.Items">
                                    <MenuItem :name="im2.Name" :key="idx2">
                                        <router-link :to="obj2String(im2.Url)" :key="idx2">{{im2.Name}}</router-link>
                                    </MenuItem>
                                </template>
                            </MenuGroup>
                       </template>
                       <template v-else>
                            <MenuItem :name="im1.Name" :key="idx1">
                                <router-link :to="obj2String(im1.Url)" :key="idx1">{{im1.Name}}</router-link>
                            </MenuItem>
                        </template>
                    </template>
                </template>  
            </Submenu>
        </template>
        <div class="scp-menu-copy" v-html="Copy"></div>
    </Menu>
</template>

<script>
export default {
  name: "cp-menu",
  props: ["src"],
  data() {
    return {
      RefId:
        "LM_" +
        new Date()
          .getTime()
          .toString()
          .substr(4),
      Logo: "SUNPOIN WORKSPACE",
      Copy: "2017-2018 &copy; SUNPOIN",
      ActiveName: "",
      OpenNames: [],
      Items: null
    };
  },
  methods: {
    isArrayNull: function(ary) {
      return !ary || ary.length == 0;
    },
    obj2String: function(value) {
      return !!value ? value : "";
    },
    initMenuActived: function(list, that) {
      if (!this.isArrayNull(list) && list[0].Items.length > 0) {
        that.Items = list[0].Items;
        let firstSubMenu = list[0].Items[0];
        that.OpenNames.push(firstSubMenu.ModuleId);
        if (!!firstSubMenu.Items && firstSubMenu.Items.length > 0) {
          let secondSubMenu = firstSubMenu.Items[0];
          if (!!secondSubMenu.Items && secondSubMenu.Items.length > 0) {
            that.ActiveName = secondSubMenu.Items[0].ModuleId;
          }
        }
      }
    },
    fillData2Menu: function(that) {
      that.$ajax
        .get(this.src)
        .then(function(response) {
          let list = response.data.Result;
          if (response.data.Success && !!list && list.length > 0) {
            that.initMenuActived(list, that); // 初始化菜单激活项及新数据
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
    onSelected:function(){
    }
  },
  computed: {},
  beforeMount:function(){
    this.fillData2Menu(this);
  },
  mounted: function() {
    
  }
};
</script>