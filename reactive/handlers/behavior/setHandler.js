import trigger from '../../effect/trigger.js'
import { hasChanged, TriggerOpTypes } from '../../utils.js'

export default function (target, key, value) {
  // 首先进行派发更新
  // 区分add操作
  const type = Object.hasOwn(target, key)
    ? TriggerOpTypes.SET
    : TriggerOpTypes.ADD

  // 缓存旧值，判断值是否发生改变
  const oldValue = target[key]
  const oldLength = Array.isArray(target) ? target.length : null

  if (hasChanged(oldValue, value)) {
    trigger(target, key, type)
  }

  // 最后执行基本行为(先进行设置操作？)
  const result = Reflect.set(target, key, value)

  // 解决传入参数为数组时，部分写入操作未触发length的派发更新问题
  if (Array.isArray(target)) {
    const newLength = target.length
    if (hasChanged(oldLength, newLength)) {
      if (newLength > oldLength) {
        trigger(target, 'length', TriggerOpTypes.SET)
      } else {
        for (let i = newLength; i < oldLength; i++) {
          trigger(target, i.toString(), TriggerOpTypes.DELETE)
        }
      }
    }
  }

  return result
}
