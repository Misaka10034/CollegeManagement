<template>
  <mu-container>
<mu-form ref="workorder" :model="workorder" :rules="inputrule" class="mainform">
  <mu-form-item>
    <mu-button style="color: #016ad7" @click="back">返回</mu-button>
  </mu-form-item>
  <mu-form-item>
    <h2 style="color: black">当前工单编号：</h2><h2 style="color: black"><div v-text="workorder.id"></div></h2>
  </mu-form-item>
  <mu-divider></mu-divider>
  <mu-form-item>
    <h4>处理人ID：</h4><h4><div v-text="workorder.targetID"></div></h4>
  </mu-form-item>
  <mu-divider></mu-divider>
  <mu-form-item>
    <h4>历史记录：</h4>
  </mu-form-item>
  <mu-form-item>
    <textarea class="historymsg" disabled="disabled" v-html="workorder.message"></textarea>
<!--    <div v-html="workorder.message"></div>-->
  </mu-form-item>
  <mu-divider></mu-divider>
  <mu-form-item v-if="workorder.finished!==1">
        <h4>回复工单：</h4>
  </mu-form-item>
  <mu-form-item v-if="workorder.finished!==1">
  <textarea v-model="newmessage" :rules="inputrule" class="newmsg" @input="message"></textarea>
  </mu-form-item>
  <mu-form-item style="margin-left: 60%">{{remnant}}/500</mu-form-item>
  <mu-form-item v-if="workorder.finished!==1">
    <mu-button class="postbutton" color="blue" @click="postorder">提交</mu-button>
    <mu-button class="finishbutton" @click="finishorder">结束工单</mu-button>
  </mu-form-item>
</mu-form>
  </mu-container>
</template>

<script>
export default {
  inject:["reload"],
  name: "HandleIssue",
  data(){
    return{
      inputrule:[ { validate: (val) => !!val, message: '必须填写原因'},
        {validate:(val) => val.length >= 10,message:'必须填写十字以上'}],
      workorder:{
        id:'',
        originID:'',
        targetID:'',
        kind:'',
        finished:'',
        message:''
      },
      newmessage:'',
      remnant:0,
  }
  },
  methods:{
    message(){
      var txtVal = this.newmessage.length;
      this.remnant = txtVal;
    },
    back(){
      this.$router.go(-1);
    },
  getworkorder(){
    const workorderId=this.$route.params.workorderId;
    const _this=this;
    this.$axios.get('http://localhost:8081/getorder/'+workorderId).then((res)=>
        {
          _this.workorder=res.data.data;
        }
    )
  },
    finishorder(){
      this.$axios.post('http://localhost:8081/finishorder/'+this.workorder.id).then(res=>{
        if (res.data.code === 200) {
          this.$router.go(-1);
          this.$alert("关闭成功");
        } else this.$alert("关闭失败！");
      })
    },
    postorder(){
      const _this=this;
      if(this.$store.getters.getUser.id<10000) {
        _this.workorder.message = _this.newmessage;
        this.$refs.workorder.validate().then((result) => {
          if (result) {
            this.$axios.post('http://localhost:8081/handleorder', _this.workorder).then(res => {
              if (res.data.code === 200) {
                this.$router.go(-1);
                this.$alert("提交成功");
              } else this.$alert("提交失败！");
            })
          }
        })
      }
      else{
        _this.workorder.message=_this.newmessage;
        this.$refs.workorder.validate().then((result) => {
          if (result) {
            this.$axios.post('http://localhost:8081/stuhandleorder', _this.workorder).then(res => {
              if (res.data.code === 200) {
                this.$router.go(-1);
                this.$alert("提交成功");
              } else this.$alert("提交失败！");
            })
          }
        })
      }
    }
  },
  created() {
  this.getworkorder();
  }
}
</script>

<style scoped>
.historymsg{
 width: 680px;
  height: 249px;
  resize: none;
  border-color: #dbdbdb;
  background-color: #fafafa;
  font-size: medium;
}
.newmsg{
  width: 680px;
  height: 249px;
  resize: none;
  border-color: #dbdbdb;
  background-color: #fafafa;
  font-size: medium;
}
.postbutton{
  margin-left: 50%;
  margin-bottom: 30px;

}
.finishbutton{
  color: #016ad7;
  margin-left: 30px;
  margin-bottom: 30px;
}
.mainform{
  margin-left: 10%;
}
</style>