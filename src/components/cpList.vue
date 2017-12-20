<template>
  <div class="layout-main">
    <Row  type="flex" ref="main" >
      <Col :span="8" class="layout-main-buttons">
        <Button type="ghost" icon="android-add" @click="test">新增</Button>
        <Button type="ghost" icon="android-remove">删除</Button>
        <Button type="ghost" icon="edit">修改</Button>
        <Poptip placement="bottom">
          <Button type="ghost">{{search.advPlaceholder}}</Button>
          <div class="api" slot="content">
              <table>
                  <thead>
                      <tr>
                          <th>版本号</th>
                          <th>更新时间</th>
                          <th>说明</th>
                      </tr>
                  </thead>
                  <tbody>
                      <tr>
                          <td>0.9.5</td>
                          <td>2016-10-26</td>
                          <td>新增信息提示组件 <code>Tooltip</code>和<code>Poptip</code></td>
                      </tr>
                      <tr>
                          <td>0.9.4</td>
                          <td>2016-10-25</td>
                          <td>新增对话框组件 <code>Modal</code></td>
                      </tr>
                      <tr>
                          <td>0.9.2</td>
                          <td>2016-09-28</td>
                          <td>新增选择器组件 <code>Select</code></td>
                      </tr>
                  </tbody>
              </table>
          </div>
        </Poptip>
        <Dropdown>
          <Button type="ghost">
              更多操作
              <Icon type="arrow-down-b"></Icon>
          </Button>
          <DropdownMenu slot="list">
              <DropdownItem>驴打滚</DropdownItem>
              <DropdownItem>炸酱面</DropdownItem>
              <DropdownItem disabled>豆汁儿</DropdownItem>
              <DropdownItem>冰糖葫芦</DropdownItem>
              <DropdownItem divided>北京烤鸭</DropdownItem>
          </DropdownMenu>
        </Dropdown>
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
    test(e) {

      debugger;
    }
  },
  mounted: function() {
    this.$refs.mainList.style.height = `${this.$refs.main.clientHeight -
      Default_mainPanelNonMainHeight}px`;
  }
};
</script>