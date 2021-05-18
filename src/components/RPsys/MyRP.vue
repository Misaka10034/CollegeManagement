<template>
  <mu-container class="mu-form-container" style="width: 1020px">
    <mu-form v-if="hostid<10000" :model="searchmodel">
      <mu-form-item label="查询学生奖惩信息：">
        <mu-text-field v-model="searchmodel.searchid"></mu-text-field>
        <mu-button color="blue" @click="searchData">查询</mu-button>
        <router-link :to="{name:'SubmitRP',query: {stuid:this.searchmodel.searchid,userid:$store.getters.getUser.id,usertoken:$store.getters.getToken}}" tag="a" target="_blank"><mu-button v-if="this.hostid<10000&&this.searchmodel.searchid!==''" color="red">新增处罚</mu-button></router-link>
      </mu-form-item>
    </mu-form>
    <mu-data-table :columns="columns" :data="list" :sort.sync="sort" border class="table" stripe @sort-change="handleSortChange">
      <template slot-scope="scope">
        <td class="is-left">{{scope.row.id}}</td>
        <td class="is-left">
          <div v-if="scope.row.rewardorPunish===0" style="color: #016ad7">奖项</div>
          <div v-if="scope.row.rewardorPunish===1" style="color: red">处罚</div>
        </td>
        <td class="is-left">
          <div v-if="scope.row.finished===0" style="color: #ffcc00">正在审核</div>
          <div v-if="scope.row.finished===2" style="color: red">审核未通过</div>
          <div v-if="scope.row.finished===1" style="color: #016ad7">审核通过</div>
        </td>
        <td class="is-left ">{{scope.row.stuID}}</td>
        <td class="is-left ">{{scope.row.adminID}}</td>

        <td class="is-center">
          <mu-button v-if="hostid===100||hostid===5" color="red" @click="deleteData(scope.row.id)">删除</mu-button>
         <router-link  :to="{name:'HandleRP',query:{prId:scope.row.id,userid:$store.getters.getUser.id,usertoken:$store.getters.getToken}}" tag="a" target="_blank"><mu-button v-if="hostid===scope.row.stuID||hostid===scope.row.adminID" class="fordetail" color="blue">详情</mu-button></router-link>
          <!--          <router-link :to="{name:'HandleIssue',params:{workorderId:scope.row.id}}"><mu-button color="blue" class="fordetail">查看</mu-button></router-link>-->
        </td>
        <!--      <mu-button></mu-button>-->
      </template>
    </mu-data-table>
    <mu-flex class="page" justify-content="center">
      <mu-pagination :current.sync="current" :page-count="pagecount" :page-size="pagesize"  :total="total" @change="current" v-on:change="current"></mu-pagination>
    </mu-flex>
  </mu-container>
</template>

<script>
export default {
name: "MyRP",
  inject:["reload"],
  data(){
    return {
      sort:{
        name:'',
        order:'asc'
      },
      columns:[
        { title:'奖惩编号', width: 200, name: 'id' ,sortable:true},
        { title:'奖/惩', width: 200, name: 'punishorReward'},
        { title:'审核状态', width: 200, name: 'finished',sortable: true},
        { title:'学生ID', width: 200, name: 'stuID'},
        { title:'处理人ID', width: 200, name: 'adminID'},
        { title:'',width: 200}
      ],
      list:[],
      current:1,
      total:10,
      pagecount:5,
      pagesize:6,
      hostid:0,
      searchmodel:{
        searchid:''
      },
    }
  },
  methods:{
    handleSortChange ({name, order}) {
      this.list = this.list.sort((a, b) => order === 'asc' ? a[name] - b[name] : b[name] - a[name]);
    },
    deleteData(prid){
      const _this=this;
      _this.$axios.post('http://localhost:8081/delete/'+prid,'',{
        headers: {
          "Authorization": _this.$store.getters.getToken
        }
      }).then(
          res => {
            if (res.data.code !== 200) alert("未能查到目标ID");
            else if (res.data.code === 401) {
              this.$alert("Token已过期，请回到登录界面重新登录");
              this.$router.push({path: '/login'});
            }
            else {
              this.$alert("删除成功");
              this.reload();
            }
          })
    },
    searchData(){
      const _this=this;
      this.$axios.post('http://localhost:8081/getpr/' + this.searchmodel.searchid + '?currentPage=' + _this.current, '', {
        headers: {
          "Authorization": this.$store.getters.getToken
        }
      }).then(
          res => {
            if(res.data.code!==200) alert("未能查到目标ID");
            else if(res.data.code===401) {
              this.$alert("Token已过期，请回到登录界面重新登录");
              this.$router.push({path: '/login'});
            }
            else{
              _this.current = res.data.data.current;
              _this.list = res.data.data.records;
              _this.pagesize = res.data.data.size;
                _this.total = res.data.data.total;
            }
          }
      )
    },

    MyRPInitData(current){
      let _this=this;
      setTimeout(() => {
        if (this.$store.getters.getUser.id > 9999) {
          _this.hostid=_this.$store.getters.getUser.id;
          this.$axios.post('http://localhost:8081/getpr/' + _this.hostid + '?currentPage=' + current, '', {
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
        else if(this.$store.getters.getUser.id < 10000){
          _this.hostid=_this.$store.getters.getUser.id;
          this.$axios.post('http://localhost:8081/teagetpr/' + _this.hostid + '?currentPage=' + current, '', {
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
  watch: {
    current() {
      this.MyRPInitData(this.current);
      if(this.searchmodel.searchid!=='') {
        this.searchData(this.current);
      }
    },
  },
  mounted() {
    this.MyRPInitData(this.current);
  }
}
</script>

<style scoped>
.mu-form-container{
  margin-top: 30px;
}
.fordetail{
  margin-top: 5px;
}
.page{
  position: relative;
  left: -5%;
  top:20px;
  bottom: 30px;
}
.table{
  left: -100px;
  width: 1220px;
}
</style>