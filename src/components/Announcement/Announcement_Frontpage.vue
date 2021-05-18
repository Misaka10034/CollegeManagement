<template><!--首页的信息公告缩略版本组件 仅显示标题和时间 按时间顺序排列 按分类分块-->
  <mu-container class="mu-form-container">
    <mu-list textline="two-line">
      <!--      <mu-list-item avatar :ripple="false" button>-->
        <mu-list-item-content>
          <div  v-for="announcement in announcements" :key="announcement.id">
          <mu-list-item-title  style="height: 72px ">
            <router-link :to="{name:'Announcement',query:{announcementId:announcement.id}}" style="color: #016ad7"  tag="a" target="_blank">
              <h1>{{announcement.title}}</h1>
            </router-link>
          </mu-list-item-title>
            <mu-divider></mu-divider>
          <mu-list-item-sub-title>发布者：{{announcement.author}}</mu-list-item-sub-title>
          <mu-list-item-after-text >{{announcement.time}}</mu-list-item-after-text>
          </div>
        </mu-list-item-content>
    </mu-list>
    <mu-flex class="page" justify-content="center">
      <mu-pagination :current.sync="current" :page-count="pagesize" :page-size="5" :total="total" @change="current" v-on:change="current"></mu-pagination>
    </mu-flex>
  </mu-container>
</template>

<script>
export default {
  name: "Announcement_Frontpage",
  data() {
    return {
      current: 1,
      announcements:{},
      total:10,
      pagesize:5
    }
  },
  methods: {
    // eslint-disable-next-line no-unused-vars
    InitData(current) {
      let _this=this
      setTimeout(() => {
        this.$axios.get('http://localhost:8081/announcement?currentPage='+current).then(
            res=> {
              _this.current = res.data.data.current;
              _this.announcements=res.data.data.records;
              _this.total=res.data.data.total;
              _this.pagesize=res.data.data.size;
            }
        )
        // this.userInfo=JSON.stringify(this.$store.state.userInfo);
      }, 100)
    },

  },
  watch:{
    current(){
      this.InitData(this.current);
}
  },
  mounted() {
    this.InitData(this.current);
  }
}
</script>

<style scoped>
.page{
  position: absolute;
  left: 45%;
  bottom:20px;
}
</style>