---
title: event loop
isTimeLine: true
date: 2022-03-02 15:20:23
---

- [浏览器进程](https://www.processon.com/diagraming/6217461ee0b34d075bafd74b)
- [Render进程](https://www.processon.com/diagraming/621ee2131efad4073261e5ac)
- [event loop](https://www.processon.com/diagraming/62188ee7079129079ae384f6)

### GUI 渲染线程遇`<script>`标签

```html
<body>
  <div class="before">我是内容</div>
  <script>
    console.log('开始运行js')
    const beforeDiv = document.querySelector('.before')
    const afterDiv = document.querySelector('.after')
    console.log('beforeDiv', beforeDiv.textContent) // 我是内容
    console.log('after', afterDiv) // null 因为这个div还未解析
    console.log('运行结束')
  </script>
  <div class="after">我在script后面</div>
</body>
```

### 验证 JS 线程和 GUI 渲染线程是互斥的

```html
<body>
  <button>按钮</button>
  <script>
    const btn = document.querySelector('button')
    btn.onclick = () => {
      console.log('点击开始')
      btn.style.width = '100px'
      btn.style.height = '50px'
      btn.style.backgroundColor = 'green'

      function sleep(delay = 0) {
        const time = Date.now()
        while (Date.now() - time < delay) {}
      }
      sleep(3000) // 3秒后才会把执行权交给GUI渲染线程
      console.log('点击结束')
    }
  </script>
</body>
```

- 宏任务队列（macrotask queue）：`run script` `setTimeout` `setInterval` `requestAnimationFrame` `I/O` `postMessage` `MessageChannel`
- 微任务队列（microtask queue）：`Promise` `async/await` `MutationObserver`

```js
console.log('sync start')
setTimeout(() => {
  console.log('setTimeout1')
}, 500)
Promise.resolve()
  .then(() => {
    console.log('promise1')
  })
  .then(() => {
    console.log('promise2')
  })
console.log('sync end')
```

```js
setTimeout(() => {}, 0) // => 定时器触发线程到达时间后 => 通知事件触发线程 => 放入事件队列

Promise.resolve().then(() => {}) // 放入微任务队列

const xhr = new XMLHttpRequest() // 异步http请求线程，数据返回后 => 通知事件触发线程 => 放入事件队列
xhr.onload = () => {}
xhr.open('GET', '/api/', true)
xhr.send()
```

### 只有执行完微任务队列，才会权限交给GUI线程执行渲染

```html
<body>
  <button>按钮1</button>
  <script>
    function sleep(delay = 0) {
      const time = Date.now()
      while (Date.now() - time < delay) {}
    }
    const btn = document.querySelector('button')
    btn.onclick = () => {
      btn.style.width = '100px'
      btn.style.height = '40px'
      btn.style.backgroundColor = 'green'

      setTimeout(() => {
        console.log('setTimeout1')
      }, 0)

      Promise.resolve().then(() => {
        console.log('promise1')
        Promise.resolve()
          .then(() => {
            console.log('promise2')
          })
          .then(() => {
            console.log('promise3')
          })
      })

      console.log('睡眠3秒')
      sleep(3000)
    }
  </script>
</body>
```
