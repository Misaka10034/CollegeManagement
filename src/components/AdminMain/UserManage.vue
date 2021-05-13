<template>
  <mu-list>
    <mu-list-item style="color: black"><h1>重置账户</h1></mu-list-item>
    <mu-list-item>请输入目标账户ID：<mu-text-field v-model="userid" oninput="value=value.replace(/[^\d]/g,'')">
    </mu-text-field>
    </mu-list-item>
    <mu-list-item><mu-button color="blue" @click="submit">重置</mu-button></mu-list-item>
  </mu-list>
</template>

<script>
export default {
name: "UserManage",
  data(){
  return {
    userid: ''
    }
  },
  methods:{
  submit(){
    console.log(this.userid);
    if(this.userid===this.$store.getters.getUser.id){
      this.$alert('无法重置当前登录账户');
    }
    else if(this.userid<100){
      this.$axios.get('http://localhost:8081/admin/reset?id='+this.userid).then((res)=>{
        if(res.data.code===200) this.$alert('成功重置目标账户');
        else this.$alert('重置失败');
      })
    }
    else if(this.userid>99&&this.userid<10000){
      this.$axios.get('http://localhost:8081/teacher/reset'+this.userid).then((res)=>{
        if(res.data.code===200) this.$alert('成功重置目标账户');
        else this.$alert('重置失败');
      })
    }
    else{
      this.$axios.get('http://localhost:8081/student/reset'+this.userid).then((res)=>{
        if(res.data.code===200) this.$alert('成功重置目标账户');
        else this.$alert('重置失败');
      })
    }
  }
  }
}
</script>

<style scoped>

</style>