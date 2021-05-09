<template>
  <transition name="fade">
    <div class="player-bar shadow flex-row" v-show="playList.length > 0">
      <!-- <div class="player-bar shadow flex-row" v-show="true"> -->
      <div class="avatar">
        <img :src="currentSong.coverImgUrl" alt="nicemusic" />
      </div>
      <div class="info">
        <h2 class="ellipsis">{{ currentSong.name }}</h2>
        <p class="ellipsis" v-if="currentSong.artist">
          {{ currentSong.artist.name }}
        </p>
        <p class="ellipsis" v-else>未知歌手</p>
      </div>
      <div class="player-btn">
        <i class="iconfont icon-prev niceshangyishou" @click="prevSong"></i>
        <i
          class="iconfont icon-play nicebofang2"
          :class="playIcon"
          @click="togglePlaying"
        ></i>
        <i class="iconfont icon-next nicexiayishou" @click="nextSong"></i>
      </div>
      <div class="progress-wrap" id="progress-wrap">
        <p class="current-time">{{ utils.formatSecondTime(currentTime) }}</p>
        <progress-bar
          :percent="percent"
          @percentchange="onPercentBarChange"
        ></progress-bar>
        <p class="duration-time">
          {{ utils.formatSecondTime(currentSong.duration) }}
        </p>
      </div>
      <div class="volume-wrap">
        <i
          class="iconfont volume-icon"
          @click="changeMuted"
          :class="mutedIcon"
        ></i>
        <div class="progress-bar">
          <el-slider
            v-model="volumeNum"
            @input="changeVolume">
          </el-slider>
          <!-- <a-slider
           :value="volumeNum"
            style="width: 100%"
            size="small"
            class="bar-inner"
            :tooltip-visible="false"
            @change="changeVolume"
          ></a-slider> -->
        </div>
      </div>
      <div class="tool">
        <i class="iconfont" :class="modeIcon" @click="changeMode"></i>
        <i class="iconfont nicegeci32" @click="openLyric"></i>
        <i class="iconfont nicebofangliebiao24" @click="openPlaylist"></i>
      </div>
      <audio
        ref="audio"
        :src="currentSong.url"
        @playing="audioReady"
        @error="audioError"
        @timeupdate="updateTime"
        @ended="audioEnd"
        @pause="audioPaused"
        :muted="isMuted"
      ></audio>
      <transition name="fade">
        <div class="lyric-box shadow" v-if="showLyric">
          <div class="title flex-between">歌词</div>
          <div class="lyric-wrapper">
            <div v-if="currentLyric">
              <p
                ref="lyricLine"
                class="lyric-text"
                :class="currentLyricNum === index ? 'active' : ''"
                v-for="(item, index) of currentLyric.lines"
                :key="index"
              >
                {{ item.txt }}
              </p>
            </div>
            <div class="no-lyric" v-else>暂无歌词，请您欣赏</div>
          </div>
          <div class="foot"></div>
        </div>
      </transition>
      <transition name="fade">
        <div class="lyric-box playlist-box shadow" v-if="showPlaylist">
          <div class="title flex-between">
            播放列表<i
              class="iconfont nicelajitong"
              alt="清空"
              title="清空"
              @click="clearHistory"
            ></i>
          </div>
          <div class="list">
            <div
              class="item flex-row"
              v-for="(item, index) of historyList"
              :key="item.id"
              :class="currentSong.id == item.id && playing ? 'playing' : ''"
            >
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
                  @click="playSong(item, index)"
                ></i>
                <i
                  class="iconfont nicezanting1 pause-btn"
                  @click="pauseSong(item, index)"
                ></i>
              </div>
              <p class="ellipsis">{{ item.name }}</p>
              <i
                class="iconfont niceIcon_cloose"
                @click="deleteHistoryItem(item, index)"
              ></i>
            </div>
          </div>
          <div class="foot"></div>
        </div>
      </transition>
    </div>
  </transition>
</template>

<script>
import utils from '@/utils/utils'
import progressBar from '@/components/ProgressBar/index.vue'
import { computed, onMounted, onUpdated, reactive, toRefs, ref } from 'vue'
import { useStore } from 'vuex'
const playMode = {
  sequence: 0,
  loop: 1,
  random: 2
}

export default {
  components: {
    progressBar
  },
  watch: {
    // currentTime(val) {
    //   console.log(val);
    // },
    // 监听歌曲内容变化
    currentSong (newSong, oldSong) {
      console.log(oldSong, newSong)
      if (!newSong.id || !newSong.url || newSong.id === oldSong.id) {
        return
      }
      this.songReady = false
      this.canLyricPlay = false
      if (this.currentLyric) {
        this.currentLyric.stop()
        // 重置为null
        this.currentLyric = null
        this.currentTime = 0
        this.playingLyric = ''
        this.currentLyricNum = 0
      }
      this.$nextTick(() => {
        const audio = this.$refs.audio
        if (audio) {
          audio.src = newSong.url
          audio.volume = this.volume
          audio.play()
          this.$store.dispatch('saveHistoryList', newSong)
          this.id = newSong.id
        }
      })
      // 若歌曲 5s 未播放，则认为超时，修改状态确保可以切换歌曲。
      clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        this.songReady = true
      }, 5000)
      // this.getLyric(newSong.id);
    },
    // 监听播放状态
    playing (isPlaying) {
      if (!this.songReady) {
        return
      }
      this.$nextTick(() => {
        const audio = this.$refs.audio
        if (audio) {
          isPlaying ? audio.play() : audio.pause()
        }
      })
    }
  },
  setup () {
    const state = reactive({
      songReady: false,
      currentTime: 0,
      currentLyric: null,
      currentLyricNum: 0,
      showLyric: false,
      showPlaylist: false,
      id: '',
      playingLyric: '',
      isPureMusic: false,
      pureMusicLyric: '',
      isMuted: false,
      volume: 0.5,
      volumeNum: 50
    })
    const store = useStore()
    const audio = ref(null)
    const playList = computed(() => {
      return store.getters.playList
    })
    const currentSong = computed(() => store.getters.currentSong)
    const playing = computed(() => store.getters.playing)
    const currentIndex = computed(() => store.getters.currentIndex)
    const mode = computed(() => store.getters.mode)
    const sequenceList = computed(() => store.getters.sequenceList)
    const historyList = computed(() => store.getters.historyList)
    // 播放暂停按钮
    const playIcon = computed(() => playing.value ? 'nicezanting1' : 'nicebofang2')
    // 播放模式
    const modeIcon = computed(() => {
      return mode.value === playMode.sequence
        ? 'nicexunhuanbofang24'
        : mode.value === playMode.loop
          ? 'nicebofangqidanquxunhuan'
          : 'nicebofangqisuijibofang'
    })
    // 是否静音
    const mutedIcon = computed(() => state.isMuted ? 'nicejingyin1' : 'niceshengyin1')
    // 进度条
    const percent = computed(() => state.currentTime / currentSong.value.duration)
    // 清空历史播放列表
    function clearHistory () {
      store.dispatch('clearHistoryList')
    }
    // 移除最近播放单曲
    function deleteHistoryItem (item, index) {
      console.log(item, index)
      store.dispatch('deleteHistoryList', item)
    }
    // 播放歌曲
    function playSong (item, index) {
      store.dispatch('selectPlay', {
        list: historyList,
        index
      })
    }
    // 停止播放歌曲
    function pauseSong () {
      store.dispatch('pausePlay')
    }
    // 展开播放列表
    function openPlaylist () {
      state.showLyric = false
      if (state.showPlaylist) {
        state.showPlaylist = false
      } else {
        state.showPlaylist = true
      }
    }
    // 控制静音
    function changeMuted () {
      if (state.isMuted) {
        state.isMuted = false
        audio.value.muted = false
      } else {
        state.isMuted = true
        audio.value.muted = true
      }
    }
    // 改变音量
    function changeVolume (e) {
      state.volume = e / 100
      audio.value.volume = e / 100
    }
    // 展开歌词
    function openLyric () {
      state.showPlaylist = false
      if (state.showLyric) {
        state.showLyric = false
      } else {
        state.showLyric = true
      }
    }
    function closeLyric () {
      state.showLyric = false
    }
    // 获取歌词
    // async function getLyric(id) {
    //   try {
    //     let res = await this.$api.getLyric(id);
    //     if (res.code === 200) {
    //       let lyric = res.lrc.lyric;
    //       this.currentLyric = new Lyric(lyric, this.lyricHandle);
    //       if (this.isPureMusic) {
    //         const timeExp = /\[(\d{2}):(\d{2}):(\d{2})]/g;
    //         this.pureMusicLyric = this.currentLyric.lrc
    //           .replace(timeExp, "")
    //           .trim();
    //         this.playingLyric = this.pureMusicLyric;
    //       } else {
    //         if (this.playing && this.canLyricPlay) {
    //           this.currentLyric.seek(this.currentTime * 1000);
    //         }
    //         console.log(this.currentLyric);
    //       }
    //     }
    //   } catch (error) {
    //     this.currentLyric = null;
    //     this.playingLyric = "";
    //     this.currentLyricNum = 0;
    //   }
    // }
    // 歌词回调
    // function lyricHandle({ lineNum, txt }) {
    //   if (!this.$refs.lyricLine) {
    //     return;
    //   }
    //   state.currentLyricNum = lineNum;
    //   if (lineNum > 10) {
    //     let lineEl = this.$refs.lyricLine[lineNum - 10];
    //     if (this.$refs.lyricList) {
    //       this.$nextTick(() => {
    //         this.$refs.lyricList.scrollToElement(lineEl, 1000);
    //       });
    //     }
    //   } else {
    //     if (this.$refs.lyricList) {
    //       this.$nextTick(() => {
    //         this.$refs.lyricList.scrollTo(0, 0, 1000);
    //       });
    //     }
    //   }
    //   this.playingLyric = txt;
    // }
    // 点击播放暂停
    function togglePlaying () {
      if (!state.songReady) {
        return
      }
      store.commit('SET_PLAYING_STATE', !playing.value)
      if (state.currentLyric) {
        state.currentLyric.togglePlay()
      }
    }
    // 上一首
    function prevSong () {
      if (!state.songReady) {
        return
      }
      if (playList.value.length === 1) {
        loopSong()
      } else {
        let index = currentIndex.value - 1
        if (index === -1) {
          index = playList.value.length - 1
        }
        store.commit('SET_CURRENT_INDEX', index)
        if (!playing.value) {
          togglePlaying()
        }
      }
    }
    // 下一首
    function nextSong () {
      if (!state.songReady) {
        return
      }
      if (playList.value.length === 1) {
        loopSong()
      } else {
        let index = currentIndex.value + 1
        if (index === playList.value.length) {
          index = 0
        }
        store.commit('SET_CURRENT_INDEX', index)
        if (!playing.value) {
          togglePlaying()
        }
      }
    }
    // 单曲循环播放
    function loopSong () {
      audio.value.currentTime = 0
      audio.value.play()
      store.commit('SET_PLAYING_STATE', true)
      if (state.currentLyric) {
        state.currentLyric.seek(0)
      }
    }
    // 播放准备完成
    function audioReady () {
      clearTimeout(this.timer)
      state.songReady = true
      state.canLyricPlay = true
      if (state.currentLyric && !state.isPureMusic) {
        state.currentLyric.seek(state.currentTime * 1000)
      }
    }
    // 歌曲错误
    function audioError () {
      clearTimeout(this.timer)
      state.songReady = true
    }
    // 歌曲暂停
    function audioPaused () {
      store.commit('SET_PLAYING_STATE', false)
      if (state.currentLyric) {
        state.currentLyric.stop()
      }
    }
    // 歌曲播放完成
    function audioEnd () {
      state.currentTime = 0
      if (mode.value === playMode.loop) {
        loopSong()
      } else {
        nextSong()
      }
    }
    // 监听播放时间改变
    function updateTime (e) {
      state.currentTime = e.target.currentTime
    }
    // 进度条拖动改变播放进度
    function onPercentBarChange (percent) {
      const currentTime = currentSong.value.duration * percent
      // currentTime = parseFloat(currentTime / 1000);
      console.log(currentTime)
      state.currentTime = audio.value.currentTime = currentTime
      if (state.currentLyric) {
        state.currentLyric.seek(currentTime * 1000)
      }
      if (!playing.value) {
        togglePlaying()
      }
    }
    // 切换播放模式
    function changeMode () {
      console.log(historyList.value)
      const mode = (this.mode + 1) % 3
      store.commit('SET_PLAY_MODE', mode)
      let list = null
      if (mode === playMode.random) {
        list = utils.shuffle(sequenceList.value)
      } else {
        list = sequenceList.value
      }
      resetCurrentIndex(list)
      store.commit('SET_PLAYLIST', list)
    }
    // 重置当前播放歌曲序号
    function resetCurrentIndex (list) {
      const index = list.findIndex((item) => {
        return item.id === currentSong.value.id
      })
      store.commit('SET_CURRENT_INDEX', index)
    }
    // 格式化时间
    function formatTime (interval) {
      interval = interval | 0
      const m = (interval / 60) | 0
      const s = interval % 60
      return `${utils.formatZero(m, 2)}:${utils.formatZero(s, 2)}`
    }
    onMounted(() => {})
    onUpdated(() => {})
    return {
      ...toRefs(state),
      playList,
      currentSong,
      playing,
      currentIndex,
      mode,
      sequenceList,
      historyList,
      playIcon,
      modeIcon,
      mutedIcon,
      percent,
      utils,
      clearHistory,
      deleteHistoryItem,
      playSong,
      pauseSong,
      openPlaylist,
      changeMuted,
      changeVolume,
      openLyric,
      closeLyric,
      // getLyric,
      // lyricHandle,
      togglePlaying,
      prevSong,
      nextSong,
      loopSong,
      audioReady,
      audioError,
      audioPaused,
      audioEnd,
      updateTime,
      onPercentBarChange,
      changeMode,
      resetCurrentIndex,
      formatTime,
      audio
    }
  }
}
</script>

<style lang="scss" scoped>
$color-theme: #fa2800;
.fade-enter {
  opacity: 0;
  transform: translate3d(0, 30px, 0);
}

.fade-enter-active {
  transition: all 0.5s;
}

.fade-leave-to {
  opacity: 0;
  transform: translate3d(0, 30px, 0);
}

.fade-leave-active {
  transition: all 0.5s;
}
.player-bar {
  min-width: 1500px;
  width: 100%;
  height: 72px;
  background: #fff;
  position: fixed;
  bottom: 0;
  right: 0;
  left: 0;
  z-index: 8000;
  padding: 0 10px 0 20px;
  justify-content: space-between;
  .avatar {
    width: 60px;
    height: 60px;
    border-radius: 5px;
    margin-right: 30px;
    flex-shrink: 0;
    img {
      width: 60px;
      height: 60px;
      border-radius: 5px;
    }
  }
  .info {
    margin-right: 15px;
    flex-shrink: 0;
    width: 120px;
    h2 {
      text-align: left;
      font-weight: bold;
      font-size: 14px;
      color: #333;
      margin-bottom: 15px;
    }
    p {
      text-align: left;
      font-size: 12px;
      color: #999999;
    }
  }
  .player-btn {
    display: flex;
    align-items: center;
    i {
      cursor: pointer;
      &:active {
        opacity: 0.8;
      }
    }
    .icon-prev {
      font-size: 40px;
    }
    .icon-play {
      font-size: 60px;
      margin: 0 10px;
    }
    .icon-next {
      font-size: 40px;
    }
  }
  .progress-wrap {
    width: 650px;
    height: 100%;
    display: flex;
    align-items: center;
    margin-left: 80px;
    flex: 1;
    p {
      font-size: 14px;
    }
  }
  .volume-wrap {
    width: 180px;
    margin-left: 40px;
    display: flex;
    align-items: center;
    margin-right: 80px;
    .volume-icon {
      font-size: 26px;
      font-weight: bold;
      cursor: pointer;
    }
    .progress-bar {
      .code-box-demo .ant-slider {
        margin-bottom: 16px;
      }
      position: relative;
      top: 3px;
      width: 100%;
      flex: 1;
      height: 2px;
      background: rgba(0, 0, 0, 0.05);
      border-radius: 2px;
      cursor: pointer;
      margin-left: 10px;
      .bar-inner {
        // border: 1px solid red;
        position: absolute;
        top: -20px;
        left: 0;
        display: flex;
        align-items: center;
        .progress {
          width: 50px;
          background: $color-theme;
          height: 2px;
          border-radius: 2px;
        }
        .progress-btn {
          position: absolute;
          z-index: 100;
          right: -4px;
          width: 10px;
          height: 10px;
          top: -4.5px;
          background: $color-theme;
          box-shadow: 0 0 15px 0 rgba(0, 0, 0, 0.15);
          border-radius: 50%;
          &::after {
            position: absolute;
            content: " ";
            top: 50%;
            left: 50%;
            margin: -3px 0 0 -3px;
            width: 6px;
            height: 6px;
            background: #ffffff;
            border-radius: 50%;
          }
        }
      }
    }
  }
  .tool {
    .iconfont {
      font-size: 26px;
      margin: 0 15px;
      cursor: pointer;
      &:active {
        opacity: 0.7;
      }
      &.icon-like {
        font-size: 26px;
      }
    }
  }
  .lyric-box {
    width: 360px;
    height: 580px;
    position: absolute;
    right: 0;
    bottom: 80px;
    border-radius: 3px;
    padding: 30px;
    overflow: hidden;
    .title {
      margin: 10px 0 30px;
      font-weight: 500;
      font-size: 16px;
      i {
        font-size: 20px;
        cursor: pointer;
        &:hover {
          color: $color-theme;
        }
      }
      .clearBtn {
        font-size: 16px;
        color: $color-theme;
        cursor: pointer;
      }
    }
    .lyric {
      display: inline-block;
      vertical-align: top;
      width: 100%;
      height: 430px;
      overflow: hidden;
      .lyric-wrapper {
        width: 100%;
        margin: 0 auto;
        overflow: hidden;
        .lyric-text {
          margin: 5px 0;
          line-height: 24px;
          font-size: 14px;
          font-weight: 300;
          &.active {
            color: $color-theme;
          }
        }
      }
    }
  }
  .playlist-box {
    width: 460px;
    .list {
      overflow-y: scroll;
      max-height: calc(100% - 90px);
      .item {
        padding: 8px 0;
        height: 40px;
        .index-container {
          width: 30px;
          margin-right: 20px;
          flex-shrink: 0;
          .num {
            font-size: 14px;
            color: #4a4a4a;
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
        p {
          cursor: pointer;
          flex: 1;
          margin-right: 20px;
          &.active {
            color: $color-theme;
          }
        }
        i {
          font-size: 20px;
          cursor: pointer;
          &:hover {
            color: $color-theme;
          }
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
    }
  }
}
</style>
