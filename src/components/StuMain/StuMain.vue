<template>
<div>
  <mu-appbar style="width: 100%;" color=primary>
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
          <mu-list-item-title>新生报到</mu-list-item-title>
        </mu-list-item>
        <mu-list-item v-if="registered" button @click="myOrder">
          <mu-list-item-title>我的工单</mu-list-item-title>
        </mu-list-item>
        <mu-list-item v-if="registered" button @click="createWorkOrder">
          <mu-list-item-title>创建工单</mu-list-item-title>
        </mu-list-item>
        <mu-list-item v-if="registered" button @click="handleRP">
          <mu-list-item-title>个人奖惩</mu-list-item-title>
        </mu-list-item>
        <mu-list-item v-if="registered" button @click="SubmitRP">
          <mu-list-item-title>提交奖项</mu-list-item-title>
        </mu-list-item>
        <mu-list-item  @click="open = false" button>
          <mu-list-item-title>关闭</mu-list-item-title>
        </mu-list-item>
      </mu-list>
    </mu-drawer>
    <img :src="schlogo" class="Schlogo" slot="left">
    <mu-menu slot="right" class="usercenter">
      <mu-button flat>
        <mu-avatar>
          <img :src="head">
        </mu-avatar>
      </mu-button>
      <mu-list slot="content">
        <mu-list-item button @click="stucenter">
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
  <div v-if="userfunction===0"><Announcement_Frontpage></Announcement_Frontpage></div>
  <div v-if="userfunction===1"><StuCenter></StuCenter></div>
  <div v-if="userfunction===2"><IssueCreate></IssueCreate></div>
  <div v-if="userfunction===3"><MyIssue></MyIssue></div>
  <div v-if="userfunction===4"><MyRP></MyRP></div>
  <div v-if="userfunction===5"><RPSubmit></RPSubmit></div>
  <div v-if="userfunction===6"><StuCenter></StuCenter></div>
  <!--  头像加载完成，说明已经获取到session数值，可以加载子组件-->
</div>
</div>
</template>

<script>
import schlogo from "D:/VUE/muse_test/src/assets/images/schlogo.png";
import ViewAvatar from 'view-avatar';
import StuCenter from "@/components/StuMain/StuCenter";
import Announcement_Frontpage from "@/components/Announcement/Announcement_Frontpage";
import Loading from 'muse-ui-loading';
import Vue from 'vue';
import 'muse-ui-loading/dist/muse-ui-loading.css'; // load css
import 'muse-ui-message/dist/muse-ui-message.css';
import Message from 'muse-ui-message';
import IssueCreate from "@/components/Issue/IssueCreate";
import MyIssue from "@/components/Issue/MyIssue";
import MyRP from "@/components/RPsys/MyRP";
import RPSubmit from "@/components/RPsys/SubmitRP";

Vue.use(Loading);
Vue.use(Message);

export default {
  components: {RPSubmit, MyRP, StuCenter,Announcement_Frontpage,IssueCreate,MyIssue},
  inject:["reload"],
  provide () {    //父组件中通过provide来提供变量，在子组件中通过inject来注入变量。
    return {
      reload: this.reload
    }
  },
// name: "StuMain"
  data(){
    return{
      components: {
        viewAvatar:ViewAvatar,
        stucenter:StuCenter,
        announcement:Announcement_Frontpage,
        workordercreate:IssueCreate,
      },
      maincontainer:'',
      schlogo,
      docked: false,
      open: false,
      position: 'left',
      finished:true,
      head:'',
      userfunction:'',
      registered:'',
      // isRouterAlive: true
      // userInfo:''
    }
  },
  // computed:{
  //   head(){
  //     return this.$store.getters.getUser.head;
  //   }
  // },
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
        // localStorage.clear();
         _this.$router.push('/login')
         this.reload();
      });
    },
    createWorkOrder(){
      this.userfunction=2;
    },
    homepage(){
      this.userfunction=0;
    },
    stucenter(){
     // this.maincontainer=StuCenter;
      this.userfunction=1;
    },
    myOrder(){
      this.userfunction=3;
    },
    handleRP(){
      this.userfunction=4;
    },
    SubmitRP(){
      this.userfunction=5;
    },
    register(){
      this.userfunction=6;
    },
    alert(){
      this.$alert('您尚未激活账户，请激活', '提示', {
        okLabel: '知道了'
      })
    },
    InitData(){
      setTimeout(() => {
        const _this=this;
        this.head ='data:image/png;base64,'+this.$store.state.userInfo.head;//初始化头像，添加延时保证数据注入
        this.registered=this.$store.state.userInfo.registered;
        if(_this.registered){
          _this.userfunction=0;
        }
        else{
          _this.userfunction=6;
          this.$alert('您尚未激活账户，请激活', '提示', {
            okLabel: '知道了'
          })
        }

        // this.userInfo=JSON.stringify(this.$store.state.userInfo);
      }, 1000)
    },
  },

  mounted() {
   this.InitData();
 }

}

</script>

<style scoped>
.usercenter{
}
.Schlogo{

}
.loading-wrap {
  height: 300px;
  position: relative;
}

</style>