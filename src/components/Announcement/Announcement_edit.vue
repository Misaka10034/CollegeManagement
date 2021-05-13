<template>
<div>
  <mu-container>
  <mu-form ref="editForm" :model="editForm" :rules="rules" label-width="80px" prop="editForm">
    <mu-form-item label="标题" prop="title">
      <input v-model="editForm.title"/>
    </mu-form-item>
    <mu-form-item label="内容" prop="text">
      <mavon-editor v-model="editForm.text"></mavon-editor>
    </mu-form-item>
    <mu-form-item>
      <mu-button color="blue" @click="submitForm">发布</mu-button>
      <mu-button @click="cancel">取消</mu-button>
    </mu-form-item>
  </mu-form>
</mu-container>
</div>
</template>

<script>
export default {
name: "Announcement_edit",
  inject:["reload"],

  data(){
    return{
      editForm:{
        id:null,
        title:'',
        text:''
      },
      rules:{
        title:[
          { validate: (val) => !!val, message: '必须填写标题'},
          { validate: (val) => val.length >= 3 && val.length <= 15, message: '标题长度大于3小于15'}
        ]
      }
    }

  },
  methods:{
    submitForm(){
      this.$refs.editForm.validate().then((valid)=>{
          if(valid){
            console.log("running")
            this.$axios.post('http://localhost:8081/announcement/edit',this.editForm,{
              headers: {
                "Authorization": this.$store.getters.getToken
              }
              // eslint-disable-next-line no-unused-vars
            }).then((res)=>{
              this.$alert("操作成功");//后面再改效果
              this.reload();
            })
          }
        })
    },
cancel(){
      this.reload();
}
  }
}
</script>

<style scoped>

</style>