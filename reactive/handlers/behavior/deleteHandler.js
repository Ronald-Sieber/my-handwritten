import trigger from '../../effect/trigger.js'
import { TriggerOpTypes } from '../../utils.js'

export default function (target, key) {
  trigger(target, key, TriggerOpTypes.DELETE)

  const result = Reflect.deleteProperty(target, key)
  return result
}
