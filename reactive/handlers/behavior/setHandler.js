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

  // 最后执行基本行为(先进行设置操作？不然会重新执行函数但是数据未改变，又造成数据改变从而死循环)
  const result = Reflect.set(target, key, value)

  if (hasChanged(oldValue, value)) {
    trigger(target, key, type)

    // 解决传入参数为数组时，部分写入操作未触发length的派发更新问题(隐式改变)
    if (Array.isArray(target) && hasChanged(oldLength, target.length)) {
      const newLength = target.length

      if (key !== 'length') {
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
