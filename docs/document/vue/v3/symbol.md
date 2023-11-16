---
title: Symbol
isTimeLine: true
date: 2022-03-02 15:20:23
---

### Symbol
- symbol 是一种基本数据类型，每个从Symbol()返回的symbol值都是唯一的
```js
const s1 = Symbol(42)
const s2 = Symbol('foo')

console.log(typeof s1) // 'symbol'
console.log(s1 === 42) // false
console.log(s2 === Symbol('foo')) // false
console.log(Symbol('bar') === Symbol('bar')) // false
console.log(s1 === s1) // true
```
#### 使用场景
- 我想在后端返回的数据添加一个属性, 但是又怕在后面的迭代中返回了相同的属性
- 这时候Symbol就派上用场了
```js 
const res = {
  code: 200,
  data: { ... }
}
const name = Symbol('name')
res.data[name] = 'black'
```

- ES6 中的类是没有 private 关键字来声明类的私有方法和私有变量的，但是我们可以利用 Symbol 的唯一性来模拟。
```js
const getName = Symbol('getName')
class User {
  [getName]() {
    return 'black'
  }
}
```


### Symbol.iterator

- Symbol.iterator 为每一个对象定义了默认的迭代器。该迭代器可以被 for...of 循环使用。

```js
Object.prototype[Symbol.iterator] = function () {
  let raw = this
  let i = 0
  let keys = Object.keys(raw)
  return {
    next() {
      if (i >= keys.length) {
        return { value: undefined, done: true }
      }
      const key = keys[i++]
      const value = { key, value: raw[key] }
      return { value, done: false }
    },
    /**
     * 再次定义Symbol.iterator
     * 使得下面代码也可以正常运行
     * const iterator = obj[Symbol.iterator]()
     * for(const item of iterator) {}
     */
    [Symbol.iterator]() { 
      return this
    }
  }
}

const user = {
  name: 'black',
  age: 18,
  sex: '男'
}

for (const { key, value } of user) {
  console.log(key, value)
}
```

### Symbol.asyncIterator

- Symbol.asyncIterator 符号指定了一个对象的默认异步迭代器。如果一个对象设置了这个属性，它就是异步可迭代对象，可用于 for await...of 循环。

```js
function request(url) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        value: {
          code: 200,
          data: url
        },
        done: false
      })
    }, 1000)
  })
}

Array.prototype[Symbol.asyncIterator] = function () {
  let i = 0
  let arr = this
  return {
    next() {
      return i >= arr.length
        ? Promise.resolve({ value: undefined, done: true })
        : arr[i++]
    },
    [Symbol.asyncIterator]() {
      return this
    }
  }
}

const requests = [request('请求 1'), request('请求 2')]

async function main() {
  for await (const item of requests) {
    console.log(item)
  }
}
main()
```

#### 也可以循环 Generator

```js
async function* words() {
  yield 'hello'
  yield 'word'
  yield '!'
}

async function main() {
  for await (const item of words()) {
    console.log(item)
  }
}
```

#### 使用 Generator 改写上面的例子

```js
function request(url) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        code: 200,
        data: url
      })
    }, 1000)
  })
}

async function* words() {
  yield request('请求 1')
  yield request('请求 2')
}

async function main() {
  for await (const item of words()) {
    console.log(item)
  }
}
main()
```

### Symbol.toStringTag
- 使用Object.prototype.toString()访问时，返回特定的类型标签

```js
Object.prototype.toString.call('foo');      // "[object String]"
Object.prototype.toString.call([1, 2]);     // "[object Array]"
Object.prototype.toString.call(3);          // "[object Number]"
Object.prototype.toString.call(true);       // "[object Boolean]"
Object.prototype.toString.call(undefined);  // "[object Undefined]"
Object.prototype.toString.call(null);       // "[object Null]"
Object.prototype.toString.call(new Date()); // "[object Date]"
// ... and more
```

```js
class ValidatorClass {}

Object.prototype.toString.call(new ValidatorClass()); // "[object Object]"


// 使用 Symbol.toStringTag
class ValidatorClass {
  get [Symbol.toStringTag]() {
    return "Validator";
  }
}

Object.prototype.toString.call(new ValidatorClass()); // "[object Validator]"
```
