import trigger from '../../effect/trigger.js'
import { TriggerOpTypes } from '../../utils.js'

export default function (target, key) {
  const hadKey = Object.hasOwn(target, key)
  const result = Reflect.deleteProperty(target, key)

  if (hadKey && result) {
    trigger(target, key, TriggerOpTypes.DELETE)
  }

  return result
}
