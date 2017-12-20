<style scoped>
@import "../styles/dark/cpHeader.css";
</style>

<template>
    <div style="width:100%; height:100%;">
        <Col :span="2" class="scp-header-toggle">
            <Button type="text" @click="toggle">
                <Icon type="navicon" size="32"></Icon>
            </Button>
        </Col>
        <Col :span="22" class="scp-header-user">
            <Dropdown placement="bottom-start" style="float:right;padding-right:25px;">
                <a href="javascript:void(0)" :id="header.user.id">
                    <Icon type="person" size="12"></Icon>
                        {{header.user.name}}
                </a>
                <template v-if="!!header.options && header.options.length > 0" >
                    <DropdownMenu slot="list">
                        <template v-for="(im, idx) in header.options">
                            <DropdownItem :divided="!!im.divided" :key="idx">{{im.title}}</DropdownItem>
                        </template>
                    </DropdownMenu>
                </template>
            </Dropdown>
        </Col>   
    </div>   
</template>

<script>
export default {
  name: "cp-header",
  props: ["header","toggle"],
  data() {
    return {};
  },
  methods: {
    
  }
};
</script>