<template>
  <el-container class="layout-container">
    <el-aside width="auto" class="aisde">
        <app-aside class="aside-menu" :is-collapse="isCollapse"/>
    </el-aside>
      <el-container>
        <el-header class="header">
            <div>
                <i @click="isCollapse = !isCollapse" class="el-icon-s-fold"></i>
                <span class="text">科技头条后台管理系统</span>
            </div>
            <el-dropdown>
                <div class="avatar-wrap">
                    <img class="avatar" :src="user.photo" >
                    <span>{{ user.name }}</span>
                    <i class="el-icon-arrow-down el-icon--right"></i>
                </div>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>设置</el-dropdown-item>
                    <el-dropdown-item @click.native="onLogout">退出</el-dropdown-item>
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
    },
    onLogout () {
      this.$confirm('确认退出吗？', '退出提示', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 清除用户登录状态
        window.localStorage.removeItem('user')
        // 跳转到登录页面
        this.$router.push('/login')
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消退出'
        })
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
        border: 0px;
}
.header {
    height: 60px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background:linear-gradient(to right,#002033,#4f4f4f) ;
    border-bottom: 1px solid #ccc;
    color: #fff;
    font-size: 25px;
    font-family:'宋体';
    .text {
      margin-left: 450px;
    }
}
.avatar-wrap {
    display: flex;
    align-items: center;
    color: #fff;
    .avatar {
        width: 40px;
        height: 40px;
        border-radius: 50%;
    }
}
.main {
  background-color: #d3dce6;
}
</style>
