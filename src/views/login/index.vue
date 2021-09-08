<template>
  <div class="login-container">
    <div class="login-head">
      <img src="../../assets/logo.png">
    </div>
    <el-form class="login-form" ref="form" :model="user">
      <el-form-item class="el-form-one">
        <el-input prefix-icon="el-icon-user" v-model="user.mobile" placeholder="请输入管理手机号"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input prefix-icon="el-icon-lock" v-model="user.code" placeholder="请输入指定验证码"></el-input>
      </el-form-item>
      <el-form-item>
        <el-checkbox v-model="checked">我已阅读并同意用户协议和隐私条款</el-checkbox>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" class="login-btn"   v-loading="loginLoading" @click="onLogin">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import request from '@/utils/request'
export default {
  name: 'LoginIndex',
  data () {
    return {
      user: {
        moblie: '',
        code: ''
      },
      checked: false, // 协议相关
      loginLoading: false
    }
  },
  methods: {
    onLogin () {
      const user = this.user
      // 开启登录
      this.loginLoading = true
      request({
        method: 'POST',
        url: '/mp/v1_0/authorizations',
        data: user
      }).then(res => {
        // 登录成功
        this.$message({
          message: '登录成功',
          type: 'success'
        })
        // 关闭loading
        this.loginLoading = false
      }).catch(err => { // 登录失败
        console.log('登录失败', err)
        this.$message.error('登录失败，手机号或验证码错误')
        // 关闭loading
        this.loginLoading = false
      })
    }
  }
}
</script>

<style lang="less" scoped>
.login-container {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background: url('./bg.jpg') no-repeat;
  background-size: cover;
  .login-head {
        height: 130px;
        width: 130px;
        border: 1px solid #eee;
        border-radius: 50%;
        padding: 10px;
        box-shadow: 0 0 10px #ddd;
        position: absolute;
        top:18%;
        background-color: #fff;
        img {
            width: 100%;
            height: 100%;
            border-radius: 50%;
            background-color: #fff;
        }
     }
  .login-form {
    background-color: rgba(0,0,0,.6);
    padding: 50px;
    min-width: 300px;
    border-radius: 10px;
    box-shadow: 0 15px  25px rgba(0,0,0,.5);
    .el-form-one {
      margin-top: 22px;
    }
    .el-form-item {
      margin-bottom: 10px;
    }
    .el-checkbox {
      color: aqua;
    }
    .login-btn {
      width: 100%;
      font-size: 20px;
    }
  }
}
</style>
