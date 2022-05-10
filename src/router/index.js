import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../view/Login'
import SignUp from '../view/SignUp'
import Home from '../view/Home'
import Manage from '../view/Manage'

Vue.use(VueRouter);

export default new VueRouter({
    routes:[
        {
            path:'*',
            component:SignUp
        },
        {
            path:'/login',
            component:Login
        },
        {
            path:'/Manage',
            component:Manage
        },
        {
            path:'/Home',
            component:Home
        }

    ]
})