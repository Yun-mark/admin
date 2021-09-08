<template>
  <el-container class="layout-container">
    <el-aside width="auto" class="aisde">
        <app-aside class="aside-menu" :is-collapse="isCollapse"/>
    </el-aside>
      <el-container>
        <el-header class="header">
            <div>
                <i @click="isCollapse = !isCollapse" class="el-icon-s-fold"></i>
                <span>科技头条后台管理系统</span>
            </div>
            <el-dropdown>
                <div class="avatar-wrap">
                    <img class="avatar" :src="user.photo" >
                    <span>{{ user.name }}</span>
                    <i class="el-icon-arrow-down el-icon--right"></i>
                </div>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>设置</el-dropdown-item>
                    <el-dropdown-item>退出</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </el-header>
        <el-main class="main">
            <router-view></router-view>
        </el-main>
      </el-container>
   </el-container>
</template>

<script>
import AppAside from './components/aside'
import { getUserProfile } from '@/api/user.js'
export default {
  name: '',
  components: {
    AppAside
  },
  props: {},
  data () {
    return {
      user: {}, // 当前登录用户信息
      isCollapse: false // 侧边栏的展示状态
    }
  },
  created () {
    this.loadUserProfile()
  },
  methods: {
    loadUserProfile () {
      getUserProfile().then(res => {
        this.user = res.data.data
      })
    }
  }
}
</script>

<style lang="less" scoped>
.layout-container{
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
}
.aside-menu {
        height: 100%;
        background-color: #d3dce6;
}
.header {
    height: 60px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #b3c0d1;
    border-bottom: 1px solid #ccc;
}
.avatar-wrap {
    display: flex;
    align-items: center;
    .avatar {
        width: 40px;
        height: 40px;
        border-radius: 50%;
    }
}
</style>
