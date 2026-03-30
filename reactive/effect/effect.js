let activeEffect = null
const depsMap = new Map()

function track(target, key) {
  if (activeEffect) {
    let deps = depsMap.get(key)
    if (!deps) {
      deps = new Set()
      depsMap.set(key, deps)
    }
    activeEffect.deps.push(deps)
    deps.add(activeEffect)
  }
  console.log(depsMap)
}

function trigger(target, key) {
  const deps = depsMap.get(key)
  if (deps) {
    deps.forEach((effct) => effct())
  }
}

const obj = {
  a: 1,
  b: 2,
  c: 3,
}

const proxyObj = new Proxy(obj, {
  get(target, key) {
    track(target, key)
    return Reflect.get(target, key)
  },
  set(target, key, value) {
    const result = Reflect.set(target, key, value)
    trigger(target, key)
    return result
  },
})

function cleanup(environment) {
  const deps = environment.deps

  if (deps.length) {
    deps.forEach((dep) => {
      dep.delete(environment)

      if (dep.size === 0) {
        for (const [key, value] of depsMap) {
          if (value === dep) {
            depsMap.delete(key)
          }
        }
      }
    })
  }
}

function effect(fn) {
  const environment = () => {
    activeEffect = environment
    cleanup(environment)
    fn()
    activeEffect = null
  }
  environment.deps = []
  environment()
}

// 1、environment
// 2、cleanup
// effect(() => {
//   console.log('函数执行')
//   if (proxyObj.a === 1) {
//     proxyObj.b
//   } else {
//     proxyObj.c
//   }
// })
// proxyObj.a = 2

effect(() => {
  if (proxyObj.a === 1) {
    proxyObj.b
  } else {
    proxyObj.c
  }
  console.log('执行了函数1')
})
effect(() => {
  console.log(proxyObj.a)
  console.log(proxyObj.c)
  console.log('执行了函数2')
})
proxyObj.a = 2
