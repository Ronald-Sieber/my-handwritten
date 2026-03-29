import { TrackOpTypes } from '../utils.js'

export default function (target, key, type) {
  if (type === TrackOpTypes.ITERATE) {
    console.log(`目标对象的${type}操作被拦截`)
    return
  }

  console.log(`目标对象${key}属性的${type}操作被拦截`)
}
