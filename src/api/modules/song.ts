/**
 * 集成Abstract
 * @date 2020-5-29
 */
import Abstract from '../../utils/request/abstract'

class SongApi extends Abstract {
  /**
   * 登录
   * @param {string} account 用户
   * @param {string} password 密码
   * @param {string} captchaCode 图形码
   * @param {string} captchaCodeToken 图形码token
   */
  // authLogin (data: AuthLoginType) {
  //   return this.getReq({ url: 'Basic.AuthLogin', data })
  // }

  /**
 * @method 获取推荐歌曲
 */
  getRecommendSong () {
    return this.getReq({ url: 'Song.getRecommendSong' })
  }

  /**
* @method 获取推曲
*/
  getSongDetail (params:any) {
    return this.getReq({ url: 'Song.getSongDetail', params })
  }
}

// 单列模式返回对象
let instance
export default (() => {
  if (instance) return instance
  instance = new SongApi()
  return instance
})()
