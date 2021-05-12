<template>
  <div class="artist-box">
    <div class="tool-head" v-if="!isPersonal">
      <div class="item play-item" @click="playAllSongs">
        <i class="iconfont niceOutlined_Play"></i> 播放全部
      </div>
      <div
        class="item"
        @click="collect()"
        :class="subscribed ? 'active' : ''"
        v-if="!isPerson"
      >
        <i class="iconfont niceicon-heart"></i>
        {{ collectText }}
      </div>
      <div class="item" v-if="!isPerson">
        <i class="iconfont nicefenxiang1"></i> 分享
      </div>
    </div>
    <table class="artist-table">
      <thead>
        <tr>
          <th class="th-index">序号</th>
          <th class="th-name">歌曲</th>
          <th class="th-artist">歌手</th>
          <th class="th-album">发行日期</th>
          <th class="th-duration">时长</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(item, index) of songs"
          :key="item.id + index"
          :class="currentSong.id == item.id && playing ? 'playing' : ''"
          @dblclick="playSong(index)"
        >
          <td>
            <div class="index-container flex-center">
              <span class="num">{{ utils.formatZero(index + 1, 2) }}</span>
              <div class="play-icon">
                <div class="line" style="animation-delay: -1.2s"></div>
                <div class="line"></div>
                <div class="line" style="animation-delay: -1.5s"></div>
                <div class="line" style="animation-delay: -0.9s"></div>
                <div class="line" style="animation-delay: -0.6s"></div>
              </div>
              <i
                class="iconfont nicebofang2 play-btn"
                @click="playSong( index)"
              ></i>
              <i
                class="iconfont nicezanting1 pause-btn"
                @click="pauseSong(item, index)"
              ></i>
            </div>
          </td>
          <td>
            <div class="name-container">
              <div class="avatar">
                <img :src="item.coverImgUrl + '?param=100y100'" />
              </div>
              <p class="name ellipsis" :title="item.name">
                {{ item.name }}
              </p>
            </div>
          </td>
          <td>
            <div class="artist-container">
              <p class="author ellipsis">
                <span v-if="item.artist">{{ item.artist.name }}</span>
                <span v-else>未知歌手</span>
              </p>
            </div>
          </td>
          <td>
            <div class="album-container">
              <p :title="item.album" class="ellipsis">
                <span>{{
                  utils.dateFormat(item.publishTime, "YYYY-MM-DD")
                }}</span>
              </p>
            </div>
          </td>
          <td>
            <div class="duration-container">
              <p>
                {{ utils.formatSecondTime(item.duration) }}
              </p>
              <div class="song-tools" v-if="!isPersonal" style="display:flex;align-items:center">
                <i
                  class="iconfont niceicon-heart"
                  title="喜欢"
                  @click="collectSong(item)"
                  :class="{ collected: item.isCollected }"
                ></i>
                <i class="el-icon-folder-add" @click="addToPlayList(item.id)"></i>
                <!-- <i
                  class="iconfont nicexiazai"
                  title="下载"
                  @click="downloadSong(item.id)"
                ></i> -->
              </div>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <el-dialog title="选择歌单" v-model="dialogTableVisible">
    <div>
      <el-checkbox v-for="(item,index) in playlist" :key="item+index" v-model="item.value" :label="item.name" border></el-checkbox>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogTableVisible = false">取 消</el-button>
        <el-button type="primary" @click="addSong()">确 定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts">
import { defineComponent, computed, onMounted, reactive, toRefs } from 'vue'
import utils from '@/utils/utils'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { playlistApi, userApi } from '@/api/index'

export default defineComponent({
  props: {
    songs: {
      type: Array
    },
    isPerson: {
      type: Boolean,
      default: false
    },
    isPersonal: {
      type: Boolean,
      default: false
    }
  },
  components: {},
  setup (props) {
    const state = reactive({
      subscribed: false,
      dialogTableVisible: false,
      playlist: [],
      sid: ''
    })
    const store = useStore()
    const router = useRouter()
    const currentSong = computed(() => store.getters.currentSong || { id: 24 })
    const playing = computed(() => store.getters.playing)
    const userInfo = computed(() => store.getters.userInfo)
    const loginStatu = computed(() => store.getters.loginStatu)
    const collectText = computed(() => state.subscribed ? '已收藏' : '收藏')
    // 获取歌单信息
    async function getInfo () {
      if (String(loginStatu.value) === 'false') {
        state.subscribed = false
        return
      }
      const { id } = router.currentRoute.value.query
      const collectIds = await getUserPlaylist(userInfo.value._id)
      state.subscribed = collectIds.indexOf(Number(id)) !== -1

      const collectSongIds = await getUserSong(userInfo.value._id)
      props.songs?.forEach((item:any) => { item.isCollected = collectSongIds.indexOf(item.id) !== -1 })
    }

    // 获取用户收藏的歌单id
    async function getUserPlaylist (id:string) {
      const res = await userApi.getUserPlaylist({ id })
      return res.data.map((item:any) => item.id)
    }
    // 获取用户收藏的歌曲id
    async function getUserSong (id:string) {
      const res = await userApi.getUserSong({ id })
      return res.data.map((item:any) => item.song.id)
    }
    // 播放歌曲
    function playSong (index:number) {
      store.dispatch('selectPlay', { list: props.songs, index })
    }
    // 停止播放歌曲
    function pauseSong () {
      store.dispatch('pausePlay')
    }
    // 播放全部
    function playAllSongs () {
      store.dispatch('selectPlay', { list: props.songs, index: 0 })
    }
    // 收藏或取消歌单
    async function collect () {
      if (String(loginStatu.value) === 'false') {
        ElMessage.warning({
          message: '请先登录！！！',
          type: 'warning'
        })
        return
      }
      const { id } = router.currentRoute.value.query

      if (!state.subscribed) {
        await userApi.collectPlaylist({ uid: userInfo.value.account, pid: id })
        state.subscribed = true
        ElMessage.success({
          message: '收藏成功!!!',
          type: 'success'
        })
      } else {
        await userApi.deletePlaylist({ uid: userInfo.value._id, pid: id })
        state.subscribed = false
        ElMessage.success({
          message: '取消收藏成功!!!',
          type: 'success'
        })
      }
    }
    // 收藏歌曲
    async function collectSong (item:any) {
      if (String(loginStatu.value) === 'false') {
        ElMessage.warning({
          message: '请先登录！！！',
          type: 'warning'
        })
        return
      }

      if (!item.isCollected) {
        await userApi.collectSong({ uid: userInfo.value.account, sid: item.id })
        item.isCollected = true
        ElMessage.success({
          message: '收藏成功!!!',
          type: 'success'
        })
      } else {
        await userApi.deleteSong({ uid: userInfo.value._id, sid: item.id })
        item.isCollected = false
        ElMessage.success({
          message: '已取消收藏!!!',
          type: 'success'
        })
      }
    }
    // 下载歌曲
    function downloadSong (id:string) {
      return id
    }

    async function addToPlayList (sid:string) {
      if (String(loginStatu.value) === 'false') {
        ElMessage.warning({
          message: '请先登录！！！',
          type: 'warning'
        })
        return
      }
      // 获取所创建的歌单列表
      const res = await playlistApi.getCreatePlaylist({ uid: userInfo.value._id })
      // eslint-disable-next-line no-return-assign
      res.data.forEach((item:any) => { item.value = false })
      state.playlist = res.data
      state.sid = sid
      state.dialogTableVisible = true
    }

    async function addSong () {
      const pids = state.playlist.filter((item:any) => item.value === true).map((item:any) => item._id).join(',')
      // 添加歌曲
      playlistApi.addSong({ pids, sid: state.sid })
      state.dialogTableVisible = false
      ElMessage.success({
        message: '已取消收藏!!!',
        type: 'success'
      })
    }

    onMounted(() => {
      if (String(loginStatu.value) === 'true' && !props.isPerson) getInfo()
    })

    return {
      ...toRefs(state),
      utils,
      playSong,
      userInfo,
      loginStatu,
      pauseSong,
      playAllSongs,
      collect,
      getUserPlaylist,
      getUserSong,
      collectText,
      store,
      currentSong,
      playing,
      router,
      getInfo,
      collectSong,
      downloadSong,
      addToPlayList,
      addSong
    }
  }
})
</script>

<style lang="scss" scoped>
$color-theme: #fa2800;
.artist-box >>> tbody img {
  border-radius: 5px;
}
.artist-box {
  width: 100%;
  .tool-head {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    margin: 15px 0;
    .item {
      background: #f2f2f2;
      color: #333333;
      padding: 7px 15px;
      border-radius: 50px;
      cursor: pointer;
      margin-left: 15px;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.4s;
      i {
        margin-right: 5px;
      }
      .nicefenxiang1 {
        font-size: 18px;
      }
      &.active {
        background: $color-theme;
        color: #fff;
      }
    }
    .play-item {
      background: $color-theme;
      color: #fff;
    }
  }
  .artist-table {
    width: 100%;
    thead {
      width: 100%;
      height: 50px;
      line-height: 50px;
      background: #fafafa;
      color: #999;
      th {
        padding: 0 9px;
        text-align: left;
        font-weight: 300;
        white-space: nowrap;
        overflow: hidden;
        -o-text-overflow: ellipsis;
        text-overflow: ellipsis;
        &.th-index {
          width: 10%;
          text-align: center;
        }
        &.th-name {
          width: 40%;
        }
        &.th-artist {
          width: 25%;
        }
        &.th-album {
          width: 15%;
        }
        &.th-duration {
          width: 15%;
          text-align: right;
          padding-right: 80px;
        }
      }
    }
    tbody {
      width: 100%;
      tr {
        height: 50px;
        line-height: 50px;
        transition: background-color 0.2s linear;
        td {
          padding: 0 9px;
          white-space: nowrap;
          overflow: hidden;
          -o-text-overflow: ellipsis;
          text-overflow: ellipsis;
        }
        .index-container {
          .num {
            color: #4a4a4a;
            font-weight: 500;
          }
          .play-icon {
            display: none;
            height: 16px;
            min-width: 18px;
            overflow: hidden;
            .line {
              width: 2px;
              height: 100%;
              margin-left: 2px;
              background-color: #ff410f;
              animation: play 0.9s linear infinite alternate;
            }
          }
          .play-btn {
            color: $color-theme;
            font-size: 28px;
            display: none;
            text-align: left;
            cursor: pointer;
          }
          .pause-btn {
            color: $color-theme;
            font-size: 30px;
            display: none;
            text-align: left;
            cursor: pointer;
          }
        }
        .name-container {
          display: flex;
          align-items: center;
          .avatar {
            width: 35px;
            height: 35px;
            border-radius: 5px;
            flex-shrink: 0;
            margin-right: 10px;
            display: flex;
            justify-content: center;
            align-items: center;
            img {
              display: inline-block;
              width: 100%;
              height: 100%;
              object-fit: cover;
              border-radius: 5px;
            }
          }
        }
        // .artist-container {
        //   .author {
        //   }
        // }
        .duration-container {
          text-align: right;
          padding-right: 60px;
          position: relative;
          p {
            padding-right: 10px;
          }
          .song-tools {
            display: flex;
            justify-content: flex-end;
            top: 50%;
            margin-top: -25px;
            right: 10px;
            position: absolute;
            .collected {
              color: $color-theme;
            }
            i {
              flex-shrink: 0;
              cursor: pointer;
              // margin-right: 15px;
              font-size: 20px;
            }
          }
        }
        &:nth-child(2n) {
          background: #f7f7f7;
        }
        &.playing {
          p {
            color: $color-theme;
          }
          i {
            color: $color-theme;
          }
          .index-container {
            .num {
              display: none;
            }
            .play-icon {
              display: flex;
            }
            .play-btn {
              display: none;
            }
          }
        }
        &:hover {
          background: #e8e9ed;
          .index-container {
            .num {
              display: none;
            }
            .play-btn {
              display: block;
            }
          }
          &.playing {
            .index-container {
              .play-btn {
                display: none;
              }
              .play-icon {
                display: none;
              }
              .pause-btn {
                display: block;
              }
            }
          }
        }
      }
      p {
        cursor: pointer;
      }
    }
  }
}
</style>
