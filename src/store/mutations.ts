import * as types from './mutatiosn_type'
import { State } from './types'

const mutations = {
  // 是否登录
  [types.SET_LOGINSTATU] (state: State, loginStatu:boolean) {
    state.loginStatu = loginStatu
  },

  // 获取用户信息
  [types.SET_USERINFO] (state:State, userInfo:any) {
    state.userInfo = userInfo
  },

  // 获取歌手信息
  [types.SET_SINGER] (state:State, singer:any) {
    state.singer = singer
  },

  // 播放状态
  [types.SET_PLAYING_STATE] (state: State, flag: boolean) {
    state.playing = flag
  },

  // 播放列表
  [types.SET_PLAYLIST] (state:State, list:any) {
    state.playList = list
  },

  // 顺序播放列表
  [types.SET_SEQUENCE_LIST] (state:State, list:any) {
    state.sequenceList = list
  },

  // 播放模式
  [types.SET_PLAY_MODE] (state: State, mode: number) {
    state.mode = mode
  },

  // 播放索引
  [types.SET_CURRENT_INDEX] (state:State, index:number) {
    state.currentIndex = index
  },

  // 搜索历史
  [types.SET_SEARCH_HISTORY] (state:State, history:any) {
    state.searchHistory = history
  },

  // 收藏列表
  [types.SET_HISTORY_LIST] (state:State, list:any) {
    state.historyList = list
  }
}

export default mutations
