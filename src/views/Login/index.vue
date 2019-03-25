<template>
  <div class="login">
    <div class="login-form">
      <div class="title">
        上海市物联网案件
        <br>智能运营管理系统
      </div>
      <p></p>
      <cube-input
        class="form-item"
        placeholder="用户名"
        v-model="username"
      ></cube-input>
      <cube-validator
        :messages="messages"
        :model="username"
        :rules="rules"
        class="validator-msg"
        ref="validator0"
        v-model="nameValid"
      ></cube-validator>
      <cube-input
        class="form-item"
        placeholder="密码"
        type="password"
        v-model="password"
      ></cube-input>
      <cube-validator
        :messages="messages"
        :model="password"
        :rules="rules"
        class="validator-msg"
        ref="validator1"
        v-model="passwordValid"
      ></cube-validator>

      <cube-button
        @click="submit"
        class="button"
        light
      >
        <cube-loading
          class="loading"
          v-if="loading"
        ></cube-loading>
        <span v-else>登陆系统</span>
      </cube-button>
    </div>
  </div>
</template>
<script>
import User from '@/api/user'
import { mapMutations } from 'vuex'
export default {
  data() {
    return {
      username: 'LF_MEMBER',
      password: '123456',
      nameValid: undefined,
      passwordValid: undefined,
      rules: {
        required: true
      },
      messages: {
        required: '该项不可为空'
      },
      loading: false
    }
  },
  methods: {
    async submit() {
      const p1 = this.$refs.validator0.validate()
      const p2 = this.$refs.validator1.validate()
      const vaild = await Promise.all([p1, p2])
      if (vaild.every(item => item)) {
        this.loading = true
        const res = await User.login({
          username: this.username,
          password: this.password
        })
        if (res.auth_key) {
          const token = await User.getToken({ authKey: res.auth_key })
          console.log(token)
          res.userToken = token || undefined
          this.setUser(res)
          this.loading = false
          this.$router.push({ name: 'home' })
        }
      }
    },
    ...mapMutations(['setUser'])
  }
}
</script>
<style lang="stylus" scoped>
.login {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: url('./loginBG.png') no-repeat;
  background-size: cover;
}

.login-form {
  position: relative;
  top: -20%;
}

.form-item {
  margin-bottom: 20px;
}

.title {
  margin-bottom: 50px;
  line-height: 1.4;
  text-align: center;
  font-size: 32px;
  font-weight: bold;
  color: #fff;
}

.button {
  border-radius: 20px;
  padding: 10px;
  color: #4990e2;
}

.validator-msg {
  position: relative;
  top: -8px;
  font-size: 12px;
}

.loading {
  display: inline-block;
}
</style>
