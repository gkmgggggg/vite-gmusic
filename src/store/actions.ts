import * as types from './mutatiosn_type'
// import { State } from './types'
import utils from '@/utils/utils'
import {
  saveSearch,
  deleteSearch,
  clearSearch,
  saveHistory,
  deleteHistory,
  clearHistory
} from '@/utils/cache'
// import { playMode } from '@/config/playConfig'
const playMode = {
  sequence: 0,
  loop: 1,
  random: 2
}

function findIndex (list:any[], song:any) {
  return list.findIndex(item => {
    return item.id === song.id
  })
}

// 选择播放
export const selectPlay = function ({ commit, state }: any, { list, index }: any) {
  commit(types.SET_SEQUENCE_LIST, list)
  if (state.mode === playMode.random) {
    const randomList = utils.shuffle(list)
    commit(types.SET_PLAYLIST, randomList)
    index = findIndex(randomList, list[index])
  } else {
    commit(types.SET_PLAYLIST, list)
  }
  console.log(index)
  commit(types.SET_CURRENT_INDEX, index)
  commit(types.SET_PLAYING_STATE, true)
  console.log(state.playList, state.currentIndex)
}

// 播放全部
export const playAll = function ({ commit }: any, { list }: any) {
  commit(types.SET_PLAY_MODE, playMode.sequence)
  commit(types.SET_SEQUENCE_LIST, list)
  commit(types.SET_PLAYLIST, list)
  commit(types.SET_CURRENT_INDEX, 0)
  commit(types.SET_PLAYING_STATE, true)
}

// 暂停播放
export const pausePlay = function ({ commit }: any) {
  commit(types.SET_PLAYING_STATE, false)
}

// 移除播放
export const stopPlay = function ({ commit }: any) {
  commit(types.SET_PLAYING_STATE, false)
  commit(types.SET_PLAYLIST, [])
  commit(types.SET_SEQUENCE_LIST, [])
  commit(types.SET_CURRENT_INDEX, -1)
}

// 保存搜索历史
export const saveSearchHistory = function ({ commit }: any, query: any) {
  commit(types.SET_SEARCH_HISTORY, saveSearch(query))
}

// 移除单个搜索历史
export const deleteSearchHistory = function ({ commit }: any, query: any) {
  commit(types.SET_SEARCH_HISTORY, deleteSearch(query))
}

// 移除全部搜索历史
export const clearSearchHistory = function ({ commit }: any) {
  commit(types.SET_SEARCH_HISTORY, clearSearch())
}

// 设置最近播放歌曲
export const saveHistoryList = function ({ commit }: any, song: any) {
  commit(types.SET_HISTORY_LIST, saveHistory(song))
}

// 移除最近播放歌曲单个
export const deleteHistoryList = function ({ commit }: any, song: any) {
  commit(types.SET_HISTORY_LIST, deleteHistory(song))
}

// 移除全部最近播放
export const clearHistoryList = function ({ commit }: any) {
  commit(types.SET_HISTORY_LIST, clearHistory())
}
