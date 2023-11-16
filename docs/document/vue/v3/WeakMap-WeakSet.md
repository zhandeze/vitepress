---
title: WeakMap-WeakSet
isTimeLine: true
date: 2022-03-02 15:20:23
---

### WeakMap

- WeakMap 对象是一组键/值对的集合，其中的键是弱引用的。其键必须是对象，而值可以是任意的。
- WeakMap 它不会阻止垃圾回收机制对作为键的对象（key object）的回收
- WeakMap 和 Map 的第一个不同点就是，WeakMap 的键必须是对象，不能是原始值

```js
let user = { name: 'John' }
let map = new Map()

map.set(user, '...')

// user取消了引用， 但是{ name: "John" }不会被回收
// 因为它还被map引用， 我们可以使用 map.keys() 来获取它
user = null
```

- WeakMap 在这方面有着根本上的不同。它不会阻止垃圾回收机制对作为键的对象（key object）的回收。
- 而Map是强引用，会阻止垃圾回收
- 我们来看下面的例子

```js
let user = { name: 'John' }

let wk = new WeakMap()
wk.set(user, '...')

user = null // 取消引用 稍候会从内存中回收user
```

#### example

```js
function run() {
  let wk = new WeakMap()
  let div = document.createElement('div')
  wk.set(div, 1)
  setTimeout(() => {
    div = null
    console.log('div 取消了引用')
  }, 2000)
  setInterval(() => {
    console.log(wk)
  }, 1000)
}
run()
```


- WeakMap 不支持迭代以及 keys()，values() 和 entries() 方法。所以没有办法获取 WeakMap 的所有键或值。
- WeakMap 没有 size， 因为不知道什么时候对象就被回收了，所以无法记录
- WeakMap 只有以下的方法：
  - weakMap.get(key)
  - weakMap.set(key, value)
  - weakMap.delete(key)
  - weakMap.has(key)

### WeakSet

- WeakSet 的表现类似：
- 与 Set 类似，但是我们只能向 WeakSet 添加对象（而不能是原始值）。
- 对象只有在其它某个（些）地方能被访问的时候，才能留在 set 中。
- 跟 Set 一样，WeakSet 支持 add，has 和 delete 方法，但不支持 size 和 keys()，并且不可迭代。

```js
const ws = new WeakSet()
let user = { name: 'Pete' }
ws.add(user)
ws.has(user) // true
user = null // 取消引用 稍候会从内存中回收user
```

### Example
- 检测一个闭包变量，是否被垃圾机制回收了

```js
function init() {
  const ws = new WeakSet()
  function wrapper(fn) {
    const data = { desc: '我是data' }
    ws.add(data)
    return () => {
      data.a = 1
      fn(data)
    }
  }

  const runner = wrapper((data) => {
    data.b = 1
  })

  ws.add(runner)

  runner()

  setInterval(() => {
    console.log(ws)
  }, 1000)
}
init()
```
### 总结

- WeakMap 是类似于 Map 的集合，它仅允许对象作为键，并且一旦通过其他方式无法访问它们，便会将它们与其关联值一同删除。

- WeakSet 是类似于 Set 的集合，它仅存储对象，并且一旦通过其他方式无法访问它们，便会将其删除。

- 它们的主要优点是它们对对象是弱引用，所以被它们引用的对象很容易地被垃圾收集器移除。

- 这是以不支持 clear、size、keys、values 等作为代价换来的……

- WeakMap 和 WeakSet 被用作“主要”对象存储之外的“辅助”数据结构。一旦将对象从主存储器中删除，如果该对象仅被用作 WeakMap 或 WeakSet 的键，那么它将被自动清除。
