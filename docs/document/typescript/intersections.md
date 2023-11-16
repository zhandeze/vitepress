---
title: infer
isTimeLine: true
date: 2021-08-16 11:39:53
---

### Typescript 中的 & 符号
- & 跟extends关键字差不多

```ts
namespace Intersections {
  interface Dog {
    dog: string
  }
  
  interface Cat {
    cat: string
  }
  
  type Animal = Dog & Cat
  
  
  const animal: Animal = {
    dog: 'dog',
    cat: 'cat'
  }
}
```