// 这是一个测试文件
import { effect } from '../reactive/effect/effect.js'
import { reactive } from '../reactive/reactive.js'
import { computed } from './computed.js'

const proxyObj = reactive({
  a: 1,
  b: 2,
})

// 参数：回调函数、配置对象
const sum1 = computed(() => {
  console.log('函数执行sum1')

  return proxyObj.a + proxyObj.b
})

// console.log(sum1.value)
// console.log(sum1.value)
proxyObj.a = 3
console.log(sum1.value)

// 函数中使用
// effect(() => {
//   console.log('effect函数执行')
//   sum1.value
// })
// proxyObj.b = 4
