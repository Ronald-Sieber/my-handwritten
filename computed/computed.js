import { effect } from '../reactive/effect/effect.js'
import track from '../reactive/effect/track.js'
import trigger from '../reactive/effect/trigger.js'
import { TrackOpTypes, TriggerOpTypes } from '../reactive/utils.js'

export function computed(getterOrOptions) {
  const { getter, setter } = normalizeParams(getterOrOptions)

  let valueCache
  let shouldRun = true

  const effectFn = effect(getter, {
    lazy: true,
    scheduler: () => {
      shouldRun = true
      trigger(obj, 'value', TriggerOpTypes.SET)
    },
  })

  const obj = {
    get value() {
      track(obj, 'value', TrackOpTypes.GET)
      if (shouldRun) {
        valueCache = effectFn()
        shouldRun = false
      }
      return valueCache
    },
    set value(newVal) {
      setter(newVal)
    },
  }
  return obj
}

/**
 * 参数归一化
 */
function normalizeParams(getterOrOptions) {
  let getter, setter
  if (typeof getterOrOptions === 'function') {
    getter = getterOrOptions
    setter = () => {
      console.warn('it has not setter')
    }
  } else {
    getter = getterOrOptions.get
    setter = getterOrOptions.set
  }

  return { getter, setter }
}
