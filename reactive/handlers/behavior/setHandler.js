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
  if (hasChanged(oldValue, value)) {
    trigger(target, key, type)
  }

  // 最后执行基本行为(先进行设置操作？)
  const result = Reflect.set(target, key, value)
  return result
}
