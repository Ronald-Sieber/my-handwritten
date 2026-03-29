// 这是一个测试文件
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
delete proxyObj.a
//#endregion 测试写入操作
