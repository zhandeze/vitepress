---
title: infer
isTimeLine: true
date: 2021-08-02 22:25:37
---

### Typescript 中的 is 关键字
- TypeScript里有类型保护机制。要定义一个类型保护，我们只要简单地定义一个函数，它的返回值是一个类型谓词

```ts
namespace IsKeyword1 {
  function isString(val: any): boolean {
    return typeof val === 'string'
  }

  function example(foo: any) {
    if(isString(foo)) {
      //foo为any 编译正常，运行时出错
      foo.callback()
    }
  }
  example('hello world')
}

namespace IsKeyword2 {
  function isString(val: any): val is string {
    return typeof val === 'string'
  }

  function example(foo: any) {
    if(isString(foo)) {
      //因为isString方法返回值缩小 val is string的原因
      //所以现可以推荐出foo为string类型
      //如下操作 编译和运行时都会报错
      foo.callback()
    }
  }
  example('hello world')
}

namespace Unknown{
  //用unknown替换any，强制转换会更加安全

  function isString(val: any): boolean {
    return typeof val === 'string'
  }

  function example(foo: unknown) {
    if(isString(foo)) {
      //foo为unknown 编译正常，运行时出错
      foo.split(' ')

      //必须给foo as一个类型
      (foo as string).split(' ')
    }
  }
  example('hello world')
}
```