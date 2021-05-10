/**
 * 集成Abstract
 * @date 2020-5-29
 */
import Abstract from '../../utils/request/abstract'

class BasicApi extends Abstract {
  /**
 * @method 获取轮播图数据
 */
  getBanner () {
    return this.getReq({ url: 'Basic.getBanner' })
  }

  /**
* @method 获得搜索结果
*/
  search (params:any) {
    return this.getReq({ url: 'Basic.search', params })
  }
}

// 单列模式返回对象
let instance
export default (() => {
  if (instance) return instance
  instance = new BasicApi()
  return instance
})()
