<template>
  <mu-container>
  <mu-form ref="orderForm" :model="orderForm" :rules="inputrule" class="mainform">
    <mu-form-item style="margin-left: 5%">
      <h2 style="color: #2196f3">新建工单</h2>
    </mu-form-item>
    <mu-divider></mu-divider>
    <mu-form-item label="请选择问题类型：" style="margin-left: 10%"  >
  <mu-select v-model="orderForm.kind" style="width: 400px" @change="selectkind" >
<mu-option v-for="option in options" :key="option.id" :label="option.name" :value="option.id" style="width: 400px"></mu-option>
  </mu-select>
      <mu-alert v-show="choosekind" color="error" transition="mu-scale-transition">请正确选择问题</mu-alert>
</mu-form-item>
    <mu-divider></mu-divider>
    <mu-form-item :rules="inputrule" label="请详细描述问题：" prop="msg" style="margin-left: 10%">
<!--      <mu-text-field multi-line :rows-max="10" placeholder="请在此处输入问题" max-length="500" class="textinput"></mu-text-field>-->
      <textarea v-model="orderForm.msg" class="textinput" maxlength="500" prop="msg" @input="message" ></textarea>
    </mu-form-item>
    <mu-form-item style="margin-left: 60%">{{remnant}}/500</mu-form-item>
    <mu-divider></mu-divider>
<mu-form-item v-if="appointment" label="请选择提交对象:" style="margin-left: 10%" >
<mu-select v-model="orderForm.targetid" :filterable="true" style="width: 200px" textline="two-line">
<mu-option v-for="account in targetlist" :key="account.id" :label="account.id.toString()" :value="account.id"></mu-option>
</mu-select>
  <mu-alert v-show="choosetarget" color="error" transition="mu-scale-transition">请正确选择提交对象</mu-alert>
</mu-form-item>
  </mu-form>
  <mu-button class="submit" color="#2196f3" @click="submit">提交</mu-button>
  </mu-container>
</template>

<script>
export default {
  inject:["reload"],
  name: "WorkOrderCreate",
  data(){
  return {
    options: [
      {id:1,name:"教学相关"},
      {id:2,name:"安保相关"},
      {id:3,name:"宿舍后勤"},
      {id:4,name:"申请惩罚撤销"},
      {id:5,name:"其他问题"}
    ],
    inputrule:[ { validate: (val) => !!val, message: '必须填写原因'},
      {validate:(val) => val.length >= 10,message:'必须填写十字以上'}],
    targetlist: {
    },
    remnant:0,
    appointment:false,
    choosetarget:false,
    choosekind:false,
    orderForm: {
      targetid:'提交对象',
      kind:'问题类型',
      msg:'',
    },
  }
  },
  methods:{
  message(){
    var txtVal = this.orderForm.msg.length;
    this.remnant = txtVal;
  },
    selectkind:function(){
    if(this.orderForm.kind<2||this.orderForm.kind>4)
      this.appointment=true;
    else{
      this.appointment=false;
      switch (this.orderForm.kind) {
          case 2:this.orderForm.targetid=101;break;
          case 3:this.orderForm.targetid=5;break;
          case 4:this.orderForm.targetid=100;break;
      }
    }
    },

    InitiaData(){
    setTimeout(()=>
    {
      this.$axios.get('http://localhost:8081/getlist').then(
          res=>{
            this.targetlist=res.data.data;
          }
      )
    },100)
    },
    submit(){
    if(isNaN(this.orderForm.kind)) this.choosekind=true;
    if(isNaN(this.orderForm.targetid)) this.choosetarget=true;
     if (!(isNaN(this.orderForm.kind)&&isNaN(this.orderForm.targetid))) {
       this.choosekind=false;
       this.choosetarget=false;
       this.$refs.orderForm.validate().then((result) => {
             if (result) {
               const formData = {
                 originID: this.$store.getters.getUser.id,
                 message: this.orderForm.msg,
                 targetID: this.orderForm.targetid,
                 kind: this.orderForm.kind,
                 finished: 0,
               }
               this.$axios.post('http://localhost:8081/postorder', formData,
                   {
                     headers: {
                       "Authorization": localStorage.getItem("token")
                     }
                   })
                   .then(res => {
                         if (res.data.code === 200) {
                           this.$alert("提交成功");
                           this.reload();
                         } else this.$alert("提交失败！");
                       }
                   )
             }
           }
       )
     }
    },
  },
  mounted() {
  this.InitiaData();
  }
}
</script>

<style scoped>
.textinput{
  height: 300px;
  width: 600px;
}
.mainform{
  margin-top: 3%;
  margin-bottom: 50px;
}
.submit{
  margin-bottom: 100px;
  margin-left: 60%;
}
</style>