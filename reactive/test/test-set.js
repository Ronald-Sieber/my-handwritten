// 复现set死循环

const deps = new Set()
deps.add(fn1)
deps.add(fn2)

// const depsToRun = new Set(deps)

function fn1() {
  deps.delete(fn1)
  console.log('执行函数fn1')
  deps.add(fn1)
}
function fn2() {
  deps.delete(fn2)
  console.log('执行函数fn2')
  deps.add(fn2)
}

deps.forEach((dep) => {
  dep()
})

// depsToRun.forEach((dep) => {
//   dep()
// })
