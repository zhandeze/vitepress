---
title: ts 中 typeof 关键字
isTimeLine: true
date: 2021-09-04 21:24:24
---

```ts
namespace E {
  const a = 'hello'

  // n: 'hello'
  let n: typeof a;

  // n = 'xxx' // 不能将类型'xxx'分配给类型'hello'
  
  // n = 'hello' // ok

  type Predicate = (x: unknown) => boolean;
  type K = ReturnType<Predicate>;
  // type K = boolean

  function f() {
    return { x: 10, y: 3 };
  }
  type P = ReturnType<typeof f>;
  // type P = {
  //     x: number;
  //     y: number;
  // }
}
```