import Vue from 'vue'
import VueRouter from 'vue-router'

// import CacheServer from '../api/cacheServer'
import Main from '../views/Main.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Main,
    children: [
      {
        path: "/books/edit",
        component: () => import('../views/Content/BookEdit.vue')
      },
      {
        path: "/books/edit/:id",
        component: () => import('../views/Content/BookEdit.vue'),
        props: true
      },
      {
        path: "/books/list",
        component: () => import('../views/Content/BookList.vue')
      },

      {
        path: "/tags/edit",
        component: () => import('../views/Content/TagEdit.vue')
      },
      {
        path: "/tags/edit/:id",
        component: () => import('../views/Content/TagEdit.vue'),
        props: true
      },
      {
        path: "/tags/list",
        component: () => import('../views/Content/TagList.vue')
      },
      {
        path: "/categories/edit",
        component: () => import('../views/Content/CategoryEdit.vue')
      },
      {
        path: "/categories/edit/:id",
        component: () => import('../views/Content/CategoryEdit.vue'),
        props: true
      },
      {
        path: "/categories/list",
        component: () => import('../views/Content/CategoryList.vue')
      },
      {
        path: "/articles/edit",
        component: () => import('../views/Content/ArticleEdit.vue')
      },
      {
        path: "/articles/edit/:id",
        component: () => import('../views/Content/ArticleEdit.vue'),
        props: true
      },
      {
        path: "/articles/list",
        component: () => import('../views/Content/ArticleList.vue')
      },
      {
        path: "/banners/edit",
        component: () => import('../views/Banner/BannerEdit.vue')
      },
      {
        path: "/banners/edit/:id",
        component: () => import('../views/Banner/BannerEdit.vue'),
        props: true
      },
      {
        path: "/banners/list",
        component: () => import('../views/Banner/BannerList.vue')
      },
      //代码库
      {
        path: "/codes/edit",
        component: () => import('../views/Resource/Code/CodeEdit.vue')
      },
      {
        path: "/codes/edit/:id",
        component: () => import('../views/Resource/Code/CodeEdit.vue'),
        props: true
      },
      {
        path: "/codes/list",
        component: () => import('../views/Resource/Code/CodeList.vue')
      },
      //资源链
      {
        path: "/sources/edit",
        component: () => import('../views/Resource/Source/SourceEdit.vue')
      },
      {
        path: "/sources/edit/:id",
        component: () => import('../views/Resource/Source/SourceEdit.vue'),
        props: true
      },
      {
        path: "/sources/list",
        component: () => import('../views/Resource/Source/SourceList.vue')
      },
      //友链
      {
        path: "/friends/edit",
        component: () => import('../views/Friend/FriendEdit.vue')
      },
      {
        path: "/friends/edit/:id",
        component: () => import('../views/Friend/FriendEdit.vue'),
        props: true
      },
      {
        path: "/friends/list",
        component: () => import('../views/Friend/FriendList.vue')
      },
      {
        path: '/about/edit/:id',
        name: 'about',
        //博客信息页面
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
        props: true
      },

    ]
  },

  {
    path: '/preview/:id',
    name: 'preview',
    //博客预览页面
    component: () => import(/* webpackChunkName: "about" */ '../views/Content/PreviewArt.vue'),
    props: true
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "about" */ '../views/Login.vue'),
    meta: { isPublic: true }
  }
]
const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
router.beforeEach((to, from, next) => {
  if (!to.meta.isPublic && !localStorage.token) {
    Vue.prototype.$message({
      type: "error",
      message: "请先登录"
    })
    return next('/login')
  }
  // if (!CacheServer.VaildToken()) {
  //   Vue.prototype.$message({
  //     type: "error",
  //     message: "请先登录"
  //   })
  //   return next('/login')
  // }
  next();
})


export default router
