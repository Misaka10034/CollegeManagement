<template>
<!--  剩余工作：1.后端连接 2.登陆提示 -->

<div class="login_container">
<mu-carousel transition="fade" hide-controls interval="10000" hide-indicators class="bg_container">
  <mu-carousel-item>
    <img :src="login_bg1">
  </mu-carousel-item>
  <mu-carousel-item>
    <img :src="login_bg2">
  </mu-carousel-item>
  <mu-carousel-item>
    <img :src="login_bg3">
  </mu-carousel-item>
  <mu-carousel-item>
    <img :src="login_bg4">
  </mu-carousel-item>
</mu-carousel>
  <mu-container>
    <mu-paper class="login_box"></mu-paper>
  </mu-container>
  <mu-container class="login_input">
    <mu-form ref="form" :model="validateForm" >
      <mu-form-item :rules="idRules" class="id" icon="account_circle" label="账户" prop="id">
        <mu-text-field v-model="validateForm.id" class="login_username_input" prop="username"></mu-text-field>
<!--        一开始写错了，id=username。。-->
      </mu-form-item>
      <mu-form-item label="密码" icon="locked" prop="password" :rules="passwordRules" class="password">
        <mu-text-field v-model="validateForm.password" prop="Password" type="password"></mu-text-field>
      </mu-form-item>
<!--      <mu-form-item prop="isAgree" :rules="argeeRules">-->
<!--      </mu-form-item>-->
      <router-link to ='/help'>
        <mu-form-item class="help" label="忘记密码？">
      </mu-form-item>
      </router-link>
      <mu-form-item>
        <mu-button color="primary" @click="login" class="login_button demo-1">登录</mu-button>
        <mu-button @click="clear" class="clear_button demo-2">重置</mu-button>
      </mu-form-item>
    </mu-form>

  </mu-container>
</div>
</template>
window.location.hash="no-back";
window.location.hash="Again-No-back-button";
window.onhashchange=function(){window.location.hash="no-back";}

<script>
import login_bg1 from 'D:/VUE/muse_test/src/assets/images/login_bg1.jpg';
import login_bg2 from 'D:/VUE/muse_test/src/assets/images/login_bg2.jpg';
import login_bg3 from 'D:/VUE/muse_test/src/assets/images/login_bg3.jpg';
import login_bg4 from 'D:/VUE/muse_test/src/assets/images/login_bg4.jpg';
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex)
export default {

   // name: "Login"
  data () {
    return {
      login_bg1,login_bg2,login_bg3,login_bg4,

      idRules: [
        { validate: (val) => !!val, message: '必须填写账户'},
       // { validate: (val) => val.length >= 3, message: '账户长度大于3'}//用户名规则要改
      ],
      passwordRules: [
        { validate: (val) => !!val, message: '必须填写密码'},
        { validate: (val) => val.length >= 3 && val.length <= 15, message: '密码长度大于3小于15'}
      ],
      validateForm: {
        id: '',
        password: '',
      },

    }
  },
  methods: {
    login () {
      //const _this=this
      this.$refs.form.validate().then((result) => {
        if(result){
          this.$axios.post('http://localhost:8081/login_server', this.validateForm).then(
              res=>{
                let _data=res.data;
                let _this=this;
                let token=res.headers['authorization'];
                if(_data==null){
                    alert("登陆失败，请检查用户名和密码是否有误")
                }
                else{
                  _this.$store.commit('SET_TOKEN', token)
                }
                if(_data.code===200) {
                  localStorage.setItem('password',this.validateForm.password);
                  if (_data.data.kind === 1) {
                    this.$router.push({path: '/adminMain'});
                  } else if (_data.data.kind === 2) {
                    this.$axios.post('http://localhost:8081/student', this.validateForm).then(//获取完整用户信息
                        res=>{
                          console.log(res)
                          let _thisStu=this;
                          let token=res.headers['authorization'];
                            _thisStu.$store.commit('SET_TOKEN', token);
                            _thisStu.$store.commit('SET_USERINFO', res.data.data);
                          })
                    this.$router.push({path: '/stuMain'});
                    return false;
                  } else if (_data.data.kind === 3) {
                    this.$router.push({path: '/teaMain'});
                  }
                }
              }
          )
        }
        else alert("登陆失败");
      });
    },
    clear () {
      this.$refs.form.clear();
      this.validateForm = {
        id: '',
        Password: '',
        isAgree: false
      };
    }
  }
};

</script>

<style lang="less" scoped>
.login_container{
height: 100%;
}
.login_box{
  background-color: white;
  height: 450px;
  width: 600px;
  border-radius: 10px;
  filter: Alpha(opacity=80);
  opacity:0.8;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%,-50%);//基于上面的位置再进行位移
}
.login_input{
  position: absolute;
  width: 280px;
  left: 50%;
  top: 50%;
  transform: translate(-50%,-50%);//基于上面的位置再进行位移
}
.login_button{
  width: 100px;
  border-radius: 10px;
  position: absolute;
  left:0;
  top:-40%;
  &.demo-1{
    color: white;
    border: 1px solid #2196f3;
  }
}
.clear_button{
  position: absolute;
  width: 100px;
  border-radius: 10px;
  right:-5%;
  top:-40%;
  &.demo-2{
    color: #2196f3;
    border: 1px solid white;
  }
}
.login_password{
  position: relative;
  right:50%;
  top:100%;
}
.help{
  position: relative;
  left: 30px;
}
.bg_container{
  height: 750px;
}
</style>