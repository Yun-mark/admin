import Vue from 'vue'
import VueRouter from 'vue-router'
// @表示src目录，不受当前文件路径影响
import Login from '@/views/login/index.vue'
import Home from '@/views/home/index.vue'
import Layout from '@/views/layout/index.vue'
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
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
