<template>
<!--教师处理RP，可以在此处审核材料通过奖项-->
<!--  均只能查看不能操作-->
  <mu-container>
    <mu-form ref="PR" :model="PR" class="mainform">
      <mu-form-item>
        <h2 style="color: black">当前记录编号：</h2><h2 style="color: black"><div v-text="PR.id"></div></h2>
      </mu-form-item>
      <mu-divider></mu-divider>
      <mu-form-item>
        <h4>处理人ID：</h4><h4><div v-text="PR.adminID"></div></h4>
      </mu-form-item>
      <mu-divider></mu-divider>
      <mu-form-item label="奖惩概述：">
        <textarea class="reason" disabled="disabled" v-html="PR.reason"></textarea>
      </mu-form-item>
      <mu-divider></mu-divider>
      <mu-form-item label="奖惩详细：">
        <textarea class="reason" disabled="disabled" v-html="PR.detailedInfo"></textarea>
      </mu-form-item>
      <mu-divider></mu-divider>
      <mu-form-item v-if="PR.rewardorPunish===0" class="image" label="奖项图片：">
        <div v-if="PR.certificateImage===''"><h3 style="color: red">学生未上传证书</h3></div>
        <div v-else-if="PR.certificateImage!==''"><img :src="'data:image/png;base64,'+PR.certificateImage" class="image"></div>
      </mu-form-item>
      <mu-form-item v-if="PR.finished===0&&this.$route.query.userid<10000" class="handle">
        <mu-button class="passbutton" color="blue" @click="passPR">通过</mu-button>
        <mu-button class="refusebutton" color="red" @click="refusePR">不通过</mu-button>
      </mu-form-item>
    </mu-form>
  </mu-container>
</template>

<script>
export default {
name: "HandleRP",
  inject:["reload","MyRPInitData"],
  data(){
  return{
    PR: {
      id:'',
      reason:'',
      detailedInfo:'',
      certificateImage:'',
      rewardorPunish:'',
      adminID:'',
      stuID:'',
      finished:'',
    },
    token:'',
  }
  },
  methods:{
  InitData(){
    setTimeout(()=> {
      const prId = this.$route.query.prId;
      this.token=this.$route.query.usertoken;
      console.log(this.token)
      this.$axios.get('http://localhost:8081/getdetailedpr/' + prId).then((res) => {
        this.PR = res.data.data;
      })
    },100)
  },

    passPR(){
      this.$axios.post('http://localhost:8081/adoptreward/'+this.PR.id,'',{
        headers: {
          "Authorization": this.token
        }
      }).then(res=>{
          if(res.data.code===200){
            this.$alert("操作成功");
            this.reload();
          }
          else this.$alert("操作失败");
      })
    },
    refusePR(){
      this.$axios.post('http://localhost:8081/refusereward/'+this.PR.id,'',{
        headers: {
          "Authorization": this.token
        }
      }).then(res=>{
        if(res.data.code===200){
          this.$alert("操作成功");
          this.reload();
          this.MyRPInitData(1);
        }
        else this.$alert("操作失败");
      })
    },
  },
  created() {
    this.InitData();
  }
}
</script>

<style scoped>
.reason{
  height: 300px;
  width: 600px;
  resize: none;
}
.image{
  height: 300px;
  width: 500px;
}
.handle{
  position: relative;
  top: 50px;
  bottom: 50px;
}
</style>