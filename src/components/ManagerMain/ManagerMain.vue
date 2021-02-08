<template>
  <!--  用户选项没写 用户头像加载-->
  <mu-appbar style="width: 100%;" color=#4a148c>

    <mu-button icon slot="left" @click="open = !open">
      <mu-icon value="menu" size="35">
      </mu-icon>
    </mu-button>
    <mu-drawer :open.sync="open" :docked="docked" :right="position === 'right'">
      <mu-list>
        <mu-list-item button>
          <mu-list-item-title>Menu Item 1</mu-list-item-title>
        </mu-list-item>
        <mu-list-item button>
          <mu-list-item-title>Menu Item 2</mu-list-item-title>
        </mu-list-item>
        <mu-list-item  @click="open = false" button>
          <mu-list-item-title>Close</mu-list-item-title>
        </mu-list-item>
      </mu-list>
    </mu-drawer>
    <img :src="schlogo" class="Schlogo" slot="left">

    <mu-menu slot="right">
      <mu-button flat><mu-avatar></mu-avatar></mu-button>
      <mu-list slot="content">
        <mu-list-item button>
          <mu-list-item-content>
            <mu-list-item-title>个人中心</mu-list-item-title>
          </mu-list-item-content>
        </mu-list-item>
        <mu-list-item button>
          <mu-list-item-content>
            <mu-list-item-title>退出登录</mu-list-item-title>
          </mu-list-item-content>
        </mu-list-item>

      </mu-list>
    </mu-menu>
  </mu-appbar>
</template>

<script>
import schlogo from "D:/VUE/muse_test/src/assets/images/schlogo.png";
export default {
// name: "ManagerMain"
  data(){
    return{
      schlogo,
      docked: false,
      open: false,
      position: 'left',


    }
  }
}
</script>

<style scoped>

.Schlogo{

}
</style>