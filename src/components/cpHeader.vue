<style scoped>
@import "../styles/dark/cpHeader.css";
</style>

<template>
    <div style="width:100%; height:100%;">
        <Col :span="2" class="scp-header-toggle">
            <Button type="text" v-on:click="onToggle">
                <Icon type="navicon" size="32"></Icon>
            </Button>
        </Col>
        <Col :span="22" class="scp-header-user">
            <template v-if="!!iData">
                <Dropdown placement="bottom-start" style="float:right;padding-right:25px;">
                    <a href="javascript:void(0)" :id="iData.user.id">
                        <Icon type="person" size="12"></Icon>
                            {{iData.user.name}}
                    </a>
                    <template v-if="!cpu.isEmpty(iData.options)" >
                        <DropdownMenu slot="list">
                            <template v-for="(im, idx) in iData.options">
                                <DropdownItem :divided="!!im.divided" :key="idx">{{im.title}}</DropdownItem>
                            </template>
                        </DropdownMenu>
                    </template>
                </Dropdown>
            </template>
        </Col>   
    </div>   
</template>

<script>
export default {
  name: "CPHeader",
  props: ["iData","iToggle"],
  data() {
    return {
      
    };
  },
  methods: {
    onToggle:function(){
        this.$emit('toggle');
    },
     // 委托执行外部定义的函数
    delegate: function(name, ctx) {
      try {
        if (!!this.$props[name]) {
          this.$props[name](ctx);
        }
      } catch (msg) {
        cpu.error(this, msg);
      }
    }
  }
};
</script>