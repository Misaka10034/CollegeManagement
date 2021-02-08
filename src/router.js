import Vue from "vue";
import Login from "./components/Login";
import Router from "vue-router";
import Main from "@/components/Main";
import Help from "@/components/Help";
Vue.use(Router);

export default new Router({
        routes:[
                {path: '/', redirect:'/login'},
                {path:'/login',component:Login},
                {path:'/main',component: Main},
                {path:'/help',component: Help}
            ]
    })
