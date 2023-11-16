---
title: Object.defineProperty
isTimeLine: true
date: 2022-03-02 15:20:23
---

### Object.defineProperty(obj, key, descriptor)

```js
Object.defineProperty(obj, key, {
  configurable: boolean, //默认false, 为false时，不能删除属性
  enumerable: boolean, //默认false, 为false时，不可枚举（就是不能被循环，Object.keys()也获取不到）
  writable: boolean, //默认false, writable为false时，不能对值进行更改
  value: any, // 默认undefined 可以是任意值
  get: () => {}, // getter 拦截器
  set: () => {} // setter 拦截器
})
```

### configurable

```js
const data = {
  name: '小明',
  age: 18
}
Object.defineProperty(data, 'name', {
  configurable: false
})
delete data.name
console.log(data.name) // 小明
```

### enumerable

```js
const data = {
  name: '小明',
  age: 18
}
Object.defineProperty(data, 'name', {
  enumerable: false
})
console.log(Object.keys(data)) // ['age']
```

### writable

```js
const data = {
  name: '小明',
  age: 18
}
Object.defineProperty(data, 'name', {
  writable: false
})
data.name = '小白'
console.log(data.name) // 小明
```

### value

```js
const data = {
  name: '小明',
  age: 18
}
Object.defineProperty(data, 'age', {
  value: 19
})
console.log(data.age) // 19

Object.defineProperty(data, 'sex', {
  value: '男'
})
console.log(data.sex) // 男
```

```js
const data = {
  name: '小明',
  age: 18
}
for (const key in data) {
  let val = data[key]
  Object.defineProperty(data, key, {
    get() {
      console.log('触发了getter')
      // 做某事...
      return val
    },
    set(newVal) {
      console.log('触发了setter')
      // 做某事...
      val = newVal
    }
  })
}
data.name = '小白'
console.log(data.name) // 小白
```
