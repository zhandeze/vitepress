---
title: Symbol.iterator
isTimeLine: true
date: 2022-01-04 11:05:15
---
### Symbol.iterator

```ts
type iterable = {
  [Symbol.iterator](): iterator
}
type iterator = {
  next(): iteratorResult
}
type iteratorResult = {
  value: any,
  done: boolean
}

const obj: Record<string, any> & iterable = {
  a: 1,
  b: 2,
  c: 3,
  [Symbol.iterator]() {
    const self = this;
    const keys: string[] = Object.keys(this);
    let i = 0;
    return {
      next() {
        const value: number = self[keys[i++]];
        return { value, done: i > keys.length }
      }
    }
  }
}

for(const item of obj) {
  console.log(item)
}
```


### 往原型添加`[Symbol.iterator]()`方法

```ts
// xx.d.ts

interface Object {
  [Symbol.iterator](): Iterable
}


// xx.ts

Object.prototype[Symbol.iterator] = function () {
  const self: Record<string | symbol, any> = this
  const keys: string[] = Object.keys(this)
  let i = 0
  return {
    next() {
      const key = keys[i++]
      const value: any = self[key]
      return { value, done: i > keys.length }
    }
  }
}
const obj: Record<string | symbol, number> = {
  a: 1,
  b: 2,
  c: 3,
  [Symbol('h')]: 4
}
for(const item of obj) {
  console.log(item)
}
```