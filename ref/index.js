// 这是测试文件
import { effect } from '../reactive/effect/effect.js'
import { ref } from './ref.js'

const obj = {
  a: 1,
  b: 2,
  user: {
    name: '张三',
    age: 18,
  },
}

// const proxyNum = ref(1)
// effect(() => {
//   console.log('函数执行')
//   console.log(proxyNum.value)
// })
// proxyNum.value = 2

const proxyObj = ref(1)

// effect(() => {
//   console.log('函数执行fn1')
//   console.log(proxyObj.value.a)
// })
// proxyObj.value.a = 2

// effect(() => {
//   console.log('函数执行fn2')
//   console.log(proxyObj.value)
// })
// proxyObj.value = {}

const proxyArr = ref([1, obj, 2])

console.log(proxyArr.value.indexOf(obj))

//#region 测试懒执行和自定义派发更新时机
// const effectFn = effect(
//   () => {
//     console.log('函数执行')
//     console.log(proxyNum.value)
//   },
//   {
//     lazy: true,
//   },
// )
// effectFn()
// proxyNum.value = 2
// proxyNum.value = {}

// let shouldRun = false
// const effectFn = effect(
//   () => {
//     console.log('函数执行')
//     console.log(proxyNum.value)
//   },
//   {
//     lazy: true,
//     scheduler: (depFn) => {
//       Promise.resolve().then(() => {
//         if (!shouldRun) {
//           shouldRun = true
//           depFn()
//         }
//       })
//     },
//   },
// )
// effectFn()
// proxyNum.value++
// proxyNum.value++
// proxyNum.value++
//#endregion 测试懒执行和自定义派发更新时机
