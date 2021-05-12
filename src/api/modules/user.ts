/**
 * 集成Abstract
 * @date 2020-5-29
 */
import Abstract from '../../utils/request/abstract'

class User extends Abstract {
  /**
   * @method 用户登录
   * @param {string} account 用户
   * @param {string} password 密码
   */
  authLogin (params:any) {
    return this.getReq({ url: 'User.authLogin', params })
  }

  /**
 * @method 用户注册
 * @param {string} account 用户
 * @param {string} password 密码
 */
  authRegister (data: any) {
    return this.postReq({ url: 'User.authRegister', data })
  }

  /**
* @method 获取用户信息
* @param {string} account 用户
*/
  getUserInfo (params: any) {
    return this.getReq({ url: 'User.getUserInfo', params })
  }

  /**
* @method 获取用户收藏歌曲
* @param {string} account 用户
*/
  getUserSong (params: any) {
    return this.getReq({ url: 'User.getUserSong', params })
  }

  /**
* @method 获取用户收藏歌单
* @param {string} account 用户
*/
  getUserPlaylist (params: any) {
    return this.getReq({ url: 'User.getUserPlaylist', params })
  }

  /**
* @method 用户收藏歌单
* @param {string} account 用户
*/
  collectPlaylist (data: any) {
    return this.postReq({ url: 'User.collectPlaylist', data })
  }

  /**
* @method 用户收藏歌曲
* @param {string} account 用户
*/
  collectSong (data: any) {
    return this.postReq({ url: 'User.collectSong', data })
  }

  /**
* @method 用户取消收藏歌曲
* @param {string} account 用户
*/
  deleteSong (data: any) {
    return this.postReq({ url: 'User.deleteSong', data })
  }

  /**
* @method 用户取消收藏歌曲
* @param {string} account 用户
*/
  deletePlaylist (data: any) {
    return this.postReq({ url: 'User.deletePlaylist', data })
  }

  /**
* @method 用户发布评论
* @param {string} account 用户
*/
  postComment (data: any) {
    return this.postReq({ url: 'User.postComment', data })
  }

  /**
* @method 用户发布歌单
* @param {string} account 用户
*/
  postPlaylist (data: any) {
    return this.postReq({ url: 'User.postPlaylist', data })
  }
}

// 单列模式返回对象
let instance
export default (() => {
  if (instance) return instance
  instance = new User()
  return instance
})()
