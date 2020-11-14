<template>
  <div class="login">

    <div class="avatar">
      <van-image
        round
        fit="cover"
        width="30vw"
        height="30vw"
        src="https://img.yzcdn.cn/vant/cat.jpeg"
      />
    </div>

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
      <span @click="onLogin" class="ripple">去登录</span>
    </div>


  </div>
</template>

<script>
  import { register } from '@/api/user'

  export default {
    name: 'login',
    data() {
      return {
        username: '',
        password: '',
        repassword: '',
        type: 'password',
        pass: '密&#12288;码：'
      }
    },
    methods: {

      onDelete() {
        this.username = ''
      },

      onRegister() {
        console.log('注册')
        let data = { username: this.username, password: this.password, repassword: this.repassword }
        register(data).then((response) => {
          console.log(`register then:${response}`)
        }).catch((exception) => {
          console.log(`register catch:${exception}}`)
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


      input::-webkit-input-placeholder, textarea::-webkit-input-placeholder {
        color: #999999;
        font-size: 14px;
      }

      input:-moz-placeholder, textarea:-moz-placeholder {
        color: #999999;
        font-size: 14px;
      }

      input::-moz-placeholder, textarea::-moz-placeholder {
        color: #999999;
        font-size: 14px;
      }

      input:-ms-input-placeholder, textarea:-ms-input-placeholder {
        color: #999999;
        font-size: 14px;
      }


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
      justify-content: flex-end;

      > span {
        font-size: 10px;
        padding: 10px 0px;
        color: white;
      }

    }
  }


</style>
