---
title: 数据类型
isTimeLine: true
date: 2022-03-04 10:24:15
---

### unions
- 在ts中，`xxx | xxx | xxx` 这种就是unions联合类型

```ts
type direction = 'top' | 'bottom' | 'left' | 'right'

function start(
  val: string | number | symbol
) {
  switch(type val) {
    case 'string':
      // do something 
      break
    case 'number':
      // do something 
      break
    case 'symbol':
      // do something 
      break    
  }
}
```