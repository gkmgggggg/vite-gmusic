/**
 * 集成Abstract
 * @date 2020-5-29
 */
import Abstract from '../../utils/request/abstract'

class PlayListApi extends Abstract {
  /**
   * @method 获取主页推荐歌单
   */
  getRecommendedPlayList () {
    return this.getReq({ url: 'PlayList.getRecommended' })
  }

  /**
   * @method 根据条件获取歌单列表
   */
  getPlayList () {
    return this.getReq({ url: 'PlayList.getPlayList' })
  }

  /**
   * @method 获取歌单详情
   */
  getPlayListDetail () {
    return this.getReq({ url: 'PlayList.getPlayListDetail' })
  }
}

// 单列模式返回对象
let instance
export default (() => {
  if (instance) return instance
  instance = new PlayListApi()
  return instance
})()
