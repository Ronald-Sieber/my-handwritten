import { ITERATE_KEY, TrackOpTypes, TriggerOpTypes } from '../utils.js'
import { activeEffect, targetMap } from './effect.js'

// 定义修改数据和触发数据的映射关系
const triggerTypeMap = {
  [TriggerOpTypes.SET]: [TrackOpTypes.GET],
  [TriggerOpTypes.ADD]: [
    TrackOpTypes.GET,
    TrackOpTypes.ITERATE,
    TrackOpTypes.HAS,
  ],
  [TriggerOpTypes.DELETE]: [
    TrackOpTypes.GET,
    TrackOpTypes.ITERATE,
    TrackOpTypes.HAS,
  ],
}

/**
 * 触发器
 * @param {*} target 原始对象
 * @param {*} key 对象属性
 * @param {*} type 操作类型
 */
export default function (target, key, type) {
  const effectFns = getEffectFns(target, key, type)
  if (!effectFns) return

  for (const effectFn of effectFns) {
    if (effectFn === activeEffect) continue
    if (effectFn.options && effectFn.options.scheduler) {
      effectFn.options.scheduler(effectFn)
    } else {
      effectFn()
    }
  }
  // console.log({ effectFns })
}

/**
 * 根据target、key、type找到函数依赖
 * @param {*} target
 * @param {*} key
 * @param {*} type
 */
function getEffectFns(target, key, type) {
  const propMap = targetMap.get(target)

  // 若为新增或删除操作，会影响迭代操作
  const keys = [key]
  if (type === TriggerOpTypes.ADD || type === TriggerOpTypes.DELETE) {
    keys.push(ITERATE_KEY)
  }

  const effectFns = new Set() //存储找到的函数依赖

  for (const key of keys) {
    const typeMap = propMap.get(key)
    if (!typeMap) continue

    const trackTypes = triggerTypeMap[type]
    for (const trackType of trackTypes) {
      const deps = typeMap.get(trackType)

      if (!deps) continue

      for (const dep of deps) {
        effectFns.add(dep)
      }
    }
  }

  return effectFns
}
