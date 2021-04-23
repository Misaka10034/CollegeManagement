<template>
<div>
  <mu-appbar style="width: 100%;" color=primary>
    <mu-button icon slot="left" @click="open = !open">
      <mu-icon value="menu" size="35">
      </mu-icon>
    </mu-button>
    <mu-drawer :open.sync="open" :docked="docked" :right="position === 'right'">
      <mu-list>
        <mu-list-item button>
          <mu-list-item-title>主页</mu-list-item-title>
        </mu-list-item>
        <mu-list-item button>
          <mu-list-item-title>新生报到</mu-list-item-title>
        </mu-list-item>
        <mu-list-item button>
          <mu-list-item-title>奖项申请</mu-list-item-title>
        </mu-list-item>
        <mu-list-item button>
          <mu-list-item-title>医保报销</mu-list-item-title>
        </mu-list-item>
        <mu-list-item button>
          <mu-list-item-title>我的工单</mu-list-item-title>
        </mu-list-item>
        <mu-list-item button>
          <mu-list-item-title>个人奖惩</mu-list-item-title>
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
  <div v-if="userfunction===1"> <StuCenter></StuCenter></div>
  <div v-if="userfunction===0">Nothing for now</div>
<!--  头像加载完成，说明已经获取到session数值，可以加载子组件-->
</div>
</div>
</template>

<script>
import schlogo from "D:/VUE/muse_test/src/assets/images/schlogo.png";
import ViewAvatar from 'view-avatar';
import StuCenter from "@/components/StuMain/StuCenter";
import Loading from 'muse-ui-loading';
import Vue from 'vue';
import 'muse-ui-loading/dist/muse-ui-loading.css'; // load css
Vue.use(Loading)

export default {
  components: {StuCenter},
// name: "StuMain"
  data(){
    return{
      components: {
        viewAvatar:ViewAvatar,
        stucenter:StuCenter
      },
      maincontainer:'',
      schlogo,
      docked: false,
      open: false,
      position: 'left',
      finished:true,
      head:'',
      userfunction:'1'
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
          "Authorization": localStorage.getItem("token")
        }
        // eslint-disable-next-line no-unused-vars
      }).then((res) => {
        _this.$store.commit('REMOVE_INFO')
        _this.$router.push('/login')
        // localStorage.clear();
        location.reload();
      });
    },
    stucenter(){
     // this.maincontainer=StuCenter;
      this.userfunction=1;
    },
    InitData(){
      setTimeout(() => {
        this.head ='data:image/png;base64,'+this.$store.state.userInfo.head;//初始化头像，添加延时保证数据注入
        // this.userInfo=JSON.stringify(this.$store.state.userInfo);
      }, 10)
    },
  },

  mounted() {
   //
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