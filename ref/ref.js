import track from '../reactive/effect/track.js'
import trigger from '../reactive/effect/trigger.js'
import { reactive } from '../reactive/reactive.js'
import {
  hasChanged,
  isObject,
  TrackOpTypes,
  TriggerOpTypes,
} from '../reactive/utils.js'

export function ref(target) {
  let _value = target
  const refWrapper = {}

  Object.defineProperty(refWrapper, 'value', {
    get() {
      // 数组、对象在此递归代理
      if (isObject(_value)) {
        return reactive(_value)
      }

      // console.log('收集器：代理对象value属性的get操作被拦截')
      track(refWrapper, 'value', TrackOpTypes.GET)

      return _value
    },
    set(newVal) {
      _value = newVal
      // console.log('触发器：代理对象value属性的set操作被拦截')

      if (hasChanged(target.value, newVal)) {
        trigger(refWrapper, 'value', TriggerOpTypes.SET)
      }
    },
    enumerable: true,
    configurable: true,
  })

  return refWrapper
}
