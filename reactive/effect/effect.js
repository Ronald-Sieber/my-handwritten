export let activeEffect = null
export const targetMap = new WeakMap()
const effectStack = []

/**
 * 执行被监控函数并向track提供当前函数
 * @param {*} fn 需要执行的函数
 */
export function effect(fn) {
  const environment = () => {
    try {
      effectStack.push(environment)
      activeEffect = environment
      cleanup(environment)
      return fn()
    } finally {
      effectStack.pop()
      activeEffect = effectStack[effectStack.length - 1]
    }
  }
  environment.deps = []
  environment()
}

export function cleanup(environment) {
  const deps = environment.deps

  if (deps.length) {
    deps.forEach((dep) => {
      dep.delete(environment)
    })
    deps.length = 0 // 释放内存
  }
}
