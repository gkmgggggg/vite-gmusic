import { State } from './types'

// 登录状态
export const loginStatu = (state:State) => {
  return (
    state.loginStatu || window.localStorage.getItem('loginStatu') || false
  )
}

// 用户信息
export const userInfo = (state: State) => {
  return state.userInfo || window.localStorage.getItem('userInfo')
}

// 歌手信息
export const singer = (state: State) => state.singer

// 播放状态
export const playing = (state: State) => state.playing

// 播放列表
export const playList = (state: State) => state.playList

// 顺序列表
export const sequenceList = (state: State) => state.sequenceList

// 当前播放模式(循环，单曲，随机)
export const mode = (state: State) => state.mode

// 当前播放索引
export const currentIndex = (state: State) => state.currentIndex

// 当前播放歌曲
export const currentSong = (state: State) => {
  return state.playList[state.currentIndex] || {}
}

// 搜索历史
export const searchHistory = (state: State) => {
  return state.searchHistory
}

// 收藏列表
export const historyList = (state: State) => {
  return state.historyList
}
