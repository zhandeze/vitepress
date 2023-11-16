---
title: Set
isTimeLine: true
date: 2022-03-02 15:20:23
---

### Set

```ts
const s = new Set(['a', 'b'])
s.size // 2
s.add('c') // Set(3) {'a', 'b', 'c'}
s.has('c') // true
s.has('d') // false
s.delete('c') // true
s.delete('d') // false
s.clear()
s.size // 0
```

```ts
const s = new Set(['a', 'b'])
const iterator = s.values() // SetIterator {'a', 'b'}
iterator.next().value // 'a'
iterator.next().value // 'b'
iterator.next().value // undefined
for (const item of s.values()) {
  console.log(item)
}

const it = set.entries() // 获取key value
it.next().value // ['a', 'a']
it.next().value // ['b', 'b']
it.next().value // undefined
for (const item of set.entries()) {
  console.log(item)
}
```

### 自定义 iterator

- [什么是Symbol.iterator](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Symbol/iterator)

```ts
function values(this: Set<any>) {
  let i = 0
  let raws = [...this]
  return {
    next() {
      const value = raws[i++]
      return i > raws.length
        ? { value: undefined, done: true }
        : { value, done: false }
    },
    [Symbol.iterator]() {
      return this
    }
  }
}
Set.prototype[Symbol.iterator] = values
Set.prototype.values = values

const set = new Set(['a', 'b'])
const it = set.values();
it.next().value // a
it.next().value // b
it.next().value // undefined
for(const item of set.values()) {
  console.log(item)
}
```
