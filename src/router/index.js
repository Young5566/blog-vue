import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)

const routes = [
  {
    path: '/',
    component: () =>
      import('../components/user/User.vue'),
    children: [
      {
        path: '',
        title: '主页',
        name: 'user-home',
        component: () =>
          import('../components/user/userHome/UserHome.vue')
      },
      {
        path: 'detail',
        title: '文章详情',
        name: 'user-detail',
        component: () =>
          import('../components/user/userDetail/UserDetail.vue')
      },
      // {
      //   path: '/image',
      //   name: 'user-image',
      //   component: () =>
      //     import('../components/user/userImage/UserImage.vue')
      // },
      {
        path: 'userTool',
        name: 'user-tool',
        component: () =>
          import('../components/user/UserTool.vue')
      }
    ]
  },
  {
    path: '/login',
    title: '登陆',
    name: 'admin-login',
    component: () =>
      import('../components/admin/adminLogin/AdminLogin.vue')
  },
  {
    path: '/admin',
    component: () =>
      import('../components/admin/Admin.vue'),
    beforeEnter: (to, from, next) => {
      if (window.localStorage.getItem('youngToken')) {
        next();
      } else {
        next({
          path: '/login'
        })
      }
    },
    children: [
      {
        path: 'home',
        title: '主页',
        name: 'admin-home',
        meta: {
          keepAlive: true// 不需要缓存
        },
        component: () =>
          import('../components/admin/adminHome/AdminHome.vue'),
      },
      {
        path: 'article/post',
        title: '发布文章',
        name: 'admin-post',
        component: () =>
          import('../components/admin/adminPost/AdminPost.vue')
      },
      {
        path: 'article/detail',
        title: '文章详情',
        name: 'admin-detail',
        component: () =>
          import('../components/admin/adminArticleDetail/AdminArticleDetail.vue')
      },
      {
        path: 'adminTool',
        name: 'admin-tool',
        component: () =>
          import('../components/admin/AdminTool.vue')
      },
      {
        path: 'image',
        name: 'admin-image',
        component: () =>
          import('../components/admin/adminImage/AdminImage.vue')
      },
      {
        path: 'article/manage',
        name: 'admin-article-manage',
        component: () =>
          import('../components/admin/adminArticleManage/AdminArticleManage.vue')
      }
    ]
  }];

const router = new Router({
  mode: 'history',
  base: '/tom/',
  routes: routes
});

export default router
