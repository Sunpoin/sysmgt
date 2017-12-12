<style>
.scp-header-toggle{
    padding-top:6px;
}
.scp-header-breadcrumb{
    padding-top:18px;
}
.scp-header-user{
    /* 此处无效，需在 style 动态渲染 ，避免被ivue-row初始化
        float:right;*/ 
    padding-top:18px;
}
</style>

<template>
    <div style="width:100%; height:100%;">
        <Col :span="2" class="scp-header-toggle">
            <Button type="text" @click="toggle">
                <Icon type="navicon" size="32"></Icon>
            </Button>
        </Col>
        <Col :span="16" class="scp-header-breadcrumb">
            <template v-if="!!header.breadcrumb && header.breadcrumb.length > 0" >
                <Breadcrumb>
                    <template v-for="(im, idx) in header.breadcrumb">
                        <template v-if="idx < (header.breadcrumb.length-1)" >
                            <BreadcrumbItem :href="im.link" :key="idx">{{im.title}}</BreadcrumbItem>
                        </template>
                        <template v-else>
                            <BreadcrumbItem :key="idx">{{im.title}}</BreadcrumbItem>
                        </template>
                    </template>
                </Breadcrumb>
            </template>
        </Col>
        <Col :span="6" class="scp-header-user">
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