import track from '../../effect/track.js'
import { TrackOpTypes } from '../../utils.js'

export default function (target, key) {
  track(target, key, TrackOpTypes.ITERATE)

  const result = Reflect.ownKeys(target)
  return result
}
