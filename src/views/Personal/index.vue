<template>
  <div class="personal-wrap">
    <div class="banner layer"></div>
    <div class="personal-main container">
      <div class="left">
        <div class="user-box shadow">
          <div class="background layer"></div>
          <div class="card flex-row">
            <div class="avatar">
              <img :src="userProfile.avatarUrl" />
            </div>
            <div class="info flex-between">
              <p class="name">{{ userProfile.nickname }}</p>
              <div v-if="userInfo._id === userProfile.userId">
                <button class="sign-btn sign-btn-active" v-if="!true">
                  签到
                </button>
                <button class="sign-btn" v-else>已签到</button>
              </div>
            </div>
          </div>
          <p class="desc">用户自我介绍</p>
          <div class="profile">
            <div class="tag">
              等级：{{ userProfile.level }}
              <i
                class="iconfont lv-icon"
                :class="'nicelevel-' + userInfo.level"
              ></i>
            </div>
            <div class="tag">
              地区：
              <span>{{ provinceName }} - {{ cityName }}</span>
            </div>
          </div>
          <ul class="follow">
            <li>
              动态<span>{{ userProfile.eventCount }}</span>
            </li>
            <li>
              关注<span>{{ userProfile.newFollows }}</span>
            </li>
            <li>
              粉丝<span>{{ userProfile.followeds }}</span>
            </li>
          </ul>
          <div
            class="foot flex-center"
            v-if="userInfo.userId === userProfile.userId"
          >
            <router-link tag="a" to="/">个人设置</router-link>
            <router-link tag="a" to="/">我的等级</router-link>
          </div>
        </div>
      </div>
      <div class="center shadow">
        <div class="card-header flex-between">
          <p class="flex-row">共 <span>X首）</span></p>
          <div class="tab flex-row">
            <span :class="type == 1 ? 'active' : ''" @click="changeType(1)"
              >最近一周</span
            >
            <span class="line"></span>
            <span :class="type == 0 ? 'active' : ''" @click="changeType(0)"
              >所有时间</span
            >
          </div>
        </div>
        <ArtistList
          v-if="songs.length > 0"
          :songs="songs"
          :isPerson="true"
          :isPersonal="true"
        />
        <Empty v-else emptyText="ta可能不想让我们看到" />
      </div>
      <div class="right">
        <!-- <div class="my module shadow">
          <div class="card-header flex-row">
            <span>我创建的歌单</span>
          </div>
          <song-sheet :sheetList="myList" :num="num"></song-sheet>
        </div> -->
        <div class="my collect module shadow">
          <div class="card-header flex-row">
            <span>我收藏的歌单</span>
          </div>
          <SongSheet :sheetList="collectList" :num="num" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, onUpdated, reactive, toRefs, computed } from 'vue'
import ArtistList from '@/components/ArtistList/index.vue'
import SongSheet from '@/components/SongSheet/index.vue'
import Empty from '@/components/Empty/index.vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { userApi } from '@/api/index'

export default defineComponent({
  components: {
    ArtistList,
    SongSheet,
    Empty
  },
  mounted () {
    const userid = this.$route.query.id
    if (userid) {
      this.getUserInfo(String(userid))
      this.getUserPlaylist(String(userid))
      this.getUserSong(String(userid))
    } else this.$router.push('/404')
  },
  setup () {
    const state = reactive({
      provinceName: '',
      cityName: '',
      collectList: [],
      songs: [],
      num: 2,
      type: 1,
      userProfile: {}
    })
    const userInfo = computed(() => store.getters.userInfo)
    // 登录用户信息
    const store = useStore()
    const router = useRouter()
    const loginStatu = computed(() => store.getters.loginStatu)

    // 获取当前页用户信息
    async function getUserInfo (id:string) {
      const res = await userApi.getUserInfo({ id })
      if (res.status) {
        state.userProfile = res.data
      } else router.push('/404')
    }
    // 获取用户收藏的歌单
    async function getUserPlaylist (id:string) {
      const res = await userApi.getUserPlaylist({ id })
      state.collectList = res.data
    }
    // 获取用户收藏的歌曲
    async function getUserSong (id:string) {
      const res = await userApi.getUserSong({ id })
      for (const item of res.data) {
        item.duration = parseFloat(item.duration / 1000)
      }
      state.songs = res.data
    }
    onMounted(() => {
      // if (loginStatu.value) {
      //   getUserPlaylist(userInfo.value.account)
      //   getUserSong(userInfo.value.account)
      // }
    })
    onUpdated(() => {})
    return {
      ...toRefs(state),
      loginStatu,
      userInfo,
      getUserInfo,
      getUserPlaylist,
      getUserSong
    }
  }
})
</script>

<style lang="scss" scoped>
$color-theme: #fa2800;
.personal-wrap {
  margin-top: -20px;

  .banner {
    width: 100%;
    height: 350px;
    background: url("../../assets/images/personal.jpg");
    background-position: center;
    background-size: cover;
    background-attachment: fixed;
  }

  .personal-main {
    display: flex;
    align-items: flex-start;

    .left {
      width: 350px;
      position: relative;
      top: -60px;
      margin-right: 20px;

      .user-box {
        background: #fff;
        border-radius: 5px;
        padding-bottom: 30px;

        .background {
          width: 100%;
          height: 140px;
          position: relative;
          border-radius: 5px 5px 0 0;
          background: url("../../assets/images/personal.jpg");
          background-size: cover;

          &::before {
            border-radius: 5px 5px 0 0;
          }
        }

        .card {
          margin-top: -20px;
          padding: 0 15px 0 30px;
          width: 100%;

          .avatar {
            width: 64px;
            height: 64px;
            flex-shrink: 0;
            z-index: 2;
            position: relative;

            img {
              width: 64px;
              height: 64px;
              border-radius: 3px;
            }
          }

          .info {
            width: 100%;
            padding-top: 20px;
            margin-left: 15px;

            .name {
              font-weight: 600;
              font-size: 16px;
            }

            .sign-btn {
              padding: 3px 15px;
              font-size: 12px;
              color: #fff;
              border-radius: 30px;

              &.sign-btn-active {
                background: #fa2800;
                cursor: pointer;
                border: 1px solid #fa2800;
              }
            }
          }
        }

        .desc {
          padding: 0 40px;
          font-size: 13px;
          margin-top: 10px;
          color: #666;
        }

        .profile {
          padding: 0 40px;
          margin-top: 10px;

          .tag {
            position: relative;
            font-size: 13px;
            padding-left: 15px;
            display: flex;
            align-items: center;
            margin-bottom: 5px;

            .lv-icon {
              font-size: 22px;
              position: relative;
              top: 1px;
            }

            .sex-icon {
              font-size: 14px;
              margin-left: 5px;
              font-weight: bold;

              &.men {
                color: #4192eb;
              }

              &.women {
                color: #f4606c;
              }
            }

            .area-icon {
              font-size: 12px;
              margin-right: 5px;
            }

            span {
              font-size: 13px;
            }

            &::before {
              content: "";
              width: 6px;
              height: 6px;
              border-radius: 50%;
              background: $color-theme;
              position: absolute;
              top: 50%;
              left: 0px;
              margin-top: -3px;
            }
          }
        }

        .follow {
          list-style: none;
          display: flex;
          margin: 0 30px;
          margin-top: 15px;
          padding-top: 15px;
          border-top: 1px solid #f9f9ff;

          li {
            width: 33%;
            text-align: center;
            font-size: 14px;
            color: #958ebb;

            span {
              display: block;
            }
          }
        }

        .foot {
          width: 100%;
          padding: 0 30px;
          margin-top: 30px;

          a {
            display: block;
            width: 50%;
            text-align: center;
            margin: 0 3% 10px 3%;
            padding: 10px 0;
            background: #ff416c;
            background: linear-gradient(to right, #ff4b2b, #ff416c);
            color: #fff;
            border-radius: 5px;
            font-size: 14px;
          }
        }
      }
    }

    .center {
      width: 640px;
      background: #fff;
      position: relative;
      margin-top: 40px;
      margin-right: 20px;
      border-radius: 5px;
      padding: 15px;

      .card-header {
        border-left: 3px solid $color-theme;
        height: 20px;
        padding-left: 1rem;
        margin-bottom: 15px;
        font-weight: bold;

        span {
          font-weight: 100;
          color: #666666;
          font-size: 12px;
        }

        .tab {
          span {
            font-size: 12px;
            cursor: pointer;

            &.active {
              color: $color-theme;
            }
          }

          .line {
            width: 1px;
            height: 13px;
            background: #999;
            display: block;
            margin: 0 10px;
          }
        }
      }
    }

    .right {
      width: 350px;
      flex-shrink: 0;
      border-radius: 5px;
      background: #fff;
      position: relative;
      padding-bottom: 30px;
      margin-top: 40px;

      .card-header {
        border-left: 3px solid $color-theme;
        height: 20px;
        padding-left: 1rem;
        margin-bottom: 15px;
        font-weight: bold;

        .icon-like {
          font-size: 20px;
        }
      }

      .module {
        padding: 15px;
        width: 100%;
        border-radius: 8px;
        margin-bottom: 20px;
      }

      .my {
        padding-bottom: 5px;

        ul {
          display: flex;
          flex-wrap: wrap;
          margin: 0 -5px;

          li {
            flex: 0 0 14.285714285714%;
            max-width: 14.285714285714%;
            padding: 0 5px 10px;

            .avatar {
              width: 100%;
              border-radius: 3px;

              img {
                width: 100%;
                border-radius: 3px;
              }
            }
          }
        }
      }
    }
  }
}
</style>
