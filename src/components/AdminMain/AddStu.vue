<template>
<div>
  <mu-list>
    <mu-list-item style="color: black"><h1>新增学生</h1></mu-list-item>
    <mu-list-item>请输入新增数量：<mu-text-field v-model="num" oninput="value=value.replace(/[^\d]/g,'')">
    </mu-text-field>
    </mu-list-item>
    <mu-list-item><mu-button @click="submit">提交</mu-button></mu-list-item>
  </mu-list>
</div>
</template>

<script>
export default {
name: "AddStu",
  data() {
    return {
      num:''
    }
  },
  methods:{
  submit(){
    this.$axios.post('http://localhost:8081/addstu/'+this.num
    ,{},{
      headers: {
            "Authorization": this.$store.getters.getToken
          }}
    )
          // eslint-disable-next-line no-unused-vars
        .then((res)=>{
          this.$alert("操作成功");
    })
  }
  }
}
</script>

<style scoped>

</style>