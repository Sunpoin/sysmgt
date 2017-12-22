<template>
  <div class="layout-main">
    <Row  type="flex" ref="main" >
      <Col :span="8" class="layout-main-buttons">
        <cp-buttons :src="actionsUrl"></cp-buttons>
      </Col>
      <Col :span="1"></Col>
      <Col :span="7" class="layout-main-search">
        <Input :v-model="search.keywords" :placeholder="search.placeholder">
            <Button slot="append" icon="ios-search"></Button>
        </Input>
      </Col>
      <Col :span="8" class="layout-main-pagging">
        <Page ref="pagging" :current="2" :total="50" style="float:right;" simple></Page>
      </Col>
    </Row>
    <div ref="mainList" class="layout-main-list">
      <Table :columns="columns1" :data="data2" style="width:100%;height:100%;"></Table>
    </div>
  </div>
</template>
<script>
const Default_mainPanelNonMainHeight = 70; //主区域的其它高度

export default {
  data() {
    return {
      actionsUrl:"http://localhost:10000/api/UserMgt/GetActions?mid=3",
      actions:{
        g1:[
          {
            Actid:1,
            Code:"Add",
            Title:"新增",
            Icon:"android-add"
          }
        ],
        g2:[]
      },
      columns1: [
        {
          title: "Name",
          key: "name"
        },
        {
          title: "Age",
          key: "age"
        },
        {
          title: "Address",
          key: "address"
        }
      ],
      data2: [
        {
          name: "John Brown",
          age: 18,
          address: "New York No. 1 Lake Park",
          date: "2016-10-03"
        },
        {
          name: "Jim Green",
          age: 24,
          address: "London No. 1 Lake Park",
          date: "2016-10-01"
        },
        {
          name: "Joe Black",
          age: 30,
          address: "Sydney No. 1 Lake Park",
          date: "2016-10-02"
        },
        {
          name: "Jon Snow",
          age: 26,
          address: "Ottawa No. 2 Lake Park",
          date: "2016-10-04"
        },
        {
          name: "John Brown",
          age: 18,
          address: "New York No. 1 Lake Park",
          date: "2016-10-03"
        },
        {
          name: "Jim Green",
          age: 24,
          address: "London No. 1 Lake Park",
          date: "2016-10-01"
        },
        {
          name: "Joe Black",
          age: 30,
          address: "Sydney No. 1 Lake Park",
          date: "2016-10-02"
        },
        {
          name: "Jon Snow",
          age: 26,
          address: "Ottawa No. 2 Lake Park",
          date: "2016-10-04"
        }
      ],
      search: {
        placeholder: "请输入关键字检索",
        keywords: "",
        advPlaceholder: "高级检索"
      }
    };
  },
  computed: {
    
  },
  methods:{
    test:function(cur) {
      let a = cur;
    }
  },
  mounted: function() {
    this.$refs.mainList.style.height = `${this.$refs.main.clientHeight -
      Default_mainPanelNonMainHeight}px`;
  }
};
</script>