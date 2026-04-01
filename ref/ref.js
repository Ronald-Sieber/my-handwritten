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
  let _value = isObject(target) ? reactive(target) : target
  const refWrapper = {}

  Object.defineProperty(refWrapper, 'value', {
    get() {
      track(refWrapper, 'value', TrackOpTypes.GET)

      return _value
    },
    set(newVal) {
      _value = isObject(newVal) ? reactive(newVal) : newVal

      if (hasChanged(target.value, newVal)) {
        trigger(refWrapper, 'value', TriggerOpTypes.SET)
      }
    },
    enumerable: true,
    configurable: true,
  })

  return refWrapper
}
