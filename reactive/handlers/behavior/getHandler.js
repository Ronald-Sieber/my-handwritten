import track, { pauseTracking, resumeTracking } from '../../effect/track.js'
import { reactive } from '../../reactive.js'
import { isObject, RAW, TrackOpTypes } from '../../utils.js'

// 储存重写的数组方法
const arrayInstrumentations = {}

;['indexOf', 'lastIndexOf', 'includes'].forEach((key) => {
  arrayInstrumentations[key] = function (...args) {
    let result = Array.prototype[key].apply(this, args)
    if (result === -1 || result === false) {
      result = Array.prototype[key].apply(this[RAW], args)
    }
    return result
  }
})
;['push', 'pop', 'shift', 'unshift', 'splice'].forEach((key) => {
  arrayInstrumentations[key] = function (...args) {
    pauseTracking()
    const result = Array.prototype[key].apply(this, args)
    resumeTracking()
    return result
  }
})

export default function (target, key) {
  if (key === RAW) {
    return target
  }
  // 首先进行依赖收集
  track(target, key, TrackOpTypes.GET)

  if (Array.isArray(target) && arrayInstrumentations.hasOwnProperty(key)) {
    return arrayInstrumentations[key]
  }

  // 最后执行基本行为
  const result = Reflect.get(target, key)

  if (isObject) return reactive(result)

  return result
}
