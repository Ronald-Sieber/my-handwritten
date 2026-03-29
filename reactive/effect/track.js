import { TrackOpTypes } from '../utils.js'

export default function (target, key, type) {
  if (type === TrackOpTypes.ITERATE) {
    console.log(`收集器：代理对象的${type}操作被拦截`)
    return
  }

  console.log(`收集器：代理对象${key}属性的${type}操作被拦截`)
}
