import handlers from './handlers/index.js'
import { isObject } from './utils.js'

//缓存代理对象，防止重复代理
const proxyMap = new Map()
export function reactive(target) {
  if (!isObject(target)) return target

  if (proxyMap.has(target)) return proxyMap.get(target)

  const proxy = new Proxy(target, handlers)

  proxyMap.set(target, proxy)

  return proxy
}
