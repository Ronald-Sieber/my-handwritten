export default function (target, key, type) {
  console.log(`触发器：代理对象${key}属性的${type}操作被拦截`)
}
