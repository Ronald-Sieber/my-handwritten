import { TrackOpTypes } from '../utils.js'

let shouldTrack = true

/**
 * 暂停依赖收集
 */
export const pauseTracking = () => {
  shouldTrack = false
}

/**
 * 恢复依赖收集
 */
export const resumeTracking = () => {
  shouldTrack = true
}

export default function (target, key, type) {
  if (!shouldTrack) return

  if (type === TrackOpTypes.ITERATE) {
    console.log(`收集器：代理对象的${type}操作被拦截`)
    return
  }

  console.log(`收集器：代理对象${key}属性的${type}操作被拦截`)
}
