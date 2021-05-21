<template>
  <div>
  <mu-appbar style="width: 100%;" color=#4a148c>
    <mu-button icon slot="left" @click="open = !open">
      <mu-icon value="menu" size="35">
      </mu-icon>
    </mu-button>
    <mu-drawer :open.sync="open" :docked="docked" :right="position === 'right'">
      <mu-list>
        <mu-list-item button @click="homepage">
          <mu-list-item-title>主页</mu-list-item-title>
        </mu-list-item>
        <mu-list-item button @click="addstu">
          <mu-list-item-title>添加新生</mu-list-item-title>
        </mu-list-item>
        <mu-list-item button @click="addtea">
          <mu-list-item-title>添加教师</mu-list-item-title>
        </mu-list-item>
        <mu-list-item button @click="announceedit">
          <mu-list-item-title>发布公告</mu-list-item-title>
        </mu-list-item>
        <mu-list-item button @click="getorder">
          <mu-list-item-title>我的工单</mu-list-item-title>
        </mu-list-item>
        <mu-list-item button @click="handleRP">
          <mu-list-item-title>奖惩管理</mu-list-item-title>
        </mu-list-item>
        <mu-list-item button @click="usermanage">
          <mu-list-item-title>用户重置</mu-list-item-title>
        </mu-list-item>
        <mu-list-item  @click="open = false" button>
          <mu-list-item-title>关闭</mu-list-item-title>
        </mu-list-item>
      </mu-list>
    </mu-drawer>
    <img :src="schlogo" class="Schlogo" slot="left">

    <mu-menu slot="right">
      <mu-button flat>
        <mu-avatar>
        <img :src="head">
      </mu-avatar>
      </mu-button>
      <mu-list slot="content">
        <mu-list-item button  @click="admincenter">
          <mu-list-item-content>
            <mu-list-item-title>个人中心</mu-list-item-title>
          </mu-list-item-content>
        </mu-list-item>
        <mu-list-item button @click="logout">
          <mu-list-item-content>
            <mu-list-item-title>退出登录</mu-list-item-title>
          </mu-list-item-content>
        </mu-list-item>
      </mu-list>
    </mu-menu>
  </mu-appbar>
  <div>
    <!--  <router-view></router-view>-->
    <div v-if="userfunction===2"><Announcement_edit></Announcement_edit></div>
    <div v-if="userfunction===1"><AddStu></AddStu></div>
    <div v-if="userfunction===0"><Announcement_Frontpage></Announcement_Frontpage></div>
    <div v-if="userfunction===3"><MyIssue></MyIssue></div>
    <div v-if="userfunction===4"><MyRP></MyRP></div>
    <div v-if="userfunction===5"><AddTeacher></AddTeacher></div>
    <div v-if="userfunction===6"><AdminCenter></AdminCenter></div>
    <div v-if="userfunction===7"><UserManage></UserManage></div>
    <!--  头像加载完成，说明已经获取到session数值，可以加载子组件-->
  </div>
  </div>
</template>

<script>
import schlogo from "D:/VUE/muse_test/src/assets/images/schlogo.png";
import Announcement_edit from "@/components/Announcement/Announcement_edit";
import Announcement_Frontpage from "@/components/Announcement/Announcement_Frontpage";
import AddStu from "@/components/AdminMain/AddStu";
import MyIssue from "@/components/Issue/MyIssue";
import MyRP from "@/components/RPsys/MyRP";
import AddTeacher from "@/components/AdminMain/AddTeacher";
import AdminCenter from "@/components/AdminMain/AdminCenter";
import UserManage from "@/components/AdminMain/UserManage";

export default {
  components: {UserManage, AdminCenter, AddTeacher, MyRP, MyIssue, AddStu, Announcement_Frontpage, Announcement_edit},
// name: "AdminMain"
  data(){
    return{
      head:'',
      schlogo,
      docked: false,
      open: false,
      position: 'left',
      userfunction:0,
    }
  },
  methods:{
    logout() {
      const _this = this
      this.$axios.get('http://localhost:8081/logout', {
        headers: {
          "Authorization": _this.$store.getters.getToken
        }
        // eslint-disable-next-line no-unused-vars
      }).then((res) => {
        _this.$store.commit('REMOVE_INFO')
        _this.$router.push('/login')
        // localStorage.clear();
        location.reload();
      });
    },
    InitData(){
      setTimeout(() => {

        this.head ='data:image/png;base64,'+this.$store.state.userInfo.head;//初始化头像，添加延时保证数据注入
        this.userfunction=0;
        // this.userInfo=JSON.stringify(this.$store.state.userInfo);
      }, 1000)
    },
    announceedit(){
      this.userfunction=2;
    },
    addstu(){
      this.userfunction=1;
    },
    getorder(){
      this.userfunction=3
    },
    homepage(){
      this.userfunction=0;
    },
    handleRP(){
      this.userfunction=4;
    },
    addtea(){
      this.userfunction=5;
    },
    admincenter(){
      this.userfunction=6;
    },
    usermanage(){
      this.userfunction=7;
    }
  },
  mounted() {
    this.InitData();
  }
}
</script>

<style scoped>

.Schlogo{

}
</style>