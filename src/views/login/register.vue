<template>
  <div class="login">


    <div class="login_info">

      <div class="username">
        <van-icon name="friends-o" size="25px" color="#07c160"/>
        <span>用户名：</span>
        <input type="text" v-model="username" placeholder="请输入用户名">
        <van-icon name="close" color="#07c160" size="20" v-show="username" @click="onDelete"/>
      </div>

      <div class="password">
        <van-icon name="music-o" size="25px" color="#07c160"/>
        <span v-html="pass"/>
        <input :type="type" v-model="password" placeholder="请输入密码">
      </div>

      <div class="password">
        <van-icon name="music-o" size="25px" color="#07c160"/>
        <span>确认密码：</span>
        <input :type="type" v-model="repassword" placeholder="请重新输入密码">
      </div>


    </div>

    <div class="btn_login" @click="onRegister">

      <van-button class="ripple" color="#07c160" block>注册</van-button>
    </div>

    <div class="other">
      <van-checkbox v-model="agreeAgreement" icon-size="13px" checked-color="#07c160"
                    shape="square">
        <span slot="default" :class="[agreeAgreement?'checked':'unchecked']"> 同意用户注册协议</span>
      </van-checkbox>
      <span @click="onLogin" class="ripple">去登录</span>
    </div>


  </div>
</template>

<script>
  import { register } from '@/api/user'
  import { isEmpty } from '@/utils/string'
  import { isSuccess } from '@/utils/request'
  import { appMixin } from '@/store/mixin'

  export default {
    name: 'login',
    mixins: [appMixin],
    data() {
      return {
        username: '',
        password: '',
        repassword: '',
        type: 'password',
        pass: '密&#12288;码：',
        agreeAgreement: true
      }
    },
    methods: {

      onDelete() {
        this.username = ''
      },

      onRegister() {
        console.log('注册：' + this.username)
        if (isEmpty(this.username)) {
          this.$toast({ message: '用户名不能为空！', position: 'top' })
          return
        }
        if (isEmpty(this.password)) {
          this.$toast({ message: '密码不能为空！', position: 'top' })
          return
        }

        if (isEmpty(this.repassword)) {
          this.$toast({ message: '确认密码不能为空！', position: 'top' })
          return
        }

        if (this.password !== this.repassword) {
          this.$toast({ message: '密码与确认密码不一致！', position: 'top' })
          return
        }
        if (!this.agreeAgreement) {
          this.$toast({ message: '未勾选同意用户注册协议！', position: 'top' })
          return
        }


        let data = { username: this.username, password: this.password, repassword: this.repassword }
        register(data).then((response) => {
          console.log(`${JSON.stringify(response)}`)

          if (isSuccess(response.errorCode)) {
            this.setUserName(this.username)

            this.$toast.success('注册成功')
            let timer = setTimeout(() => {
              this.onLogin()
              clearTimeout(timer)
            }, 1500)
            return
          }
          this.$toast.fail(response.errorMsg)

        }).catch((exception) => {
          console.log(`register catch:${exception}}`)
          this.$toast.fail('登录出现异常状况！')
        })
      },
      onLogin() {
        console.log('登录')
        this.$router.go(-1)
      }


    }
  }
</script>

<style lang="scss" scoped>

  .login {
    background: url('../../../static/ic_login_bg.jpg') no-repeat;
    background-size: cover;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding-right: 55px;
    padding-left: 55px;


    .login_info {
      width: 100%;
      background-color: white;
      border-radius: 5px;
      margin: 30px 0px 0px 0px;

      > div {
        margin: 0 10px;
        height: 70px;
        display: flex;
        align-items: center;
      }

      .username {
        border-bottom: #e0e0e0 solid 0.5px;
      }


      span {
        white-space: nowrap;
        margin-left: 5px;
        font-size: 16px;
        color: #07c160;
        width: auto;
      }

      input {
        font-size: 16px;
        border: none;
        width: 100%;
        color: #07c160;
      }


      @include inputplaceholder('#999999')

    }

    .btn_login {
      width: 100%;
      margin-top: 50px;
      background-color: #07c160;
      border-radius: 5px;
      border: #07c160 solid 1px;

    }

    .other {
      height: 30px;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;

      > span {
        font-size: 10px;
        padding: 10px 0px;
        color: white;
      }

      .checked {
        font-size: 10px;
        color: #07c160;
      }

      .unchecked {
        font-size: 10px;
        color: white;
      }

    }
  }


</style>
