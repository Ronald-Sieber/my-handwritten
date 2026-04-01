// 这是一个测试文件
import { effect } from './effect/effect.js'
import { reactive } from './reactive.js'

const obj = {
  a: 1,
  b: 2,
  c: {
    a: 3,
  },
}

const proxyObj = reactive(obj)
//#region 测试读取操作
// console.log(proxyObj.a)
// console.log(proxyObj.c.a)
// 'a' in proxyObj
// for (const element in proxyObj) {
// }
//#endregion 测试读取操作

//#region 测试写入操作
// proxyObj.c.a = 2

// proxyObj.d = 100
// proxyObj.d = 10
// delete proxyObj.a
//#endregion 测试写入操作

// 测试数组
const proxyArr = reactive([1, 2, obj, 3])

//#region 测试读取操作
// proxyArr[2]
// proxyArr[2].a
// proxyArr.length
// for (const element in proxyArr) {
// }

// for (let i = 0; i < proxyArr.length; i++) {
//   proxyArr[i]
// }

// console.log(proxyArr.indexOf(obj))
// console.log(proxyArr.includes(obj))

//#endregion 测试读取操作

//#region 测试写入操作
// proxyArr[0] = 10
// proxyArr[4] = 10 //newLength > oldLength
// proxyArr.length = 1
// proxyArr.length = 5 //newLength > oldLength

// proxyArr.push(5)
// proxyArr.pop()

//#endregion 测试写入操作

// 判断effectFn === activeEffect
effect(() => {
  console.log(proxyObj.a)
  proxyObj.a++
})
