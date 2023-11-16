---
title: 在ts中如何new一个普通函数
isTimeLine: true
date: 2021-08-01 13:16:55
---

```ts
namespace D {
  interface AConstructor {
    (el?: HTMLElement, options?: string[]): void,
    new(el?: HTMLElement, options?: string[]): ClockInstance

  }

  interface ClockInstance {
    h: number
  }

  const A = function (this: ClockInstance) {

    this.h = 1

  } as AConstructor


  const C = new A(document.body);

}
```