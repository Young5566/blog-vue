import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
Vue.use(Router)

const routes = [
  {
    path:'/',
    component: () =>
      import('../components/user/User.vue'),
    children:[
      {
        path:'',
        title:'主页',
        name:'user-home',
        component:() =>
          import('../components/user/userHome/UserHome.vue')
      },
      {
        path:'detail',
        title:'文章详情',
        name:'user-detail',
        component: () =>
          import('../components/user/userDetail/UserDetail.vue')
      },
      {
        path:'/userTool',
        name:'user-tool',
        component:() =>
          import('../components/user/UserTool.vue')
      },
    ]
  },
  {
    path:'/login',
    title:'登陆',
    name:'admin-login',
    component:() =>
      import('../components/admin/adminLogin/AdminLogin.vue')
  },
  {
    path:'/admin',
    component: ()=>
      import('../components/admin/Admin.vue'),
    beforeEnter: (to, from, next) => {
      if(window.localStorage.getItem('youngToken')){
        next();
      }else {
        next({
          path:'/login'
        })
      }
    },
    children:[
      {
        path:'home',
        title:'主页',
        name:'admin-home',
        component:() =>
          import('../components/admin/adminHome/AdminHome.vue'),
      },
      {
        path:'post',
        title:'发布文章',
        name:'admin-post',
        component:() =>
          import('../components/admin/adminPost/AdminPost.vue')
      },
      {
        path:'detail',
        title:'文章详情',
        name:'admin-detail',
        component:() =>
          import('../components/admin/adminDetail/AdminDetail.vue')
      },
      {
        path:'adminTool',
        name:'admin-tool',
        component: () =>
          import('../components/admin/AdminTool.vue')
      }
    ]
  }]

const router = new Router({
  routes:routes
})

export default router
