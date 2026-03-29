import track from '../../effect/track.js'
import { TrackOpTypes } from '../../utils.js'

export default function (target, key) {
  track(target, key, TrackOpTypes.HAS)

  const result = Reflect.has(target, key)
  return result
}
