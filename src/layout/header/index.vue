<template>
  <div class="header shadow">
    <div class="container flex-row">
      <div class="logo">
        <router-link :to="{ name: 'home' }" tag="a"></router-link>
      </div>
      <ul class="nav flex-row">
        <li>
          <router-link :to="{ name: 'home' }" tag="a">发现音乐</router-link>
        </li>
        <li>
          <router-link :to="{ name: 'rank' }" tag="a">排行榜</router-link>
        </li>
        <li>
          <router-link :to="{ name: 'playlist' }" tag="a">歌单</router-link>
        </li>
        <li>
          <router-link :to="{ name: 'singer' }" tag="a">歌手</router-link>
        </li>
      </ul>
      <div class="search" @click="openSearchPop">
        <i class="iconfont nicesearch-o"></i>
      </div>
      <div class="userbox">
        <div class="line"></div>
        <div class="is-login flex-row" v-if="userInfo">
          <el-avatar
            :size="35"
            class="avatar"
            :src="userInfo.avatarUrl"
            @click="(e) => e.preventDefault()"
          >
          </el-avatar>
          <el-dropdown>
            <span class="el-dropdown-link">
              {{ userInfo.nickname }}<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item @click="toUserDetail">个人主页</el-dropdown-item>
                <el-dropdown-item>账户设置</el-dropdown-item>
                <el-dropdown-item @click="handelLogout">退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>

          <!-- <el-dropdown :trigger="['click']">
            <span class="el-dropdown-link" @click="(e) => e.preventDefault()">
              {{ userInfo.nickname }}
              <DownOutlined />
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <template v-slot:overlay>
              <el-dropdown-menu>
                <el-dropdown-item key="0">
                  <a href="#" @click="toUserDetail">个人主页</a>
                </el-dropdown-item>
                <el-dropdown-item key="1">
                  <a href="">账户设置</a>
                </el-dropdown-item>
                <el-dropdown-item key="3" @click="handelLogout">退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown> -->
        </div>
        <div class="no-login flex-row" @click="toLogin" v-else>登录</div>
      </div>
      <div class="search-wrap" :class="[searchOpenClass, searchCloseClass]">
        <div class="overlay" @click="closeSearchPop"></div>
        <div class="search-body">
          <div class="search-content">
            <div class="search-popup-cover">
              <div class="bg-effect">
                <span class="layer"></span>
              </div>
              <div class="search-form">
                <input
                  class="text"
                  type="text"
                  v-model="keyword"
                  placeholder="请输入搜索关键词并按回车键…"
                  v-on:keyup.enter="search"
                />
              </div>
            </div>
            <div class="search-hot" v-show="searchHistory.length > 0">
              <div class="title flex-row">
                <i class="iconfont nicelishi"></i>
                <span>历史搜索</span>
                <p @click="clearSearch">清空</p>
              </div>
              <ul class="tags">
                <li v-for="item of searchHistory" :key="item">
                  <a class="btn flex-row" @click="tag(item)"
                    >{{ item }}
                    <span
                      class="close-dark"
                      @click.stop="deleteItem(item)"
                    ></span
                  ></a>
                </li>
              </ul>
            </div>
          </div>
          <div class="btn-close flex-center" @click="closeSearchPop">
            <span class="close-light"></span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  onMounted,
  onUpdated,
  reactive,
  toRefs,
  computed
} from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
// import { DownOutlined, UserOutlined } from '@ant-design/icons-vue'
import { ElMessage } from 'element-plus'

export default defineComponent({
  setup () {
    const state = reactive({
      keyword: '',
      hots: [],
      historys: [],
      searchOpenClass: '',
      searchCloseClass: ''
    })
    const store = useStore()
    const router = useRouter()
    const userInfo = computed(() => store.getters.userInfo)
    const loginStatu = computed(() => store.getters.loginStatu)
    const searchHistory = computed(() => store.getters.searchHistory)
    // 展开搜索框
    function openSearchPop () {
      state.searchOpenClass = 'open'
      state.searchCloseClass = ''
    }
    // 关闭搜索框
    function closeSearchPop () {
      state.searchOpenClass = ''
      state.searchCloseClass = 'close'
    }
    // 搜索
    function search () {
      if (state.keyword.split(' ').join('').length !== 0) {
        closeSearchPop()
        store.dispatch('saveSearchHistory', state.keyword)
        router.push({
          name: 'search',
          query: {
            keyword: state.keyword
          }
        })
        state.keyword = ''
      }
    }
    // 点击标签搜索
    function tag (keyword:string) {
      store.dispatch('saveSearchHistory', keyword)
      closeSearchPop()
      router.push({
        name: 'search',
        query: {
          keyword
        }
      })
    }
    // 删除历史搜索单个
    function deleteItem (item:any) {
      store.dispatch('deleteSearchHistory', item)
    }
    // 清空搜索历史
    function clearSearch () {
      store.dispatch('clearSearchHistory')
    }
    // 获取热搜列表
    async function getSearchHot () {
      try {
        // const res = await ctx.$api.getSearchHot()
        // if (res.code === 200) {
        //   state.hots = res.result.hots
        // }
      } catch (error) {
        console.log(error)
      }
    }
    // 登录
    function toLogin () {
      router.push({
        name: 'login'
      })
    }
    function handleCommand (command:string) {
      if (command === 'personal') {
        // router.push({
        //   name: 'personal'
        // })
      }
    }
    // 访问个人空间
    function toUserDetail () {
      router.push(`/personal?id=${userInfo.value._id}`)
    }
    // 账户登出f
    function handelLogout () {
      ElMessage.success({
        message: '登出成功!!!',
        type: 'success'
      })
      window.localStorage.removeItem('userInfo')
      window.localStorage.removeItem('token')
      window.localStorage.removeItem('Authorization')
      window.localStorage.setItem('loginStatu', '0')
      store.commit('SET_LOGINSTATU', false)

      setTimeout(() => {
        window.location.reload()
      }, 500)
    }
    onMounted(() => {})
    onUpdated(() => {})

    return {
      ...toRefs(state),
      store,
      router,
      openSearchPop,
      closeSearchPop,
      search,
      tag,
      deleteItem,
      clearSearch,
      getSearchHot,
      toLogin,
      handleCommand,
      userInfo,
      loginStatu,
      searchHistory,
      toUserDetail,
      handelLogout
    }
  }
})
</script>

<style lang="scss" scoped>
$color-theme: #fa2800;
.header {
  width: 100%;
  height: 70px;
  transition: all 400ms ease-in-out;
  background-color: #fff;
  box-shadow: 0px 5px 3px #888888;
  z-index: 1000;
  .container {
    width: 1400px;
    height: 100%;
    margin: auto;
    display: flex;
    .logo {
      width: 146px;
      display: flex;
      align-items: center;
      margin-right: 30px;

      a {
        width: 100%;
        display: block;
        height: 70px;
        background-position: 0px center;
        background-repeat: no-repeat;
        background-size: 146px 26px;
        background-image: url("../../assets/images/logo_black.png");
      }

      img {
        width: 130px;
      }
    }

    .nav {
      flex: 1;
      height: 100%;
      display: flex;
      align-items: center;
      li {
        color: black;
        font-size: 14px;
        height: 100%;
        padding: 0 15px;
        display: flex;
        align-items: center;
        a {
          color: black;
          position: relative;
          transition: all 0.4s;
          &:hover {
            color: $color-theme;
          }
          // &.router-link-active {
          //   // color: $color-theme;
          //   color: #666;

          //   &::after {
          //     content: "";
          //     position: absolute;
          //     background: $color-theme;
          //     left: 0;
          //     right: 0;
          //     bottom: -12px;
          //     width: 4px;
          //     height: 4px;
          //     border-radius: 50%;
          //     margin: 0 auto;
          //     opacity: 1;
          //   }
          // }
        }
      }
    }

    .search {
      height: 100%;
      display: flex;
      align-items: center;

      i {
        font-size: 22px;
        color: #161e27;
        padding: 0 15px;
        cursor: pointer;
      }
    }

    .userbox {
      display: flex;
      align-items: center;
      position: relative;
      padding-left: 20px;

      .line {
        width: 1px;
        height: 22px;
        background: #e1e1e1;
        position: absolute;
        left: 0;
        top: 50%;
        margin-top: -11px;
      }
      .is-login {
        cursor: pointer;
      }
      .no-login {
        font-size: 14px;
        cursor: pointer;

        &:hover {
          color: $color-theme;
        }
      }

      .avatar {
        margin-right: 15px;
      }
    }

    .search-wrap {
      position: fixed;
      display: flex;
      align-items: center;
      justify-content: center;
      pointer-events: none;
      width: 100%;
      height: 100vh;
      top: 0;
      left: 0;

      .overlay {
        width: 100%;
        height: 100vh;
        top: 0;
        left: 0;
        position: absolute;
        background: rgba(120, 129, 147, 0.22);
        opacity: 0;
        -webkit-transition: opacity 0.3s;
        transition: opacity 0.3s;
        -webkit-backface-visibility: hidden;
        -webkit-transition-duration: 0.3s;
        transition-duration: 0.3s;
      }

      .search-body {
        position: relative;
        opacity: 0;
        width: 100%;
        max-width: 790px;
        animation-duration: 0.3s;
        animation-fill-mode: forwards;

        .search-content {
          background: #fff;
          position: relative;
          border-radius: 4px;
          box-shadow: 0 10px 50px -5px rgba(6, 39, 67, 0.12);
          padding: 0;
          border: 0;
          width: 100%;
          height: auto;
          overflow: hidden;

          .search-popup-cover {
            position: relative;
            overflow: hidden;
            padding: 3rem;

            .bg-effect {
              background-image: url("../../assets/images/personal.jpg");
              background-size: cover;
              background-repeat: no-repeat;
              background-position: center;
              position: absolute;
              top: 0;
              left: 0;
              right: 0;
              bottom: 0;
              filter: blur(8px);
              transform: scale(1.05);
              background-position: center;

              .layer {
                width: 100%;
                height: 100%;
                background-color: rgba(0, 0, 0, 0.3);
                position: absolute;
                opacity: 1;
                top: 0;
                left: 0;
                transition: opacity 0.3s ease-in-out;
              }
            }

            .search-form {
              position: relative;
              padding: 3rem 0;

              .text {
                display: block;
                width: 100%;
                background-clip: padding-box;
                transition: border-color 0.15s ease-in-out,
                  box-shadow 0.15s ease-in-out;
                font-size: 0.9375rem;
                line-height: 1.5;
                padding: 0.625rem 0.75rem;
                height: calc(1.5em + 1.71875rem + 2px);
                text-align: center;
                font-weight: normal;
                color: #fff;
                border-color: transparent;
                background-color: rgba(255, 255, 255, 0.03);
                transition: all 0.3s ease;
                border-radius: 5px;

                &:hover {
                  background-color: rgba(255, 255, 255, 0.04);
                  border-color: transparent;
                }

                &:focus {
                  background-color: rgba(255, 255, 255, 0.04);
                  border-color: transparent;
                  color: #fff;
                }

                &::placeholder {
                  color: #fff;
                  opacity: 1;
                }
              }
            }
          }

          .search-hot {
            padding: 1.5rem 3rem;

            .title {
              margin-bottom: 15px;

              i {
                color: $color-theme;
                font-size: 1.625rem;
                margin-right: 8px;
              }

              .nicelishi {
                font-size: 1.425rem;
              }

              span {
                font-size: 15px;
                flex: 1;
              }

              p {
                color: $color-theme;
                cursor: pointer;
              }
            }

            .tags {
              width: 100%;
              margin: 0 -0.25rem;
              display: flex;
              flex-wrap: wrap;
              align-items: center;

              li {
                padding: 0.25rem;
                cursor: pointer;

                .btn {
                  display: flex;
                  font-weight: 400;
                  color: #6d7685;
                  background-color: #f4f4f5;
                  text-align: center;
                  vertical-align: middle;
                  user-select: none;
                  border: 1px solid transparent;
                  font-size: 0.75rem;
                  padding: 0.3125rem 0.75rem;
                  line-height: 1.5;
                  border-radius: 0.25rem;
                  transition: color 0.15s ease-in-out,
                    background-color 0.15s ease-in-out,
                    border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
                  border-radius: 4px;

                  .close-dark {
                    display: inline-block;
                    background-image: url("../../assets/images/close-dark.svg");
                    background-size: contain;
                    background-position: center;
                    background-repeat: no-repeat;
                    vertical-align: middle;
                    width: 14px;
                    height: 14px;
                    margin-left: 8px;
                    opacity: 0.7;
                  }

                  &:hover {
                    color: #161e27;

                    .close-dark {
                      opacity: 1;
                    }
                  }
                }
              }
            }
          }
        }

        .btn-close {
          position: absolute;
          bottom: -50px;
          left: 0;
          width: 100%;
          z-index: 99;
          cursor: pointer;
          text-align: center;

          .close-light {
            display: inline-block;
            background-image: url("../../assets/images/close.svg");
            background-size: contain;
            background-position: center;
            background-repeat: no-repeat;
            vertical-align: middle;
            width: 28px;
            height: 28px;
          }
        }
      }

      &.open {
        z-index: 1031;

        .overlay {
          opacity: 1;
          pointer-events: auto;
          -webkit-backdrop-filter: blur(10px);
          backdrop-filter: blur(10px);
        }

        .search-body {
          pointer-events: auto;
          -webkit-animation-name: tips-open;
          animation-name: tips-open;
        }
      }

      &.close {
        .search-body {
          -webkit-animation-name: tips-close;
          animation-name: tips-close;
        }
      }

      @keyframes tips-open {
        0% {
          opacity: 0;
          -webkit-transform: translate3d(0, 50px, 0);
          transform: translate3d(0, 50px, 0);
        }

        100% {
          opacity: 1;
          -webkit-transform: translate3d(0, 0, 0);
          transform: translate3d(0, 0, 0);
        }
      }

      @keyframes tips-close {
        0% {
          opacity: 1;
          -webkit-transform: translate3d(0, 0, 0);
          transform: translate3d(0, 0, 0);
        }

        100% {
          opacity: 0;
          -webkit-transform: translate3d(0, 50px, 0);
          transform: translate3d(0, 50px, 0);
        }
      }
    }
  }
}
</style>
