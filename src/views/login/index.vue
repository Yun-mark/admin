<template>
  <div class="login-container">
    <div class="login-head">
      <img src="../../assets/logo.png">
    </div>
    <el-form class="login-form" ref="login-form" :model="user" :rules="formRules">
      <el-form-item class="el-form-one" prop="mobile">
        <el-input prefix-icon="el-icon-user" v-model="user.mobile" placeholder="请输入管理手机号"></el-input>
      </el-form-item>
      <el-form-item prop="code">
        <el-input prefix-icon="el-icon-lock" v-model="user.code" placeholder="请输入指定验证码"></el-input>
      </el-form-item>
      <el-form-item prop="agree">
        <el-checkbox v-model="user.agree">我已阅读并同意用户协议和隐私条款</el-checkbox>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" class="login-btn"   :loading="loginLoading" @click="onLogin">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { login } from '@/api/user'
export default {
  name: 'LoginIndex',
  data () {
    return {
      user: {
        mobile: '13911111111',
        code: '246810',
        agree: false // 是否同意协议
      },
      loginLoading: false,
      formRules: {
        mobile: [
          { required: true, message: '手机号不能为空', trigger: 'blur' },
          { pattern: /^1[3|5|7|8|9]\d{9}$/, message: '请输入正确的号码格式', trigger: 'blur' }
        ],
        code: [
          { required: true, message: '验证码不能为空', trigger: 'blur' },
          { pattern: /^\d{6}$/, message: '请输入正确的验证码格式', trigger: 'blur' }
        ],
        agree: [
          {
            validator: (rule, value, callback) => {
              if (value) {
                callback()
              } else {
                callback(new Error('请同意用户协议'))
              }
            },
            trigger: 'change'
          }
        ]
      }
    }
  },
  methods: {
    onLogin () {
      // 表单验证
      this.$refs['login-form'].validate(valid => {
        if (!valid) {
          return
        }
        this.login()
      })
    },
    login () {
    // 开启登录
      this.loginLoading = true
      login(this.user).then(res => {
        // 登录成功
        this.$message({
          message: '登录成功',
          type: 'success'
        })
        // 将接口返回的用户存储到本地方便应用
        window.localStorage.setItem('user', JSON.stringify(res.data.data))
        // 关闭loading
        this.loginLoading = false
        this.$router.push({
          name: 'home'
        })
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
  background: url('../../assets/bg.jpg') no-repeat;
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
      margin-bottom: 19px;
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
