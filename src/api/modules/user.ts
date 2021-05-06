/**
 * 集成Abstract
 * @date 2020-5-29
 */
import Abstract from '../../utils/request/abstract'

class Basic extends Abstract {
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
}

// 单列模式返回对象
let instance
export default (() => {
  if (instance) return instance
  instance = new Basic()
  return instance
})()
