import Vue from 'vue'
import Vuex from 'vuex'


Vue.use(Vuex)
export default new Vuex.Store({
    state: {
        token: '',
        userInfo: JSON.parse(sessionStorage.getItem("userInfo"))
    },
    mutations: {
        SET_TOKEN: (state, token) => {
            state.token = token
            sessionStorage.setItem("token", token)
        },
        REMOVE_INFO: (state) => {
            localStorage.setItem("token", '')
            sessionStorage.setItem("userInfo", JSON.stringify(''))
            state.userInfo = {}
        },
        SET_USERINFO: (state, userInfo) => {
            state.userInfo = userInfo
            sessionStorage.setItem("userInfo", JSON.stringify(userInfo))
        },
    },
    getters: {
        getUser: state => {
            return state.userInfo
        },
        getToken: state => {
            return state.token;
        }
    },
    actions: {},
    modules: {}
})
