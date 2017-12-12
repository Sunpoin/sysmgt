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

<template v-if="hasChildren(menu)">
    <Menu :active-name="actievItem(menu,0)" theme="light" accordion :open-names="actievItem(menu,1)" class="scp-menu" >
        <div class="scp-menu-logo">{{menu.Logo}}</div>
        <template v-for="(im, idx) in menu.Items">
            <Submenu :name="im.ModuleId" :key="idx">
                <template slot="title">
                    <template v-if="!!im.Icon && im.Icon.length >0">
                        <Icon :type="im.Icon"></Icon>
                    </template>
                    {{im.Name}}
                </template>
                <template v-if="hasChildren(im)" >
                    <template v-for="(im1, idx1) in im.Items">
                       <template v-if="hasChildren(im1)" >
                           <MenuGroup :title="im1.Name" :key="idx1">
                                <template v-for="(im2, idx2) in im1.Items">
                                    <MenuItem :name="im2.Name" :key="idx2">
                                        <router-link :to="object2String(im2.Url)" :key="idx2">{{im2.Name}}</router-link>
                                    </MenuItem>
                                </template>
                            </MenuGroup>
                       </template>
                       <template v-else>
                            <MenuItem :name="im1.Name" :key="idx1">
                                <router-link :to="object2String(im1.Url)" :key="idx1">{{im1.Name}}</router-link>
                            </MenuItem>
                        </template>
                    </template>
                </template>  
            </Submenu>
        </template>
    </Menu>
</template>

<script>
export default {
  name: "cp-menu",
  props: ["menu"],
  data() {
    return {};
  },
  methods: {
    hasChildren: function(item) {
      return !!item && !!item.Items && item.Items.length > 0;
    },
    object2String: function(value) {
      return !!value ? value : "";
    },
    actievItem(menu, type){
        let ret;

        if(!!menu && menu.Items.length > 0)
            ret = menu.Items[0].ModuleId;

        console.log(ret);
        return type == 0 ? ret : new Array(ret);
    }
  }
};
</script>