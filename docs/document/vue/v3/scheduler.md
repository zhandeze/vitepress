---
title: scheduler
isTimeLine: true
date: 2022-03-02 15:20:23
---

### queueJob

```js
function sleep(delay = 0) {
  const time = Date.now()
  while (Date.now() - time < delay) {}
}
queueJob(() => {
  console.log('1')
})
queueJob(() => {
  console.log('2')
})
console.log('正在执行同步任务...')
sleep(3000)
console.log('同步执行完成, 接下来执行微任务')
```

```js
function sleep(delay = 0) {
  const time = Date.now()
  while (Date.now() - time < delay) {}
}
queueJob(() => {
  console.log('1')
  queueJob(() => {
    console.log('3')
  })
})
queueJob(() => {
  console.log('2')
  queueJob(() => {
    console.log('4')
  })
})
console.log('正在执行同步任务...')
sleep(3000)
console.log('同步执行完成, 接下来执行微任务')
```

### nextTick
- 当nextTick没有遇到queueJob，只是简单的将回调添加进微任务队列
```js
function sleep(delay = 0) {
  const time = Date.now()
  while (Date.now() - time < delay) {}
}
nextTick(() => {
  console.log('1')
  nextTick(() => {
    console.log('3')
  })
})
nextTick(() => {
  console.log('2')
  nextTick(() => {
    console.log('4')
  })
})
console.log('正在执行同步任务...')
sleep(3000)
console.log('同步执行完成, 接下来执行微任务')
```

### nextTick 和 queueJob

```js
function sleep(delay = 0) {
  const time = Date.now()
  while (Date.now() - time < delay) {}
}
queueJob(() => {
  console.log('queueJob1')
})
nextTick(() => {
  console.log('nextick1')
})
queueJob(() => {
  console.log('queueJob2')
})
nextTick(() => {
  console.log('nextick2')
})
console.log('正在执行同步任务...')
sleep(3000)
console.log('同步执行完成, 接下来执行微任务')
```
- 上面例子
- 产生了三个微任务回调
- 第一个是 queueJob维护的flushJob 将两个回调添加进了queueCbs 
- 会在一个微任务回调内执行完毕
- 第二个 nextick1
- 第三个 nextick2
- 所以输出 queueJob1 queueJob2 nextick1 nextick2