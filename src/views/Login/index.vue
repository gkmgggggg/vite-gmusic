<template>
  <div class="main">
    <div class="container">
      <div class="form_login">
        <div class="left-part">
          <div class="content">
            <h2>注 册</h2>
            <input
              type="text"
              name="username"
              placeholder="请输入用户名(仅支持手机号注册)"
              v-model="phone"
              @keyup="phone = phone.replace(/\s+/g, '')"
            />
            <input
              type="password"
              name="password"
              placeholder="请输入密码(密码不得小于6位)"
              v-model="password"
              @keyup="password = password.replace(/\s+/g, '')"
            />
            <button type="submit" @click="handleRegister">注册</button>
          </div>
          <div class="content">
            <h2>登 录</h2>
            <input
              type="text"
              name="username"
              placeholder="请输入用户名(手机号)"
              v-model="phone"
              @keyup="phone = phone.replace(/\s+/g, '')"
            />
            <input
              type="password"
              name="password"
              placeholder="请输入密码"
              v-model="password"
              @keyup="password = password.replace(/\s+/g, '')"
            />
            <button type="submit" @click="handleLogin">登录</button>
          </div>
        </div>
        <div class="right-part">
          <div class="right-content">
            <h2>没有账号嘛？？?</h2>
            <p>快来加入我们吧</p>
            <button id="reg_r" @click="btnClick">注册</button>
          </div>
          <div class="right-content2">
            <h2>已经有账号</h2>
            <p>赶紧来登录</p>
            <button id="log_l" @click="btnClick">登录</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue'
import { ElMessage } from 'element-plus'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

export default defineComponent({
  setup () {
    const state = reactive({
      phone: '',
      password: '',
      loginLoading: false
    })
    const store = useStore()
    const router = useRouter()
    // 动画交互
    function btnClick (event:any) {
      const d1 = event.target.parentNode.parentNode
      const d = d1.children
      const l:any = document.getElementsByClassName('content')

      if (event.target.innerHTML === '注册') {
        for (const i of d) {
          i.style.bottom = '500px'
        }
        for (const j of l) j.style.bottom = '0px'
      } else {
        for (const i of d) {
          i.style.bottom = '0px'
        }
        for (const j of l) j.style.bottom = '450px'
      }
    }
    // 处理登录
    async function handleLogin () {
      // if (verification()) {
      //   const res = await ctx.$api.login(state.phone, state.password)
      //   console.log(res)
      //   if (res.code == 200) {
      //     ElMessage.success({
      //       message: '登录成功!!!',
      //       type: 'success'
      //     })
      //     // ctx.$message.success("登录成功!!!");
      //     window.localStorage.setItem('userInfo', JSON.stringify(res.res))
      //     window.localStorage.setItem('loginStatu', true)
      //     window.localStorage.setItem('Authorization', res.Authorization)
      //     store.commit('SET_LOGINSTATU', true)
      //     setTimeout(() => {
      //       state.loginLoading = false
      //       router.push({ path: '/' })
      //     }, 1500)
      //   } else {
      //     ElMessage.warning({
      //       message: '登录失败!!!',
      //       type: 'warning'
      //     })
      //     // ctx.$message.warning("登录失败!!!");
      //   }
      // }
    }
    // 处理注册
    async function handleRegister () {
      // if (verification()) {
      //   const res = await ctx.$api.register(state.phone, state.password)
      //   if (res.code == 200) {
      //     ElMessage.success({
      //       message: '注册成功!!!',
      //       type: 'success'
      //     })
      //     // ctx.$message.success("注册成功!!!");
      //     // 执行登录
      //     handleLogin()
      //   } else {
      //     ElMessage.warning({
      //       message: res.msg,
      //       type: 'warning'
      //     })
      //     // ctx.$message.warning(res.msg);
      //   }
      // }
    }
    // 登录数据验证
    function verification () {
      const myreg = /^[1][3,4,5,7,8,9][0-9]{9}$/
      if (!myreg.test(state.phone)) {
        ElMessage.warning({
          message: '请输入正确的手机号',
          type: 'warning'
        })
        // ctx.$message.warning("请输入正确的手机号");
        return false
      }
      if (state.password.length < 6) {
        ElMessage.warning({
          message: '密码不得小于6位',
          type: 'warning'
        })
        // ctx.$message.warning("密码不得小于6位");
        return false
      }
      return true
    }
    return {
      ...toRefs(state),
      router,
      store,
      btnClick,
      handleLogin,
      handleRegister,
      verification
    }
  }
})
</script>

<style lang="scss" scoped>
.main {
  background: url("../../assets/images/loginBg.jpg");
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  height: 100vh;
  box-sizing: border-box;
  .container {
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    .form_login {
      width: 800px;
      height: 500px;
      border: 1px solid white;
      border-radius: 20px;
      display: flex;
      overflow: hidden;

      .left-part {
        width: 400px;
        background: white;
        div {
          display: flex;
          flex-direction: column;
          flex-wrap: wrap;
          align-items: center;
          padding-top: 100px;
          position: relative;
          transition: 0.6s;
          bottom: 450px;
        }
        h2 {
          font-size: 40px;
        }
        input {
          border: none;
          width: 300px;
          border-bottom: 1px solid red;
          margin: 30px 20px;
          height: 40px;
        }
        button {
          color: white;
          width: 100px;
          padding: 10px;
          margin: 0 auto;
          font-size: 20px;
          background: rgba($color: #c44569, $alpha: 1);
          border: 1px solid white;
          border-radius: 30px;
          cursor: pointer;
          transition: 0.6s;
          &:focus {
            outline: none;
          }
          &:hover {
            background: rgba($color: #fd79a8, $alpha: 1);
            border: 1px solid #c44569;
          }
        }
      }

      .right-part {
        background-image: linear-gradient(#fd79a8, #fab1a0);
        flex: 1;
        text-align: center;
        color: white;
        div {
          bottom: 0px;
          height: 500px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          position: relative;
          transition: 0.6s;
        }
        h2 {
          font-size: 30px;
          margin-bottom: 10px;
        }
        p {
          font-size: 20px;
          margin-bottom: 10px;
        }
        button {
          color: white;
          width: 100px;
          padding: 10px;
          margin: 0 auto;
          font-size: 20px;
          background: rgba($color: #c44569, $alpha: 0);
          border: 1px solid white;
          border-radius: 30px;
          cursor: pointer;
          transition: 0.6s;
          &:focus {
            outline: none;
          }
          &:hover {
            background: rgba($color: #c44569, $alpha: 1);
            border: 1px solid #c44569;
          }
        }
      }
    }
  }
}
</style>
