import Vue from "vue";
import Login from "./components/Login";
import Router from "vue-router";
import Main from "@/components/Main";
import Help from "@/components/Help";
import StuMain from "@/components/StuMain/StuMain";
import StuCenter from "@/components/StuMain/StuCenter";
import AdminMain from "@/components/AdminMain/AdminMain";
import TeacherMain from "@/components/TeacherMain/TeacherMain";

Vue.use(Router);

export default new Router({
        routes:[
                {path: '/', redirect:'/login'},
                {path:'/login',component:Login},
                {path:'/main',component: Main},
                {path:'/help',component: Help},
                {path:'/stuMain',component: StuMain,
                children:[{path: '/stuCenter',component: StuCenter,name:"StuCenter"}]},
                {path:'/adminMain',component: AdminMain},
                {path: '/teaMain',component: TeacherMain},

            ]

    })


