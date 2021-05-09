/**
 * 集成Abstract
 * @date 2020-5-29
 */
import Abstract from '../../utils/request/abstract'

class SingerApi extends Abstract {
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
 * 登录
 * @method 获取推荐歌手
 */
  getRecommendSinger () {
    return this.getReq({ url: 'Singer.getRecommendSinger' })
  }

  /**
* @method 获取歌手列表
*/
  getSinger (params:any) {
    return this.getReq({ url: 'Singer.getSinger', params })
  }

  /**
* @method 获取歌手详情
*/
  getSingerDetail (params: any) {
    return this.getReq({ url: 'Singer.getSingerDetail', params })
  }

  /**
* @method 获取歌手的歌曲
*/
  getSingerSong (params: any) {
    return this.getReq({ url: 'Singer.getSingerSong', params })
  }

  /**
* @method 获取歌手的歌曲
*/
  getSingerAlbum (params: any) {
    return this.getReq({ url: 'Singer.getSingerAlbum', params })
  }
}

// 单列模式返回对象
let instance
export default (() => {
  if (instance) return instance
  instance = new SingerApi()
  return instance
})()
