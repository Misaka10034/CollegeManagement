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
    <mu-paper class="login_box" z-depth="5"></mu-paper>
  </mu-container>
  <mu-container class="login_input">
    <mu-form ref="form" :model="validateForm" >
      <mu-form-item label="账户" icon="account_circle" help-text="" prop="username" :rules="usernameRules" class="username">
        <mu-text-field v-model="validateForm.username" prop="username" class="login_username_input"></mu-text-field>
<!--        <mu-text-field v-model="validateForm.username" prop="username" label="UserName" label-float help-text="用户名为6-12长度的字符" icon="account_circle" class="login_username_input"></mu-text-field><br/>-->
      </mu-form-item>
      <mu-form-item label="密码" icon="locked" prop="password" :rules="passwordRules" class="password">
        <mu-text-field type="password" v-model="validateForm.password" prop="password"></mu-text-field>
      </mu-form-item>
<!--      <mu-form-item prop="isAgree" :rules="argeeRules">-->
<!--        <mu-checkbox label="同意用户协议" v-model="validateForm.isAgree"></mu-checkbox>-->
<!--      </mu-form-item>-->
      <router-link to ='/help'><mu-form-item label="忘记密码？" class="help">
      </mu-form-item></router-link>
<!--      后面添加跳转链接 跳转到帮助页面-->
      <mu-form-item>
        <mu-button color="primary" @click="login" class="login_button demo-1">登录</mu-button>
        <mu-button @click="clear" class="clear_button demo-2">重置</mu-button>
      </mu-form-item>
    </mu-form>

  </mu-container>
</div>
</template>

<script>
import login_bg1 from 'D:/VUE/muse_test/src/assets/images/login_bg1.jpg';
import login_bg2 from 'D:/VUE/muse_test/src/assets/images/login_bg2.jpg';
import login_bg3 from 'D:/VUE/muse_test/src/assets/images/login_bg3.jpg';
import login_bg4 from 'D:/VUE/muse_test/src/assets/images/login_bg4.jpg';


export default {
   // name: "Login"
  data () {
    return {
      login_bg1,login_bg2,login_bg3,login_bg4,
      usernameRules: [
        { validate: (val) => !!val, message: '必须填写账户'},
        { validate: (val) => val.length >= 3, message: '账户长度大于3'}//用户名规则要改
      ],
      passwordRules: [
        { validate: (val) => !!val, message: '必须填写密码'},
        { validate: (val) => val.length >= 3 && val.length <= 10, message: '密码长度大于3小于10'}
      ],
      // argeeRules: [{ validate: (val) => !!val, message: '必须同意用户协议'}],
      validateForm: {
        username: '',
        password: '',
        // isAgree: false
      },

    }
  },
  methods: {
    login () {
      this.$refs.form.validate().then((result) => {
        console.log('form valid: ', result)
      });
    },
    clear () {
      this.$refs.form.clear();
      this.validateForm = {
        username: '',
        password: '',
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