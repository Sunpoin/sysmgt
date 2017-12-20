<style scoped>
@import "../styles/dark/cpMenu.css";
</style>

<template>
    <Menu :ref="RefId"  theme="dark" class="scp-menu" :active-name="ActiveName" :open-names="OpenNames"  @on-select="onSelected" accordion>
        <div class="scp-menu-logo">{{Logo}}</div>
        <template v-for="(im, idx) in Items">
            <Submenu :name="im.Url" :key="idx">
                <template slot="title">
                    <template v-if="!$util.isEmpty(im.Icon)">
                        <Icon :type="im.Icon"></Icon>
                    </template>
                    {{im.Title}}
                </template>
                <template v-if="!$util.isEmpty(im.Items)" >
                    <template v-for="(im1, idx1) in im.Items">
                       <template v-if="!$util.isEmpty(im1.Items)" >
                           <MenuGroup :title="im1.Title" :key="idx1">
                                <template v-for="(im2, idx2) in im1.Items">
                                    <MenuItem :name="im2.Url" :key="idx2">
                                       {{im2.Title}}
                                    </MenuItem>
                                </template>
                            </MenuGroup>
                       </template>
                       <template v-else>
                            <MenuItem :name="im1.Url" :key="idx1">
                                {{im1.Title}}
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
      Deep: 5, // 最深菜单的深度，在URL上体现出来的以 ‘/’ 为分隔符号的层级，用于根据URL自动激活定位菜单项
      OpenNames: [],
      Items: null
    };
  },
  methods: {
    obj2String: function(value) {
      return !!value ? value : "";
    },
    initMenus: function(list, that) {
      if (that.$util.isEmpty(list) || list[0].Items.length == 0) return;

      // 赋值菜单数据
      that.Items = list[0].Items;

      // 激活菜单Item选中
      that.ActiveName = that.$router.currentRoute.path;
      let itemGrade = that.ActiveName.split("/");
      let count = itemGrade.length;

      // 受限于框架菜单的层级限制
      if (count == 5 || count == 4) {
        let path = that.ActiveName;
        let idx = path.lastIndexOf("/");

        if (idx != -1) {
          path = path.substr(0, idx);

          // 如果是5级，即存在菜单组的情况，应排除；
          if (count == 5) {
            idx = path.lastIndexOf("/");
          }
        }

        if (idx != -1) {
          that.OpenNames.push(path.substr(0, idx));
        }
      }

      if(that.OpenNames.length == 0){
        that.OpenNames.push(list[0].Items[0].Url);
      }

      /* 采用默认方式 
        let firstSubMenu = list[0].Items[0];
        if (!!firstSubMenu.Items && firstSubMenu.Items.length > 0) {
          let secondSubMenu = firstSubMenu.Items[0];
          if (!!secondSubMenu.Items && secondSubMenu.Items.length > 0) {
            that.ActiveName = secondSubMenu.Items[0].Url;
          }
        }
     */
    },
    fillMenus: function(that) {
      that.$ajax
        .get(this.src)
        .then(function(response) {
          let list = response.data.Result;
          if (response.data.Success && !!list && list.length > 0) {
            that.initMenus(list, that); // 初始化菜单激活项及新数据
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
    onSelected: function(name) {
      this.$router.push({ path: name });
    }
  },
  computed: {},
  beforeMount: function() {
    this.fillMenus(this);
  },
  mounted: function() {}
};
</script>