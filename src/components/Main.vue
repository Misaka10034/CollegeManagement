<template>
<!--  用户选项没写 用户头像加载-->
<!--  根据后端参数切换下方加载页面-->
<StuMainDrawer></StuMainDrawer>
</template>

<script>
import schlogo from "D:/VUE/muse_test/src/assets/images/schlogo.png";
import StuMainDrawer from "@/components/StuMain/StuMain";
//import TeacherMainDrawer from "@/components/TeacherMain/TeacherMainDrawer";
//import ManagerMainDrawer from "@/components/ManagerMain/ManagerMainDrawer";

export default {
// name: "Main"
  data(){
  return{
    schlogo,
      docked: false,
      open: false,
      position: 'left'
  }
  },
  components:{
// eslint-disable-next-line vue/no-unused-components
StuMainDrawer
    // TeacherMainDrawer,ManagerMainDrawer
  }
}
</script>

<style scoped>

/*.Schlogo{*/

/*}*/
</style>