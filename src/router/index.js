import Vue from 'vue'
import VueRouter from 'vue-router'
// @表示src目录，不受当前文件路径影响
import Login from '@/views/login/index.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login', component: Login
  }
]

const router = new VueRouter({
  routes
})

export default router
