---
title: Map
isTimeLine: true
date: 2022-03-02 15:20:23
---

### Map

```ts
const m = new Map()
const key = {}
const fn = () => {}
const symbolKey = Symbol('a')
m.set(key, 1)
m.get(key) // 1

m.set(fn, 2)
m.get(fn) // 2

m.set(symbolKey, 3)
m.get(symbolKey) // 3

m.set(1, 'a')
m.get(1) // 'a'

m.set(true, 'b')
m.get(true) // 'b'

m.set(null, 'c')
m.get(null) // 'c'

m.set(undefined, 'e')
m.get(undefined) // 'e'

m.set(NaN, 'f')
m.get(NaN) // 'f'
```

```ts
const m = new Map(['a', 'b'])
m.size // 2
m.get('a') // 1
m.delete('a') // true
m.delete('c') // false
m.clear()
m.size // 0
```

```ts
const m = new Map()
m.set('a', 1)
m.set('b', 2)
m.keys() // MapIterator {'a', 'b'}
m.values() // MapIterator {1, 2}
m.entries() // MapIterator {'a' => 1, 'b' => 2}
console.log([...m.keys()]) // ['a', 'b']
console.log([...m.values()]) // [1, 2]
console.log([...m.entries()]) // [ ['a', 1], ['b', 2] ]
```

### 自定义 Map.prototype.values 、Map.prototype[Symbol.iterator]

```ts
Map.prototype.values = function (this: Map<any, any>) {
  const it = this.entries()
  return {
    next() {
      const { value, done } = it.next()
      return done
        ? { value: undefined, done: true }
        : { value: value[1], done: false }
    },
    [Symbol.iterator]() {
      return this
    }
  }
}

Map.prototype[Symbol.iterator] = function (this: Map<any, any>) {
  const it = this.entries()
  return {
    next() {
      return it.next()
    },
    [Symbol.iterator]() {
      return this
    }
  }
}
```
