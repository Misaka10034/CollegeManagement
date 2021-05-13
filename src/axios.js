import axios from 'axios'

import store from "./store";
import router from "./router";
import Vue from 'vue';

axios.defaults.baseURL='http://localhost:8081'
axios.interceptors.request.use(config => {
    console.log("前置拦截")
    // 可以统一设置请求头
    return config
})
axios.interceptors.response.use(response => {
        const res = response.data;
        console.log("后置拦截")
        // 当结果的code是否为200的情况
        if (res.code === 200) {
            return response
        } else {
            Vue.prototype.$message.alert(response.data.msg,'错误',{
                okLabel:"确定",
                type:"error"
            })
            return Promise.reject(response.data.msg)
        }
    },
    error => {
        console.log('err' + error)// for debug
        if(error.response.data){
            error.message=error.response.data.msg
        }
        // 根据请求状态觉得是否登录或者提示其他
        if (error.response.status === 401) {
            store.commit('REMOVE_INFO');
            router.push({
                path: '/login'
            });
            error.message = '请重新登录';
        }
        else if (error.response.status === 403) {
            error.message = '权限不足，无法访问';
        }
        else if (error.response.status === 500) {
            error.message = '未查询到相关数据，请检查输入';
        }
        // else if (error.response.status === 404) {
        //     error.message = 'ERROR:404，没有相关页面';
        // }
        else error.message = '错误，无法访问！';
        Vue.prototype.$message.alert(error.message,'错误',{
            okLabel:"确定",
            type:"error",
        })
        return Promise.reject(error)
    })
