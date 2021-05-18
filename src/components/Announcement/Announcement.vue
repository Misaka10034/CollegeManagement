<template><!--信息公告-->
<mu-container>
<div class="announcement_container">
  <div class="detailedannouncement">
    <h1>{{announcement.title}}</h1>
    <mu-divider></mu-divider>
    <div style="color: grey"><h3>{{announcement.author}}</h3></div>
    <mu-divider></mu-divider>
    <div class="content" v-html="announcement.text"></div>
  </div>
</div>
</mu-container>

</template>

<script>
import 'github-markdown-css/github-markdown.css'

export default {
name: "Announcement",
data(){
  return{
    announcement: {
      title:'',
      text:'',
      author:''
    }
  }
},
  methods:{
  getannouncement(){
    const announcementId=this.$route.query.announcementId;
    console.log(announcementId)
    const _this=this;
    this.$axios.get('http://localhost:8081/announcementdetailed/'+announcementId).then((res)=>
        {
          _this.announcement=res.data.data;
          var MarkdownIt=require('markdown-it');
          var md=new MarkdownIt();
          var result=md.render(_this.announcement.text);
          _this.announcement.text=result;
        }
    )
  },
    back(){
      this.$router.go(-1);
    },
  },
  created() {
  this.getannouncement();
  }
}
</script>

<style scoped>

</style>