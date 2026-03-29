import track from '../../effect/track.js'
import { reactive } from '../../reactive.js'
import { isObject, TrackOpTypes } from '../../utils.js'

export default function getHandler(target, key) {
  // 首先进行依赖收集
  track(target, key, TrackOpTypes.GET)

  if (isObject) return reactive(target)

  // 最后执行基本行为
  const result = Reflect.get(target, key)
  return result
}
