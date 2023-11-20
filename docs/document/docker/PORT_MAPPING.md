---
title: node 端口映射注意问题
isTimeLine: true
date: 2022-04-13 16:52:01
---



```js
// app.js
const Koa = require('koa')

const app = new Koa()

app.use(ctx => {
  ctx.body = '1当前node版本：' + process.version
})
const host = '127.0.0.1'
const port = 3001
app.listen(port, host, () => {
  console.log(`listening to http://${host}:${port}`)
})
```

```js
// Dockerfile
FROM node:12.22-alpine

COPY . /home/app/

EXPOSE 3001

RUN cd /home/app && npm install

WORKDIR /home/app

CMD ["npm", "start"]
```

```cmd
docker build -t node:v1 .
```

```cmd
docker run -d -p 8000:3001 node:v1
```

- 成功运行了，可是发现根本没法访问`localhost:8000`或`127.0.0.1:8000` 通过一番努力，发现是绑定 127.0.0.1的问题

::: success
127.0.0.1是一个回环地址，只能本机访问，外部没法访问的。因此express要监听到0.0.0.0这个地址上bash
:::
