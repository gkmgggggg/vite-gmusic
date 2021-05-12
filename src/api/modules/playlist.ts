/**
 * 集成Abstract
 * @date 2020-5-29
 */
import Abstract from '../../utils/request/abstract'

class PlaylistApi extends Abstract {
  /**
   * @method 获取主页推荐歌单
   */
  getRecommendedPlayList () {
    return this.getReq({ url: 'Playlist.getRecommendPlaylist' })
  }

  /**
   * @method 根据条件获取歌单列表
   */
  getPlayList (params:any) {
    return this.getReq({ url: 'Playlist.getPlayList', params })
  }

  /**
   * @method 获取歌单详情
   */
  getPlaylistDetail (params:any) {
    return this.getReq({ url: 'Playlist.getPlaylistDetail', params })
  }

  /**
 * @method 获取排行榜
 */
  getRank () {
    return this.getReq({ url: 'Playlist.getRank' })
  }

  /**
* @method 获取Tag
*/
  getTag (hot:number = 0) {
    return this.getReq({ url: 'Playlist.getTag', params: { hot } })
  }

  /**
* @method 获取歌单评论s
*/
  getComment (params:any) {
    return this.getReq({ url: 'Playlist.getComment', params })
  }

  /**
* @method 歌单添加歌曲
*/
  addSong (params: any) {
    return this.getReq({ url: 'Playlist.addSong', params })
  }

  /**
* @method 获取创建的歌单
*/
  getCreatePlaylist (params: any) {
    return this.getReq({ url: 'Playlist.getCreatePlaylist', params })
  }
}

// 单列模式返回对象
let instance
export default (() => {
  if (instance) return instance
  instance = new PlaylistApi()
  return instance
})()
