<template>
  <div class="login-page">
    <div class="card">
      <div class="logo">
        <img :src=url>
      </div>
      <el-form ref="form" :model="form" :rules="rules" autocomplete="off">
        <el-form-item prop="username">
          <el-input prefix-icon="el-icon-user-solid" v-model="form.username"></el-input>
        </el-form-item>

        <el-form-item prop="password">
          <el-input v-model="form.password" prefix-icon="el-icon-lock" type="password"></el-input>
        </el-form-item>

        <el-form-item class="tc">
          <el-button @click="login" type="primary">登 录</el-button>
          <el-button @click="reset" type="info">重 置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>

import { login } from '@/api/user'

export default {
  name: 'login-page',
  data () {
    return {
      url: 'http://weldon.net.cn/back/img/logo2.fc048282.png',
      form: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: ['blur', 'change'] },
          { min: 5, max: 11, message: '长度在 5 到 11 个字符', trigger: ['blur', 'change'] }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: ['blur', 'change'] },
          { pattern: /^\w{5,11}$/, message: '请输入 5 到 10 位的密码', trigger: ['blur', 'change'] }
        ]
      }
    }
  },
  methods: {
    async login () {
      try {
        const valid = await this.$refs.form.validate()
        if (valid) {
          const res = await login(this.form)
          this.$store.commit('user/setUserToken', res.data.token)
          await this.$router.push('/')
        }
      } catch (e) {
        console.log(e)
      }
    },
    reset () {
      this.$refs.form.resetFields()
    }
  }
}
</script>

<style lang="scss" scoped>
.login-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: space-around;
  background-color: rgba(52, 76, 106);

  .card {
    width: 420px;
    position: absolute;
    background-color: #FFFFFF;
    .logo {
      height: 130px;
      width: 130px;
      margin: 0 auto;
      transform: translateY(-50%);
      position: relative;

      img {
        width: 100%;
        height: 100%;
        background-color: #EEEEEE;
        box-shadow: 0 0 15px -5px #000;
        border: 4px solid #fff;
        border-radius: 50%;
      }
    }
  }

  .el-form {
    padding: 0 20px;
  }

  .tc {
    text-align: right;
  }
}
</style>
