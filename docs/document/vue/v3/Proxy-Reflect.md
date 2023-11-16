---
title: Proxy-Reflect
isTimeLine: true
date: 2022-03-02 15:20:23
---

### Proxy `[ˈprɑːksi]` 

- Proxy 对象用于创建一个对象的代理，从而实现基本操作的拦截和自定义（如属性查找、赋值、枚举、函数调用等）。

### handler.get
- 拦截操作
- proxy[key]
- proxy.key
- Object.create(proxy)[key]
- Reflect.get(target, key)

```js
const target = {
  id: 1
}
const handler = {
  get(target, key) {
    return target.hasOwnProperty(key) ? target[key] : true
  }
}
const proxy = new Proxy(target, handler)
console.log(proxy.id) // 1
console.log(proxy.a) // true
```

### handler.set
- 拦截操作
- proxy[key] = value
- proxy.key = value
- Object.create(proxy)[key] = value
- Reflect.set(target, key, value)

```js
const target = []
const handler = {
  set(target, key, value) {
    if (typeof value === 'number') {
      target[key] = value
      return true
    } else {
      console.error('只允许设置Number类型')
      return false
    }
  }
}
const proxy = new Proxy(target, handler)
proxy.push(1) // 添加成功
proxy.push('1') // Error
```

### handler.has
- 拦截操作
- key in proxy
- key in Object.create(proxy)
- with(proxy) { (key); }
- Reflect.has(target, key)

```js
const user = {
  name: 'black',
  age: 18,
  _sex: '男',
  _password: '12138'
}
const handler = {
  has(target, key) {
    if (key.startsWith('_')) {
      return false
    } else {
      return key in target
    }
  }
}
const proxy = new Proxy(user, handler)
console.log('name' in proxy) // true
console.log('_sex' in proxy) // false
```

### handler.deleteProperty
- 拦截操作
- delete proxy[key]
- delete proxy.key
- Reflect.deleteProperty(target, key)

- 不允许删除带`_`的属性

```js
const user = {
  name: 'black',
  age: 18,
  _sex: '男',
  _password: '12138'
}
const handler = {
  deleteProperty(target, key) {
    if (key.startsWith('_')) {
      throw new Error('不允许删除改属性')
    } else {
      delete target[key]
      return true
    }
  }
}
const proxy = new Proxy(user, handler)
delete proxy.name // true
delete proxy._sex // Error
```

### handler.ownKeys
- 拦截操作
- Object.getOwnPropertyNames()
- Object.getOwnPropertySymbols()
- Object.keys()
- Reflect.ownKeys()

- 过滤带`_`的属性

```js
const user = {
  name: 'black',
  age: 18,
  _sex: '男',
  _password: '12138'
}
const handler = {
  ownKeys(target) {
    return Object.keys(target).filter(key => !key.startsWith('_'))
  }
}
const proxy = new Proxy(user, handler)
console.log(Object.keys(proxy)) // ['name', 'age']
```

### receiver
- 如果 target 对象中指定了 getter，receiver 则为 getter 调用时的 this 值。

```js
const user = {
  _name: 'Guest',
  get name() {
    return this._name
  }
}

const userProxy = new Proxy(user, {
  get(target, key, receiver) {
    return target[key] // (*) target = user
    // return Reflect.get(target, key, receiver)
  }
})

const admin = {
  __proto__: userProxy,
  _name: 'Admin'
}

// 期望输出：Admin 却得到 Guest 如果我们移除代理，那么一切都会按预期进行。
console.log(admin.name)

// 当我们读取 admin.name 时，由于 admin 对象自身没有对应的的属性，搜索将转到其原型。
// 原型是 userProxy。
// 从代理读取 name 属性时，get 捕捉器会被触发，并从原始对象返回 target[key] 属性，在 (*) 行。
// 当调用 target[key] 时，若 key 是一个 getter，它将在 this=target 上下文中运行其代码。
// 因此，结果是来自原始对象 target 的 this._name，即来自 user。
// 为了解决这种情况，我们需要 get 捕捉器的第三个参数 receiver。
// 它保证将正确的 this 传递给 getter。
// 也就是将 target[key] 更改为 Reflect.get(target, key, receiver)
```

### Reflect 
- Reflect 是一个内置的对象，它提供拦截 JavaScript 操作的方法。这些方法与proxy handlers的方法相同。Reflect不是一个函数对象，因此它是不可构造的（就像`Math`对象一样）。
- Reflect对象经常和Proxy一起使用，主要作用就是当你改写这些方法的时候，让你能够调用原方法来实现默认行为, 也就是避免错误行为的发生

| Reflect方法 | 类似于 |
| :-- | :-- |
| Reflect.apply(target, thisArgument, argumentsList) |	Function.prototype.apply() |
| Reflect.construct(target, argumentsList[, newTarget]) |	new target(…args) |
| Reflect.defineProperty(target, prop, attributes) |	Object.defineProperty() |
| Reflect.deleteProperty(target, prop) |	delete target[name] |
| Reflect.get(target, prop[, receiver]) |	target[name] |
| Reflect.getOwnPropertyDescriptor(target, prop) |	Object.getOwnPropertyDescriptor() |
| Reflect.getPrototypeOf(target) |	Object.getPrototypeOf() |
| Reflect.has(target, prop) |	in 运算符 |
| Reflect.isExtensible(target) |	Object.isExtensible() |
| Reflect.ownKeys(target) |	Object.keys() |
| Reflect.preventExtensions(target) |	Object.preventExtensions() |
| Reflect.set(target, prop, value[, receiver]) |	target[prop] = value |
| Reflect.setPrototypeOf(target, prototype) |	Object.setPrototypeOf() |
