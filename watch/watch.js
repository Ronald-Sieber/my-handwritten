import { cleanup, effect } from '../reactive/effect/effect.js'

export function watch(source, cb, options = {}) {
  let getter
  if (typeof source === 'function') {
    getter = source
  } else {
    getter = () => traverse(source)
  }

  let oldValue, newValue

  const job = () => {
    newValue = effectFn()
    cb(oldValue, newValue)
    oldValue = newValue
  }

  const effectFn = effect(() => getter(), {
    lazy: true,
    scheduler: () => {
      if (options.flush === 'post') {
        Promise.resolve().then(job)
      } else {
        job()
      }
    },
  })

  if (options.immediate) {
    job()
  } else {
    oldValue = effectFn()
  }

  return () => {
    cleanup(effectFn)
  }
}

/**
 * 用于遍历对象的所有属性，包括嵌套对象的属性
 * 触发这些属性的依赖收集
 * @param {*} value
 * @param {*} seen
 */
function traverse(value, seen = new Set()) {
  if (typeof value !== 'object' || value === null || seen.has(value)) {
    return value
  }

  seen.add(value)

  for (const key in value) {
    traverse(value[key], seen)
  }

  return value
}
