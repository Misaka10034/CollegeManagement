<template>
<mu-container class="mu-form-container" style="width: 1020px">
  <mu-data-table :columns="columns" :data="list" :sort.sync="sort" border stripe @sort-change="handleSortChange" >
    <template slot-scope="scope">
      <td class="is-left">{{scope.row.id}}</td>
      <td class="is-left">
        <div v-if="scope.row.kind===1">教学相关</div>
        <div v-if="scope.row.kind===2">安保相关</div>
        <div v-if="scope.row.kind===3">宿舍后勤</div>
        <div v-if="scope.row.kind===4">系统反馈</div>
        <div v-if="scope.row.kind===5">其他问题</div>
      </td>
      <td class="is-left">
        <div v-if="scope.row.finished===0" style="color: #016ad7">等待处理</div>
        <div v-if="scope.row.finished===2" style="color: #ffcc00">正在处理</div>
        <div v-if="scope.row.finished===1" style="color: #6a8759">处理结束</div>
      </td>
      <td class="is-left ">{{scope.row.originID}}</td>
      <td class="is-center">
        <router-link :to="{name:'HandleIssue',params:{workorderId:scope.row.id}}"><mu-button class="fordetail" color="blue">查看</mu-button></router-link>
      </td>
<!--      <mu-button></mu-button>-->
    </template>
  </mu-data-table>
  <mu-flex class="page" justify-content="center">
    <mu-pagination :current.sync="current" :page-count="pagecount" :page-size="pagesize"  :total="total" @change="currentpage()" v-on:change="current"></mu-pagination>
  </mu-flex>
</mu-container>
</template>

<script>
export default {
name: "MyIssue",
  data(){
    return {
      sort:{
        name:'',
        order:'asc'
      },
      columns:[
        { title:'工单编号', width: 200, name: 'id' ,sortable:true},
        { title:'问题类型', width: 200, name: 'kind',sortable:true},
        { title:'问题状态', width: 200, name: 'finished',sortable: true},
        { title:'发起人ID', width: 200, name: 'originID'},
        { title:'',width: 200}
      ],
      list:[],
      current:1,
      total:10,
      pagecount:5,
      pagesize:10,
    }
  },
  methods:{
    handleSortChange ({name, order}) {
      this.list = this.list.sort((a, b) => order === 'asc' ? a[name] - b[name] : b[name] - a[name]);
    },

    currentpage(){
      this.InitData(this.current);
    },
    InitData(current){
      let _this=this;
        setTimeout(() => {
          if (this.$store.getters.getUser.id > 9999) {
          this.$axios.post('http://localhost:8081/stugetorder/' + _this.$store.getters.getUser.id + '?currentPage=' + current, '', {
            headers: {
              "Authorization": _this.$store.getters.getToken
            }
          }).then(
              res => {
                _this.current = res.data.data.current;
                _this.list = res.data.data.records;
                _this.pagesize = res.data.data.size;
                _this.total = res.data.data.total;
              }
          )
        }
          else
          {
              this.$axios.post('http://localhost:8081/admgetorder/' + _this.$store.getters.getUser.id + '?currentPage=' + current, '', {
                headers: {
                  "Authorization": _this.$store.getters.getToken
                }
              }).then(
                  res => {
                    _this.current = res.data.data.current;
                    _this.list = res.data.data.records;
                    _this.pagesize = res.data.data.size;
                    _this.total = res.data.data.total;
                  }
              )
          }
        }, 100);
    },

  },

  mounted() {
    this.InitData(this.current);
  }
}
</script>

<style scoped>
.mu-form-container{
  margin-top: 30px;
}
.fordetail{
  width: 22px;
  height: 30px;
}
.page{
  position: absolute;
  left: 40%;
  bottom:20px;
}
</style>