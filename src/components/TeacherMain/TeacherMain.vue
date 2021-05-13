<template>
  <div>
  <!--  用户选项没写 用户头像加载-->
  <mu-appbar style="width: 100%;" color=#1b5e20>

    <mu-button icon slot="left" @click="open = !open">
      <mu-icon value="menu" size="35">
      </mu-icon>
    </mu-button>
    <mu-drawer :open.sync="open" :docked="docked" :right="position === 'right'">
      <mu-list>
        <mu-list-item v-if="registered" button @click="homepage">
          <mu-list-item-title>主页</mu-list-item-title>
        </mu-list-item>
        <mu-list-item v-if="!registered" button @click="register">
          <mu-list-item-title>新员工报到</mu-list-item-title>
        </mu-list-item>
        <mu-list-item v-if="registered" button @click="handleRP">
          <mu-list-item-title>奖惩处理</mu-list-item-title>
        </mu-list-item>
        <mu-list-item v-if="registered" button @click="getorder">
          <mu-list-item-title>工单处理</mu-list-item-title>
        </mu-list-item>
        <mu-list-item v-if="registered" button @click="editannouncement">
          <mu-list-item-title>发布公告</mu-list-item-title>
        </mu-list-item>
        <mu-list-item  @click="open = false" button>
          <mu-list-item-title>关闭</mu-list-item-title>
        </mu-list-item>
      </mu-list>
    </mu-drawer>
    <img :src="schlogo" class="Schlogo" slot="left">

    <mu-menu slot="right">
      <mu-button flat><mu-avatar></mu-avatar></mu-button>
      <mu-list slot="content">
        <mu-list-item button @click="teachercenter">
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
    <div v-if="userfunction===0"><Announcement_Frontpage></Announcement_Frontpage></div>
    <div v-if="userfunction===1"><MyRP></MyRP></div>
    <div v-if="userfunction===2"><Announcement_edit></Announcement_edit></div>
    <div v-if="userfunction===3"><MyIssue></MyIssue></div>
    <div v-if="userfunction===4"><TeacherCenter></TeacherCenter></div>
    <div v-if="userfunction===5"><Announcement_edit></Announcement_edit></div>
  </div>
</template>

<script>
import schlogo from "D:/VUE/muse_test/src/assets/images/schlogo.png";
import Announcement_edit from "@/components/Announcement/Announcement_edit";
import Announcement_Frontpage from "@/components/Announcement/Announcement_Frontpage";
import MyIssue from "@/components/Issue/MyIssue";
import MyRP from "@/components/RPsys/MyRP";
import TeacherCenter from "@/components/TeacherMain/TeacherCenter";

export default {
  components: {TeacherCenter, MyRP, MyIssue, Announcement_Frontpage, Announcement_edit},
// name: "TeacherMain"
  data(){
    return{
      registered:'',
      schlogo,
      docked: false,
      open: false,
      position: 'left',
      userfunction:0,
    }
  },
methods:{
  handleRP()
  {
    this.userfunction = 1;
  }
,
  announceedit()
  {
    this.userfunction = 2;
  }
,
  getorder()
  {
    this.userfunction = 3
  }
,
  homepage()
  {
    this.userfunction = 0;
  }
,
  editannouncement(){
    this.userfunction=5;
  }
  ,
  teachercenter(){
    this.userfunction=4;
    }
    ,
    register(){
    this.userfunction=4;
    }
    ,

  InitData(){
    setTimeout(() => {
      const _this=this;
      this.head ='data:image/png;base64,'+this.$store.state.userInfo.head;//初始化头像，添加延时保证数据注入
      this.registered=this.$store.state.userInfo.registered;
      if(_this.registered){
        _this.userfunction=0;
      }
      else{
        _this.userfunction=4;
        this.$alert('您尚未激活账户，请激活', '提示', {
          okLabel: '知道了'
        })
      }
      // this.userInfo=JSON.stringify(this.$store.state.userInfo);
    }, 1000)
  },
  logout() {
    const _this = this
    this.$axios.get('http://localhost:8081/logout', {
      headers: {
        "Authorization": _this.$store.getters.getToken
      }
      // eslint-disable-next-line no-unused-vars
    }).then((res) => {
      _this.$store.commit('REMOVE_INFO')
      // localStorage.clear();
      _this.$router.push('/login')
      location.reload();
    });
  },
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