<template>
<!--学生在此处可以提交材料 申请奖项-->
<!--  教师在此处新增惩罚-->
  <mu-container class="maincontainer">
    <mu-form ref="PR" :model="PR" :rules="inputrule" class="mainform">
      <mu-form-item style="margin-left: 5%">
        <h2 style="color: #2196f3">新增记录</h2>
      </mu-form-item>
      <mu-divider></mu-divider>
      <mu-form-item :rules="inputrule" label="请填写惩罚原因/奖项名称：" prop="reason" style="margin-left: 10%">
        <!--      <mu-text-field multi-line :rows-max="10" placeholder="请在此处输入问题" max-length="500" class="textinput"></mu-text-field>-->
        <textarea v-model="PR.reason" class="textinput" maxlength="30" prop="reason"></textarea>
      </mu-form-item>
      <mu-divider></mu-divider>
      <mu-form-item :rules="inputrule" label="请填写详细信息：" prop="detailedInfo" style="margin-left: 10%">
        <!--      <mu-text-field multi-line :rows-max="10" placeholder="请在此处输入问题" max-length="500" class="textinput"></mu-text-field>-->
        <textarea v-model="PR.detailedInfo" class="textinput" maxlength="500" prop="detailedInfo" @input="message" ></textarea>
      </mu-form-item>
      <mu-form-item style="margin-left: 60%">{{remnant}}/500</mu-form-item>
      <mu-divider></mu-divider>
      <mu-form-item v-if="this.userid===undefined" class="upload" label="请上传证书/奖状图片:">
        <div>
          <mu-button class="falsebutton" color="blue">上传图片</mu-button>
          <input id="file" accept="image/*" class="input-button" type="file" @change="upload($event)"/>
        </div>
      </mu-form-item>
    </mu-form>
    <mu-button class="submit" color="#2196f3" @click="submit">提交</mu-button>
  </mu-container>
</template>

<script>
export default {
name: "RPSubmit",
  inject:["reload"],
  data(){
    return{
      inputrule:[ { validate: (val) => !!val, message: '必须填写详情'},
        {validate:(val) => val.length >= 10,message:'必须填写十字以上'}],
      remnant:0,
      PR: {
        reason:'',
        detailedInfo:'',
        certificateImage:'',
        rewardorPunish:'',
        adminID:'',
        stuID:'',
        finished:'',
      },
      userid:'',
      usertoken:'',
    }
  },
  methods:{
    message(){
      var txtVal = this.PR.detailedInfo.length;
      this.remnant = txtVal;
    },
    submit(){
      if(this.userid===undefined){
        this.userid=this.$store.getters.getUser.id;
        this.usertoken=this.$store.getters.getToken;
      }
      if(this.userid<10000&&this.userid>99){
          this.PR.stuID=this.$route.query.stuid;
          this.PR.adminID=this.userid;
          this.PR.rewardorPunish=1;
          this.PR.finished=1;
          this.$refs.PR.validate().then((result) => {
            if (result) {
              this.$axios.post('http://localhost:8081/setpunish/',this.PR, {
                headers: {
                  "Authorization": this.usertoken
                }
              }).then((res) => {
                if (res.data.code === 200) {
                  this.$alert("新增成功");
                  this.reload();
                } else this.$alert("新增失败")
              })
            }
          })
      }
      else{
        console.log(this.$store.getters.getToken)
        this.PR.stuID=this.userid;
        this.PR.adminID=100;
        this.PR.rewardorPunish=0;
        this.PR.finished=0;
        this.$refs.PR.validate().then((result) => {
          if (result) {
            this.$axios.post('http://localhost:8081/submitreward/' ,this.PR, {
              headers: {
                "Authorization": this.usertoken
              }
            }).then((res) => {
              if (res.data.code === 200) {
                this.$alert("提交成功");
                this.reload();
              } else this.$alert("提交失败")
            })
          }
        })
      }
    },
    upload(e) {
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
          that.PR.certificateImage = url;
          //console.log("newhead2"+that.newhead64);
          //获取base64格式图片
        })
      }
    }
  },
  created() {
    this.userid=this.$route.query.userid;
    console.log(this.userid)
    this.usertoken=this.$route.query.usertoken;
  }
}
</script>

<style scoped>
.textinput{
  height: 300px;
  width: 600px;
  resize: none;
}
.mainform{
  margin-top: 3%;
  margin-bottom: 50px;
}
.submit{
  position: relative;
  top: 100px;
  left:650px;
}
.falsebutton{
  position: absolute;
  top: 30px;
  left: 40px;

}
.input-button{
  position: absolute;
  left:50px;
  top:40px;
  height: 36px;
  width: 88px;
  cursor: pointer;
  opacity: 0;
}
.upload{
  position: absolute;
  left: 120px;
}
.maincontainer{
  position: relative;
  left: 100px;
}
</style>