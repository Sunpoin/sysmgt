<style scoped>
@import "../styles/dark/cpMenu.css";
</style>

<template>
    <Menu :ref="refId"  theme="dark" class="scp-menu" :active-name="activeName" :open-names="openNames"  @on-select="onSelected" accordion>
        <div class="scp-menu-logo">{{logo}}</div>
        <template v-for="(im, idx) in iData.items">
            <Submenu :name="im.url" :key="idx">
                <template slot="title">
                    <template v-if="!cpu.isEmpty(im.icon)">
                        <Icon :type="im.icon"></Icon>
                    </template>
                    {{im.title}}
                </template>
                <template v-if="!cpu.isEmpty(im.items)" >
                    <template v-for="(im1, idx1) in im.items">
                       <template v-if="!cpu.isEmpty(im1.items)" >
                           <MenuGroup :title="im1.title" :key="idx1">
                                <template v-for="(im2, idx2) in im1.items">
                                    <MenuItem :name="im2.url" :key="idx2">
                                       {{im2.title}}
                                    </MenuItem>
                                </template>
                            </MenuGroup>
                       </template>
                       <template v-else>
                            <MenuItem :name="im1.url" :key="idx1">
                                {{im1.title}}
                            </MenuItem>
                        </template>
                    </template>
                </template>  
            </Submenu>
        </template>
        <div class="scp-menu-copy" v-html="copy"></div>
    </Menu>
</template>

<script>
export default {
  name: "CPMenu",
  props: ["iData"],
  data() {
    return {
      refId:
        "LM_" +
        new Date()
          .getTime()
          .toString()
          .substr(4),
      logo: "SUNPOIN WORKSPACE",
      copy: "2017-2018 &copy; SUNPOIN",
      activeName: "",
      deep: 5, // 最深菜单的深度，在URL上体现出来的以 ‘/’ 为分隔符号的层级，用于根据URL自动激活定位菜单项
      openNames: []
    };
  },
  methods: {
    obj2String: function(value) {
      return !!value ? value : "";
    },
    initData: function(list, that) {
      // 赋值菜单数据
      that.iData.items = list[0].items;

      // 激活菜单Item选中
      that.activeName = that.$router.currentRoute.path;
      let count = that.activeName.split("/").length;

      // 受限于框架菜单的层级限制
      if (count == 5 || count == 4) {
        let path = that.activeName;
        let idx = path.lastIndexOf("/");

        if (idx != -1) {
          path = path.substr(0, idx);

          // 如果是5级，即存在菜单组的情况，应排除；
          if (count == 5) {
            idx = path.lastIndexOf("/");
          }
        }

        if (idx != -1) {
          that.openNames.push(path.substr(0, idx));
        }
      }

      if (that.openNames.length == 0) {
        that.openNames.push(list[0].items[0].url);
      }
    },
    fillData: function(that) {
      cpu.httpGet(that, that.iData.src, function(ret) {
        if (cpu.isEmpty(ret)) {
          throw "Result is null.";
        }

        if (ret[0].items.length > 0) {
          that.initData(ret, that); // 初始化菜单激活项及新数据
          that.$nextTick(function() {
            that.$refs[that.refId].updateOpened();
            that.$refs[that.refId].updateActiveName();
          });
        }
      });
    },
    onSelected: function(name) {
      this.$router.push({ path: name });
    }
  },
  computed: {},
  beforeMount: function() {
    this.fillData(this);
  },
  mounted: function() {}
};
</script>