---
title: proxy-receiver的使用方法
isTimeLine: true
date: 2021-08-14 18:17:51
---

# Proxy 和 Reflect 中的 receiver 到底是什么？
- [详细查看](https://github.com/sl1673495/notes/issues/52)

- 一个透传的 get trap 就是返回 target[p] 的话，实际上表现是有区别的

```js
const a = {
  get foo() {
    return this.bar
  }
}
const aProxy = new Proxy(a, {
  get(target, p, receiver) {
    return target[p]
  }
})

const b = { bar: 42 }

Reflect.get(a, 'foo', b) // 42
Reflect.get(aProxy, 'foo', b) // undefined
```

- 正确的写法

```js
const a = {
  get foo() {
    return this.bar
  }
}
const aProxy = new Proxy(a, {
  get(target, p, receiver) {
    return Reflect.get(target, p, receiver)
  }
})

const b = { bar: 42 }

Reflect.get(a, 'foo', b) // 42
Reflect.get(aProxy, 'foo', b) // 42
```
