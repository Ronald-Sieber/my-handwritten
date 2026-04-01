import { ITERATE_KEY, TrackOpTypes } from '../utils.js'
import { activeEffect, targetMap } from './effect.js'

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

/**
 * 收集器
 * @param {*} target 原始对象
 * @param {*} key 对象属性
 * @param {*} type 操作类型
 */
export default function (target, key, type) {
  // 不期望数组push等方法触发length的依赖收集
  console.log('track')
  if (!shouldTrack || !activeEffect) return

  let propMap = targetMap.get(target)
  if (!propMap) {
    propMap = new Map()
    targetMap.set(target, propMap)
  }

  if (type === TrackOpTypes.ITERATE) {
    key = ITERATE_KEY
  }

  let typeMap = propMap.get(key)
  if (!typeMap) {
    typeMap = new Map()
    propMap.set(key, typeMap)
  }

  let depSet = typeMap.get(type)
  if (!depSet) {
    depSet = new Set()
    typeMap.set(type, depSet)
  }

  if (!depSet.has(activeEffect)) {
    activeEffect.deps.push(depSet)
    depSet.add(activeEffect)
  }
}
