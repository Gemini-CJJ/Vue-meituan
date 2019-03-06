<template>
  <div class="page-register">
    <div class="header">
      <header>
        <a class="site-logo" href="http://www.meituan.com">美团</a>
        <div class="login">
          <span>已有美团账号</span>
          <router-link :to="{name: 'login'}">登陆</router-link>
        </div>
      </header>
    </div>
    <div class="content">
      <el-form :model="registerForm"
               status-icon
               :rules="rules"
               ref="registerForm"
               label-width="100px"
               class="demo-ruleForm">
        <el-form-item label="用户名" prop="userName">
          <el-input type="text" v-model="registerForm.userName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="registerForm.password" autocomplete="off" @input="input"></el-input>
          <div class="pw-strength">
            <div :class="['bar',strengthClass]"></div>
            <div class="letter">
              <span>弱</span>
              <span>中</span>
              <span>强</span>
            </div>
          </div>
        </el-form-item>
        <el-form-item label="确认密码" prop="rePassword">
          <el-input type="password" v-model="registerForm.rePassword" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('registerForm')">同意以下协议并注册</el-button>
          <a class="f1" href="http://www.meituan.com/about/terms" target="_blank">《美团网用户协议》</a>
        </el-form-item>
      </el-form>
    </div>
    <footer>

    </footer>
  </div>
</template>

<script>
  import api from '@/api/index'

  export default {
    name: 'register',
    data () {
      let validateUser = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入用户名'))
        } else if (value.length < 4 || value.length > 16) {
          callback(new Error('用户名必须为4-16位的字母数字下划线组成'))
        } else {
          callback()
        }
      }
      let validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'))
        } else {
          if (this.registerForm.rePassword !== '') {
            this.$refs.registerForm.validateField('rePassword')
          }
          callback()
        }
      }
      let validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'))
        } else if (value !== this.registerForm.password) {
          callback(new Error('两次输入密码不一致!'))
        } else {
          callback()
        }
      }
      return {
        registerForm: {
          userName: '',
          password: '',
          rePassword: ''
        },
        strengthClass: '',
        rules: {
          userName: [
            { validator: validateUser, trigger: 'blur' }
          ],
          pass: [
            { validator: validatePass, trigger: 'blur' }
          ],
          rePassword: [
            { validator: validatePass2, trigger: 'blur' }
          ],
        }
      }
    },
    methods: {
      submitForm (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            api.register({
              params: this.registerForm
            }).then((res) => {
              console.log(res)
              if (res.data.status == 'success') {
                // this.$message({
                //   message: res.data.msg,
                //   type: 'success'
                // });
                this.$router.push({ name: 'login' })
              } else {
                alert(res.data.msg)
              }
            })
          }
        })
      },
      input () {
        let regStr = /(\w)+/g
        let regNum = /(\d)+/g
        let reg = /_/g
        let strongth = this.registerForm.password.match(regStr) && this.registerForm.password.match(reg) && this.registerForm.password.match(regNum)
        if (this.registerForm.password.length > 20 || (this.registerForm.password.match(regStr) && strongth)) {
          this.strengthClass = 'strong'
        } else if (this.registerForm.password.length < 6) {
          this.strengthClass = 'week'
        } else {
          this.strengthClass = 'normal'
        }
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "@/assets/css/register/index.scss";
</style>
