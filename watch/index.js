// 这是一个测试文件
import { reactive } from '../reactive/reactive.js'
import { watch } from './watch.js'

const obj = {
  a: 1,
  b: 2,
  c: {
    d: 3,
  },
}

const proxyObj = reactive(obj)

// 单个 数据
watch(
  proxyObj,
  (oldvalue, newValue) => {
    console.log(oldvalue)
    console.log(newValue)
  },
  { immediate: true },
)
proxyObj.a = 2

// getter 函数
// const unwatch = watch(
//   () => proxyObj.a + proxyObj.b,
//   (oldValue, newValue) => {
//     console.log(`oldValue:${oldValue} newValue:${newValue}`)
//   },
//   {
//     // immediate: true,
//     // flush: 'post',
//   },
// )
// proxyObj.a++
// proxyObj.a++
// unwatch()
// proxyObj.a++
