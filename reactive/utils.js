/**
 * 判断是否为对象
 * @param {*} target 目标对象
 * @returns
 */
export function isObject(target) {
  return typeof target === 'object' && target !== null
}

/**
 * 判断值是否发生改变
 * @param {*} oldValue 旧值
 * @param {*} newValue 新值
 * @returns
 */
export function hasChanged(oldValue, newValue) {
  return !Object.is(oldValue, newValue)
}

/**
 * 依赖收集的操作类型
 */
export const TrackOpTypes = {
  GET: 'get',
  HAS: 'has',
  ITERATE: 'iterate',
}

/**
 * 派发更新的操作类型
 */
export const TriggerOpTypes = {
  SET: 'set',
  DELETE: 'delete',
  ADD: 'add',
}
