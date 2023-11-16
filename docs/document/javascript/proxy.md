---
title: proxy的使用方法
isTimeLine: true
date: 2021-08-13 14:03:48
---

### handlers.get

```js
const animal = {
  dog: 'dog',
  cat: 'cat',
  tiger: 'tiger',
  snake: 'snake'
}
const handlers = {
  get(target, property, receiver) {
    console.log(receiver === window.myProxy) // true
    return target[property]
  }
}
const proxy = new Proxy(animal, handlers)
window.myProxy = proxy
proxy.dog
```

### handlers.set

```js
const animal = {
  dog: 'dog',
  cat: 'cat',
  tiger: 'tiger',
  snake: 'snake'
}
const person = {
  live: 'shenzhen',
  from: 'china',
  school: 'beida',
  name: 'black',
  age: 18
}
const handlers = {
  set(target, property, value, receiver) {
    //receiver 可能是 animal person
    target[property] = value
    return true
  }
}
const proxy1 = new Proxy(animal, handlers)
const proxy2 = new Proxy(person, handlers)
```

### handlers.defineProperty

```js
const animal = {
  dog: 'dog',
  cat: 'cat',
  tiger: 'tiger',
  snake: 'snake'
}
const handlers = {
  defineProperty(target, property, descriptor) {
    console.log(target, property, descriptor)
    return true
  }
}
const proxy1 = new Proxy(animal, handlers)

//下面新增的属性均可拦截
Reflect.defineProperty(proxy1, 'bird', {
  value: 'bird',
  configurable: true,
  enumerable: false,
  writable: true
})
Object.defineProperty(proxy1, 'panda', {
  vlaue: 'panda',
  configurable: true,
  enumerable: true,
  writable: true
})
```

### handlers.deleteProperty 删除拦截
- 拦截如下操作
- delete obj.foo delete obj.foo.bar
- Reflect.deleteProperty(obj, 'foo')

```js
const animal = {
  dog: 'dog',
  cat: 'cat',
  tiger: 'tiger',
  snake: 'snake'
}
const handlers = {
  deleteProperty(target, property) {
    if(property === 'dog') {
      delete target[property] // 这里才是真正删除
      console.log('property removed：', property)
      return true
    } else {
      console.log(`property：${property} is readonly.`)
      return false
    }
  }
}
const proxy1 = new Proxy(animal, handlers)

console.log(proxy1.dog, 'dog' in proxy1) // dog true

delete proxy1.dog // true
delete proxy1.cat // false

console.log(proxy1.dog, 'dog' in proxy1) // undefined false
console.log(proxy1) // Proxy{ cat: 'cat', tiger: 'tiger', snake: 'snake' }
```

### handlers.getOwnPropertyDescriptor
- 拦截如下操作
- Object.getOwnPropertyDescriptor()
- Reflect.getOwnPropertyDescriptor()


```js
const animal = {
  dog: 'dog',
  cat: 'cat',
  tiger: 'tiger',
  snake: 'snake'
}
const handlers = {
  getOwnPropertyDescriptor(target, property, descriptor) {
    if(property in target) {
      return Reflect.getOwnPropertyDescriptor(target, property)
    } else {
      return { configurable: true, enumerable: false, writable: false, value: 'black' }
    }
  }
}
const proxy1 = new Proxy(animal, handlers)

console.log(Object.getOwnPropertyDescriptor(proxy1, 'dog')) // {value: "dog", writable: true, enumerable: true, configurable: true}
console.log(Reflect.getOwnPropertyDescriptor(proxy1, 'black')) // {value: "black", writable: false, enumerable: false, configurable: true}
```


### Proxy 中的 receiver

- MDN: 如果 target 对象中指定了 getter，receiver 则为 getter 调用时的 this 值。

- 例子 1

```js
const obj = {
  bar: 1,
  get foo() {
    // MDN: 如果target对象中指定了getter，receiver则为getter调用时的this值。
    return this.bar
  }
}
const handler = {
  get(target, key, receiver) {
    return Reflect.get(target, key, receiver)
  }
}
const p = new Proxy(obj, handler)
console.log(p.foo) // 1
console.log(Reflect.get(p, 'foo', { bar: 2 })) // 2
```

- 例子 2

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

- 例子 3

```js
{
  setup() {
    const data = reactive({
      bar: 1,
      get foo() {
        // 如果使用get1拦截器， this为target
        // 此时this.bar 不会再触发proxy getter拦截器
        // 从而导致无法收集bar依赖

        // 如果使用get2则不会有上述问题发现，它将会传递正确的this给getter
        // 即receiver, 即data，所以此时访问this.bar会再触发getter拦截器
        // bar依赖可以被正常收集

        // 当使用get2，又不想收集bar依赖
        // 可以使用 toRaw(this).bar 访问
        return this.bar
      }
    })
    
    // get1
    {
      get(target, key, receiver) {
        return target[key]
      }
    }

    // get2
    {
      get(target, key, receiver) {
        return Reflect.get(target, key, receiver)
      }
    }
  }
}
```

- 总结：应使用Reflect.get(target, key, receiver) 避免错误行为发生