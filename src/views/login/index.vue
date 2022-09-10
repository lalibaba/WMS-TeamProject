<template>
  <div class="login-container">
    <el-card class="elcard">
      <div class="left">
        <el-form
          ref="loginForm"
          :model="loginForm"
          :rules="loginRules"
          class="login-form"
          auto-complete="on"
          label-position="left"
        >
          <div class="title-container">
            <img src="@/assets/login/2.png" alt="">
          </div>

          <el-form-item prop="username">
            <span class="inputspan"><img src="../../assets/login/phone.png" alt=""></span>
            <el-input v-model="loginForm.username" placeholder="请输入账号" />
          </el-form-item>

          <el-form-item prop="password">
            <span class="inputspan"><img src="../../assets/login/clock.png" alt=""></span>
            <el-input
              ref="pwdinput"
              v-model="loginForm.password"
              :type="passwordType"
              placeholder="请输入密码"
            />
            <span class="svg-container">
              <svg-icon :icon-class="passwordType==='password'?'eye':'eye-open'" @click="showPwd" />
            </span>
          </el-form-item>
          <el-checkbox v-model="loginForm.checkBox" style="margin-bottom:20px" label="记住密码" />

          <el-button
            :loading="loading"
            type="primary"
            style="
              box-shadow: 0 2px 9px 1px rgb(255 178 0 / 47%);
              color: #000;
              width: 100%;
              margin-bottom: 30px;
              background: #ffb200;
            "
            @click.native.prevent="handleLogin"
          >立即登录</el-button>

        </el-form>
      </div>
      <div class="right" />
    </el-card>

  </div>
</template>

<script>
// import { validUsername } from '@/utils/validate'

export default {
  name: 'Login',
  data() {
    const validatorusername = (rule, value, callback) => {
      if (value === 'admin') {
        return callback()
      } else {
        return callback(new Error('账号为admin'))
      }
    }
    const validatorpassword = (rule, value, callback) => {
      if (value === '111111') {
        return callback()
      } else {
        return callback(new Error('密码为111111'))
      }
    }
    return {
      loginForm: {
        username: 'admin',
        password: '111111',
        checkBox: true
      },
      loginRules: {
        username: [
          { required: true, trigger: 'blur', message: '请输入账户' },
          { trigger: 'blur', validator: validatorusername }
        ],
        password: [
          { required: true, trigger: 'blur', message: '请输入密码' },
          { trigger: 'blur', validator: validatorpassword }
        ]
      },
      loading: false,
      passwordType: 'password',
      redirect: undefined
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  methods: {
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.pwdinput.focus()
      })
    },
    handleLogin() {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.loading = true
          this.$store
            .dispatch('user/login', this.loginForm)
            .then(() => {
              this.$router.push({ path: this.redirect || '/' })
              this.loading = false
            })
            .catch(() => {
              this.loading = false
            })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg: #f8f5f5;
$light_gray: #000;
$cursor: #000;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  .el-input {
    // display: inline-block;
    height: 47px;
    // width: 85%;

    input {
      background: transparent;
      border: 1px solid #f8f5f5;
      -webkit-appearance: none;
      border-radius: 0 8px 8px 0;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 0px solid #f8f5f5;
    background: #f8f5f5;
    border-radius: 8px;
    color: #f8f5f5;
    .el-form-item__content{
      display: flex;
    }
  }
}
.elcard {
  .el-card__body {
    padding: 0;
  }
}
.left {
  .el-button {
    border: 0px solid #000;
    height: 50px;
    font-size: 16px;
    font-weight: 600;
    border-radius: 8px;
  }
}
// .el-checkbox-group{
//   .el-checkbox__input.is-checked+.el-checkbox__label{
//     color:#ffb200
//   }
//   .el-checkbox__input.is-checked .el-checkbox__inner, .el-checkbox__input.is-indeterminate .el-checkbox__inner {
//     color:#ffb200;
//     background-color:#ffb200;
//     border-color: #ffb200;
//   }
// }
</style>

<style lang="scss" scoped>
$bg: #fff;
$dark_gray: #889aa4;
$light_gray: #000;

.inputspan{
    width: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #eae7e7;
    border-radius: 8px 0 0 8px;
    img {
      width:25px
    }
}

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;
  display: flex;
  align-items: center;
  .elcard {
    position: relative;
    border: 0px solid #ebeef5;
    min-width: 958px;
    min-height: 500px;
    margin: 0 auto;
    overflow: hidden;
    border-radius: 40px;
    box-shadow: 0 0 20px rgb(93 93 93 / 33%);
    .left {
      padding: 0 59px;
      width: 42%;
      float: left;
      display: flex;
      justify-content: center;
    }
    .right {
      float: right;
      background-image: url(~@/assets/login/contentBg.1321d126.png);
      // background-position: 50%;
      background-repeat: no-repeat;
      background-size: cover;
      width: 58%;
      height: 516px;
    }
    .login-form {
      // position: relative;
      width: 400px;
      // max-width: 100%;
      // padding: 160px 35px 0;
      // margin: 0 auto;
      overflow: hidden;
    }
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    width: 44px;
    padding: 4px 5px 0px 15px;
    color: $dark_gray;
    vertical-align: middle;
    display: inline-block;
  }

  .title-container {
    img {
      margin: 0 auto;
      width: 150px;
      height: 63px;
      margin-top: 72px;
      margin-left: 54px;
      margin-bottom: 55px;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
</style>
