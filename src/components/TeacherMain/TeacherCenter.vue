<template>
  <mu-container class="mu-form-container">
    <mu-form ref="form" :model="form" class="mu-form" label-width="100" style="margin-right: 16px;">
      <mu-form-item label="ID:">
        <mu-text-field v-model="form.id" :disabled=true prop="id"></mu-text-field>
      </mu-form-item>
      <mu-form-item label="头像:">
        <img :src="head">
      </mu-form-item>
      <mu-form-item label="上传头像">
        <div>
          <mu-button class="falsebutton">上传头像</mu-button>
          <input id="file" accept="image/*" class="input-button" type="file" @change="upload($event)" v-on:change="newhead"/>
          <mu-alert v-show="newheadalert" color="error" transition="mu-scale-transition">请选择宽高均小于40像素的图片,继续提交将清空当前头像</mu-alert>
          <img v-show="newhead" :src="newhead">
        </div>
      </mu-form-item>
      <mu-form-item :rules="passwordRules" label="密码:" prop="password">
        <mu-text-field v-model="form.password" ></mu-text-field>
      </mu-form-item>
      <mu-form-item label="姓名:">
        <mu-text-field v-model="form.name" :disabled=this.disanbleedit prop="name"></mu-text-field>
      </mu-form-item>
      <mu-form-item label="性别" prop="sex">
        <mu-radio v-model="form.sex" :disabled=this.disanbleedit :value="false" label="男"></mu-radio>
        <mu-radio v-model="form.sex" :disabled=this.disanbleedit :value="true" class="radio_right" label="女"></mu-radio>
      </mu-form-item>
      <mu-form-item label="学院:">
        <mu-text-field v-model="form.college" :disabled=this.disanbleedit prop="college"></mu-text-field>
      </mu-form-item>
      <mu-form-item :rules="emailRules" label="邮箱:" prop="email">
        <mu-text-field v-model="form.email" :disabled=this.disanbleedit prop="email"></mu-text-field>
      </mu-form-item>
      <mu-form-item label="职位:">
        <mu-text-field v-model="form.position" :disabled=this.disanbleedit prop="position"></mu-text-field>
      </mu-form-item>
      <mu-form-item :rules="phoneNumberRules" label="联系方式:" prop="phonenum">
        <mu-text-field v-model="form.phonenum" prop="phonenum"></mu-text-field>
      </mu-form-item>
    </mu-form>
    <mu-button class="submit" color="#2196f3" @click="submit">提交修改</mu-button>
  </mu-container>
</template>

<script>
export default {
  name: "TeacherCenter",
  data() {
    return {
      newheadalert: false,
      labelPosition: 'left',
      head: 'data:image/png;base64,' + this.$store.getters.getUser.head,
      newhead: '',
      newhead64: this.$store.getters.getUser.head,
      disanbleedit: '',
      reg :/[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
      passwordRules: [
        {validate: (val) => !!val, message: '必须填写密码'},
        {validate: (val) => val.length >= 3 && val.length <= 15, message: '密码长度大于3小于15'}
      ],
      phoneNumberRules: [
        {validate: (val) => !!val, message: '必须填写手机号'}
      ],
      emailRules:[
        {validate: (val) => !!val, message: '必须填写邮箱'},
        {validate:(val)=>!!this.reg.test(val),message:'邮箱格式错误'}
      ],
      form: {
        token: this.$store.getters.getUser,
        password: localStorage.getItem("password"),
        id: this.$store.getters.getUser.id,
        name: this.$store.getters.getUser.name,
        sex: this.$store.getters.getUser.sex,
        email:this.$store.getters.getUser.email,
        college:this.$store.getters.getUser.college,
        position: this.$store.getters.getUser.position,
        phonenum: this.$store.getters.getUser.phonenum,
        input: '',
        select: '',
        date: '',
        radio: '',
        checkbox: [],
        switch: false,
        textarea: '',
      },
    }
  },
  watch:{
    newhead(){
      var tempImg=new Image();
      tempImg.src=this.newhead;
      setTimeout(()=>{
        let tempwidth=tempImg.width;
        let tempheight=tempImg.height;
        if(tempwidth>40||tempheight>40){
          this.newhead64='';
          this.newhead='';
          this.newheadalert=true;
        }
      },200)
    }
  },
  methods: {
    submit() {
      this.$refs.form.validate().then((result)=>{
            if(result){
              const formData={
                id:this.form.id,
                password:this.form.password,
                name:this.form.name,
                sex:this.form.sex,
                phoneNum:this.form.phonenum,
                college:this.form.college,
                email:this.form.email,
                position:this.form.position,
                head:this.newhead64,
                registered:true
              }
              console.log(formData)
              this.$axios.post('http://localhost:8081/teacher/teaedit',formData,
                  {
                    headers: {
                      "Authorization": this.$store.getters.getToken
                    }
                  })
                  .then(res=>{
                        if(res.data.code===200){
                          this.$alert("修改成功，请重新登录");
                          this.$router.push({path: '/login'});
                        }
                        else this.$alert("修改失败！");
                      }
                  )
            }
          }
      )
    },
    upload(e) {
      this.newheadalert=false
      let file=e.target.files[0];
      let url='';
      var reader = new FileReader();
      reader.readAsDataURL(file);
      let that=this;
      reader.onload = function () {
        var tempImg=new Image();
        tempImg.src=reader.result;
        url = this.result.substring(this.result.indexOf(',') + 1);
        // console.log("newhead"+that.newhead64);
        setTimeout(()=>{
          that.newhead64 = url;
          //console.log("newhead2"+that.newhead64);
          that.newhead = 'data:image/png;base64,' + url;
          //获取base64格式图片
        })
      }
    }
  },
  mounted() {
    this.disanbleedit=this.$store.state.userInfo.registered;
  }
}

</script>

<style scoped>
.mu-form {
  width: 100%;
  max-width: 600px;
  margin-left: 209px;
  margin-right: 209px;
  margin-bottom: 100px;
}
.submit{
  position: relative;
  margin-bottom: 70px;
  margin-left: 750px;
}
.upload{
  position: relative;
  margin-left: 90%;
}
.radio_right{
  position: relative;
  margin-left: 10%;
}
.input-button{
  position: absolute;
  left:-5px;
  top:-5px;
  height: 36px;
  width: 88px;
  cursor: pointer;
  /*filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=image); !* 该对象只用来在IE下获得图片的原始尺寸，无其它用途 *!*/
  /*height: 1px;*/
  /*visibility:hidden;*/
  opacity: 0;
}
.falsebutton{
  position: absolute;
  top: -15px;
  left: -15px;
}
.conImage{

}
</style>