import Vue from 'vue'
import VueRouter from 'vue-router'
// @表示src目录，不受当前文件路径影响
import Login from '@/views/login/index.vue'
import Home from '@/views/home/index.vue'
import Layout from '@/views/layout/index.vue'
import Article from '@/views/article/index.vue'
import Publish from '@/views/publish/index.vue'
import Image from '@/views/image/index.vue'
import Comment from '@/views/comment/index.vue'
import Fans from '@/views/fans/index.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/login', component: Login, name: 'login'
  },
  {
    path: '/',
    component: Layout,
    children: [
      {
        path: '', component: Home, name: 'home'
      },
      {
        path: '/article', component: Article, name: 'artcile'
      },
      {
        path: '/publish', component: Publish, name: 'publish'
      },
      {
        path: '/image', component: Image, name: 'image'
      },
      {
        path: '/comment', component: Comment, name: 'comment'
      },
      {
        path: '/fans', component: Fans, name: 'fans'
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

// 路由导航守卫,所有页面都会经过这里
router.beforeEach((to, from, next) => {
  const user = JSON.parse(window.localStorage.getItem('user'))
  if (to.path !== '/login') {
    if (user) {
      next()
    } else {
      next('/login')
    }
  } else {
    next()
  }
})
export default router
